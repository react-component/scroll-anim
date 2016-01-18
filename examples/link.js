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

class Demo extends React.Component {
  constructor() {
    super(...arguments);
  }

  onFocus(e) {
    const dom = e.target;
    this.barAnimate(dom);
  }

  barAnimate(dom) {
    const bar = this.refs.bar;
    bar.style.left = dom.getBoundingClientRect().left + 'px';
  }

  render() {
    return (<div>
      <div className="nav">
        <Link className="nav-list" to="page0" showHeightActive="300"
              onFocus={this.onFocus.bind(this)}>page0</Link>
        <Link className="nav-list" to="page1" showHeightActive={[300, 500]}
              onFocus={this.onFocus.bind(this)}>page1</Link>
        <Link className="nav-list" to="page2" showHeightActive={[500, 200]} toShowHeight
              onFocus={this.onFocus.bind(this)}>page2</Link>
        <Link className="nav-list" to="page3" showHeightActive={[200, '10%']}
              onFocus={this.onFocus.bind(this)}>page3</Link>
        <div ref="bar" className="nav-bar"></div>
      </div>
      <Element className="pack-page" name="page0">
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </Element>
      <Element name="page1">
        <ScrollOverPack style={{backgroundColor: '#fff000', height: 800}}>
          <TweenOne key="0" vars={{opacity: 1}}
                    style={{width: '100%', opacity: 0, textAlign: 'center', color: '#fff', fontSize: 32}}
                    scrollHideProps={{type: 'reverse'}}>默认进入与出场</TweenOne>
          <QueueAnim key="1" scrollHideProps={{child: null}}>
            <div key="0">示例示例</div>
            <div key="1">示例示例</div>
            <div key="2">示例示例</div>
            <div key="3">示例示例</div>
          </QueueAnim>
        </ScrollOverPack>
      </Element>

      <Element name="page2">
        <ScrollOverPack className="pack-page" style={{backgroundColor: '#128303'}} always={false} id="page2">
          <div style={{width: '100%', textAlign: 'center', color: '#fff', fontSize: 32}}>只进入一次</div>
          <Animate key="0" transitionName="fade" transitionAppear scrollHideProps={{child: null}}>
            <div>Animate示例示例</div>
          </Animate>
          <TweenOne vars={{x: 200, opacity: 1}} style={{opacity: 0, width: 100}} key="1"
                    scrollHideProps={{type: 'reverse'}}>
            单元素用例
          </TweenOne>
        </ScrollOverPack>
      </Element>

      <Element name="page3">
        <ScrollOverPack className="pack-page" style={{backgroundColor: '#00ffff'}} playScale={0.8} id="page3">
          <div style={{width: '100%', textAlign: 'center', color: '#fff', fontSize: 32}}>在页面80％时进入</div>
          <Animate key="0" transitionName="fade" transitionAppear scrollHideProps={{child: null}}>
            <div>Animate示例示例</div>
          </Animate>
          <TweenOne vars={{x: 200, opacity: 1}} style={{opacity: 0, width: 100}} key="1"
                    scrollHideProps={{type: 'reverse'}}>
            单元素用例
          </TweenOne>
        </ScrollOverPack>
      </Element>
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
