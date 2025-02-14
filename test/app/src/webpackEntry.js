/* entry point for SPA application */
/* global window, document */
import TestApp from './testApp';
import { getDefaultConfig, getConfigFromUrl, getConfigFromStorage, clearStorage } from './config';

let app;
let config;
const rootElem = document.getElementById('root');

function mount() {
  // Create the app as a function of config
  app = new TestApp(config);
  window._testApp = app; // Expose for console fiddling
  app.mount(window, rootElem);
  return app;
}

// Regular landing, read config from URL
window.bootstrapLanding = function() {
  config = window.location.search ? getConfigFromUrl() : getDefaultConfig();
  mount();
  app.bootstrapHome();
};

// Callback, read config from storage
window.bootstrapCallback = function() {
  config = getConfigFromStorage();
  clearStorage();
  mount();
  app.bootstrapCallback();
};

window.addEventListener('load', () => {
  rootElem.classList.add('loaded');
});
