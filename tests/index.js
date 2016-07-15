window.resizeBy(700, 700);
console.log(document.documentElement.clientHeight);
const req = require.context('.', false, /\.spec\.js?$/);
req.keys().forEach(req);
