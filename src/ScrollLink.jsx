/**
 * Created by jljsj on 16/1/13.
 */
import React, {createElement} from 'react';
import assign from 'object-assign';
import easingTypes from 'tween-functions';
import requestAnimationFrame from 'raf';
import EventListener from './EventDispatcher';
import {transformArguments} from './util';

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
    this.elementDom = document.querySelectorAll(this.props.to);
    if (this.elementDom.length > 1) {
      throw new Error('"to" Length can not be more than 1, Current length:' + this.elementDom.length);
    }
    this.elementDom = this.elementDom[0];
    const date = Date.now();
    const length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
    this.eventType = 'scroll.scrollEvent' + date + length;
    this.scrollEventListener();
    EventListener.addEventListener(this.eventType, this.scrollEventListener);
  }

  componentWillUnmount() {
    EventListener.removeEventListener(this.eventType, this.scrollEventListener);
    this.cancelRequestAnimationFrame();
  }

  onClick(e) {
    e.preventDefault();
    const docRect = document.documentElement.getBoundingClientRect();
    const elementRect = this.elementDom.getBoundingClientRect();
    this.scrollTop = window.pageYOffset;
    const toTop = Math.round(elementRect.top) - Math.round(docRect.top);
    this.toTop = this.props.toShowHeight ? toTop - transformArguments(this.props.showHeightActive)[0] : toTop;
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
    const easeValue = easingTypes[this.props.ease](progressTime, this.scrollTop, this.toTop, duration);
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
    const elementRect = this.elementDom.getBoundingClientRect();
    const elementClientHeight = this.elementDom.clientHeight;
    const scrollTop = window.pageYOffset;
    const top = Math.round(docRect.top) - Math.round(elementRect.top) + scrollTop;
    const showHeightActive = transformArguments(this.props.showHeightActive);
    const startShowHeight = showHeightActive[0].toString().indexOf('%') >= 0 ? parseFloat(showHeightActive[0]) / 100 * elementClientHeight : parseFloat(showHeightActive[0]);
    const endShowHeight = showHeightActive[1].toString().indexOf('%') >= 0 ? parseFloat(showHeightActive[1]) / 100 * elementClientHeight : parseFloat(showHeightActive[1]);
    if (top >= -0.5 - startShowHeight && top <= elementClientHeight - 0.5 - endShowHeight) {
      this.setState({
        active: true,
      });
    } else {
      this.setState({
        active: false,
      });
    }
  }

  render() {
    const active = this.state.active ? this.props.active : '';
    const onClick = this.props.onClick;
    const props = assign({}, this.props, {
      onClick: (e)=> {
        onClick(e);
        this.onClick(e);
      },
    });
    props.className = props.className.indexOf(active) === -1 ? `${props.className} ${active}` : props.className.replace(/active/ig, '').trim();
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
  to: React.PropTypes.string,
  showHeightActive: stringOrNumberOrArray,
  toShowHeight: React.PropTypes.bool,
  ease: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

ScrollLink.defaultProps = {
  component: 'div',
  duration: 450,
  active: 'active',
  showHeightActive: 0,
  ease: 'easeInOutQuad',
  onClick: noop,
};


export default ScrollLink;
