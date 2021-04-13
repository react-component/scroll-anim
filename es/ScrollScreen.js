function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import easingTypes from 'tween-functions';
import requestAnimationFrame from 'raf';
import EventListener from './EventDispatcher';
import { currentScrollTop, getPassive, windowHeight, windowIsUndefined } from './util'; // 设置默认数据

function defaultData(vars) {
  return {
    ease: vars.ease || 'easeInOutQuad',
    duration: vars.duration || 450,
    docHeight: vars.docHeight,
    scrollInterval: vars.scrollInterval || 1000,
    loop: vars.loop || false,
    location: vars.location || []
  };
}

var passive = getPassive();

var ScrollScreenClass = function ScrollScreenClass() {
  var _this = this;

  _classCallCheck(this, ScrollScreenClass);

  _defineProperty(this, "init", function (vars) {
    _this.vars = defaultData(vars || {});
    _this.rafID = -1;
    _this.toHeight = -1;
    _this.num = 0;

    if (windowIsUndefined) {
      return;
    }

    EventListener.addEventListener('wheel.scrollWheel', _this.onWheel, null, passive); // dom 在 didMount 后高度没出来，加 setTimeout; 

    setTimeout(_this.startScroll);
  });

  _defineProperty(this, "unMount", function () {
    EventListener.removeEventListener('wheel.scrollWheel', _this.onWheel);
  });

  _defineProperty(this, "setCurrentNNum", function () {
    var mapped = _this.mapped;
    var winHeight = windowHeight();

    if (!mapped.length) {
      // 如果是空，采用一屏一滚;
      var docHeight = _this.vars.docHeight || document.body.scrollHeight;
      var scrollTopNum = _this.scrollTop / winHeight;
      var docTopNum = docHeight / winHeight;
      var docEndScreenHeight = docHeight % winHeight;
      var currentOffset = _this.scrollTop % winHeight;
      var currentTopScreen = Math.floor(scrollTopNum); // 判断最后一屏是否过中间 

      var currentScreen = Math.ceil(scrollTopNum) === Math.floor(docTopNum) ? currentOffset / docEndScreenHeight : currentOffset / winHeight;
      _this.num = Math.round(currentTopScreen + currentScreen);
      _this.toHeight = _this.num * winHeight;
    } else {
      mapped.forEach(function (dom, i) {
        var domOffsetTop = dom.offsetTop;
        var domHeight = dom.getBoundingClientRect().height;

        if (_this.scrollTop >= domOffsetTop && _this.scrollTop < domOffsetTop + domHeight) {
          var exceed = (_this.scrollTop - dom.offsetTop) / domHeight; // 当前屏超过80%到下半屏, scrollOverPack 会动态改高度；

          exceed = exceed > 0.8 ? 1 : 0;
          _this.num = i + exceed;
          _this.toHeight = domOffsetTop + exceed * domHeight;
        }
      });
      var tooNum;
      var endDom = mapped[mapped.length - 1];
      var startDom = mapped[0];
      var startManyHeight = startDom.offsetTop;

      if (_this.scrollTop > endDom.offsetTop + endDom.getBoundingClientRect().height) {
        tooNum = Math.ceil((_this.scrollTop - endDom.offsetTop - endDom.getBoundingClientRect().height) / winHeight);
        _this.num = mapped.length + tooNum;
        _this.toHeight = endDom.offsetTop + endDom.getBoundingClientRect().height + tooNum * winHeight;
      } else if (_this.scrollTop < startManyHeight) {
        var t = _this.scrollTop - startManyHeight;
        tooNum = t > 0 ? Math.ceil(t / winHeight) : Math.floor(t / winHeight);
        _this.num = tooNum;
        var tc = Math.ceil(startManyHeight / winHeight);
        _this.toHeight = (tc + tooNum) * winHeight;
      }
    }
  });

  _defineProperty(this, "startScroll", function () {
    var mapped = _this.vars.location.map(function (str) {
      return document.getElementById(str);
    }).filter(function (c) {
      return c;
    });

    _this.mapped = mapped;
    _this.scrollTop = currentScrollTop();
    _this.animEndScrollTop = _this.scrollTop;

    _this.setCurrentNNum();

    if (mapped[0] && mapped[0].offsetTop >= windowHeight()) {
      console.warn("Warning: The first screen is not at the top, which may lead to poor scrolling effect, \"".concat(_this.vars.location[0], "\" offsetTop ").concat(mapped[0].offsetTop, "px."));
    }

    if (_this.toHeight !== _this.scrollTop) {
      _this.initTime = Date.now();
      _this.rafID = requestAnimationFrame(_this.raf);
    } else {
      _this.toHeight = -1;
    }
  });

  _defineProperty(this, "raf", function () {
    var duration = _this.vars.duration;
    var now = Date.now();
    var progressTime = now - _this.initTime > duration ? duration : now - _this.initTime;

    var easeValue = easingTypes[_this.vars.ease](progressTime, _this.scrollTop, _this.toHeight, duration);

    _this.animEndScrollTop = easeValue;
    window.scrollTo(window.scrollX, easeValue);

    if (progressTime === duration) {
      _this.cancelRequestAnimationFrame();

      setTimeout(function () {
        _this.toHeight = -1;
      }, _this.vars.scrollInterval);
    } else {
      _this.rafID = requestAnimationFrame(_this.raf);
    }
  });

  _defineProperty(this, "cancelRequestAnimationFrame", function () {
    requestAnimationFrame.cancel(_this.rafID);
    _this.rafID = -1;
  });

  _defineProperty(this, "getComputedStyle", function (dom) {
    return dom && document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(dom) : {};
  });

  _defineProperty(this, "isScroll", function (dom, deltaY) {
    var style = _this.getComputedStyle(dom);

    var overflow = style.overflow;
    var overflowY = style.overflowY;
    var isScrollOverflow = overflow === 'auto' || overflow === 'scroll' || overflow === 'overlay' || overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay'; // dom.parentNode === document 解决在滚动条上滚动取不到 body;

    if (dom === document.body || !dom || dom.parentNode === document) {
      return false;
    } else if (dom.scrollHeight > dom.offsetHeight && isScrollOverflow && dom.scrollTop + dom.offsetHeight + deltaY < dom.scrollHeight && dom.scrollTop + deltaY > 0) {
      return true;
    }

    return _this.isScroll(dom.parentNode, deltaY);
  });

  _defineProperty(this, "limitNum", function (min, max) {
    if (_this.vars.loop) {
      _this.num = _this.num < min ? max : _this.num;
      _this.num = _this.num > max ? min : _this.num;
    } else {
      _this.num = _this.num < min ? min : _this.num;
      _this.num = _this.num > max ? max : _this.num;
    }
  });

  _defineProperty(this, "onWheel", function (e) {
    var deltaY = e.deltaY;

    if (_this.isScroll(e.target, deltaY)) {
      return;
    }

    e.preventDefault();
    var mapped = _this.mapped;

    if (_this.rafID === -1 && deltaY !== 0 && _this.toHeight === -1) {
      var winHeight = windowHeight();
      _this.scrollTop = currentScrollTop();
      var docHeight = _this.vars.docHeight || document.body.scrollHeight;

      if (_this.animEndScrollTop !== _this.scrollTop) {
        _this.setCurrentNNum();
      }

      if (deltaY < 0) {
        _this.num--;
      } else if (deltaY > 0) {
        _this.num++;
      }

      if (mapped.length) {
        var endDom = mapped[mapped.length - 1];
        var startDom = mapped[0];
        var startManyHeight = startDom.offsetTop;
        var startManyScale = startManyHeight ? Math.ceil(startManyHeight / winHeight) : 0;
        var manyHeight = docHeight - endDom.offsetTop - endDom.getBoundingClientRect().height;
        var manyScale = manyHeight ? Math.ceil(manyHeight / winHeight) : 0;

        _this.limitNum(-startManyScale, mapped.length - 1 + manyScale);

        var currentDom = mapped[_this.num];
        _this.toHeight = currentDom ? currentDom.offsetTop : (startManyScale + _this.num) * winHeight;
        _this.toHeight = _this.toHeight < 0 ? 0 : _this.toHeight;
        _this.toHeight = _this.toHeight > docHeight - winHeight ? docHeight - winHeight : _this.toHeight;
      } else {
        _this.limitNum(0, Math.floor(docHeight / winHeight));

        _this.toHeight = winHeight * _this.num;
      }

      _this.initTime = Date.now();
      _this.rafID = requestAnimationFrame(_this.raf);
    }
  });
};

var ScrollScreen = new ScrollScreenClass();
export default {
  init: ScrollScreen.init,
  unMount: ScrollScreen.unMount
};