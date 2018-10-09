// Type definitions for rc-scroll-anim 2.5
// Project: https://github.com/react-component/scroll-anim
// Definitions by: jljsj33 <https://github.com/jljsj33>
// Definitions: https://github.com/react-component/scroll-anim
import ScrollElement from './ScrollElement';
import ScrollOverPack from './ScrollOverPack';
import ScrollParallax from './ScrollParallax';
import ScrollLink from './ScrollLink';
import Screen from './ScrollScreen';
import ScrollEvent from './EventDispatcher';

export const Element: typeof ScrollElement;
export const OverPack: typeof ScrollOverPack;
export const Parallax: typeof ScrollParallax;
export const Link: typeof ScrollLink;
export const scrollScreen: typeof Screen;
export const Event: typeof ScrollEvent;

declare const ScrollAnim: {
  Element: typeof ScrollElement,
  OverPack: typeof ScrollOverPack,
  Parallax: typeof ScrollOverPack,
  Link: typeof ScrollLink,
  scrollScreen: typeof Screen,
  Event: typeof ScrollEvent,
}

export default ScrollAnim;
