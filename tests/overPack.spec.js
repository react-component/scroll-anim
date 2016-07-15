/* eslint no-console:0 */
import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import ScrollAnim from '../index';
import TestUtils from 'react-addons-test-utils';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import ticker from 'rc-tween-one/lib/ticker';

describe('rc-scroll-anim', () => {
  let div;
  let instance;
  let tickerId = 0;

  function createScrollOverPack(props) {
    class OverPackDemo extends React.Component {
      constructor() {
        super(...arguments);
      }

      render() {
        return (<div>
          <div style={{ height: 1000 }}></div>
          <ScrollAnim.OverPack
            {...this.props}
            style={{ height: 1000 }}
            hideProps={{ one: { reverse: true } }}
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
    window.scrollTo(0, 0);
    instance = createScrollOverPack();
    const child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
    console.log('overPack child length is 0', child.length);
    expect(child.length).to.be(3);
  });

  it('overPack always false', (done) => {
    window.scrollTo(0, 0);
    instance = createScrollOverPack({
      always: false,
    });
    const _tickerId = `scrollText${Date.now()}`;
    tickerId++;
    if (tickerId >= Number.MAX_VALUE) {
      tickerId = 0;
    }
    const startFrame = ticker.frame;
    ticker.wake(_tickerId, () => {
      const moment = (ticker.frame - startFrame) * ticker.perFrame;
      const ratio = moment / 300 * 3000;
      window.scrollBy(0, ratio);
      if (moment >= 300) {
        ticker.clear(_tickerId);
      }
    });
    ticker.timeout(() => {
      let child;
      ticker.timeout(() => {
        ticker.timeout(() => {
          console.log('window.pageYOffset:', window.pageYOffset);
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
    window.scrollBy(0, 3000);
    ticker.timeout(() => {
      let child;
      console.log('current scroll top:', window.pageYOffset);
      child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
      console.log('enter -> TweenOne start opacity:', child[0].style.opacity);
      expect(getFloat(child[0].style.opacity)).to.be(1);
      child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p');
      console.log('enter -> QueueAnim start child length:', child.length);
      expect(child.length).to.be(2);
      window.scrollTo(0, 0);
      ticker.timeout(() => {
        console.log('current scroll top:', window.pageYOffset);
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
