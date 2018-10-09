webpackJsonp([4],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TweenOneGroup */
/* unused harmony export easing */
/* unused harmony export plugins */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ticker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TweenOne__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TweenOneGroup__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__easing__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ticker__ = __webpack_require__(18);
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

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Tween__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ticker__ = __webpack_require__(18);













function noop() {}

var perFrame = Math.round(1000 / 60);
var objectOrArray = __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object, __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.array]);

var TweenOne = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(TweenOne, _Component);

  function TweenOne(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, TweenOne);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TweenOne.__proto__ || Object.getPrototypeOf(TweenOne)).call(this, props));

    _initialiseProps.call(_this);

    _this.rafID = -1;
    _this.paused = props.paused;
    _this.reverse = props.reverse;
    _this.updateAnim = false;
    _this.forced = {};
    _this.setForcedJudg(props);
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(TweenOne, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.dom = __WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.findDOMNode(this);
      if (this.dom && this.dom.nodeName !== '#text') {
        this.start();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.tween && !this.dom) {
        this.updateAnim = true;
        return;
      }

      // 动画处理
      var newAnimation = nextProps.animation;
      var currentAnimation = this.props.animation;
      var equal = Object(__WEBPACK_IMPORTED_MODULE_8__util__["f" /* objectEqual */])(currentAnimation, newAnimation);
      if (!equal) {
        if (nextProps.resetStyle && this.tween) {
          this.tween.resetDefaultStyle();
        }
        this.updateAnim = true;
      }

      // 跳帧事件 moment;
      var nextMoment = nextProps.moment;
      if (typeof nextMoment === 'number' && nextMoment !== this.props.moment) {
        if (this.tween && !this.updateAnim) {
          this.startMoment = nextMoment;
          this.startFrame = __WEBPACK_IMPORTED_MODULE_10__ticker__["a" /* default */].frame;
          if (nextProps.paused) {
            this.raf();
          }
          if (this.tween.progressTime >= this.tween.totalTime) {
            this.play();
          }
        } else {

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
          __WEBPACK_IMPORTED_MODULE_10__ticker__["a" /* default */].timeout(this.restart, nextProps.reverseDelay);
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

      var styleEqual = Object(__WEBPACK_IMPORTED_MODULE_8__util__["f" /* objectEqual */])(this.props.style, nextProps.style);
      if (!styleEqual) {
        // 在动画时更改了 style, 作为更改开始数值。
        if (this.tween) {
          this.tween.reStart(nextProps.style);
          if (this.paused) {
            this.raf();
          }
        }
      }
      this.setForcedJudg(nextProps);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!this.dom) {
        this.dom = __WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.findDOMNode(this);
      }
      // 样式更新了后再执行动画；
      if (this.updateAnim && this.dom && this.dom.nodeName !== '#text') {
        if (this.tween) {
          this.cancelRequestAnimationFrame();
        }
        this.start();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cancelRequestAnimationFrame();
    }

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

  }, {
    key: 'render',
    value: function render() {
      var props = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.props);
      ['animation', 'component', 'componentProps', 'reverseDelay', 'attr', 'paused', 'reverse', 'repeat', 'yoyo', 'moment', 'resetStyle', 'forcedJudg'].forEach(function (key) {
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
        return __WEBPACK_IMPORTED_MODULE_5_react___default.a.cloneElement(this.props.children, { style: newStyle, className: newClassName });
      }
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(this.props.component, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, props, this.props.componentProps));
    }
  }]);

  return TweenOne;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]);

