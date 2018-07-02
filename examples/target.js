webpackJsonp([4],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Tween__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ticker__ = __webpack_require__(13);












function noop() {}

var perFrame = Math.round(1000 / 60);
var objectOrArray = __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object, __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.array]);

var TweenOne = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(TweenOne, _Component);

  function TweenOne(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, TweenOne);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    _this.rafID = -1;
    _this.setDefalut(props);
    _this.paused = props.paused;
    _this.reverse = props.reverse;
    _this.updateAnim = false;
    _this.forced = {};
    _this.setForcedJudg(props);
    return _this;
  }

  TweenOne.prototype.componentDidMount = function componentDidMount() {
    this.dom = __WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.findDOMNode(this);
    if (this.dom && this.dom.nodeName !== '#text') {
      this.start();
    }
  };

  TweenOne.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!this.tween && !this.dom) {
      this.updateAnim = true;
      return;
    }

    // 动画处理
    var newAnimation = nextProps.animation;
    var currentAnimation = this.props.animation;
    var equal = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["h" /* objectEqual */])(currentAnimation, newAnimation);
    if (!equal) {
      this.setDefalut(nextProps);
      this.updateAnim = true;
    }

    // 跳帧事件 moment;
    var nextMoment = nextProps.moment;
    if (typeof nextMoment === 'number' && nextMoment !== this.props.moment) {
      if (this.tween && !this.updateAnim) {
        this.startMoment = nextMoment;
        this.startFrame = __WEBPACK_IMPORTED_MODULE_9__ticker__["a" /* default */].frame;
        if (nextProps.paused) {
          this.raf();
        }
        if (this.tween.progressTime >= this.tween.totalTime) {
          this.play();
        }
      } else {
        this.setDefalut(nextProps);
        this.updateAnim = true;
      }
    }

    // 暂停倒放
    if (this.paused !== nextProps.paused || this.reverse !== nextProps.reverse) {
      this.paused = nextProps.paused;
      this.reverse = nextProps.reverse;
      if (this.paused) {
        this.cancelRequestAnimationFrame();
      } else if (this.reverse && nextProps.reverseDelay) {
        this.cancelRequestAnimationFrame();
        __WEBPACK_IMPORTED_MODULE_9__ticker__["a" /* default */].timeout(this.restart, nextProps.reverseDelay);
      } else {
        // 在 form 状态下，暂停时拉 moment 时，start 有值恢复播放，在 delay 的时间没有处理。。
        if (this.tween) {
          this.tween.resetAnimData();
          this.tween.resetDefaultStyle();
        }
        if (!this.updateAnim) {
          this.restart();
        }
      }
    }

    var styleEqual = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["h" /* objectEqual */])(this.props.style, nextProps.style);
    if (!styleEqual) {
      // 在动画时更改了 style, 作为更改开始数值。
      if (this.tween) {
        this.tween.reStart(this.props.style);
      }
    }
    this.setForcedJudg(nextProps);
  };

  TweenOne.prototype.componentDidUpdate = function componentDidUpdate() {
    if (!this.dom || this.dom.nodeName !== '#text') {
      this.dom = __WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.findDOMNode(this);
    }
    // 样式更新了后再执行动画；
    if (this.updateAnim && this.dom && this.dom.nodeName !== '#text') {
      this.start();
    }
  };

  TweenOne.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cancelRequestAnimationFrame();
  };

  /**
   * @method setForcedJudg
   * @param props
   * QueueAnim 套在组件下面后导至子级变化。
   * <QueueAnim component={Menu} >
   *   <SubMenu key="a" title="导航">
   *     <Item />
   *   </SubMenu>
   * </QueueAnim>
   * rc-Menu 里是以 isXXX 来判断是 rc-Menu 的子级;
   * 如: 用 isSubMenu 来处理 hover 事件
   * 地址: https://github.com/react-component/menu/blob/master/src/MenuMixin.js#L172
   * 暂时方案: 在组件里添加判断用的值。
   */

  TweenOne.prototype.render = function render() {
    var props = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.props);
    ['animation', 'component', 'componentProps', 'reverseDelay', 'attr', 'paused', 'reverse', 'repeat', 'yoyo', 'moment', 'resetStyleBool', 'updateReStart', 'forcedJudg'].forEach(function (key) {
      return delete props[key];
    });
    props.style = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.props.style);
    Object.keys(props.style).forEach(function (p) {
      if (p.match(/filter/i)) {
        ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
          props.style[prefix + 'Filter'] = props.style[p];
        });
      }
    });
    // component 为空时调用子级的。。
    if (!this.props.component) {
      if (!this.props.children) {
        return this.props.children;
      }
      var childrenProps = this.props.children.props;
      var style = childrenProps.style,
          className = childrenProps.className;
      // 合并 style 与 className。

      var newStyle = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, style, props.style);
      var newClassName = props.className ? props.className + ' ' + className : className;
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.cloneElement(this.props.children, { style: newStyle, className: newClassName });
    }
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(this.props.component, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, props, this.props.componentProps));
  };

  return TweenOne;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

TweenOne.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  componentProps: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  animation: objectOrArray,
  children: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  style: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  paused: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  reverse: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  reverseDelay: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number,
  yoyo: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  repeat: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number,
  moment: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number,
  attr: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  onChange: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  resetStyleBool: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  updateReStart: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  forcedJudg: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object
};
TweenOne.defaultProps = {
  component: 'div',
  componentProps: {},
  reverseDelay: 0,
  repeat: 0,
  attr: 'style',
  onChange: noop,
  updateReStart: true
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.setForcedJudg = function (props) {
    Object.keys(_this2.forced).forEach(function (key) {
      delete _this2[key];
      delete _this2.forced[key];
    });
    if (props.forcedJudg) {
      Object.keys(props.forcedJudg).forEach(function (key) {
        if (!_this2[key]) {
          _this2[key] = props.forcedJudg[key];
          _this2.forced[key] = 1;
        }
      });
    }
  };

  this.setDefalut = function (props) {
    _this2.moment = props.moment || 0;
    _this2.startMoment = props.moment || 0;
    _this2.startFrame = __WEBPACK_IMPORTED_MODULE_9__ticker__["a" /* default */].frame;
  };

  this.restart = function () {
    if (!_this2.tween) {
      return;
    }
    _this2.startMoment = _this2.moment;
    _this2.startFrame = __WEBPACK_IMPORTED_MODULE_9__ticker__["a" /* default */].frame;
    _this2.tween.reverse = _this2.reverse;
    _this2.tween.reverseStartTime = _this2.startMoment;
    _this2.play();
  };

  this.start = function () {
    _this2.updateAnim = false;
    var props = _this2.props;
    if (props.animation && Object.keys(props.animation).length) {
      _this2.tween = new __WEBPACK_IMPORTED_MODULE_8__Tween__["a" /* default */](_this2.dom, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["f" /* dataToArray */])(props.animation), { attr: props.attr });
      // 预先注册 raf, 初始动画数值。
      _this2.raf();
      // 开始动画
      _this2.play();
    }
  };

  this.play = function () {
    _this2.cancelRequestAnimationFrame();
    if (_this2.paused) {
      return;
    }
    _this2.rafID = __WEBPACK_IMPORTED_MODULE_9__ticker__["a" /* default */].add(_this2.raf);
  };

  this.frame = function () {
    var yoyo = _this2.props.yoyo;
    var repeat = _this2.props.repeat;

    var totalTime = repeat === -1 ? Number.MAX_VALUE : _this2.tween.totalTime * (repeat + 1);
    repeat = repeat >= 0 ? repeat : Number.MAX_VALUE;
    var moment = (__WEBPACK_IMPORTED_MODULE_9__ticker__["a" /* default */].frame - _this2.startFrame) * perFrame + _this2.startMoment;
    if (_this2.reverse) {
      moment = (_this2.startMoment || 0) - (__WEBPACK_IMPORTED_MODULE_9__ticker__["a" /* default */].frame - _this2.startFrame) * perFrame;
    }
    moment = moment > totalTime ? totalTime : moment;
    moment = moment <= 0 ? 0 : moment;
    var repeatNum = Math.floor(moment / _this2.tween.totalTime) || 0;
    repeatNum = repeatNum > repeat ? repeat : repeatNum;
    var tweenMoment = moment - _this2.tween.totalTime * repeatNum;
    tweenMoment = tweenMoment < perFrame ? 0 : tweenMoment;
    if (repeat && moment && moment - _this2.tween.totalTime * repeatNum < perFrame) {
      // 在重置样式之前补 complete；
      _this2.tween.frame(_this2.tween.totalTime * repeatNum);
    }
    if (moment < _this2.moment && !_this2.reverse || repeat !== 0 && repeatNum && tweenMoment <= perFrame) {
      // 在 form 状态下，暂停时拉 moment 时，start 有值，，往返方向播放时，在 delay 的时间没有处理。。
      // 与上面的处理一样，删除 start ，重新走一遍 start。。
      _this2.tween.resetAnimData();
      _this2.tween.resetDefaultStyle();
    }
    var yoyoReverse = yoyo && repeatNum % 2;
    if (yoyoReverse) {
      tweenMoment = _this2.tween.totalTime - tweenMoment;
    }
    _this2.tween.onChange = function (e) {
      var cb = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, e, {
        timelineMode: ''
      });
      if (!moment && !_this2.reverse || _this2.reverse && _this2.moment === _this2.startMoment) {
        cb.timelineMode = 'onTimelineStart';
      } else if (moment >= totalTime && !_this2.reverse || !moment && _this2.reverse) {
        cb.timelineMode = 'onTimelineComplete';
      } else if (repeatNum !== _this2.timelineRepeatNum) {
        cb.timelineMode = 'onTimelineRepeat';
      } else {
        cb.timelineMode = 'onTimelineUpdate';
      }
      _this2.props.onChange(cb);
    };
    _this2.tween.frame(tweenMoment);
    _this2.moment = moment;
    _this2.timelineRepeatNum = repeatNum;
  };

  this.raf = function () {
    var repeat = _this2.props.repeat;

    var totalTime = repeat === -1 ? Number.MAX_VALUE : _this2.tween.totalTime * (repeat + 1);
    _this2.frame();
    if (_this2.moment >= totalTime && !_this2.reverse || _this2.paused || _this2.reverse && _this2.moment === 0) {
      return _this2.cancelRequestAnimationFrame();
    }
    return null;
  };

  this.cancelRequestAnimationFrame = function () {
    __WEBPACK_IMPORTED_MODULE_9__ticker__["a" /* default */].clear(_this2.rafID);
    _this2.rafID = -1;
  };
};

