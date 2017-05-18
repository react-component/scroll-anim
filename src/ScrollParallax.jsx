import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import EventListener from './EventDispatcher';
import easingTypes from 'tween-functions';
import Timeline from 'rc-tween-one/lib/TimeLine';
import ticker from 'rc-tween-one/lib/ticker';
import { dataToArray, objectEqual, currentScrollTop, windowHeight } from './util';

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
  constructor(props) {
    super(props);
    this.scrollTop = 0;
    this.defaultTweenData = [];
    this.defaultData = [];
    this.timeout = null;
    this.state = {};
  }

  componentDidMount() {
    this.dom = ReactDom.findDOMNode(this);
    this.scrollTop = currentScrollTop();
    this.clientHeight = window.innerHeight ||
      document.documentElement.clientHeight || document.body.clientHeight;
    this.setDefaultData(this.props.animation || {});

    // 第一次进入;
    this.timeout = setTimeout(() => {
      this.timeline = new Timeline(this.dom, this.defaultTweenData, {});
      // 预注册;
      this.timeline.frame(0);
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
    if (!this.eventType && this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    } else {
      EventListener.removeEventListener(this.eventType, this.scrollEventListener);
    }
  }

  setDefaultData = _vars => {
    const vars = dataToArray(_vars);
    const varsForIn = (item, i) => {
      const playScale = playScaleToArray(item.playScale).map(data => data * this.clientHeight);
      const aItem = { ...item };
      delete aItem.playScale;
      const cItem = { ...item };
      delete cItem.playScale;
      cItem.delay = aItem.delay = playScale[0];
      cItem.duration = aItem.duration = playScale[1] - playScale[0];
      cItem.onStart = null;
      cItem.onUpdate = null;
      cItem.onComplete = null;
      cItem.onRepeat = null;
      aItem.onStart = aItem.onStart || noop;
      aItem.onComplete = aItem.onComplete || noop;
      aItem.onStartBack = aItem.onStartBack || noop;
      aItem.onCompleteBack = aItem.onCompleteBack || noop;
      this.defaultTweenData[i] = cItem;
      this.defaultData[i] = aItem;
    };
    vars.forEach(varsForIn);
  }

  scrollEventListener = () => {
    const scrollTop = currentScrollTop();
    this.clientHeight = windowHeight();
    const dom = this.props.location ? document.getElementById(this.props.location) : this.dom;
    if (!dom) {
      throw new Error('"location" is null');
    }
    const offsetTop = dom.getBoundingClientRect().top + scrollTop;
    const elementShowHeight = scrollTop - offsetTop + this.clientHeight;
    const currentShow = this.scrollTop - offsetTop + this.clientHeight;
    this.defaultData.forEach(item => {
      if (elementShowHeight <= item.delay) {
        if (!this.onCompleteBackBool && this.onStartBool) {
          this.onCompleteBackBool = true;
          item.onCompleteBack();
        }
      } else {
        this.onCompleteBackBool = false;
      }
      if (elementShowHeight >= item.delay) {
        if (!this.onStartBool) {
          this.onStartBool = true;
          item.onStart();
        }
      } else {
        this.onStartBool = false;
      }

      if (elementShowHeight <= item.delay + item.duration) {
        if (!this.onStartBackBool && this.onCompleteBool) {
          this.onStartBackBool = true;
          item.onStartBack();
        }
      } else {
        this.onStartBackBool = false;
      }

      if (elementShowHeight >= item.delay + item.duration) {
        if (!this.onCompleteBool) {
          this.onCompleteBool = true;
          item.onComplete();
        }
      } else {
        this.onCompleteBool = false;
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
    const props = { ...this.props };
    [
      'animation',
      'always',
      'component',
      'location',
      'id',
    ].forEach(key => delete props[key]);
    const style = { ...props.style };
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

ScrollParallax.propTypes = {
  component: PropTypes.string,
  animation: PropTypes.any,
  always: PropTypes.bool,
  location: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.any,
  id: PropTypes.string,
};

ScrollParallax.defaultProps = {
  component: 'div',
  always: true,
};
ScrollParallax.isScrollParallax = true;
export default ScrollParallax;
