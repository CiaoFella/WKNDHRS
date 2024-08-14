import { fullClipPath, topClipPath } from '../../utilities/variables.js'
import { gsap, SplitType } from '../../vendor.js'

export function enterPageAnimation() {
  const tl = gsap.timeline({ paused: true })

  const titles = document.querySelectorAll('[data-enter-page=title]')
  const text = document.querySelectorAll('[data-enter-page=text]')

  if (titles && titles.length > 0) {
    tl.fromTo(
      titles,
      { clipPath: topClipPath, y: 100 },
      { clipPath: fullClipPath, y: 0, stagger: 0.1, duration: 1, ease: 'expo.out' }
    )
  }
  if (text && text.length > 0) {
    const textSplit = new SplitType(text, {
      types: 'lines',
    })
    tl.fromTo(
      textSplit.lines,
      { clipPath: topClipPath, y: 100 },
      { clipPath: fullClipPath, y: 0, stagger: 0.1, duration: 1, ease: 'expo.out' }
    )
  }

  return tl
}