TweenOne.isTweenOne = true;
/* harmony default export */ __webpack_exports__["a"] = (TweenOne);

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim_assets_index_less__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_scroll_anim__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_queue_anim__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__ = __webpack_require__(12);




// use jsx to render html, do not modify simple.html







var _package = __webpack_require__(51);
var ScrollOverPack = __WEBPACK_IMPORTED_MODULE_5_rc_scroll_anim__["a" /* default */].OverPack;
var Link = __WEBPACK_IMPORTED_MODULE_5_rc_scroll_anim__["a" /* default */].Link;

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).apply(this, arguments));

    _this.onFocus = function (e) {
      console.log(e, 'focus');
      _this.dom = e.target;
      _this.barAnimate();
    };

    _this.barAnimate = function () {
      if (!_this.dom) {
        return;
      }
      var bar = _this.refs.bar;
      bar.style.left = _this.dom.getBoundingClientRect().left + 'px';
    };

    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        { style: { height: '100vh', overflow: 'scroll' }, id: 'box' },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          { className: 'nav' },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'div',
            { className: 'logo' },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'p',
              null,
              'Ant Motion'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'div',
            { className: 'nav-wap' },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              Link,
              { className: 'nav-list', to: 'page0', showHeightActive: ['50%', '10%'],
                onFocus: this.onFocus,
                onBlur: this.onBlur,
                targetId: 'box'
              },
              'Example'
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              Link,
              { className: 'nav-list', to: 'page1', showHeightActive: ['10%', '60%'], toShowHeight: true,
                onFocus: this.onFocus,
                onBlur: this.onBlur,
                targetId: 'box'
              },
              'Example2'
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              Link,
              { className: 'nav-list', to: 'page2', showHeightActive: ['60%', '50%'], toShowHeight: true,
                onFocus: this.onFocus,
                onBlur: this.onBlur,
                targetId: 'box'
              },
              'Example3'
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { ref: 'bar', className: 'nav-bar' })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          { className: 'pack-page page0', id: 'page0' },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_8_rc_queue_anim__["a" /* default */],
            { className: 'home-title' },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'div',
              { className: 'page-title', key: 'title' },
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                'p',
                null,
                _package.name,
                '@',
                _package.version
              )
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'div',
              { className: 'page-description', key: 'c' },
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                'p',
                null,
                'The simple demo'
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          ScrollOverPack,
          {
            id: 'page1',
            className: 'page1',
            replay: true,
            targetId: 'box'
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["a" /* default */],
            { className: 'tween-one', key: '0', animation: { opacity: 1 } },
            '\u9ED8\u8BA4\u8FDB\u5165\u4E0E\u51FA\u573A, \u9876\u90E8\u51FA\u573A'
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_8_rc_queue_anim__["a" /* default */],
            { key: '1' },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { key: '0', className: 'demo' }),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { key: '1', className: 'demo', style: { backgroundColor: '#F38EAD' } }),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { key: '2', className: 'demo' }),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { key: '3', className: 'demo' })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          ScrollOverPack,
          {
            id: 'page2',
            className: 'page1',
            appear: false,
            style: { backgroundColor: '#0098CE' },
            targetId: 'box'
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["a" /* default */],
            { className: 'tween-one', key: '0', animation: { opacity: 1 } },
            '\u9ED8\u8BA4\u51FA\u573A\u76F4\u63A5\u51FA\u73B0'
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_8_rc_queue_anim__["a" /* default */],
            { key: '1' },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { key: '0', className: 'demo' }),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { key: '1', className: 'demo', style: { backgroundColor: '#F38EAD' } }),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { key: '2', className: 'demo' }),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', { key: '3', className: 'demo' })
          )
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tween_functions__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tween_functions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tween_functions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(5);



__WEBPACK_IMPORTED_MODULE_0_tween_functions___default.a.path = function (_path, _param) {
  var param = _param || {};
  if (typeof window === 'undefined') {
    return 'linear';
  }
  var pathNode = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* parsePath */])(_path);
  var pathLength = pathNode.getTotalLength();
  var rect = param.rect || 100; // path 的大小，100 * 100，
  var lengthPixel = param.lengthPixel || 200; // 线上取点像素，默认分为 200 段。。
  var points = [];
  for (var i = 0; i < lengthPixel - 1; i++) {
    points.push(pathNode.getPointAtLength(pathLength / (lengthPixel - 1) * i));
  }
  points.push(pathNode.getPointAtLength(lengthPixel));
  return function path(t, b, _c, d) {
    var p = __WEBPACK_IMPORTED_MODULE_0_tween_functions___default.a.linear(t, b, _c, d);
    var timePointX = rect * p; // X 轴的百分比;
    // 取出 x 轴百分比上的点;
    var point = points.filter(function (item) {
      return item.x >= timePointX;
    })[0] || pathNode.getPointAtLength(p * pathLength);
    return 1 - point.y / rect;
  };
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_tween_functions___default.a);

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TweenOneGroup */
/* unused harmony export easing */
/* unused harmony export plugins */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ticker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TweenOne__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TweenOneGroup__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__easing__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ticker__ = __webpack_require__(13);
// export this package's api






__WEBPACK_IMPORTED_MODULE_0__TweenOne__["a" /* default */].TweenOneGroup = __WEBPACK_IMPORTED_MODULE_1__TweenOneGroup__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__TweenOne__["a" /* default */].easing = __WEBPACK_IMPORTED_MODULE_2__easing__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__TweenOne__["a" /* default */].plugins = __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0__TweenOne__["a" /* default */].ticker = __WEBPACK_IMPORTED_MODULE_4__ticker__["a" /* default */];

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__TweenOne__["a" /* default */]);

var TweenOneGroup = __WEBPACK_IMPORTED_MODULE_1__TweenOneGroup__["a" /* default */];

var easing = __WEBPACK_IMPORTED_MODULE_2__easing__["a" /* default */];

var plugins = __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */];

var ticker = __WEBPACK_IMPORTED_MODULE_4__ticker__["a" /* default */];

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_raf__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_raf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_raf__);
/* eslint-disable func-names */


var getTime = Date.now || function () {
  return new Date().getTime();
};
var Ticker = function Ticker() {};
Ticker.prototype = {
  tickFnArray: [],
  tickKeyObject: {},
  id: -1,
  tweenId: 0,
  frame: 0,
  perFrame: Math.round(1000 / 60),
  elapsed: 0,
  lastUpdate: getTime()
};
var p = Ticker.prototype;
p.add = function (fn) {
  var key = 'TweenOneTicker' + this.tweenId;
  this.tweenId++;
  this.wake(key, fn);
  return key;
};
p.wake = function (key, fn) {
  var _this = this;

  this.tickKeyObject[key] = fn;
  this.tickFnArray = Object.keys(this.tickKeyObject).map(function (k) {
    return _this.tickKeyObject[k];
  });
  if (this.id === -1) {
    this.id = __WEBPACK_IMPORTED_MODULE_0_raf___default()(this.tick);
  }
};
p.clear = function (key) {
  var _this2 = this;

  delete this.tickKeyObject[key];
  this.tickFnArray = Object.keys(this.tickKeyObject).map(function (k) {
    return _this2.tickKeyObject[k];
  });
};
p.sleep = function () {
  __WEBPACK_IMPORTED_MODULE_0_raf___default.a.cancel(this.id);
  this.id = -1;
  this.frame = 0;
};
var ticker = new Ticker();
p.tick = function (a) {
  ticker.elapsed = getTime() - ticker.lastUpdate;
  ticker.lastUpdate += ticker.elapsed;
  ticker.tickFnArray.forEach(function (func) {
    return func(a);
  });
  // 如果 object 里没对象了，自动杀掉；
  if (!ticker.tickFnArray.length) {
    ticker.sleep();
    return;
  }
  if (!ticker.frame) {
    ticker.frame++;
  } else {
    ticker.frame += Math.round(ticker.elapsed / ticker.perFrame);
  }
  ticker.id = __WEBPACK_IMPORTED_MODULE_0_raf___default()(ticker.tick);
};
var timeoutIdNumber = 0;
p.timeout = function (fn, time) {
  var _this3 = this;

  if (!(typeof fn === 'function')) {
    return console.warn('not function'); // eslint-disable-line
  }
  var timeoutID = 'timeout' + Date.now() + '-' + timeoutIdNumber;
  var startFrame = this.frame;
  this.wake(timeoutID, function () {
    var moment = (_this3.frame - startFrame) * _this3.perFrame;
    if (moment >= (time || 0)) {
      _this3.clear(timeoutID);
      fn();
    }
  });
  timeoutIdNumber++;
  return timeoutID;
};
var intervalIdNumber = 0;
p.interval = function (fn, time) {
  var _this4 = this;

  if (!(typeof fn === 'function')) {
    console.warn('not function'); // eslint-disable-line
    return null;
  }
  var intervalID = 'interval' + Date.now() + '-' + intervalIdNumber;
  var starFrame = this.frame;
  this.wake(intervalID, function () {
    var moment = (_this4.frame - starFrame) * _this4.perFrame;
    if (moment >= (time || 0)) {
      starFrame = _this4.frame;
      fn();
    }
  });
  intervalIdNumber++;
  return intervalID;
};
/* harmony default export */ __webpack_exports__["a"] = (ticker);

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(104);


