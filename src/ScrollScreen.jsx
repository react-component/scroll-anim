import easingTypes from 'tween-functions';
import requestAnimationFrame from 'raf';
import EventListener from './EventDispatcher';
import mapped from './Mapped';

// 设置默认数据
function defaultData(vars) {
  return {
    ease: vars.ease || 'easeInOutQuad',
    duration: vars.duration || 450,
    docHeight: vars.docHeight,
    scrollInterval: vars.scrollInterval || 1000,
    loop: vars.loop || false,
  };
}

const ScrollScreen = {
  init(vars) {
    this.vars = defaultData(vars || {});
    this.rafID = -1;
    this.toHeight = -1;
    this.num = 0;
    this.currentNum = 0;
    ['raf', 'cancelRequestAnimationFrame', 'onWheel', 'startScroll'].forEach((method) => this[method] = this[method].bind(this));
    EventListener.addEventListener('wheel.scrollWheel', this.onWheel);
    // 刚进入时滚动条位置
    setTimeout(this.startScroll);
  },
  startScroll() {
    const _mapped = mapped.getMapped();
    const _arr = _mapped.__arr;
    this.scrollTop = window.pageYOffset;
    _arr.forEach((str, i)=> {
      const dom = _mapped[str];
      const domOffsetTop = dom.offsetTop;
      const domHeight = dom.getBoundingClientRect().height;
      if (this.scrollTop >= domOffsetTop && this.scrollTop < domOffsetTop + domHeight) {
        this.num = i;
        this.toHeight = domOffsetTop;
      }
    });
    // 如果 toHeight === -1 且 this.scrollTop 有值时；
    if (this.toHeight === -1) {
      if (this.scrollTop > 0) {
        const endDom = mapped.get(mapped.getMapped().__arr[mapped.getMapped().__arr.length - 1]);
        const windowHeight = document.documentElement.clientHeight;
        const tooNum = Math.floor((this.scrollTop - endDom.offsetTop - endDom.getBoundingClientRect().height) / windowHeight);
        this.num = mapped.getMapped().__arr.length + tooNum;
        this.currentNum = this.num;
      }
      return;
    }
    if (this.toHeight !== this.scrollTop) {
      this.initTime = Date.now();
      this.rafID = requestAnimationFrame(this.raf);
    } else {
      this.toHeight = -1;
    }
  },
  raf() {
    const duration = this.vars.duration;
    const now = Date.now();
    const progressTime = now - this.initTime > duration ? duration : now - this.initTime;
    const easeValue = easingTypes[this.vars.ease](progressTime, this.scrollTop, this.toHeight, duration);
    window.scrollTo(window.scrollX, easeValue);
    if (progressTime === duration) {
      this.cancelRequestAnimationFrame();
      setTimeout(()=> {
        this.toHeight = -1;
      }, this.vars.scrollInterval);
    } else {
      this.rafID = requestAnimationFrame(this.raf);
    }
  },
  cancelRequestAnimationFrame() {
    requestAnimationFrame.cancel(this.rafID);
    this.rafID = -1;
  },
  onWheel(e) {
    const deltaY = e.deltaY;
    e.preventDefault();
    // console.log(e.wheelDelta,e.deltaY)
    if (this.rafID === -1 && deltaY !== 0 && this.toHeight === -1) {
      // 如果滚动条托动过了，需要获取当前的num;
      const _mapped = mapped.getMapped();
      const _arr = _mapped.__arr;
      const endDom = mapped.get(_arr[_arr.length - 1]);
      const startDom = mapped.get(_arr[0]);
      const windowHeight = document.documentElement.clientHeight;
      this.scrollTop = window.pageYOffset;
      _arr.forEach((str, i)=> {
        const dom = _mapped[str];
        const domOffsetTop = dom.offsetTop;
        const domHeight = dom.getBoundingClientRect().height;
        if (this.scrollTop >= domOffsetTop && this.scrollTop < domOffsetTop + domHeight) {
          this.num = i;
        }
      });
      if (this.scrollTop > endDom.offsetTop + endDom.getBoundingClientRect().height) {
        const tooNum = Math.ceil((this.scrollTop - endDom.offsetTop - endDom.getBoundingClientRect().height) / windowHeight);
        this.num = _arr.length + tooNum;
      } else if (this.scrollTop < startDom.offsetTop) {
        this.num = 0;
      }
      if (deltaY < 0) {
        this.num--;
      } else if (deltaY > 0) {
        this.num++;
      }
      // docHeight: 在 body, html 设了 100% 的情况下,给用户设置，如查没设置用默认的。。
      const docHeight = this.vars.docHeight || document.documentElement.getBoundingClientRect().height;
      const manyHeight = docHeight - endDom.offsetTop - endDom.getBoundingClientRect().height;
      let manyScale = manyHeight ? Math.ceil(manyHeight / windowHeight) : 0;
      manyScale = manyScale > 0 ? manyScale : 0;
      const maxNum = _arr.length + manyScale;
      if (this.vars.loop) {
        this.num = this.num < 0 ? maxNum - 1 : this.num;
        this.num = this.num >= maxNum ? 0 : this.num;
      } else {
        this.num = this.num <= 0 ? 0 : this.num;
        this.num = this.num >= maxNum ? maxNum : this.num;
      }
      if (this.num === this.currentNum) {
        return;
      }
      this.initTime = Date.now();
      const currentDom = mapped.get(mapped.getMapped().__arr[this.num]);
      this.toHeight = currentDom ? currentDom.offsetTop : null;
      this.toHeight = typeof this.toHeight !== 'number' ? endDom.offsetTop + endDom.getBoundingClientRect().height + windowHeight * (this.num - mapped.getMapped().__arr.length) : this.toHeight;
      this.rafID = requestAnimationFrame(this.raf);
      this.currentNum = this.num;
    }
  },
};
export default ScrollScreen.init.bind(ScrollScreen);
