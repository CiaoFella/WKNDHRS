import shared from '../animations/shared.js';

function init() {
  console.log('list init');
  shared.init();
}

function cleanup() {
  shared.cleanup();
}

export default {
  init,
  cleanup,
};
