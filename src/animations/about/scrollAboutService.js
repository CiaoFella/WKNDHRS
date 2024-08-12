import {
  fullClipPath,
  leftClipPath,
  topClipPath,
} from '../../utilities/variables.js';
import { gsap, ScrollTrigger, SplitType } from '../../vendor.js';

let ctx;

function init() {
  const section = document.querySelector('[data-scroll-service=section]');
  if (section) {
    const items = section.querySelectorAll('[data-scroll-service=item]');
    const intro = section.querySelector('[data-scroll-service=intro]');
    const introButton = section.querySelector(
      '[data-scroll-service=intro-button]'
    );

    const introSplit = new SplitType(intro, {
      type: 'words',
    });

    ctx = gsap.context(() => {
      items.forEach(item => {
        const headline = item.querySelector('[data-scroll-service=headline]');
        const list = item.querySelector('[data-scroll-service=list]');
        const visual = item.querySelector('[data-scroll-service=visual]');
        const listSplit = new SplitType(list, {
          type: 'words',
        });

        const itemTl = gsap.timeline({
          defaults: { duration: 1.5, ease: 'expo.out' },
        });

        ScrollTrigger.create({
          trigger: item,
          animation: itemTl,
          start: 'top bottom',
          end: 'top 75%',
          toggleActions: 'none play none reset',
        });

        itemTl
          .from(headline, {
            yPercent: 150,
          })
          .fromTo(
            visual,
            { clipPath: leftClipPath },
            { clipPath: fullClipPath },
            '<'
          )
          .fromTo(
            listSplit.words,
            { clipPath: topClipPath, yPercent: -50 },
            {
              clipPath: fullClipPath,
              yPercent: 0,
              stagger: { each: 0.1, ease: 'power3.in' },
            },
            '<'
          );
      });

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'expo.out' },
      });

      ScrollTrigger.create({
        trigger: section,
        animation: tl,
        start: 'top bottom',
        end: 'top 75%',
        toggleActions: 'none play none reset',
      });

      tl.fromTo(
        introSplit.words,
        { clipPath: topClipPath, yPercent: 100 },
        {
          clipPath: fullClipPath,
          yPercent: 0,
          stagger: { each: 0.1, ease: 'power4.in' },
        }
      ).fromTo(
        introButton,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '<+0.1'
      );
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