TweenOne.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  componentProps: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  animation: objectOrArray,
  children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  style: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
  paused: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  reverse: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  reverseDelay: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
  yoyo: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  repeat: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
  moment: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
  attr: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
  onChange: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  resetStyle: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  forcedJudg: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object
};
TweenOne.defaultProps = {
  component: 'div',
  componentProps: {},
  reverseDelay: 0,
  repeat: 0,
  attr: 'style',
  onChange: noop
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
    _this2.startFrame = __WEBPACK_IMPORTED_MODULE_10__ticker__["a" /* default */].frame;
  };

  this.restart = function () {
    if (!_this2.tween) {
      return;
    }
    _this2.startMoment = _this2.moment;
    _this2.startFrame = __WEBPACK_IMPORTED_MODULE_10__ticker__["a" /* default */].frame;
    _this2.tween.reverse = _this2.reverse;
    _this2.tween.reverseStartTime = _this2.startMoment;
    _this2.raf();
    _this2.play();
  };

  this.start = function () {
    _this2.updateAnim = false;
    var props = _this2.props;
    if (props.animation && Object.keys(props.animation).length) {
      _this2.setDefalut(props);
      _this2.tween = new __WEBPACK_IMPORTED_MODULE_9__Tween__["a" /* default */](_this2.dom, Object(__WEBPACK_IMPORTED_MODULE_8__util__["a" /* dataToArray */])(props.animation), { attr: props.attr });
      _this2.tween.reverse = _this2.reverse;
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
    _this2.rafID = __WEBPACK_IMPORTED_MODULE_10__ticker__["a" /* default */].add(_this2.raf);
  };

  this.frame = function () {
    var yoyo = _this2.props.yoyo;
    var repeat = _this2.props.repeat;

    var totalTime = repeat === -1 ? Number.MAX_VALUE : _this2.tween.totalTime * (repeat + 1);
    repeat = repeat >= 0 ? repeat : Number.MAX_VALUE;
    var moment = (__WEBPACK_IMPORTED_MODULE_10__ticker__["a" /* default */].frame - _this2.startFrame) * perFrame + _this2.startMoment;
    if (_this2.reverse) {
      moment = (_this2.startMoment || 0) - (__WEBPACK_IMPORTED_MODULE_10__ticker__["a" /* default */].frame - _this2.startFrame) * perFrame;
    }
    moment = moment > totalTime ? totalTime : moment;
    moment = moment <= 0 ? 0 : moment;
    var repeatNum = Math.floor(moment / _this2.tween.totalTime) || 0;
    repeatNum = repeatNum > repeat ? repeat : repeatNum;
    var tweenMoment = moment - _this2.tween.totalTime * repeatNum;
    tweenMoment = tweenMoment < perFrame && !_this2.reverse && totalTime >= perFrame ? 0 : tweenMoment;
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

      if (_this2.moment === _this2.startMoment && !_this2.reverse && !e.index && e.mode === 'onStart' || _this2.reverse) {
        cb.timelineMode = 'onTimelineStart';
      } else if (moment >= totalTime && !_this2.reverse || !moment && _this2.reverse) {
        cb.timelineMode = 'onTimelineComplete';
      } else if (repeatNum !== _this2.timelineRepeatNum) {
        cb.timelineMode = 'onTimelineRepeat';
      } else {
        cb.timelineMode = 'onTimelineUpdate';
      }
      _this2.timelineRepeatNum = repeatNum;
      _this2.props.onChange(cb);
    };
    _this2.moment = moment;
    _this2.tween.frame(tweenMoment);
  };

  this.raf = function () {
    var tween = _this2.tween;
    _this2.frame();
    if (tween !== _this2.tween) {
      // 在 onComplete 时更换动画时，raf 没结束，所以需要强制退出，避逸两个时间的冲突。
      return null;
    }
    var repeat = _this2.props.repeat;

    var totalTime = repeat === -1 ? Number.MAX_VALUE : _this2.tween.totalTime * (repeat + 1);
    if (_this2.moment >= totalTime && !_this2.reverse || _this2.paused || _this2.reverse && _this2.moment === 0) {
      return _this2.cancelRequestAnimationFrame();
    }
    return null;
  };

  this.cancelRequestAnimationFrame = function () {
    __WEBPACK_IMPORTED_MODULE_10__ticker__["a" /* default */].clear(_this2.rafID);
    _this2.rafID = -1;
  };
};

TweenOne.isTweenOne = true;
/* harmony default export */ __webpack_exports__["a"] = (TweenOne);

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(170);


