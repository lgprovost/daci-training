import { COURSES } from '../data/programs-config.js';
import { readSelection, saveSelection } from './config.js';
const known = new Set(COURSES.map(course => course.id));
const selected = new Set(readSelection().filter(id => known.has(id)));
const params = new URLSearchParams(location.search);
(params.get('courses') || '').split(',').filter(id => known.has(id)).forEach(id => selected.add(id));
const buttons = [...document.querySelectorAll('[data-add-course]')];
function update() {
  saveSelection([...selected]);
  buttons.forEach(button => {
    const on = selected.has(button.dataset.addCourse);
    button.setAttribute('aria-pressed', String(on));
    button.setAttribute('aria-label', `${on ? 'Remove' : 'Add'} ${COURSES.find(c => c.id === button.dataset.addCourse).name} ${on ? 'from' : 'to'} quote`);
    button.textContent = on ? '✓ Added to Quote' : '+ Add to Quote';
  });
  document.querySelectorAll('[data-selected-count]').forEach(el => { el.textContent = `Selected for Quote (${selected.size})`; });
  document.querySelectorAll('[data-build-quote]').forEach(el => { el.href = `/request-quote?courses=${[...selected].join(',')}`; });
  const strip = document.querySelector('[data-selected-strip]');
  if (strip) strip.hidden = selected.size === 0;
}
buttons.forEach(button => button.addEventListener('click', () => {
  const id = button.dataset.addCourse;
  if (selected.has(id)) selected.delete(id); else selected.add(id);
  update();
  const status = document.querySelector('[data-selection-status]');
  if (status) status.textContent = `${selected.size} ${selected.size === 1 ? 'program' : 'programs'} selected for your quote.`;
}));
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
update();
