# rc-scroll-anim
---

React ScrollAnim Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-scroll-anim)](https://saucelabs.com/u/rc-scroll-anim)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-scroll-anim.svg)](https://saucelabs.com/u/rc-scroll-anim)

[npm-image]: http://img.shields.io/npm/v/rc-scroll-anim.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-scroll-anim
[travis-image]: https://img.shields.io/travis/ant-motion/scroll-anim.svg?style=flat-square
[travis-url]: https://travis-ci.org/ant-motion/scroll-anim
[coveralls-image]: https://img.shields.io/coveralls/ant-motion/scroll-anim.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/ant-motion/scroll-anim?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/ant-motion/scroll-anim.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/ant-motion/scroll-anim
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-scroll-anim.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-scroll-anim


## Browser Support

|![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)|
| --- | --- | --- | --- | --- |
| IE 8+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |

## Screenshots

<img src="" width="288"/>


## Development

```
npm install
npm start
```

## Example

http://localhost:8020/examples/

## Feature

* support ie8,ie8+,chrome,firefox,safari

### Keyboard


## install


[![rc-scroll-anim](https://nodei.co/npm/rc-scroll-anim.png)](https://npmjs.org/package/rc-scroll-anim)


## Usage

```js
var ScrollAnim = require('rc-scroll-anim');
var ScrollOverPack = ScrollAnim.OverPack;
var ScrollParallax = ScrollAnim.Parallax;
var React = require('react');
// ScrollOverPack示例
// ScrollOverPack目前只支持rc-animate,rc-queue-anim,rc-tween-one;
React.render(<ScrollOverPack>
  <QueueAnim key='queueAnim'>
    <div key='a'>依次进入</div>
    <div key='b'>依次进入</div>
    <div key='b'>依次进入</div>
  </QueueAnim>
  <TweenOne key='tweenOne' vars={{x:100}}>单元素动画</TweenOne>
  <Animate key='rc-animate' transitionName="fade" transitionAppear>rc-animate示例</Animate>
</ScrollOverPack>, container);
// Parallax示例
React.render(<ScrollParallax vars={{x:100}}>Parallax示例</ScrollPallax>,container);
```

## API

### props

### OverPack

| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| component | string         | `div`   | 组件标签        |
| playScale | number         | `0.5`   | 开始播放的屏幕百分比, 0.5 为屏幕中间 |
| always    | boolean        | `true`  | 到否重复播放，如为 false 将只进入一遍，不再触发出场效果 |

### Parallax
| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| vars      | object / array | `null`  | 组件动效数据     |
| always    | boolean        | `true`  | 同上            |
| component | string         | `div`   | 同上            |

#### vars = { }
| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| playScale | array          | `[0, 1]`| 播放的区域段，第一个数为开始时的窗口百分比，第二个为结束时的窗口百分比，当第一个数为0时，将从窗口底部开始播放，且第二个为1时将在窗口顶部结束动画 |
| ease      | string         | `easeInOutQuad`| 动画的缓动 |
| onUpdate  | function       |    -    | 更新时回调，传回带ease的百分比   ｜ 
| onStart   | function       |    -    | 开始时回调 |
| onComplete| function       |    -    | 结束时回调 |

> vars = [{},{}] 时为timeline;

### Event 
```
var Event = ScrollAnim.Event;
Event.addEventListener('scroll.xxxx',func);
Event.removeEventListener('scroll.xxx',func);
```

## Test Case

http://localhost:8020/tests/runner.html?coverage

## Coverage

http://localhost:8020/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8020/tests/runner.html?coverage

## License

rc-scroll-anim is released under the MIT license.
