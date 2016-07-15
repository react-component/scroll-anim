/* eslint no-console:0 */
import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import ScrollAnim from '../index';
import TestUtils from 'react-addons-test-utils';
import ticker from 'rc-tween-one/lib/ticker';
require('./link.spec.less');

describe('rc-scroll-anim', () => {
  let div;
  let instance;

  function createScrollLink(props) {
    class LinkDemo extends React.Component {
      constructor() {
        super(...arguments);
      }

      onFocus(e) {
        const dom = e.target;
        this.barAnimate(dom);
      }

      barAnimate(dom) {
        const bar = this.refs.bar;
        bar.style.left = `${dom.getBoundingClientRect().left}px`;
      }

      render() {
        return (<div>
          <div className="nav">
            <ScrollAnim.Link
              className="nav-list"
              location="page0"
              {...this.props}
              onFocus={this.onFocus.bind(this)}
            >
              page0
            </ScrollAnim.Link>
            <ScrollAnim.Link
              className="nav-list"
              location="page1"
              {...this.props}
              onFocus={this.onFocus.bind(this)}
            >
              page1
            </ScrollAnim.Link>
            <div ref="bar" className="nav-bar"></div>
          </div>
          <ScrollAnim.Element style={{ height: 1000 }} scrollName="page0">
            示例
          </ScrollAnim.Element>
          <ScrollAnim.Element style={{ height: 1000 }} scrollName="page1">
            示例
          </ScrollAnim.Element>
        </div>);
      }
    }
    return ReactDom.render(<LinkDemo {...props} />, div);
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

  it('link bar and active', (done) => {
    console.log(window.innerHeight,
      document.documentElement.clientHeight, document.body.clientHeight);
    window.scrollTo(0, 0);
    instance = createScrollLink();
    const listChild = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'nav-list');
    const barChild = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'nav-bar')[0];
    ticker.timeout(() => {
      console.log('bar left:', barChild.style.left || 0);
      expect(getFloat(barChild.style.left) || 0).to.be(0);
      window.scrollTo(0, 2000);
      console.log('window.pageYOffset:', window.pageYOffset);
      ticker.timeout(() => {
        console.log('bar left:', barChild.style.left);
        console.log('className 0:', listChild[0].className);
        console.log('className 1:', listChild[1].className);
        expect(listChild[1].className.split(' ')[1]).to.be('active');
        expect(getFloat(barChild.style.left)).to.be(100);
        done();
      }, 100);
    }, 100);
  });
});
