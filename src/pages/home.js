import shared from '../animations/shared.js';
import scrollLogo from '../animations/home/scrollLogo.js';
import scrollService from '../animations/home/scrollService.js';

function init() {
  console.log('home init');
  scrollLogo.init();
  scrollService.init();
  shared.init();
}

function cleanup() {
  scrollLogo.cleanup();
  scrollService.cleanup();
  shared.cleanup();
}

export default {
  init,
  cleanup,
};
