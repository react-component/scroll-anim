import * as React from 'react';
// import { Parallax, Element, OverPack, Link, scrollScreen, Event } from '../typings';
import Event from '../src/EventDispatcher';
import Element from '../src/ScrollElement';
import Link from '../src/ScrollLink';
import OverPack from '../src/ScrollOverPack';
import Parallax from '../src/ScrollParallax';
import scrollScreen from '../src/ScrollScreen';

function TComponent(props: { a?: string, b?: number }) {
  return (
    <div>
      {props.a}
      {props.b}
    </div>
  );
}

function Text() {
  scrollScreen.init();
  Event.addEventListener('r', (e) => { console.log(e); }, document.body);
  return (
    <div>
      <Element targetId="a" onChange={(e) => { console.log(e.mode, e.id); }}><div key="1">test</div></Element>
      <Parallax
        animation={{ x: 100 }}
        component={TComponent}
        componentProps={{ a: 'number', b: 100 }}
        always={true}
      >
        abc
      </Parallax>
      <OverPack playScale={[0, 1]} id="abc"><div key="abc">test</div></OverPack>
      <Link to="abc">link</Link>
    </div>
  );
}