/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_tween_one__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__animTypes__ = __webpack_require__(20);












var noop = function noop() {};

var typeDefault = ['displayName', 'propTypes', 'getDefaultProps', 'defaultProps', 'childContextTypes', 'contextTypes'];

var QueueAnim = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(QueueAnim, _React$Component);

  function QueueAnim(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, QueueAnim);

    /**
     * @param oneEnter
     * 记录第一次进入;
     */
    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    _this.oneEnter = false;
    /**
     * @param tweenToEnter;
     * 记录强制切换时是否需要添加 animation;
     * 如 enter 后, leave -> enter，样式是没有发生变化，就不需要添加 animation 属性。
     */
    _this.tweenToEnter = {};
    /**
     * @param leaveUnfinishedChild;
     * 记录多次切换，出场没完成动画的 key。
     */
    _this.leaveUnfinishedChild = [];
    /**
     * @param saveTweenOneTag;
     * 记录 TweenOne 标签，在 leaveUnfinishedChild 里使用，残留的元素不需要考虑 props 的变更。
     */
    _this.saveTweenOneTag = {};
    /**
     * @param unwantedStart;
     * 记录 animation 里是否需要 startAnim;
     * 修复进场时, 时间不准的问题；
     * -> 进: 需要；
     * -> 进 -> 进: 需要；
     * -> 进 -> 出: 不需要;
     * -> 进 -> 出 -> 进: 不需要;
     */
    _this.unwantedStart = {};
    /**
     * @param keysToEnter;
     * 记录进场的 key;
     */
    _this.keysToEnter = [];
    /**
     * @param keysToLeave;
     * 记录出场的 key;
     */
    _this.keysToLeave = [];
    /**
     * @param keysToEnterPaused;
     * 记录在进入时是否处理暂停状态
     */
    _this.keysToEnterPaused = {};
    /**
     * @param placeholderTimeoutIds;
     * 进场时 deley 的 timeout 记录;
     */
    _this.placeholderTimeoutIds = {};
    // 第一次进入，默认进场
    var children = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["a" /* toArrayChildren */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["b" /* getChildrenFromProps */])(props));
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
    _this.keysToEnterToCallback = [].concat(_this.keysToEnter);
    _this.originalChildren = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["a" /* toArrayChildren */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["b" /* getChildrenFromProps */])(props));
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
    this.oneEnter = true;
  };

  QueueAnim.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var nextChildren = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["a" /* toArrayChildren */])(nextProps.children).filter(function (item) {
      return item;
    });
    var currentChildren = this.originalChildren.filter(function (item) {
      return item;
    });
    if (this.state.children.length) {
      /**
       * 多次刷新处理
       * 如果 state.children 里还有元素，元素还在动画，当前子级加回在出场的子级;
       */
      var leaveChild = this.state.children.filter(function (item) {
        return item && _this2.keysToLeave.indexOf(item.key) >= 0;
      });
      this.leaveUnfinishedChild = leaveChild.map(function (item) {
        return item.key;
      });
      /**
       * 获取 leaveChild 在 state.children 里的序列，再将 leaveChild 和 currentChildren 的重新排序。
       * 避逸 state.children 在 leaveComplete 里没全部完成不触发，
       * leaveComplete 里如果动画完成了是会删除 keyToLeave，但 state.children 是在全部出场后才触发清除，
       * 所以这里需要处理出场完成的元素做清除。
       */
      var stateChildrens = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["c" /* mergeChildren */])(currentChildren, this.state.children);
      var currentChild = [];
      var childReOrder = function childReOrder(child) {
        child.forEach(function (item) {
          var order = stateChildrens.indexOf(item);
          // -1 不应该出现的情况，直接插入数组后面.
          if (order === -1) {
            currentChild.push(item);
          } else {
            currentChild.splice(order, 0, item);
          }
        });
      };
      childReOrder(leaveChild);
      childReOrder(currentChildren);
      currentChildren = currentChild.filter(function (c) {
        return c;
      });
    }
    var newChildren = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["c" /* mergeChildren */])(currentChildren, nextChildren);

    var childrenShow = !newChildren.length ? {} : this.state.childrenShow;
    this.keysToEnterPaused = {};
    var emptyBool = !nextChildren.length && !currentChildren.length && this.state.children.length;
    /**
     * 在出场没结束时，childrenShow 里的值将不会清除。
     * 再触发进场时， childrenShow 里的值是保留着的, 设置了 forcedReplay 将重新播放进场。
     */
    if (!emptyBool) {
      // 空子级状态下刷新不做处理
      var nextKeys = nextChildren.map(function (c) {
        return c.key;
      });
      this.keysToLeave.forEach(function (key) {
        // 将所有在出场里的停止掉。避免间隔性出现
        if (nextKeys.indexOf(key) >= 0) {
          _this2.keysToEnterPaused[key] = true;
          currentChildren = currentChildren.filter(function (item) {
            return item.key !== key;
          });
          if (nextProps.forcedReplay) {
            // 清掉所有出场的。
            delete childrenShow[key];
          }
        }
      });
    }

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
      var hasPrev = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["d" /* findChildInChildrenByKey */])(currentChildren, key);
      if (!hasPrev && key) {
        _this2.keysToEnter.push(key);
      }
    });

    currentChildren.forEach(function (c) {
      if (!c) {
        return;
      }
      var key = c.key;
      var hasNext = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["d" /* findChildInChildrenByKey */])(nextChildren, key);
      if (!hasNext && key) {
        _this2.keysToLeave.push(key);
      }
    });
    this.keysToEnterToCallback = [].concat(this.keysToEnter);
  };

  QueueAnim.prototype.componentDidUpdate = function componentDidUpdate() {
    this.originalChildren = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["a" /* toArrayChildren */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["b" /* getChildrenFromProps */])(this.props));
    var keysToEnter = [].concat(this.keysToEnter);
    var keysToLeave = [].concat(this.keysToLeave);
    keysToEnter.forEach(this.performEnter);
    keysToLeave.forEach(this.performLeave);
  };

  QueueAnim.prototype.componentWillUnmount = function componentWillUnmount() {
    var _this3 = this;

    Object.keys(this.placeholderTimeoutIds).forEach(function (key) {
      __WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["b" /* ticker */].clear(_this3.placeholderTimeoutIds[key]);
    });
    this.keysToEnter = [];
    this.keysToLeave = [];
  };

  QueueAnim.prototype.getTweenType = function getTweenType(type, num) {
    var data = __WEBPACK_IMPORTED_MODULE_9__animTypes__["a" /* default */][type];
    return this.getTweenAnimConfig(data, num);
  };

  QueueAnim.prototype.getTweenAnimConfig = function getTweenAnimConfig(data, num, enterOrLeave) {
    var _this4 = this;

    if (Array.isArray(data)) {
      return data.map(function (item) {
        return _this4.getTweenSingleConfig(item, num, enterOrLeave);
      });
    }
    return this.getTweenSingleConfig(data, num, enterOrLeave);
  };

  QueueAnim.prototype.render = function render() {
    var tagProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(this.props, []);

    ['component', 'componentProps', 'interval', 'duration', 'delay', 'type', 'animConfig', 'ease', 'leaveReverse', 'animatingClassName', 'forcedReplay', 'onEnd', 'appear'].forEach(function (key) {
      return delete tagProps[key];
    });
    var childrenToRender = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["a" /* toArrayChildren */])(this.state.children).map(this.getChildrenToRender);
    var props = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, tagProps, this.props.componentProps);
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_react__["createElement"])(this.props.component, props, childrenToRender);
  };

  return QueueAnim;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

