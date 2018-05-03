## 2.5.0
1. 全系列增加 componentProps.

## 2.4.0
1. 将 replay 迁至 scrollElement， replay 为 false 时， 上出场和上进场将不触发。
2. 增加 onScroll 事件。

## 2.3.0
1. componentWillReceiveProps 时增加解发滚动事件，解决块景模块跳动时不出现动画。
2. ScrollLink 的 toHash 改为默认为 false;

## 2.0.0
1. 升级 react 到 16;
2. 去除 onAsynchronousAddEvent， 可查看异步 [demo](http://react-component.github.io/scroll-anim/examples/linkAsynchronous.html);
3. 增加用例使用。
4. 增加全部组件的 `targetId`, 可定位到指定的 dom 进行滚动。
5. 去除 parallax 的延时渲染。

## 0.5.0

1. scrollElement 将支持 onChange, 进入与出去时触发.
2. 所有的 scrollName 变更成 id;
3. 去除 parallax 里的 scrollName;
4. scrollLink 重构, 点击后直接回调 onFocus, 
5. scrollLink 增加将 to 添加到链接; toHash 设为 false 为不添加到链接.
6. scrollLink 增加异步添加事件 onAsynchronousAddEvent(func);
7. ScrollParallax 回调分开,增加 onStartBack, onCompleteBack.
