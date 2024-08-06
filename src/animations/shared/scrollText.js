import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { fullClipPath, topClipPath } from '../../utilities/variables';
import { unwrapSpanAndPreserveClasses } from '../../utilities/helper';

gsap.registerPlugin(ScrollTrigger);

let ctx;

function init() {
  ctx = gsap.context(() => {
    const textScrollSections = document.querySelectorAll(
      '[data-scroll-text=section]'
    );

    textScrollSections.forEach(section => {
      const headline = section.querySelectorAll('[data-scroll-text=headline]');
      const text = section.querySelectorAll('[data-scroll-text=text]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top 60%',
          toggleActions: 'none play none reset',
        },
      });

      if (headline && headline.length > 0) {
        headline.forEach(item => {
          unwrapSpanAndPreserveClasses(item);
          const headlineSplit = new SplitType(item, {
            types: 'lines',
          });
          const headlineDelay = item.dataset.delay || 0;
          const headlineDuration = item.dataset.duration || 2;

          let headlineY = 150;
          let mm = gsap.matchMedia();

          mm.add('(max-width: 991px)', () => {
            headlineY = 75;
          });

          tl.fromTo(
            headlineSplit.lines,
            { clipPath: topClipPath, y: headlineY },
            {
              clipPath: fullClipPath,
              y: 0,
              duration: headlineDuration,
              delay: headlineDelay,
              stagger: 0.15,
              ease: 'expo.out',
            },
            '<+0.1'
          );
        });
      }

      if (text && text.length > 0) {
        text.forEach(item => {
          const textDelay = item.dataset.delay || 0;
          const textDuration = item.dataset.duration || 2;

          const textSplit = new SplitType(item, {
            types: 'lines',
          });

          tl.fromTo(
            textSplit.lines,
            { clipPath: topClipPath, y: 50 },
            {
              clipPath: fullClipPath,
              y: 0,
              duration: textDuration,
              delay: textDelay,
              stagger: 0.1,
              ease: 'expo.out',
            },
            0
          );
        });
      }
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