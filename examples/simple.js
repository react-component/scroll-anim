// use jsx to render html, do not modify simple.html

import 'rc-scroll-anim/assets/index.less';
import ScrollAnim from 'rc-scroll-anim';
import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';

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
      <ScrollOverPack className="pack-page" style={{backgroundColor: '#128303'}}>
        <QueueAnim key="12">
          <div key="0" style={{backgroundColor: '#fff000'}}>我是内容</div>
          <div key="1">我是内容</div>
          <div key="2">我是内容</div>
        </QueueAnim>
        <div>sdf</div>
        <QueueAnim key="13">
          <div key="0" style={{backgroundColor: '#fff000'}}>我是内容</div>
          <div key="1">我是内容</div>
          <div key="2">我是内容</div>
        </QueueAnim>
      </ScrollOverPack>
      <div >
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </div>
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
