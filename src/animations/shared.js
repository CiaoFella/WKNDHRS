import scrollLogo from './shared/scrollLogo';
import scrollParallax from './shared/scrollParallax';

function init() {
  scrollLogo.init();
  scrollParallax.init();
}

function cleanup() {
  scrollLogo.cleanup();
  scrollParallax.cleanup();
}

export default {
  init,
  cleanup,
};
