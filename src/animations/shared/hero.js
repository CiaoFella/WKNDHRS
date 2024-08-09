import { gsap, ScrollTrigger } from '../../vendor.js';

let context;

function init() {
  const section = document.querySelector('[data-hero]');
  const heroType = section.dataset.hero;
  switch (heroType) {
    case 'home':
      context = gsap.context(() => {
        const homeTl = gsap.timeline();

        const bgOverlay = section.querySelectorAll(
          '[data-animate-hero=bg-overlay]'
        );

        ScrollTrigger.create({
          trigger: section,
          animation: homeTl,
          start: 'top top',
          end: 'center bottom',
          scrub: true,
        });

        homeTl.fromTo(
          bgOverlay,
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            duration: 0.5,
            delay: 0.5,
            ease: 'none',
          }
        );
      });

      break;

    default:
      break;
  }
}

function cleanup() {
  context && context.revert();
}

export default {
  init,
  cleanup,
};
