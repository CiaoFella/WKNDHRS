import { gsap } from '../vendor.js'
import { isDesktop, isMobile } from './variables.js'

const mm = gsap.matchMedia()

export function initializeResponsiveVideos() {
  mm.add(isDesktop, () => {
    loadVideosForScreen('src-desktop', 'src-mobile')
  })

  mm.add(isMobile, () => {
    loadVideosForScreen('src-mobile', 'src-desktop')
  })
}

function loadVideosForScreen(loadAttr, removeAttr) {
  document.querySelectorAll(`video[${loadAttr}]`).forEach(video => {
    const newSrc = video.getAttribute(loadAttr)
    const currentSrc = video.getAttribute('src')

    if (currentSrc !== newSrc) {
      video.setAttribute('src', newSrc)
      video.load()
      video.play().catch(error => {
        console.warn('Video play interrupted:', error.message)
      })
    }

    video.removeAttribute(removeAttr)
  })
}

export function cleanupVideos() {
  document.querySelectorAll('video').forEach(video => {
    video.pause()
    video.removeAttribute('src')
    video.load()
  })

  document.querySelectorAll('video').forEach(video => {
    video.removeEventListener('loadeddata', handleLoadedData)
  })

  mm.clear()
}

export default { initializeResponsiveVideos, cleanupVideos }

function handleLoadedData(event) {
  const video = event.target
  if (document.body.contains(video)) {
    video.play().catch(error => {
      console.warn('Video play interrupted:', error.message)
    })
  }
}
