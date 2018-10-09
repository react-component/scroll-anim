import * as React from 'react';
// import { Parallax, Element, OverPack, Link, scrollScreen, Event } from '../typings';
import Element from '../src/ScrollElement';
import OverPack from '../src/ScrollOverPack';
import Parallax from '../src/ScrollParallax';
import Link from '../src/ScrollLink';
import Event from '../src/EventDispatcher';
import scrollScreen from '../src/ScrollScreen';

function TCompoent(props: { a?: string, b?: number }) {
  return (
    <div>
      {props.a}
      {props.b}
    </div>
  );
}

function Text() {
  scrollScreen.init();
  Event.addEventListener('r', () => { }, document.body);
  return (
    <div>
      <Element targetId="a"><div key="1">test</div></Element>
      <Parallax
        animation={{ x: 100 }}
        component={TCompoent}
        componentProps={{ a: 'number', b: 100 }}
        always
      >
        abc
      </Parallax>
      <OverPack playScale={[0, 1]} id="abc"><div key="abc">test</div></OverPack>
      <Link to="abc">link</Link>
    </div>
  );
}
