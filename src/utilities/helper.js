import { gsap, ScrollTrigger } from '../vendor.js'
import { isDesktop, isLandscape, isMobile, isTablet } from './variables.js'

export function unwrapSpanAndPreserveClasses(element) {
  // Select all span elements inside the given element
  const spans = element.querySelectorAll('span')

  // Iterate over each span
  spans.forEach(span => {
    // Get the class list of the span
    const spanClasses = span.className

    // Create a document fragment to hold the new elements
    const fragment = document.createDocumentFragment()

    // Iterate over child nodes to preserve <br> elements
    span.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        // Split the text content into words
        const words = node.textContent.split(/\s+/)

        words.forEach((word, index) => {
          // Create a new span for each word
          const newSpan = document.createElement('span')
          newSpan.textContent = word

          // Add the original span's classes to the new span
          if (spanClasses) {
            newSpan.className = spanClasses
          }

          // Append the new span and a space after the word (if it's not the last word)
          fragment.appendChild(newSpan)
          if (index < words.length - 1) {
            fragment.appendChild(document.createTextNode(' '))
          }
        })
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
        // Preserve <br> elements
        fragment.appendChild(node.cloneNode())
      }
    })

    // Replace the original span with the new fragment
    span.replaceWith(fragment)
  })
}

export function normalizeLogo(namespace) {
  const logo = document.querySelector('[data-logo=wrap]')
  if (namespace === 'home') {
    gsap.to(logo, { fontSize: '9vw', duration: 1, ease: 'expo.out' })
  } else {
    gsap.to(logo, { fontSize: '2rem', duration: 1, ease: 'expo.out' })
  }
}

export function closeMenu() {
  const menuTrigger = document.querySelector('[data-menu-mobile=trigger]')

  if (menuTrigger.classList.contains('is-active')) {
    menuTrigger.click()
  }
}

export function autoPlayVideosInView() {
  const vids = document.querySelectorAll('video')
  vids.forEach(vid => {
    ScrollTrigger.create({
      trigger: vid,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => {
        vid.play()
      },
      onEnterBack: () => {
        vid.play()
      },
      onLeave: () => {
        vid.pause()
      },
      onLeaveBack: () => {
        vid.pause()
      },
    })
  })
}

export function getCurrentPage() {
  const currentPage = document.querySelector('[data-barba="container"]').dataset.barbaNamespace

  return currentPage
}

export function initCopyTextToClipboard() {
  const elements = document.querySelectorAll('[data-copy=element]')
  elements.forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault()
      const text = element.textContent
      if (!navigator.clipboard) {
        return
      }
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log('Async: Copying to clipboard was successful!')
        })
        .catch(err => {
          console.error('Async: Could not copy text: ', err)
        })

      // I want to have a visual feedback that the text was copied
      const copyTextTemp = document.createElement('div')
      copyTextTemp.classList.add('u-text')
      copyTextTemp.style.position = 'absolute'
      copyTextTemp.style.bottom = '0'
      copyTextTemp.style.left = '0'
      copyTextTemp.textContent = 'Copied!'
      element.after(copyTextTemp)
      const copyTextTl = gsap.timeline({ defaults: { duration: 0.5, ease: 'expo.out' } })

      copyTextTl
        .fromTo(copyTextTemp, { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0 })
        .to(copyTextTemp, { opacity: 0, yPercent: -50, ease: 'expo.in' }, '>+1')
        .call(() => copyTextTemp.remove(), [], '>+0.5')
    })
  })
}

let mm

export function handleResponsiveElements() {
  if (mm) {
    mm.revert()
  }

  mm = gsap.matchMedia()

  const removedElementsMap = new Map()

  mm.add(isTablet, () => {
    console.log('isTablet matched')
    handleElementRemoval('tablet')
  })

  mm.add(isLandscape, () => {
    console.log('isLandscape matched')
    handleElementRemoval('landscape')
  })

  mm.add(isMobile, () => {
    console.log('isMobile matched')
    handleElementRemoval('mobile')
  })

  mm.add(isDesktop, () => {
    return () => {}
  })

  function handleElementRemoval(breakpoint) {
    document.querySelectorAll('[data-remove]').forEach(el => {
      const removeAt = el.getAttribute('data-remove') // e.g., "tablet", "landscape", "mobile"
      const parent = el.parentNode
      const nextSibling = el.nextElementSibling

      if (removeAt === breakpoint) {
        if (!removedElementsMap.has(el)) {
          removedElementsMap.set(el, { parent, nextSibling })
          parent.removeChild(el)
        }
      }
    })
  }
}

export function updateCurrentNavLink() {
  const currentPath = window.location.pathname

  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href')

    if (href === currentPath || href === currentPath + '/') {
      link.classList.add('w--current') // Webflow uses 'w--current' for the 'current' class
    } else {
      link.classList.remove('w--current')
    }
  })
}
