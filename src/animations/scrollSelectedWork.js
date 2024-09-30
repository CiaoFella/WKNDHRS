import { bottomClipPath, fullClipPath, isDesktop, isTablet } from '../utilities/variables.js'
import { gsap, ScrollTrigger } from '../vendor.js'

let ctx

const mm = gsap.matchMedia()

function init() {
  const section = document.querySelector('[data-scroll-selected-work=section]')

  if (section) {
    const items = section.querySelectorAll('[data-scroll-selected-work=item]')
    const list = section.querySelector('[data-scroll-selected-work=list]')

    ctx = gsap.context(() => {
      const scrubTl = gsap.timeline()

      ScrollTrigger.create({
        trigger: section,
        animation: scrubTl,
        start: 'top 75%',
        end: 'top top',
        scrub: 1,
      })

      scrubTl.to(list, { scale: 0.85, duration: 1 })

      items.forEach((item, index) => {
        const headline = item.querySelector('[data-scroll-selected-work=headline]')
        const category = item.querySelector('[data-scroll-selected-work=category]')
        const bg = item.querySelector('[data-scroll-selected-work=bg]')
        const overlay = item.querySelector('[data-scroll-selected-work=overlay]')

        const box = item.querySelector('[data-scroll-selected-work=box]')
        const boxTitle = item.querySelector('[data-scroll-selected-work=box-title]')
        const boxImg = item.querySelector('[data-scroll-selected-work=box-img]')
        const boxVideo = item.querySelector('[data-scroll-selected-work=box-video]')

        const revealTl = gsap.timeline({
          paused: true,
          defaults: { duration: 1 },
        })

        const hoverTl = gsap.timeline({
          paused: true,
          defaults: { duration: 1 },
        })

        if (!section.classList.contains('is-visible')) {
          section.classList.add('is-visible')
        }

        revealTl.set(items, { pointerEvents: 'none' })

        revealTl
          .set(item, { pointerEvents: 'auto' })
          .fromTo([bg, overlay], { clipPath: bottomClipPath }, { clipPath: fullClipPath, ease: 'expo.inOut' }, '<')
          .fromTo(headline, { yPercent: 100 }, { yPercent: 0, ease: 'expo.inOut', willChange: 'transform' }, '<')
          .fromTo(category, { yPercent: 100 }, { yPercent: 0, ease: 'expo.inOut', willChange: 'transform' }, '<')
          .fromTo(
            [boxImg, boxVideo, boxTitle],
            { clipPath: bottomClipPath },
            { clipPath: fullClipPath, ease: 'expo.inOut' },
            '<'
          )

        // Adjust previous headline
        if (index > 0) {
          const prevHeadline = items[index - 1].querySelector('[data-scroll-selected-work=headline]')
          const prevCategory = items[index - 1].querySelector('[data-scroll-selected-work=category]')
          revealTl
            .fromTo(prevHeadline, { yPercent: 0 }, { yPercent: -100, ease: 'expo.inOut', willChange: 'transform' }, '<')
            .fromTo(prevCategory, { yPercent: 0 }, { yPercent: -100, ease: 'expo.inOut', willChange: 'transform' }, '<')
        }

        const triggerHeight = section.offsetHeight / items.length

        ScrollTrigger.create({
          trigger: section,
          animation: revealTl,
          start: () => `${index * triggerHeight} bottom`,
          end: 'bottom bottom',
          onEnter: () => {
            const nextItems = [...items].slice(index + 1)
            nextItems.forEach(item => {
              const nextHeadline = item.querySelectorAll('[data-scroll-selected-work=headline]')
              const nextCategory = item.querySelectorAll('[data-scroll-selected-work=category]')
              gsap.set([nextHeadline, nextCategory], { yPercent: 100 })
            })
          },
          toggleActions: 'play none none reverse',
          preventOverlaps: 'selectedWork',
        })

        mm.add(isDesktop, () => {
          hoverTl.to(boxImg, { opacity: 0, ease: 'expo.inOut' })

          box.addEventListener('mouseenter', () => {
            hoverTl.play()
          })
          box.addEventListener('mouseleave', () => {
            hoverTl.reverse()
          })
        })
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
