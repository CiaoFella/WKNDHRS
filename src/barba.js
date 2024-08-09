import { fullClipPath, topClipPath } from './utilities/variables.js';
import { gsap, barba } from './vendor.js';

barba.init({
  transitions: [
    {
      name: 'default-transition',
      async leave(data) {
        await gsap.to(data.current.container, {
          opacity: 0,
          onComplete: done,
        });
      },
      enter(data) {
        gsap.fromTo(
          data.next.container,
          {
            clipPath: topClipPath,
          },
          { clipPath: fullClipPath, duration: 1 }
        );
      },
    },
  ],
  views: [
    {
      namespace: 'home',
      beforeEnter({ next }) {
        // Additional logic for home page before entering
      },
    },
    {
      namespace: 'about',
      beforeEnter({ next }) {
        // Additional logic for about page before entering
      },
    },
    {
      namespace: 'contact',
      beforeEnter({ next }) {
        // Additional logic for contact page before entering
      },
    },
  ],
});

export default barba;
