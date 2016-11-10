/**
 * Created by jljsj on 16/1/13.
 */
import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import easingTypes from 'tween-functions';
import requestAnimationFrame from 'raf';
import EventListener from './EventDispatcher';
import { transformArguments, currentScrollTop, windowHeight } from './util';

function noop() {
}

let scrollLinkLists = [];

class ScrollLink extends React.Component {
  constructor() {
    super(...arguments);
    this.rafID = -1;
    this.state = {
      active: false,
    };
    if (this.props.location) {
      throw new Error('ScrollLink "location" was abandoned, please use "to"');
    }
  }

  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
    scrollLinkLists.push(this);
    if (this.props.onAsynchronousAddEvent) {
      this.props.onAsynchronousAddEvent(this.addScrollEventListener);
    } else {
      this.addScrollEventListener();
    }
  }

  componentWillUnmount() {
    scrollLinkLists = scrollLinkLists.filter(item => item !== this);
    EventListener.removeEventListener(this.eventType, this.scrollEventListener);
    this.cancelRequestAnimationFrame();
  }

  onClick = (e) => {
    e.preventDefault();
    if (this.rafID !== -1) {
      return;
    }
    const docRect = document.documentElement.getBoundingClientRect();
    const elementDom = document.getElementById(this.props.to);
    const elementRect = elementDom.getBoundingClientRect();
    this.scrollTop = currentScrollTop();
    const toTop = Math.round(elementRect.top) - Math.round(docRect.top) - this.props.offsetTop;
    const t = transformArguments(this.props.showHeightActive)[0];
    const toShow = t.match('%') ? this.clientHeight * parseFloat(t) / 100 : t;
    this.toTop = this.props.toShowHeight ?
    toTop - toShow + 0.5 : toTop;
    this.initTime = Date.now();
    this.rafID = requestAnimationFrame(this.raf);
    EventListener.removeAllType('scroll.scrollAnchorEvent');
    scrollLinkLists.forEach(item => {
      if (item !== this) {
        item.remActive();
      }
    });
    this.addActive();
  }

  addScrollEventListener = () => {
    const date = Date.now();
    const length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
    this.eventType = `scroll.scrollAnchorEvent${date}${length}`;
    EventListener.addEventListener(this.eventType, this.scrollEventListener);
    // 第一次进入；等全部渲染完成后执行;
    setTimeout(() => {
      this.scrollEventListener();
    });
  }

  raf = () => {
    if (this.rafID === -1) {
      return;
    }
    const duration = this.props.duration;
    const now = Date.now();
    const progressTime = now - this.initTime > duration ? duration : now - this.initTime;
    const easeValue = easingTypes[this.props.ease](progressTime, this.scrollTop,
      this.toTop, duration);
    window.scrollTo(window.scrollX, easeValue);
    if (progressTime === duration) {
      this.cancelRequestAnimationFrame();
      EventListener.reAllType('scroll.scrollAnchorEvent');
    } else {
      this.rafID = requestAnimationFrame(this.raf);
    }
  }

  cancelRequestAnimationFrame = () => {
    requestAnimationFrame.cancel(this.rafID);
    this.rafID = -1;
  }

  addActive = () => {
    if (!this.state.active) {
      const obj = {
        target: this.dom,
        to: this.props.to,
      };
      this.props.onFocus(obj);
      this.setState({
        active: true,
      }, () => {
        if (this.props.toHash) {
          const link = `#${this.props.to}`;
          history.pushState(null, window.title, link);
        }
      });
    }
  };

  remActive = () => {
    if (this.state.active) {
      const obj = {
        target: this.dom,
        to: this.props.to,
      };
      this.props.onBlur(obj);
      this.setState({
        active: false,
      });
    }
  }

  scrollEventListener = () => {
    const docRect = document.documentElement.getBoundingClientRect();
    this.clientHeight = windowHeight();
    const elementDom = document.getElementById(this.props.to);
    if (!elementDom) {
      throw new Error(`There is no to(${this.props.to}) in the element.`);
    }
    const elementRect = elementDom.getBoundingClientRect();
    const elementClientHeight = elementDom.clientHeight;
    const scrollTop = currentScrollTop();
    const top = Math.round(docRect.top - elementRect.top + scrollTop);
    const showHeightActive = transformArguments(this.props.showHeightActive);
    const startShowHeight = showHeightActive[0].toString().indexOf('%') >= 0 ?
    parseFloat(showHeightActive[0]) / 100 * this.clientHeight :
      parseFloat(showHeightActive[0]);
    const endShowHeight = showHeightActive[1].toString().indexOf('%') >= 0 ?
    parseFloat(showHeightActive[1]) / 100 * this.clientHeight :
      parseFloat(showHeightActive[1]);
    if (top >= -startShowHeight && top < elementClientHeight - endShowHeight) {
      this.addActive();
    } else {
      this.remActive();
    }
  }

  render() {
    const active = this.state.active ? this.props.active : '';
    const onClick = this.props.onClick;
    const props = {
      ...this.props,
      onClick: (e) => {
        onClick(e);
        this.onClick(e);
      },
    };
    [
      'component',
      'duration',
      'active',
      'location',
      'showHeightActive',
      'ease',
      'toShowHeight',
      'offsetTop',
      'to',
      'onAsynchronousAddEvent',
      'toHash',
    ].forEach(key => delete props[key]);
    const reg = new RegExp(active, 'ig');
    const className = props.className || '';
    props.className = className.indexOf(active) === -1 ?
      `${className} ${active}`.trim() : className.replace(reg, '').trim();
    return createElement(this.props.component, props);
  }
}

ScrollLink.propTypes = {
  component: React.PropTypes.string,
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  style: React.PropTypes.any,
  offsetTop: React.PropTypes.number,
  duration: React.PropTypes.number,
  active: React.PropTypes.string,
  location: React.PropTypes.string,
  to: React.PropTypes.string,
  showHeightActive: React.PropTypes.any,
  toShowHeight: React.PropTypes.bool,
  ease: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onAsynchronousAddEvent: React.PropTypes.func,
  toHash: React.PropTypes.bool,
};

ScrollLink.defaultProps = {
  component: 'div',
  offsetTop: 0,
  duration: 450,
  active: 'active',
  showHeightActive: '50%',
  ease: 'easeInOutQuad',
  toHash: true,
  onClick: noop,
  onFocus: noop,
  onBlur: noop,
};


export default ScrollLink;
