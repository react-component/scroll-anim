webpackJsonp([3],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(101);


/***/ }),

/***/ 101:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_queue_anim__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_tween_one__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rc_animate__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__assets_index_less__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__assets_index_less__);




// use jsx to render html, do not modify simple.html









var _package = __webpack_require__(58);

var Link = __WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim__["a" /* default */].Link;
var Element = __WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim__["a" /* default */].Element;
var ScrollOverPack = __WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim__["a" /* default */].OverPack;
var EventListener = __WEBPACK_IMPORTED_MODULE_4_rc_scroll_anim__["a" /* default */].Event;
// ScrollAnim.scrollScreen({scrollInterval: 600});

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo() {
    var _ref;

    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = Demo.__proto__ || Object.getPrototypeOf(Demo)).call.apply(_ref, [this].concat(args))), _this), _this.onFocus = function (e) {
      console.log(e, 'focus');
      _this.dom = e.target;
      _this.barAnimate();
    }, _this.onBlur = function (e) {
      console.log(e, 'blur');
    }, _this.onChange = function (e) {
      console.log(e);
    }, _this.barAnimate = function () {
      if (!_this.dom) {
        return;
      }
      var bar = _this.bar;
      bar.style.left = _this.dom.getBoundingClientRect().left + 'px';
    }, _temp), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // 添加改变窗口事件,可加setTimeout
      EventListener.addEventListener('resize.userResize', this.barAnimate.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { className: 'nav' },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            { className: 'logo' },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'p',
              null,
              'Ant Motion'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            { className: 'nav-wap' },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              Link,
              { className: 'nav-list', to: 'page0', showHeightActive: ['50%', '10%'],
                onFocus: this.onFocus,
                onBlur: this.onBlur
              },
              'Example'
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              Link,
              { className: 'nav-list', to: 'page1', showHeightActive: ['10%', '60%'], toShowHeight: true,
                onFocus: this.onFocus,
                onBlur: this.onBlur
              },
              'Example2'
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              Link,
              { className: 'nav-list', to: 'page2', showHeightActive: ['60%', '50%'], toShowHeight: true,
                onFocus: this.onFocus,
                onBlur: this.onBlur
              },
              'Example3'
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              Link,
              { className: 'nav-list', to: 'page3', offsetTop: 100,
                onFocus: this.onFocus,
                onBlur: this.onBlur
              },
              'Example4'
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div', { ref: function ref(c) {
                _this2.bar = c;
              }, className: 'nav-bar' })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          Element,
          { className: 'pack-page page0', id: 'page0', onChange: this.onChange },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_7_rc_queue_anim__["a" /* default */],
            { className: 'home-title' },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'div',
              { className: 'page-title', key: 'title' },
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
                'The link demo'
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          ScrollOverPack,
          { id: 'page1', className: 'page1' },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_8_rc_tween_one__["b" /* default */],
            { className: 'tween-one', key: '0', animation: { opacity: 1 } },
            '\u9ED8\u8BA4\u8FDB\u5165\u4E0E\u51FA\u573A'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_7_rc_queue_anim__["a" /* default */],
            { key: '1' },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div', { key: '0', className: 'demo-content' }),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div', { key: '1', className: 'demo-content', style: { backgroundColor: '#F38EAD' } }),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div', { key: '2', className: 'demo-content' }),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div', { key: '3', className: 'demo-content' })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          ScrollOverPack,
          {
            className: 'pack-page page2',
            style: { backgroundColor: '#0098CE' },
            always: false,
            id: 'page2'
          },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            { className: 'page2-title' },
            '\u53EA\u8FDB\u5165\u4E00\u6B21'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9_rc_animate__["a" /* default */],
            { key: '0', transitionName: 'fade', transitionAppear: true },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div', { className: 'demo-content2' })
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_rc_tween_one__["b" /* default */], {
            className: 'demo-content2',
            animation: { y: 0, opacity: 1 },
            key: '1',
            style: { transform: 'translateY(100px)', opacity: 0 }
          })
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          ScrollOverPack,
          {
            className: 'pack-page page3',
            style: { backgroundColor: '#174270' },
            playScale: 0.8,
            id: 'page3'
          },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_8_rc_tween_one__["b" /* default */],
            { animation: { opacity: 1 }, style: { opacity: 0 }, key: 'title',
              className: 'page2-title'
            },
            '\u5728\u9875\u976280\uFF05\u65F6\u8FDB\u5165'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9_rc_animate__["a" /* default */],
            { key: '0', transitionName: 'fade', transitionAppear: true },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div', { className: 'demo-content' })
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_rc_tween_one__["b" /* default */], {
            className: 'demo-content',
            animation: { y: 0, opacity: 1 },
            key: '1',
            style: { transform: 'translateY(100px)', opacity: 0 }
          })
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var util = {
  isAppearSupported: function isAppearSupported(props) {
    return props.transitionName && props.transitionAppear || props.animation.appear;
  },
  isEnterSupported: function isEnterSupported(props) {
    return props.transitionName && props.transitionEnter || props.animation.enter;
  },
  isLeaveSupported: function isLeaveSupported(props) {
    return props.transitionName && props.transitionLeave || props.animation.leave;
  },
  allowAppearCallback: function allowAppearCallback(props) {
    return props.transitionAppear || props.animation.appear;
  },
  allowEnterCallback: function allowEnterCallback(props) {
    return props.transitionEnter || props.animation.enter;
  },
  allowLeaveCallback: function allowLeaveCallback(props) {
    return props.transitionLeave || props.animation.leave;
  }
};
/* harmony default export */ __webpack_exports__["a"] = (util);

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QueueAnim__ = __webpack_require__(21);
// export this package's api


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__QueueAnim__["a" /* default */]);

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_lifecycles_compat__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__animTypes__ = __webpack_require__(33);















