import { gsap, barba } from './imports';

barba.init({
  transitions: [
    {
      name: 'default-transition',
      leave(data) {
        let done = this.async();
        gsap.to(data.current.container, {
          opacity: 0,
          onComplete: done,
        });
      },
      enter(data) {
        gsap.from(data.next.container, {
          opacity: 0,
        });
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
