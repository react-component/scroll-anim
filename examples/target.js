webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(327);


/***/ }),

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _QueueAnim = __webpack_require__(293);
	
	var _QueueAnim2 = _interopRequireDefault(_QueueAnim);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	_QueueAnim2["default"].isQueueAnim = true; // export this package's api
	exports["default"] = _QueueAnim2["default"];
	module.exports = exports['default'];

/***/ }),

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(84);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(89);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _toConsumableArray2 = __webpack_require__(294);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(90);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(125);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _rcTweenOne = __webpack_require__(304);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	var _utils = __webpack_require__(307);
	
	var _animTypes = __webpack_require__(308);
	
	var _animTypes2 = _interopRequireDefault(_animTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var noop = function noop() {};
	
	var QueueAnim = function (_React$Component) {
	  (0, _inherits3["default"])(QueueAnim, _React$Component);
	
	  function QueueAnim() {
	    (0, _classCallCheck3["default"])(this, QueueAnim);
	
	    var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));
	
	    _initialiseProps.call(_this);
	
	    _this.isEnterKey = {};
	    _this.keysToEnter = [];
	    _this.keysToLeave = [];
	    // 记录转换成 TweenOne 组件。
	    _this.saveTweenTag = {};
	    _this.keysToEnterPaused = {};
	    _this.placeholderTimeoutIds = {};
	
	    // 第一次进入，默认进场
	    var children = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(_this.props));
	    var childrenShow = {};
	    children.forEach(function (child) {
	      if (!child || !child.key) {
	        return;
	      }
	      if (_this.props.appear) {
	        _this.keysToEnter.push(child.key);
	      } else {
	        childrenShow[child.key] = true;
	      }
	    });
	    _this.keysToEnterToCallback = [].concat((0, _toConsumableArray3["default"])(_this.keysToEnter));
	    _this.originalChildren = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(_this.props));
	    _this.state = {
	      children: children,
	      childrenShow: childrenShow
	    };
	    return _this;
	  }
	
	  QueueAnim.prototype.componentDidMount = function componentDidMount() {
	    if (this.props.appear) {
	      this.componentDidUpdate();
	    }
	  };
	
	  QueueAnim.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;
	
	    var nextChildren = (0, _utils.toArrayChildren)(nextProps.children);
	    var currentChildren = this.originalChildren;
	    var newChildren = (0, _utils.mergeChildren)(currentChildren, nextChildren);
	
	    var childrenShow = !newChildren.length ? {} : this.state.childrenShow;
	    this.keysToEnterPaused = {};
	    // 在出场没结束时，childrenShow 里的值将不会清除。再触发进场时， childrenShow 里的值是保留着的, 设置了 enterForcedRePlay 将重新播放进场。
	    this.keysToLeave.forEach(function (key) {
	      // 将所有在出场里的停止掉。避免间隔性出现
	      // 进场是用的间隔性进入，这里不做 stop 处理将会在这间隔里继续出场的动画。。
	      _this2.keysToEnterPaused[key] = true;
	      if (nextProps.enterForcedRePlay) {
	        // 清掉所有出场的。
	        delete childrenShow[key];
	      }
	    });
	
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	
	    // need render to avoid update
	    this.setState({
	      childrenShow: childrenShow,
	      children: newChildren
	    });
	
	    nextChildren.forEach(function (c) {
	      if (!c) {
	        return;
	      }
	      var key = c.key;
	      var hasPrev = (0, _utils.findChildInChildrenByKey)(currentChildren, key);
	      if (!hasPrev && key) {
	        _this2.keysToEnter.push(key);
	      }
	      // 如果当前 key 已存在 saveTweenTag 里，，刷新 child;
	      if (_this2.saveTweenTag[key]) {
	        _this2.saveTweenTag[key] = _react2["default"].cloneElement(_this2.saveTweenTag[key], {}, c);
	      }
	    });
	
	    currentChildren.forEach(function (c) {
	      if (!c) {
	        return;
	      }
	      var key = c.key;
	      var hasNext = (0, _utils.findChildInChildrenByKey)(nextChildren, key);
	      if (!hasNext && key) {
	        // 出场时删出动画标签，render 时重新生成。
	        delete _this2.saveTweenTag[key];
	        _this2.keysToLeave.push(key);
	      }
	    });
	    this.keysToEnterToCallback = [].concat((0, _toConsumableArray3["default"])(this.keysToEnter));
	  };
	
	  QueueAnim.prototype.componentDidUpdate = function componentDidUpdate() {
	    this.originalChildren = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(this.props));
	    var keysToEnter = [].concat((0, _toConsumableArray3["default"])(this.keysToEnter));
	    var keysToLeave = [].concat((0, _toConsumableArray3["default"])(this.keysToLeave));
	    keysToEnter.forEach(this.performEnter);
	    keysToLeave.forEach(this.performLeave);
	  };
	
	  QueueAnim.prototype.componentWillUnmount = function componentWillUnmount() {
	    var _this3 = this;
	
	    Object.keys(this.placeholderTimeoutIds).forEach(function (key) {
	      _rcTweenOne.ticker.clear(_this3.placeholderTimeoutIds[key]);
	    });
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	  };
	
	  QueueAnim.prototype.getTweenType = function getTweenType(type, num) {
	    var data = _animTypes2["default"][type];
	    return this.getTweenAnimConfig(data, num);
	  };
	
	  QueueAnim.prototype.getTweenAnimConfig = function getTweenAnimConfig(data, num) {
	    var obj = {};
	    Object.keys(data).forEach(function (key) {
	      obj[key] = data[key][num];
	    });
	    return obj;
	  };
	
	  QueueAnim.prototype.render = function render() {
	    var _this4 = this;
	
	    var tagProps = (0, _objectWithoutProperties3["default"])(this.props, []);
	
	    var childrenToRender = (0, _utils.toArrayChildren)(this.state.children).map(function (child) {
	      if (!child || !child.key) {
	        return child;
	      }
	      var key = child.key;
	      if (_this4.keysToLeave.indexOf(key) >= 0 && _this4.state.childrenShow[key] || _this4.state.childrenShow[key]) {
	        var animation = _this4.keysToLeave.indexOf(key) >= 0 ? _this4.getTweenLeaveData(key, _this4.keysToLeave.indexOf(key)) : _this4.getTweenEnterData(key, _this4.keysToEnterToCallback.indexOf(key));
	        var props = {
	          key: key,
	          component: null,
	          animation: animation
	        };
	        if (!_this4.saveTweenTag[key]) {
	          _this4.saveTweenTag[key] = (0, _react.createElement)(_rcTweenOne2["default"], props, child);
	        } else {
	          _this4.saveTweenTag[key] = (0, _react.cloneElement)(_this4.saveTweenTag[key], props);
	        }
	        if (_this4.keysToEnterPaused[key] && !(_this4.keysToLeave.indexOf(key) >= 0 && _this4.state.childrenShow[key])) {
	          return (0, _react.cloneElement)(_this4.saveTweenTag[key], { paused: true });
	        }
	        return _this4.saveTweenTag[key];
	      }
	      return null;
	    });
	
	    ['component', 'interval', 'duration', 'delay', 'type', 'animConfig', 'ease', 'leaveReverse', 'animatingClassName', 'enterForcedRePlay', 'onEnd', 'appear'].forEach(function (key) {
	      return delete tagProps[key];
	    });
	    return (0, _react.createElement)(this.props.component, (0, _extends3["default"])({}, tagProps), childrenToRender);
	  };
	
	  return QueueAnim;
	}(_react2["default"].Component);
	
	var _initialiseProps = function _initialiseProps() {
	  var _this5 = this;
	
	  this.getTweenEnterData = function (key, i) {
	    var props = _this5.props;
	    var startAnim = _this5.getAnimData(props, key, i, 0, 1);
	    var enterAnim = _this5.getAnimData(props, key, i, 0, 0);
	    startAnim = props.enterForcedRePlay || !_this5.isEnterKey[key] ? startAnim : {};
	    var ease = (0, _utils.transformArguments)(props.ease, key, i)[0];
	    var duration = (0, _utils.transformArguments)(props.duration, key, i)[0];
	    if (Array.isArray(ease)) {
	      ease = ease.map(function (num) {
	        return num * 100;
	      });
	      ease = _rcTweenOne2["default"].easing.path('M0,100C' + ease[0] + ',' + (100 - ease[1]) + ',' + ease[2] + ',' + (100 - ease[3]) + ',100,0', { lengthPixel: duration / 16.6667 });
	    }
	
	    return [(0, _extends3["default"])({ duration: 0 }, startAnim), (0, _extends3["default"])({
	      onStart: _this5.enterBegin.bind(_this5, key),
	      onComplete: _this5.enterComplete.bind(_this5, key),
	      duration: duration,
	      ease: ease
	    }, enterAnim)];
	  };
	
	  this.getTweenLeaveData = function (key, i) {
	    var props = _this5.props;
	    var startAnim = _this5.getAnimData(props, key, i, 1, 0);
	    var leaveAnim = _this5.getAnimData(props, key, i, 1, 1);
	    startAnim = props.enterForcedRePlay || !_this5.isEnterKey[key] ? startAnim : {};
	    var interval = (0, _utils.transformArguments)(props.interval, key, i)[1];
	    var delay = (0, _utils.transformArguments)(props.delay, key, i)[1];
	    var order = props.leaveReverse ? _this5.keysToLeave.length - i - 1 : i;
	    var ease = (0, _utils.transformArguments)(props.ease, key, i)[0];
	    var duration = (0, _utils.transformArguments)(props.duration, key, i)[0];
	    if (Array.isArray(ease)) {
	      ease = ease.map(function (num) {
	        return num * 100;
	      });
	      ease = _rcTweenOne2["default"].easing.path('M0,100C' + ease[0] + ',' + (100 - ease[1]) + ',' + ease[2] + ',' + (100 - ease[3]) + ',100,0', { lengthPixel: duration / 16.6667 });
	    }
	    return [(0, _extends3["default"])({ duration: 0 }, startAnim), (0, _extends3["default"])({
	      onStart: _this5.leaveBegin.bind(_this5, key),
	      onComplete: _this5.leaveComplete.bind(_this5, key),
	      duration: (0, _utils.transformArguments)(props.duration, key, i)[0],
	      ease: ease,
	      delay: interval * order + delay
	    }, leaveAnim)];
	  };
	
	  this.getAnimData = function (props, key, i, enterOrLeave, startOrEnd) {
	    /*
	     * transformArguments 第一个为 enter, 第二个为 leave；
	     * getTweenAnimConfig or getTweenType 第一个为到达的位置， 第二个为开始的位置。
	     * 用 tween-one 的数组来实现老的动画逻辑。。。
	     */
	    return props.animConfig ? _this5.getTweenAnimConfig((0, _utils.transformArguments)(props.animConfig, key, i)[enterOrLeave], startOrEnd) : _this5.getTweenType((0, _utils.transformArguments)(props.type, key, i)[enterOrLeave], startOrEnd);
	  };
	
	  this.performEnter = function (key, i) {
	    var interval = (0, _utils.transformArguments)(_this5.props.interval, key, i)[0];
	    var delay = (0, _utils.transformArguments)(_this5.props.delay, key, i)[0];
	    _this5.placeholderTimeoutIds[key] = _rcTweenOne.ticker.timeout(_this5.performEnterBegin.bind(_this5, key), interval * i + delay);
	    if (_this5.keysToEnter.indexOf(key) >= 0) {
	      _this5.keysToEnter.splice(_this5.keysToEnter.indexOf(key), 1);
	    }
	  };
	
	  this.performEnterBegin = function (key) {
	    var childrenShow = _this5.state.childrenShow;
	    childrenShow[key] = true;
	    delete _this5.keysToEnterPaused[key];
	    _this5.setState({ childrenShow: childrenShow });
	  };
	
	  this.performLeave = function (key) {
	    _rcTweenOne.ticker.clear(_this5.placeholderTimeoutIds[key]);
	    delete _this5.placeholderTimeoutIds[key];
	  };
	
	  this.enterBegin = function (key, e) {
	    var elem = e.target;
	    var animatingClassName = _this5.props.animatingClassName;
	    elem.className = elem.className.replace(animatingClassName[1], '');
	    if (elem.className.indexOf(animatingClassName[0]) === -1) {
	      elem.className += '' + (elem.className ? ' ' : '') + animatingClassName[0];
	    }
	    _this5.isEnterKey[key] = true;
	  };
	
	  this.enterComplete = function (key, e) {
	    if (_this5.keysToEnterPaused[key]) {
	      return;
	    }
	    var elem = e.target;
	    elem.className = elem.className.replace(_this5.props.animatingClassName[0], '').trim();
	    _this5.props.onEnd({ key: key, type: 'enter' });
	  };
	
	  this.leaveBegin = function (key, e) {
	    var elem = e.target;
	    var animatingClassName = _this5.props.animatingClassName;
	    elem.className = elem.className.replace(animatingClassName[0], '');
	    if (elem.className.indexOf(animatingClassName[1]) === -1) {
	      elem.className += ' ' + animatingClassName[1];
	    }
	  };
	
	  this.leaveComplete = function (key, e) {
	    // 切换时同时触发 onComplete。 手动跳出。。。
	    if (_this5.keysToEnterToCallback.indexOf(key) >= 0) {
	      return;
	    }
	    var childrenShow = _this5.state.childrenShow;
	    delete childrenShow[key];
	    if (_this5.keysToLeave.indexOf(key) >= 0) {
	      _this5.keysToLeave.splice(_this5.keysToLeave.indexOf(key), 1);
	      delete _this5.saveTweenTag[key];
	      delete _this5.isEnterKey[key];
	    }
	    var needLeave = _this5.keysToLeave.some(function (c) {
	      return childrenShow[c];
	    });
	    if (!needLeave) {
	      var currentChildren = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(_this5.props));
	      _this5.setState({
	        children: currentChildren,
	        childrenShow: childrenShow
	      });
	    }
	    var elem = e.target;
	    elem.className = elem.className.replace(_this5.props.animatingClassName[1], '').trim();
	    _this5.props.onEnd({ key: key, type: 'leave' });
	  };
	};
	
	QueueAnim.propTypes = {
	  component: _propTypes2["default"].any,
	  interval: _propTypes2["default"].any,
	  duration: _propTypes2["default"].any,
	  delay: _propTypes2["default"].any,
	  type: _propTypes2["default"].any,
	  animConfig: _propTypes2["default"].any,
	  ease: _propTypes2["default"].any,
	  leaveReverse: _propTypes2["default"].bool,
	  enterForcedRePlay: _propTypes2["default"].bool,
	  animatingClassName: _propTypes2["default"].array,
	  onEnd: _propTypes2["default"].func,
	  appear: _propTypes2["default"].bool
	};
	
	QueueAnim.defaultProps = {
	  component: 'div',
	  interval: 100,
	  duration: 450,
	  delay: 0,
	  type: 'right',
	  animConfig: null,
	  ease: 'easeOutQuart',
	  leaveReverse: false,
	  enterForcedRePlay: false,
	  animatingClassName: ['queue-anim-entering', 'queue-anim-leaving'],
	  onEnd: noop,
	  appear: true
	};
	
	exports["default"] = QueueAnim;
	module.exports = exports['default'];

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(295);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }
	
	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(296), __esModule: true };