var noop = function noop() {};

var typeDefault = ['displayName', 'propTypes', 'getDefaultProps', 'defaultProps', 'childContextTypes', 'contextTypes'];

var QueueAnim = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(QueueAnim, _React$Component);

  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default()(QueueAnim, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, _ref) {
      var prevProps = _ref.prevProps,
          children = _ref.children,
          prevChildShow = _ref.childrenShow,
          $self = _ref.$self;

      var nextState = {
        prevProps: props
      };
      if (prevProps && !$self.isInsideRender) {
        var nextChildren = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["d" /* toArrayChildren */])(props.children).filter(function (c) {
          return c;
        });
        var currentChildren = $self.originalChildren.filter(function (item) {
          return item;
        });
        if (children.length) {
          /**
           * 多次刷新处理
           * 如果 state.children 里还有元素，元素还在动画，当前子级加回在出场的子级;
           */
          var leaveChild = children.filter(function (item) {
            return item && $self.keysToLeave.indexOf(item.key) >= 0;
          });
          $self.leaveUnfinishedChild = leaveChild.map(function (item) {
            return item.key;
          });
          /**
           * 获取 leaveChild 在 state.children 里的序列，再将 leaveChild 和 currentChildren 的重新排序。
           * 避逸 state.children 在 leaveComplete 里没全部完成不触发，
           * leaveComplete 里如果动画完成了是会删除 keyToLeave，但 state.children 是在全部出场后才触发清除，
           * 所以这里需要处理出场完成的元素做清除。
           */
          var stateChildren = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["c" /* mergeChildren */])(currentChildren, children);
          var currentChild = [];
          var childReOrder = function childReOrder(child) {
            child.forEach(function (item) {
              var order = stateChildren.indexOf(item);
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
        var newChildren = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["c" /* mergeChildren */])(currentChildren, nextChildren);

        var childrenShow = !newChildren.length ? {} : prevChildShow;
        $self.keysToEnterPaused = {};
        var emptyBool = !nextChildren.length && !currentChildren.length && children.length;
        /**
         * 在出场没结束时，childrenShow 里的值将不会清除。
         * 再触发进场时， childrenShow 里的值是保留着的, 设置了 forcedReplay 将重新播放进场。
         */
        if (!emptyBool) {
          // 空子级状态下刷新不做处理
          var nextKeys = nextChildren.map(function (c) {
            return c.key;
          });
          $self.keysToLeave.forEach(function (key) {
            // 将所有在出场里的停止掉。避免间隔性出现
            if (nextKeys.indexOf(key) >= 0) {
              $self.keysToEnterPaused[key] = true;
              currentChildren = currentChildren.filter(function (item) {
                return item.key !== key;
              });
              if (props.forcedReplay) {
                // 清掉所有出场的。
                delete childrenShow[key];
              }
            }
          });
        }

        $self.keysToEnter = [];
        $self.keysToLeave = [];

        // need render to avoid update
        nextState.childrenShow = childrenShow;
        nextState.children = newChildren;

        nextChildren.forEach(function (c) {
          if (!c) {
            return;
          }
          var key = c.key;
          var hasPrev = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["a" /* findChildInChildrenByKey */])(currentChildren, key);
          if (!hasPrev && key) {
            $self.keysToEnter.push(key);
          }
        });

        currentChildren.forEach(function (c) {
          if (!c) {
            return;
          }
          var key = c.key;
          var hasNext = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["a" /* findChildInChildrenByKey */])(nextChildren, key);
          if (!hasNext && key) {
            $self.keysToLeave.push(key);
            __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["c" /* ticker */].clear($self.placeholderTimeoutIds[key]);
            delete $self.placeholderTimeoutIds[key];
          }
        });
        $self.keysToEnterToCallback = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()($self.keysToEnter));
      }
      return nextState;
    }
  }]);

  function QueueAnim(props) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, QueueAnim);

    /**
     * @param tweenToEnter;
     * 记录强制切换时是否需要添加 animation;
     * 如 enter 后, leave -> enter，样式是没有发生变化，就不需要添加 animation 属性。
     */
    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (QueueAnim.__proto__ || Object.getPrototypeOf(QueueAnim)).call(this, props));

    _initialiseProps.call(_this);

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
     * @param enterAnimation;
     * 记录进场的动画, 在没进场完成, 将进场的动画保存，免得重新生成。
     */
    _this.enterAnimation = {};
    /**
     * @param childrenShow;
     * 记录 animation 里是否需要 startAnim;
     * 当前元素是否处在显示状态
     * enterBegin 到 leaveComplete 之前都处于显示状态
     */
    _this.childrenShow = {};
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
    /**
     * @param childRefs;
     * 储存 children 的 ref;
     */
    _this.childRefs = {};
    /**
     * @param currentRef;
     * 记录 component 是组件时的 ref;
     */
    _this.currentRef = null;
    // 第一次进入，默认进场
    var children = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["d" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_11__utils__["b" /* getChildrenFromProps */])(props));
    var childrenShow = {};
    children.forEach(function (child) {
      if (!child || !child.key) {
        return;
      }
      if (_this.props.appear) {
        _this.keysToEnter.push(child.key);
      } else {
        childrenShow[child.key] = true;
        _this.tweenToEnter[child.key] = true;
      }
    });
    _this.keysToEnterToCallback = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(_this.keysToEnter));
    _this.originalChildren = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["d" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_11__utils__["b" /* getChildrenFromProps */])(props));
    _this.state = {
      children: children,
      childrenShow: childrenShow,
      $self: _this
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default()(QueueAnim, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.appear) {
        this.componentDidUpdate();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.originalChildren = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["d" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_11__utils__["b" /* getChildrenFromProps */])(this.props));
      var keysToEnter = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(this.keysToEnter));
      var keysToLeave = [].concat(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_toConsumableArray___default()(this.keysToLeave));
      keysToEnter.forEach(this.performEnter);
      keysToLeave.forEach(this.performLeave);
      this.isInsideRender = false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      Object.keys(this.placeholderTimeoutIds).forEach(function (key) {
        __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["c" /* ticker */].clear(_this2.placeholderTimeoutIds[key]);
      });
      this.keysToEnter = [];
      this.keysToLeave = [];
      this.childrenShow = {};
    }
  }, {
    key: 'getTweenType',
    value: function getTweenType(type, num) {
      var data = __WEBPACK_IMPORTED_MODULE_12__animTypes__["a" /* default */][type];
      return this.getTweenAnimConfig(data, num);
    }
  }, {
    key: 'getTweenAnimConfig',
    value: function getTweenAnimConfig(data, num, enterOrLeave) {
      var _this3 = this;

      if (Array.isArray(data)) {
        return data.map(function (item) {
          return _this3.getTweenSingleConfig(item, num, enterOrLeave);
        });
      }
      return this.getTweenSingleConfig(data, num, enterOrLeave);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          component = _props.component,
          componentProps = _props.componentProps,
          interval = _props.interval,
          duration = _props.duration,
          delay = _props.delay,
          type = _props.type,
          animConfig = _props.animConfig,
          ease = _props.ease,
          leaveReverse = _props.leaveReverse,
          animatingClassName = _props.animatingClassName,
          forcedReplay = _props.forcedReplay,
          onEnd = _props.onEnd,
          appear = _props.appear,
          tagProps = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_objectWithoutProperties___default()(_props, ['component', 'componentProps', 'interval', 'duration', 'delay', 'type', 'animConfig', 'ease', 'leaveReverse', 'animatingClassName', 'forcedReplay', 'onEnd', 'appear']);

      var childrenToRender = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["d" /* toArrayChildren */])(this.state.children).map(this.getChildrenToRender);
      var props = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, tagProps, this.props.componentProps, {
        ref: function ref(c) {
          _this4.currentRef = c;
        }
      });
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
    var animate = _this5.getAnimData(props, key, i, enterOrLeave, end);
    var startAnim = type === 'enter' && (props.forcedReplay || !_this5.childrenShow[key]) ? _this5.getAnimData(props, key, i, enterOrLeave, start) : null;
    var ease = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["e" /* transformArguments */])(props.ease, key, i)[enterOrLeave];
    var duration = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["e" /* transformArguments */])(props.duration, key, i)[enterOrLeave];
    if (Array.isArray(ease)) {
      ease = ease.map(function (num) {
        return num * 100;
      });
      ease = __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["b" /* default */].easing.path('M0,100C' + ease[0] + ',' + (100 - ease[1]) + ',' + ease[2] + ',' + (100 - ease[3]) + ',100,0', { lengthPixel: duration / 16.6667 });
    }
    return { startAnim: startAnim, animate: animate, ease: ease, duration: duration, isArray: Array.isArray(animate) };
  };

  this.getTweenSingleData = function (startAnim, animate, ease, duration, delay, onStart, onComplete) {
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
        var animObj = _this5.getTweenSingleData(start, leave, animateData.ease, animateData.duration / length, !ii ? delay : 0, !ii ? onStart : null, ii === length ? onComplete : null);
        animation.push(animObj.animation);
        if (animObj.startAnimate) {
          startArray.push(animObj.startAnimate);
        }
      });
      return startArray.concat(animation);
    }
    animateData = _this5.getTweenSingleData(startAnim, animate, animateData.ease, animateData.duration, delay, onStart, onComplete);
    return [animateData.startAnimate, animateData.animation].filter(function (item) {
      return item;
    });
  };

  this.getAnimData = function (props, key, i, enterOrLeave, startOrEnd) {
    /**
     * transformArguments 第一个为 enter, 第二个为 leave；
     * getTweenAnimConfig or getTweenType 第一个为到达的位置， 第二个为开始的位置。
     * 用 tween-one 的数组来实现老的动画逻辑。。。
     */
    return props.animConfig ? _this5.getTweenAnimConfig(Object(__WEBPACK_IMPORTED_MODULE_11__utils__["e" /* transformArguments */])(props.animConfig, key, i)[enterOrLeave], startOrEnd, enterOrLeave) : _this5.getTweenType(Object(__WEBPACK_IMPORTED_MODULE_11__utils__["e" /* transformArguments */])(props.type, key, i)[enterOrLeave], startOrEnd);
  };

  this.getChildrenToRender = function (child) {
    var _props2 = _this5.props,
        forcedReplay = _props2.forcedReplay,
        leaveReverse = _props2.leaveReverse,
        delay = _props2.delay,
        interval = _props2.interval;

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
    var ref = function ref() {
      delete _this5.childRefs[key];
    };
    // 处理出场
    if (i >= 0) {
      if (_this5.leaveUnfinishedChild.indexOf(key) >= 0) {
        return _this5.saveTweenOneTag[key];
      }
      var $interval = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["e" /* transformArguments */])(interval, key, i)[1];
      var $delay = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["e" /* transformArguments */])(delay, key, i)[1];
      // 减掉 leaveUnfinishedChild 里的个数，因为 leaveUnfinishedChild 是旧的出场，不应该计录在队列里。
      var order = (leaveReverse ? _this5.keysToLeave.length - i - 1 : i) - _this5.leaveUnfinishedChild.length;
      $delay = $interval * order + $delay;
      animation = _this5.getTweenEnterOrLeaveData(key, i, $delay, 'leave');
    } else {
      // 处理进场;
      i = _this5.keysToEnterToCallback.indexOf(key);
      ref = function ref(c) {
        _this5.childRefs[key] = c && c.currentRef ? c.currentRef : c;
      };
      // appear=false 时，设定 childrenShow 和 tweenToEnter 都为 true, 这里不渲染 animation;
      if (_this5.tweenToEnter[key] && !forcedReplay) {
        // 如果是已进入的，将直接返回标签。。
        return Object(__WEBPACK_IMPORTED_MODULE_7_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["b" /* default */], {
          key: key,
          component: child.type,
          forcedJudg: forcedJudg,
          componentProps: child.props,
          ref: ref
        });
      } else if (!_this5.tweenToEnter[key]) {
        animation = _this5.enterAnimation[key] || _this5.getTweenEnterOrLeaveData(key, i, 0, 'enter');
        _this5.enterAnimation[key] = animation;
      }
    }
    var paused = _this5.keysToEnterPaused[key] && _this5.keysToLeave.indexOf(key) === -1;
    animation = paused ? null : animation;
    var tag = Object(__WEBPACK_IMPORTED_MODULE_7_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["b" /* default */], {
      key: key,
      component: child.type,
      forcedJudg: forcedJudg,
      componentProps: child.props,
      animation: animation,
      ref: ref
    });
    _this5.saveTweenOneTag[key] = tag;
    return tag;
  };

  this.performEnter = function (key, i) {
    var interval = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["e" /* transformArguments */])(_this5.props.interval, key, i)[0];
    var delay = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["e" /* transformArguments */])(_this5.props.delay, key, i)[0];
    _this5.placeholderTimeoutIds[key] = __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["c" /* ticker */].timeout(_this5.performEnterBegin.bind(_this5, key), interval * i + delay);
    if (_this5.keysToEnter.indexOf(key) >= 0) {
      _this5.keysToEnter.splice(_this5.keysToEnter.indexOf(key), 1);
    }
  };

  this.performEnterBegin = function (key) {
    var childrenShow = _this5.state.childrenShow;
    childrenShow[key] = true;
    delete _this5.keysToEnterPaused[key];
    __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["c" /* ticker */].clear(_this5.placeholderTimeoutIds[key]);
    delete _this5.placeholderTimeoutIds[key];
    _this5.isInsideRender = true;
    _this5.setState({ childrenShow: childrenShow });
  };

  this.performLeave = function (key) {
    __WEBPACK_IMPORTED_MODULE_9_rc_tween_one__["c" /* ticker */].clear(_this5.placeholderTimeoutIds[key]);
    delete _this5.placeholderTimeoutIds[key];
  };

  this.enterBegin = function (key, e) {
    var elem = e.target;
    var animatingClassName = _this5.props.animatingClassName;
    elem.className = elem.className.replace(animatingClassName[1], '');
    if (elem.className.indexOf(animatingClassName[0]) === -1) {
      elem.className = (elem.className + ' ' + animatingClassName[0]).trim();
    }
    _this5.childrenShow[key] = true;
  };

  this.enterComplete = function (key, e) {
    if (_this5.keysToEnterPaused[key] || _this5.keysToLeave.indexOf(key) >= 0) {
      return;
    }
    var elem = e.target;
    elem.className = elem.className.replace(_this5.props.animatingClassName[0], '').trim();
    _this5.tweenToEnter[key] = true;
    delete _this5.enterAnimation[key];
    _this5.props.onEnd({ key: key, type: 'enter', target: elem });
  };

  this.leaveBegin = function (key, e) {
    var elem = e.target;
    var animatingClassName = _this5.props.animatingClassName;
    elem.className = elem.className.replace(animatingClassName[0], '');
    if (elem.className.indexOf(animatingClassName[1]) === -1) {
      elem.className = (elem.className + ' ' + animatingClassName[1]).trim();
    }
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
    delete _this5.childrenShow[key];
    if (_this5.keysToLeave.indexOf(key) >= 0) {
      _this5.keysToLeave.splice(_this5.keysToLeave.indexOf(key), 1);
    }
    var needLeave = _this5.keysToLeave.some(function (c) {
      return childrenShow[c];
    });
    if (!needLeave) {
      var currentChildren = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["d" /* toArrayChildren */])(Object(__WEBPACK_IMPORTED_MODULE_11__utils__["b" /* getChildrenFromProps */])(_this5.props));
      _this5.isInsideRender = true;
      _this5.setState({
        children: currentChildren,
        childrenShow: childrenShow
      });
    }
    var elem = e.target;
    elem.className = elem.className.replace(_this5.props.animatingClassName[1], '').trim();
    _this5.props.onEnd({ key: key, type: 'leave', target: elem });
  };
};

