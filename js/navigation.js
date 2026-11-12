import { hydrateContacts } from './config.js';
import './sticky-bar.js';

hydrateContacts();
const nav = document.querySelector('[data-nav-shell]');
const trigger = document.querySelector('[data-menu-toggle]');
const backdrop = document.querySelector('[data-menu-backdrop]');
const media = matchMedia('(max-width: 767px)');
const background = [...document.querySelectorAll('main, #site-footer, .sticky-bar')];
const page = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
document.querySelectorAll('nav[aria-label="Primary"] a').forEach(link => {
  if ((new URL(link.href).pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/') === page) link.setAttribute('aria-current', 'page');
});
function toggleMenu(open, restore = true) {
  nav.classList.toggle('is-open', open);
  backdrop.classList.toggle('is-open', open);
  trigger.setAttribute('aria-expanded', String(open));
  trigger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('menu-open', open);
  background.forEach(el => { el.inert = open; });
  if (media.matches) { nav.inert = !open; nav.setAttribute('aria-hidden', String(!open)); }
  else { nav.inert = false; nav.removeAttribute('aria-hidden'); }
  if (open) nav.querySelector('a')?.focus();
  else if (restore) trigger.focus();
}
trigger.addEventListener('click', () => toggleMenu(trigger.getAttribute('aria-expanded') !== 'true'));
backdrop.addEventListener('click', () => toggleMenu(false));
nav.addEventListener('click', e => { if (e.target.closest('a') && media.matches) toggleMenu(false); });
document.addEventListener('keydown', e => {
  if (trigger.getAttribute('aria-expanded') !== 'true') return;
  if (e.key === 'Escape') { e.preventDefault(); toggleMenu(false); }
  if (e.key === 'Tab') {
    const items = [trigger, ...nav.querySelectorAll('a[href], button:not(:disabled)')];
    const first = items[0], last = items.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
media.addEventListener('change', () => toggleMenu(false, false));
toggleMenu(false, false);

// Progressive enhancement for the homepage GET form; native form navigation also works.
document.querySelector('[data-quick-path]')?.addEventListener('submit', e => {
  e.preventDefault();
  const params = new URLSearchParams(new FormData(e.currentTarget));
  location.href = `/request-quote?${params}`;
});
