import { topClipPath, fullClipPath, bottomClipPath } from '../../utilities/variables.js'
import { gsap, ScrollTrigger, SplitType } from '../../vendor.js'

let ctx

function init() {
  const section = document.querySelector('[data-scroll-approach=section]')

  if (section) {
    const title = section.querySelector('[data-scroll-approach=title]')
    const titleSplit = new SplitType(title, {
      type: 'words',
    })

    const lists = section.querySelectorAll('[data-scroll-approach=list]')
    const headlines = section.querySelectorAll('[data-scroll-approach=headline]')
    const numbers = section.querySelectorAll('[data-scroll-approach=number]')
    const zero = section.querySelector('[data-scroll-approach=number-zero]')
    const visuals = section.querySelectorAll('[data-scroll-approach=visual]')

    ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        defaults: { duration: 1, ease: 'expo.out' },
      })

      ScrollTrigger.create({
        trigger: section,
        animation: mainTl,
        start: 'top bottom',
        end: 'top center',
        toggleActions: 'none play none reset',
      })

      mainTl.fromTo(
        titleSplit.words,
        { clipPath: topClipPath, yPercent: 50 },
        {
          clipPath: fullClipPath,
          yPercent: 0,
          stagger: 0.1,
        }
      )

      lists.forEach((list, index) => {
        const listScrubTl = gsap.timeline({
          defaults: { duration: 1, ease: 'expo.inOut' },
        })
        const listEnterTl = gsap.timeline({
          defaults: { duration: 1, ease: 'expo.inOut' },
          paused: true,
        })

        const headlineSplit = new SplitType(headlines[index], {
          type: 'lines',
        })

        gsap.set(headlineSplit.lines, { yPercent: 200 })
        gsap.set([numbers, zero], { yPercent: 100 })
        listEnterTl
          .to(
            headlineSplit.lines,
            {
              yPercent: 0,
              stagger: 0.1,
            },
            '<+0.2'
          )
          .to(
            numbers[index],
            {
              yPercent: 0,
            },
            '<'
          )

        if (index === 0) {
          listEnterTl.to(zero, { yPercent: 0 }, 0)
        }

        if (index > 0) {
          const prevHeadlineLines = headlines[index - 1].querySelectorAll('.line')
          const prevNumber = numbers[index - 1]

          listEnterTl.to(prevHeadlineLines, { yPercent: -200, stagger: 0.1 }, 0)
          listEnterTl.to(prevNumber, { yPercent: -100 }, '<')
        }

        ScrollTrigger.create({
          trigger: list,
          animation: listScrubTl,
          start: 'top center',
          end: 'top top',
          scrub: 1,
          onEnter: () => {
            listEnterTl.play()
          },
          onLeaveBack: () => {
            listEnterTl.reverse()
          },
        })

        listScrubTl.fromTo(visuals[index], { clipPath: bottomClipPath }, { clipPath: fullClipPath, ease: 'none' })
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
