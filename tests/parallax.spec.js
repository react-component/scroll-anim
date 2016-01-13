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
          <div style={{height: 600}}></div>
          <div style={{height: 600}}>
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

  it('single parallax', function() {
    instance = createScrollParallax({
      component: 'i',
    });
    const child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
    expect(child.length).to.be(1);
  });

  it('parallax scroll', function(done) {
    window.scrollTo(0, 0);
    instance = createScrollParallax({
      style: {opacity: 0},
      component: 'i',
      vars: {opacity: 1},
    });
    // 窗口高度 300, 其它样式高度: 145, parallax里的高为 1200,
    const child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
    expect(getFloat(child[0].style.opacity)).to.be(0);
    console.log('window height:', document.documentElement.getBoundingClientRect().height);
    window.scrollTo(0, 445);
    setTimeout(()=> {
      console.log('scroll to start:', child[0].style.opacity);
      expect(getFloat(child[0].style.opacity)).to.be(0);
      window.scrollTo(0, 500);
      setTimeout(()=> {
        console.log('scroll update access start:', child[0].style.opacity);
        expect(getFloat(child[0].style.opacity)).to.above(0).below(0.1);
        window.scrollTo(0, 700);
        setTimeout(()=> {
          console.log('scroll update access end:', child[0].style.opacity);
          expect(getFloat(child[0].style.opacity)).to.above(0.9).below(1);
          window.scrollTo(0, 745);
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
    expect(getFloat(child[0].style.opacity)).to.be(0);
    console.log('window height:', document.documentElement.getBoundingClientRect().height);
    console.log('playScale = [0.5, 1]: pageYOffset is:', 'start:' + (0.5 * 300 + 300 + 145), 'end:' + (145 + 300 + 300));
    window.scrollTo(0, 595);
    setTimeout(()=> {
      console.log('window.pageYOffset:', window.pageYOffset);
      console.log('scroll to start:', child[0].style.opacity);
      expect(getFloat(child[0].style.opacity)).to.be(0);
      window.scrollTo(0, 745);
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
    window.scrollTo(0, 745);
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
