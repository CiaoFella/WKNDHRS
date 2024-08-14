import { gsap, ScrollTrigger } from './vendor.js'
import barba from './barba.js'
import menu from './animations/general/menu.js'
import pageLoader from './animations/general/pageLoader.js'
import { normalizeLogo } from './utilities/helper.js'
import { enterPageAnimation } from './animations/general/enterPageAnimation.js'
import createSplitTypes from './utilities/createSplitTypes.js'
import lenis from './utilities/smoothScroll.js'

gsap.registerPlugin(ScrollTrigger)
menu.init()

let currentAnimationModule = null

function cleanupCurrentModule() {
  if (currentAnimationModule && currentAnimationModule.cleanup) {
    currentAnimationModule.cleanup()
  }
}

function getBaseUrl() {
  const script = document.querySelector('script[src*="main.js"]')
  const scriptSrc = script?.src || ''
  const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1)
  return baseUrl
}

function loadPageModule(pageName) {
  const baseUrl = getBaseUrl()
  import(/* webpackIgnore: true */ `${baseUrl}pages/${pageName}.js`)
    .then(module => {
      currentAnimationModule = module.default || {}
      console.log(`${baseUrl}pages/${pageName}.js`)
      if (typeof currentAnimationModule.init === 'function') {
        currentAnimationModule.init()
      } else {
        console.warn(`Module for page ${pageName} does not have an init function.`)
      }
    })
    .catch(err => {
      console.error(`Failed to load module for page: ${pageName}`, err)
      currentAnimationModule = {} // Set to an empty object to avoid further errors
    })
}

// Load the initial page module
const initialPageName = document.querySelector('[data-barba="container"]').dataset.barbaNamespace
loadPageModule(initialPageName)
pageLoader.init(initialPageName)
createSplitTypes.init()
lenis.scrollTo(0, { duration: 0, immediate: true })

document.addEventListener('onPageReady', event => {
  if (event.detail === true) {
    enterPageAnimation().play()
  }
})

barba.hooks.beforeEnter(({ next }) => {
  cleanupCurrentModule()
  createSplitTypes.cleanup()
})

barba.hooks.after(({ next }) => {
  const pageName = next.namespace
  lenis.scrollTo(0, { duration: 0, immediate: true })
  normalizeLogo(pageName)
  loadPageModule(pageName)
  createSplitTypes.init()
})
