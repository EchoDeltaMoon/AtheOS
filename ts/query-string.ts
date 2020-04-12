interface StringMap { [key: string]: string; }

function getUrlVars(): StringMap {
  let href: string = window.location.href;
  let vars: StringMap = {};
  let hashes = href.slice(href.indexOf('?') + 1).split('#')[0].split('&');

  for (let i in hashes) {
    let hash: string[] = hashes[i].split('=');
    vars[hash[0]] = hash[1];
  }

  return vars;
}