/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim_assets_index_less__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_scroll_anim__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_queue_anim__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__ = __webpack_require__(10);




// use jsx to render html, do not modify simple.html







var _package = __webpack_require__(69);
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

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QueueAnim__ = __webpack_require__(24);
// export this package's api


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__QueueAnim__["a" /* default */]);

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__animTypes__ = __webpack_require__(37);














var noop = function noop() {};

var typeDefault = ['displayName', 'propTypes', 'getDefaultProps', 'defaultProps', 'childContextTypes', 'contextTypes'];

var QueueAnim = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(QueueAnim, _React$Component);

  function QueueAnim(props) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, QueueAnim);

    /**
     * @param oneEnter
     * 记录第一次进入;
     */
    var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (QueueAnim.__proto__ || Object.getPrototypeOf(QueueAnim)).call(this, props));

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
    var children = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["d" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_10__utils__["b" /* getChildrenFromProps */])(props));
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
    _this.keysToEnterToCallback = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(_this.keysToEnter));
    _this.originalChildren = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["d" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_10__utils__["b" /* getChildrenFromProps */])(props));
    _this.state = {
      children: children,
      childrenShow: childrenShow
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(QueueAnim, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.appear) {
        this.componentDidUpdate();
      }
      this.oneEnter = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var nextChildren = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["d" /* toArrayChildren */])(nextProps.children).filter(function (item) {
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
        var stateChildrens = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["c" /* mergeChildren */])(currentChildren, this.state.children);
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
      var newChildren = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["c" /* mergeChildren */])(currentChildren, nextChildren);

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
        var hasPrev = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["a" /* findChildInChildrenByKey */])(currentChildren, key);
        if (!hasPrev && key) {
          _this2.keysToEnter.push(key);
        }
      });

      currentChildren.forEach(function (c) {
        if (!c) {
          return;
        }
        var key = c.key;
        var hasNext = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["a" /* findChildInChildrenByKey */])(nextChildren, key);
        if (!hasNext && key) {
          _this2.keysToLeave.push(key);
        }
      });
      this.keysToEnterToCallback = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(this.keysToEnter));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.originalChildren = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["d" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_10__utils__["b" /* getChildrenFromProps */])(this.props));
      var keysToEnter = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(this.keysToEnter));
      var keysToLeave = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(this.keysToLeave));
      keysToEnter.forEach(this.performEnter);
      keysToLeave.forEach(this.performLeave);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      Object.keys(this.placeholderTimeoutIds).forEach(function (key) {
        __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["b" /* ticker */].clear(_this3.placeholderTimeoutIds[key]);
      });
      this.keysToEnter = [];
      this.keysToLeave = [];
    }
  }, {
    key: 'getTweenType',
    value: function getTweenType(type, num) {
      var data = __WEBPACK_IMPORTED_MODULE_11__animTypes__["a" /* default */][type];
      return this.getTweenAnimConfig(data, num);
    }
  }, {
    key: 'getTweenAnimConfig',
    value: function getTweenAnimConfig(data, num, enterOrLeave) {
      var _this4 = this;

      if (Array.isArray(data)) {
        return data.map(function (item) {
          return _this4.getTweenSingleConfig(item, num, enterOrLeave);
        });
      }
      return this.getTweenSingleConfig(data, num, enterOrLeave);
    }
  }, {
    key: 'render',
    value: function render() {
      var tagProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(this.props, []);

      ['component', 'componentProps', 'interval', 'duration', 'delay', 'type', 'animConfig', 'ease', 'leaveReverse', 'animatingClassName', 'forcedReplay', 'onEnd', 'appear'].forEach(function (key) {
        return delete tagProps[key];
      });
      var childrenToRender = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["d" /* toArrayChildren */])(this.state.children).map(this.getChildrenToRender);
      var props = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, tagProps, this.props.componentProps);
      return Object(__WEBPACK_IMPORTED_MODULE_7_react__["createElement"])(this.props.component, props, childrenToRender);
    }
  }]);

  return QueueAnim;
}(__WEBPACK_IMPORTED_MODULE_7_react___default.a.Component);

