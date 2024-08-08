import { gsap, barba } from './imports.js';

gsap.registerPlugin(ScrollTrigger);

let currentAnimationModule = null;

function cleanupCurrentModule() {
  if (currentAnimationModule && currentAnimationModule.cleanup) {
    currentAnimationModule.cleanup();
  }
}

function getBaseUrl() {
  const script = document.querySelector('script[src*="main.js"]');
  const scriptSrc = script?.src || '';
  const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1);
  return baseUrl;
}

function loadPageModule(pageName) {
  const baseUrl = getBaseUrl();
  import(/* @vite-ignore */ `${baseUrl}pages/${pageName}.js`)
    .then(module => {
      currentAnimationModule = module.default || {};
      console.log(`${baseUrl}pages/${pageName}.js`);
      if (typeof currentAnimationModule.init === 'function') {
        currentAnimationModule.init();
      } else {
        console.warn(
          `Module for page ${pageName} does not have an init function.`
        );
      }
    })
    .catch(err => {
      console.error(`Failed to load module for page: ${pageName}`, err);
      currentAnimationModule = {}; // Set to an empty object to avoid further errors
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
