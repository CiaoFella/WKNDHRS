import shared from '../animations/shared.js';
import scrollText from '../animations/shared/scrollText.js';

function init() {
  scrollText.init();
  shared.init();
}

function cleanup() {
  scrollText.init();
  shared.cleanup();
}

export default {
  init,
  cleanup,
};
