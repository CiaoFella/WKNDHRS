import { fullClipPath, topClipPath } from './utilities/variables.js';
import { gsap, barba } from './vendor.js';

barba.init({
  preventRunning: true,
  transitions: [
    {
      name: 'default-transition',
      leave(data) {
        let done = this.async();
        gsap.to(data.current.container, {
          opacity: 0.2,
          duration: 0.25,
          yPercent: 1,
          ease: 'none',
          force3D: true,
          onComplete: done,
        });
      },
      enter(data) {
        gsap.fromTo(
          data.next.container,
          {
            clipPath: topClipPath,
            height: 0,
          },
          {
            clipPath: fullClipPath,
            height: '100vh',
            duration: 1.5,
            ease: 'expo.out',

            onComplete: () => {
              gsap.set(data.next.container, { height: 'auto' });
            },
          }
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
