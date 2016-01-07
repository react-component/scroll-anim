webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
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
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(164);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var ScrollParallax = _rcScrollAnim2['default'].Parallax;
	
	var Demo = (function (_React$Component) {
	  _inherits(Demo, _React$Component);
	
	  function Demo() {
	    _classCallCheck(this, Demo);
	
	    _get(Object.getPrototypeOf(Demo.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Demo, [{
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
	            { vars: [{ translateX: '0px', opacity: 1, durationScale: 0.5 }, { marginTop: 400, durationScale: 0.3 }, { rotateY: 180, durationScale: 0.5 }],
	              style: { opacity: 0, transform: 'translateX(-100px) perspective(200px)', textAlign: 'center' } },
	            'X到0后最Ｙ到400'
	          ),
	          _react2['default'].createElement(
	            ScrollParallax,
	            { vars: { scaleX: 1, scaleY: 1, opacity: 1, playScale: 0.3 },
	              style: { opacity: 0, transform: 'scale(0)', textAlign: 'center' } },
	            'Scale示例示例示例'
	          ),
	          _react2['default'].createElement(
	            ScrollParallax,
	            { vars: { filter: 'blur(0px)', opacity: 1, playScale: 0.3 },
	              style: { opacity: 0, filter: 'blur(10px)', textAlign: 'center' } },
	            'filter示例示例示例'
	          )
	        )
	      );
	    }
	  }]);
	
	  return Demo;
	})(_react2['default'].Component);
	
	_reactDom2['default'].render(_react2['default'].createElement(Demo, null), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=parallax.js.map