import React from 'react';
import ReactDOM from 'react-dom';
import mapped from './Mapped';
import EventListener from './EventDispatcher';
import { currentScrollTop, transformArguments, windowHeight, toArrayChildren } from './util';

const noop = () => {
};
class ScrollElement extends React.Component {
  constructor(props) {
    super(props);
    this.enter = false;
  }

  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
    if (this.props.id) {
      mapped.register(this.props.id, this.dom);
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
    mapped.unRegister(this.props.id);
    EventListener.removeEventListener(this.eventType, this.scrollEventListener);
  }

  getParam = (e) => {
    this.clientHeight = windowHeight();
    const scrollTop = currentScrollTop();
    // 屏幕缩放时的响应，所以放回这里，这个是pack，只处理子级里面的动画，所以marginTop无关系，所以不需减掉；
    const domRect = this.dom.getBoundingClientRect();
    const offsetTop = domRect.top + scrollTop;
    this.elementShowHeight = scrollTop - offsetTop + this.clientHeight;
    const playScale = transformArguments(this.props.playScale);
    this.playHeight = this.clientHeight * playScale[0];
    const leaveHeight = domRect.height;
    this.leavePlayHeight = leaveHeight * playScale[1];
    const enter = this.elementShowHeight >= this.playHeight
      && this.elementShowHeight <= this.clientHeight + this.leavePlayHeight;
    const enterOrLeave = enter ? 'enter' : 'leave';
    const mode = this.enter !== enter ? enterOrLeave : null;
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
    ['component', 'playScale'].forEach(key => delete props[key]);
    return React.createElement(this.props.component, { ...props });
  }
}

ScrollElement.propTypes = {
  component: React.PropTypes.any,
  playScale: React.PropTypes.any,
  id: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

ScrollElement.defaultProps = {
  component: 'div',
  onChange: noop,
  playScale: 0.5,
};
export default ScrollElement;
