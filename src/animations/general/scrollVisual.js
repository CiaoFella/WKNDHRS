import { bottomClipPath, fullClipPath } from '../../utilities/variables.js';
import { gsap, ScrollTrigger } from '../../vendor.js';

let ctx;

function init() {
  const sections = document.querySelectorAll('[data-scroll-visual=section]');
  if (sections && sections.length > 0) {
    sections.forEach(section => {
      const items = section.querySelectorAll('[data-scroll-visual=visual]');

      const tl = gsap.timeline();
      ScrollTrigger.create({
        trigger: section,
        animation: tl,
        start: 'top bottom',
        end: 'top center',
        toggleActions: 'none play none reset',
      });

      items.forEach(item => {
        const animationType = item.dataset.type;
        ctx = gsap.context(() => {
          switch (animationType) {
            case 'clip-bottom':
              tl.fromTo(
                item,
                { clipPath: bottomClipPath },
                {
                  clipPath: fullClipPath,
                  duration: 1,
                  ease: 'expo.out',
                },
                '<+0.1'
              );
              break;

            default:
              break;
          }
        });
      });
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