QueueAnim.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.any,
  component: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.any,
  componentProps: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.object,
  interval: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.any,
  duration: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.any,
  delay: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.any,
  type: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.any,
  animConfig: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.any,
  ease: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.any,
  leaveReverse: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
  forcedReplay: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool,
  animatingClassName: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.array,
  onEnd: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.func,
  appear: __WEBPACK_IMPORTED_MODULE_8_prop_types___default.a.bool
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
    var ease = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["e" /* transformArguments */])(props.ease, key, i)[enterOrLeave];
    var duration = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["e" /* transformArguments */])(props.duration, key, i)[enterOrLeave];
    if (Array.isArray(ease)) {
      ease = ease.map(function (num) {
        return num * 100;
      });
      ease = __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["a" /* default */].easing.path('M0,100C' + ease[0] + ',' + (100 - ease[1]) + ',' + ease[2] + ',' + (100 - ease[3]) + ',100,0', { lengthPixel: duration / 16.6667 });
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
    return props.animConfig ? _this5.getTweenAnimConfig(Object(__WEBPACK_IMPORTED_MODULE_10__utils__["e" /* transformArguments */])(props.animConfig, key, i)[enterOrLeave], startOrEnd, enterOrLeave) : _this5.getTweenType(Object(__WEBPACK_IMPORTED_MODULE_10__utils__["e" /* transformArguments */])(props.type, key, i)[enterOrLeave], startOrEnd);
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
      var $interval = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["e" /* transformArguments */])(interval, key, i)[1];
      var $delay = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["e" /* transformArguments */])(delay, key, i)[1];
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
        return Object(__WEBPACK_IMPORTED_MODULE_7_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["a" /* default */], { key: key, component: child.type, forcedJudg: forcedJudg, componentProps: child.props });
      }
    }
    var paused = _this5.keysToEnterPaused[key] && !_this5.keysToLeave.indexOf(key) >= 0;
    animation = paused ? null : animation;
    var tag = Object(__WEBPACK_IMPORTED_MODULE_7_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["a" /* default */], { key: key, component: child.type, forcedJudg: forcedJudg, componentProps: child.props, animation: animation });
    _this5.saveTweenOneTag[key] = tag;
    return tag;
  };

  this.performEnter = function (key, i) {
    var interval = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["e" /* transformArguments */])(_this5.props.interval, key, i)[0];
    var delay = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["e" /* transformArguments */])(_this5.props.delay, key, i)[0];
    _this5.placeholderTimeoutIds[key] = __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["b" /* ticker */].timeout(_this5.performEnterBegin.bind(_this5, key), interval * i + delay);
    if (_this5.keysToEnter.indexOf(key) >= 0) {
      _this5.keysToEnter.splice(_this5.keysToEnter.indexOf(key), 1);
    }
  };

  this.performEnterBegin = function (key) {
    var childrenShow = _this5.state.childrenShow;
    childrenShow[key] = true;
    delete _this5.keysToEnterPaused[key];
    __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["b" /* ticker */].clear(_this5.placeholderTimeoutIds[key]);
    delete _this5.placeholderTimeoutIds[key];
    _this5.setState({ childrenShow: childrenShow });
  };

  this.performLeave = function (key) {
    __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["b" /* ticker */].clear(_this5.placeholderTimeoutIds[key]);
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
      var currentChildren = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["d" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_10__utils__["b" /* getChildrenFromProps */])(_this5.props));
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

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(26);

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

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(27), __esModule: true };

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60);
__webpack_require__(28);
module.exports = __webpack_require__(9).Array.from;


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(39);
var $export = __webpack_require__(17);
var toObject = __webpack_require__(43);
var call = __webpack_require__(29);
var isArrayIter = __webpack_require__(30);
var toLength = __webpack_require__(62);
var createProperty = __webpack_require__(31);
var getIterFn = __webpack_require__(32);

