import heroAnimation from '../animations/hero';
import scrollText from '../animations/shared/scrollText';

function init() {
  console.log('home init');
  heroAnimation.init();
  scrollText.init();
}

function cleanup() {
  heroAnimation.cleanup();
}

export default {
  init,
  cleanup,
};
