import heroAnimation from '../animations/hero';

function init() {
  console.log('about init');
  heroAnimation.init();
}

function cleanup() {
  heroAnimation.cleanup();
}

export default {
  init,
  cleanup,
};
