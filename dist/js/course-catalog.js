import { COURSES } from '../data/programs-config.js';
import { saveSelection } from './config.js';

// Catalog quote links open the regular form without previously browsed selections.
document.querySelectorAll('[data-build-quote]').forEach(link => {
  link.addEventListener('click', () => saveSelection([]));
});

const cards = [...document.querySelectorAll('[data-course-card]')];
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
  cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  document.querySelector('[data-filter-status]').textContent = `Showing ${cards.filter(card => !card.hidden).length} of ${COURSES.length} programs`;
}));
// Links to catalog detail must remain visible even after returning from a filtered state.
const hashCard = cards.find(card => `#${card.id}` === location.hash);
if (hashCard) hashCard.hidden = false;
