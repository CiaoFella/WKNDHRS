import { gsap } from '../vendor.js'

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
