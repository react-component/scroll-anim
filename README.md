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
[travis-image]: https://img.shields.io/travis/react-component/scroll-anim.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/scroll-anim
[coveralls-image]: https://img.shields.io/coveralls/react-component/scroll-anim.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/scroll-anim?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/scroll-anim.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/scroll-anim
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

React.render(<ScrollOverPack hideProps={{ tweenOne: { reverse: true } }}>
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
React.render(<ScrollParallax vars={{x:100}}>Parallax</ScrollPallax>,container);
```

#### Link, Element

```js
var Link = ScrollAnim.Link;
var Element = ScrollAnim.Element;
React.render(<div>
  <div className="nav">
    <Link className="nav-list" location="page0">nav0</Link>
    <Link className="nav-list" location="page1">nav1</Link>
  </div>
  <Element className="pack-page" scrollName="page0">demo</Element>
  <Element className="pack-page" scrollName="page1">demo</Element>
</div>,container);
```

### scrollScreen

```js
ScrollAnim.scrollScreen.init();
ScrollAnim.scrollScreen.unMount();
```

## API

<a href='http://motion.ant.design/#/components/scroll-anim' target='_blank'>中文文档</a>

### props

### OverPack

| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| component | string         | `div`   | component tag        |
| playScale | number / array        | `0.5`   | percentage of screen to start play, screen center is 0.5, if replay is true : [bottomEnter, topLeave]， topLeave >= bottomEnter |
| always    | boolean        | `true`  | back to top, enter replay，as `false` will only play it again, leave does not play |
| scrollName| string         | `null`  | need to location the name，parallax the `location` or link the `location`, need to use |
| replay    | boolean        | `false` | play every enter, do you want to animate each time you show the current, `false` only scroll to down play animate |
| onChange  | func           | `null`  | callback({ mode, scrollName }), mode: `enter` `leave` |
| hideProps | object         | `null`  | v0.3.0 children hideProps move here. If the child does not have, default: { children: null }. children be `rc-tween-one` { 'userKey': { reverse: true }} |

### react 15.2.0 react-unknown-prop warnings, hideProps move to tag.
### ~~children support animation:  `rc-queue-anim` `rc-animte` `rc-tween-one`~~

> ~~children be `rc-queue-anim` `rc-animte` add on label: hideProps={{ child: null }}~~

> ~~children be `rc-tween-one` add on label: hideProps={{ reverse: true }}~~


### Parallax
| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| animation      | object / array | `null`  | animation data     |
| location  | string         | `null`  | location, `Element` the `scrollName`, only scroll name |
| always    | boolean        | `true`  | -            |
| scrollName| string         | `null`  | -            |
| component | string         | `div`   | -            |

#### animation = { }
| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| playScale | array          | `[0, 1]`| play area, [start, end]<br/> timeline: `[{playScale: [0, 0.2]}, {playScale: [0, 0.8]}]]`, Second will increase by 0.2, The second end is 1  |
| ease      | string         | `easeInOutQuad`| animation easing string |
| onUpdate  | function       |    -    |  animate updates, callback: onUpdate(easeValue})   ｜ 
| onStart   | function       |    -    |  animate start (playScale[0]) callback; |
| onComplete| function       |    -    |  animate completed (playScale[1]) callback |

> animation = [{},{}] 时为timeline;

### Link
| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| location  | string         | `null`  | need; Specifies the element to top; `Element` the `scrollName`  |
| duration  | number         | `450`   | scroll animate duration |
| ease      | string         | `easeInOutQuad` | animation easing string | 
| active    | string         | `active`| selected className  |
| showHeightActive| string / number / array | `50%` | enter distance window top `50%` add `active`, leave same; is array [enter, leave]; |
| toShowHeight | boolean     | false   | scroll to `showHeightActive` |
| onFocus   | func           | null    | check callback,onFocus({target,to}) |
| onBlur    | func           | null    | blur callback ｜
| component | string         | `div`   | -            |

### Element 

| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| scrollName | string         | null    | - |
| component | string         | `div`   | -            |

> Note: if the element is not the above component, you need to location this element; please use the `Element`

### ScrollAnim.scrollScreen.init(vars)
Use: scroll a screen window;

#### vars = { }

| name      | type           | default | description    |
|-----------|----------------|---------|----------------|
| duration  | number         | 450     | scroll duration   |
| ease      | string         | `easeInOutQuad` | easing |
| docHeight | number         | null    | default to HTML height, when body or html the height: 100%, page height can not be obtained, need their own definition |
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
