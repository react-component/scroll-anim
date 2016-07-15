// 设置 body 的高度。。。travis 自动改了document.body.clientHeight的高度;
document.body.style.height = '500px';
document.body.style.overflow = 'auto';
const req = require.context('.', false, /\.spec\.js?$/);
req.keys().forEach(req);
