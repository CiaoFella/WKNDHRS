import { fullClipPath, rightSideClipPath } from '../../utilities/variables.js';
import { gsap } from '../../vendor.js';

let ctx;

function init() {
  const section = document.querySelector('[data-page-loader=section]');

  if (section) {
    ctx = gsap.context(() => {
      const letters = document.querySelectorAll('[data-logo=letter]');
      const navWrap = document.querySelector('[data-menu=nav-wrap]');
      const hideLetters = document.querySelectorAll('[data-hide=letter-wrap]');
      const element = section.querySelectorAll('[data-page-loader=element]');
      const bg = section.querySelector('[data-page-loader=bg]');

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 1, ease: 'expo.out' },
      });

      tl.to(hideLetters, {
        opacity: 0,
        duration: 2,
        stagger: { from: 'random', amount: 0.05 },
      })
        .fromTo(
          hideLetters,
          { width: '100%' },
          {
            width: '0%',
            duration: 3,
            ease: 'expo.inOut',
          },
          '<'
        )
        .to(element, { yPercent: -100, duration: 1 })
        .to(
          bg,
          { scaleY: '0', duration: 2, transformOrigin: '50% 0%' },
          '<+35%'
        )
        .to(section, { display: 'none', duration: 0 });

      tl.play();
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
