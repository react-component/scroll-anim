import React from 'react';
import ReactDOM from 'react-dom';
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
    const scrollTop = currentScrollTop();
    if (!scrollTop) {
      this.scrollEventListener();
    }
    const length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
    this.eventType = `scroll.scrollEvent${date}${length}`;
    this.target = this.props.targetId && document.getElementById(this.props.targetId);
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
    this.clientHeight = this.target ? this.target.getBoundingClientRect().height : windowHeight();
    const windowScrollTop = this.target ? currentScrollTop() : 0;
    const scrollTop = this.target ? this.target.scrollTop : currentScrollTop();
    const domRect = this.dom.getBoundingClientRect();
    const offsetTop = domRect.top + scrollTop + windowScrollTop;
    this.elementShowHeight = scrollTop - offsetTop + this.clientHeight;
    const playScale = transformArguments(this.props.playScale);
    this.playHeight = this.clientHeight * playScale[0];
    const leaveHeight = domRect.height;
    this.leavePlayHeight = leaveHeight * playScale[1];
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
  component: React.PropTypes.any,
  playScale: React.PropTypes.any,
  id: React.PropTypes.string,
  onChange: React.PropTypes.func,
  location: React.PropTypes.string,
  targetId: React.PropTypes.string,
};

ScrollElement.defaultProps = {
  component: 'div',
  onChange: noop,
  playScale: 0.5,
};
export default ScrollElement;
