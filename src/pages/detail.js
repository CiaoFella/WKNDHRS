import scrollInfo from '../animations/detail/scrollInfo.js'
import shared from '../animations/shared.js'
import scrollParallax from '../animations/shared/scrollParallax.js'

function init() {
  scrollInfo.init()
  scrollParallax.init()
  shared.init()
}

function cleanup() {
  scrollInfo.cleanup()
  scrollParallax.cleanup()
  shared.cleanup()
}

export default {
  init,
  cleanup,
}
