import React from 'react';
import ReactDom from 'react-dom';
import assign from 'object-assign';
import EventListener from './EventDispatcher';
import easingTypes from 'tween-functions';
import Css from './Css';
import {dataToArray, objectEqual} from './util';

const DEFAULT_EASING = 'easeInOutQuad';

function noop() {
}

function playScaleToArray(playScale) {
  if (Array.isArray(playScale)) {
    if (playScale.length === 2) {
      return playScale;
    }
    return [(playScale[0] || 0), (playScale[1] || 1)];
  } else if (playScale) {
    return [playScale, 1];
  }
  return [0, 1];
}

// 设置默认数据
function defaultData(vars, initScale) {
  return {
    ease: vars.ease || DEFAULT_EASING,
    playScale: playScaleToArray(vars.playScale), // 开始播放与结束的比例，数组形式，[0,1],0为开始阶段，1为结束，屏幕的百分比
    initScale: initScale, // 启动的百分比
    onUpdate: vars.onUpdate || noop,
    onStart: vars.onStart || noop,
    onComplete: vars.onComplete || noop,
  };
}

class ScrollParallax extends React.Component {
  constructor() {
    super(...arguments);
    this.style = this.props.style || {};
    this.defaultData = [];
    this.parallaxStart = {};
    this.setDefaultData(this.props.vars || {});
    this.state = {
      style: this.style,
    };
    [
      'scrollEventListener',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.dom = ReactDom.findDOMNode(this);
    this.computedStyle = document.defaultView.getComputedStyle(this.dom);

    // height为100％时没刷新高，需要setTimeout
    setTimeout(()=> {
      const date = Date.now();
      const length = EventListener._listeners.scroll ? EventListener._listeners.scroll.length : 0;
      this.eventType = 'scroll.scrollEvent' + date + length;
      this.scrollEventListener();
      EventListener.addEventListener(this.eventType, this.scrollEventListener);
    });
  }

  componentWillReceiveProps(nextProps) {
    const equal = objectEqual(this.props.vars, nextProps.vars);

    if (!equal) {
      this.parallaxStart = {};
      this.defaultData = [];
      this.setDefaultData(nextProps.vars || {});
    }
    const styleEqual = objectEqual(this.props.style, nextProps.style);
    if (!styleEqual) {
      const style = assign({}, this.state.style, nextProps.style);
      this.setState({
        style,
      });
    }
  }

  componentWillUnmount() {
    EventListener.removeEventListener(this.eventType, this.scrollEventListener);
  }

  setDefaultData(_vars) {
    const vars = dataToArray(_vars);
    let time = 0;
    const varsForIn = (item, i)=> {
      time += playScaleToArray(item.playScale)[0] || 0;
      const parallaxData = defaultData(item, time);
      parallaxData.data = {};
      for (const p in item) {
        if (!(p in parallaxData)) {
          parallaxData.data[p] = item[p];
        }
      }
      time += parallaxData.playScale[1];
      this.defaultData[i] = parallaxData;
    };
    vars.forEach(varsForIn);
  }

  setStartStyle(newStyle, p, i, cssName) {
    const cssStyleForEach = (item)=> {
      const _item = item.replace(/[(|)]/ig, '$').split('$');
      this.parallaxStart[i][_item[0]] = _item[1];
    };
    if (cssName === 'transform' || cssName === 'filter') {
      if (!this.parallaxStart.end['Bool' + i]) {
        if (newStyle && newStyle[cssName]) {
          const cssStyleArr = newStyle[cssName].split(' ');
          if (cssName === 'transform') {
            cssStyleArr.forEach(cssStyleForEach);
            this.parallaxStart[i][p] = Css.mergeTransformName(cssStyleArr, p) || this.parallaxStart[i][p];
          } else {
            this.parallaxStart[i][p] = cssStyleArr.length ? cssStyleArr.join(' ') : 0;
          }
        }
        this.parallaxStart.end['Bool' + i] = true;
      }
    }
  }

  getNewStyle(newStyle, easeValue, i, p, _value, cssName) {
    if (cssName === 'transform') {
      this.parallaxStart.end[p] = Css.getParam(p, _value, easeValue);

      const cTransform = newStyle.transform;
      let str = '';
      if (cTransform) {
        cTransform.split(' ').forEach((_str)=> {
          if (_str.indexOf('perspective') >= 0) {
            str = _str;
          }
        });
      }
      for (const _p in newStyle) {
        if (Css.isTransform(_p) === 'transform') {
          str = Css.mergeStyle(newStyle.transform, str);
        }
      }
      for (const _p in this.parallaxStart.end) {
        if (Css.isTransform(_p) === 'transform') {
          str = Css.mergeStyle(str, this.parallaxStart.end[_p]);
        }
      }
      return str;
    } else if (cssName === 'filter') {
      return Css.mergeStyle(newStyle[cssName] || '', Css.getFilterParam(this.parallaxStart[i][p], _value, easeValue));
    }
    return Css.getParam(p, _value, easeValue);
  }

  mergeDataToEase(easeValue, _value, parallaxStart, cssName) {
    let endData;
    let startData;
    // 转成Array为阴影与颜色
    let start = parallaxStart;
    endData = dataToArray(parseFloat(_value));
    startData = dataToArray(parseFloat(start === 'auto' || start === 'none' ? 0 : start));
    if (typeof _value === 'string' && _value.charAt(1) === '=') {
      endData = dataToArray(parseFloat(start) + parseFloat(_value.charAt(0) + 1) * parseFloat(_value.substr(2)));
    }
    if (cssName.indexOf('color') >= 0 || cssName.indexOf('Color') >= 0) {
      endData = Css.parseColor(_value);
      endData[3] = endData[3] || 1;
      startData = Css.parseColor(start);
      startData[3] = startData[3] || 1;
    } else if (cssName.indexOf('shadow') >= 0 || cssName.indexOf('Shadow') >= 0) {
      start = start === 'none' ? '0 0 0 transparent' : start;
      startData = Css.parseShadow(start);
      endData = Css.parseShadow(_value);
    } else if (cssName === 'filter') {
      return easeValue;
    }
    return endData.map((data, ii)=> {
      const startD = startData[ii];
      return (parseFloat(data) - parseFloat(startD)) * easeValue + parseFloat(startD);
    });
  }

  scrollEventListener() {
    const scrollTop = window.pageYOffset;
    const clientHeight = document.documentElement.clientHeight;

    const newStyle = this.style;

    this.defaultData.forEach((item, i)=> {
      const playHeight = clientHeight * item.initScale;
      // 屏幕缩放时的响应，所以放回这里，offsetTop 与 marginTop 有关联，所以减掉；
      // rotateY 或 rotateＸ 时对 getBoundingClientRect 受到影响。所以把 dom 的 transform 设为 none 后再取 getBoundingClientRect 的 top 值
      const isTransform = Object.keys(item.data).some(c => Css.isTransform(c) === 'transform');
      if (isTransform) {
        this.dom.style.transform = 'none';
      }
      const offsetTop = this.dom.getBoundingClientRect().top + scrollTop - parseFloat(this.computedStyle.marginTop);
      if (isTransform) {
        Object.keys(this.state.style).forEach(key=> {
          if (key === 'transform') {
            this.dom.style[key] = this.state.style[key];
          }
        });
      }
      const elementShowHeight = scrollTop - offsetTop + clientHeight;
      // start与end;
      const start = 0;
      const end = 1;
      // 百分比；
      let progress = (elementShowHeight - playHeight ) / (clientHeight * (item.playScale[1] - item.playScale[0]));
      progress = progress >= 1 ? 1 : progress;
      progress = progress <= 0 ? 0 : progress;
      // 缓动参数；
      const easeValue = easingTypes[item.ease](progress, start, end, 1);

      if (!item.onStart.only) {
        item.onStart();
        item.onStart.only = true;
      }

      item.onUpdate(easeValue);
      Object.keys(item.data).forEach((_p)=> {
        const _value = item.data[_p];
        const p = Css.getGsapType(_p);
        const cssName = Css.isTransform(p);
        this.parallaxStart[i] = this.parallaxStart[i] || {};
        this.parallaxStart.end = this.parallaxStart.end || {};
        this.parallaxStart[i][p] = this.parallaxStart[i][p] || this.computedStyle[p] || 0;
        // 设置初始状态；
        this.setStartStyle(newStyle, p, i, cssName);

        // 把缓动合并把数据里；
        const easeValueMergeData = this.mergeDataToEase(easeValue, _value, this.parallaxStart[i][p], cssName);
        // 生成样式；
        newStyle[cssName] = this.getNewStyle(newStyle, easeValueMergeData, i, p, _value, cssName);
      });

      // 到达
      if (progress >= 1) {
        item.end = true;
        item.onComplete();
      }
    });
    this.setState({
      style: newStyle,
    });

    // 如果不一直靠滚动来执行动画，always=false而且动画全执行完了，，删除scrollEvent;
    if (this.defaultData.every(c=>c.end) && !this.props.always) {
      EventListener.removeEventListener(this.eventType, this.scrollEventListener);
    }
  }

  render() {
    const style = assign({}, this.state.style);
    for (const p in style) {
      if (p.indexOf('filter') >= 0 || p.indexOf('Filter') >= 0) {
        // ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix=> style[`${prefix}Filter`] = style[p]);
        const transformArr = ['Webkit', 'Moz', 'Ms', 'ms'];
        for (let i = 0; i < transformArr.length; i++) {
          style[`${transformArr[i]}Filter`] = style[p];
        }
      }
    }
    const props = assign({}, this.props);
    props.style = style;
    return React.createElement(this.props.component, props);
  }
}

const objectOrArray = React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]);
const childPropTypes = React.PropTypes.oneOfType([objectOrArray, React.PropTypes.string]);
ScrollParallax.propTypes = {
  component: React.PropTypes.string,
  repeat: React.PropTypes.bool,
  vars: objectOrArray,
  always: React.PropTypes.bool,
  children: childPropTypes,
  className: React.PropTypes.string,
  style: objectOrArray,
};

ScrollParallax.defaultProps = {
  component: 'div',
  vars: null,
  always: true,
};

export default ScrollParallax;
