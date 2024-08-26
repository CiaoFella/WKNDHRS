import { gsap, ScrollTrigger } from '../../vendor.js'

let ctx

function init() {
  const section = document.querySelector('[data-scroll-nav-logo=section]')
  const logo = document.querySelector('[data-logo=wrap]')
  ctx = gsap.context(() => {
    const tl = gsap.timeline()

    ScrollTrigger.create({
      trigger: section,
      animation: tl,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    })

    tl.to(logo, {
      fontSize: '2rem',
      duration: 1,
    })
  })
}

function cleanup() {
  const allTrigger = ScrollTrigger.getAll()
  if (ctx) {
    ctx.revert()
  }
}

export default {
  init,
  cleanup,
}
