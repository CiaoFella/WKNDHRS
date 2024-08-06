import shared from '../animations/shared';
import scrollText from '../animations/shared/scrollText';

function init() {
  console.log('home init');
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
