function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import easingTypes from 'tween-functions';
import { Tween as Timeline } from 'rc-tween-one';
import ticker from "rc-tween-one/es/ticker";
import EventListener from './EventDispatcher';
import { noop, dataToArray, objectEqual, currentScrollTop, windowHeight } from './util';
var tickerId = 0;

function playScaleToArray(playScale) {
  if (Array.isArray(playScale)) {
    if (playScale.length === 2) {
      return playScale;
    }

    return [playScale[0] || 0, playScale[1] || 1];
  } else if (playScale) {
    return [playScale, 1];
  }

  return [0, 1];
}

var ScrollParallax = /*#__PURE__*/function (_React$Component) {
  _inherits(ScrollParallax, _React$Component);

  var _super = _createSuper(ScrollParallax);

  function ScrollParallax(props) {
    var _this;

    _classCallCheck(this, ScrollParallax);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "setDefaultData", function (_vars) {
      var vars = dataToArray(_vars);

      var varsForIn = function varsForIn(item, i) {
        var playScale = playScaleToArray(item.playScale).map(function (data) {
          return data * _this.clientHeight;
        });

        var aItem = _objectSpread({}, item);

        delete aItem.playScale;

        var cItem = _objectSpread({}, item);

        delete cItem.playScale;
        cItem.delay = playScale[0];
        aItem.delay = playScale[0];
        cItem.duration = playScale[1] - playScale[0];
        aItem.duration = playScale[1] - playScale[0];
        cItem.onStart = null;
        cItem.onUpdate = null;
        cItem.onComplete = null;
        cItem.onRepeat = null;
        aItem.onStart = aItem.onStart || noop;
        aItem.onComplete = aItem.onComplete || noop;
        aItem.onUpdate = aItem.onUpdate || noop;
        aItem.onStartBack = aItem.onStartBack || noop;
        aItem.onCompleteBack = aItem.onCompleteBack || noop;
        _this.defaultTweenData[i] = cItem;
        _this.defaultData[i] = aItem;
      };

      vars.forEach(varsForIn);
    });

    _defineProperty(_assertThisInitialized(_this), "resizeEventListener", function () {
      if (_this.defaultData[_this.defaultData.length - 1] && _this.defaultData[_this.defaultData.length - 1].onCompleteBool && !_this.props.always) {
        return;
      }

      _this.scrollTop = currentScrollTop();
      _this.target = _this.props.targetId && document.getElementById(_this.props.targetId);
      _this.clientHeight = _this.target ? _this.target.clientHeight : windowHeight();

      _this.setDefaultData(_this.props.animation || {});

      if (_this.timeline) {
        _this.timeline.resetDefaultStyle();
      }

      _this.timeline = new Timeline(_this.dom, _this.defaultTweenData);

      _this.timeline.init();

      _this.scrollEventListener();
    });

    _defineProperty(_assertThisInitialized(_this), "scrollEventListener", function () {
      var scrollTop = _this.target ? _this.target.scrollTop : currentScrollTop();
      _this.clientHeight = _this.target ? _this.target.clientHeight : windowHeight();
      var dom = _this.props.location ? document.getElementById(_this.props.location) : _this.dom;

      if (!dom) {
        throw new Error('"location" is null');
      }

      var targetTop = _this.target ? _this.target.getBoundingClientRect().top : 0;
      var offsetTop = dom.getBoundingClientRect().top + scrollTop - targetTop;
      var elementShowHeight = scrollTop - offsetTop + _this.clientHeight;
      var currentShow = _this.scrollTop - offsetTop + _this.clientHeight;

      _this.defaultData.forEach(function (item, i) {
        var duration = _this.defaultData.map(function (c, ii) {
          return ii < i && c.delay + c.duration || 0;
        }).reduce(function (a, b) {
          return a + b;
        });

        var noUpdate;

        if (elementShowHeight <= item.delay + duration) {
          if (!item.onCompleteBackBool && item.onStartBool) {
            item.onCompleteBackBool = true;
            noUpdate = true;
            item.onCompleteBack();
          }
        } else {
          item.onCompleteBackBool = false;
        }

        if (elementShowHeight >= item.delay + duration) {
          if (!item.onStartBool) {
            item.onStartBool = true;
            noUpdate = true;
            item.onStart();
          }
        } else {
          item.onStartBool = false;
        }

        if (elementShowHeight <= item.delay + item.duration + duration) {
          if (!item.onStartBackBool && item.onCompleteBool) {
            item.onStartBackBool = true;
            noUpdate = true;
            item.onStartBack();
          }
        } else {
          item.onStartBackBool = false;
        }

        if (elementShowHeight >= item.delay + item.duration + duration) {
          if (!item.onCompleteBool) {
            item.onCompleteBool = true;
            noUpdate = true;
            item.onComplete();
          }
        } else {
          item.onCompleteBool = false;
        }

        if (elementShowHeight >= item.delay + duration && elementShowHeight <= item.delay + item.duration + duration && !noUpdate) {
          item.onUpdate(elementShowHeight / (item.delay + item.duration + duration));
        }
      });

      ticker.clear(_this.tickerId);
      _this.tickerId = "scrollParallax".concat(Date.now(), "-").concat(tickerId);
      tickerId++;

      if (tickerId >= Number.MAX_VALUE) {
        tickerId = 0;
      }

      var startFrame = ticker.frame;
      ticker.wake(_this.tickerId, function () {
        var moment = (ticker.frame - startFrame) * ticker.perFrame;
        var ratio = easingTypes.easeOutQuad(moment, 0.08, 1, 300);

        _this.timeline.frame(currentShow + ratio * (elementShowHeight - currentShow));

        if (moment >= 300) {
          ticker.clear(_this.tickerId);
        }
      });
      _this.scrollTop = scrollTop; // 如果不一直靠滚动来执行动画，always=false而且动画全执行完了，，删除scrollEvent;

      if (_this.defaultData[_this.defaultData.length - 1].onCompleteBool && _this.eventType && !_this.props.always) {
        EventListener.removeEventListener(_this.eventType, _this.scrollEventListener, _this.target);
      }
    });

    _this.scrollTop = 0;
    _this.defaultTweenData = [];
    _this.defaultData = [];
    _this.state = {
      $self: _assertThisInitialized(_this)
    };
    _this.domRef = /*#__PURE__*/React.createRef();
    return _this;
  }

  _createClass(ScrollParallax, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.dom = this.domRef.current;
      var date = Date.now();
      var length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
      this.eventType = "scroll.scrollEvent".concat(date).concat(length);
      this.eventResize = "resize.resizeEvent".concat(date).concat(length);
      this.resizeEventListener();
      EventListener.addEventListener(this.eventResize, this.resizeEventListener, this.target); // 预注册;

      this.timeline.frame(0);
      this.scrollEventListener();
      EventListener.addEventListener(this.eventType, this.scrollEventListener, this.target);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      EventListener.removeEventListener(this.eventType, this.scrollEventListener, this.target);
      EventListener.removeEventListener(this.eventResize, this.resizeEventListener, this.target);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          animation = _this$props.animation,
          always = _this$props.always,
          component = _this$props.component,
          location = _this$props.location,
          targetId = _this$props.targetId,
          componentProps = _this$props.componentProps,
          props = _objectWithoutProperties(_this$props, ["animation", "always", "component", "location", "targetId", "componentProps"]);

      var style = _objectSpread({}, props.style);

      Object.keys(style).forEach(function (p) {
        if (p.indexOf('filter') >= 0 || p.indexOf('Filter') >= 0) {
          // ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix=> style[`${prefix}Filter`] = style[p]);
          var transformArr = ['Webkit', 'Moz', 'Ms', 'ms'];

          for (var i = 0; i < transformArr.length; i++) {
            style["".concat(transformArr[i], "Filter")] = style[p];
          }
        }
      });
      props.style = style;
      return /*#__PURE__*/React.createElement(this.props.component, _objectSpread(_objectSpread(_objectSpread({}, props), componentProps), {}, {
        ref: this.domRef
      }));
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
        var equal = objectEqual(prevProps.animation, props.animation);

        if (!equal) {
          $self.setDefaultData(props.animation || {});
          $self.timeline.resetAnimData();
          $self.timeline.setDefaultData($self.defaultTweenData);
        }
      }

      return nextState; // eslint-disable-line
    }
  }]);

  return ScrollParallax;
}(React.Component);

_defineProperty(ScrollParallax, "propTypes", {
  component: PropTypes.any,
  animation: PropTypes.any,
  always: PropTypes.bool,
  location: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.any,
  id: PropTypes.string,
  targetId: PropTypes.string,
  componentProps: PropTypes.object
});

_defineProperty(ScrollParallax, "defaultProps", {
  component: 'div',
  always: true,
  componentProps: {}
});

ScrollParallax.isScrollParallax = true;
export default ScrollParallax;