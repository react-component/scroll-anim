/**
 * Created by jljsj on 16/1/13.
 */
import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import ScrollAnim from '../index';
import TestUtils from 'react-addons-test-utils';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

describe('rc-scroll-anim', function() {
  let div;
  let instance;

  function createScrollOverPack(props) {
    class OverPackDemo extends React.Component {
      constructor() {
        super(...arguments);
      }

      render() {
        return (<div>
          <div style={{height: 600}}></div>
          <ScrollAnim.OverPack {...this.props} style={{height: 800}}>
            <TweenOne key="one" vars={{opacity: 1}} className="tween-one" style={{opacity: 0}} component="i">demo</TweenOne>
            <QueueAnim key="queueAnim" className="queue-anim">
              <p key="0">demo</p>
              <p key="1">demo</p>
            </QueueAnim>
          </ScrollAnim.OverPack>
        </div>);
      }
    }
    return ReactDom.render(<OverPackDemo {...props}/>, div);
  }

  beforeEach(function() {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(function() {
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

  it('single overPack', function() {
    instance = createScrollOverPack();
    const child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
    console.log('overPack child length is 0');
    expect(child.length).to.be(3);
  });

  it('overPack always false', function(done) {
    window.scrollTo(0, 0);
    instance = createScrollOverPack({
      always: false,
    });
    window.scrollTo(0, 1200);
    let child;
    setTimeout(()=> {
      window.scrollTo(0, 0);
      setTimeout(()=> {
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
  });

  it('overPack enter leave', function(done) {
    window.scrollTo(0, 0);
    instance = createScrollOverPack();
    window.scrollTo(0, 1200);
    let child;
    setTimeout(()=> {
      child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
      console.log('enter -> TweenOne start opacity:', child[0].style.opacity);
      expect(getFloat(child[0].style.opacity)).to.above(0);
      child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p');
      console.log('enter -> QueueAnim start child length:', child.length);
      expect(child.length).to.above(0);
      setTimeout(()=> {
        child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
        console.log('enter -> TweenOne end opacity:', child[0].style.opacity);
        expect(getFloat(child[0].style.opacity)).to.be(1);
      }, 500);
      setTimeout(()=> {
        child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p');
        console.log('enter -> QueueAnim end child length:', child.length);
        expect(child.length).to.be(2);
        window.scrollTo(0, 0);
        setTimeout(()=> {
          child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
          console.log(child[0].style);
          console.log('leave -> TweenOne end opacity:', child[0].style.opacity);
          expect(getFloat(child[0].style.opacity)).to.below(1);
        }, 500);
        setTimeout(()=> {
          child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'p');
          console.log('leave -> QueueAnim end child length:', child.length);
          expect(child.length).to.be(0);
          done();
        }, 1000);
      }, 600);
    }, 30);
  });
});
