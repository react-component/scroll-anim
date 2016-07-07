import React from 'react';
import ReactDom from 'react-dom';
import assign from 'object-assign';
import EventListener from './EventDispatcher';
import easingTypes from 'tween-functions';
import Timeline from 'rc-tween-one/lib/TimeLine';
import ticker from 'rc-tween-one/lib/ticker';
import { dataToArray, objectEqual, currentScrollTop } from './util';
import mapped from './Mapped';

let tickerId = 0;

function noop() {
}

function playScaleToArray(playScale) {
  if (Array.isArray(playScale)) {
    if (playScale.length === 2) {
      return playScale;
    }
    return [(playScale[0] || 0), (playScale[1] || 1)];
  } else if (playScale) {
    return [playScale, 1];
  }
  return [0, 1];
}

class ScrollParallax extends React.Component {
  constructor() {
    super(...arguments);
    this.scrollTop = 0;
    this.defaultTweenData = [];
    this.defaultData = [];
    this.state = {};
    [
      'scrollEventListener',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.dom = ReactDom.findDOMNode(this);
    if (this.props.scrollName) {
      mapped.register(this.props.scrollName, this.dom);
    }
    this.scrollTop = currentScrollTop();
    this.clientHeight = window.innerHeight ||
      document.documentElement.clientHeight || document.body.clientHeight;
    this.setDefaultData(this.props.animation || {});

    // 第一次进入;
    setTimeout(() => {
      this.timeline = new Timeline(this.dom, this.defaultTweenData);
      this.scrollEventListener();
      const date = Date.now();
      const length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
      this.eventType = `scroll.scrollEvent${date}${length}`;
      EventListener.addEventListener(this.eventType, this.scrollEventListener);
    });
  }

  componentWillReceiveProps(nextProps) {
    const equal = objectEqual(this.props.animation, nextProps.animation);
    if (!equal) {
      this.setDefaultData(nextProps.animation || {});
      this.timeline.resetAnimData();
      this.timeline.setDefaultData(this.defaultTweenData);
    }
  }

  componentWillUnmount() {
    mapped.unRegister(this.props.scrollName);
    EventListener.removeEventListener(this.eventType, this.scrollEventListener);
  }

  setDefaultData(_vars) {
    const vars = dataToArray(_vars);
    const varsForIn = (item, i) => {
      const playScale = playScaleToArray(item.playScale).map(data => data * this.clientHeight);
      const __item = assign({}, item);
      delete __item.playScale;
      const _item = assign({}, item);
      delete _item.playScale;
      _item.delay = __item.delay = playScale[0];
      _item.duration = __item.duration = playScale[1] - playScale[0];
      _item.onStart = null;
      _item.onUpdate = null;
      _item.onComplete = null;
      _item.onRepeat = null;
      __item.onStart = __item.onStart || noop;
      __item.onComplete = __item.onComplete || noop;
      this.defaultTweenData[i] = _item;
      this.defaultData[i] = __item;
    };
    vars.forEach(varsForIn);
  }

  scrollEventListener() {
    const scrollTop = currentScrollTop();
    this.clientHeight = window.innerHeight ||
      document.documentElement.clientHeight || document.body.clientHeight;
    const dom = this.props.location ? mapped.get(this.props.location) : this.dom;
    if (!dom) {
      throw new Error('"location" is null');
    }
    const offsetTop = dom.getBoundingClientRect().top + scrollTop;
    const elementShowHeight = scrollTop - offsetTop + this.clientHeight;
    const currentShow = this.scrollTop - offsetTop + this.clientHeight;
    const scrollTopValue = scrollTop - this.scrollTop;
    this.defaultData.forEach(item => {
      if (scrollTopValue > 0 && elementShowHeight < item.delay ||
        scrollTopValue < 0 && elementShowHeight > item.delay) {
        item.onStart.only = false;
      }
      if ((elementShowHeight >= item.delay && currentShow <= item.delay && scrollTopValue > 0 ||
        elementShowHeight <= item.delay && currentShow >= item.delay && scrollTopValue < 0)
        && !item.onStart.only) {
        item.onStart.only = true;
        item.onStart();
      }
      const time = item.delay + item.duration;
      if (scrollTopValue > 0 && elementShowHeight < time ||
        scrollTopValue < 0 && elementShowHeight > time) {
        item.onComplete.only = false;
      }
      if (!item.onComplete.only &&
        (elementShowHeight >= time && currentShow <= time && scrollTopValue > 0 ||
        elementShowHeight <= time && currentShow >= time && scrollTopValue < 0)) {
        item.onComplete();
        item.onComplete.only = true;
      }
    });
    ticker.clear(this.tickerId);
    this.tickerId = `scrollParallax${Date.now()}-${tickerId}`;
    tickerId++;
    if (tickerId >= Number.MAX_VALUE) {
      tickerId = 0;
    }
    const startFrame = ticker.frame;
    ticker.wake(this.tickerId, () => {
      const moment = (ticker.frame - startFrame) * ticker.perFrame;
      const ratio = easingTypes.easeOutQuad(moment, 0.08, 1, 300);
      this.timeline.frame(currentShow + ratio * (elementShowHeight - currentShow));
      if (moment >= 300) {
        ticker.clear(this.tickerId);
      }
    });

    this.scrollTop = scrollTop;
    // 如果不一直靠滚动来执行动画，always=false而且动画全执行完了，，删除scrollEvent;
    if (this.defaultData.every(c => c.onComplete.only) && !this.props.always) {
      EventListener.removeEventListener(this.eventType, this.scrollEventListener);
    }
  }

  render() {
    const props = assign({}, this.props);
    [
      'animation',
      'always',
      'component',
    ].forEach(key => delete props[key]);
    const style = assign({}, props.style);
    for (const p in style) {
      if (p.indexOf('filter') >= 0 || p.indexOf('Filter') >= 0) {
        // ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix=> style[`${prefix}Filter`] = style[p]);
        const transformArr = ['Webkit', 'Moz', 'Ms', 'ms'];
        for (let i = 0; i < transformArr.length; i++) {
          style[`${transformArr[i]}Filter`] = style[p];
        }
      }
    }
    props.style = style;
    return React.createElement(this.props.component, props);
  }
}

const objectOrArray = React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]);
const childPropTypes = React.PropTypes.oneOfType([objectOrArray, React.PropTypes.string]);
ScrollParallax.propTypes = {
  component: React.PropTypes.string,
  animation: objectOrArray,
  always: React.PropTypes.bool,
  location: React.PropTypes.string,
  children: childPropTypes,
  className: React.PropTypes.string,
  style: objectOrArray,
  scrollName: React.PropTypes.string,
};

ScrollParallax.defaultProps = {
  component: 'div',
  always: true,
};

export default ScrollParallax;
