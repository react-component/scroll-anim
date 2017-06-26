import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import mapped from './Mapped';
import EventListener from './EventDispatcher';
import { currentScrollTop, transformArguments, windowHeight, toArrayChildren } from './util';

const noop = () => {
};
class ScrollElement extends React.Component {
  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
    if (this.props.location) {
      this.dom = document.getElementById(this.props.location);
      mapped.register(this.props.location, this.dom);
    } else if (this.props.id) {
      mapped.register(this.props.id, this.dom);
    }
    const date = Date.now();
    this.target = this.props.targetId && document.getElementById(this.props.targetId);

    const scrollTop = currentScrollTop();
    if (!scrollTop) {
      this.scrollEventListener();
    }
    const length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
    this.eventType = `scroll.scrollEvent${date}${length}`;
    EventListener.addEventListener(this.eventType, this.scrollEventListener, this.target);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      children: toArrayChildren(nextProps.children),
    });
  }

  componentWillUnmount() {
    mapped.unRegister(this.props.id);
    EventListener.removeEventListener(this.eventType, this.scrollEventListener, this.target);
  }

  getParam = (e) => {
    this.clientHeight = this.target ? this.target.clientHeight : windowHeight();
    const scrollTop = this.target ? this.target.scrollTop : currentScrollTop();
    const domRect = this.dom.getBoundingClientRect();
    const targetTop = this.target ? this.target.getBoundingClientRect().top : 0;
    const offsetTop = domRect.top + scrollTop - targetTop;
    this.elementShowHeight = scrollTop - offsetTop + this.clientHeight;
    const playScale = transformArguments(this.props.playScale);
    const playScaleEnterArray = /([\+\-]?[0-9#\.]+)(px|vh|%)?/.exec(String(playScale[0]));
    if (!playScaleEnterArray[2]) {
      this.playHeight = this.clientHeight * parseFloat(playScale[0]);
    } else if (playScaleEnterArray[2] === 'px') {
      this.playHeight = parseFloat(playScaleEnterArray[1]);
    } else {
      this.playHeight = this.clientHeight * parseFloat(playScaleEnterArray[1]) / 100;
    }
    const leaveHeight = domRect.height;
    const playScaleLeaveArray = /([\+\-]?[0-9#\.]+)(px|vh|%)?/.exec(String(playScale[1]));
    if (!playScaleLeaveArray[2]) {
      this.leavePlayHeight = leaveHeight * parseFloat(playScale[1]);
    } else if (playScaleLeaveArray[2] === 'px') {
      this.leavePlayHeight = parseFloat(playScaleLeaveArray[1]);
    } else {
      this.leavePlayHeight = leaveHeight * parseFloat(playScaleLeaveArray[1]) / 100;
    }
    const enter = this.elementShowHeight >= this.playHeight
      && this.elementShowHeight <= this.clientHeight + this.leavePlayHeight;
    const enterOrLeave = enter ? 'enter' : 'leave';
    const mode = this.enter !== enter || typeof this.enter !== 'boolean' ? enterOrLeave : null;
    if (mode) {
      this.props.onChange({ mode, id: this.props.id }, e);
    }
    this.enter = enter;
  }

  scrollEventListener = (e) => {
    this.getParam(e);
  }

  render() {
    const { ...props } = this.props;
    ['component', 'playScale', 'location', 'targetId'].forEach(key => delete props[key]);
    return React.createElement(this.props.component, { ...props });
  }
}

ScrollElement.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  playScale: PropTypes.any,
  id: PropTypes.string,
  onChange: PropTypes.func,
  location: PropTypes.string,
  targetId: PropTypes.string,
};

ScrollElement.defaultProps = {
  component: 'div',
  onChange: noop,
  playScale: 0.5,
};
ScrollElement.isScrollElement = true;
export default ScrollElement;
