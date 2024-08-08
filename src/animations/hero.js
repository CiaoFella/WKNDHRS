import { gsap } from '../imports.js';

let context;

function init() {}

function cleanup() {
  context && context.revert();
}

export default {
  init,
  cleanup,
};
