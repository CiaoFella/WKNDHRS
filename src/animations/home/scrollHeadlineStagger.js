import { gsap, ScrollTrigger } from '../../vendor.js'

let context

function init() {
  const section = document.querySelector('[data-scroll-headline-stagger=section]')
  if (section) {
    const items = section.querySelectorAll('[data-scroll-headline-stagger=item]')
    context = gsap.context(() => {
      const tl = gsap.timeline()

      ScrollTrigger.create({
        trigger: section,
        animation: tl,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1,
      })

      tl.from(items, {
        xPercent: 50,
        duration: 1,
        stagger: 0.2,
      })
    })
  }
}

function cleanup() {
  context && context.revert()
}

export default {
  init,
  cleanup,
}
