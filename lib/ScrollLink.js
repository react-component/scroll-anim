"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _tweenFunctions = _interopRequireDefault(require("tween-functions"));

var _raf = _interopRequireDefault(require("raf"));

var _EventDispatcher = _interopRequireDefault(require("./EventDispatcher"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var scrollLinkLists = [];

var ScrollLink = /*#__PURE__*/function (_React$Component) {
  _inherits(ScrollLink, _React$Component);

  var _super = _createSuper(ScrollLink);

  function ScrollLink(props) {
    var _this;

    _classCallCheck(this, ScrollLink);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      e.preventDefault();

      _EventDispatcher["default"].removeAllType('scroll.scrollAnchorEvent');

      _this.elementDom = document.getElementById(_this.props.to);
      ;

      if (_this.rafID !== -1 || !_this.elementDom) {
        return;
      }

      _this.scrollTop = _this.target ? _this.target.scrollTop : (0, _util.currentScrollTop)();
      _this.initTime = Date.now();
      _this.rafID = (0, _raf["default"])(_this.raf);
      scrollLinkLists.forEach(function (item) {
        if (item !== _assertThisInitialized(_this)) {
          item.remActive();
        }
      });

      _this.addActive();
    });

    _defineProperty(_assertThisInitialized(_this), "getToTop", function () {
      var elementRect = _this.elementDom && _this.elementDom.getBoundingClientRect();

      _this.clientHeight = _this.target ? _this.target.clientHeight : (0, _util.windowHeight)();
      var targetTop = _this.target ? _this.target.getBoundingClientRect().top : 0;
      var toTop = Math.round(elementRect.top + (0, _util.currentScrollTop)()) - _this.props.offsetTop - targetTop;
      var t = (0, _util.transformArguments)(_this.props.showHeightActive)[0];
      var toShow = t.match('%') ? _this.clientHeight * parseFloat(t) / 100 : t;
      return _this.props.toShowHeight ? toTop - toShow + 0.5 : toTop;
    });

    _defineProperty(_assertThisInitialized(_this), "cancelRequestAnimationFrame", function () {
      _raf["default"].cancel(_this.rafID);

      _this.rafID = -1;
    });

    _defineProperty(_assertThisInitialized(_this), "addActive", function () {
      if (!_this.state.active) {
        var obj = {
          target: _this.dom,
          to: _this.props.to
        };

        _this.props.onFocus(obj);

        _this.setState({
          active: true
        }, function () {
          if (_this.props.toHash) {
            var link = "#".concat(_this.props.to);
            history.pushState(null, window.title, link); // eslint-disable-line
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "raf", function () {
      if (_this.rafID === -1) {
        return;
      }

      var duration = _this.props.duration;
      var now = Date.now();
      var progressTime = now - _this.initTime > duration ? duration : now - _this.initTime; // 动画时也会改变高度，动态获取

      var easeValue = _tweenFunctions["default"][_this.props.ease](progressTime, _this.scrollTop, _this.getToTop(), duration);

      if (_this.target) {
        _this.target.scrollTop = easeValue;
      } else {
        window.scrollTo(window.scrollX, easeValue);
      }

      if (progressTime === duration) {
        _this.elementDom = null;

        _this.cancelRequestAnimationFrame();

        _EventDispatcher["default"].reAllType('scroll.scrollAnchorEvent');
      } else {
        _this.rafID = (0, _raf["default"])(_this.raf);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "remActive", function () {
      if (_this.state.active) {
        var obj = {
          target: _this.dom,
          to: _this.props.to
        };

        _this.props.onBlur(obj);

        _this.setState({
          active: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "scrollEventListener", function () {
      var elementDom = document.getElementById(_this.props.to);

      if (!elementDom) {
        return;
      } // 滚动时会改变高度, 动态获取高度


      var clientHeight = _this.target ? _this.target.clientHeight : (0, _util.windowHeight)();
      var elementRect = elementDom.getBoundingClientRect();
      var elementClientHeight = elementDom.clientHeight;
      var targetTop = _this.target ? _this.target.getBoundingClientRect().top : 0;
      var top = Math.round(-elementRect.top + targetTop);
      var showHeightActive = (0, _util.transformArguments)(_this.props.showHeightActive);
      var startShowHeight = showHeightActive[0].toString().indexOf('%') >= 0 ? parseFloat(showHeightActive[0]) / 100 * clientHeight : parseFloat(showHeightActive[0]);
      var endShowHeight = showHeightActive[1].toString().indexOf('%') >= 0 ? parseFloat(showHeightActive[1]) / 100 * clientHeight : parseFloat(showHeightActive[1]);

      if (top >= Math.round(-startShowHeight) && top < Math.round(elementClientHeight - endShowHeight)) {
        _this.addActive();
      } else {
        _this.remActive();
      }
    });

    _this.rafID = -1;
    _this.state = {
      active: false
    };
    return _this;
  }

  _createClass(ScrollLink, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.dom = _reactDom["default"].findDOMNode(this);
      this.target = this.props.targetId && document.getElementById(this.props.targetId);
      scrollLinkLists.push(this);
      var date = Date.now();
      var length = _EventDispatcher["default"]._listeners.scroll ? _EventDispatcher["default"]._listeners.scroll.length : 0;
      this.eventType = "scroll.scrollAnchorEvent".concat(date).concat(length);

      _EventDispatcher["default"].addEventListener(this.eventType, this.scrollEventListener, this.target); // 第一次进入；等全部渲染完成后执行;


      setTimeout(function () {
        _this2.scrollEventListener();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      scrollLinkLists = scrollLinkLists.filter(function (item) {
        return item !== _this3;
      });

      _EventDispatcher["default"].removeEventListener(this.eventType, this.scrollEventListener, this.target);

      this.cancelRequestAnimationFrame();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          component = _this$props.component,
          onClick = _this$props.onClick,
          duration = _this$props.duration,
          tagActive = _this$props.active,
          showHeightActive = _this$props.showHeightActive,
          ease = _this$props.ease,
          toShowHeight = _this$props.toShowHeight,
          offsetTop = _this$props.offsetTop,
          targetId = _this$props.targetId,
          to = _this$props.to,
          toHash = _this$props.toHash,
          componentProps = _this$props.componentProps,
          props = _objectWithoutProperties(_this$props, ["component", "onClick", "duration", "active", "showHeightActive", "ease", "toShowHeight", "offsetTop", "targetId", "to", "toHash", "componentProps"]);

      var active = this.state.active ? tagActive : '';

      props.onClick = function (e) {
        onClick(e);

        _this4.onClick(e);
      };

      var reg = new RegExp(active, 'ig');
      var className = props.className || '';
      props.className = className.indexOf(active) === -1 ? "".concat(className, " ").concat(active).trim() : className.replace(reg, '').trim();
      return /*#__PURE__*/(0, _react.createElement)(this.props.component, _objectSpread(_objectSpread({}, props), componentProps));
    }
  }]);

  return ScrollLink;
}(_react["default"].Component);

_defineProperty(ScrollLink, "propTypes", {
  component: _propTypes["default"].any,
  children: _propTypes["default"].any,
  className: _propTypes["default"].string,
  style: _propTypes["default"].any,
  offsetTop: _propTypes["default"].number,
  duration: _propTypes["default"].number,
  active: _propTypes["default"].string,
  to: _propTypes["default"].string,
  targetId: _propTypes["default"].string,
  showHeightActive: _propTypes["default"].any,
  toShowHeight: _propTypes["default"].bool,
  ease: _propTypes["default"].string,
  onClick: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  toHash: _propTypes["default"].bool,
  componentProps: _propTypes["default"].object
});

_defineProperty(ScrollLink, "defaultProps", {
  component: 'div',
  offsetTop: 0,
  duration: 450,
  active: 'active',
  showHeightActive: '50%',
  ease: 'easeInOutQuad',
  toHash: false,
  onClick: _util.noop,
  onFocus: _util.noop,
  onBlur: _util.noop,
  componentProps: {}
});

ScrollLink.isScrollLink = true;
var _default = ScrollLink;
exports["default"] = _default;