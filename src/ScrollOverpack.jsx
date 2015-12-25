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

    this.children = this.props.children || {};
    this.entered = false;
    this.state = {
      show: true,
    };


    [
      'scrollEventListener',
    ].forEach((method) => this[method] = this[method].bind(this));

    const date = Date.now();
    this.eventType = 'scroll.scrollEvent' + date;
    EventListener.addEventListener(this.eventType, this.scrollEventListener);
  }

  componentDidMount() {
    const dom = ReactDom.findDOMNode(this);
    this.computedStyle = document.defaultView.getComputedStyle(dom);
    this.scrollEventListener(null);
  }

  componentWillUnmount() {
    EventListener.removeEventListener(this.eventType, this.scrollEventListener);
  }

  scrollEventListener(e) {
    this.clientHeight = document.body.clientHeight;
    this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const dom = ReactDom.findDOMNode(this);
    const height = parseFloat(this.computedStyle.height);
    const offsetTop = dom.offsetTop;
    if (!offsetTop) {
      return;
    }
    if (this.scrollTop - offsetTop >= -(height * (1 - this.props.playScale))) {
      if (!this.state.show) {
        this.entered = true;
        this.setState({
          show: true,
        });
      }
    } else {
      if (this.state.show) {
        this.setState({
          show: false,
        });
      }
    }

    if (e) {
      this.props.scrollEvent(e);
    }
  }

  render() {
    const placeholderProps = {};
    placeholderProps.className = this.props.className || '';
    placeholderProps.style = this.props.style;
    if (this.computedStyle) {
      placeholderProps.height = this.computedStyle.height;
    }
    let childToRender = createElement(this.props.component, this.props, this.props.children);
    if (!this.state.show) {
      childToRender = createElement(this.props.component, placeholderProps, null);
      if (this.entered) {
        const childWap = [];
        toArrayChildren(this.props.children).map(item=> {
          if (item.type.name === 'QueueAnim') {
            const element = React.cloneElement(item, item.props, null);
            childWap.push(element);
          }
        });
        childToRender = createElement(this.props.component, this.props, childWap);
      }
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
