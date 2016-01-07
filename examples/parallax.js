// use jsx to render html, do not modify simple.html

import 'rc-scroll-anim/assets/index.less';
import ScrollAnim from 'rc-scroll-anim';
import React from 'react';
import ReactDOM from 'react-dom';

const ScrollParallax = ScrollAnim.Parallax;

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }


  render() {
    return (<div>
      <div className="pack-page">
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </div>
      <div className="pack-page"
           style={{backgroundColor: '#fff000', position: 'relative', overflow: 'hidden'}}>
        <ScrollParallax vars={[{translateX: '0px', opacity: 1, durationScale: 0.5}, {marginTop: 400, durationScale: 0.3}, {rotateY: 180, durationScale: 0.5}]}
                        style={{opacity: 0, transform: 'translateX(-100px) perspective(200px)', textAlign: 'center'}}>X到0后最Ｙ到400</ScrollParallax>
        <ScrollParallax vars={{scaleX: 1, scaleY: 1, opacity: 1, playScale: 0.3}}
                        style={{opacity: 0, transform: 'scale(0)', textAlign: 'center'}}>Scale示例示例示例</ScrollParallax>
        <ScrollParallax vars={{filter: 'blur(0px)', opacity: 1, playScale: 0.3}}
                        style={{opacity: 0, filter: 'blur(10px)', textAlign: 'center'}}>filter示例示例示例</ScrollParallax>
      </div>
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
