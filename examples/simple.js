// use jsx to render html, do not modify simple.html

import 'rc-scroll-anim/assets/index.less';
import ScrollAnim from 'rc-scroll-anim';
import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';

const ScrollOverPack = ScrollAnim.OverPack;

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
      <ScrollOverPack style={{backgroundColor: '#fff000', height: 800}}>
        <TweenOne key="0" vars={{opacity: 1}}
                  style={{width: '100%', opacity: 0, textAlign: 'center', color: '#fff', fontSize: 32}}>默认进入与出场</TweenOne>
        <QueueAnim key="1">
          <div key="0">示例示例</div>
          <div key="1">示例示例</div>
          <div key="2">示例示例</div>
          <div key="3">示例示例</div>
        </QueueAnim>
      </ScrollOverPack>

      <ScrollOverPack className="pack-page" style={{backgroundColor: '#128303'}} always={false}>
        <div style={{width: '100%', textAlign: 'center', color: '#fff', fontSize: 32}}>只进入一次</div>
        <Animate key="0" transitionName="fade" transitionAppear>
          <div>Animate示例示例</div>
        </Animate>
        <TweenOne vars={{x: 200, opacity: 1}} style={{opacity: 0, width: 100}} key="1">
          单元素用例
        </TweenOne>
      </ScrollOverPack>

      <ScrollOverPack className="pack-page" style={{backgroundColor: '#00ffff'}} playScale={0.8}>
        <div style={{width: '100%', textAlign: 'center', color: '#fff', fontSize: 32}}>在页面80％时进入</div>
        <Animate key="0" transitionName="fade" transitionAppear>
          <div>Animate示例示例</div>
        </Animate>
        <TweenOne vars={{x: 200, opacity: 1}} style={{opacity: 0, width: 100}} key="1">
          单元素用例
        </TweenOne>
      </ScrollOverPack>
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
