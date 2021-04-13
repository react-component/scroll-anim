function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import EventListener from './EventDispatcher';
import { noop, currentScrollTop, transformArguments, windowHeight, windowIsUndefined } from './util';

var ScrollElement = /*#__PURE__*/function (_React$Component) {
  _inherits(ScrollElement, _React$Component);

  var _super = _createSuper(ScrollElement);

  function ScrollElement(props) {
    var _this;

    _classCallCheck(this, ScrollElement);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getParam", function (e) {
      _this.clientHeight = _this.target ? _this.target.clientHeight : windowHeight();
      var scrollTop = _this.target ? _this.target.scrollTop : currentScrollTop();

      var domRect = _this.dom.getBoundingClientRect();

      var targetTop = _this.target ? _this.target.getBoundingClientRect().top : 0;
      var offsetTop = domRect.top + scrollTop - targetTop;
      _this.elementShowHeight = scrollTop - offsetTop + _this.clientHeight;
      var playScale = transformArguments(_this.props.playScale);
      var playScaleEnterArray = /([\+\-]?[0-9#\.]+)(px|vh|%)?/.exec(String(playScale[0])); // eslint-disable-line

      if (!playScaleEnterArray[2]) {
        _this.playHeight = _this.clientHeight * parseFloat(playScale[0]);
      } else if (playScaleEnterArray[2] === 'px') {
        _this.playHeight = parseFloat(playScaleEnterArray[1]);
      } else {
        _this.playHeight = _this.clientHeight * parseFloat(playScaleEnterArray[1]) / 100;
      }

      var leaveHeight = domRect.height;
      var playScaleLeaveArray = /([\+\-]?[0-9#\.]+)(px|vh|%)?/.exec(String(playScale[1])); // eslint-disable-line

      if (!playScaleLeaveArray[2]) {
        _this.leavePlayHeight = leaveHeight * parseFloat(playScale[1]);
      } else if (playScaleLeaveArray[2] === 'px') {
        _this.leavePlayHeight = parseFloat(playScaleLeaveArray[1]);
      } else {
        _this.leavePlayHeight = leaveHeight * parseFloat(playScaleLeaveArray[1]) / 100;
      }

      var enter = _this.props.replay ? _this.elementShowHeight >= _this.playHeight && _this.elementShowHeight <= _this.clientHeight + _this.leavePlayHeight : _this.elementShowHeight >= _this.playHeight;
      var enterOrLeave = enter ? 'enter' : 'leave';
      var mode = _this.enter !== enter || typeof _this.enter !== 'boolean' ? enterOrLeave : null;

      if (mode) {
        _this.props.onChange({
          mode: mode,
          id: _this.props.id
        });
      }

      _this.props.onScroll({
        domEvent: e,
        scrollTop: scrollTop,
        showHeight: _this.elementShowHeight,
        offsetTop: offsetTop,
        id: _this.props.id
      });

      _this.enter = enter;
    });

    _defineProperty(_assertThisInitialized(_this), "addScrollEvent", function () {
      EventListener.addEventListener(_this.eventType, _this.scrollEventListener, _this.target);
      var scrollTop = currentScrollTop();

      if (!scrollTop) {
        _this.scrollEventListener();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "scrollEventListener", function (e) {
      _this.getParam(e);
    });

    _this.state = {
      $self: _assertThisInitialized(_this)
    };
    return _this;
  }

  _createClass(ScrollElement, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (windowIsUndefined) {
        return;
      }

      this.dom = ReactDOM.findDOMNode(this);
      var date = Date.now();
      this.target = this.props.targetId && document.getElementById(this.props.targetId);
      var length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
      this.eventType = "scroll.scrollEvent".concat(date).concat(length);
      this.addScrollEvent();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      EventListener.removeEventListener(this.eventType, this.scrollEventListener, this.target);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          component = _this$props.component,
          playScale = _this$props.playScale,
          location = _this$props.location,
          targetId = _this$props.targetId,
          onScroll = _this$props.onScroll,
          onChange = _this$props.onChange,
          replay = _this$props.replay,
          componentProps = _this$props.componentProps,
          props = _objectWithoutProperties(_this$props, ["component", "playScale", "location", "targetId", "onScroll", "onChange", "replay", "componentProps"]);

      return /*#__PURE__*/React.createElement(component, _objectSpread(_objectSpread({}, props), componentProps));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref) {
      var prevProps = _ref.prevProps,
          $self = _ref.$self;
      var nextState = {
        prevProps: props
      };

      if (prevProps && props !== prevProps) {
        $self.scrollEventListener();
      }

      return nextState; // eslint-disable-line
    }
  }]);

  return ScrollElement;
}(React.Component);

_defineProperty(ScrollElement, "propTypes", {
  component: PropTypes.any,
  playScale: PropTypes.any,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onScroll: PropTypes.func,
  location: PropTypes.string,
  targetId: PropTypes.string,
  replay: PropTypes.bool,
  componentProps: PropTypes.object
});

_defineProperty(ScrollElement, "defaultProps", {
  component: 'div',
  onChange: noop,
  onScroll: noop,
  playScale: 0.5,
  replay: false,
  componentProps: {}
});

ScrollElement.isScrollElement = true;
export default ScrollElement;