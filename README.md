# rc-scroll-anim
---

React ScrollAnim Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-scroll-anim.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-scroll-anim
[travis-image]: https://img.shields.io/travis/react-component/scroll-anim.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/scroll-anim
[coveralls-image]: https://img.shields.io/coveralls/react-component/scroll-anim.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/scroll-anim?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-scroll-anim.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-scroll-anim


## Browser Support

|![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true)|
| --- | --- | --- | --- | --- |
| IE 10+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |


## Development

```
npm install
npm start
```

## Example

http://localhost:8020/examples/ 

http://react-component.github.io/scroll-anim/

http://ant.design/


## Feature

* support ie8,ie8+,chrome,firefox,safari

## install

[![rc-scroll-anim](https://nodei.co/npm/rc-scroll-anim.png)](https://npmjs.org/package/rc-scroll-anim)


## Usage

#### ScrollOverPack 
```js
var ScrollAnim = require('rc-scroll-anim');
var ScrollOverPack = ScrollAnim.OverPack;
var React = require('react');

// ScrollOverPack support rc-animate,rc-queue-anim,rc-tween-one;

React.render(<ScrollOverPack>
  <QueueAnim key='queueAnim'>
    <div key='a'>enter</div>
    <div key='b'>enter</div>
    <div key='b'>enter</div>
  </QueueAnim>
  <TweenOne key='tweenOne' vars={{x:100}}>one element</TweenOne>
  <Animate key='rc-animate' transitionName="fade" transitionAppear>rc-animate</Animate>
</ScrollOverPack>, container);
```
#### Parallax

```js
var ScrollParallax = ScrollAnim.Parallax;
React.render(<ScrollParallax animation={{x:100}}>Parallax</ScrollParallax>,container);
```

#### Link, Element

```js
var Link = ScrollAnim.Link;
var Element = ScrollAnim.Element;
React.render(<div>
  <div className="nav">
    <Link className="nav-list" to="page0">nav0</Link>
    <Link className="nav-list" to="page1">nav1</Link>
  </div>
  <Element className="pack-page" id="page0">demo</Element>
  <Element className="pack-page" id="page1">demo</Element>
</div>,container);
```

### scrollScreen

```js
ScrollAnim.scrollScreen.init();
ScrollAnim.scrollScreen.unMount();
```

## API

<a href='https://motion.ant.design/api/scroll-anim' target='_blank'>中文文档</a>

### props

### Element 

> `Element` or `OverPack` must set height;

| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| component | string         | `div`   | -            |
| id | string         | null    | need to location the id，parallax the `location` or link the `to`, need to use |
| targetId  |  string        | null    |  scroll target id, if don't window scroll, parent element is `overflow: scroll`, use parent id to do scroll; [demo refs](http://react-component.github.io/scroll-anim/examples/target.html) |
| playScale | number / array / string       | `0.5`   | percentage of screen to start play, screen center is 0.5, if replay is true : [bottomEnter, topLeave]， topLeave >= bottomEnter |
| replay    | boolean        | `false` | play every enter, do you want to animate each time you show the current, `false` only scroll to down play animate |
| onChange  | func           | null     | change callback({ mode, id }); mode: `enter` or `leave` |
| onScroll  | func           | null     | scroll callback({ domEvent, showHeight, offsetTop, scrollTop, id }). |
| location  | string         | null     |  v0.6.0 above have,location, the parent id; |
| componentProps | object | null | component props. |

> Note: if the element is not the above component, you need to location this element; please use the `Element`

### OverPack 

OverPack inherit Element; `component` `playScale` `onChange`  `onScroll` `location` `replay` refer to  `Element`;

> 1.0.0 remove hideProps;

| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| always    | boolean        | `true`  | back to top, enter replay，as `false` will only play it again, leave does not play |
| appear | boolean         | `true`  | whether support appear the operation |
| componentProps | object | null | component props. |

### Parallax
| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| animation      | object / array | `null`  | animation data     |
| location  | string         | `null`  | location, the parent id |
| always    | boolean        | `true`  | -            |
| targetId  |  string        | null    | refer Element `targetId` |
| component | string         | `div`   | -            |
| componentProps | object | null | component props. |

#### animation = { }
| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| playScale | array          | `[0, 1]`| play area, [start, end]<br/> timeline: `[{playScale: [0, 0.2]}, {playScale: [0, 0.8]}]]`, Second will increase by 0.2, The second end is 1  |
| ease      | string         | `easeInOutQuad`| animation easing string |
| onUpdate  | function       |    -    |  animate updates, callback: onUpdate(percent)   |
| onStart   | function       |    -    |  scroll down animate start (playScale[0]) callback; |
| onComplete| function       |    -    |  scroll down animate completed (playScale[1]) callback |
| onStartBack   | function       |    -    |   scroll up animate start (playScale[1]) callback; |
| onCompleteBack | function       |    -    |   scroll up animate completed (playScale[0]) callback; |

> animation = [{},{}] is timeline;

### Link

> v1.1.0 remove onAsynchronousAddEvent. [Asynchronous demo](http://react-component.github.io/scroll-anim/examples/linkAsynchronous.html)

> v2.3.0 toHash default is false;

| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| to  | string         | `null`  | need; Specifies the element to top; `Element` the id  |
| toHash | boolean     | false    | add `to` to the `location.hash` |
| duration  | number         | `450`   | scroll animate duration |
| ease      | string         | `easeInOutQuad` | animation easing string | 
| active    | string         | `active`| selected className  |
| showHeightActive| string / number / array | `50%` | enter: the element offset top `50%` add `active`, leave: the element in the window `50%` remove `active`; is array [enter, leave]; |
| toShowHeight | boolean     | false   | scroll to `showHeightActive` |
| offsetTop |  number        |  0      | scroll to elem top offset   |
| targetId  |  string        | null    | refer Element `targetId` |
| onFocus   | func           | null    | check callback,onFocus({target,to}) |
| onBlur    | func           | null    | blur callback |
| component | string         | `div`   | -            |
| componentProps | object | null | component props. |

### ScrollAnim.scrollScreen.init(vars)
Use: scroll a screen window;

#### vars = { }

| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| location  | array          | []      | llocation of scrolling screen, only element ID is supported in array |
| duration  | number         | 450     | scroll duration   |
| ease      | string         | `easeInOutQuad` | easing |
| docHeight | number         | null    | Custom html height |
| loop      | boolean        | false   | Before and after the phase cycle  |
| scrollInterval | number    | 1000    | rolling interval time |

### ScrollAnim.scrollScreen.unMount()

Clear a screen scrolling effect;

### Event 
```jsx
var Event = ScrollAnim.Event;
Event.addEventListener('scroll.xxxx',func);
Event.removeEventListener('scroll.xxx',func);
```
