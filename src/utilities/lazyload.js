import { LazyLoad } from '../vendor.js'

// Initialize LazyLoad
const lazyLoadInstance = new LazyLoad({
  elements_selector: 'video[data-src]',
  callback_enter: video => {
    // Load video source
    video.src = video.dataset.src

    // Add an event listener to autoplay once the video is loaded
    video.addEventListener('loadeddata', () => {
      // Ensure the video is sufficiently buffered
      video.play()
    })
  },
})

export default lazyLoadInstance
