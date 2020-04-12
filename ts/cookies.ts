function setCookie(cname: string, cvalue: string, exdays: number): void {
  let d: Date = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires: string = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname: string): string {
  let name: string = cname + '=';
  let decodedCookie: string = decodeURIComponent(document.cookie);
  let ca: string[] = decodedCookie.split(';');
  for (let i in ca) {
    let c: string = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function delCookie(cname: string): void {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}