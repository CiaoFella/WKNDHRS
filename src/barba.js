import { closeMenu } from './utilities/helper.js'
import { proxy } from './utilities/pageReadyListener.js'
import { bottomClipPath, fullClipPath, topClipPath } from './utilities/variables.js'
import { gsap, barba, ScrollTrigger } from './vendor.js'

gsap.registerPlugin(ScrollTrigger)

barba.hooks.before(data => {
  data.next.container.classList.add('is-animating')
})

barba.hooks.after(data => {
  data.next.container.classList.remove('is-animating')
})

barba.init({
  preventRunning: false,
  transitions: [
    {
      name: 'default-transition',
      sync: true,
      leave(data) {
        const tl = gsap.timeline({ defaults: { duration: 0.5, ease: 'power2.out' } })
        const done = this.async()
        const transitionBg = document.querySelector('[data-animate=transition-bg]')
        proxy.pageReady = false
        closeMenu()
        gsap.set(transitionBg, { display: 'block' })
        tl.to(
          data.current.container,
          {
            scale: 1.02,
            opacity: 0.7,
            transformOrigin: '50% 0%',
            force3D: true,
            duration: 1.5,
            filter: 'grayscale(100%)',
            ease: 'power1.inOut',
          },
          0
        )
          .fromTo(transitionBg, { scaleY: 0 }, { scaleY: 1, transformOrigin: '50% 0%' }, '<+0.25')
          .call(done, [], '>')
      },
      after(data) {
        const transitionBg = document.querySelector('[data-animate=transition-bg]')
        const currentViewportHeight = window.innerHeight
        const enterTl = gsap.timeline({ defaults: { duration: 0.5, ease: 'power2.out' } })
        gsap.set(transitionBg, { display: 'block' })
        enterTl
          .to(transitionBg, { scaleY: 0, transformOrigin: '50% 100%' }, 0)
          .fromTo(
            data.next.container,
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 0px, 0% 0px)',
            },
            {
              clipPath: `polygon(0% 0%, 100% 0%, 100% ${currentViewportHeight}px, 0% ${currentViewportHeight}px)`,
              onComplete: () => {
                gsap.set(data.next.container, { clipPath: fullClipPath })
              },
            },
            '<'
          )

          .call(() => (proxy.pageReady = true), [], '<+50%')
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
})

export default barba
