// export this package's api
import ScrollOverPack from './ScrollOverPack';
import ScrollParallax from './ScrollParallax';
import ScrollLink from './ScrollLink';
import ScrollElement from './ScrollElement';
import ScrollEvent from './EventDispatcher';
import scrollScreen from './ScrollScreen';

export default {
  OverPack: ScrollOverPack,
  Parallax: ScrollParallax,
  Element: ScrollElement,
  Link: ScrollLink,
  Event: ScrollEvent,
  scrollScreen,
};
