import heroAnimation from '../animations/hero';

function init() {
  console.log('home init');
  heroAnimation.init();
}

function cleanup() {
  heroAnimation.cleanup();
}

export default {
  init,
  cleanup,
};
