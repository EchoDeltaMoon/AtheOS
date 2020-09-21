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
  let output = $(`<pre style="color: ${color}">${text}</pre>`);
  cont.append(output);
  output[0].scrollIntoView();
}

function printHelp(val) {
  if (val) {
    if (!(val in commands)) {
      printf(`Function '${val}' not found`, 'red');
      printf(' ');
      return;
    } else {
      printf('  ' + val + ': ' + commands[val][1]);
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