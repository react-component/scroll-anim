// Type definitions for rc-scroll-anim 2.5
// Project: https://github.com/react-component/scroll-anim
// Definitions by: jljsj33 <https://github.com/jljsj33>
// Definitions: https://github.com/react-component/scroll-anim
import ScrollElement from '../src/ScrollElement';
import ScrollOverPack from '../src/ScrollOverPack';
import ScrollParallax from '../src/ScrollParallax';
import ScrollLink from '../src/ScrollLink';
import Screen from '../src/ScrollScreen';
import ScrollEvent from '../src/EventDispatcher';

export const Element: typeof ScrollElement;
export const OverPack: typeof ScrollOverPack;
export const Parallax: typeof ScrollParallax;
export const Link: typeof ScrollLink;
export const scrollScreen: typeof Screen;
export const Event: typeof ScrollEvent;

export default interface RcScrollAnim {
  Element: typeof ScrollElement;
  OverPack: typeof ScrollOverPack;
  Parallax: typeof ScrollOverPack;
  Link: typeof ScrollLink;
  scrollScreen: typeof Screen;
  Event: typeof ScrollEvent;
}
