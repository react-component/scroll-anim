// use jsx to render html, do not modify simple.html

import 'rc-scroll-anim/assets/index.less';
import ScrollAnim from 'rc-scroll-anim';
import React from 'react';
import ReactDOM from 'react-dom';

const ScrollParallax = ScrollAnim.Parallax;
const ScrollElement = ScrollAnim.Element;

class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      css: {backgroundColor: '#174270', height: 920},
      cssNoPosition: true,
    };
  }

  onComplete() {
    console.log('complete');
  }

  setCss() {
    const css = this.state.css;
    console.log('start');
    if (this.state.cssNoPosition) {
      css.position = 'fixed';
      css.top = 0;
    } else {
      css.position = '';
      css.top = '';
    }
    this.setState({
      css,
      cssNoPosition: !this.state.cssNoPosition,
    });
  }

  render() {
    return (<div>
      <div className="pack-page page0 ">
        <div className="home-title">
          <div className="page-title">
            <p>rc-scroll-anim@0.1.5</p>
          </div>
          <div className="page-description" key="c">
            <p>The parallax demo</p>
          </div>
        </div>
      </div>
      <div className="pack-page"
           style={{backgroundColor: '#174270', position: 'relative', overflow: 'hidden', height: 1600}}>
        <ScrollParallax animation={{opacity: 1}} style={{opacity: 0, paddingTop: 60}}
                        className="tween-one">transform 必需在 style 里设定初始值</ScrollParallax>
        <ScrollParallax animation={{opacity: 1}} style={{opacity: 0, paddingTop: 0, fontSize: 24}}
                        className="tween-one">默认显示位置[0 ,1]</ScrollParallax>
        <ScrollParallax animation={{scaleX: 1, scaleY: 1}} style={{transform: 'scale(0)', color: '#fff'}}
                        className="demo parallax-shape">Scale</ScrollParallax>
        <ScrollParallax animation={{rotate: 360}} style={{transform: 'rotate(0)'}}
                        className="demo2 parallax-shape">rotate</ScrollParallax>
        <ScrollParallax animation={{x: 0, opacity: 1}}
                        style={{transform: 'translateX(-200px)', opacity: 0, backgroundColor: '#133252', color: '#fff'}}
                        className="demo2 parallax-shape">X</ScrollParallax>
        <ScrollParallax animation={{rotateY: 360}}
                        style={{transform: 'perspective(100px) rotateY(0)', backgroundColor: '#0098CE'}}
                        className="demo2 parallax-shape">rotateY</ScrollParallax>
        <ScrollParallax animation={{opacity: 1}} style={{opacity: 0, paddingTop: 60, fontSize: 24}}
                        className="tween-one">自定义显示位置</ScrollParallax>
        <ScrollParallax animation={{filter: 'blur(0px)', playScale: [0.5, 0.8], opacity: 1}}
                        style={{filter: 'blur(20px)', opacity: 0, color: '#fff'}}
                        className="demo parallax-shape">blur</ScrollParallax>
        <ScrollParallax animation={{color: '#fff000', backgroundColor: '#F38EAD', playScale: [0.3, 0.8]}}
                        style={{filter: 'blur(0px)', color: '#fff'}}
                        className="demo parallax-shape">color</ScrollParallax>
        <ScrollParallax animation={{opacity: 1}} style={{opacity: 0, paddingTop: 60, fontSize: 24}}
                        className="tween-one">多种样式时间轴动画</ScrollParallax>
        <ScrollParallax
          animation={[{opacity: 1, playScale: [0, 0.2]}, {filter: 'blur(0px)', backgroundColor: '#F38EAD', playScale: [0, 0.2]}, {translateX: -100, boxShadow: '5px 5px 5px #000', color: '#fff000', playScale: [0, 0.2]}, {translateX: 100, playScale: [0, 0.2]}, {translateX: 0, playScale: [0, 0.2]}]}
          style={{filter: 'blur(10px)', transform: 'translateX(0px)', opacity: 0, color: '#fff'}}
          className="demo parallax-shape">timeline</ScrollParallax>
      </div>
      <div className="pack-page"
           style={{backgroundColor: '#0097D0', position: 'relative', textAlign: 'center', fontSize: 36}}>
        <div className="page2-title">视差示例</div>
        <ScrollParallax animation={{translateY: 120, opacity: 1, ease: 'linear', playScale: [0, 2]}}
                        style={{transform: 'translateY(420px) scale(.8)', color: '#fff'}}>
          <img src="https://os.alipayobjects.com/rmsportal/CrVCkwvtTQQvQHL.png" style={{width: 100}}/>
        </ScrollParallax>
        <ScrollParallax animation={{translateY: 20, opacity: 1, ease: 'linear', playScale: [0, 1.5]}}
                        style={{transform: 'translateY(380px) scale(.9)', color: '#fff'}}><img
          src="https://os.alipayobjects.com/rmsportal/sfmdyWNlweIvfUh.png" style={{width: 150}}/>
        </ScrollParallax>
        <ScrollParallax animation={{translateY: -100, opacity: 1, ease: 'linear', playScale: [0, 1]}}
                        style={{transform: 'translateY(320px)', color: '#fff'}}><img
          src="https://os.alipayobjects.com/rmsportal/sfmdyWNlweIvfUh.png" style={{width: 200}}/></ScrollParallax>
      </div>
      <ScrollElement style={{height: 2000}} scrollName="Scroll-Pack">
        <ScrollParallax className="pack-page"
                        location="Scroll-Pack"
                        animation={{backgroundColor: '#0097D0', playScale: [1, 2], onStart: this.setCss.bind(this), onComplete: this.onComplete.bind(this)}}
                        style={this.state.css}>
          <ScrollParallax animation={{translateX: '0%', playScale: [1, 2]}}
                          style={{transform: 'translateX(-100%)', backgroundColor: '#F38EAD', width: '100%', height: '100%', position: 'absolute'}}
                          location="Scroll-Pack"/>
          <ScrollParallax animation={[{translateY: 0}, {translateY: '450px'}]}
                          location="Scroll-Pack"
                          style={{transform: 'translateY(300px)', color: '#fff', fontSize: 36, textAlign: 'center'}}>示例示例</ScrollParallax>

        </ScrollParallax>
      </ScrollElement>
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
