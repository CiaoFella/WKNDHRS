import { fullClipPath, isDesktop, isMobile, isTablet, topClipPath } from '../../utilities/variables.js'
import { gsap, SplitType, ScrollTrigger } from '../../vendor.js'

const mm = gsap.matchMedia()

export default function handlePageEnterAnimation(currentPage) {
  const tl = gsap.timeline({ paused: true, defaults: { duration: 1, ease: 'expo.out' } })

  const titles = document.querySelectorAll('[data-enter-page=title]')
  const text = document.querySelectorAll('[data-enter-page=text]')

  if (titles && titles.length > 0) {
    mm.add(isTablet, () => {
      tl.fromTo(titles, { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'expo.out' })
    })
    mm.add(isDesktop, () => {
      tl.fromTo(
        titles,
        { clipPath: topClipPath, y: 100 },
        { clipPath: fullClipPath, y: 0, stagger: 0.1, duration: 1, ease: 'expo.out' }
      )
    })
  }
  if (text && text.length > 0) {
    const textSplit = new SplitType(text, {
      types: 'lines',
    })
    mm.add(isTablet, () => {
      tl.fromTo(
        textSplit.lines,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          onComplete: () => ScrollTrigger.refresh(),
        }
      )
    })
    mm.add(isDesktop, () => {
      tl.fromTo(
        textSplit.lines,
        { clipPath: topClipPath, y: 100 },
        {
          clipPath: fullClipPath,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'expo.out',
          onComplete: () => ScrollTrigger.refresh(),
        }
      )
    })
  }

  if (currentPage === 'contact') {
    const section = document.querySelector('[data-enter-contact=section]')

    if (section) {
      const elements = section.querySelectorAll('[data-enter-contact=element]')
      const paragraph = section.querySelector('[data-enter-contact=paragraph]')

      mm.add(isTablet, () => {
        tl.to(elements, { y: 0, stagger: 0.05 }, '<+0.1').fromTo(
          paragraph.querySelectorAll('.line'),
          { opacity: 0, yPercent: 50 },
          { opacity: 1, yPercent: 0, stagger: 0.1 },
          '<+0.5'
        )
      })

      mm.add(isDesktop, () => {
        tl.to(elements, { y: 0, stagger: 0.05 }, '<+0.1').fromTo(
          paragraph.querySelectorAll('.line'),
          { clipPath: topClipPath, yPercent: 50 },
          { clipPath: fullClipPath, yPercent: 0, stagger: 0.1 },
          '<+0.5'
        )
      })
    }
  }

  return tl
}
