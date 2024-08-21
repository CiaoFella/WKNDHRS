import { LazyLoad } from '../vendor.js'
import { gsap } from '../vendor.js'
import { isMobile } from './variables.js'

// Initialize LazyLoad
const lazyLoadInstance = new LazyLoad({
  elements_selector: 'video[data-src]',
  callback_enter: video => {
    // By default, do nothing on enter
  },
})

window.onload = () => {
  const videos = document.querySelectorAll('video[data-src]')
  videos.forEach(video => {
    loadVideo(video)
  })
}

function loadVideo(video) {
  const mm = gsap.matchMedia()

  mm.add(isMobile, () => {
    // Mobile version: Check and load data-src-mobile if available
    const mobileSrc = video.dataset.srcMobile
    video.src = mobileSrc ? mobileSrc : video.dataset.src
  })

  mm.add(!isMobile, () => {
    // Desktop and tablet version: Load the normal data-src video
    video.src = video.dataset.src
  })

  // Add an event listener to autoplay once the video is loaded
  video.addEventListener('loadeddata', () => {
    video.play()
  })
}

export default lazyLoadInstance
