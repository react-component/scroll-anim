// 设置 body 的高度。。。travis 自动改了document.body.clientHeight的高度;
// 不搞了，，线上的窗口不行。。。
import 'core-js/es/map';
import 'core-js/es/set';

const req = require.context('.', false, /\.spec\.js?$/);
req.keys().forEach(req);
