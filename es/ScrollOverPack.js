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

import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import EventListener from './EventDispatcher';
import ScrollElement from './ScrollElement';
import { toArrayChildren, noop, windowIsUndefined } from './util';

var ScrollOverPack = /*#__PURE__*/function (_ScrollElement) {
  _inherits(ScrollOverPack, _ScrollElement);

  var _super = _createSuper(ScrollOverPack);

  function ScrollOverPack(props) {
    var _this;

    _classCallCheck(this, ScrollOverPack);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "scrollEventListener", function (e) {
      _this.getParam(e);

      var show = _this.state.show;
      var _this$props = _this.props,
          always = _this$props.always,
          replay = _this$props.replay;
      var isTop = _this.elementShowHeight > _this.clientHeight + _this.leavePlayHeight;

      if (_this.enter || !replay && isTop) {
        if (!show) {
          _this.setState({
            show: true
          });
        }

        if (!always && _this.eventType) {
          EventListener.removeEventListener(_this.eventType, _this.scrollEventListener, _this.target);
        }
      } else if (always) {
        var bottomLeave = _this.elementShowHeight < _this.playHeight; // 设置往上时的出场点...

        var topLeave = replay ? isTop : null;

        if (topLeave || bottomLeave) {
          if (show) {
            _this.setState({
              show: false
            });
          }
        }
      }
    });

    _this.children = toArrayChildren(props.children);
    _this.oneEnter = false;
    _this.enter = false;
    _this.state = {
      show: false,
      children: toArrayChildren(props.children)
    };
    return _this;
  }

  _createClass(ScrollOverPack, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (prevProps !== this.props) {
        var always = this.props.always;
        var show = this.state.show;

        var inListener = EventListener._listeners.scroll && EventListener._listeners.scroll.some(function (c) {
          return c.n === _this2.eventType.split('.')[1];
        });

        if (always && !inListener) {
          this.addScrollEvent();
        } else if (!always && !show) {
          this.scrollEventListener();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          playScale = _this$props2.playScale,
          replay = _this$props2.replay,
          component = _this$props2.component,
          always = _this$props2.always,
          scrollEvent = _this$props2.scrollEvent,
          appear = _this$props2.appear,
          location = _this$props2.location,
          targetId = _this$props2.targetId,
          onChange = _this$props2.onChange,
          onScroll = _this$props2.onScroll,
          componentProps = _this$props2.componentProps,
          props = _objectWithoutProperties(_this$props2, ["playScale", "replay", "component", "always", "scrollEvent", "appear", "location", "targetId", "onChange", "onScroll", "componentProps"]);

      if (windowIsUndefined) {
        return /*#__PURE__*/createElement(component, _objectSpread(_objectSpread({}, props), componentProps), props.children);
      }

      var childToRender;

      if (!this.oneEnter) {
        var show = !appear;
        var children = toArrayChildren(props.children).map(function (item) {
          if (!item) {
            return null;
          }

          var key = item.key || (Date.now() + Math.random()).toString(16).replace('.', '');
          return item.type.isTweenOne ? /*#__PURE__*/React.cloneElement(item, _objectSpread(_objectSpread({}, item.props), {}, {
            key: key,
            paused: !show
          })) : /*#__PURE__*/React.cloneElement(item, _objectSpread(_objectSpread({}, item.props), {}, {
            key: key
          }), show && item.props.children);
        });
        childToRender = /*#__PURE__*/createElement(component, _objectSpread(_objectSpread({}, props), componentProps), children);
        this.oneEnter = true;
      } else {
        if (!this.state.show) {
          this.children = this.children.map(function (item) {
            if (!item) {
              return null;
            }

            var key = item.key || (Date.now() + Math.random()).toString(16).replace('.', ''); // 判断 TweenOne;

            if (item.type.isTweenOne) {
              return /*#__PURE__*/React.cloneElement(item, {
                key: key,
                reverse: true
              });
            }

            return /*#__PURE__*/React.cloneElement(item, {
              key: key
            }, null);
          });
        } else {
          this.children = this.state.children;
        }

        childToRender = /*#__PURE__*/createElement(component, _objectSpread(_objectSpread({}, props), componentProps), this.children);
      }

      return childToRender;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, _ref) {
      var prevProps = _ref.prevProps;
      var nextState = {
        prevProps: props
      };

      if (prevProps && props !== prevProps) {
        nextState.children = toArrayChildren(props.children);
      }

      return nextState;
    }
  }]);

  return ScrollOverPack;
}(ScrollElement);

_defineProperty(ScrollOverPack, "propTypes", {
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
  componentProps: PropTypes.object
});

_defineProperty(ScrollOverPack, "defaultProps", {
  component: 'div',
  playScale: 0.5,
  always: true,
  scrollEvent: noop,
  replay: false,
  onChange: noop,
  onScroll: noop,
  appear: true,
  componentProps: {}
});

ScrollOverPack.isScrollOverPack = true;
export default ScrollOverPack;