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

function Demo() {
  return (<div>
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
      playScale="50vh"
    >
      <TweenOne className="tween-one" key="0" animation={{ opacity: 1 }}>
          默认进入与出场, 顶部出场
      </TweenOne>
      <QueueAnim key="1">
        <div key="0" className="demo" />
        <div key="1" className="demo" style={{ backgroundColor: '#F38EAD' }} />
        <div key="2" className="demo" />
        <div key="3" className="demo" />
      </QueueAnim>
    </ScrollOverPack>

    <ScrollOverPack
      id="page4"
      className="page1"
      appear={false}
    >
      <TweenOne className="tween-one" key="0" animation={{ opacity: 1 }}>
          默认出场直接出现
      </TweenOne>
      <QueueAnim key="1">
        <div key="0" className="demo" />
        <div key="1" className="demo" style={{ backgroundColor: '#F38EAD' }} />
        <div key="2" className="demo" />
        <div key="3" className="demo" />
      </QueueAnim>
    </ScrollOverPack>

    <ScrollOverPack
      scrollEvent={this.scrollEvent}
      className="pack-page page2"
      style={{ backgroundColor: '#0098CE' }} always={false}
      id="page2"
    >
      <TweenOne key="title" animation={{ opacity: 0, type: 'from' }} className="page2-title">
          只进入一次
      </TweenOne>
      <Animate key="0" transitionName="fade" transitionAppear>
        <div className="demo2" />
      </Animate>
      <TweenOne className="demo2" animation={{ y: 0, opacity: 1 }} key="1"
        style={{ transform: 'translateY(100px)', opacity: 0 }}
      />
    </ScrollOverPack>

    <ScrollOverPack
      id="page3"
      className="pack-page page3"
      style={{ backgroundColor: '#174270' }}
      playScale={0.8}
    >
      <TweenOne
        animation={{ opacity: 1 }}
        style={{ opacity: 0 }}
        key="title"
        className="page2-title"
      >
          在页面80％时进入
      </TweenOne>
      <Animate key="0" transitionName="fade" transitionAppear>
        <div className="demo" />
      </Animate>
      <TweenOne
        className="demo"
        animation={{ y: 0, opacity: 1 }}
        key="1"
        style={{ transform: 'translateY(100px)', opacity: 0 }}
      />
    </ScrollOverPack>
  </div>);
}


ReactDOM.render(<Demo />, document.getElementById('__react-content'));
