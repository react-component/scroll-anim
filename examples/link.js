// use jsx to render html, do not modify simple.html

import 'rc-scroll-anim/assets/index.less';
import ScrollAnim from 'rc-scroll-anim';
import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';

const Link = ScrollAnim.Link;
const Element = ScrollAnim.Element;
const ScrollOverPack = ScrollAnim.OverPack;
const EventListener = ScrollAnim.Event;
//ScrollAnim.scrollScreen({scrollInterval: 600});
class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  componentDidMount() {
    // 添加改变窗口事件,可加setTimeout
    EventListener.addEventListener('resize.userResize', this.barAnimate.bind(this));
  }

  onFocus(e) {
    this.dom = e.target;
    this.barAnimate();
  }

  barAnimate() {
    if (!this.dom) {
      return;
    }
    const bar = this.refs.bar;
    bar.style.left = this.dom.getBoundingClientRect().left + 'px';
  }

  render() {
    return (<div>
      <div className="nav">
        <div className="logo">
          <p>Ant Motion</p>
        </div>
        <div className="nav-wap">
          <Link className="nav-list" location="page0" showHeightActive="300" ref="page0"
                onFocus={this.onFocus.bind(this)}>Example</Link>
          <Link className="nav-list" location="page1"
                onFocus={this.onFocus.bind(this)}>Example2</Link>
          <Link className="nav-list" location="page2" 
                onFocus={this.onFocus.bind(this)}>Example3</Link>
          <Link className="nav-list" location="page3" 
                onFocus={this.onFocus.bind(this)}>Example4</Link>

          <div ref="bar" className="nav-bar"></div>
        </div>
      </div>
      <Element className="pack-page page0" scrollName="page0">
        <QueueAnim>
          <div className="page-title" key="title">
            <p>rc-scroll-anim@0.1.0</p>
          </div>
          <div className="page-description" key="c">
            <p>The simple demo</p>
          </div>
        </QueueAnim>
      </Element>
      <ScrollOverPack scrollName="page1" className="page1">
        <TweenOne className="tween-one" key="0" vars={{opacity: 1}}
                  scrollHideProps={{type: 'reverse'}}>默认进入与出场
        </TweenOne>
        <QueueAnim key="1" scrollHideProps={{child: null}}>
          <div key="0" className="demo"></div>
          <div key="1" className="demo" style={{backgroundColor: '#F38EAD'}}></div>
          <div key="2" className="demo"></div>
          <div key="3" className="demo"></div>
        </QueueAnim>
      </ScrollOverPack>

      <ScrollOverPack scrollName="page2" className="pack-page page2" style={{backgroundColor: '#0098CE'}} always={false}
                      id="page2">
        <div className="page2-title" >只进入一次</div>
        <Animate key="0" transitionName="fade" transitionAppear scrollHideProps={{child: null}}>
          <div className="demo2"></div>
        </Animate>
        <TweenOne className="demo2" vars={{y: 0, opacity: 1}} key="1"
                  style={{transform: 'translateY(100px)'}}
                  scrollHideProps={{type: 'reverse'}}/>
      </ScrollOverPack>

      <ScrollOverPack scrollName="page3" className="pack-page page3" style={{backgroundColor: '#174270'}}
                      playScale={0.8} id="page3">
        <div className="page2-title" >在页面80％时进入</div>
        <Animate key="0" transitionName="fade" transitionAppear scrollHideProps={{child: null}}>
          <div className="demo"></div>
        </Animate>
        <TweenOne className="demo" vars={{y: 0, opacity: 1}} key="1"
                  style={{transform: 'translateY(100px)'}}
                  scrollHideProps={{type: 'reverse'}}/>
      </ScrollOverPack>
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
