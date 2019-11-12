import easingTypes from 'tween-functions';
import requestAnimationFrame from 'raf';
import EventListener from './EventDispatcher';
import { currentScrollTop, getPassive, windowHeight, windowIsUndefined } from './util';

// 设置默认数据
function defaultData(vars) {
  return {
    ease: vars.ease || 'easeInOutQuad',
    duration: vars.duration || 450,
    docHeight: vars.docHeight,
    scrollInterval: vars.scrollInterval || 1000,
    loop: vars.loop || false,
    location: vars.location || [],
  };
}

const passive = getPassive();

class ScrollScreenClass {
  init = (vars) => {
    this.vars = defaultData(vars || {});
    this.rafID = -1;
    this.toHeight = -1;
    this.num = 0;
    if (windowIsUndefined) {
      return;
    }
    EventListener.addEventListener('wheel.scrollWheel', this.onWheel, null, passive);
    // dom 在 didMount 后高度没出来，加 setTimeout; 
    setTimeout(this.startScroll);
  }
  unMount = () => {
    EventListener.removeEventListener('wheel.scrollWheel', this.onWheel);
  }
  setCurrentNNum = () => {
    const mapped = this.mapped;
    const winHeight = windowHeight();
    if (!mapped.length) {
      // 如果是空，采用一屏一滚;
      const docHeight = this.vars.docHeight || document.body.scrollHeight;
      const scrollTopNum = this.scrollTop / winHeight;
      const docTopNum = docHeight / winHeight;
      const docEndScreenHeight = docHeight % winHeight;
      const currentOffset = this.scrollTop % winHeight;
      const currentTopScreen = Math.floor(scrollTopNum);
      // 判断最后一屏是否过中间 
      const currentScreen = Math.ceil(scrollTopNum) === Math.floor(docTopNum) ?
        currentOffset / docEndScreenHeight : currentOffset / winHeight;
      this.num = Math.round(currentTopScreen + currentScreen);
      this.toHeight = this.num * winHeight;
    } else {
      mapped.forEach((dom, i) => {
        const domOffsetTop = dom.offsetTop;
        const domHeight = dom.getBoundingClientRect().height;
        if (this.scrollTop >= domOffsetTop && this.scrollTop < domOffsetTop + domHeight) {
          this.num = i;
          this.toHeight = domOffsetTop;
        }
      });
      let tooNum;
      const endDom = mapped[mapped.length - 1];
      const startDom = mapped[0];
      const startManyHeight = startDom.offsetTop;

      if (this.scrollTop > endDom.offsetTop + endDom.getBoundingClientRect().height) {
        tooNum = Math.ceil((this.scrollTop - endDom.offsetTop -
          endDom.getBoundingClientRect().height) / winHeight);
        this.num = mapped.length + tooNum;
        this.toHeight = endDom.offsetTop + endDom.getBoundingClientRect().height + tooNum * winHeight;
      } else if (this.scrollTop < startManyHeight) {
        const t = this.scrollTop - startManyHeight;
        tooNum = t > 0 ? Math.ceil(t / winHeight) : Math.floor(t / winHeight);
        this.num = tooNum;
        const tc = Math.ceil(startManyHeight / winHeight);
        this.toHeight = (tc + tooNum) * winHeight;
      }
    }
  }
  startScroll = () => {
    const mapped = this.vars.location.map(str => document.getElementById(str)).filter(c => c);
    this.mapped = mapped;
    this.scrollTop = currentScrollTop();
    this.animEndScrollTop = this.scrollTop;
    this.setCurrentNNum();
    if (mapped[0] && mapped[0].offsetTop >= windowHeight()) {
      console.warn(`Warning: The first screen is not at the top, which may lead to poor scrolling effect, "${
        this.vars.location[0]}" offsetTop ${mapped[0].offsetTop}px.`)
    }
    if (this.toHeight !== this.scrollTop) {
      this.initTime = Date.now();
      this.rafID = requestAnimationFrame(this.raf);
    } else {
      this.toHeight = -1;
    }
  }
  raf = () => {
    const duration = this.vars.duration;
    const now = Date.now();
    const progressTime = now - this.initTime > duration ? duration : now - this.initTime;
    const easeValue = easingTypes[this.vars.ease](progressTime, this.scrollTop,
      this.toHeight, duration);
    this.animEndScrollTop = easeValue;
    window.scrollTo(window.scrollX, easeValue);
    if (progressTime === duration) {
      this.cancelRequestAnimationFrame();
      setTimeout(() => {
        this.toHeight = -1;
      }, this.vars.scrollInterval);
    } else {
      this.rafID = requestAnimationFrame(this.raf);
    }
  }
  cancelRequestAnimationFrame = () => {
    requestAnimationFrame.cancel(this.rafID);
    this.rafID = -1;
  }
  getComputedStyle = (dom) => {
    return dom && document.defaultView && document.defaultView.getComputedStyle ?
      document.defaultView.getComputedStyle(dom) : {};
  }
  isScroll = (dom) => {
    const style = this.getComputedStyle(dom);
    const overflow = style.overflow;
    const overflowY = style.overflowY;
    const isScrollOverflow = overflow === 'auto' || overflow === 'scroll' || overflow === 'overlay'
      || overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';
    if (dom === document.body || !dom) {
      return false;
    } else if (dom.scrollHeight > dom.offsetHeight
      && isScrollOverflow
      && dom.scrollTop < dom.scrollHeight) {
      return true;
    }
    return this.isScroll(dom.parentNode);
  }
  limitNum = (min, max) => {
    if (this.vars.loop) {
      this.num = this.num < min ? max : this.num;
      this.num = this.num > max ? min : this.num;
    } else {
      this.num = this.num < min ? min : this.num;
      this.num = this.num > max ? max : this.num;
    }
  }
  onWheel = (e) => {
    e.preventDefault();
    if (this.isScroll(e.target)) {
      return;
    }
    const deltaY = e.deltaY;
    const mapped = this.mapped;
    if (this.rafID === -1 && deltaY !== 0 && this.toHeight === -1) {
      const winHeight = windowHeight();
      this.scrollTop = currentScrollTop();
      const docHeight = this.vars.docHeight || document.body.scrollHeight;
      if (this.animEndScrollTop !== this.scrollTop) {
        this.setCurrentNNum();
      }
      if (deltaY < 0) {
        this.num--;
      } else if (deltaY > 0) {
        this.num++;
      }
      if (mapped.length) {
        const endDom = mapped[mapped.length - 1];
        const startDom = mapped[0];
        const startManyHeight = startDom.offsetTop;
        const startManyScale = startManyHeight ? Math.ceil(startManyHeight / winHeight) : 0;
        const manyHeight = docHeight - endDom.offsetTop -
          endDom.getBoundingClientRect().height;
        const manyScale = manyHeight ? Math.ceil(manyHeight / winHeight) : 0;
        this.limitNum(-startManyScale, mapped.length - 1 + manyScale);
        const currentDom = mapped[this.num];
        this.toHeight = currentDom ? currentDom.offsetTop : (startManyScale + this.num) * winHeight;
        this.toHeight = this.toHeight < 0 ? 0 : this.toHeight;
        this.toHeight = this.toHeight > docHeight - winHeight ?
          (docHeight - winHeight) : this.toHeight;
      } else {
        this.limitNum(0, Math.floor(docHeight / winHeight));
        this.toHeight = winHeight * this.num;
      }
      this.initTime = Date.now();
      this.rafID = requestAnimationFrame(this.raf);
    }
  }
}

const ScrollScreen = new ScrollScreenClass();
export default {
  init: ScrollScreen.init,
  unMount: ScrollScreen.unMount,
};
