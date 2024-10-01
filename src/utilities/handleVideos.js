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

function loadVideosForScreen(loadAttr, fallbackAttr) {
  document.querySelectorAll('video').forEach(video => {
    const isLoaded = video.dataset.loaded === 'true' // Check if the video has been loaded
    if (isLoaded) return // Skip if already loaded

    const primarySrc = video.getAttribute(loadAttr)
    const fallbackSrc = video.getAttribute(fallbackAttr)
    const standardSrc = video.getAttribute('src')
    const newSrc = primarySrc || fallbackSrc || standardSrc

    if (standardSrc !== newSrc && newSrc) {
      video.setAttribute('src', newSrc)
      video.load()

      if (isDesktop) {
        video.play().catch(error => {
          // console.log('Video play interrupted:', error.message)
        })
      } else if (isMobile) {
        // On mobile, wait for user interaction to avoid autoplay issues
        video.addEventListener('click', function handlePlayOnClick() {
          video.play().catch(error => {
            // console.log('Video play interrupted:', error.message)
          })
          video.removeEventListener('click', handlePlayOnClick)
        })
      }

      // Mark video as loaded in the dataset
      video.dataset.loaded = 'true'
    }

    if (primarySrc) {
      video.removeAttribute(fallbackAttr)
    } else if (fallbackSrc) {
      video.removeAttribute(loadAttr)
    }
  })
}

export function cleanupVideos() {
  document.querySelectorAll('video').forEach(video => {
    if (!video.dataset.loaded) return // Only clean up loaded videos

    // Optionally pause the video but don't unload
    video.pause()
  })

  // Clear media queries
  mm.clear()
}

function handleLoadedData(event) {
  const video = event.target
  if (document.body.contains(video)) {
    video.play().catch(error => {
      // console.log('Video play interrupted:', error.message)
    })
  }
}
