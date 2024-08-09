import shared from '../animations/shared.js';
import scrollLogo from '../animations/scrollLogo.js';

function init() {
  console.log('home init');
  scrollLogo.init();
  shared.init();
}

function cleanup() {
  scrollLogo.cleanup();
  shared.cleanup();
}

export default {
  init,
  cleanup,
};
