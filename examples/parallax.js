webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(320);


/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	__webpack_require__(80);
	
	var _rcScrollAnim = __webpack_require__(81);
	
	var _rcScrollAnim2 = _interopRequireDefault(_rcScrollAnim);
	
	var _react = __webpack_require__(90);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(130);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// use jsx to render html, do not modify simple.html
	
	var ScrollParallax = _rcScrollAnim2.default.Parallax;
	var ScrollElement = _rcScrollAnim2.default.Element;
	var _package = __webpack_require__(318);
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	
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
	
	  Demo.prototype.render = function render() {
	    var _this2 = this;
	
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        { className: 'pack-page page0 ' },
	        _react2.default.createElement(
	          'div',
	          { className: 'home-title' },
	          _react2.default.createElement(
	            'div',
	            { className: 'page-title' },
	            _react2.default.createElement(
	              'p',
	              null,
	              _package.name,
	              '@',
	              _package.version
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'page-description', key: 'c' },
	            _react2.default.createElement(
	              'p',
	              null,
	              'The parallax demo'
	            )
	          )
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'pack-page',
	          style: {
	            backgroundColor: '#174270',
	            position: 'relative',
	            overflow: 'hidden',
	            height: 1600
	          }
	        },
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { opacity: 1 },
	            always: false,
	            style: { opacity: 0, paddingTop: 60 },
	            className: 'tween-one'
	          },
	          'transform \u5FC5\u9700\u5728 style \u91CC\u8BBE\u5B9A\u521D\u59CB\u503C'
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { opacity: 1 },
	            style: { opacity: 0, paddingTop: 0, fontSize: 24 },
	            className: 'tween-one'
	          },
	          '\u9ED8\u8BA4\u663E\u793A\u4F4D\u7F6E[0 ,1]'
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { scaleX: 1, scaleY: 1 },
	            style: { transform: 'scale(0)', color: '#fff' },
	            className: 'demo parallax-shape'
	          },
	          'Scale'
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { rotate: 360 },
	            style: { transform: 'rotate(0)' },
	            className: 'demo2 parallax-shape'
	          },
	          'rotate'
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { x: 0, opacity: 1 },
	            style: {
	              transform: 'translateX(-200px)',
	              opacity: 0,
	              backgroundColor: '#133252',
	              color: '#fff'
	            },
	            className: 'demo2 parallax-shape'
	          },
	          'X'
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { rotateY: 360 },
	            style: { transform: 'perspective(100px) rotateY(0)', backgroundColor: '#0098CE' },
	            className: 'demo2 parallax-shape'
	          },
	          'rotateY'
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { opacity: 1 },
	            style: { opacity: 0, paddingTop: 60, fontSize: 24 },
	            className: 'tween-one'
	          },
	          '\u81EA\u5B9A\u4E49\u663E\u793A\u4F4D\u7F6E'
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { blur: '0px', playScale: [0.5, 0.8], opacity: 1 },
	            style: { filter: 'blur(20px)', opacity: 0, color: '#fff' },
	            className: 'demo parallax-shape'
	          },
	          'blur'
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { color: '#fff000', backgroundColor: '#F38EAD', playScale: [0.3, 0.8] },
	            style: { filter: 'blur(0px)', color: '#fff' },
	            className: 'demo parallax-shape'
	          },
	          'color'
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { opacity: 1 },
	            style: { opacity: 0, paddingTop: 60, fontSize: 24 },
	            className: 'tween-one'
	          },
	          '\u591A\u79CD\u6837\u5F0F\u65F6\u95F4\u8F74\u52A8\u753B'
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: [{ opacity: 1, playScale: [0, 0.2] }, { blur: '0px', backgroundColor: '#F38EAD', playScale: [0, 0.2] }, {
	              translateX: -100,
	              boxShadow: '5px 5px 5px #000',
	              color: '#fff000',
	              playScale: [0, 0.2]
	            }, { translateX: 100, playScale: [0, 0.2] }, { translateX: 0, playScale: [0, 0.2] }],
	            style: { filter: 'blur(10px)', transform: 'translateX(0px)', opacity: 0, color: '#fff' },
	            className: 'demo parallax-shape'
	          },
	          'timeline'
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'pack-page',
	          style: {
	            backgroundColor: '#0097D0',
	            position: 'relative',
	            textAlign: 'center',
	            fontSize: 36
	          }
	        },
	        _react2.default.createElement(
	          'div',
	          { className: 'page2-title' },
	          '\u89C6\u5DEE\u793A\u4F8B'
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { translateY: 120, opacity: 1, ease: 'linear', playScale: [0, 2] },
	            style: { transform: 'translateY(420px) scale(.8)', color: '#fff' }
	          },
	          _react2.default.createElement('img', {
	            src: 'https://os.alipayobjects.com/rmsportal/CrVCkwvtTQQvQHL.png',
	            style: { width: 100 }
	          })
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { translateY: 20, opacity: 1, ease: 'linear', playScale: [0, 1.5] },
	            style: { transform: 'translateY(380px) scale(.9)', color: '#fff' }
	          },
	          _react2.default.createElement('img', {
	            src: 'https://os.alipayobjects.com/rmsportal/sfmdyWNlweIvfUh.png',
	            style: { width: 150 }
	          })
	        ),
	        _react2.default.createElement(
	          ScrollParallax,
	          {
	            animation: { translateY: -100, opacity: 1, ease: 'linear', playScale: [0, 1] },
	            style: { transform: 'translateY(320px)', color: '#fff' }
	          },
	          _react2.default.createElement('img', {
	            src: 'https://os.alipayobjects.com/rmsportal/sfmdyWNlweIvfUh.png',
	            style: { width: 200 }
	          })
	        )
	      ),
	      _react2.default.createElement(
	        ScrollElement,
	        { style: { height: 2000 }, id: 'Scroll-Pack' },
	        _react2.default.createElement(
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
	          _react2.default.createElement(ScrollParallax, {
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
	          _react2.default.createElement(
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
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=parallax.js.map