QueueAnim.isQueueAnim = true;
/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_10_react_lifecycles_compat__["a" /* polyfill */])(QueueAnim));

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(23);

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

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(24), __esModule: true };

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(25);
module.exports = __webpack_require__(7).Array.from;


/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(38);
var $export = __webpack_require__(13);
var toObject = __webpack_require__(36);
var call = __webpack_require__(26);
var isArrayIter = __webpack_require__(27);
var toLength = __webpack_require__(53);
var createProperty = __webpack_require__(28);
var getIterFn = __webpack_require__(29);

$export($export.S + $export.F * !__webpack_require__(31)(function (iter) { Array.from(iter); }), 'Array', {
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

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(17);
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

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(11);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(12);
var createDesc = __webpack_require__(18);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(30);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(11);
module.exports = __webpack_require__(7).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(40);
var TAG = __webpack_require__(1)('toStringTag');
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

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
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

/***/ 32:
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

/***/ 33:
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

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__AnimateChild__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util_animate__ = __webpack_require__(16);












var defaultKey = 'rc_animate_' + Date.now();

function getChildrenFromProps(props) {
  var children = props.children;
  if (__WEBPACK_IMPORTED_MODULE_6_react___default.a.isValidElement(children)) {
    if (!children.key) {
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(children, {
        key: defaultKey
      });
    }
  }
  return children;
}

function noop() {}

var Animate = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Animate, _React$Component);

  // eslint-disable-line

  function Animate(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Animate);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).call(this, props));

    _initialiseProps.call(_this);

    _this.currentlyAnimatingKeys = {};
    _this.keysToEnter = [];
    _this.keysToLeave = [];

    _this.state = {
      children: Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(props))
    };

    _this.childrenRefs = {};
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Animate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var showProp = this.props.showProp;
      var children = this.state.children;
      if (showProp) {
        children = children.filter(function (child) {
          return !!child.props[showProp];
        });
      }
      children.forEach(function (child) {
        if (child) {
          _this2.performAppear(child.key);
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      this.nextProps = nextProps;
      var nextChildren = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(nextProps));
      var props = this.props;
      // exclusive needs immediate response
      if (props.exclusive) {
        Object.keys(this.currentlyAnimatingKeys).forEach(function (key) {
          _this3.stop(key);
        });
      }
      var showProp = props.showProp;
      var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
      // last props children if exclusive
      var currentChildren = props.exclusive ? Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(props)) : this.state.children;
      // in case destroy in showProp mode
      var newChildren = [];
      if (showProp) {
        currentChildren.forEach(function (currentChild) {
          var nextChild = currentChild && Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(nextChildren, currentChild.key);
          var newChild = void 0;
          if ((!nextChild || !nextChild.props[showProp]) && currentChild.props[showProp]) {
            newChild = __WEBPACK_IMPORTED_MODULE_6_react___default.a.cloneElement(nextChild || currentChild, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()({}, showProp, true));
          } else {
            newChild = nextChild;
          }
          if (newChild) {
            newChildren.push(newChild);
          }
        });
        nextChildren.forEach(function (nextChild) {
          if (!nextChild || !Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(currentChildren, nextChild.key)) {
            newChildren.push(nextChild);
          }
        });
      } else {
        newChildren = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["d" /* mergeChildren */])(currentChildren, nextChildren);
      }

      // need render to avoid update
      this.setState({
        children: newChildren
      });

      nextChildren.forEach(function (child) {
        var key = child && child.key;
        if (child && currentlyAnimatingKeys[key]) {
          return;
        }
        var hasPrev = child && Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(currentChildren, key);
        if (showProp) {
          var showInNext = child.props[showProp];
          if (hasPrev) {
            var showInNow = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["b" /* findShownChildInChildrenByKey */])(currentChildren, key, showProp);
            if (!showInNow && showInNext) {
              _this3.keysToEnter.push(key);
            }
          } else if (showInNext) {
            _this3.keysToEnter.push(key);
          }
        } else if (!hasPrev) {
          _this3.keysToEnter.push(key);
        }
      });

      currentChildren.forEach(function (child) {
        var key = child && child.key;
        if (child && currentlyAnimatingKeys[key]) {
          return;
        }
        var hasNext = child && Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(nextChildren, key);
        if (showProp) {
          var showInNow = child.props[showProp];
          if (hasNext) {
            var showInNext = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["b" /* findShownChildInChildrenByKey */])(nextChildren, key, showProp);
            if (!showInNext && showInNow) {
              _this3.keysToLeave.push(key);
            }
          } else if (showInNow) {
            _this3.keysToLeave.push(key);
          }
        } else if (!hasNext) {
          _this3.keysToLeave.push(key);
        }
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var keysToEnter = this.keysToEnter;
      this.keysToEnter = [];
      keysToEnter.forEach(this.performEnter);
      var keysToLeave = this.keysToLeave;
      this.keysToLeave = [];
      keysToLeave.forEach(this.performLeave);
    }
  }, {
    key: 'isValidChildByKey',
    value: function isValidChildByKey(currentChildren, key) {
      var showProp = this.props.showProp;
      if (showProp) {
        return Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["b" /* findShownChildInChildrenByKey */])(currentChildren, key, showProp);
      }
      return Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["a" /* findChildInChildrenByKey */])(currentChildren, key);
    }
  }, {
    key: 'stop',
    value: function stop(key) {
      delete this.currentlyAnimatingKeys[key];
      var component = this.childrenRefs[key];
      if (component) {
        component.stop();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var props = this.props;
      this.nextProps = props;
      var stateChildren = this.state.children;
      var children = null;
      if (stateChildren) {
        children = stateChildren.map(function (child) {
          if (child === null || child === undefined) {
            return child;
          }
          if (!child.key) {
            throw new Error('must set key for <rc-animate> children');
          }
          return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9__AnimateChild__["a" /* default */],
            {
              key: child.key,
              ref: function ref(node) {
                _this4.childrenRefs[child.key] = node;
              },
              animation: props.animation,
              transitionName: props.transitionName,
              transitionEnter: props.transitionEnter,
              transitionAppear: props.transitionAppear,
              transitionLeave: props.transitionLeave
            },
            child
          );
        });
      }
      var Component = props.component;
      if (Component) {
        var passedProps = props;
        if (typeof Component === 'string') {
          passedProps = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
            className: props.className,
            style: props.style
          }, props.componentProps);
        }
        return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          Component,
          passedProps,
          children
        );
      }
      return children[0] || null;
    }
  }]);

  return Animate;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

