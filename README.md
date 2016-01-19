# rc-scroll-anim
---

React ScrollAnim Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

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


## Development

```
npm install
npm start
```

## Example

http://localhost:8020/examples/

## Feature

* support ie8,ie8+,chrome,firefox,safari

## install

[![rc-scroll-anim](https://nodei.co/npm/rc-scroll-anim.png)](https://npmjs.org/package/rc-scroll-anim)


## Usage

#### ScrollOverPack示例
```js
var ScrollAnim = require('rc-scroll-anim');
var ScrollOverPack = ScrollAnim.OverPack;
var React = require('react');
// ScrollOverPack目前只支持rc-animate,rc-queue-anim,rc-tween-one;
React.render(<ScrollOverPack>
  <QueueAnim key='queueAnim' scrollHideProps={{child: null}}>
    <div key='a'>依次进入</div>
    <div key='b'>依次进入</div>
    <div key='b'>依次进入</div>
  </QueueAnim>
  <TweenOne key='tweenOne' vars={{x:100}} scrollHideProps={{type: 'reverse'}}>单元素动画</TweenOne>
  <Animate key='rc-animate' transitionName="fade" transitionAppear scrollHideProps={{child: null}}>rc-animate示例</Animate>
</ScrollOverPack>, container);
```
#### Parallax示例

```js
var ScrollParallax = ScrollAnim.Parallax;
React.render(<ScrollParallax vars={{x:100}}>Parallax示例</ScrollPallax>,container);
```

#### Link, Element示例

```js
var Link = ScrollAnim.Link;
var Element = ScrollAnim.Element;
React.render(<div>
  <div className="nav">
    <Link className="nav-list" to="page0">nav0</Link>
    <Link className="nav-list" to="page1">nav1</Link>
  </div>
  <Element className="pack-page" scrollName="page0">示例</Element>
  <Element className="pack-page" scrollName="page1">示例</Element>
</div>,container);
```

## API

### props

### OverPack

| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| component | string         | `div`   | 组件标签        |
| playScale | number         | `0.5`   | 开始播放的屏幕百分比, 0.5 为屏幕中间 |
| always    | boolean        | `true`  | 到否重复播放，如为 false 将只进入一遍，不再触发出场效果 |
| scrollName| string         | `null`  | 需要定位的名称，parallax的 location 或 link 的 location, 都需要以此元素做定位 |

#### 子级动画支持 `rc-queue-anim` `rc-animte` `rc-tween-one`

> children 为 `rc-queue-anim` `rc-animte` 或其它把children设为 null 就有动画的组件时: scrollHideProps={{child: null}}
> children 为 `rc-tween-one` 或其它有倒放功能在出场时不想删掉元素的组件时: scrollHideProps={{type: 'reverse'}}
> 详细看 ScrollOverPack 示例

### Parallax
| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| vars      | object / array | `null`  | 组件动效数据     |
| location  | string         | `null`  | 定位,`Element`的 name 值，必需是唯一的|
| always    | boolean        | `true`  | 同上            |
| scrollName| string         | `null`  | 需要定位的名称，parallax的 location 或 link 的 location, 都需要以此元素做定位 |
| component | string         | `div`   | 同上            |

#### vars = { }
| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| playScale | array          | `[0, 1]`| 播放的区域段，第一个数为开始时的窗口百分比，第二个为结束时的窗口百分比，当第一个数为0时，将从窗口底部开始播放，且第二个为1时将在窗口顶部结束动画 |
| ease      | string         | `easeInOutQuad`| 动画的缓动 |
| onUpdate  | function       |    -    | 更新时回调，传回带ease的百分比   ｜ 
| onStart   | function       |    -    | 开始 (playScale[0]) 时回调 |
| onComplete| function       |    -    | 到达 (playScale[1]) 时回调 |

> vars = [{},{}] 时为timeline;

### Link
| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| location  | string         | `null`  | 必需; 指定元素到达顶部; `Element` 的 name 值, 元素必需是唯一的 |
| duration  | number         | `450`   | 点击滚动动画的时间 |
| ease      | string         | `easeInOutQuad` | 动画缓动 | 
| active    | string         | `active`| 选中时的样式    |
| showHeightActive| string / number / array | `0` | 如设定了值，在进入时距顶部还有指定值的时, `link` 标签被附于 `active` 值; 在出场时是还有指定值时, `link` 标签移除 `active` 值; 如果为Array时，第一个为进场，第二个为出场; |
| toShowHeight | boolean     | false   | 点击时是否滚到 `showHeightActive` 上 |
| onFocus   | func           | null    | 选中时回调，返回参数{target,to} |
| onBlur    | func           | null    | 失去焦点时回调，返回参数同上 ｜
| component | string         | `div`   | 同上            |

### Element 

| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| scrollName | string         | null    | 需要定位的名称，parallax的 location 或 link 的 location, 都需要以此元素做定位 |
| component | string         | `div`   | 同上            |

> 注: 如果元素不是以上组件时，需要定位到此元素上时，请用 `Element`

### Event 
```jsx
var Event = ScrollAnim.Event;
Event.addEventListener('scroll.xxxx',func);
Event.removeEventListener('scroll.xxx',func);
```
