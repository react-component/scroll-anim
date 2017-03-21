// use jsx to render html, do not modify simple.html

import 'rc-scroll-anim/assets/index.less';
import ScrollAnim from 'rc-scroll-anim';
import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
const _package = require('../package.json');
const ScrollOverPack = ScrollAnim.OverPack;

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (<div style={{ height: '100vh', overflow: 'scroll' }} id="box">
      <div className="pack-page page0">
        <QueueAnim className="home-title">
          <div className="page-title" key="title">
            <p>{_package.name}@{_package.version}</p>
          </div>
          <div className="page-description" key="c">
            <p>The simple demo</p>
          </div>
        </QueueAnim>
      </div>
      <ScrollOverPack
        id="page1"
        className="page1"
        replay
        targetId="box"
      >
        <TweenOne className="tween-one" key="0" animation={{ opacity: 1 }}>
          默认进入与出场, 顶部出场
        </TweenOne>
        <QueueAnim key="1">
          <div key="0" className="demo"></div>
          <div key="1" className="demo" style={{ backgroundColor: '#F38EAD' }}></div>
          <div key="2" className="demo"></div>
          <div key="3" className="demo"></div>
        </QueueAnim>
      </ScrollOverPack>

      <ScrollOverPack
        id="page4"
        className="page1"
        appear={false}
        style={{ backgroundColor: '#0098CE' }}
        targetId="box"
      >
        <TweenOne className="tween-one" key="0" animation={{ opacity: 1 }}>
          默认出场直接出现
        </TweenOne>
        <QueueAnim key="1">
          <div key="0" className="demo"></div>
          <div key="1" className="demo" style={{ backgroundColor: '#F38EAD' }}></div>
          <div key="2" className="demo"></div>
          <div key="3" className="demo"></div>
        </QueueAnim>
      </ScrollOverPack>

    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
