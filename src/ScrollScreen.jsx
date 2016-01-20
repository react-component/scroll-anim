import easingTypes from 'tween-functions';
import requestAnimationFrame from 'raf';
import EventListener from './EventDispatcher';
import mapped from './Mapped';

// 设置默认数据
function defaultData(vars) {
  return {
    ease: vars.ease || 'easeInOutQuad',
    duration: vars.duration || 450,
    scrollInterval: vars.scrollInterval || 1000,
  };
}

const ScrollScreen = {
  init(vars) {
    this.vars = defaultData(vars);
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
    this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;// window.pageXOffset;
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
      if (deltaY < 0) {
        this.num--;
      } else if (deltaY > 0) {
        this.num++;
      }
      this.num = this.num <= 0 ? 0 : this.num;
      const docHeight = document.documentElement.getBoundingClientRect().height;
      const windowHeight = document.documentElement.clientHeight;
      const endDom = mapped.get(mapped.getMapped().__arr[mapped.getMapped().__arr.length - 1]);
      const manyHeight = docHeight - endDom.offsetTop - endDom.getBoundingClientRect().height;
      const manyScale = manyHeight ? Math.ceil(manyHeight / windowHeight) : 0;
      const maxNum = mapped.getMapped().__arr.length - 1 + manyScale;
      this.num = this.num >= maxNum ? maxNum : this.num;
      if (this.num === this.currentNum) {
        return;
      }
      this.initTime = Date.now();
      this.scrollTop = window.pageYOffset;
      const currentDom = mapped.get(mapped.getMapped().__arr[this.num]);
      this.toHeight = currentDom ? currentDom.offsetTop : null;
      this.toHeight = typeof this.toHeight !== 'number' ? endDom.offsetTop + endDom.getBoundingClientRect().height + windowHeight * (this.num - mapped.getMapped().__arr.length) : this.toHeight;
      this.rafID = requestAnimationFrame(this.raf);
      this.currentNum = this.num;
    }
  },
};
export default ScrollScreen.init.bind(ScrollScreen);
