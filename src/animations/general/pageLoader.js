import { normalizeLogo } from '../../utilities/helper.js'
import { gsap } from '../../vendor.js'
import { enterPageAnimation } from './enterPageAnimation.js'

let ctx

function init(namespace) {
  const section = document.querySelector('[data-page-loader=section]')

  if (section) {
    ctx = gsap.context(() => {
      const menu = document.querySelector('[data-menu=section]')
      const navBarMenu = document.querySelector('[data-menu=navbar-menu]')
      const hideLetters = document.querySelectorAll('[data-hide=letter-wrap]')
      const element = section.querySelectorAll('[data-page-loader=element]')
      const bg = section.querySelector('[data-page-loader=bg]')
      const logo = document.querySelector('[data-logo=wrap]')

      const tl = gsap.timeline({ paused: true, defaults: { duration: 1, ease: 'expo.out' } })

      tl.set(section, { display: 'flex' })
      tl.set(logo, { fontSize: '9vw' })
      tl.set(navBarMenu, { opacity: 0 })
      tl.set(menu, { pointerEvents: 'none' })

      tl.to(hideLetters, {
        opacity: 0,
        duration: 2,
        stagger: { from: 'random', amount: 0.1 },
      })
        .fromTo(hideLetters, { width: '100%' }, { width: '0%', duration: 2, ease: 'expo.out' }, '<+15%')
        .to(element, { yPercent: -100, duration: 1 }, '>-15%')
        .call(
          () => {
            normalizeLogo(namespace)
          },
          [],
          '<'
        )
        .to(bg, { scaleY: '0', duration: 1, transformOrigin: '50% 0%' }, '<+35%')
        .call(() => enterPageAnimation().play(), [], '<+50%')
        .to(navBarMenu, { opacity: 1, duration: 1, ease: 'power2.out' }, '>-25%')
        .to(section, { display: 'none', duration: 0 })
        .set(menu, { pointerEvents: 'auto' }, '<')

      tl.play()
    })
  }
}

function cleanup() {
  ctx && ctx.revert()
}

export default {
  init,
  cleanup,
}
