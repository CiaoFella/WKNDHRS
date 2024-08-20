import { fullClipPath, isDesktop, isTablet, topClipPath } from '../../utilities/variables.js'
import { gsap, ScrollTrigger, SplitType } from '../../vendor.js'

let ctx

const mm = gsap.matchMedia()

function init() {
  const section = document.querySelector('[data-scroll-detail-info=section]')

  if (section) {
    const items = section.querySelectorAll('[data-scroll-detail-info=element]')
    const paragraphs = section.querySelectorAll('[data-scroll-detail-info=paragraph] p')
    const paragraphSplits = new SplitType(paragraphs, { types: 'lines' })

    ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'expo.out' },
      })

      ScrollTrigger.create({
        trigger: section,
        animation: tl,
        start: 'top bottom',
        end: 'top 65%',
        toggleActions: 'none play none reset',
      })

      mm.add(isTablet, () => {
        tl.from(items, { yPercent: 110, stagger: 0.1 }).fromTo(
          paragraphSplits.lines,
          { opacity: 0, yPercent: 50 },
          { opacity: 1, yPercent: 0, stagger: 0.05 },
          '<+0.25'
        )
      })

      mm.add(isDesktop, () => {
        tl.from(items, { yPercent: 110, stagger: 0.1 }).fromTo(
          paragraphSplits.lines,
          { clipPath: topClipPath, yPercent: 50 },
          { clipPath: fullClipPath, yPercent: 0, stagger: 0.05 },
          '<+0.25'
        )
      })
    })
  }
}

function cleanup() {
  if (ctx) {
    ctx.revert()
  }
}

export default {
  init,
  cleanup,
}
