
var winIndex = [];

$(document).ready( function() {
	//$(".draggable").draggable();

	$('#infomenu').mouseenter(
		function(e) {
			if (winIndex.length == 0 || $('#docker').length) {return;}
			let $docker = $('<div id="docker"></div>');
			$('body').append($docker);

			for (let i in winIndex) {
				let $name = $('<div class="dock-names">' + winIndex[i].name + '</div>');
				$docker.append($name);
				$name.click( function(e) {
					focusWindow(i);
				});
			}

			$('#docker').mouseleave( function(e){
				$('#docker').remove();
			});
		}
	);
});

//---------functions------------
function loadWallpaper() {
	let wallpaper = getCookie("background");
	if (wallpaper == "" || wallpaper == null){
		setCookie("background", "1", 365);
		wallpaper = "1";
	}
	let url = 'url("images/backgrounds/ocback' + wallpaper + '.gif")';
	$('#page').css('background-image', url);
}


//------------------windows mechanic----------------

function deployWindow(url, name, link) {
	for (let i in winIndex) {
		if (winIndex[i].name == name) {
			focusWindow(i);
			return;
		}
	}
	new Window(url, name, link);
	windowCounter();
}

function closeWindow(id) {
	$('#win-id-' + id).remove();
	winIndex.splice(id, 1);
	sortWindows();
	windowCounter();
}

function maximizeWindow(id) {
	let url = $('#win-id-' + id).find('.win-frame').attr('src');
	window.open(url, '_blank'); 
}

function minimizeWindow(id) {
	$('#win-id-' + id).css('display', 'none');
}

function sortWindows() {
	for (let i in winIndex) {
		if (winIndex[i].id !== i) {
			winIndex[i].setId(winIndex[i].id, i);
		}
	}
}
	
function focusWindow(id) {
	$('#win-id-' + id).css('display', 'inline-block');
	let actIndex = parseInt($('#win-id-' + id).css('z-index'));
	for (let i in winIndex) {
		if (i == id) { continue; }
		let $window = $('#win-id-' + winIndex[i].id);
		let newIndex = parseInt($window.css('z-index'));
		if (actIndex < newIndex) {
			$window.css('z-index', newIndex - 1);
		}
	}
	$('#win-id-' + id).css('z-index', '50');
}

function windowCounter() {
	$('#infomenu').html('Win: ' + winIndex.length);	
}

//----------------------windows--------------------------------
class Window {
	constructor(url, name, link) {
		this.url = url;
		this.name = name;
		this.link = link;
		this.id = winIndex.length;

		winIndex.push(this);
		this.create();
	}

	create() {
		let $window = $('<div class="window" id="win-id-'+ this.id +'"></div>').draggable();
		$('#page').append($window);

		$window.css({
			position: 'absolute',
			top: 16 + (winIndex.length*2) + '%',
			left: 23 + (winIndex.length*2) + '%'
			//top: 100,
			//left: 100,
		});
		
		$window.append(
			'<div class="win-bar">' +
				'<div class="win-close" onclick="closeWindow(' + this.id + ')"></div>' +
				'<div class="win-full"  onclick="maximizeWindow(' + this.id + ')"></div>' + 
				'<div class="win-min"  onclick="minimizeWindow(' + this.id + ')"></div>' + 
				'<div class="win-text">' + this.link + '</div>' +
			'</div>' +
			'<div class="win-content">' +
				'<iframe class="win-frame" src="' + this.url + '"></iframe>' +
			'</div>' +
			'<div class="resizer"></div>'
		);

		this.setListeners();
		this.makeResizable();
		focusWindow(this.id);
	}

	setListeners() {
		let $window = $('#win-id-' + this.id);
		let id = this.id;
		//set click event for window
		$window.on('mousedown', function(e) {
			focusWindow(id);
		});
		
		//set click event for iframe (tricky)
		let $iframe = $window.find('.win-frame');
		$iframe.iframeTracker(false);
		$iframe.iframeTracker(function(e) {
			focusWindow(id);
		});
	}

	setId(id, newId) {
		this.id = newId;
		let $window = $('#win-id-' + id);
		$window.attr('id', 'win-id-' + this.id);
		$window.find('.win-close').attr('onclick', 'closeWindow(' + this.id + ')');
		$window.find('.win-full').attr('onclick', 'maximizeWindow(' + this.id + ')');
		$window.find('.win-min').attr('onclick', 'minimizeWindow(' + this.id + ')');
		this.setListeners();
	}

	makeResizable() {
		const minWidth = 500;
		const minHeight = 200;
	
		let $window = $('#win-id-' + this.id);
		let $list = $window.find('.resizer');
	
		$list.on('mousedown', function(){
			$window.draggable('disable');
			$(this).css({
				width: 300,
				height: 300,
				right: -150,
				bottom: -150
			});
			$(this).on('mousemove', function(e) {
				let offset = $(this).offset();
				let x = e.pageX - offset.left;
				let y = e.pageY - offset.top;
				let $par = $(this).parent();
				let newWidth = $par.width() + (x - 150);
				let newHeight = $par.height() + (y - 150);
				if (newWidth >= minWidth){
					$par.width(newWidth);
				}
				if (newHeight >= minHeight){
					$par.height(newHeight);
				}
			});
		}).on('mouseup', function() {
			$(this).off('mousemove');
			$window.draggable('enable');
			$(this).css({
				width: 10,
				height: 10,
				right: -5,
				bottom: -5
			});
		});
	
	}
	
}