/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(297);
	module.exports = __webpack_require__(15).Array.from;

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(16)
	  , $export        = __webpack_require__(13)
	  , toObject       = __webpack_require__(50)
	  , call           = __webpack_require__(298)
	  , isArrayIter    = __webpack_require__(299)
	  , toLength       = __webpack_require__(40)
	  , createProperty = __webpack_require__(300)
	  , getIterFn      = __webpack_require__(301);
	
	$export($export.S + $export.F * !__webpack_require__(303)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(20);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ }),

/***/ 299:
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(30)
	  , ITERATOR   = __webpack_require__(48)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(19)
	  , createDesc      = __webpack_require__(27);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(302)
	  , ITERATOR  = __webpack_require__(48)('iterator')
	  , Iterators = __webpack_require__(30);
	module.exports = __webpack_require__(15).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(38)
	  , TAG = __webpack_require__(48)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(48)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var TweenOne = __webpack_require__(305);
	TweenOne.TweenOneGroup = __webpack_require__(306);
	TweenOne.easing = __webpack_require__(280);
	TweenOne.plugins = __webpack_require__(284);
	TweenOne.ticker = __webpack_require__(287);
	TweenOne.isTweenOne = true;
	module.exports = TweenOne;

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(84);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(90);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(125);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactDom = __webpack_require__(130);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _util = __webpack_require__(281);
	
	var _styleUtils = __webpack_require__(286);
	
	var _TimeLine = __webpack_require__(279);
	
	var _TimeLine2 = _interopRequireDefault(_TimeLine);
	
	var _ticker = __webpack_require__(287);
	
	var _ticker2 = _interopRequireDefault(_ticker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function noop() {}
	
	var perFrame = Math.round(1000 / 60);
	
	var TweenOne = function (_Component) {
	  (0, _inherits3["default"])(TweenOne, _Component);
	
	  function TweenOne() {
	    (0, _classCallCheck3["default"])(this, TweenOne);
	
	    var _this = (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));
	
	    _this.restart = function () {
	      _this.startMoment = _this.timeLine.progressTime;
	      _this.startFrame = _ticker2["default"].frame;
	      _this.play();
	    };
	
	    _this.start = function () {
	      _this.updateAnim = null;
	      var props = _this.props;
	      if (props.animation && Object.keys(props.animation).length) {
	        _this.timeLine = new _TimeLine2["default"](_this.dom, (0, _util.dataToArray)(props.animation), { attr: props.attr, willChange: props.willChange });
	        // 预先注册 raf, 初始动画数值。
	        _this.raf();
	        // 开始动画
	        _this.play();
	      }
	    };
	
	    _this.play = function () {
	      _this.cancelRequestAnimationFrame();
	      if (_this.paused) {
	        return;
	      }
	      _this.rafID = _ticker2["default"].add(_this.raf);
	    };
	
	    _this.updateAnimFunc = function () {
	      _this.cancelRequestAnimationFrame();
	      _this.startFrame = _ticker2["default"].frame;
	      if (_this.updateAnim === 'update') {
	        if (_this.props.resetStyleBool && _this.timeLine) {
	          _this.timeLine.resetDefaultStyle();
	        }
	        _this.startMoment = 0;
	      }
	    };
	
	    _this.frame = function () {
	      var moment = (_ticker2["default"].frame - _this.startFrame) * perFrame + _this.startMoment;
	      if (_this.reverse) {
	        moment = (_this.startMoment || 0) - (_ticker2["default"].frame - _this.startFrame) * perFrame;
	      }
	      moment = moment > _this.timeLine.totalTime ? _this.timeLine.totalTime : moment;
	      moment = moment <= 0 ? 0 : moment;
	      if (moment < _this.moment && !_this.reverse) {
	        _this.timeLine.resetDefaultStyle();
	      }
	      _this.moment = moment;
	      _this.timeLine.onChange = _this.onChange;
	      _this.timeLine.frame(moment);
	    };
	
	    _this.raf = function () {
	      _this.frame();
	      if (_this.updateAnim) {
	        if (_this.updateStartStyle) {
	          _this.timeLine.reStart(_this.props.style);
	        }
	        _this.updateAnimFunc();
	        _this.start();
	      }
	      if (_this.moment >= _this.timeLine.totalTime && !_this.reverse || _this.paused || _this.reverse && _this.moment === 0) {
	        return _this.cancelRequestAnimationFrame();
	      }
	    };
	
	    _this.cancelRequestAnimationFrame = function () {
	      _ticker2["default"].clear(_this.rafID);
	      _this.rafID = -1;
	    };
	
	    _this.rafID = -1;
	    _this.moment = _this.props.moment || 0;
	    _this.startMoment = _this.props.moment || 0;
	    _this.startFrame = _ticker2["default"].frame;
	    _this.paused = _this.props.paused;
	    _this.reverse = _this.props.reverse;
	    _this.onChange = _this.props.onChange;
	    _this.newMomentAnim = false;
	    _this.updateAnim = null;
	    return _this;
	  }
	
	  TweenOne.prototype.componentDidMount = function componentDidMount() {
	    this.dom = _reactDom2["default"].findDOMNode(this);
	    this.start();
	  };
	
	  TweenOne.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;
	
	    if (nextProps.resetStyleBool && this.timeLine && this.rafID === -1) {
	      this.timeLine.resetDefaultStyle();
	    }
	    this.onChange = nextProps.onChange;
	    // 跳帧事件 moment;
	    var newMoment = nextProps.moment;
	    this.newMomentAnim = false;
	    if (typeof newMoment === 'number' && newMoment !== this.moment) {
	      this.startMoment = newMoment;
	      this.startFrame = _ticker2["default"].frame;
	      if (this.rafID === -1 && !nextProps.paused) {
	        this.timeLine.resetAnimData();
	        var style = nextProps.style;
	        this.dom.setAttribute('style', '');
	        Object.keys(style).forEach(function (key) {
	          _this2.dom.style[key] = (0, _styleUtils.stylesToCss)(key, style[key]);
	        });
	        this.play();
	      } else {
	        this.newMomentAnim = true;
	      }
	    }
	    // 动画处理
	    var newAnimation = nextProps.animation;
	    var currentAnimation = this.props.animation;
	    var equal = (0, _util.objectEqual)(currentAnimation, newAnimation);
	    var styleEqual = (0, _util.objectEqual)(this.props.style, nextProps.style);
	    // 如果 animation 不同， 在下一帧重新动画
	    if (!equal) {
	      if (this.rafID !== -1) {
	        this.updateAnim = 'update';
	      } else if (nextProps.updateReStart) {
	        this.startFrame = _ticker2["default"].frame;
	        this.updateAnim = 'start';
	      }
	      // 只做动画，不做回调处理。。。
	      if (this.timeLine) {
	        this.timeLine.updateAnim = this.updateAnim;
	      }
	    }
	
	    if (!styleEqual) {
	      // 在动画时更改了 style, 作为更改开始数值。
	      if (this.rafID !== -1) {
	        this.updateStartStyle = true;
	      }
	    }
	
	    // 暂停倒放
	    if (this.paused !== nextProps.paused || this.reverse !== nextProps.reverse) {
	      this.paused = nextProps.paused;
	      this.reverse = nextProps.reverse;
	      if (this.paused) {
	        this.cancelRequestAnimationFrame();
	      } else {
	        if (this.reverse && nextProps.reverseDelay) {
	          this.cancelRequestAnimationFrame();
	          _ticker2["default"].timeout(this.restart, nextProps.reverseDelay);
	        } else {
	          this.restart();
	        }
	      }
	    }
	  };
	
	  TweenOne.prototype.componentDidUpdate = function componentDidUpdate() {
	    if (this.updateStartStyle && !this.updateAnim) {
	      this.timeLine.reStart(this.props.style);
	      this.updateStartStyle = false;
	    }
	
	    if (this.newMomentAnim) {
	      this.raf();
	    }
	
	    // 样式更新了后再执行动画；
	    if (this.updateAnim === 'start') {
	      this.start();
	    }
	  };
	
	  TweenOne.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.cancelRequestAnimationFrame();
	  };
	
	  TweenOne.prototype.render = function render() {
	    var props = (0, _extends3["default"])({}, this.props);
	    ['animation', 'component', 'componentReplace', 'reverseDelay', 'attr', 'paused', 'reverse', 'moment', 'resetStyleBool', 'updateReStart', 'willChange'].forEach(function (key) {
	      return delete props[key];
	    });
	    props.style = (0, _extends3["default"])({}, this.props.style);
	    Object.keys(props.style).forEach(function (p) {
	      if (p.match(/filter/i)) {
	        ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
	          return props.style[prefix + 'Filter'] = props.style[p];
	        });
	      }
	    });
	    // 子级是组件，生成组件需要替换的 component;
	    props.component = typeof props.component === 'function' ? this.props.componentReplace : props.component;
	    if (!props.component) {
	      delete props.component;
	    }
	    // component 为空时调用子级的。。
	    if (!this.props.component) {
	      var childrenProps = this.props.children.props;
	      var style = childrenProps.style,
	          className = childrenProps.className;
	      // 合并 style 与 className。
	
	      var newStyle = (0, _extends3["default"])({}, style, props.style);
	      var newClassName = props.className ? props.className + ' ' + className : className;
	      return _react2["default"].cloneElement(this.props.children, { style: newStyle, className: newClassName });
	    }
	    return _react2["default"].createElement(this.props.component, props);
	  };
	
	  return TweenOne;
	}(_react.Component);
	
	var objectOrArray = _propTypes2["default"].oneOfType([_propTypes2["default"].object, _propTypes2["default"].array]);
	
	TweenOne.propTypes = {
	  component: _propTypes2["default"].any,
	  componentReplace: _propTypes2["default"].string,
	  animation: objectOrArray,
	  children: _propTypes2["default"].any,
	  style: _propTypes2["default"].object,
	  paused: _propTypes2["default"].bool,
	  reverse: _propTypes2["default"].bool,
	  reverseDelay: _propTypes2["default"].number,
	  moment: _propTypes2["default"].number,
	  attr: _propTypes2["default"].string,
	  willChange: _propTypes2["default"].bool,
	  onChange: _propTypes2["default"].func,
	  resetStyleBool: _propTypes2["default"].bool,
	  updateReStart: _propTypes2["default"].bool
	};
	
	TweenOne.defaultProps = {
	  component: 'div',
	  reverseDelay: 0,
	  attr: 'style',
	  onChange: noop,
	  willChange: true,
	  updateReStart: true
	};
	exports["default"] = TweenOne;
	module.exports = exports['default'];

