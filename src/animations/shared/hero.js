import { topClipPath, fullClipPath } from '../../utilities/variables.js';
import { gsap, ScrollTrigger, SplitType } from '../../vendor.js';

let context;

function init() {
  const section = document.querySelector('[data-hero]');
  const heroType = section.dataset.hero;
  context = gsap.context(() => {
    switch (heroType) {
      case 'home':
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
        break;
      case 'sub':
        const subTl = gsap.timeline();
        const subScrollSection = document.querySelector(
          '[data-scroll-hero=section]'
        );
        const subScrollTitle = section.querySelector(
          '[data-scroll-hero=title]'
        );
        const subScrollText = section.querySelector('[data-scroll-hero=text]');
        const subTextSplit = new SplitType(subScrollText, {
          type: 'lines',
        });

        ScrollTrigger.create({
          trigger: subScrollSection,
          animation: subTl,
          start: 'top top',
          end: 'bottom top',
          toggleActions: 'play none none reverse',
        });

        const currentFontSize = Number(
          window
            .getComputedStyle(subScrollTitle)
            .getPropertyValue('font-size')
            .slice(0, -2)
        );

        subTl
          .to(
            subScrollTitle,
            {
              fontSize: currentFontSize / 3,
              duration: 0.5,
              ease: 'power2.inOut',
            },
            '<'
          )
          .fromTo(
            subTextSplit.lines,
            { clipPath: topClipPath, yPercent: 150 },
            {
              clipPath: fullClipPath,
              yPercent: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: 'power2.out',
            },
            '<'
          );

        break;

      default:
        break;
    }
  });
}

function cleanup() {
  context && context.revert();
}

export default {
  init,
  cleanup,
};
