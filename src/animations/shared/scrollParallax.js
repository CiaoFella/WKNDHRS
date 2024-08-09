import { gsap, ScrollTrigger } from '../../vendor.js';

let ctx;

function init() {
  const section = document.querySelector('[data-scroll-parallax=section]');

  if (section) {
    const parallax = section.querySelectorAll(
      '[data-scroll-parallax=parallax]'
    );
    ctx = gsap.context(() => {
      const tl = gsap.timeline();

      ScrollTrigger.create({
        animation: tl,
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      });

      if (parallax && parallax.length > 0) {
        parallax.forEach(item => {
          tl.fromTo(
            item,
            {
              y: -5,
            },
            {
              y: 5,
              duration: 1,
              ease: 'none',
            }
          );
        });
      }
    });
  }
}

function cleanup() {
  ctx && ctx.revert();
}

export default {
  init,
  cleanup,
};
