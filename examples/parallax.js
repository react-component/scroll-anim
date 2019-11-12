webpackJsonp([5],{

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(163);


/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_index_less__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__assets_index_less__);




// use jsx to render html, do not modify simple.html






var ScrollParallax = __WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim__["a" /* default */].Parallax;
var ScrollElement = __WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim__["a" /* default */].Element;
var _package = __webpack_require__(58);

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    _this.onComplete = function (e) {
      console.log(e);
    };

    _this.setCss = function (e) {
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
    };

    _this.state = {
      css: { backgroundColor: '#174270', height: 920 },
      cssNoPosition: true
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { className: 'pack-page page0 ' },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            { className: 'home-title' },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'div',
              { className: 'page-title' },
              __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                'p',
                null,
                _package.name,
                '@',
                _package.version
              )
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'div',
              { className: 'page-description', key: 'c' },
              __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                'p',
                null,
                'The parallax demo'
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { className: 'pack-page',
            style: {
              backgroundColor: '#174270',
              position: 'relative',
              overflow: 'hidden',
              height: 1600
            }
          },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: { opacity: 1 },
              always: false,
              style: { opacity: 0, paddingTop: 60 },
              className: 'tween-one'
            },
            'transform \u5FC5\u9700\u5728 style \u91CC\u8BBE\u5B9A\u521D\u59CB\u503C'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: { opacity: 1 },
              style: { opacity: 0, paddingTop: 0, fontSize: 24 },
              className: 'tween-one'
            },
            '\u9ED8\u8BA4\u663E\u793A\u4F4D\u7F6E[0 ,1]'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: {
                scaleX: 1, scaleY: 1, onUpdate: function onUpdate(percent) {
                  console.log('scale anim percent:', percent);
                }
              },
              style: { transform: 'scale(0)', color: '#fff' },
              className: 'demo-content parallax-shape'
            },
            'Scale'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: { rotate: 360 },
              style: { transform: 'rotate(0)' },
              className: 'demo-content2 parallax-shape'
            },
            'rotate'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: { x: 0, opacity: 1 },
              style: {
                transform: 'translateX(-200px)',
                opacity: 0,
                backgroundColor: '#133252',
                color: '#fff'
              },
              className: 'demo-content2 parallax-shape'
            },
            'X'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: { rotateY: 360 },
              style: { transform: 'perspective(200px) rotateY(0)', backgroundColor: '#0098CE' },
              className: 'demo-content2 parallax-shape'
            },
            'rotateY'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: { opacity: 1 },
              style: { opacity: 0, paddingTop: 60, fontSize: 24 },
              className: 'tween-one'
            },
            '\u81EA\u5B9A\u4E49\u663E\u793A\u4F4D\u7F6E'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: { blur: '0px', playScale: [0.5, 0.8], opacity: 1 },
              style: { filter: 'blur(20px)', opacity: 0, color: '#fff' },
              className: 'demo-content parallax-shape'
            },
            'blur'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: { color: '#fff000', backgroundColor: '#F38EAD', playScale: [0.3, 0.8] },
              style: { filter: 'blur(0px)', color: '#fff' },
              className: 'demo-content parallax-shape'
            },
            'color'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: { opacity: 1 },
              style: { opacity: 0, paddingTop: 60, fontSize: 24 },
              className: 'tween-one'
            },
            '\u591A\u79CD\u6837\u5F0F\u65F6\u95F4\u8F74\u52A8\u753B'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: [{ opacity: 1, playScale: [0, 0.2] }, { blur: '0px', backgroundColor: '#F38EAD', playScale: [0, 0.2] }, {
                translateX: -100,
                boxShadow: '5px 5px 5px #000',
                color: '#fff000',
                playScale: [0, 0.2]
              }, { translateX: 100, playScale: [0, 0.2] }, { translateX: 0, playScale: [0, 0.2] }],
              style: { filter: 'blur(10px)', transform: 'translateX(0px)', opacity: 0, color: '#fff' },
              className: 'demo-content parallax-shape'
            },
            'timeline'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { className: 'pack-page',
            style: {
              backgroundColor: '#0097D0',
              position: 'relative',
              textAlign: 'center',
              fontSize: 36
            }
          },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            { className: 'page2-title' },
            '\u89C6\u5DEE\u793A\u4F8B'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: { translateY: 120, opacity: 1, ease: 'linear', playScale: [0, 2] },
              style: { transform: 'translateY(420px) scale(.8)', color: '#fff' }
            },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('img', {
              src: 'https://os.alipayobjects.com/rmsportal/CrVCkwvtTQQvQHL.png',
              style: { width: 100 },
              alt: 'img'
            })
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: { translateY: 20, opacity: 1, ease: 'linear', playScale: [0, 1.5] },
              style: { transform: 'translateY(380px) scale(.9)', color: '#fff' }
            },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('img', {
              src: 'https://os.alipayobjects.com/rmsportal/sfmdyWNlweIvfUh.png',
              style: { width: 150 },
              alt: 'img'
            })
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              animation: { translateY: -100, opacity: 1, ease: 'linear', playScale: [0, 1.2] },
              style: { transform: 'translateY(320px)', color: '#fff' }
            },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('img', {
              src: 'https://os.alipayobjects.com/rmsportal/sfmdyWNlweIvfUh.png',
              style: { width: 200 },
              alt: 'img'
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          ScrollElement,
          { style: { height: 2000 }, id: 'Scroll-Pack' },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            ScrollParallax,
            {
              className: 'pack-page',
              location: 'Scroll-Pack',
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
            },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(ScrollParallax, {
              animation: { translateX: '0%', playScale: [1, 2] },
              style: {
                transform: 'translateX(-100%)',
                backgroundColor: '#F38EAD',
                width: '100%',
                height: '100%',
                position: 'absolute'
              },
              location: 'Scroll-Pack'
            }),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              ScrollParallax,
              {
                animation: [{ translateY: 0 }, { translateY: '450px' }],
                location: 'Scroll-Pack',
                style: {
                  transform: 'translateY(300px)',
                  color: '#fff',
                  fontSize: 36,
                  textAlign: 'center'
                }
              },
              '\u793A\u4F8B\u793A\u4F8B'
            )
          )
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

},[162]);
//# sourceMappingURL=parallax.js.map