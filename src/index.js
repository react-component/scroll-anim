// export this package's api
import { polyfill } from 'react-lifecycles-compat';
import ScrollOverPack from './ScrollOverPack';
import ScrollParallax from './ScrollParallax';
import ScrollLink from './ScrollLink';
import ScrollElement from './ScrollElement';
import ScrollEvent from './EventDispatcher';
import Screen from './ScrollScreen';

export const OverPack = polyfill(ScrollOverPack);
export const Parallax = polyfill(ScrollParallax);
export const Element = polyfill(ScrollElement);
export const Link = ScrollLink;
export const Event = ScrollEvent;
export const scrollScreen = Screen;

export default {
  OverPack,
  Parallax,
  Element,
  Link,
  Event,
  scrollScreen,
};
