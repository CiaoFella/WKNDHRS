// main.js
import barba from './barba';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

let currentAnimationModule = null;

function cleanupCurrentModule() {
  if (currentAnimationModule && currentAnimationModule.cleanup) {
    currentAnimationModule.cleanup();
  }
}

function loadPageModule(pageName) {
  import(`./pages/${pageName}.js`)
    .then(module => {
      currentAnimationModule = module.default;
      if (currentAnimationModule.init) {
        currentAnimationModule.init();
      }
    })
    .catch(err => {
      console.error(`Failed to load module for page: ${pageName}`, err);
    });
}

// Load the initial page module
const initialPageName = document.querySelector('[data-barba="container"]')
  .dataset.barbaNamespace;
loadPageModule(initialPageName);

barba.hooks.beforeEnter(({ next }) => {
  cleanupCurrentModule();
});

barba.hooks.after(({ next }) => {
  const pageName = next.namespace;
  loadPageModule(pageName);
});
