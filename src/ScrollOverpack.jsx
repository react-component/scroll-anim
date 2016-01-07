import React, { createElement } from 'react';
import ReactDom from 'react-dom';
import EventListener from './EventDispatcher';

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
    this.entered = false;
    this.children = toArrayChildren(this.props.children);
    this.oneEnter = false;
    this.state = {
      show: false,
      children: toArrayChildren(this.props.children),
    };
    [
      'scrollEventListener',
    ].forEach((method) => this[method] = this[method].bind(this));
    const date = Date.now();
    const length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
    this.eventType = 'scroll.scrollEvent' + date + length;
    EventListener.addEventListener(this.eventType, this.scrollEventListener);
  }

  componentDidMount() {
    const dom = ReactDom.findDOMNode(this);
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    this.offsetTop = dom.getBoundingClientRect().top + scrollTop;
    this.scrollEventListener(null);
  }

  componentWillUnmount() {
    EventListener.removeEventListener(this.eventType, this.scrollEventListener);
  }

  scrollEventListener(e) {
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const elementShowHeight = scrollTop - this.offsetTop + clientHeight;
    if (elementShowHeight >= clientHeight * this.props.playScale) {
      if (!this.state.show) {
        this.setState({
          show: true,
        });
      }
      if (!this.props.repeat) {
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
        this.state.children = this.state.children.map(item=> {
          let element;
          switch (item.type.name || item.type.displayName) {
          case 'QueueAnim':
            element = React.cloneElement(item, item.props, null);
            return element;
          case 'TweenOne':
            element = React.cloneElement(item, {type: 'reverse'});
            return element;
          case 'Animate':
            element = React.cloneElement(item, item.props, null);
            return element;
          default:
            return null;
          }
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
  repeat: React.PropTypes.bool,
  scrollEvent: React.PropTypes.func,
  children: objectOrArray,
  className: React.PropTypes.string,
  style: objectOrArray,
};

ScrollOverPack.defaultProps = {
  component: 'div',
  playScale: 0.5,
  repeat: true,
  scrollEvent: noop,
};

export default ScrollOverPack;