Animate.isAnimate = true;
Animate.propTypes = {
  className: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string,
  style: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  component: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.any,
  componentProps: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  animation: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  transitionName: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object]),
  transitionEnter: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  transitionAppear: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  exclusive: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  transitionLeave: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool,
  onEnd: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  onEnter: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  onLeave: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  onAppear: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.func,
  showProp: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.node
};
Animate.defaultProps = {
  animation: {},
  component: 'span',
  componentProps: {},
  transitionEnter: true,
  transitionLeave: true,
  transitionAppear: false,
  onEnd: noop,
  onEnter: noop,
  onLeave: noop,
  onAppear: noop
};

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.performEnter = function (key) {
    // may already remove by exclusive
    if (_this5.childrenRefs[key]) {
      _this5.currentlyAnimatingKeys[key] = true;
      _this5.childrenRefs[key].componentWillEnter(_this5.handleDoneAdding.bind(_this5, key, 'enter'));
    }
  };

  this.performAppear = function (key) {
    if (_this5.childrenRefs[key]) {
      _this5.currentlyAnimatingKeys[key] = true;
      _this5.childrenRefs[key].componentWillAppear(_this5.handleDoneAdding.bind(_this5, key, 'appear'));
    }
  };

  this.handleDoneAdding = function (key, type) {
    var props = _this5.props;
    delete _this5.currentlyAnimatingKeys[key];
    // if update on exclusive mode, skip check
    if (props.exclusive && props !== _this5.nextProps) {
      return;
    }
    var currentChildren = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(props));
    if (!_this5.isValidChildByKey(currentChildren, key)) {
      // exclusive will not need this
      _this5.performLeave(key);
    } else if (type === 'appear') {
      if (__WEBPACK_IMPORTED_MODULE_10__util_animate__["a" /* default */].allowAppearCallback(props)) {
        props.onAppear(key);
        props.onEnd(key, true);
      }
    } else if (__WEBPACK_IMPORTED_MODULE_10__util_animate__["a" /* default */].allowEnterCallback(props)) {
      props.onEnter(key);
      props.onEnd(key, true);
    }
  };

  this.performLeave = function (key) {
    // may already remove by exclusive
    if (_this5.childrenRefs[key]) {
      _this5.currentlyAnimatingKeys[key] = true;
      _this5.childrenRefs[key].componentWillLeave(_this5.handleDoneLeaving.bind(_this5, key));
    }
  };

  this.handleDoneLeaving = function (key) {
    var props = _this5.props;
    delete _this5.currentlyAnimatingKeys[key];
    // if update on exclusive mode, skip check
    if (props.exclusive && props !== _this5.nextProps) {
      return;
    }
    var currentChildren = Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["e" /* toArrayChildren */])(getChildrenFromProps(props));
    // in case state change is too fast
    if (_this5.isValidChildByKey(currentChildren, key)) {
      _this5.performEnter(key);
    } else {
      var end = function end() {
        if (__WEBPACK_IMPORTED_MODULE_10__util_animate__["a" /* default */].allowLeaveCallback(props)) {
          props.onLeave(key);
          props.onEnd(key, false);
        }
      };
      if (!Object(__WEBPACK_IMPORTED_MODULE_8__ChildrenUtils__["c" /* isSameChildren */])(_this5.state.children, currentChildren, props.showProp)) {
        _this5.setState({
          children: currentChildren
        }, end);
      } else {
        end();
      }
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Animate);

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(59);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = toArrayChildren;
/* harmony export (immutable) */ __webpack_exports__["a"] = findChildInChildrenByKey;
/* harmony export (immutable) */ __webpack_exports__["b"] = findShownChildInChildrenByKey;
/* unused harmony export findHiddenChildInChildrenByKey */
/* harmony export (immutable) */ __webpack_exports__["c"] = isSameChildren;
/* harmony export (immutable) */ __webpack_exports__["d"] = mergeChildren;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


