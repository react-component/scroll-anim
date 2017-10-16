/* eslint no-console:0 */
import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import ScrollAnim from '../index';
import TestUtils from 'react-dom/test-utils';
import ticker from 'rc-tween-one/lib/ticker';

const windowHeight = 500;
const docHeight = 2000;
const startHeight = docHeight - 1000 - windowHeight;
const endHeight = startHeight + windowHeight;
describe('rc-scroll-anim', () => {
  let div;
  let instance;
  function createScrollParallax(props) {
    class ParallaxDemo extends React.Component {
      constructor() {
        super(...arguments);
      }

      render() {
        return (<div
          style={{ height: 500, overflow: 'scroll', position: 'absolute', width: '100%', top: 0 }}
          id="c-div"
        >
          <div style={{ height: 1000 }}></div>
          <div style={{ height: 1000 }}>
            -------------
            <ScrollAnim.Parallax {...this.props} targetId="c-div">
              demo
            </ScrollAnim.Parallax>
            -------------
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
    instance = createScrollParallax({
      style: { opacity: 0 },
      component: 'i',
      animation: { opacity: 1 },
      always: false,
    });
    ticker.timeout(() => {
      const cDom = document.getElementById('c-div');
      console.log('wrapper height:', windowHeight, 'doc height:', docHeight);
      cDom.scrollTop = endHeight + 10;
      console.log('scrollTop:', cDom.scrollTop);
      ticker.timeout(() => {
        let child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
        console.log('child opacity:', getFloat(child[0].style.opacity));
        expect(getFloat(child[0].style.opacity)).to.above(0.99);
        cDom.scrollTop = 0;
        console.log('scrollTop:', cDom.scrollTop);
        ticker.timeout(() => {
          child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
          console.log('always = false, child opacity:', child[0].style.opacity);
          expect(getFloat(child[0].style.opacity)).to.be(1);
          done();
        }, 350);
      }, 350);
    }, 35);
  });

  it('parallax playScale', (done) => {
    instance = createScrollParallax({
      style: { opacity: 0 },
      component: 'i',
      animation: { opacity: 1, playScale: [0.5, 1] },
    });
    const cDom = document.getElementById('c-div');
    let child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
    cDom.scrollTop = startHeight + windowHeight * 0.5;
    expect(getFloat(child[0].style.opacity)).to.be(0);
    console.log('scrollTop:', cDom.scrollTop);
    ticker.timeout(() => {
      child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
      console.log('child start opacity:', getFloat(child[0].style.opacity));
      cDom.scrollTop = endHeight;
      console.log('scrollTop:', cDom.scrollTop);
      ticker.timeout(() => {
        child = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'i');
        console.log('child end opacity:', getFloat(child[0].style.opacity));
        expect(getFloat(child[0].style.opacity)).to.above(0.98);
        done();
      }, 350);
    }, 350);
  });
});
