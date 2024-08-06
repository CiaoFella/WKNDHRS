import gsap from 'gsap';

let context;

function init() {
  context = gsap.context(() => {
    gsap.from('.hero-element', { duration: 1, opacity: 0, y: -50 });
  });
}

function cleanup() {
  context && context.revert();
}

export default {
  init,
  cleanup,
};