QueueAnim.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  component: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  componentProps: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
  interval: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  duration: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  delay: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  type: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  animConfig: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  ease: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  leaveReverse: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  forcedReplay: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  animatingClassName: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.array,
  onEnd: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  appear: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool
};
QueueAnim.defaultProps = {
  component: 'div',
  componentProps: {},
  interval: 100,
  duration: 450,
  delay: 0,
  type: 'right',
  animConfig: null,
  ease: 'easeOutQuart',
  leaveReverse: false,
  forcedReplay: false,
  animatingClassName: ['queue-anim-entering', 'queue-anim-leaving'],
  onEnd: noop,
  appear: true
};

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.getTweenSingleConfig = function (data, num, enterOrLeave) {
    var obj = {};
    Object.keys(data).forEach(function (key) {
      if (Array.isArray(data[key])) {
        obj[key] = data[key][num];
      } else if (!enterOrLeave && !num || enterOrLeave && num) {
        obj[key] = data[key];
      }
    });
    return obj;
  };

  this.getTweenData = function (key, i, type) {
    var props = _this5.props;
    var enterOrLeave = type === 'enter' ? 0 : 1;
    var start = type === 'enter' ? 1 : 0;
    var end = type === 'enter' ? 0 : 1;
    var startAnim = _this5.getAnimData(props, key, i, enterOrLeave, start);
    var animate = _this5.getAnimData(props, key, i, enterOrLeave, end);
    startAnim = type === 'enter' && (props.forcedReplay || !_this5.unwantedStart[key]) ? startAnim : null;
    var ease = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(props.ease, key, i)[enterOrLeave];
    var duration = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(props.duration, key, i)[enterOrLeave];
    if (Array.isArray(ease)) {
      ease = ease.map(function (num) {
        return num * 100;
      });
      ease = __WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["a" /* default */].easing.path('M0,100C' + ease[0] + ',' + (100 - ease[1]) + ',' + ease[2] + ',' + (100 - ease[3]) + ',100,0', { lengthPixel: duration / 16.6667 });
    }
    return { startAnim: startAnim, animate: animate, ease: ease, duration: duration, isArray: Array.isArray(animate) };
  };

  this.getTweenSingleData = function (key, startAnim, animate, ease, duration, delay, onStart, onComplete) {
    var startLength = Object.keys(startAnim || {}).length;
    var animation = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
      onStart: onStart,
      onComplete: onComplete,
      duration: duration,
      delay: delay,
      ease: ease
    }, animate);
    var startAnimate = startLength ? __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ duration: 0 }, startAnim) : null;
    return { animation: animation, startAnimate: startAnimate };
  };

  this.getTweenEnterOrLeaveData = function (key, i, delay, type) {
    var animateData = _this5.getTweenData(key, i, type);
    var startAnim = animateData.startAnim;
    var animate = animateData.animate;
    var onStart = (type === 'enter' ? _this5.enterBegin : _this5.leaveBegin).bind(_this5, key);
    var onComplete = (type === 'enter' ? _this5.enterComplete : _this5.leaveComplete).bind(_this5, key);
    if (animateData.isArray) {
      var length = animate.length - 1;
      var animation = [];
      var startArray = [];
      animate.forEach(function (leave, ii) {
        var start = startAnim && startAnim[ii];
        var animObj = _this5.getTweenSingleData(key, start, leave, animateData.ease, animateData.duration / length, !ii ? delay : 0, !ii ? onStart : null, ii === length ? onComplete : null);
        animation.push(animObj.animation);
        if (animObj.startAnimate) {
          startArray.push(animObj.startAnimate);
        }
      });
      return startArray.concat(animation);
    }
    animateData = _this5.getTweenSingleData(key, startAnim, animate, animateData.ease, animateData.duration, delay, onStart, onComplete);
    return [animateData.startAnimate, animateData.animation].filter(function (item) {
      return item;
    });
  };

  this.getTweenAppearData = function (key, i) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, _this5.getAnimData(_this5.props, key, i, 0, 0), {
      duration: 0
    });
  };

  this.getAnimData = function (props, key, i, enterOrLeave, startOrEnd) {
    /**
     * transformArguments 第一个为 enter, 第二个为 leave；
     * getTweenAnimConfig or getTweenType 第一个为到达的位置， 第二个为开始的位置。
     * 用 tween-one 的数组来实现老的动画逻辑。。。
     */
    return props.animConfig ? _this5.getTweenAnimConfig(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(props.animConfig, key, i)[enterOrLeave], startOrEnd, enterOrLeave) : _this5.getTweenType(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(props.type, key, i)[enterOrLeave], startOrEnd);
  };

  this.getChildrenToRender = function (child) {
    var _props = _this5.props,
        forcedReplay = _props.forcedReplay,
        leaveReverse = _props.leaveReverse,
        appear = _props.appear,
        delay = _props.delay,
        interval = _props.interval;

    if (!child || !child.key) {
      return child;
    }
    var key = child.key;
    if (!_this5.state.childrenShow[key]) {
      return null;
    }
    var i = _this5.keysToLeave.indexOf(key);
    var animation = void 0;
    var isFunc = typeof child.type === 'function';
    var forcedJudg = isFunc ? {} : null;
    if (isFunc) {
      Object.keys(child.type).forEach(function (name) {
        if (typeDefault.indexOf(name) === -1) {
          forcedJudg[name] = child.type[name];
        }
      });
    }
    // 处理出场
    if (i >= 0) {
      if (_this5.leaveUnfinishedChild.indexOf(key) >= 0) {
        return _this5.saveTweenOneTag[key];
      }
      var $interval = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(interval, key, i)[1];
      var $delay = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(delay, key, i)[1];
      // 减掉 leaveUnfinishedChild 里的个数，因为 leaveUnfinishedChild 是旧的出场，不应该计录在队列里。
      var order = (leaveReverse ? _this5.keysToLeave.length - i - 1 : i) - _this5.leaveUnfinishedChild.length;
      $delay = $interval * order + $delay;
      animation = _this5.getTweenEnterOrLeaveData(key, i, $delay, 'leave');
    } else {
      // 处理进场;
      i = _this5.keysToEnterToCallback.indexOf(key);
      if (!_this5.oneEnter && !appear) {
        animation = _this5.getTweenAppearData(key, i);
      } else {
        animation = _this5.getTweenEnterOrLeaveData(key, i, 0, 'enter');
      }
      if (_this5.tweenToEnter[key] && !forcedReplay) {
        // 如果是已进入的，将直接返回标签。。
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["a" /* default */], { key: key, component: child.type, forcedJudg: forcedJudg, componentProps: child.props });
      }
    }
    var paused = _this5.keysToEnterPaused[key] && !_this5.keysToLeave.indexOf(key) >= 0;
    animation = paused ? null : animation;
    var tag = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["a" /* default */], { key: key, component: child.type, id: key, forcedJudg: forcedJudg, componentProps: child.props, animation: animation });
    _this5.saveTweenOneTag[key] = tag;
    return tag;
  };

  this.performEnter = function (key, i) {
    var interval = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(_this5.props.interval, key, i)[0];
    var delay = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["e" /* transformArguments */])(_this5.props.delay, key, i)[0];
    _this5.placeholderTimeoutIds[key] = __WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["b" /* ticker */].timeout(_this5.performEnterBegin.bind(_this5, key), interval * i + delay);
    if (_this5.keysToEnter.indexOf(key) >= 0) {
      _this5.keysToEnter.splice(_this5.keysToEnter.indexOf(key), 1);
    }
  };

  this.performEnterBegin = function (key) {
    var childrenShow = _this5.state.childrenShow;
    childrenShow[key] = true;
    delete _this5.keysToEnterPaused[key];
    __WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["b" /* ticker */].clear(_this5.placeholderTimeoutIds[key]);
    delete _this5.placeholderTimeoutIds[key];
    _this5.setState({ childrenShow: childrenShow });
  };

  this.performLeave = function (key) {
    __WEBPACK_IMPORTED_MODULE_7_rc_tween_one__["b" /* ticker */].clear(_this5.placeholderTimeoutIds[key]);
    delete _this5.placeholderTimeoutIds[key];
  };

  this.enterBegin = function (key, e) {
    var elem = e.target;
    var animatingClassName = _this5.props.animatingClassName;
    elem.className = elem.className.replace(animatingClassName[1], '');
    if (elem.className.indexOf(animatingClassName[0]) === -1) {
      elem.className = (elem.className + ' ' + animatingClassName[0]).trim();
    }
  };

  this.enterComplete = function (key, e) {
    if (_this5.keysToEnterPaused[key] || _this5.keysToLeave.indexOf(key) >= 0) {
      return;
    }
    var elem = e.target;
    elem.className = elem.className.replace(_this5.props.animatingClassName[0], '').trim();
    _this5.tweenToEnter[key] = true;
    _this5.unwantedStart[key] = true;
    _this5.props.onEnd({ key: key, type: 'enter' });
  };

  this.leaveBegin = function (key, e) {
    var elem = e.target;
    var animatingClassName = _this5.props.animatingClassName;
    elem.className = elem.className.replace(animatingClassName[0], '');
    if (elem.className.indexOf(animatingClassName[1]) === -1) {
      elem.className = (elem.className + ' ' + animatingClassName[1]).trim();
    }
    _this5.unwantedStart[key] = true;
    delete _this5.tweenToEnter[key];
  };

  this.leaveComplete = function (key, e) {
    // 切换时同时触发 onComplete。 手动跳出。。。
    if (_this5.keysToEnterToCallback.indexOf(key) >= 0) {
      return;
    }
    var childrenShow = _this5.state.childrenShow;
    delete childrenShow[key];
    delete _this5.saveTweenOneTag[key];
    delete _this5.unwantedStart[key];
    if (_this5.keysToLeave.indexOf(key) >= 0) {
      _this5.keysToLeave.splice(_this5.keysToLeave.indexOf(key), 1);
    }
    var needLeave = _this5.keysToLeave.some(function (c) {
      return childrenShow[c];
    });
    if (!needLeave) {
      var currentChildren = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["a" /* toArrayChildren */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils__["b" /* getChildrenFromProps */])(_this5.props));
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

QueueAnim.isQueueAnim = true;
/* harmony default export */ __webpack_exports__["a"] = (QueueAnim);

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
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
});

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QueueAnim__ = __webpack_require__(19);
// export this package's api


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__QueueAnim__["a" /* default */]);

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = toArrayChildren;
/* harmony export (immutable) */ __webpack_exports__["d"] = findChildInChildrenByKey;
/* harmony export (immutable) */ __webpack_exports__["c"] = mergeChildren;
/* harmony export (immutable) */ __webpack_exports__["e"] = transformArguments;
/* harmony export (immutable) */ __webpack_exports__["b"] = getChildrenFromProps;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* eslint no-prototype-builtins: 0 */


