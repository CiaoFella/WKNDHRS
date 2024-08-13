import shared from '../animations/shared.js';
import scrollLogo from '../animations/home/scrollLogo.js';
import scrollService from '../animations/home/scrollHeadlineStagger.js';
import scrollVisual from '../animations/general/scrollVisual.js';
import scrollSelectedWork from '../animations/scrollSelectedWork.js';
import pageLoader from '../animations/general/pageLoader.js';

function init() {
  pageLoader.init();
  scrollLogo.init();
  scrollVisual.init();
  scrollSelectedWork.init();
  scrollService.init();
  shared.init();
}

function cleanup() {
  pageLoader.cleanup();
  scrollLogo.cleanup();
  scrollVisual.cleanup();
  scrollSelectedWork.cleanup();
  scrollService.cleanup();
  shared.cleanup();
}

export default {
  init,
  cleanup,
};
