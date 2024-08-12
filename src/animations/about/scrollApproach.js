import {
  topClipPath,
  fullClipPath,
  bottomClipPath,
} from '../../utilities/variables.js';
import { gsap, ScrollTrigger, SplitType } from '../../vendor.js';

let ctx;

function init() {
  const section = document.querySelector('[data-scroll-approach=section]');

  if (section) {
    const title = section.querySelector('[data-scroll-approach=title]');
    const titleSplit = new SplitType(title, {
      type: 'words',
    });

    const lists = section.querySelectorAll('[data-scroll-approach=list]');
    const headlines = section.querySelectorAll(
      '[data-scroll-approach=headline]'
    );
    const numbers = section.querySelectorAll('[data-scroll-approach=number]');
    const visuals = section.querySelectorAll('[data-scroll-approach=visual]');

    ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        defaults: { duration: 1, ease: 'expo.out' },
      });

      ScrollTrigger.create({
        trigger: section,
        animation: mainTl,
        start: 'top bottom',
        end: 'top 75%',
        toggleActions: 'none play none reset',
      });

      mainTl.fromTo(
        titleSplit.words,
        { clipPath: topClipPath, yPercent: 50 },
        {
          clipPath: fullClipPath,
          yPercent: 0,
          stagger: 0.1,
        }
      );

      lists.forEach((list, index) => {
        const listScrubTl = gsap.timeline({
          defaults: { duration: 1, ease: 'expo.inOut' },
        });

        const headlineSplit = new SplitType(headlines, {
          type: 'lines',
        });
        const lines = headlines[index].querySelectorAll('.line');

        listScrubTl.set([headlineSplit.lines, numbers], { yPercent: 200 });

        ScrollTrigger.create({
          trigger: list,
          animation: listScrubTl,
          start: 'top center',
          end: 'top top',
          scrub: 1,
          onEnter: () => {
            listScrubTl
              .to(lines, { yPercent: 0, stagger: 0.1 })
              .to(numbers[index], {
                yPercent: 0,
              });
          },
        });

        listScrubTl.fromTo(
          visuals[index],
          { clipPath: bottomClipPath },
          { clipPath: fullClipPath, ease: 'none' }
        );
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