function toArrayChildren(children) {
  var ret = [];
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(children, function (c) {
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
  if (Array.isArray(result)) {
    if (result.length === 2) {
      return result;
    }
    return [result[0], result[0]];
  }
  return [result, result];
}

function getChildrenFromProps(props) {
  return props && props.children;
}

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_style_utils__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_style_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_style_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__easing__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__plugin_StylePlugin__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_js__ = __webpack_require__(5);

/* eslint-disable func-names */
/**
 * Created by jljsj on 16/1/27.
 */







var DEFAULT_EASING = 'easeInOutQuad';
var DEFAULT_DURATION = 450;
var DEFAULT_DELAY = 0;
function noop() {}
__WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */].push(__WEBPACK_IMPORTED_MODULE_4__plugin_StylePlugin__["a" /* default */]);
// 设置默认数据
function defaultData(vars, now) {
  return {
    duration: vars.duration || vars.duration === 0 ? vars.duration : DEFAULT_DURATION,
    delay: vars.delay || DEFAULT_DELAY,
    ease: typeof vars.ease === 'function' ? vars.ease : __WEBPACK_IMPORTED_MODULE_2__easing__["a" /* default */][vars.ease || DEFAULT_EASING],
    onUpdate: vars.onUpdate || noop,
    onComplete: vars.onComplete || noop,
    onStart: vars.onStart || noop,
    onRepeat: vars.onRepeat || noop,
    repeat: vars.repeat || 0,
    repeatDelay: vars.repeatDelay || 0,
    yoyo: vars.yoyo || false,
    type: vars.type || 'to',
    initTime: now,
    appearTo: typeof vars.appearTo === 'number' ? vars.appearTo : null,
    perTime: 0,
    currentRepeat: 0
  };
}

var Tween = function Tween(target, toData, props) {
  this.target = target;
  this.attr = props.attr || 'style';
  // 时间精度补齐；
  this.accuracy = 0.00001;
  // 记录总时间;
  this.totalTime = 0;
  // 记录当前时间;
  this.progressTime = 0;
  // 记录时间轴数据;
  this.defaultData = [];
  // 每个的开始数据；
  this.start = {};
  // 开始默认的数据；
  this.startDefaultData = {};
  // 动画过程
  this.tween = {};
  // toData;
  this.data = toData;
  // 每帧的时间;
  this.perFrame = Math.round(1000 / 60);
  // 注册，第一次进入执行注册
  this.register = false;
  // svg元素
  this.isSvg = this.target.ownerSVGElement;
  // 设置 style
  var data = this.setAttrIsStyle();
  // 设置默认动画数据;
  this.setDefaultData(data);
};
var p = Tween.prototype;
p.setAttrIsStyle = function () {
  var _this = this;

  var data = [];
  this.data.forEach(function (d, i) {
    var _d = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, d);
    if (_this.attr === 'style') {
      data[i] = {};
      Object.keys(_d).forEach(function (key) {
        if (key in defaultData({}, 0)) {
          data[i][key] = _d[key];
          delete _d[key];
        }
      });
      data[i].style = _d;
      _this.startDefaultData.style = _this.target.getAttribute('style');
    } else if (_this.attr === 'attr') {
      Object.keys(_d).forEach(function (key) {
        if (key === 'style' && Array.isArray(d[key])) {
          throw new Error('Style should be the object.');
        }
        if (key === 'bezier') {
          _d.style = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, _d.style, { bezier: _d[key] });
          delete _d[key];
          _this.startDefaultData.style = _this.target.getAttribute('style');
        } else {
          _this.startDefaultData[key] = _this.target.getAttribute(key);
        }
      });
      data[i] = _d;
    }
  });
  return data;
};
p.setDefaultData = function (_vars) {
  var _this2 = this;

  var now = 0;
  var repeatMax = false;
  var data = _vars.map(function (item) {
    var appearToBool = typeof item.appearTo === 'number';
    // 加上延时，在没有播放过时；
    if (!appearToBool) {
      now += item.delay || 0;
    }
    var appearToTime = (item.appearTo || 0) + (item.delay || 0);
    // 获取默认数据
    var tweenData = defaultData(item, appearToBool ? appearToTime : now);
    tweenData.vars = {};
    Object.keys(item).forEach(function (_key) {
      if (!(_key in tweenData)) {
        var _data = item[_key];
        if (_key in __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */]) {
          tweenData.vars[_key] = new __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */][_key](_this2.target, _data, tweenData.type);
        } else if (_key.match(/color/i) || _key === 'stroke' || _key === 'fill') {
          tweenData.vars[_key] = { type: 'color', vars: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["parseColor"])(_data) };
        } else if (typeof _data === 'number' || _data.split(/[,|\s]/g).length <= 1) {
          var vars = parseFloat(_data);
          var unit = _data.toString().replace(/[^a-z|%]/g, '');
          var count = _data.toString().replace(/[^+|=|-]/g, '');
          tweenData.vars[_key] = { unit: unit, vars: vars, count: count };
        } else if ((_key === 'd' || _key === 'points') && 'SVGMorph' in __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */]) {
          tweenData.vars[_key] = new __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */].SVGMorph(_this2.target, _data, _key);
        }
      }
    });
    if (tweenData.yoyo && !tweenData.repeat) {
      console.warn('Warning: yoyo must be used together with repeat;'); // eslint-disable-line
    }
    if (tweenData.repeat === -1) {
      repeatMax = true;
    }
    var repeat = tweenData.repeat === -1 ? 0 : tweenData.repeat;
    if (appearToBool) {
      // 如果有 appearTo 且这条时间比 now 大时，，总时间用这条；
      var appearNow = item.appearTo + (item.delay || 0) + tweenData.duration * (repeat + 1) + tweenData.repeatDelay * repeat;
      now = appearNow >= now ? appearNow : now;
    } else if (tweenData.delay < -tweenData.duration) {
      // 如果延时小于 负时间时,,不加,再减回延时;
      now -= tweenData.delay;
    } else {
      // repeat 为 -1 只记录一次。不能跟 reverse 同时使用;
      now += tweenData.duration * (repeat + 1) + tweenData.repeatDelay * repeat;
    }
    tweenData.mode = '';
    return tweenData;
  });
  this.totalTime = repeatMax ? Number.MAX_VALUE : now;
  this.defaultData = data;
};
p.getComputedStyle = function () {
  var style = typeof window !== 'undefined' && document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
  // 如果是 SVG, 样式全部提出为 transformSVG, 兼容 safari 不能获取 transform;
  if (this.isSvg) {
    var transform = style[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["checkStyleName"])('transform')] || 'none';
    if (transform === 'none') {
      var attrStyle = this.target.getAttribute('style');
      if (attrStyle && attrStyle.indexOf('transform:') >= 0) {
        transform = attrStyle.split(';').filter(function (k) {
          return k.indexOf('transform:') >= 0;
        }).map(function (item) {
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["createMatrix"])(item.split(':')[1].trim()).toString();
        })[0];
      } else if (this.target.getAttribute('transform')) {
        // 暂时不支持标签上的 transform，后期增加;
        console.warn('Do not add transform on the label, otherwise it will be invalid.'); // eslint-disable-line no-console
      }
    }
    style.transformSVG = transform;
  }
  return style;
};
p.getAnimStartData = function (item) {
  var _this3 = this;

  var start = {};
  this.computedStyle = this.computedStyle || this.getComputedStyle();
  Object.keys(item).forEach(function (_key) {
    if (_key in __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */] || _this3.attr === 'attr' && (_key === 'd' || _key === 'points')) {
      start[_key] = item[_key].getAnimStart(_this3.computedStyle, _this3.isSvg);
      return;
    }
    if (_this3.attr === 'attr') {
      // 除了d和这points外的标签动画；
      var attribute = _this3.target.getAttribute(_key);
      var data = attribute === 'null' || !attribute ? 0 : attribute;
      if (_key.match(/color/i) || _key === 'stroke' || _key === 'fill') {
        data = !data && _key === 'stroke' ? 'rgba(255, 255, 255, 0)' : data;
        data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["parseColor"])(data);
        start[_key] = data;
      } else if (parseFloat(data) || parseFloat(data) === 0 || data === 0) {
        var unit = data.toString().replace(/[^a-z|%]/g, '');
        start[_key] = unit !== item[_key].unit ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util_js__["i" /* startConvertToEndUnit */])(_this3.target, _key, parseFloat(data), unit, item[_key].unit) : parseFloat(data);
      }
      return;
    }
    start[_key] = _this3.target[_key] || 0;
  });
  return start;
};
p.setAnimData = function (data) {
  var _this4 = this;

  Object.keys(data).forEach(function (key) {
    if (key in __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */] || _this4.attr === 'attr' && (key === 'd' || key === 'points')) {
      return;
    }
    _this4.target[key] = data[key];
  });
};
p.setRatio = function (ratio, endData, i) {
  var _this5 = this;

  Object.keys(endData.vars).forEach(function (_key) {
    if (_key in __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */] || _this5.attr === 'attr' && (_key === 'd' || _key === 'points')) {
      endData.vars[_key].setRatio(ratio, _this5.tween, _this5.isSvg && _this5.computedStyle);
      return;
    }
    var endVars = endData.vars[_key];
    var startVars = _this5.start[i][_key];
    var data = void 0;
    if (_this5.attr === 'attr') {
      // 除了d和这points外的标签动画；
      if (!endVars.type) {
        data = endVars.unit.charAt(1) === '=' ? startVars + endVars.vars * ratio + endVars.unit : (endVars.vars - startVars) * ratio + startVars + endVars.unit;
        _this5.target.setAttribute(_key, data);
      } else if (endVars.type === 'color') {
        if (endVars.vars.length === 3 && startVars.length === 4) {
          endVars.vars[3] = 1;
        }
        data = endVars.vars.map(function (_endData, _i) {
          var startData = startVars[_i] || 0;
          return (_endData - startData) * ratio + startData;
        });
        _this5.target.setAttribute(_key, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["getColor"])(data));
      }
    }
  });
  this.setAnimData(this.tween);
};
p.render = function () {
  var _this6 = this;

  var reverse = this.reverse;
  this.defaultData.forEach(function (item, i) {
    var initTime = item.initTime;
    var duration = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["toFixed"])(item.duration);
    // 处理 yoyo 和 repeat; yoyo 是在时间轴上的, 并不是倒放
    var repeatNum = Math.ceil((_this6.progressTime - initTime) / (duration + item.repeatDelay)) - 1 || 0;
    repeatNum = repeatNum < 0 ? 0 : repeatNum;
    if (item.repeat) {
      if (item.repeat < repeatNum && item.repeat !== -1) {
        return;
      }
      if (item.repeat || item.repeat <= repeatNum) {
        initTime += repeatNum * (duration + item.repeatDelay);
      }
    }
    var startData = item.yoyo && repeatNum % 2 ? 1 : 0;
    var endData = item.yoyo && repeatNum % 2 ? 0 : 1;
    startData = item.type === 'from' ? 1 - startData : startData;
    endData = item.type === 'from' ? 1 - endData : endData;
    //  精度损失，只取小数点后10位。
    var progressTime = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["toFixed"])(_this6.progressTime - initTime);

    var ratio = void 0;

    // 开始注册;
    // from 时需先执行参数位置;
    var fromDelay = item.type === 'from' ? item.delay : 0;
    if (progressTime + fromDelay >= 0) {
      if (!_this6.start[i]) {
        // 设置 start
        _this6.start[i] = _this6.getAnimStartData(item.vars);
        if (progressTime < _this6.perFrame) {
          ratio = !item.duration && !item.delay ? item.ease(1, startData, endData, 1) : item.ease(0, startData, endData, 1);
          _this6.setRatio(ratio, item, i);
        } else if (progressTime > duration) {
          ratio = item.ease(1, startData, endData, 1);
          _this6.setRatio(ratio, item, i);
        }
        if (!_this6.register) {
          _this6.register = true;
          if (progressTime === 0 && item.duration) {
            return;
          }
        }
      }
    }

    var e = {
      index: i,
      target: _this6.target
    };
    var cb = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
      moment: _this6.progressTime
    }, e);
    if (progressTime >= 0 && !(progressTime > duration && item.mode === 'onComplete') && _this6.start[i]) {
      var updateAnim = _this6.updateAnim === 'update';
      progressTime = progressTime < _this6.perFrame - _this6.accuracy ? 0 : progressTime;
      if ((progressTime >= duration - _this6.accuracy && !reverse || reverse && progressTime <= 0) && repeatNum >= item.repeat) {
        // onReveresComplete 和 onComplete 统一用 onComplete;
        ratio = item.ease(reverse ? 0 : 1, startData, endData, 1);
        _this6.setRatio(ratio, item, i, item.currentRepeat !== repeatNum);
        if (!item.reset && !updateAnim) {
          // duration 为 0 时的一个回调；
          if (!duration) {
            item.onStart(e);
            cb.mode = 'onStart';
            _this6.onChange(cb);
            item.onUpdate(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ ratio: ratio }, e));
            cb.mode = 'onUpdate';
            _this6.onChange(cb);
          }
          item.onComplete(e);
        } else if (progressTime >= duration + _this6.perFrame - _this6.accuracy) {
          return;
        }
        item.mode = 'onComplete';
      } else if (duration) {
        var currentProgress = progressTime < 0 ? 0 : progressTime;
        currentProgress = currentProgress > duration ? duration : currentProgress;
        ratio = item.ease(currentProgress, startData, endData, duration);
        _this6.setRatio(ratio, item, i);
        if (!updateAnim) {
          if (item.repeat && repeatNum > 0 && item.currentRepeat !== repeatNum) {
            item.mode = 'onRepeat';
            item.currentRepeat = repeatNum;
            item.onRepeat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, e, { repeatNum: repeatNum }));
          } else if ((!item.perTime || progressTime === 0 || reverse && item.perTime >= _this6.reverseStartTime - initTime) && item.mode !== 'onStart') {
            // onReveresStart 和 onStart 统一用 onStart;
            item.mode = 'onStart';
            item.onStart(e);
          } else {
            item.mode = 'onUpdate';
            item.onUpdate(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({ ratio: ratio }, e));
          }
        }
      }

      if (!updateAnim) {
        cb.mode = item.mode;
        _this6.onChange(cb);
      }
      item.perTime = progressTime;
      if (item.reset) {
        delete item.reset;
      }
    }
  });
};
// 播放帧
p.frame = function (moment) {
  var _this7 = this;

  this.progressTime = moment;
  this.defaultData.forEach(function (item) {
    var t = _this7.progressTime - item.duration - item.initTime;
    if (t < _this7.perFrame && t > 0) {
      _this7.progressTime = item.duration + item.initTime;
    }
  });
  this.render();
};
p.resetAnimData = function () {
  this.tween = {};
  this.start = {};
};

