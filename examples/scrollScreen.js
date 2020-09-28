// use jsx to render html, do not modify simple.html
import ScrollAnim from 'rc-scroll-anim';
import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';
import './assets/index.less';

const _package = require('../package.json');

const Link = ScrollAnim.Link;
const Element = ScrollAnim.Element;
const ScrollOverPack = ScrollAnim.OverPack;
const EventListener = ScrollAnim.Event;

class Demo extends React.Component {
  componentDidMount() {
    // 添加改变窗口事件,可加setTimeout
    EventListener.addEventListener('resize.userResize', this.barAnimate.bind(this));
    ScrollAnim.scrollScreen.init({ loop: true, location: ['page0', 'page1', 'page2', 'page3'] });
  }

  onFocus = (e) => {
    this.dom = e.target;
    this.barAnimate();
  }

  barAnimate = () => {
    if (!this.dom) {
      return;
    }
    const bar = this.bar;
    bar.style.left = `${this.dom.getBoundingClientRect().left}px`;
  }

  render() {
    return (<div>
      <div className="nav">
        <div className="nav-wap">
          <Link
            className="nav-list"
            to="page0"
            showHeightActive="300"
            onFocus={this.onFocus}
          >
            Page0
          </Link>
          <Link
            className="nav-list"
            to="page1"
            showHeightActive="300"
            onFocus={this.onFocus}
          >
            Page1
          </Link>
          <Link
            className="nav-list"
            to="page2"
            showHeightActive="300"
            onFocus={this.onFocus}
          >
            Page2
          </Link>
          <Link
            className="nav-list"
            to="page3"
            showHeightActive="300"
            onFocus={this.onFocus}
          >
            Page3
          </Link>
          <div ref={(c) => { this.bar = c; }} className="nav-bar" />
        </div>
      </div>
      <Element className="pack-page page0" id="page0">
        <QueueAnim className="home-title">
          <div className="page-title" key="title" style={{ height: 100, overflow: 'auto' }}>
            <p>{_package.name}@{_package.version}</p>
          </div>
          <div className="page-description" key="c">
            <p>A scrollScreen demo</p>
          </div>
        </QueueAnim>
      </Element>
      <div id="page1" style={{ overflow: 'hidden', background: '#133252' }}>
        <ScrollOverPack
          className="page1"
          playScale={1}
          replay
          location="page1"
        >
          <TweenOne className="tween-one" key="0" animation={{ opacity: 1 }}>
            每次进入都启动播放
          </TweenOne>
          <QueueAnim key="1" style={{ height: 100, overflow: 'auto' }}>
            <div key="0" className="demo-content" />
            <div key="1" className="demo-content" />
            <div key="2" className="demo-content" />
            <div key="3" className="demo-content" />
          </QueueAnim>
        </ScrollOverPack>
      </div>

      <ScrollOverPack
        className="pack-page page2"
        style={{ backgroundColor: '#174270', height: 500 }}
        id="page2"
        playScale={1}
      >
        <TweenOne className="tween-one" animation={{ opacity: 1 }} key="t">
          只从上往下时播放
        </TweenOne>
        <Animate key="0" transitionName="fade" transitionAppear>
          <div className="demo-content2" />
        </Animate>
        <TweenOne
          className="demo-content2"
          animation={{ y: 0, opacity: 1 }}
          key="1"
          style={{ transform: 'translateY(100px)', opacity: 0 }}
        />
      </ScrollOverPack>

      <ScrollOverPack
        className="pack-page page3"
        style={{ backgroundColor: '#174270' }}
        always={false}
        id="page3"
        playScale={1}
      >
        <TweenOne
          animation={{ opacity: 1 }}
          key="t"
          className="tween-one"
          style={{ opacity: 0 }}
        >
          只进入一次</TweenOne>
        <Animate key="0" transitionName="fade" transitionAppear>
          <div className="demo-content" />
        </Animate>
        <TweenOne
          className="demo-content"
          animation={{ y: 0, opacity: 1 }}
          key="1"
          style={{ transform: 'translateY(100px)', opacity: 0 }}
        />
      </ScrollOverPack>
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
