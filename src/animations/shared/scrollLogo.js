import { gsap, ScrollTrigger } from '../../vendor';

let ctx;

function init() {
  const section = document.querySelector('[data-scroll-nav-logo=section]');
  const logo = document.querySelector('[data-scroll-nav-logo=logo]');
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    tl.from(logo, {
      width: '60%',
      duration: 1,
    });
  });
}

function cleanup() {
  ctx && ctx.revert();
}

export default {
  init,
  cleanup,
};
