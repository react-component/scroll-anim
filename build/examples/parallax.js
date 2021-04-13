/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"examples/parallax": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([2,"common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/parallax.js":
/*!******************************!*\
  !*** ./examples/parallax.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rc_scroll_anim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rc-scroll-anim */ "./index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_index_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/index.less */ "./examples/assets/index.less");
/* harmony import */ var _assets_index_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_index_less__WEBPACK_IMPORTED_MODULE_3__);
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

// use jsx to render html, do not modify simple.html




var ScrollParallax = rc_scroll_anim__WEBPACK_IMPORTED_MODULE_0__["default"].Parallax;
var ScrollElement = rc_scroll_anim__WEBPACK_IMPORTED_MODULE_0__["default"].Element;

var _package = __webpack_require__(/*! ../package.json */ "./package.json");

var Demo = /*#__PURE__*/function (_React$Component) {
  _inherits(Demo, _React$Component);

  var _super = _createSuper(Demo);

  function Demo(props) {
    var _this;

    _classCallCheck(this, Demo);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onComplete", function (e) {
      console.log(e);
    });

    _defineProperty(_assertThisInitialized(_this), "setCss", function (e) {
      var css = _this.state.css;
      console.log(e);

      if (_this.state.cssNoPosition) {
        css.position = 'fixed';
        css.top = 0;
      } else {
        css.position = '';
        css.top = '';
      }

      _this.setState({
        css: css,
        cssNoPosition: !_this.state.cssNoPosition
      });
    });

    _this.state = {
      css: {
        backgroundColor: '#174270',
        height: 920
      },
      cssNoPosition: true
    };
    return _this;
  }

  _createClass(Demo, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "pack-page page0 "
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "home-title"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "page-title"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, _package.name, "@", _package.version)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "page-description",
        key: "c"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "The parallax demo")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "pack-page",
        style: {
          backgroundColor: '#174270',
          position: 'relative',
          overflow: 'hidden',
          height: 1600
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          opacity: 1
        },
        always: false,
        style: {
          opacity: 0,
          paddingTop: 60
        },
        className: "tween-one"
      }, "transform \u5FC5\u9700\u5728 style \u91CC\u8BBE\u5B9A\u521D\u59CB\u503C"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          opacity: 1
        },
        style: {
          opacity: 0,
          paddingTop: 0,
          fontSize: 24
        },
        className: "tween-one"
      }, "\u9ED8\u8BA4\u663E\u793A\u4F4D\u7F6E[0 ,1]"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          scaleX: 1,
          scaleY: 1,
          onUpdate: function onUpdate(percent) {
            console.log('scale anim percent:', percent);
          }
        },
        style: {
          transform: 'scale(0)',
          color: '#fff'
        },
        className: "demo-content parallax-shape"
      }, "Scale"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          rotate: 360
        },
        style: {
          transform: 'rotate(0)'
        },
        className: "demo-content2 parallax-shape"
      }, "rotate"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          x: 0,
          opacity: 1
        },
        style: {
          transform: 'translateX(-200px)',
          opacity: 0,
          backgroundColor: '#133252',
          color: '#fff'
        },
        className: "demo-content2 parallax-shape"
      }, "X"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          rotateY: 360
        },
        style: {
          transform: 'perspective(200px) rotateY(0)',
          backgroundColor: '#0098CE'
        },
        className: "demo-content2 parallax-shape"
      }, "rotateY"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          opacity: 1
        },
        style: {
          opacity: 0,
          paddingTop: 60,
          fontSize: 24
        },
        className: "tween-one"
      }, "\u81EA\u5B9A\u4E49\u663E\u793A\u4F4D\u7F6E"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          blur: '0px',
          playScale: [0.5, 0.8],
          opacity: 1
        },
        style: {
          filter: 'blur(20px)',
          opacity: 0,
          color: '#fff'
        },
        className: "demo-content parallax-shape"
      }, "blur"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          color: '#fff000',
          backgroundColor: '#F38EAD',
          playScale: [0.3, 0.8]
        },
        style: {
          filter: 'blur(0px)',
          color: '#fff'
        },
        className: "demo-content parallax-shape"
      }, "color"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          opacity: 1
        },
        style: {
          opacity: 0,
          paddingTop: 60,
          fontSize: 24
        },
        className: "tween-one"
      }, "\u591A\u79CD\u6837\u5F0F\u65F6\u95F4\u8F74\u52A8\u753B"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: [{
          opacity: 1,
          playScale: [0, 0.2]
        }, {
          blur: '0px',
          backgroundColor: '#F38EAD',
          playScale: [0, 0.2]
        }, {
          translateX: -100,
          boxShadow: '5px 5px 5px #000',
          color: '#fff000',
          playScale: [0, 0.2]
        }, {
          translateX: 100,
          playScale: [0, 0.2]
        }, {
          translateX: 0,
          playScale: [0, 0.2]
        }],
        style: {
          filter: 'blur(10px)',
          transform: 'translateX(0px)',
          opacity: 0,
          color: '#fff'
        },
        className: "demo-content parallax-shape"
      }, "timeline")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "pack-page",
        style: {
          backgroundColor: '#0097D0',
          position: 'relative',
          textAlign: 'center',
          fontSize: 36
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "page2-title"
      }, "\u89C6\u5DEE\u793A\u4F8B"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          translateY: 120,
          opacity: 1,
          ease: 'linear',
          playScale: [0, 2]
        },
        style: {
          transform: 'translateY(420px) scale(.8)',
          color: '#fff'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
        src: "https://os.alipayobjects.com/rmsportal/CrVCkwvtTQQvQHL.png",
        style: {
          width: 100
        },
        alt: "img"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          translateY: 20,
          opacity: 1,
          ease: 'linear',
          playScale: [0, 1.5]
        },
        style: {
          transform: 'translateY(380px) scale(.9)',
          color: '#fff'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
        src: "https://os.alipayobjects.com/rmsportal/sfmdyWNlweIvfUh.png",
        style: {
          width: 150
        },
        alt: "img"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          translateY: -100,
          opacity: 1,
          ease: 'linear',
          playScale: [0, 1.2]
        },
        style: {
          transform: 'translateY(320px)',
          color: '#fff'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
        src: "https://os.alipayobjects.com/rmsportal/sfmdyWNlweIvfUh.png",
        style: {
          width: 200
        },
        alt: "img"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollElement, {
        style: {
          height: 2000
        },
        id: "Scroll-Pack"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        className: "pack-page",
        location: "Scroll-Pack",
        animation: {
          backgroundColor: '#0097D0',
          playScale: [1, 2],
          onStart: function onStart() {
            _this2.setCss('start');
          },
          onCompleteBack: function onCompleteBack() {
            _this2.setCss('back complete');
          },
          onComplete: function onComplete() {
            _this2.onComplete('complete');
          },
          onStartBack: function onStartBack() {
            _this2.onComplete('back start');
          }
        },
        style: this.state.css
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: {
          translateX: '0%',
          playScale: [1, 2]
        },
        style: {
          transform: 'translateX(-100%)',
          backgroundColor: '#F38EAD',
          width: '100%',
          height: '100%',
          position: 'absolute'
        },
        location: "Scroll-Pack"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ScrollParallax, {
        animation: [{
          translateY: 0
        }, {
          translateY: '450px'
        }],
        location: "Scroll-Pack",
        style: {
          transform: 'translateY(300px)',
          color: '#fff',
          fontSize: 36,
          textAlign: 'center'
        }
      }, "\u793A\u4F8B\u793A\u4F8B"))));
    }
  }]);

  return Demo;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 2:
/*!************************************!*\
  !*** multi ./examples/parallax.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./examples/parallax.js */"./examples/parallax.js");


/***/ })

/******/ });
//# sourceMappingURL=parallax.js.map