import React, { createElement } from 'react';
import TweenOne from 'rc-tween-one';
import EventListener from './EventDispatcher';
import ScrollElement from './ScrollElement';
import { toArrayChildren } from './util';

function noop() {
}

class ScrollOverPack extends ScrollElement {
  constructor(props) {
    super(props);
    this.children = toArrayChildren(props.children);
    this.oneEnter = false;
    this.enter = false;
    this.state = {
      show: false,
      children: toArrayChildren(props.children),
    };
  }

  scrollEventListener = (e) => {
    this.getParam(e);
    const isTop = this.elementShowHeight > this.clientHeight + this.leavePlayHeight;
    if (this.enter || !this.props.replay && isTop) {
      if (!this.state.show) {
        this.setState({
          show: true,
        });
      }
      if (!this.props.always) {
        EventListener.removeEventListener(this.eventType, this.scrollEventListener);
      }
    } else {
      const bottomLeave = this.elementShowHeight < this.playHeight;
      // 设置往上时的出场点...
      const topLeave = this.props.replay ? isTop : null;
      if (topLeave || bottomLeave) {
        if (this.state.show) {
          this.setState({
            show: false,
          });
        }
      }
    }
  }

  render() {
    const { ...placeholderProps } = this.props;
    [
      'playScale',
      'replay',
      'component',
      'always',
      'scrollEvent',
      'appear',
      'location',
    ].forEach(key => delete placeholderProps[key]);
    let childToRender;
    if (!this.oneEnter) {
      const children = !this.props.appear && this.props.children;
      childToRender = createElement(this.props.component, { ...placeholderProps }, children);
      this.oneEnter = true;
    } else {
      if (!this.state.show) {
        this.children = this.children.map(item => {
          if (!item || !item.key) {
            return null;
          }
          let element;
          if (item.type === TweenOne) {
            element = React.cloneElement(item, { reverse: true });
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
ScrollOverPack.propTypes = {
  component: React.PropTypes.string,
  playScale: React.PropTypes.any,
  always: React.PropTypes.bool,
  scrollEvent: React.PropTypes.func,
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  style: React.PropTypes.any,
  replay: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  appear: React.PropTypes.bool,
};

ScrollOverPack.defaultProps = {
  component: 'div',
  playScale: 0.5,
  always: true,
  scrollEvent: noop,
  replay: false,
  onChange: noop,
  appear: true,
};

export default ScrollOverPack;
