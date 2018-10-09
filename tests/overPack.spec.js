/* eslint no-console:0 */
import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import TestUtils from 'react-dom/test-utils';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import ticker from 'rc-tween-one/lib/ticker';
import ScrollAnim from '../index';

describe('rc-scroll-anim', () => {
  let div;
  let instance;
  let tickerId = 0;

  function createScrollOverPack(props) {
    class OverPackDemo extends React.PureComponent {
      render() {
        return (<div
          style={{ height: 500, overflow: 'scroll', position: 'absolute', width: '100%', top: 0 }}
          id="c-div"
        >
          <div style={{ height: 1000 }} />
          <ScrollAnim.OverPack
            {...this.props}
            style={{ height: 1000 }}
            targetId="c-div"
          >
            <TweenOne
              key="one"
              animation={{ opacity: 1 }}
              className="tween-one"
              style={{ opacity: 0 }}
              component="i"
            >
              demo
            </TweenOne>
            <QueueAnim key="queueAnim" className="queue-anim">
              <p key="0">demo</p>
              <p key="1">demo</p>
            </QueueAnim>
          </ScrollAnim.OverPack>
        </div>);
      }
    }
    return ReactDom.render(<OverPackDemo {...props} />, div);
  }

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    try {
      ReactDom.unmountComponentAtNode(div);
      document.body.removeChild(div);
    } catch (e) {
      console.log(e);
    }
  });

  function getFloat(str) {
    return parseFloat(str);
  }

  it('single overPack', () => {
    document.body.scrollTop = 0;
    instance = createScrollOverPack();
    const cDom = document.getElementById('c-div');
    cDom.scrollTop = 0;
    const child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
    console.log('overPack child length is 2 + wrapper 2', child.length);
    expect(child.length).to.be(4);
  });

  it('overPack always false', (done) => {
    window.scrollTo(0, 0);
    instance = createScrollOverPack({
      always: false,
    });
    const cDom = document.getElementById('c-div');
    cDom.scrollTop = 0;
    const _tickerId = `scrollText${Date.now()}`;
    tickerId++;
    if (tickerId >= Number.MAX_VALUE) {
      tickerId = 0;
    }
    const startFrame = ticker.frame;
    ticker.wake(_tickerId, () => {
      const moment = (ticker.frame - startFrame) * ticker.perFrame;
      const ratio = moment / 300 * 3000;
      cDom.scrollTop = ratio;
      if (moment >= 300) {
        ticker.clear(_tickerId);
      }
    });
    ticker.timeout(() => {
      let child;
      ticker.timeout(() => {
        ticker.timeout(() => {
          console.log('scrollTop:', cDom.scrollTop);
          child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
          console.log('always = false -> TweenOne end opacity:', child[0].style.opacity);
          expect(getFloat(child[0].style.opacity)).to.be(1);
          child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p');
          console.log('always = false -> QueueAnim end child length:', child.length);
          expect(child.length).to.be(2);
          done();
        }, 30);
      }, 930);
    }, 330);
  });

  it('overPack enter leave', (done) => {
    window.scrollTo(0, 0);
    instance = createScrollOverPack();
    const cDom = document.getElementById('c-div');
    cDom.scrollTop = 3000;
    ticker.timeout(() => {
      console.log('scrollTop:', cDom.scrollTop);
      let child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
      console.log('enter -> TweenOne start opacity:', child[0].style.opacity);
      expect(getFloat(child[0].style.opacity)).to.be(1);
      child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p');
      console.log('enter -> QueueAnim start child length:', child.length);
      expect(child.length).to.be(2);
      cDom.scrollTop = 0;
      ticker.timeout(() => {
        console.log('scrollTop:', cDom.scrollTop);
        child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
        console.log('leave -> TweenOne end opacity:', child[0].style.opacity);
        expect(getFloat(child[0].style.opacity)).to.be(0);
        child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p');
        console.log('leave -> QueueAnim end child length:', child.length);
        expect(child.length).to.be(0);
        done();
      }, 600);
    }, 500);
  });
});
