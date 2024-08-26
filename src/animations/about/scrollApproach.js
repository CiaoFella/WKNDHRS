import { topClipPath, fullClipPath, bottomClipPath, isTablet } from '../../utilities/variables.js'
import { gsap, ScrollTrigger, SplitType } from '../../vendor.js'

let ctx

const mm = gsap.matchMedia()

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

        let headlineYPercent = 200

        mm.add(isTablet, () => {
          headlineYPercent = 250
        })
        gsap.set(headlineSplit.lines, { yPercent: headlineYPercent })
        gsap.set(numbers, { yPercent: 100 })
        gsap.set(lists, { opacity: 0.25 })
        listEnterTl
          .to(
            headlineSplit.lines,
            {
              yPercent: 0,
              stagger: 0.1,
            },
            '<+0.2'
          )
          .to(list, { opacity: 1, duration: 0.25, ease: 'power2.inOut' }, '<+0.2')
          .to(
            numbers[index],
            {
              yPercent: 0,
            },
            '<'
          )

        if (index > 0) {
          const prevHeadlineLines = headlines[index - 1].querySelectorAll('.line')
          const prevNumber = numbers[index - 1]

          listEnterTl
            .fromTo(
              prevHeadlineLines,
              { yPercent: 0 },
              { yPercent: -headlineYPercent, stagger: 0.1, immediateRender: false },
              0
            )
            .fromTo(prevNumber, { yPercent: 0 }, { yPercent: -100, immediateRender: false }, '<')
        }

        gsap.set(headlines[0].querySelectorAll('.line'), { yPercent: 0 })
        gsap.set(numbers[0], { yPercent: 0 })

        ScrollTrigger.create({
          trigger: list,
          animation: listScrubTl,
          start: 'top bottom',
          end: 'top top',
          scrub: 1,
          preventOverlaps: self => {
            self.getTrailing().forEach(trigger => {
              trigger.endAnimation()
            })
          },
          fastScrollEnd: 100,
          onEnter: () => {
            const nextHeadlines = [...headlines].slice(index + 1)
            const nextNumbers = [...numbers].slice(index + 1)
            nextHeadlines.forEach(nextHeadline => {
              const nextHeadlineLines = nextHeadline.querySelectorAll('.line')
              gsap.set(nextHeadlineLines, { yPercent: headlineYPercent })
            })
            nextNumbers.forEach(nextNumber => {
              gsap.set(nextNumber, { yPercent: 100 })
            })
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
