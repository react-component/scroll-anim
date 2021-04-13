// export this package's api
import { polyfill } from 'react-lifecycles-compat';
import ScrollOverPack from './ScrollOverPack';
import ScrollParallax from './ScrollParallax';
import ScrollLink from './ScrollLink';
import ScrollElement from './ScrollElement';
import ScrollEvent from './EventDispatcher';
import Screen from './ScrollScreen';
export var OverPack = polyfill(ScrollOverPack);
export var Parallax = polyfill(ScrollParallax);
export var Element = polyfill(ScrollElement);
export var Link = ScrollLink;
export var Event = ScrollEvent;
export var scrollScreen = Screen;
export default {
  OverPack: OverPack,
  Parallax: Parallax,
  Element: Element,
  Link: Link,
  Event: Event,
  scrollScreen: scrollScreen
};