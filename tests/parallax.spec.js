/**
 * Created by jljsj on 16/1/13.
 */
import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import ScrollAnim from '../index';
import TestUtils from 'react-addons-test-utils';

describe('rc-scroll-anim', function() {
  let div;
  let instance;

  function createScrollParallax(props) {
    class ParallaxDemo extends React.Component {
      constructor() {
        super(...arguments);
      }

      render() {
        return (<div>
          <div style={{height: 1000}}></div>
          <div style={{height: 1000}}>
            <ScrollAnim.Parallax {...this.props}>
              demo
            </ScrollAnim.Parallax>
          </div>
        </div>);
      }
    }
    return ReactDom.render(<ParallaxDemo {...props}/>, div);
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

  it('parallax scroll', function(done) {
    window.scrollTo(0, 0);
    instance = createScrollParallax({
      style: {opacity: 0},
      component: 'i',
      vars: {opacity: 1},
    });
    const windowHeight = document.documentElement.clientHeight;
    const docHeight = document.documentElement.getBoundingClientRect().height;
    const startHeight = docHeight - 1000 - windowHeight;
    const endHeight = startHeight + windowHeight;
    console.log('window height:', windowHeight, 'doc height:', docHeight);
    // 窗口高度 300, 其它样式高度: 145, parallax里的高为 1200,
    const child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
    expect(getFloat(child[0].style.opacity)).to.be(0);
    window.scrollTo(0, startHeight);
    setTimeout(()=> {
      console.log('scroll to start:', child[0].style.opacity);
      expect(getFloat(child[0].style.opacity)).to.be(0);
      window.scrollTo(0, startHeight + 0.1 * windowHeight);
      setTimeout(()=> {
        console.log('scroll update access start:', child[0].style.opacity);
        expect(getFloat(child[0].style.opacity)).to.above(0).below(0.1);
        window.scrollTo(0, startHeight + 0.9 * windowHeight);
        setTimeout(()=> {
          console.log('scroll update access end:', child[0].style.opacity);
          expect(getFloat(child[0].style.opacity)).to.above(0.9).below(1);
          window.scrollTo(0, endHeight);
          setTimeout(()=> {
            console.log('scroll to end:', child[0].style.opacity);
            expect(getFloat(child[0].style.opacity)).to.be(1);
            done();
          }, 30);
        }, 30);
      }, 30);
    }, 30);
  });

  it('parallax playScale', function(done) {
    window.scrollTo(0, 0);
    instance = createScrollParallax({
      style: {opacity: 0},
      component: 'i',
      vars: {opacity: 1, playScale: [0.5, 1]},
    });
    const child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
    const windowHeight = document.documentElement.clientHeight;
    const docHeight = document.documentElement.getBoundingClientRect().height;
    const startHeight = docHeight - 1000 - windowHeight;
    const endHeight = startHeight + windowHeight;
    console.log('window height:', windowHeight, 'doc height:', docHeight);
    expect(getFloat(child[0].style.opacity)).to.be(0);
    console.log('window height:', docHeight, 'window height:', windowHeight);
    console.log('playScale = [0.5, 1]: pageYOffset is:', 'start:' + (startHeight + windowHeight * 0.5), 'end:' + endHeight);
    window.scrollTo(0, startHeight + windowHeight * 0.5);
    setTimeout(()=> {
      console.log('window.pageYOffset:', window.pageYOffset);
      console.log('scroll to start:', child[0].style.opacity);
      expect(getFloat(child[0].style.opacity)).to.be(0);
      window.scrollTo(0, endHeight + 1);
      setTimeout(()=> {
        console.log('window.pageYOffset:', window.pageYOffset);
        console.log('scroll to end:', child[0].style.opacity);
        expect(getFloat(child[0].style.opacity)).to.be(1);
        done();
      }, 30);
    }, 30);
  });

  it('parallax always false', function(done) {
    window.scrollTo(0, 0);
    instance = createScrollParallax({
      style: {opacity: 0},
      component: 'i',
      vars: {opacity: 1},
      always: false,
    });
    const windowHeight = document.documentElement.clientHeight;
    const docHeight = document.documentElement.getBoundingClientRect().height;
    const startHeight = docHeight - 1000 - windowHeight;
    const endHeight = startHeight + windowHeight;
    console.log('window height:', windowHeight, 'doc height:', docHeight);
    window.scrollTo(0, endHeight + 1);
    console.log('window.pageYOffset:', window.pageYOffset);
    setTimeout(()=> {
      window.scrollTo(0, 0);
      console.log('window.pageYOffset:', window.pageYOffset);
      setTimeout(()=> {
        const child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
        console.log('always = false, child opacity:', child[0].style.opacity);
        expect(getFloat(child[0].style.opacity)).to.be(1);
        done();
      }, 30);
    }, 30);
  });
});
