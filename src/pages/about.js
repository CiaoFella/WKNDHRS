import scrollAboutService from '../animations/about/scrollAboutService.js'
import scrollApproach from '../animations/about/scrollApproach.js'
import scrollHeadlineStagger from '../animations/home/scrollHeadlineStagger.js'
import shared from '../animations/shared.js'

function init() {
  scrollAboutService.init()
  scrollApproach.init()
  scrollHeadlineStagger.init()
  shared.init()
}

function cleanup() {
  scrollAboutService.cleanup()
  scrollApproach.cleanup()
  scrollHeadlineStagger.cleanup()
  shared.cleanup()
}

export default {
  init,
  cleanup,
}
