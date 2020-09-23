const commands = {
  help: [printHelp, 'Displays help'],
  print: [printf, 'Prints value'],
  cls: [consoleClear, 'Clear console'],
  '': [' ', ' '],
  ' ': ['', `There's a lot of hidden commands.`],
  '  ': ['', `For example: movingtest or doyoulikeme.`]
}
const toFill = 12;

function printf(text, color = 'white') {
  if (!text) return;
  let cont = $('#content');
  let output;
  if (typeof color !== 'object') {
    output = $(`<pre style="color: ${color}">${text}</pre>`);
  } else {
    let innerText = '';
    for (let i = 0; i < text.length; i ++) {
      let char = text.substr(i, 1);
      if (char in color) {
        innerText += `<span style="color: ${color[char]}">${char}</span>`;
      } else {
        innerText += `<span style="color: white">${char}</span>`;
      }
    }
    output = $(`<pre>${innerText}</pre>`);
  }
  
  cont.append(output);
  output[0].scrollIntoView();
}

function printHelp(val) {
  if (val) {
    let usCom = val in commands;
    let hdCom = val in hidCommands;
    if (!(usCom || hdCom)) {
      printf(`Function '${val}' not found`, 'red');
      printf(' ');
      return;
    } else {
      let help = usCom ? commands[ val ][1] : hidCommands[ val ][1];
      printf('  ' + val + ': ' + help);
    }
  } else {
    let length = Object.keys(commands).length;
    for (let i = 0; i < length; i ++) {
      let elem = Object.keys(commands)[i];
      let ln = toFill - elem.length;
      printf('  ' + elem + ' '.repeat(ln) + commands[elem][1]);
    }
  }
}

function consoleClear() {
  $('#content').empty();
}