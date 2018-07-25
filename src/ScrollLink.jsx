/**
 * Created by jljsj on 16/1/13.
 */
import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import easingTypes from 'tween-functions';
import requestAnimationFrame from 'raf';
import EventListener from './EventDispatcher';
import { noop, transformArguments, currentScrollTop, windowHeight } from './util';

let scrollLinkLists = [];

class ScrollLink extends React.Component {
  static propTypes = {
    component: PropTypes.any,
    children: PropTypes.any,
    className: PropTypes.string,
    style: PropTypes.any,
    offsetTop: PropTypes.number,
    duration: PropTypes.number,
    active: PropTypes.string,
    to: PropTypes.string,
    targetId: PropTypes.string,
    showHeightActive: PropTypes.any,
    toShowHeight: PropTypes.bool,
    ease: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    toHash: PropTypes.bool,
    componentProps: PropTypes.object,
  }
  static defaultProps = {
    component: 'div',
    offsetTop: 0,
    duration: 450,
    active: 'active',
    showHeightActive: '50%',
    ease: 'easeInOutQuad',
    toHash: false,
    onClick: noop,
    onFocus: noop,
    onBlur: noop,
    componentProps: {},
  }

  constructor() {
    super(...arguments);
    this.rafID = -1;
    this.state = {
      active: false,
    };
  }

  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
    this.target = this.props.targetId && document.getElementById(this.props.targetId);
    scrollLinkLists.push(this);
    const date = Date.now();
    const length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
    this.eventType = `scroll.scrollAnchorEvent${date}${length}`;
    EventListener.addEventListener(this.eventType, this.scrollEventListener, this.target);
    // 第一次进入；等全部渲染完成后执行;
    setTimeout(() => {
      this.scrollEventListener();
    });
  }

  componentWillUnmount() {
    scrollLinkLists = scrollLinkLists.filter(item => item !== this);
    EventListener.removeEventListener(this.eventType, this.scrollEventListener, this.target);
    this.cancelRequestAnimationFrame();
  }

  onClick = (e) => {
    e.preventDefault();
    EventListener.removeAllType('scroll.scrollAnchorEvent');
    const { elementDom, elementRect } = this.getElement();
    if (this.rafID !== -1 || !elementDom) {
      return;
    }
    this.scrollTop = this.target ? this.target.scrollTop : currentScrollTop();
    const targetTop = this.target ? this.target.getBoundingClientRect().top : 0;
    const toTop = Math.round(elementRect.top + this.scrollTop) - this.props.offsetTop - targetTop;
    const t = transformArguments(this.props.showHeightActive)[0];
    const toShow = t.match('%') ? this.clientHeight * parseFloat(t) / 100 : t;
    this.toTop = this.props.toShowHeight ?
      toTop - toShow + 0.5 : toTop;
    this.initTime = Date.now();
    this.rafID = requestAnimationFrame(this.raf);
    scrollLinkLists.forEach(item => {
      if (item !== this) {
        item.remActive();
      }
    });
    this.addActive();
  }

  getElement = () => {
    this.clientHeight = this.target ? this.target.clientHeight : windowHeight();
    const elementDom = document.getElementById(this.props.to);
    const elementRect = elementDom && elementDom.getBoundingClientRect();
    return { elementDom, elementRect };
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

  raf = () => {
    if (this.rafID === -1) {
      return;
    }
    const duration = this.props.duration;
    const now = Date.now();
    const progressTime = now - this.initTime > duration ? duration : now - this.initTime;
    const easeValue = easingTypes[this.props.ease](progressTime, this.scrollTop,
      this.toTop, duration);
    if (this.target) {
      this.target.scrollTop = easeValue;
    } else {
      window.scrollTo(window.scrollX, easeValue);
    }
    if (progressTime === duration) {
      this.cancelRequestAnimationFrame();
      EventListener.reAllType('scroll.scrollAnchorEvent');
    } else {
      this.rafID = requestAnimationFrame(this.raf);
    }
  }

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
    const { elementDom, elementRect } = this.getElement();
    if (!elementDom) {
      return;
    }
    const elementClientHeight = elementDom.clientHeight;
    const targetTop = this.target ? this.target.getBoundingClientRect().top : 0;
    const top = Math.round(- elementRect.top + targetTop);
    const showHeightActive = transformArguments(this.props.showHeightActive);
    const startShowHeight = showHeightActive[0].toString().indexOf('%') >= 0 ?
      parseFloat(showHeightActive[0]) / 100 * this.clientHeight :
      parseFloat(showHeightActive[0]);
    const endShowHeight = showHeightActive[1].toString().indexOf('%') >= 0 ?
      parseFloat(showHeightActive[1]) / 100 * this.clientHeight :
      parseFloat(showHeightActive[1]);
    if (top >= Math.round(-startShowHeight)
      && top < Math.round(elementClientHeight - endShowHeight)) {
      this.addActive();
    } else {
      this.remActive();
    }
  }

  render() {
    const active = this.state.active ? this.props.active : '';
    const { onClick, componentProps } = this.props;
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
      'showHeightActive',
      'ease',
      'toShowHeight',
      'offsetTop',
      'targetId',
      'to',
      'toHash',
      'componentProps',
    ].forEach(key => delete props[key]);
    const reg = new RegExp(active, 'ig');
    const className = props.className || '';
    props.className = className.indexOf(active) === -1 ?
      `${className} ${active}`.trim() : className.replace(reg, '').trim();
    return createElement(this.props.component, { ...props, ...componentProps });
  }
}
ScrollLink.isScrollLink = true;

export default ScrollLink;