p.resetDefaultStyle = function () {
  var _this8 = this;

  this.tween = {};
  this.defaultData = this.defaultData.map(function (item) {
    item.reset = true;
    delete item.mode;
    return item;
  });
  Object.keys(this.startDefaultData).forEach(function (key) {
    if (!(key in defaultData({}, 0))) {
      _this8.target.setAttribute(key, _this8.startDefaultData[key]);
    }
  });
};

p.reStart = function (style) {
  var _this9 = this;

  this.start = {};
  this.target.style.cssText = '';
  Object.keys(style || {}).forEach(function (key) {
    _this9.target.style[key] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["stylesToCss"])(key, style[key]);
  });
  this.setAttrIsStyle();
  this.resetDefaultStyle();
};

p.onChange = noop;
/* harmony default export */ __webpack_exports__["a"] = (Tween);

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TweenOne__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util__ = __webpack_require__(5);









function noop() {}

var TweenOneGroup = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(TweenOneGroup, _Component);

  function TweenOneGroup(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, TweenOneGroup);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    _this.keysToEnter = [];
    _this.keysToLeave = [];
    _this.saveTweenTag = {};
    _this.onEnterBool = false;
    _this.isTween = {};
    // 第一进入，appear 为 true 时默认用 enter 或 tween-one 上的效果
    var children = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["b" /* toArrayChildren */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["c" /* getChildrenFromProps */])(_this.props));
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

    var nextChildren = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["b" /* toArrayChildren */])(nextProps.children);
    var currentChildren = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["b" /* toArrayChildren */])(this.state.children);
    var newChildren = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["d" /* mergeChildren */])(currentChildren, nextChildren);

    this.keysToEnter = [];
    this.keysToLeave = [];
    nextChildren.forEach(function (c) {
      if (!c) {
        return;
      }
      var key = c.key;
      var hasPrev = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["e" /* findChildInChildrenByKey */])(currentChildren, key);
      // 如果当前 key 已存在 saveTweenTag 里，，刷新 child;
      if (_this2.saveTweenTag[key]) {
        _this2.saveTweenTag[key] = __WEBPACK_IMPORTED_MODULE_4_react___default.a.cloneElement(_this2.saveTweenTag[key], {}, c);
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
      var hasNext = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["e" /* findChildInChildrenByKey */])(nextChildren, key);
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
    var componentProps = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.props);
    ['component', 'componentProps', 'appear', 'enter', 'leave', 'animatingClassName', 'onEnd', 'resetStyleBool'].forEach(function (key) {
      return delete componentProps[key];
    });
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react__["createElement"])(this.props.component, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, componentProps, this.props.componentProps), childrenToRender);
  };

  return TweenOneGroup;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onChange = function (animation, key, type, obj) {
    var length = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["f" /* dataToArray */])(animation).length;
    var tag = obj.target;
    var classIsSvg = typeof tag.className === 'object' && 'baseVal' in tag.className;
    var isEnter = type === 'enter' || type === 'appear';
    if (obj.mode === 'onStart') {
      if (classIsSvg) {
        tag.className.baseVal = _this3.setClassName(tag.className.baseVal, isEnter);
      } else {
        tag.className = _this3.setClassName(tag.className, isEnter);
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
      if (classIsSvg) {
        tag.className.baseVal = tag.className.baseVal.replace(_this3.props.animatingClassName[isEnter ? 0 : 1], '').trim();
      } else {
        tag.className = tag.className.replace(_this3.props.animatingClassName[isEnter ? 0 : 1], '').trim();
      }
      delete _this3.isTween[key];
      var _obj = { key: key, type: type };
      _this3.props.onEnd(_obj);
    }
  };

  this.setClassName = function (name, isEnter) {
    var className = name.replace(_this3.props.animatingClassName[isEnter ? 1 : 0], '').trim();
    if (className.indexOf(_this3.props.animatingClassName[isEnter ? 0 : 1]) === -1) {
      className = (className + ' ' + _this3.props.animatingClassName[isEnter ? 0 : 1]).trim();
    }
    return className;
  };

  this.getTweenChild = function (child) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var key = child.key;
    _this3.saveTweenTag[key] = __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__TweenOne__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, props, {
      key: key,
      component: null
    }), child);
    return _this3.saveTweenTag[key];
  };

  this.getCoverAnimation = function (child, i, type) {
    var animation = void 0;
    animation = type === 'leave' ? _this3.props.leave : _this3.props.enter;
    if (type === 'appear') {
      var appear = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["g" /* transformArguments */])(_this3.props.appear, child.key, i);
      animation = appear && _this3.props.enter || null;
    }
    var onChange = _this3.onChange.bind(_this3, animation, child.key, type);
    var animate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__util__["g" /* transformArguments */])(animation, child.key, i);
    var props = {
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
      } else if ((_this3.keysToEnter.indexOf(key) >= 0 || _this3.isTween[key] && _this3.keysToLeave.indexOf(key) === -1) && !(_this3.isTween[key] === 'enter' && _this3.saveTweenTag[key])) {
        /**
        * 1. 在 key 在 enter 里。
        * 2. 出场未结束，触发进场, this.isTween[key] 为 leave, key 在 enter 里。
        * 3. 状态为 enter 且 tweenTag 里有值时，不执行重载动画属性，直接调用 tweenTag 里的。
        */
        return _this3.getCoverAnimation(child, i, 'enter');
      } else if (!_this3.onEnterBool) {
        return _this3.getCoverAnimation(child, i, 'appear');
      }
      return _this3.saveTweenTag[key];
    });
  };
};

TweenOneGroup.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  componentProps: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  children: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  style: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  appear: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool,
  enter: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  leave: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  animatingClassName: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.array,
  onEnd: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  resetStyleBool: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.bool
};

TweenOneGroup.defaultProps = {
  component: 'div',
  componentProps: {},
  appear: true,
  animatingClassName: ['tween-one-entering', 'tween-one-leaving'],
  enter: { x: 50, opacity: 0, type: 'from' },
  leave: { x: -50, opacity: 0 },
  onEnd: noop,
  resetStyleBool: true
};
TweenOneGroup.isTweenOneGroup = true;
/* harmony default export */ __webpack_exports__["a"] = (TweenOneGroup);

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_style_utils__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_style_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_style_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins__ = __webpack_require__(7);