/***/ }),

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(84);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(90);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(125);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _TweenOne = __webpack_require__(305);
	
	var _TweenOne2 = _interopRequireDefault(_TweenOne);
	
	var _util = __webpack_require__(281);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function noop() {}
	
	var TweenOneGroup = function (_Component) {
	  (0, _inherits3["default"])(TweenOneGroup, _Component);
	
	  function TweenOneGroup() {
	    (0, _classCallCheck3["default"])(this, TweenOneGroup);
	
	    var _this = (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));
	
	    _initialiseProps.call(_this);
	
	    _this.keysToEnter = [];
	    _this.keysToLeave = [];
	    _this.saveTweenTag = {};
	    _this.onEnterBool = false;
	    _this.isTween = {};
	    // 第一进入，appear 为 true 时默认用 enter 或 tween-one 上的效果
	    var children = (0, _util.toArrayChildren)((0, _util.getChildrenFromProps)(_this.props));
	    _this.state = {
	      children: children
	    };
	    return _this;
	  }
	
	  TweenOneGroup.prototype.componentDidMount = function componentDidMount() {
	    this.onEnterBool = true;
	  };
	
	  TweenOneGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;
	
	    var nextChildren = (0, _util.toArrayChildren)(nextProps.children);
	    var currentChildren = (0, _util.toArrayChildren)(this.state.children);
	    var newChildren = (0, _util.mergeChildren)(currentChildren, nextChildren);
	
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	    nextChildren.forEach(function (c) {
	      if (!c) {
	        return;
	      }
	      var key = c.key;
	      var hasPrev = (0, _util.findChildInChildrenByKey)(currentChildren, key);
	      // 如果当前 key 已存在 saveTweenTag 里，，刷新 child;
	      if (_this2.saveTweenTag[key]) {
	        _this2.saveTweenTag[key] = _react2["default"].cloneElement(_this2.saveTweenTag[key], {}, c);
	      }
	      if (!hasPrev && key) {
	        _this2.keysToEnter.push(key);
	      }
	    });
	
	    currentChildren.forEach(function (c) {
	      if (!c) {
	        return;
	      }
	      var key = c.key;
	      var hasNext = (0, _util.findChildInChildrenByKey)(nextChildren, key);
	      if (!hasNext && key) {
	        _this2.keysToLeave.push(key);
	        delete _this2.saveTweenTag[key];
	      }
	    });
	    this.setState({
	      children: newChildren
	    });
	  };
	
	  TweenOneGroup.prototype.render = function render() {
	    var childrenToRender = this.getChildrenToRender(this.state.children);
	    if (!this.props.component) {
	      return childrenToRender[0] || null;
	    }
	    var componentProps = (0, _extends3["default"])({}, this.props);
	    ['component', 'appear', 'enter', 'leave', 'animatingClassName', 'onEnd', 'resetStyleBool', 'willChange'].forEach(function (key) {
	      return delete componentProps[key];
	    });
	    return (0, _react.createElement)(this.props.component, componentProps, childrenToRender);
	  };
	
	  return TweenOneGroup;
	}(_react.Component);
	
	var _initialiseProps = function _initialiseProps() {
	  var _this3 = this;
	
	  this.onChange = function (animation, key, type, obj) {
	    var length = (0, _util.dataToArray)(animation).length;
	    var animatingClassName = _this3.props.animatingClassName;
	    var tag = obj.target;
	    var isEnter = type === 'enter' || type === 'appear';
	    if (obj.mode === 'onStart') {
	      tag.className = tag.className.replace(animatingClassName[isEnter ? 1 : 0], '').trim();
	      if (tag.className.indexOf(animatingClassName[isEnter ? 0 : 1]) === -1) {
	        tag.className = (tag.className + ' ' + animatingClassName[isEnter ? 0 : 1]).trim();
	      }
	    } else if (obj.index === length - 1 && obj.mode === 'onComplete') {
	      if (type === 'enter') {
	        _this3.keysToEnter.splice(_this3.keysToEnter.indexOf(key), 1);
	      } else if (type === 'leave') {
	        var children = _this3.state.children.filter(function (child) {
	          return key !== child.key;
	        });
	        _this3.keysToLeave.splice(_this3.keysToLeave.indexOf(key), 1);
	        delete _this3.saveTweenTag[key];
	        _this3.setState({
	          children: children
	        });
	      }
	      tag.className = tag.className.replace(animatingClassName[isEnter ? 0 : 1], '').trim();
	      delete _this3.isTween[key];
	      var _obj = { key: key, type: type };
	      _this3.props.onEnd(_obj);
	    }
	  };
	
	  this.getTweenChild = function (child) {
	    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var key = child.key;
	    _this3.saveTweenTag[key] = _react2["default"].createElement(_TweenOne2["default"], (0, _extends3["default"])({}, props, {
	      key: key,
	      component: null
	    }), child);
	    return _this3.saveTweenTag[key];
	  };
	
	  this.getCoverAnimation = function (child, i, type) {
	    var animation = void 0;
	    var onChange = void 0;
	    animation = type === 'leave' ? _this3.props.leave : _this3.props.enter;
	    if (type === 'appear') {
	      var appear = (0, _util.transformArguments)(_this3.props.appear, child.key, i);
	      animation = appear && _this3.props.enter || null;
	    }
	    onChange = _this3.onChange.bind(_this3, animation, child.key, type);
	    var animate = (0, _util.transformArguments)(animation, child.key, i);
	    var props = {
	      willChange: _this3.props.willChange,
	      key: child.key,
	      animation: animate,
	      onChange: onChange,
	      resetStyleBool: _this3.props.resetStyleBool
	    };
	    var children = _this3.getTweenChild(child, props);
	    if (_this3.keysToEnter.concat(_this3.keysToLeave).indexOf(child.key) >= 0 || !_this3.onEnterBool && animation) {
	      _this3.isTween[child.key] = type;
	    }
	    return children;
	  };
	
	  this.getChildrenToRender = function (children) {
	    return children.map(function (child, i) {
	      if (!child || !child.key) {
	        return child;
	      }
	      var key = child.key;
	
	      if (_this3.keysToLeave.indexOf(key) >= 0) {
	        return _this3.getCoverAnimation(child, i, 'leave');
	      } else if (_this3.keysToEnter.indexOf(key) >= 0 || _this3.isTween[key] && _this3.keysToLeave.indexOf(key) === -1) {
	        return _this3.getCoverAnimation(child, i, 'enter');
	      } else if (!_this3.onEnterBool) {
	        return _this3.getCoverAnimation(child, i, 'appear');
	      }
	      return _this3.saveTweenTag[key];
	    });
	  };
	};
	
	TweenOneGroup.propTypes = {
	  component: _propTypes2["default"].any,
	  children: _propTypes2["default"].any,
	  style: _propTypes2["default"].object,
	  appear: _propTypes2["default"].bool,
	  enter: _propTypes2["default"].any,
	  leave: _propTypes2["default"].any,
	  animatingClassName: _propTypes2["default"].array,
	  onEnd: _propTypes2["default"].func,
	  willChange: _propTypes2["default"].bool,
	  resetStyleBool: _propTypes2["default"].bool
	};
	
	TweenOneGroup.defaultProps = {
	  component: 'div',
	  appear: true,
	  animatingClassName: ['tween-one-entering', 'tween-one-leaving'],
	  enter: { x: 50, opacity: 0, type: 'from' },
	  leave: { x: -50, opacity: 0 },
	  onEnd: noop,
	  willChange: true,
	  resetStyleBool: true
	};
	TweenOneGroup.isTweenOneGroup = true;
	exports["default"] = TweenOneGroup;
	module.exports = exports['default'];