function toArrayChildren(children) {
  var ret = [];
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(children, function (child) {
    ret.push(child);
  });
  return ret;
}

function findChildInChildrenByKey(children, key) {
  var ret = null;
  if (children) {
    children.forEach(function (child) {
      if (ret) {
        return;
      }
      if (child && child.key === key) {
        ret = child;
      }
    });
  }
  return ret;
}

function findShownChildInChildrenByKey(children, key, showProp) {
  var ret = null;
  if (children) {
    children.forEach(function (child) {
      if (child && child.key === key && child.props[showProp]) {
        if (ret) {
          throw new Error('two child with same key for <rc-animate> children');
        }
        ret = child;
      }
    });
  }
  return ret;
}

function findHiddenChildInChildrenByKey(children, key, showProp) {
  var found = 0;
  if (children) {
    children.forEach(function (child) {
      if (found) {
        return;
      }
      found = child && child.key === key && !child.props[showProp];
    });
  }
  return found;
}

function isSameChildren(c1, c2, showProp) {
  var same = c1.length === c2.length;
  if (same) {
    c1.forEach(function (child, index) {
      var child2 = c2[index];
      if (child && child2) {
        if (child && !child2 || !child && child2) {
          same = false;
        } else if (child.key !== child2.key) {
          same = false;
        } else if (showProp && child.props[showProp] !== child2.props[showProp]) {
          same = false;
        }
      }
    });
  }
  return same;
}

