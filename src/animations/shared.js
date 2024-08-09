import scrollLogo from './shared/scrollLogo.js';
import scrollParallax from './shared/scrollParallax.js';
import scrollText from './shared/scrollText.js';

function init() {
  scrollLogo.init();
  scrollParallax.init();
  scrollText.init();
}

function cleanup() {
  scrollLogo.cleanup();
  scrollParallax.cleanup();
  scrollText.cleanup();
}

export default {
  init,
  cleanup,
};
