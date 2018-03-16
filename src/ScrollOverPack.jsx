import React, { createElement } from 'react';
import PropTypes from 'prop-types';
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      children: toArrayChildren(nextProps.children),
    }, () => {
      const inListener = EventListener._listeners.scroll &&
        EventListener._listeners.scroll.some(c => c.n === this.eventType.split('.')[1]);
      if (nextProps.always && !inListener) {
        this.addScrollEvent();
      } else {
        this.scrollEventListener();
      }
    });
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
      if (!this.props.always && this.eventType) {
        EventListener.removeEventListener(this.eventType, this.scrollEventListener, this.target);
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
      'targetId',
    ].forEach(key => delete placeholderProps[key]);
    let childToRender;
    if (!this.oneEnter) {
      const show = !this.props.appear;
      const children = toArrayChildren(this.props.children).map(item => (
        item.type.isTweenOne ?
          React.cloneElement(item, { ...item.props, paused: !show }) :
          React.cloneElement(item, item.props, show && item.props.children)
      ));
      childToRender = createElement(this.props.component, { ...placeholderProps }, children);
      this.oneEnter = true;
    } else {
      if (!this.state.show) {
        this.children = this.children.map(item => {
          if (!item) {
            return null;
          }
          // 判断 TweenOne;
          if (item.type.isTweenOne) {
            return React.cloneElement(item, { reverse: true });
          }
          return React.cloneElement(item, {}, null);
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
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  playScale: PropTypes.any,
  always: PropTypes.bool,
  scrollEvent: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.any,
  replay: PropTypes.bool,
  onChange: PropTypes.func,
  appear: PropTypes.bool,
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
ScrollOverPack.isScrollOverPack = true;

export default ScrollOverPack;
