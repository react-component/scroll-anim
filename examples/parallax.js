webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(193);


/***/ },

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	// use jsx to render html, do not modify simple.html
	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	__webpack_require__(2);
	
	var _rcScrollAnim = __webpack_require__(3);
	
	var _rcScrollAnim2 = _interopRequireDefault(_rcScrollAnim);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(163);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var ScrollParallax = _rcScrollAnim2['default'].Parallax;
	var ScrollElement = _rcScrollAnim2['default'].Element;
	
	var Demo = (function (_React$Component) {
	  _inherits(Demo, _React$Component);
	
	  function Demo() {
	    _classCallCheck(this, Demo);
	
	    _get(Object.getPrototypeOf(Demo.prototype), 'constructor', this).apply(this, arguments);
	    this.state = {
	      css: { backgroundColor: '#123400', height: 900 },
	      cssNoPosition: true
	    };
	  }
	
	  _createClass(Demo, [{
	    key: 'onComplete',
	    value: function onComplete() {
	      console.log('complete');
	    }
	  }, {
	    key: 'setCss',
	    value: function setCss() {
	      var css = this.state.css;
	      console.log('start');
	      if (this.state.cssNoPosition) {
	        css.position = 'fixed';
	        css.top = 0;
	      } else {
	        css.position = '';
	        css.top = '';
	      }
	      this.setState({
	        css: css,
	        cssNoPosition: !this.state.cssNoPosition
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'div',
	          { className: 'pack-page' },
	          _react2['default'].createElement(
	            'div',
	            null,
	            '我是内容'
	          ),
	          _react2['default'].createElement(
	            'div',
	            null,
	            '我是内容'
	          ),
	          _react2['default'].createElement(
	            'div',
	            null,
	            '我是内容'
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'pack-page',
	            style: { backgroundColor: '#fff000', position: 'relative', overflow: 'hidden' } },
	          _react2['default'].createElement(
	            ScrollParallax,
	            {
	              vars: [{ translateX: '0px', opacity: 1, playScale: [0, 0.5], boxShadow: '2px 2px 2px #000' }, { marginTop: 400, playScale: [0, 0.3] }, { rotateY: 180, playScale: [0, 0.5] }],
	              style: { opacity: 0, transform: 'perspective(200px) translateX(-100px)', textAlign: 'center' } },
	            'X到0后最Ｙ到400,Y用的是marginTop,所以改变了下面两个的offsetTop'
	          ),
	          _react2['default'].createElement(
	            ScrollParallax,
	            { vars: { scaleX: 1, scaleY: 1, opacity: 1, playScale: [0.5, 1] },
	              style: { opacity: 0, transform: 'scale(0)', textAlign: 'center' } },
	            'Scale示例示例示例'
	          ),
	          _react2['default'].createElement(
	            ScrollParallax,
	            { vars: { filter: 'blur(0px)', opacity: 1, playScale: [0.5, 1] },
	              style: { opacity: 0, filter: 'blur(10px)', textAlign: 'center' } },
	            'filter示例示例示例'
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'pack-page',
	            style: { backgroundColor: '#ff0000', position: 'relative', textAlign: 'center', fontSize: 36 } },
	          _react2['default'].createElement(
	            ScrollParallax,
	            { vars: { translateY: 20, opacity: 1, ease: 'linear', playScale: [0, 1.5] },
	              style: { transform: 'translateY(320px) scale(.8)', color: '#fff', opacity: 0.5 } },
	            '视差示例示例示例'
	          ),
	          _react2['default'].createElement(
	            ScrollParallax,
	            { vars: { translateY: -20, opacity: 1, ease: 'linear', playScale: [0, 1.2] },
	              style: { transform: 'translateY(320px) scale(.9)', color: '#fff', opacity: 0.7 } },
	            '视差示例示例示例'
	          ),
	          _react2['default'].createElement(
	            ScrollParallax,
	            { vars: { translateY: -60, opacity: 1, ease: 'linear' },
	              style: { transform: 'translateY(320px)', color: '#fff' } },
	            '视差示例示例示例'
	          )
	        ),
	        _react2['default'].createElement(
	          ScrollElement,
	          { style: { height: 2000 }, name: 'Scroll-Pack' },
	          _react2['default'].createElement(
	            ScrollParallax,
	            { className: 'pack-page',
	              location: 'Scroll-Pack',
	              vars: { backgroundColor: '#ddff00', playScale: [1, 2], onStart: this.setCss.bind(this), onComplete: this.onComplete.bind(this) },
	              style: this.state.css },
	            _react2['default'].createElement(
	              ScrollParallax,
	              { vars: [{ translateY: 0 }, { translateY: '500px' }],
	                location: 'Scroll-Pack',
	                style: { transform: 'translateY(300px)', color: '#fff', fontSize: 36 } },
	              '示例示例'
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return Demo;
	})(_react2['default'].Component);
	
	_reactDom2['default'].render(_react2['default'].createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=parallax.js.map