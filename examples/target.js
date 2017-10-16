// use jsx to render html, do not modify simple.html

import 'rc-scroll-anim/assets/index.less';
import ScrollAnim from 'rc-scroll-anim';
import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
const _package = require('../package.json');
const ScrollOverPack = ScrollAnim.OverPack;
const Link = ScrollAnim.Link;
class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  onFocus = (e) => {
    console.log(e, 'focus');
    this.dom = e.target;
    this.barAnimate();
  }

  barAnimate = () => {
    if (!this.dom) {
      return;
    }
    const bar = this.refs.bar;
    bar.style.left = `${this.dom.getBoundingClientRect().left}px`;
  }

  render() {
    return (<div style={{ height: '100vh', overflow: 'scroll' }} id="box">
      <div className="nav">
        <div className="logo">
          <p>Ant Motion</p>
        </div>
        <div className="nav-wap">
          <Link className="nav-list" to="page0" showHeightActive={['50%', '10%']}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            targetId="box"
          >
            Example
          </Link>
          <Link className="nav-list" to="page1" showHeightActive={['10%', '60%']} toShowHeight
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            targetId="box"
          >
            Example2
          </Link>
          <Link className="nav-list" to="page2" showHeightActive={['60%', '50%']} toShowHeight
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            targetId="box"
          >
            Example3
          </Link>
          <div ref="bar" className="nav-bar" />
        </div>
      </div>
      <div className="pack-page page0" id="page0">
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
        id="page2"
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