function mergeChildren(prev, next) {
  var ret = [];

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextChildrenPending = {};
  var pendingChildren = [];
  prev.forEach(function (child) {
    if (child && findChildInChildrenByKey(next, child.key)) {
      if (pendingChildren.length) {
        nextChildrenPending[child.key] = pendingChildren;
        pendingChildren = [];
      }
    } else {
      pendingChildren.push(child);
    }
  });

  next.forEach(function (child) {
    if (child && Object.prototype.hasOwnProperty.call(nextChildrenPending, child.key)) {
      ret = ret.concat(nextChildrenPending[child.key]);
    }
    ret.push(child);
  });

  ret = ret.concat(pendingChildren);

  return ret;
}

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_css_animation__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_animate__ = __webpack_require__(16);










var transitionMap = {
  enter: 'transitionEnter',
  appear: 'transitionAppear',
  leave: 'transitionLeave'
};

var AnimateChild = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(AnimateChild, _React$Component);

  function AnimateChild() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, AnimateChild);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (AnimateChild.__proto__ || Object.getPrototypeOf(AnimateChild)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(AnimateChild, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stop();
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(done) {
      if (__WEBPACK_IMPORTED_MODULE_8__util_animate__["a" /* default */].isEnterSupported(this.props)) {
        this.transition('enter', done);
      } else {
        done();
      }
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(done) {
      if (__WEBPACK_IMPORTED_MODULE_8__util_animate__["a" /* default */].isAppearSupported(this.props)) {
        this.transition('appear', done);
      } else {
        done();
      }
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(done) {
      if (__WEBPACK_IMPORTED_MODULE_8__util_animate__["a" /* default */].isLeaveSupported(this.props)) {
        this.transition('leave', done);
      } else {
        // always sync, do not interupt with react component life cycle
        // update hidden -> animate hidden ->
        // didUpdate -> animate leave -> unmount (if animate is none)
        done();
      }
    }
  }, {
    key: 'transition',
    value: function transition(animationType, finishCallback) {
      var _this2 = this;

      var node = __WEBPACK_IMPORTED_MODULE_5_react_dom___default.a.findDOMNode(this);
      var props = this.props;
      var transitionName = props.transitionName;
      var nameIsObj = typeof transitionName === 'object';
      this.stop();
      var end = function end() {
        _this2.stopper = null;
        finishCallback();
      };
      if ((__WEBPACK_IMPORTED_MODULE_7_css_animation__["b" /* isCssAnimationSupported */] || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
        var name = nameIsObj ? transitionName[animationType] : transitionName + '-' + animationType;
        var activeName = name + '-active';
        if (nameIsObj && transitionName[animationType + 'Active']) {
          activeName = transitionName[animationType + 'Active'];
        }
        this.stopper = Object(__WEBPACK_IMPORTED_MODULE_7_css_animation__["a" /* default */])(node, {
          name: name,
          active: activeName
        }, end);
      } else {
        this.stopper = props.animation[animationType](node, end);
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      var stopper = this.stopper;
      if (stopper) {
        this.stopper = null;
        stopper.stop();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return AnimateChild;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

AnimateChild.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  animation: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any,
  transitionName: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.any
};
/* harmony default export */ __webpack_exports__["a"] = (AnimateChild);

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isCssAnimationSupported; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Event__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_component_classes__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_component_classes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_component_classes__);




var isCssAnimationSupported = __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].endEvents.length !== 0;
var capitalPrefixes = ['Webkit', 'Moz', 'O',
// ms is special .... !
'ms'];
var prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];

function getStyleProperty(node, name) {
  // old ff need null, https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
  var style = window.getComputedStyle(node, null);
  var ret = '';
  for (var i = 0; i < prefixes.length; i++) {
    ret = style.getPropertyValue(prefixes[i] + name);
    if (ret) {
      break;
    }
  }
  return ret;
}

function fixBrowserByTimeout(node) {
  if (isCssAnimationSupported) {
    var transitionDelay = parseFloat(getStyleProperty(node, 'transition-delay')) || 0;
    var transitionDuration = parseFloat(getStyleProperty(node, 'transition-duration')) || 0;
    var animationDelay = parseFloat(getStyleProperty(node, 'animation-delay')) || 0;
    var animationDuration = parseFloat(getStyleProperty(node, 'animation-duration')) || 0;
    var time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
    // sometimes, browser bug
    node.rcEndAnimTimeout = setTimeout(function () {
      node.rcEndAnimTimeout = null;
      if (node.rcEndListener) {
        node.rcEndListener();
      }
    }, time * 1000 + 200);
  }
}

function clearBrowserBugTimeout(node) {
  if (node.rcEndAnimTimeout) {
    clearTimeout(node.rcEndAnimTimeout);
    node.rcEndAnimTimeout = null;
  }
}

var cssAnimation = function cssAnimation(node, transitionName, endCallback) {
  var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(transitionName)) === 'object';
  var className = nameIsObj ? transitionName.name : transitionName;
  var activeClassName = nameIsObj ? transitionName.active : transitionName + '-active';
  var end = endCallback;
  var start = void 0;
  var active = void 0;
  var nodeClasses = __WEBPACK_IMPORTED_MODULE_2_component_classes___default()(node);

  if (endCallback && Object.prototype.toString.call(endCallback) === '[object Object]') {
    end = endCallback.end;
    start = endCallback.start;
    active = endCallback.active;
  }

  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = function (e) {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    clearBrowserBugTimeout(node);

    nodeClasses.remove(className);
    nodeClasses.remove(activeClassName);

    __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].removeEndEventListener(node, node.rcEndListener);
    node.rcEndListener = null;

    // Usually this optional end is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (end) {
      end();
    }
  };

  __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].addEndEventListener(node, node.rcEndListener);

  if (start) {
    start();
  }
  nodeClasses.add(className);

  node.rcAnimTimeout = setTimeout(function () {
    node.rcAnimTimeout = null;
    nodeClasses.add(activeClassName);
    if (active) {
      setTimeout(active, 0);
    }
    fixBrowserByTimeout(node);
    // 30ms for firefox
  }, 30);

  return {
    stop: function stop() {
      if (node.rcEndListener) {
        node.rcEndListener();
      }
    }
  };
};

