import React from 'react';
import ReactDOM from 'react-dom';
import mapped from './Mapped';

class ScrollElement extends React.Component {
  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);
    mapped.register(this.props.name, domNode);
  }

  componentWillUnmount() {
    mapped.unregister(this.props.name);
  }

  render() {
    return React.createElement(this.props.component, this.props);
  }
}
const funcOrString = React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.string]);
ScrollElement.propTypes = {
  component: funcOrString,
  name: React.PropTypes.string,
};

ScrollElement.defaultProps = {
  component: 'div',
};
export default ScrollElement;