/* eslint-disable func-names, no-console */




var StylePlugin = function StylePlugin(target, vars, type) {
  this.target = target;
  this.vars = vars;
  this.type = type;
  this.propsData = {};
  this.setDefaultData();
};
StylePlugin.prototype = {
  name: 'style'
};
var p = StylePlugin.prototype;
p.getTweenData = function (key, vars) {
  var data = {
    data: {},
    dataType: {},
    dataUnit: {},
    dataCount: {},
    dataSplitStr: {}
  };
  if (key.match(/colo|fill|storker/i)) {
    data.data[key] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["parseColor"])(vars);
    data.dataType[key] = 'color';
  } else if (key.match(/shadow/i)) {
    data.data[key] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["parseShadow"])(vars);
    data.dataType[key] = 'shadow';
  } else if (typeof vars === 'string' && vars.split(/[\s|,]/).length > 1) {
    data.data[key] = vars.split(/[\s|,]/);
    data.dataSplitStr[key] = vars.replace(/[^\s|,]/g, '');
    data.dataType[key] = 'string';
  } else {
    data.data[key] = vars;
    data.dataType[key] = 'other';
  }
  if (Array.isArray(data.data[key])) {
    data.dataUnit[key] = data.data[key].map(function (_item) {
      return _item.toString().replace(/[^a-z|%]/g, '');
    });
    data.dataCount[key] = data.data[key].map(function (_item) {
      return _item.toString().replace(/[^+|=|-]/g, '');
    });

    data.data[key] = data.data[key].map(function (_item) {
      return !parseFloat(_item) && parseFloat(_item) !== 0 ? _item : parseFloat(_item);
    });
  } else {
    data.dataUnit[key] = data.data[key].toString().replace(/[^a-z|%]/g, '');
    data.dataCount[key] = data.data[key].toString().replace(/[^+|=|-]/g, '');
    var d = parseFloat(data.data[key].toString().replace(/[a-z|%|=]/g, ''));
    data.data[key] = !d && d !== 0 ? data.data[key] : d;
  }
  return data;
};
p.setDefaultData = function () {
  var _this = this;

  this.propsData.data = {};
  this.propsData.dataType = {};
  this.propsData.dataUnit = {};
  this.propsData.dataCount = {};
  this.propsData.dataSplitStr = {};
  Object.keys(this.vars).forEach(function (_key) {
    if (_key in __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */]) {
      _this.propsData.data[_key] = new __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */][_key](_this.target, _this.vars[_key]);
      return;
    }
    var key = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["getGsapType"])(_key);
    var _data = _this.getTweenData(key, _this.vars[_key]);
    _this.propsData.data[key] = _data.data[key];
    _this.propsData.dataType[key] = _data.dataType[key];
    _this.propsData.dataUnit[key] = _data.dataUnit[key];
    _this.propsData.dataCount[key] = _data.dataCount[key];
    if (_data.dataSplitStr[key]) {
      _this.propsData.dataSplitStr[key] = _data.dataSplitStr[key];
    }
  });
};
p.convertToMarksArray = function (computedStyle, unit, key, data, i) {
  var startUnit = data.toString().replace(/[^a-z|%]/g, '');
  var endUnit = unit[i];
  if (startUnit === endUnit) {
    return parseFloat(data);
  } else if (!parseFloat(data) && parseFloat(data) !== 0) {
    return data;
  }
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_js__["i" /* startConvertToEndUnit */])(this.target, computedStyle, key, data, startUnit, endUnit, null, key === 'transformOrigin' && !i);
};
p.getAnimStart = function (computedStyle, isSvg) {
  var _this2 = this;

  var style = {};
  Object.keys(this.propsData.data).forEach(function (key) {
    var cssName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["isConvert"])(key);
    var startData = computedStyle[cssName];
    var fixed = computedStyle.position === 'fixed';
    if (!startData || startData === 'none' || startData === 'auto') {
      startData = '';
    }
    var transform = void 0;
    var endUnit = void 0;
    var startUnit = void 0;
    if (key in __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */]) {
      if (key === 'bezier') {
        _this2.transform = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["checkStyleName"])('transform');
        startData = computedStyle[isSvg ? 'transformSVG' : _this2.transform];
        style.transform = style.transform || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["getTransform"])(startData);
      }
      _this2.propsData.data[key].getAnimStart(computedStyle, isSvg);
    } else if (cssName === 'transform') {
      _this2.transform = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["checkStyleName"])('transform');
      startData = computedStyle[isSvg ? 'transformSVG' : _this2.transform];
      endUnit = _this2.propsData.dataUnit[key];
      transform = style.transform || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["getTransform"])(startData);
      if (endUnit && endUnit.match(/%|vw|vh|em|rem/i)) {
        transform[key] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_js__["i" /* startConvertToEndUnit */])(_this2.target, computedStyle, key, transform[key], null, endUnit);
      }
      style.transform = transform;
    } else if (cssName === 'filter') {
      _this2.filterName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["checkStyleName"])('filter') || 'filter';
      startData = computedStyle[_this2.filterName];
      _this2.filterObject = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, _this2.filterObject, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["splitFilterToObject"])(startData));
      startData = _this2.filterObject[key] || 0;
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      endUnit = _this2.propsData.dataUnit[key];
      if (endUnit !== startUnit) {
        startData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_js__["i" /* startConvertToEndUnit */])(_this2.target, computedStyle, cssName, parseFloat(startData), startUnit, endUnit, fixed);
      }
      style[key] = parseFloat(startData);
    } else if (key.match(/color|fill/i) || key === 'stroke') {
      startData = !startData && key === 'stroke' ? 'rgba(255, 255, 255, 0)' : startData;
      style[cssName] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["parseColor"])(startData);
    } else if (key.match(/shadow/i)) {
      startData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["parseShadow"])(startData);
      endUnit = _this2.propsData.dataUnit[key];
      startData = startData.map(_this2.convertToMarksArray.bind(_this2, computedStyle, endUnit, key));
      style[cssName] = startData;
    } else if (Array.isArray(_this2.propsData.data[key])) {
      startData = startData.split(/[\s|,]/);
      endUnit = _this2.propsData.dataUnit[key];
      startData = startData.map(_this2.convertToMarksArray.bind(_this2, computedStyle, endUnit, key));
      style[cssName] = startData;
    } else {
      // 计算单位
      endUnit = _this2.propsData.dataUnit[cssName];
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      if (endUnit !== startUnit) {
        startData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_js__["i" /* startConvertToEndUnit */])(_this2.target, computedStyle, cssName, parseFloat(startData), startUnit, endUnit, fixed);
      }
      style[cssName] = parseFloat(startData || 0);
    }
  });
  this.start = style;
  return style;
};
p.setArrayRatio = function (ratio, start, vars, unit, type) {
  if (type === 'color' && start.length === 4 && vars.length === 3) {
    vars[3] = 1;
  }
  var startInset = start.indexOf('inset') >= 0;
  var endInset = vars.indexOf('inset') >= 0;
  if (startInset && !endInset || endInset && !startInset) {
    throw console.error('Error: "box-shadow" inset have to exist');
  }
  var length = endInset ? 9 : 8;
  if (start.length === length && vars.length === length - 1) {
    vars.splice(3, 0, 0);
    unit.splice(3, 0, '');
  } else if (vars.length === length && start.length === length - 1) {
    start.splice(3, 0, 0);
  }
  var _vars = vars.map(function (endData, i) {
    var startIsAlpha = type === 'color' && i === 3 && !start[i] ? 1 : 0;
    var startData = typeof start[i] === 'number' ? start[i] : startIsAlpha;
    if (typeof endData === 'string') {
      return endData;
    }
    return (endData - startData) * ratio + startData + (unit[i] || 0);
  });
  if (type === 'color') {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["getColor"])(_vars);
  } else if (type === 'shadow') {
    var l = _vars.length === length ? 4 : 3;
    var s = _vars.slice(0, l).map(function (item) {
      if (typeof item === 'number') {
        return item + 'px';
      }
      return item;
    });
    var c = _vars.slice(l, endInset ? _vars.length - 1 : _vars.length);
    var color = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["getColor"])(c);
    return (s.join(' ') + ' ' + color + ' ' + (endInset ? 'inset' : '')).trim();
  }
  return _vars;
};

