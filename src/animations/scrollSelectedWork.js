import { bottomClipPath, fullClipPath } from '../utilities/variables.js';
import { gsap, ScrollTrigger } from '../vendor.js';

let ctx;

function init() {
  const section = document.querySelector('[data-scroll-selected-work=section]');

  if (section) {
    const items = section.querySelectorAll('[data-scroll-selected-work=item]');
    const list = section.querySelector('[data-scroll-selected-work=list]');

    const scrubTl = gsap.timeline();

    ScrollTrigger.create({
      trigger: section,
      animation: scrubTl,
      start: 'top center',
      end: 'top top',
      scrub: 1,
    });

    scrubTl.to(list, { scale: 0.95, duration: 1 });

    ctx = gsap.context(() => {
      items.forEach((item, index) => {
        const headline = item.querySelector(
          '[data-scroll-selected-work=headline]'
        );
        const category = item.querySelector(
          '[data-scroll-selected-work=category]'
        );
        const bg = item.querySelector('[data-scroll-selected-work=bg]');
        const overlay = item.querySelector(
          '[data-scroll-selected-work=overlay]'
        );

        const box = item.querySelector('[data-scroll-selected-work=box]');
        const boxTitle = item.querySelector(
          '[data-scroll-selected-work=box-title]'
        );
        const boxImg = item.querySelector(
          '[data-scroll-selected-work=box-img]'
        );
        const boxVideo = item.querySelector(
          '[data-scroll-selected-work=box-video]'
        );

        const revealTl = gsap.timeline({
          paused: true,
          defaults: { duration: 1 },
        });

        const hoverTl = gsap.timeline({
          paused: true,
          defaults: { duration: 1 },
        });

        // Animate headline away
        revealTl.set(headline, { yPercent: 100 });
        revealTl.set(category, { yPercent: 100 });
        revealTl.set(items, { pointerEvents: 'none' });

        revealTl
          .set(item, { pointerEvents: 'auto' })
          .fromTo(
            [bg, overlay],
            { clipPath: bottomClipPath },
            { clipPath: fullClipPath, ease: 'expo.inOut' },
            '<'
          )
          .fromTo(
            headline,
            { yPercent: 100 },
            { yPercent: 0, ease: 'expo.inOut' },
            '<'
          )
          .fromTo(
            category,
            { yPercent: 100 },
            { yPercent: 0, ease: 'expo.inOut' },
            '<'
          )
          .fromTo(
            [boxImg, boxVideo, boxTitle],
            { clipPath: bottomClipPath },
            { clipPath: fullClipPath, ease: 'expo.inOut' },
            '<'
          );

        // Adjust previous headline
        if (index > 0) {
          const prevHeadline = items[index - 1].querySelector(
            '[data-scroll-selected-work=headline]'
          );
          const prevCategory = items[index - 1].querySelector(
            '[data-scroll-selected-work=category]'
          );
          const previousItem = items[index - 1];
          revealTl
            .to(prevHeadline, { yPercent: -100, ease: 'expo.inOut' }, '<')
            .to(prevCategory, { yPercent: -100, ease: 'expo.inOut' }, '<');
        }

        ScrollTrigger.create({
          trigger: section,
          start: () => `${index * window.innerHeight} top`,
          end: 'bottom bottom',
          onEnter: () => {
            revealTl.play();
          },
          onLeaveBack: () => {
            revealTl.reverse();
          },
        });

        hoverTl.to(boxImg, { opacity: 0, ease: 'expo.inOut' });

        box.addEventListener('mouseenter', () => {
          hoverTl.play();
        });
        box.addEventListener('mouseleave', () => {
          hoverTl.reverse();
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