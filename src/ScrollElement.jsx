import React from 'react';
import ReactDOM from 'react-dom';
import mapped from './Mapped';

class ScrollElement extends React.Component {
  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);
    if (this.props.scrollName) {
      mapped.register(this.props.scrollName, domNode);
    }
  }

  componentWillUnmount() {
    mapped.unRegister(this.props.scrollName);
  }

  render() {
    return React.createElement(this.props.component, this.props);
  }
}
const funcOrString = React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.string]);
ScrollElement.propTypes = {
  component: funcOrString,
  scrollName: React.PropTypes.string,
};

ScrollElement.defaultProps = {
  component: 'div',
};
export default ScrollElement;
