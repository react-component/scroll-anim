"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.scrollScreen = exports.Event = exports.Link = exports.Element = exports.Parallax = exports.OverPack = void 0;

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _ScrollOverPack = _interopRequireDefault(require("./ScrollOverPack"));

var _ScrollParallax = _interopRequireDefault(require("./ScrollParallax"));

var _ScrollLink = _interopRequireDefault(require("./ScrollLink"));

var _ScrollElement = _interopRequireDefault(require("./ScrollElement"));

var _EventDispatcher = _interopRequireDefault(require("./EventDispatcher"));

var _ScrollScreen = _interopRequireDefault(require("./ScrollScreen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// export this package's api
var OverPack = (0, _reactLifecyclesCompat.polyfill)(_ScrollOverPack["default"]);
exports.OverPack = OverPack;
var Parallax = (0, _reactLifecyclesCompat.polyfill)(_ScrollParallax["default"]);
exports.Parallax = Parallax;
var Element = (0, _reactLifecyclesCompat.polyfill)(_ScrollElement["default"]);
exports.Element = Element;
var Link = _ScrollLink["default"];
exports.Link = Link;
var Event = _EventDispatcher["default"];
exports.Event = Event;
var scrollScreen = _ScrollScreen["default"];
exports.scrollScreen = scrollScreen;
var _default = {
  OverPack: OverPack,
  Parallax: Parallax,
  Element: Element,
  Link: Link,
  Event: Event,
  scrollScreen: scrollScreen
};
exports["default"] = _default;