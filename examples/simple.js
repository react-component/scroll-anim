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
        <div className="page2-title">只进入一次</div>
        <Animate key="0" transitionName="fade" transitionAppear scrollHideProps={{child: null}}>
          <div className="demo2"></div>
        </Animate>
        <TweenOne className="demo2" vars={{y: 0, opacity: 1}} key="1"
                  style={{transform: 'translateY(100px)', opacity: 0}}
                  scrollHideProps={{type: 'reverse'}}/>
      </ScrollOverPack>

      <ScrollOverPack scrollName="page3" className="pack-page page3" style={{backgroundColor: '#174270'}}
                      playScale={0.8} id="page3">
        <TweenOne vars={{opacity: 1}} style={{opacity: 0}} key="title" scrollHideProps={{type: 'reverse'}}
                  className="page2-title">在页面80％时进入</TweenOne>
        <Animate key="0" transitionName="fade" transitionAppear scrollHideProps={{child: null}}>
          <div className="demo"></div>
        </Animate>
        <TweenOne className="demo" vars={{y: 0, opacity: 1}} key="1"
                  style={{transform: 'translateY(100px)', opacity: 0}}
                  scrollHideProps={{type: 'reverse'}}/>
      </ScrollOverPack>
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