cssAnimation.style = function (node, style, callback) {
  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = function (e) {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    clearBrowserBugTimeout(node);

    __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].removeEndEventListener(node, node.rcEndListener);
    node.rcEndListener = null;

    // Usually this optional callback is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (callback) {
      callback();
    }
  };

  __WEBPACK_IMPORTED_MODULE_1__Event__["a" /* default */].addEndEventListener(node, node.rcEndListener);

  node.rcAnimTimeout = setTimeout(function () {
    for (var s in style) {
      if (style.hasOwnProperty(s)) {
        node.style[s] = style[s];
      }
    }
    node.rcAnimTimeout = null;
    fixBrowserByTimeout(node);
  }, 0);
};

cssAnimation.setTransition = function (node, p, value) {
  var property = p;
  var v = value;
  if (value === undefined) {
    v = property;
    property = '';
  }
  property = property || '';
  capitalPrefixes.forEach(function (prefix) {
    node.style[prefix + 'Transition' + property] = v;
  });
};

cssAnimation.isCssAnimationSupported = isCssAnimationSupported;



/* harmony default export */ __webpack_exports__["a"] = (cssAnimation);

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var START_EVENT_NAME_MAP = {
  transitionstart: {
    transition: 'transitionstart',
    WebkitTransition: 'webkitTransitionStart',
    MozTransition: 'mozTransitionStart',
    OTransition: 'oTransitionStart',
    msTransition: 'MSTransitionStart'
  },

  animationstart: {
    animation: 'animationstart',
    WebkitAnimation: 'webkitAnimationStart',
    MozAnimation: 'mozAnimationStart',
    OAnimation: 'oAnimationStart',
    msAnimation: 'MSAnimationStart'
  }
};

