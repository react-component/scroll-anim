import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import EventListener from './EventDispatcher';
import ScrollElement from './ScrollElement';
import { toArrayChildren, noop, windowIsUndefined } from './util';

class ScrollOverPack extends ScrollElement {
  static propTypes = {
    component: PropTypes.any,
    playScale: PropTypes.any,
    always: PropTypes.bool,
    scrollEvent: PropTypes.func,
    children: PropTypes.any,
    className: PropTypes.string,
    style: PropTypes.any,
    replay: PropTypes.bool,
    onChange: PropTypes.func,
    onScroll: PropTypes.func,
    appear: PropTypes.bool,
    componentProps: PropTypes.object,
  }
  static defaultProps = {
    component: 'div',
    playScale: 0.5,
    always: true,
    scrollEvent: noop,
    replay: false,
    onChange: noop,
    onScroll: noop,
    appear: true,
    componentProps: {},
  }

  static getDerivedStateFromProps(props, { prevProps }) {
    const nextState = {
      prevProps: props,
    };
    if (prevProps && props !== prevProps) {
      nextState.children = toArrayChildren(props.children);
    }
    return nextState;
  }

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

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { always } = this.props;
      const { show } = this.state;
      const inListener = EventListener._listeners.scroll &&
        EventListener._listeners.scroll.some(c => c.n === this.eventType.split('.')[1]);
      if (always && !inListener) {
        this.addScrollEvent();
      } else if (!always && !show) {
        this.scrollEventListener();
      }
    }
  }

  scrollEventListener = (e) => {
    this.getParam(e);
    const { show } = this.state;
    const { always, replay } = this.props;
    const isTop = this.elementShowHeight > this.clientHeight + this.leavePlayHeight;
    if (this.enter || !replay && isTop) {
      if (!show) {
        this.setState({
          show: true,
        });
      }
      if (!always && this.eventType) {
        EventListener.removeEventListener(this.eventType, this.scrollEventListener, this.target);
      }
    } else if (always) {
      const bottomLeave = this.elementShowHeight < this.playHeight;
      // 设置往上时的出场点...
      const topLeave = replay ? isTop : null;
      if (topLeave || bottomLeave) {
        if (show) {
          this.setState({
            show: false,
          });
        }
      }
    }
  }

  render() {
    const {
      playScale,
      replay,
      component,
      always,
      scrollEvent,
      appear,
      location,
      targetId,
      onChange,
      onScroll,
      componentProps,
      ...props
    } = this.props;
    if (windowIsUndefined) {
      return createElement(component, { ...props, ...componentProps });
    }
    let childToRender;
    if (!this.oneEnter) {
      const show = !appear;
      const children = toArrayChildren(props.children).map(item => {
        if (!item) {
          return null;
        }
        const key = item.key || (Date.now() + Math.random()).toString(16).replace('.', '');
        return (
          item.type.isTweenOne ?
            React.cloneElement(item, { ...item.props, key, paused: !show }) :
            React.cloneElement(item, { ...item.props, key }, show && item.props.children)
        );
      });
      childToRender = createElement(component, { ...props, ...componentProps }, children);
      this.oneEnter = true;
    } else {
      if (!this.state.show) {
        this.children = this.children.map(item => {
          if (!item) {
            return null;
          }
          const key = item.key || (Date.now() + Math.random()).toString(16).replace('.', '');
          // 判断 TweenOne;
          if (item.type.isTweenOne) {
            return React.cloneElement(item, { key, reverse: true });
          }
          return React.cloneElement(item, { key }, null);
        });
      } else {
        this.children = this.state.children;
      }
      childToRender = createElement(component, { ...props, ...componentProps }, this.children);
    }
    return childToRender;
  }
}
ScrollOverPack.isScrollOverPack = true;

export default ScrollOverPack;
