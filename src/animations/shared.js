import scrollParallax from './shared/scrollParallax.js';
import scrollText from './shared/scrollText.js';

function init() {
  scrollParallax.init();
  scrollText.init();
}

function cleanup() {
  scrollParallax.cleanup();
  scrollText.cleanup();
}

export default {
  init,
  cleanup,
};
