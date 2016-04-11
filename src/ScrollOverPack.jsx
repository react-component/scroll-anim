import React, { createElement } from 'react';
import ReactDom from 'react-dom';
import EventListener from './EventDispatcher';
import mapped from './Mapped';
import {currentScrollTop} from './util';

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
    this.computedStyle = document.defaultView.getComputedStyle(this.dom);
    if (this.props.scrollName) {
      mapped.register(this.props.scrollName, this.dom);
    }
    const date = Date.now();
    const length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
    this.eventType = 'scroll.scrollEvent' + date + length;
    this.scrollEventListener();
    EventListener.addEventListener(this.eventType, this.scrollEventListener);
  }

  componentWillUnmount() {
    mapped.unRegister(this.props.scrollName);
    EventListener.removeEventListener(this.eventType, this.scrollEventListener);
  }

  scrollEventListener(e) {
    const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const scrollTop = currentScrollTop();
    // 屏幕缩放时的响应，所以放回这里，这个是pack，只处理子级里面的动画，所以marginTop无关系，所以不需减掉；
    const domRect = this.dom.getBoundingClientRect();
    const offsetTop = domRect.top + scrollTop;
    const elementShowHeight = scrollTop - offsetTop + clientHeight;
    const playHeight = clientHeight * this.props.playScale;

    // 设置往上时的出场点...
    const leaveHeight = domRect.height > clientHeight ? clientHeight / 2 : domRect.height / 2;
    const replay = this.props.replay ? elementShowHeight >= playHeight && elementShowHeight <= clientHeight + leaveHeight : elementShowHeight >= playHeight;
    if (replay) {
      if (!this.state.show) {
        this.setState({
          show: true,
        });
      }
      if (!this.props.always) {
        EventListener.removeEventListener(this.eventType, this.scrollEventListener);
      }
    } else if (this.state.show) {
      this.setState({
        show: false,
      });
    }

    if (e) {
      this.props.scrollEvent(e);
    }
  }

  render() {
    const placeholderProps = this.props;
    let childToRender;
    if (!this.oneEnter && !this.state.show) {
      childToRender = createElement(this.props.component, placeholderProps, null);
      this.oneEnter = true;
    } else {
      if (!this.state.show) {
        this.state.children = this.state.children.map(item => {
          let element;
          const hideProps = item.props.hideProps;
          if (hideProps) {
            if ('child' in hideProps) {
              element = React.cloneElement(item, {}, null);
              return element;
            }
            element = React.cloneElement(item, { ...hideProps });
            return element;
          }
          return null;
        });
      } else {
        this.state.children = this.children;
      }
      childToRender = createElement(this.props.component, placeholderProps, this.state.children);
    }
    return childToRender;
  }
}
const objectOrArray = React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]);
ScrollOverPack.propTypes = {
  component: React.PropTypes.string,
  playScale: React.PropTypes.number,
  always: React.PropTypes.bool,
  scrollEvent: React.PropTypes.func,
  children: objectOrArray,
  className: React.PropTypes.string,
  style: objectOrArray,
  scrollName: React.PropTypes.string,
  replay: React.PropTypes.bool,
};

ScrollOverPack.defaultProps = {
  component: 'div',
  playScale: 0.5,
  always: true,
  scrollEvent: noop,
  replay: false,
};

export default ScrollOverPack;
