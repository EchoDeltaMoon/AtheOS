$("document").ready( function(){
  $.getJSON("json/posts.json", function(json){
    loadPosts(json);
  })
});

function loadPosts(json: any): void {
  let $posts: JQuery = $('#posts');
  
  for (let i in json.posts){//for every post in json
    let $post: JQuery = $('<div></div>').addClass('block');
    
    $posts.append($post);
    
    let title: string = '<h2>' + json.posts[i].data.title + '</h2>';    
    let name: string = '<h5 class="author">' + json.posts[i].data.uname + '</h5>';    
    let date: string = '<h5 class="date">' + json.posts[i].data.date + '</h5>';    
    let text: string = '<h3>' + json.posts[i].data.text + '</h3>';    
    let $comments: JQuery = $('<div></div>').addClass('comments');
    let login: string = '<div class="' + json.posts[i].allowed + '"></div>';
    
    $post.append(title, name, date, '<hr>',  text, $comments, login, '<br>');
        
    for (let j in json.posts[i].comments){//for every comment in post
      let $message: JQuery = $('<div></div>').addClass('messagebox');
      $comments.append($message);
      
      let icon: string = '<div class="uicon ' + json.posts[i].comments[j].uicon + '"></div>';
      let head: string = '<div class="post-head"><br></div>';
      let name: string = '<div class="post-name">' + json.posts[i].comments[j].uname + '</div>';
      let text: string = '<div class="post-text">' + json.posts[i].comments[j].text + '</div>';
      
      $message.append(icon, head, name, text);
    }
  }
  
  let $parLog: JQuery = $('.post-login-parent').children().clone(true,true);
  $('.post-login').html($parLog.html());
  
  let $parRes: JQuery = $('.post-restrict-parent').children().clone(true,true);
  $('.post-restrict').html($parRes.html());
  
}