/***/ }),

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toArrayChildren = toArrayChildren;
	exports.findChildInChildrenByKey = findChildInChildrenByKey;
	exports.mergeChildren = mergeChildren;
	exports.transformArguments = transformArguments;
	exports.getChildrenFromProps = getChildrenFromProps;
	
	var _react = __webpack_require__(90);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function toArrayChildren(children) {
	  var ret = [];
	  _react2["default"].Children.forEach(children, function (c) {
	    ret.push(c);
	  });
	  return ret;
	}
	
	function findChildInChildrenByKey(children, key) {
	  var ret = null;
	  if (children) {
	    children.forEach(function (c) {
	      if (ret || !c) {
	        return;
	      }
	      if (c.key === key) {
	        ret = c;
	      }
	    });
	  }
	  return ret;
	}
	
	function mergeChildren(prev, next) {
	  var ret = [];
	  // For each key of `next`, the list of keys to insert before that key in
	  // the combined list
	  var nextChildrenPending = {};
	  var pendingChildren = [];
	  var followChildrenKey = void 0;
	  prev.forEach(function (c) {
	    if (!c) {
	      return;
	    }
	    if (findChildInChildrenByKey(next, c.key)) {
	      if (pendingChildren.length) {
	        nextChildrenPending[c.key] = pendingChildren;
	        pendingChildren = [];
	      }
	      followChildrenKey = c.key;
	    } else if (c.key) {
	      pendingChildren.push(c);
	    }
	  });
	  if (!followChildrenKey) {
	    ret = ret.concat(pendingChildren);
	  }
	  next.forEach(function (c) {
	    if (!c) {
	      return;
	    }
	    if (nextChildrenPending.hasOwnProperty(c.key)) {
	      ret = ret.concat(nextChildrenPending[c.key]);
	    }
	    ret.push(c);
	    if (c.key === followChildrenKey) {
	      ret = ret.concat(pendingChildren);
	    }
	  });
	
	  return ret;
	}
	
	function transformArguments(arg, key, i) {
	  var result = void 0;
	  if (typeof arg === 'function') {
	    result = arg({
	      key: key,
	      index: i
	    });
	  } else {
	    result = arg;
	  }
	  if (Array.isArray(result) && result.length === 2) {
	    return result;
	  }
	  return [result, result];
	}
	
	function getChildrenFromProps(props) {
	  return props && props.children;
	}

