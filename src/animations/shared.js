import footer from './general/footer.js'
import hero from './shared/hero.js'
import scrollParallax from './shared/scrollParallax.js'
import scrollText from './shared/scrollText.js'

function init() {
  hero.init()
  scrollParallax.init()
  scrollText.init()
  footer.init()
}

function cleanup() {
  hero.cleanup()
  scrollParallax.cleanup()
  scrollText.cleanup()
  footer.cleanup()
}

export default {
  init,
  cleanup,
}