var END_EVENT_NAME_MAP = {
  transitionend: {
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'mozTransitionEnd',
    OTransition: 'oTransitionEnd',
    msTransition: 'MSTransitionEnd'
  },

  animationend: {
    animation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    OAnimation: 'oAnimationEnd',
    msAnimation: 'MSAnimationEnd'
  }
};

var startEvents = [];
var endEvents = [];

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;

  if (!('AnimationEvent' in window)) {
    delete START_EVENT_NAME_MAP.animationstart.animation;
    delete END_EVENT_NAME_MAP.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete START_EVENT_NAME_MAP.transitionstart.transition;
    delete END_EVENT_NAME_MAP.transitionend.transition;
  }

  function process(EVENT_NAME_MAP, events) {
    for (var baseEventName in EVENT_NAME_MAP) {
      if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
        var baseEvents = EVENT_NAME_MAP[baseEventName];
        for (var styleName in baseEvents) {
          if (styleName in style) {
            events.push(baseEvents[styleName]);
            break;
          }
        }
      }
    }
  }

  process(START_EVENT_NAME_MAP, startEvents);
  process(END_EVENT_NAME_MAP, endEvents);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  detectEvents();
}

function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

var TransitionEvents = {
  // Start events
  startEvents: startEvents,

  addStartEventListener: function addStartEventListener(node, eventListener) {
    if (startEvents.length === 0) {
      window.setTimeout(eventListener, 0);
      return;
    }
    startEvents.forEach(function (startEvent) {
      addEventListener(node, startEvent, eventListener);
    });
  },
  removeStartEventListener: function removeStartEventListener(node, eventListener) {
    if (startEvents.length === 0) {
      return;
    }
    startEvents.forEach(function (startEvent) {
      removeEventListener(node, startEvent, eventListener);
    });
  },


  // End events
  endEvents: endEvents,

  addEndEventListener: function addEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      window.setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function (endEvent) {
      addEventListener(node, endEvent, eventListener);
    });
  },
  removeEndEventListener: function removeEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function (endEvent) {
      removeEventListener(node, endEvent, eventListener);
    });
  }
};

/* harmony default export */ __webpack_exports__["a"] = (TransitionEvents);

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

try {
  var index = __webpack_require__(15);
} catch (err) {
  var index = __webpack_require__(15);
}

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re){
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name, force){
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list
    ? this.list.contains(name)
    : !! ~index(this.array(), name);
};


/***/ })

},[100]);
//# sourceMappingURL=link.js.map