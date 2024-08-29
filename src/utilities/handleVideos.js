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
    const primarySrc = video.getAttribute(loadAttr)
    const fallbackSrc = video.getAttribute(fallbackAttr)
    const standardSrc = video.getAttribute('src')
    const newSrc = primarySrc || fallbackSrc || standardSrc

    if (standardSrc !== newSrc && newSrc) {
      video.setAttribute('src', newSrc)
      video.load()

      if (isDesktop) {
        video.play().catch(error => {
          console.log('Video play interrupted:', error.message)
        })
      } else if (isMobile) {
        // On mobile, check for a user gesture before playing to avoid fullscreen issues
        video.addEventListener('click', function handlePlayOnClick() {
          video.play().catch(error => {
            console.log('Video play interrupted:', error.message)
          })
          video.removeEventListener('click', handlePlayOnClick)
        })
      }
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
    const hasDesktopSrc = video.hasAttribute('src-desktop')
    const hasMobileSrc = video.hasAttribute('src-mobile')

    if (hasDesktopSrc || hasMobileSrc) {
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  })

  document.querySelectorAll('video').forEach(video => {
    video.removeEventListener('loadeddata', handleLoadedData)
  })

  mm.clear()
}

function handleLoadedData(event) {
  const video = event.target
  if (document.body.contains(video)) {
    video.play().catch(error => {
      console.log('Video play interrupted:', error.message)
    })
  }
}