$export($export.S + $export.F * !__webpack_require__(34)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(21);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(12);
var ITERATOR = __webpack_require__(7)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(14);
var createDesc = __webpack_require__(22);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(33);
var ITERATOR = __webpack_require__(7)('iterator');
var Iterators = __webpack_require__(12);
module.exports = __webpack_require__(9).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(42);
var TAG = __webpack_require__(7)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
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

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(7)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__TweenOne__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util__ = __webpack_require__(13);










function noop() {}

var TweenOneGroup = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(TweenOneGroup, _Component);

  function TweenOneGroup(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, TweenOneGroup);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TweenOneGroup.__proto__ || Object.getPrototypeOf(TweenOneGroup)).call(this, props));

    _initialiseProps.call(_this);

    _this.keysToEnter = [];
    _this.keysToLeave = [];
    _this.saveTweenTag = {};
    _this.onEnterBool = false;
    _this.animQueue = [];
    _this.isTween = {};
    // 第一进入，appear 为 true 时默认用 enter 或 tween-one 上的效果
    var children = Object(__WEBPACK_IMPORTED_MODULE_8__util__["i" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_8__util__["c" /* getChildrenFromProps */])(_this.props));
    _this.originalChildren = Object(__WEBPACK_IMPORTED_MODULE_8__util__["i" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_8__util__["c" /* getChildrenFromProps */])(_this.props));
    _this.currentChildren = Object(__WEBPACK_IMPORTED_MODULE_8__util__["i" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_8__util__["c" /* getChildrenFromProps */])(_this.props));
    _this.state = {
      children: children
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(TweenOneGroup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.onEnterBool = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextChildren = Object(__WEBPACK_IMPORTED_MODULE_8__util__["i" /* toArrayChildren */])(nextProps.children);
      if (Object.keys(this.isTween).length && !nextProps.exclusive) {
        this.animQueue.push(nextChildren);
        return;
      }
      var currentChildren = Object(__WEBPACK_IMPORTED_MODULE_8__util__["i" /* toArrayChildren */])(nextProps.exclusive ? this.originalChildren : this.state.children);
      this.changeChildren(nextChildren, currentChildren);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.originalChildren = Object(__WEBPACK_IMPORTED_MODULE_8__util__["i" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_8__util__["c" /* getChildrenFromProps */])(this.props));
    }
  }, {
    key: 'changeChildren',
    value: function changeChildren(nextChildren, currentChildren) {
      var _this2 = this;

      var newChildren = Object(__WEBPACK_IMPORTED_MODULE_8__util__["e" /* mergeChildren */])(currentChildren, nextChildren);
      this.keysToEnter = [];
      this.keysToLeave = [];
      nextChildren.forEach(function (c) {
        if (!c) {
          return;
        }
        var key = c.key;
        var hasPrev = Object(__WEBPACK_IMPORTED_MODULE_8__util__["b" /* findChildInChildrenByKey */])(currentChildren, key);
        // 如果当前 key 已存在 saveTweenTag 里，，刷新 child;
        if (_this2.saveTweenTag[key]) {
          _this2.saveTweenTag[key] = __WEBPACK_IMPORTED_MODULE_5_react___default.a.cloneElement(_this2.saveTweenTag[key], {}, c);
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
        var hasNext = Object(__WEBPACK_IMPORTED_MODULE_8__util__["b" /* findChildInChildrenByKey */])(nextChildren, key);
        if (!hasNext && key) {
          _this2.keysToLeave.push(key);
          delete _this2.saveTweenTag[key];
        }
      });
      this.currentChildren = newChildren;
      this.setState({
        children: newChildren
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var childrenToRender = this.getChildrenToRender(this.state.children);
      if (!this.props.component) {
        return childrenToRender[0] || null;
      }
      var componentProps = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.props);
      ['component', 'componentProps', 'appear', 'enter', 'leave', 'animatingClassName', 'onEnd', 'exclusive'].forEach(function (key) {
        return delete componentProps[key];
      });
      return Object(__WEBPACK_IMPORTED_MODULE_5_react__["createElement"])(this.props.component, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, componentProps, this.props.componentProps), childrenToRender);
    }
  }]);

  return TweenOneGroup;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onChange = function (animation, key, type, obj) {
    var length = Object(__WEBPACK_IMPORTED_MODULE_8__util__["a" /* dataToArray */])(animation).length;
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
      delete _this3.isTween[key];
      if (classIsSvg) {
        tag.className.baseVal = tag.className.baseVal.replace(_this3.props.animatingClassName[isEnter ? 0 : 1], '').trim();
      } else {
        tag.className = tag.className.replace(_this3.props.animatingClassName[isEnter ? 0 : 1], '').trim();
      }
      if (type === 'enter') {
        _this3.keysToEnter.splice(_this3.keysToEnter.indexOf(key), 1);
        if (!_this3.keysToEnter.length) {
          _this3.reAnimQueue();
        }
      } else if (type === 'leave') {
        _this3.keysToLeave.splice(_this3.keysToLeave.indexOf(key), 1);
        _this3.currentChildren = _this3.currentChildren.filter(function (child) {
          return key !== child.key;
        });
        if (!_this3.keysToLeave.length) {
          var currentChildrenKeys = _this3.currentChildren.map(function (item) {
            return item.key;
          });
          Object.keys(_this3.saveTweenTag).forEach(function ($key) {
            if (currentChildrenKeys.indexOf($key) === -1) {
              delete _this3.saveTweenTag[$key];
            }
          });
          _this3.setState({
            children: _this3.currentChildren
          }, _this3.reAnimQueue);
        }
      }
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
    _this3.saveTweenTag[key] = __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__TweenOne__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, props, {
      key: key,
      component: null
    }), child);
    return _this3.saveTweenTag[key];
  };

  this.getCoverAnimation = function (child, i, type) {
    var animation = void 0;
    animation = type === 'leave' ? _this3.props.leave : _this3.props.enter;
    if (type === 'appear') {
      var appear = Object(__WEBPACK_IMPORTED_MODULE_8__util__["j" /* transformArguments */])(_this3.props.appear, child.key, i);
      animation = appear && _this3.props.enter || null;
    }
    var animate = Object(__WEBPACK_IMPORTED_MODULE_8__util__["j" /* transformArguments */])(animation, child.key, i);
    var onChange = _this3.onChange.bind(_this3, animate, child.key, type);
    var props = {
      key: child.key,
      animation: animate,
      onChange: onChange,
      resetStyle: _this3.props.exclusive
    };
    if (_this3.keysToEnter.concat(_this3.keysToLeave).indexOf(child.key) >= 0 || !_this3.onEnterBool && animation) {
      if (!_this3.saveTweenTag[child.key]) {
        _this3.isTween[child.key] = type;
      }
    }
    var children = _this3.getTweenChild(child, props);
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

  this.reAnimQueue = function () {
    if (!Object.keys(_this3.isTween).length && _this3.animQueue.length) {
      _this3.changeChildren(_this3.animQueue[_this3.animQueue.length - 1], _this3.state.children);
      _this3.animQueue = [];
    }
  };
};

TweenOneGroup.propTypes = {
  component: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  componentProps: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
  children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  style: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.object,
  appear: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool,
  enter: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  leave: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  animatingClassName: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.array,
  onEnd: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.func,
  exclusive: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.bool
};

TweenOneGroup.defaultProps = {
  component: 'div',
  componentProps: {},
  appear: true,
  animatingClassName: ['tween-one-entering', 'tween-one-leaving'],
  enter: { x: 50, opacity: 0, type: 'from' },
  leave: { x: -50, opacity: 0 },
  onEnd: noop,
  exclusive: false
};
TweenOneGroup.isTweenOneGroup = true;
/* harmony default export */ __webpack_exports__["a"] = (TweenOneGroup);

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = toArrayChildren;
/* harmony export (immutable) */ __webpack_exports__["a"] = findChildInChildrenByKey;
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

/***/ 37:
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

/***/ })

},[169]);
//# sourceMappingURL=target.js.map