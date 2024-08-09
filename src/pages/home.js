import shared from '../animations/shared.js';
import scrollLogo from '../animations/home/scrollLogo.js';
import scrollService from '../animations/home/scrollService.js';
import scrollVisual from '../animations/general/scrollVisual.js';

function init() {
  console.log('home init');
  scrollLogo.init();
  scrollVisual.init();
  scrollService.init();
  shared.init();
}

function cleanup() {
  scrollLogo.cleanup();
  scrollVisual.cleanup();
  scrollService.cleanup();
  shared.cleanup();
}

export default {
  init,
  cleanup,
};