/***/ }),

/***/ 308:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  left: {
	    opacity: [1, 0],
	    translateX: [0, -30]
	  },
	  top: {
	    opacity: [1, 0],
	    translateY: [0, -30]
	  },
	  right: {
	    opacity: [1, 0],
	    translateX: [0, 30]
	  },
	  bottom: {
	    opacity: [1, 0],
	    translateY: [0, 30]
	  },
	  alpha: {
	    opacity: [1, 0]
	  },
	  scale: {
	    opacity: [1, 0],
	    scale: [1, 0]
	  },
	  scaleBig: {
	    opacity: [1, 0],
	    scale: [1, 2]
	  },
	  scaleX: {
	    opacity: [1, 0],
	    scaleX: [1, 0]
	  },
	  scaleY: {
	    opacity: [1, 0],
	    scaleY: [1, 0]
	  }
	};
	module.exports = exports['default'];

/***/ }),

/***/ 327:
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
	
	var _rcQueueAnim = __webpack_require__(292);
	
	var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);
	
	var _rcTweenOne = __webpack_require__(304);
	
	var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// use jsx to render html, do not modify simple.html
	
	var _package = __webpack_require__(318);
	var ScrollOverPack = _rcScrollAnim2.default.OverPack;
	
	var Demo = function (_React$Component) {
	  (0, _inherits3.default)(Demo, _React$Component);
	
	  function Demo() {
	    (0, _classCallCheck3.default)(this, Demo);
	    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
	  }
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      { style: { height: '100vh', overflow: 'scroll' }, id: 'box' },
	      _react2.default.createElement(
	        'div',
	        { className: 'pack-page page0' },
	        _react2.default.createElement(
	          _rcQueueAnim2.default,
	          { className: 'home-title' },
	          _react2.default.createElement(
	            'div',
	            { className: 'page-title', key: 'title' },
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
	              'The simple demo'
	            )
	          )
	        )
	      ),
	      _react2.default.createElement(
	        ScrollOverPack,
	        {
	          id: 'page1',
	          className: 'page1',
	          replay: true,
	          targetId: 'box'
	        },
	        _react2.default.createElement(
	          _rcTweenOne2.default,
	          { className: 'tween-one', key: '0', animation: { opacity: 1 } },
	          '\u9ED8\u8BA4\u8FDB\u5165\u4E0E\u51FA\u573A, \u9876\u90E8\u51FA\u573A'
	        ),
	        _react2.default.createElement(
	          _rcQueueAnim2.default,
	          { key: '1' },
	          _react2.default.createElement('div', { key: '0', className: 'demo' }),
	          _react2.default.createElement('div', { key: '1', className: 'demo', style: { backgroundColor: '#F38EAD' } }),
	          _react2.default.createElement('div', { key: '2', className: 'demo' }),
	          _react2.default.createElement('div', { key: '3', className: 'demo' })
	        )
	      ),
	      _react2.default.createElement(
	        ScrollOverPack,
	        {
	          id: 'page4',
	          className: 'page1',
	          appear: false,
	          style: { backgroundColor: '#0098CE' },
	          targetId: 'box'
	        },
	        _react2.default.createElement(
	          _rcTweenOne2.default,
	          { className: 'tween-one', key: '0', animation: { opacity: 1 } },
	          '\u9ED8\u8BA4\u51FA\u573A\u76F4\u63A5\u51FA\u73B0'
	        ),
	        _react2.default.createElement(
	          _rcQueueAnim2.default,
	          { key: '1' },
	          _react2.default.createElement('div', { key: '0', className: 'demo' }),
	          _react2.default.createElement('div', { key: '1', className: 'demo', style: { backgroundColor: '#F38EAD' } }),
	          _react2.default.createElement('div', { key: '2', className: 'demo' }),
	          _react2.default.createElement('div', { key: '3', className: 'demo' })
	        )
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=target.js.map