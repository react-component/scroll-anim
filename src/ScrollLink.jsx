/**
 * Created by jljsj on 16/1/13.
 */
import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';
import easingTypes from 'tween-functions';
import requestAnimationFrame from 'raf';
import EventListener from './EventDispatcher';
import { transformArguments, currentScrollTop } from './util';
import mapped from './Mapped';

function noop() {
}


class ScrollLink extends React.Component {
  constructor() {
    super(...arguments);
    this.rafID = -1;
    this.state = {
      active: false,
    };
    [
      'scrollEventListener',
      'onClick',
      'raf',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
    const date = Date.now();
    const length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
    this.eventType = `scroll.scrollAnchorEvent${date}${length}`;
    EventListener.addEventListener(this.eventType, this.scrollEventListener);
    // 第一次进入；
    setTimeout(() => {
      this.scrollEventListener();
    });
  }

  componentWillUnmount() {
    EventListener.removeEventListener(this.eventType, this.scrollEventListener);
    this.cancelRequestAnimationFrame();
  }

  onClick(e) {
    e.preventDefault();
    const docRect = document.documentElement.getBoundingClientRect();
    const elementDom = mapped.get(this.props.location);
    const elementRect = elementDom.getBoundingClientRect();
    this.scrollTop = currentScrollTop();
    const toTop = Math.round(elementRect.top) - Math.round(docRect.top);
    this.toTop = this.props.toShowHeight ?
      toTop - transformArguments(this.props.showHeightActive)[0] : toTop;
    this.initTime = Date.now();
    this.rafID = requestAnimationFrame(this.raf);
  }

  raf() {
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
    } else {
      this.rafID = requestAnimationFrame(this.raf);
    }
  }

  cancelRequestAnimationFrame() {
    requestAnimationFrame.cancel(this.rafID);
    this.rafID = -1;
  }

  scrollEventListener() {
    const docRect = document.documentElement.getBoundingClientRect();
    const clientHeight = window.innerHeight ||
      document.documentElement.clientHeight || document.body.clientHeight;
    const elementDom = mapped.get(this.props.location);
    if (!elementDom) {
      throw new Error(`There is no location(${this.props.location}) in the element.`);
    }
    const elementRect = elementDom.getBoundingClientRect();
    const elementClientHeight = elementDom.clientHeight;
    const scrollTop = currentScrollTop();
    const top = Math.round(docRect.top - elementRect.top + scrollTop);
    const showHeightActive = transformArguments(this.props.showHeightActive);
    const startShowHeight = showHeightActive[0].toString().indexOf('%') >= 0 ?
      parseFloat(showHeightActive[0]) / 100 * clientHeight :
      parseFloat(showHeightActive[0]);
    const endShowHeight = showHeightActive[1].toString().indexOf('%') >= 0 ?
      parseFloat(showHeightActive[1]) / 100 * clientHeight :
      parseFloat(showHeightActive[1]);
    if (top >= - startShowHeight && top < elementClientHeight - endShowHeight) {
      if (!this.props.onFocus.only) {
        const obj = {
          target: this.dom,
          location: this.props.location,
        };
        this.props.onFocus.call(this, obj);
        this.props.onFocus.only = true;
      }
      this.setState({
        active: true,
      });
    } else {
      if (this.props.onFocus.only) {
        const obj = {
          target: this.dom,
          location: this.props.location,
        };
        this.props.onBlur.call(this, obj);
      }
      this.props.onFocus.only = false;
      this.setState({
        active: false,
      });
    }
  }

  render() {
    const active = this.state.active ? this.props.active : '';
    const onClick = this.props.onClick;
    const props = assign({}, this.props, {
      onClick: (e) => {
        onClick(e);
        this.onClick(e);
      },
    });
    [
      'component',
      'duration',
      'active',
      'location',
      'showHeightActive',
      'ease',
      'toShowHeight',
    ].forEach(key => delete props[key]);
    const reg = new RegExp(active, 'ig');
    props.className = props.className && props.className.indexOf(active) === -1 ?
      `${props.className} ${active}` : props.className.replace(reg, '').trim();
    return createElement(this.props.component, props);
  }
}

const stringOrNumber = React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]);
const stringOrNumberOrArray = React.PropTypes.oneOfType([stringOrNumber, React.PropTypes.array]);
const objectOrArray = React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]);
const childPropTypes = React.PropTypes.oneOfType([objectOrArray, React.PropTypes.string]);
ScrollLink.propTypes = {
  component: React.PropTypes.string,
  children: childPropTypes,
  className: React.PropTypes.string,
  style: objectOrArray,
  duration: React.PropTypes.number,
  active: React.PropTypes.string,
  location: React.PropTypes.string,
  showHeightActive: stringOrNumberOrArray,
  toShowHeight: React.PropTypes.bool,
  ease: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
};

ScrollLink.defaultProps = {
  component: 'div',
  duration: 450,
  active: 'active',
  showHeightActive: '50%',
  ease: 'easeInOutQuad',
  onClick: noop,
  onFocus: noop,
  onBlur: noop,
};


export default ScrollLink;