p.setRatio = function (ratio, tween, computedStyle) {
  var _this3 = this;

  tween.style = tween.style || {};
  if (this.start.transform) {
    tween.style.transform = tween.style.transform || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.start.transform);
  }
  var style = this.target.style;
  Object.keys(this.propsData.data).forEach(function (key) {
    var _isTransform = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["isTransform"])(key) === 'transform';
    var startVars = _isTransform ? _this3.start.transform[key] : _this3.start[key];
    var endVars = _this3.propsData.data[key];
    var unit = _this3.propsData.dataUnit[key];
    var count = _this3.propsData.dataCount[key];
    if (key in __WEBPACK_IMPORTED_MODULE_3__plugins__["a" /* default */]) {
      _this3.propsData.data[key].setRatio(ratio, tween, computedStyle);
      if (key === 'bezier') {
        style[_this3.transform] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_js__["j" /* getTransformValue */])(tween.style.transform);
      } else {
        Object.keys(tween.style).forEach(function (css) {
          style[css] = tween.style[css];
        });
      }
      return;
    } else if (_isTransform) {
      if (unit && unit.match(/%|vw|vh|em|rem/i)) {
        startVars = _this3.start.transform[key];
        if (count.charAt(1) === '=') {
          tween.style.transform[key] = startVars + endVars * ratio + unit;
        } else {
          tween.style.transform[key] = (endVars - startVars) * ratio + startVars + unit;
        }
      } else if (key === 'scale') {
        var xStart = _this3.start.transform.scaleX;
        var yStart = _this3.start.transform.scaleY;
        if (count.charAt(1) === '=') {
          tween.style.transform.scaleX = xStart + endVars * ratio;
          tween.style.transform.scaleY = yStart + endVars * ratio;
        } else {
          tween.style.transform.scaleX = (endVars - xStart) * ratio + xStart;
          tween.style.transform.scaleY = (endVars - yStart) * ratio + yStart;
        }
      } else if (count.charAt(1) === '=') {
        tween.style.transform[key] = startVars + endVars * ratio;
      } else {
        tween.style.transform[key] = (endVars - startVars) * ratio + startVars;
      }
      style[_this3.transform] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_js__["j" /* getTransformValue */])(tween.style.transform);
      if (computedStyle) {
        computedStyle.transformSVG = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["createMatrix"])(style[_this3.transform]).toString();
      }
      return;
    } else if (Array.isArray(endVars)) {
      var _type = _this3.propsData.dataType[key];
      tween.style[key] = _this3.setArrayRatio(ratio, startVars, endVars, unit, _type);
      if (_type === 'string') {
        tween.style[key] = tween.style[key].join(_this3.propsData.dataSplitStr[key]);
      }
    } else {
      var styleUnit = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_style_utils__["stylesToCss"])(key, 0);
      styleUnit = typeof styleUnit === 'number' ? '' : styleUnit.replace(/[^a-z|%]/g, '');
      unit = unit || (__WEBPACK_IMPORTED_MODULE_1_style_utils___default.a.filter.indexOf(key) >= 0 ? '' : styleUnit);
      if (typeof endVars === 'string') {
        tween.style[key] = endVars;
      } else if (count.charAt(1) === '=') {
        tween.style[key] = startVars + endVars * ratio + unit;
      } else {
        var value = (endVars - startVars) * ratio + startVars;
        tween.style[key] = unit ? '' + value + unit : value;
      }
    }
    if (__WEBPACK_IMPORTED_MODULE_1_style_utils___default.a.filter.indexOf(key) >= 0) {
      if (!_this3.filterObject) {
        return;
      }
      _this3.filterObject[key] = tween.style[key];
      var filterStyle = '';
      Object.keys(_this3.filterObject).forEach(function (filterKey) {
        filterStyle += ' ' + filterKey + '(' + _this3.filterObject[filterKey] + ')';
      });
      style[_this3.filterName] = filterStyle.trim();
      return;
    }
    style[key] = tween.style[key];
  });
};
/* harmony default export */ __webpack_exports__["a"] = (StylePlugin);

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = toArrayChildren;
/* harmony export (immutable) */ __webpack_exports__["f"] = dataToArray;
/* harmony export (immutable) */ __webpack_exports__["h"] = objectEqual;
/* harmony export (immutable) */ __webpack_exports__["e"] = findChildInChildrenByKey;
/* harmony export (immutable) */ __webpack_exports__["d"] = mergeChildren;
/* harmony export (immutable) */ __webpack_exports__["g"] = transformArguments;
/* harmony export (immutable) */ __webpack_exports__["c"] = getChildrenFromProps;
/* harmony export (immutable) */ __webpack_exports__["i"] = startConvertToEndUnit;
/* harmony export (immutable) */ __webpack_exports__["a"] = parsePath;
/* harmony export (immutable) */ __webpack_exports__["j"] = getTransformValue;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_deep_eql__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_deep_eql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_deep_eql__);



function toArrayChildren(children) {
  var ret = [];
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(children, function (c) {
    ret.push(c);
  });
  return ret;
}

function dataToArray(vars) {
  if (!vars && vars !== 0) {
    return [];
  }
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}

function objectEqual(obj1, obj2) {
  if (obj1 === obj2 || __WEBPACK_IMPORTED_MODULE_1_deep_eql___default()(obj1, obj2)) {
    return true;
  }
  if (!obj1 || !obj2) {
    return false;
  }
  // animation 写在标签上的进行判断是否相等， 判断每个参数有没有 function;
  var equalBool = true;
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (var i = 0; i < obj1.length; i++) {
      var currentObj = obj1[i];
      var nextObj = obj2[i];
      for (var p in currentObj) {
        // eslint-disable-line no-restricted-syntax
        if (currentObj[p] !== nextObj[p]) {
          if (typeof currentObj[p] === 'object' && typeof nextObj[p] === 'object') {
            equalBool = objectEqual(currentObj[p], nextObj[p]);
          } else if (typeof currentObj[p] === 'function' && typeof nextObj[p] === 'function') {
            if (currentObj[p].name !== nextObj[p].name) {
              equalBool = false;
            }
          } else {
            equalBool = false;
            return false;
          }
        }
      }
    }
  }

  var setEqualBool = function setEqualBool(objA, objB) {
    Object.keys(objA).forEach(function (key) {
      if (!(key in objB)) {
        equalBool = false;
      }

      if (typeof objA[key] === 'object' && typeof objB[key] === 'object') {
        equalBool = objectEqual(objA[key], objB[key]);
      } else if (typeof objA[key] === 'function' && typeof objB[key] === 'function') {
        if (objA[key].name !== objB[key].name) {
          equalBool = false;
        }
      } else if (objA[key] !== objB[key]) {
        equalBool = false;
      }
    });
  };

  setEqualBool(obj1, obj2);
  setEqualBool(obj2, obj1);
  return equalBool;
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
      // eslint-disable-line no-prototype-builtins
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
  return result;
}

function getChildrenFromProps(props) {
  return props && props.children;
}

function startConvertToEndUnit(target, computedStyle, style, num, unit, dataUnit, fixed, isOriginWidth) {
  var horiz = /(?:Left|Right|Width|X)/i.test(style) || isOriginWidth;
  horiz = style === 'padding' || style === 'marign' ? true : horiz;
  var t = style.indexOf('border') !== -1 || style.indexOf('translate') !== -1 ? target : target.parentNode || document.body;
  t = fixed ? document.body : t;
  var pix = void 0;
  var htmlComputedStyle = void 0;
  // transform 在 safari 下会留着单位，chrome 下会全部转换成 px;
  switch (unit) {
    case '%':
      pix = parseFloat(num) / 100 * (horiz ? t.clientWidth : t.clientHeight);
      break;
    case 'vw':
      pix = parseFloat(num) * document.body.clientWidth / 100;
      break;
    case 'vh':
      pix = parseFloat(num) * document.body.clientHeight / 100;
      break;
    case 'em':
      pix = parseFloat(num) * parseFloat(computedStyle.fontSize);
      break;
    case 'rem':
      {
        htmlComputedStyle = window.getComputedStyle(document.getElementsByTagName('html')[0]);
        pix = parseFloat(num) * parseFloat(htmlComputedStyle.fontSize);
        break;
      }
    default:
      pix = parseFloat(num);
      break;
  }
  switch (dataUnit) {
    case '%':
      pix = pix ? pix * 100 / (horiz ? t.clientWidth : t.clientHeight) : 0;
      break;
    case 'vw':
      pix = parseFloat(num) / document.body.clientWidth * 100;
      break;
    case 'vh':
      pix = parseFloat(num) / document.body.clientHeight * 100;
      break;
    case 'em':
      pix = parseFloat(num) / parseFloat(computedStyle.fontSize);
      break;
    case 'rem':
      {
        htmlComputedStyle = htmlComputedStyle || window.getComputedStyle(document.getElementsByTagName('html')[0]);
        pix = parseFloat(num) / parseFloat(htmlComputedStyle.fontSize);
        break;
      }
    default:
      break;
  }
  return pix;
}

function parsePath(path) {
  if (typeof path === 'string') {
    if (path.charAt(0).match(/m/i)) {
      var domPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      domPath.setAttributeNS(null, 'd', path);
      return domPath;
    }
    return document.querySelector(path);
  } else if (path.style) {
    return path;
  }
  throw new Error('Error while parsing the path');
}

function getTransformValue(t) {
  if (typeof t === 'string') {
    return t;
  }
  var perspective = t.perspective;
  var angle = t.rotate;
  var rotateX = t.rotateX;
  var rotateY = t.rotateY;
  var sx = t.scaleX;
  var sy = t.scaleY;
  var sz = t.scaleZ;
  var skx = t.skewX;
  var sky = t.skewY;
  var translateX = typeof t.translateX === 'string' ? t.translateX : t.translateX + 'px';
  var translateY = typeof t.translateY === 'string' ? t.translateY : t.translateY + 'px';
  var translateZ = typeof t.translateZ === 'string' ? t.translateZ : t.translateZ + 'px';
  var sk = skx || sky ? 'skew(' + skx + 'deg,' + sky + 'deg)' : '';
  var an = angle ? 'rotate(' + angle + 'deg)' : '';
  var ss = sx !== 1 || sy !== 1 || sz !== 1 ? 'scale3d(' + sx + ',' + sy + ',' + sz + ')' : '';
  var rX = rotateX ? 'rotateX(' + rotateX + 'deg)' : '';
  var rY = rotateY ? 'rotateY(' + rotateY + 'deg)' : '';
  var per = perspective ? 'perspective(' + perspective + 'px)' : '';
  var defautlTranslate = ss || an || rX || rY || sk ? '' : 'translate(0px, 0px)';
  var translate = t.translateZ ? 'translate3d(' + translateX + ',' + translateY + ',' + translateZ + ')' : (t.translateX || t.translateY) && 'translate(' + translateX + ',' + translateY + ')' || defautlTranslate;
  return (per + ' ' + translate + ' ' + ss + ' ' + an + ' ' + rX + ' ' + rY + ' ' + sk).trim();
}

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint-disable func-names */
var Plugins = function Plugins() {};
var p = Plugins.prototype;
p.push = function (plugin) {
  this[plugin.prototype.name] = plugin;
};
/* harmony default export */ __webpack_exports__["a"] = (new Plugins());

/***/ })

},[172]);
//# sourceMappingURL=target.js.map