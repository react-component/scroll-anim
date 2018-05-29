// export this package's api
import ScrollOverPack from './ScrollOverPack';
import ScrollParallax from './ScrollParallax';
import ScrollLink from './ScrollLink';
import ScrollElement from './ScrollElement';
import ScrollEvent from './EventDispatcher';
import Screen from './ScrollScreen';

export const OverPack = ScrollOverPack;
export const Parallax = ScrollParallax;
export const Element = ScrollElement;
export const Link = ScrollLink;
export const Event = ScrollEvent;
export const scrollScreen = Screen;

export default {
  OverPack: ScrollOverPack,
  Parallax: ScrollParallax,
  Element: ScrollElement,
  Link: ScrollLink,
  Event: ScrollEvent,
  scrollScreen: Screen,
};
