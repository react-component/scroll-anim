/* eslint no-console:0 */
import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import ScrollAnim from '../index';
import TestUtils from 'react-addons-test-utils';
import ticker from 'rc-tween-one/lib/ticker';

describe('rc-scroll-anim', () => {
  let div;
  let instance;

  function createScrollParallax(props) {
    class ParallaxDemo extends React.Component {
      constructor() {
        super(...arguments);
      }

      render() {
        return (<div>
          <div style={{ height: 1000 }}></div>
          <div style={{ height: 1000 }}>
            <ScrollAnim.Parallax {...this.props}>
              demo
            </ScrollAnim.Parallax>
          </div>
        </div>);
      }
    }
    return ReactDom.render(<ParallaxDemo {...props} />, div);
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

  it('parallax always false', (done) => {
    window.scrollTo(0, 0);
    instance = createScrollParallax({
      style: { opacity: 0 },
      component: 'i',
      animation: { opacity: 1 },
      always: false,
    });
    setTimeout(() => {
      const windowHeight = document.documentElement.clientHeight;
      const docHeight = document.documentElement.getBoundingClientRect().height;
      const startHeight = docHeight - 1000 - windowHeight;
      const endHeight = startHeight + windowHeight;
      console.log('window height:', windowHeight, 'doc height:', docHeight);
      window.scrollTo(0, endHeight + 1);
      console.log('window.pageYOffset:', window.pageYOffset);
      setTimeout(() => {
        window.scrollTo(0, 0);
        console.log('window.pageYOffset:', window.pageYOffset);
        setTimeout(() => {
          const child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
          console.log('always = false, child opacity:', child[0].style.opacity);
          expect(getFloat(child[0].style.opacity)).to.be(1);
          done();
        }, 300);
      }, 300);
    });
  });

  it('parallax scroll', (done) => {
    window.scrollTo(0, 0);
    instance = createScrollParallax({
      style: { opacity: 0 },
      component: 'i',
      animation: { opacity: 1 },
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
    ticker.timeout(() => {
      console.log('current scroll top:', window.pageYOffset);
      console.log('scroll to start:', child[0].style.opacity);
      expect(getFloat(child[0].style.opacity)).to.be(0);
      window.scrollTo(0, startHeight + 0.1 * windowHeight);
      ticker.timeout(() => {
        console.log('current scroll top:', window.pageYOffset);
        console.log('scroll update access start:', child[0].style.opacity);
        expect(getFloat(child[0].style.opacity)).to.above(0).below(0.5);
        window.scrollTo(0, endHeight);
        ticker.timeout(() => {
          console.log('current scroll top:', window.pageYOffset);
          console.log('scroll update access end:', child[0].style.opacity);
          expect(getFloat(child[0].style.opacity)).to.be(1);
          done();
        }, 300);
      }, 100);
    }, 100);
  });

  it('parallax playScale', (done) => {
    window.scrollTo(0, 0);
    instance = createScrollParallax({
      style: { opacity: 0 },
      component: 'i',
      animation: { opacity: 1, playScale: [0.5, 1] },
    });
    const child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
    const windowHeight = document.documentElement.clientHeight;
    const docHeight = document.documentElement.getBoundingClientRect().height;
    const startHeight = docHeight - 1000 - windowHeight;
    const endHeight = startHeight + windowHeight;
    console.log('window height:', windowHeight, 'doc height:', docHeight);
    expect(getFloat(child[0].style.opacity)).to.be(0);
    console.log('window height:', docHeight, 'window height:', windowHeight);
    console.log('playScale = [0.5, 1]: pageYOffset is:',
      'start:', (startHeight + windowHeight * 0.5), 'end:', endHeight
    );
    window.scrollTo(0, startHeight + windowHeight * 0.5);
    ticker.timeout(() => {
      console.log('window.pageYOffset:', window.pageYOffset);
      console.log('scroll to start:', child[0].style.opacity);
      expect(getFloat(child[0].style.opacity)).to.be(0);
      window.scrollTo(0, endHeight + 1);
      ticker.timeout(() => {
        console.log('window.pageYOffset:', window.pageYOffset);
        console.log('scroll to end:', child[0].style.opacity);
        expect(getFloat(child[0].style.opacity)).to.be(1);
        done();
      }, 100);
    }, 100);
  });
});
