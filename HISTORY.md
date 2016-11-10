## 0.5.0

1. scrollElement 将支持 onChange, 进入与出去时触发.
2. 所有的 scrollName 变更成 id;
3. 去除 parallax 里的 scrollName;
4. scrollLink 重构, 点击后直接回调 onFocus, 
5. scrollLink 增加将 to 添加到链接; toHash 设为 false 为不添加到链接.
6. scrollLink 增加异步添加事件 onAsynchronousAddEvent(func);
7. ScrollParallax 回调分开,增加 onStartBack, onCompleteBack.
