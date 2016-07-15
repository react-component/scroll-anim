document.body.style.height = '500px';
document.body.style.overflow = 'auto';
const req = require.context('.', false, /\.spec\.js?$/);
req.keys().forEach(req);
