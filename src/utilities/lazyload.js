import { LazyLoad } from '../vendor.js'

let activeVideos = 0
const maxActiveVideos = 2 // Adjust as necessary

const lazyLoadInstance = new LazyLoad({
  elements_selector: 'video[data-src]',
  callback_enter: video => {
    if (activeVideos < maxActiveVideos) {
      loadVideo(video)
    }
  },
})

function loadVideo(video) {
  activeVideos++
  video.src = video.dataset.src
  video.addEventListener('loadeddata', () => {
    video.play()
    activeVideos--
  })
}

export default lazyLoadInstance
