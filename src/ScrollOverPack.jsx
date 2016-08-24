import React, { createElement } from 'react';
import ReactDom from 'react-dom';
import EventListener from './EventDispatcher';
import mapped from './Mapped';
import { currentScrollTop, transformArguments } from './util';

function noop() {
}

function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

class ScrollOverPack extends React.Component {
  constructor() {
    super(...arguments);
    this.children = toArrayChildren(this.props.children);
    this.oneEnter = false;
    this.state = {
      show: false,
      children: toArrayChildren(this.props.children),
    };
    [
      'scrollEventListener',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.dom = ReactDom.findDOMNode(this);
    // this.computedStyle = document.defaultView.getComputedStyle(this.dom);
    if (this.props.scrollName) {
      mapped.register(this.props.scrollName, this.dom);
    }
    const date = Date.now();
    const length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
    this.eventType = `scroll.scrollEvent${date}${length}`;
    this.scrollEventListener();
    EventListener.addEventListener(this.eventType, this.scrollEventListener);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      children: toArrayChildren(nextProps.children),
    });
  }

  componentWillUnmount() {
    mapped.unRegister(this.props.scrollName);
    EventListener.removeEventListener(this.eventType, this.scrollEventListener);
  }

  scrollEventListener(e) {
    const clientHeight = window.innerHeight ||
      document.documentElement.clientHeight || document.body.clientHeight;
    const scrollTop = currentScrollTop();
    // 屏幕缩放时的响应，所以放回这里，这个是pack，只处理子级里面的动画，所以marginTop无关系，所以不需减掉；
    const domRect = this.dom.getBoundingClientRect();
    const offsetTop = domRect.top + scrollTop;
    const elementShowHeight = scrollTop - offsetTop + clientHeight;
    const playScale = transformArguments(this.props.playScale);
    const playHeight = clientHeight * playScale[0];

    const enter = elementShowHeight >= playHeight && elementShowHeight <= clientHeight + playHeight;
    const bottomLeave = elementShowHeight < playHeight;
    // 设置往上时的出场点...
    const leaveHeight = domRect.height > clientHeight ? clientHeight : domRect.height;
    const topLeave = this.props.replay ?
    elementShowHeight > clientHeight + leaveHeight * playScale[1] : null;
    let mode = 'scroll';
    if (enter) {
      if (!this.state.show) {
        this.setState({
          show: true,
        });
        mode = 'enter';
        this.props.onChange({ mode, scrollName: this.props.scrollName });
      }
      if (!this.props.always) {
        EventListener.removeEventListener(this.eventType, this.scrollEventListener);
      }
    }
    if (topLeave || bottomLeave) {
      if (this.state.show) {
        this.setState({
          show: false,
        });
        mode = 'leave';
        this.props.onChange({ mode, scrollName: this.props.scrollName });
      }
    }

    if (e) {
      this.props.scrollEvent({ mode, scrollName: this.props.scrollName, e });
    }
  }

  render() {
    const { ...placeholderProps } = this.props;
    [
      'scrollName',
      'playScale',
      'replay',
      'component',
      'playScale',
      'always',
      'scrollEvent',
      'hideProps',
    ].forEach(key => delete placeholderProps[key]);
    let childToRender;
    if (!this.oneEnter && !this.state.show) {
      childToRender = createElement(this.props.component, { ...placeholderProps }, null);
      this.oneEnter = true;
    } else {
      if (!this.state.show) {
        this.children = this.children.map(item => {
          if (!item || !item.key) {
            return null;
          }
          let element;
          const hideProps = this.props.hideProps[item.key];
          if (hideProps) {
            element = React.cloneElement(item, { ...hideProps });
            return element;
          }
          element = React.cloneElement(item, {}, null);
          return element;
        });
      } else {
        this.children = this.state.children;
      }
      childToRender = createElement(this.props.component, { ...placeholderProps }, this.children);
    }
    return childToRender;
  }
}
const objectOrArray = React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]);
const numberOrArray = React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.array]);
ScrollOverPack.propTypes = {
  component: React.PropTypes.string,
  playScale: numberOrArray,
  always: React.PropTypes.bool,
  scrollEvent: React.PropTypes.func,
  children: objectOrArray,
  className: React.PropTypes.string,
  style: objectOrArray,
  scrollName: React.PropTypes.string,
  replay: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  hideProps: React.PropTypes.object,
};

ScrollOverPack.defaultProps = {
  component: 'div',
  playScale: 0.5,
  always: true,
  scrollEvent: noop,
  replay: false,
  onChange: noop,
  hideProps: {},
};

export default ScrollOverPack;
