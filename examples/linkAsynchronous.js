// use jsx to render html, do not modify simple.html
import 'rc-scroll-anim/assets/index.less';
import ScrollAnim from 'rc-scroll-anim';
import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';
const _package = require('../package.json');

const Link = ScrollAnim.Link;
const Element = ScrollAnim.Element;
const ScrollOverPack = ScrollAnim.OverPack;
const EventListener = ScrollAnim.Event;
// ScrollAnim.scrollScreen({scrollInterval: 600});
class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    // 添加改变窗口事件,可加setTimeout
    EventListener.addEventListener('resize.userResize', this.barAnimate.bind(this));
  }

  onFocus = (e) => {
    this.dom = e.target;
    this.barAnimate();
  }

  onDataLoadEnd = (func) => {
    setTimeout(() => {
      this.setState({ show: true }, func);
    }, 1500);
  }

  barAnimate() {
    if (!this.dom) {
      return;
    }
    const bar = this.refs.bar;
    bar.style.left = `${this.dom.getBoundingClientRect().left}px`;
  }

  render() {
    return (<div>
      <div className="nav">
        <div className="logo">
          <p>Ant Motion</p>
        </div>
        <div className="nav-wap">
          <Link className="nav-list" to="page0" showHeightActive={['50%', '10%']}
            onFocus={this.onFocus}
            onAsynchronousAddEvent={this.onDataLoadEnd}
          >
            Example
          </Link>
          <Link className="nav-list" to="page1" showHeightActive={['10%', '60%']} toShowHeight
            onFocus={this.onFocus}
            onAsynchronousAddEvent={this.onDataLoadEnd}
          >
            Example2
          </Link>
          <Link className="nav-list" to="page2" showHeightActive={['60%', '50%']} toShowHeight
            onFocus={this.onFocus}
            onAsynchronousAddEvent={this.onDataLoadEnd}
          >
            Example3
          </Link>
          <Link className="nav-list" to="page3" offsetTop={100}
            onFocus={this.onFocus}
            onAsynchronousAddEvent={this.onDataLoadEnd}
          >
            Example4
          </Link>
          <div ref="bar" className="nav-bar" />
        </div>
      </div>
      {this.state.show && [
        <Element className="pack-page page0" id="page0" key="banner">
          <QueueAnim className="home-title">
            <div className="page-title" key="title">
              <p>{_package.name}@{_package.version}</p>
            </div>
            <div className="page-description" key="c">
              <p>The link demo</p>
            </div>
          </QueueAnim>
        </Element>,
        <ScrollOverPack id="page1" className="page1" key="1">
          <TweenOne className="tween-one" key="0" animation={{ opacity: 1 }}>
            默认进入与出场
          </TweenOne>
          <QueueAnim key="1">
            <div key="0" className="demo"></div>
            <div key="1" className="demo" style={{ backgroundColor: '#F38EAD' }}></div>
            <div key="2" className="demo"></div>
            <div key="3" className="demo"></div>
          </QueueAnim>
        </ScrollOverPack>,

        <ScrollOverPack
          className="pack-page page2"
          style={{ backgroundColor: '#0098CE' }}
          always={false}
          id="page2"
          key="2"
        >
          <div className="page2-title">只进入一次</div>
          <Animate key="0" transitionName="fade" transitionAppear>
            <div className="demo2"></div>
          </Animate>
          <TweenOne
            className="demo2"
            animation={{ y: 0, opacity: 1 }}
            key="1"
            style={{ transform: 'translateY(100px)', opacity: 0 }}
          />
        </ScrollOverPack>,

        <ScrollOverPack
          className="pack-page page3"
          style={{ backgroundColor: '#174270' }}
          playScale={0.8}
          id="page3"
          key="3"
        >
          <TweenOne animation={{ opacity: 1 }} style={{ opacity: 0 }} key="title"
            className="page2-title"
          >
            在页面80％时进入
          </TweenOne>
          <Animate key="0" transitionName="fade" transitionAppear>
            <div className="demo"></div>
          </Animate>
          <TweenOne
            className="demo"
            animation={{ y: 0, opacity: 1 }}
            key="1"
            style={{ transform: 'translateY(100px)', opacity: 0 }}
          />
        </ScrollOverPack>,
      ]}
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
