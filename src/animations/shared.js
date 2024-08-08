import scrollLogo from './shared/scrollLogo.js';
import scrollParallax from './shared/scrollParallax.js';

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
