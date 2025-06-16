import { renderOpening } from './views/opening.js';
import '../styles/global.css';
export const API_BASE_URL = "http://127.0.0.1:5500";
renderOpening();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}