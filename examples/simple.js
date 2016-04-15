// use jsx to render html, do not modify simple.html

import 'rc-scroll-anim/assets/index.less';
import ScrollAnim from 'rc-scroll-anim';
import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';
const _package = require('../package.json');
const ScrollOverPack = ScrollAnim.OverPack;

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (<div>
      <div className="pack-page page0" scrollName="page0">
        <QueueAnim className="home-title">
          <div className="page-title" key="title">
            <p>{_package.name}@{_package.version}</p>
          </div>
          <div className="page-description" key="c">
            <p>The simple demo</p>
          </div>
        </QueueAnim>
      </div>
      <ScrollOverPack scrollName="page1" className="page1" replay>
        <TweenOne className="tween-one" key="0" animation={{opacity: 1}}
          hideProps={{ reverse: true }}>默认进入与出场
        </TweenOne>
        <QueueAnim key="1" hideProps={{child: null}}>
          <div key="0" className="demo"></div>
          <div key="1" className="demo" style={{backgroundColor: '#F38EAD'}}></div>
          <div key="2" className="demo"></div>
          <div key="3" className="demo"></div>
        </QueueAnim>
      </ScrollOverPack>

      <ScrollOverPack scrollName="page2" scrollEvent={this.scrollEvent} className="pack-page page2"
        style={{backgroundColor: '#0098CE'}} always={false}
        id="page2">
        <TweenOne key="title" animation={{ opacity: 0, type: 'from' }}
          hideProps={{ reverse: true }} className="page2-title"
        >
          只进入一次
        </TweenOne>
        <Animate key="0" transitionName="fade" transitionAppear hideProps={{child: null}}>
          <div className="demo2"></div>
        </Animate>
        <TweenOne className="demo2" animation={{y: 0, opacity: 1}} key="1"
          style={{transform: 'translateY(100px)', opacity: 0}}
          hideProps={{ reverse: true }} />
      </ScrollOverPack>

      <ScrollOverPack scrollName="page3" className="pack-page page3" style={{backgroundColor: '#174270'}}
        playScale={0.8} id="page3">
        <TweenOne animation={{opacity: 1}} style={{opacity: 0}} key="title" hideProps={{ reverse: true }}
          className="page2-title">在页面80％时进入</TweenOne>
        <Animate key="0" transitionName="fade" transitionAppear hideProps={{child: null}}>
          <div className="demo"></div>
        </Animate>
        <TweenOne className="demo" animation={{y: 0, opacity: 1}} key="1"
          style={{transform: 'translateY(100px)', opacity: 0}}
          hideProps={{ reverse: true }} />
      </ScrollOverPack>
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
