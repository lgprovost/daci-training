import { COURSES, INDUSTRIES, TIERS } from '../data/programs-config.js';
import { SITE_CONFIG, isQuoteServiceConfigured, readSelection, saveSelection } from './config.js';
const form = document.querySelector('#quote-form');
const controls = [...form.querySelectorAll('[name="selected_courses"]')];
const industry = form.elements.industry_sector;
const summary = document.querySelector('[data-summary-list]');
const known = new Set(COURSES.map(course => course.id));
const params = new URLSearchParams(location.search);
const selected = new Set([...readSelection(), ...(params.get('courses') || '').split(',')].filter(id => known.has(id)));
const sector = INDUSTRIES.find(item => item.id === params.get('industry'));
if (sector) industry.value = sector.id;
// Risk-based starting points never select every physical course at once.
const riskDefaults = { verbal: ['daci-level-1'], physical: ['daci-level-2'], specialty: ['daci-memory'] };
const risk = params.get('risk');
if (riskDefaults[risk]) {
  const relevant = sector?.courses.filter(id => COURSES.find(c => c.id === id).category === risk) || [];
  (relevant.length ? relevant : riskDefaults[risk]).forEach(id => selected.add(id));
} else if (sector && selected.size === 0) sector.courses.forEach(id => selected.add(id));
if (TIERS.some(t => t.id === risk)) form.elements.primary_risk.value = risk;
controls.forEach(input => { input.checked = selected.has(input.value); });

function updateSummary(announce = true) {
  const active = COURSES.filter(course => controls.some(input => input.value === course.id && input.checked));
  saveSelection(active.map(course => course.id));
  summary.replaceChildren();
  if (!active.length) {
    const empty = document.createElement('li'); empty.textContent = 'Choose a program to start your plan.'; summary.append(empty);
  }
  active.forEach(course => {
    const li = document.createElement('li');
    const name = document.createElement('span'); name.textContent = course.name;
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'summary-remove'; remove.textContent = 'Remove';
    remove.setAttribute('aria-label', `Remove ${course.name} from your plan`);
    remove.addEventListener('click', () => {
      const control = controls.find(input => input.value === course.id); control.checked = false;
      updateSummary(); control.focus();
    });
    li.append(name, remove); summary.append(li);
  });
  form.elements.selected_courses_summary.value = active.map(course => course.name).join('; ');
  if (announce) document.querySelector('[data-plan-status]').textContent = `${active.length} ${active.length === 1 ? 'program' : 'programs'} in your selected training plan.`;
  if (active.length) clearError('course-matrix');
}
function recommend() {
  const match = INDUSTRIES.find(item => item.id === industry.value);
  form.querySelectorAll('[data-recommendation]').forEach(el => { el.hidden = !match?.courses.includes(el.dataset.recommendation); });
  document.querySelector('[data-recommendation-status]').textContent = match ? `${match.courses.length} programs recommended for ${match.name}. Review program eligibility before selecting specialist training.` : 'Select an industry to see suggested programs.';
}
controls.forEach(input => input.addEventListener('change', () => updateSummary()));
industry.addEventListener('change', recommend);
function clearError(id) {
  const target = document.getElementById(id);
  document.getElementById(`${id}-error`)?.remove();
  target?.removeAttribute('aria-invalid');
  if (target?.dataset.describedby) target.setAttribute('aria-describedby', target.dataset.describedby);
  else target?.removeAttribute('aria-describedby');
}
function showError(id, message) {
  clearError(id);
  const target = document.getElementById(id);
  if (target.hasAttribute('aria-describedby')) target.dataset.describedby = target.getAttribute('aria-describedby');
  target.setAttribute('aria-invalid', 'true');
  target.setAttribute('aria-describedby', [target.dataset.describedby, `${id}-error`].filter(Boolean).join(' '));
  const error = document.createElement('p'); error.id = `${id}-error`; error.className = 'field-error'; error.setAttribute('role', 'alert'); error.textContent = message;
  target.insertAdjacentElement('afterend', error);
}
form.addEventListener('input', e => { if (e.target.id) clearError(e.target.id); });
form.addEventListener('change', e => { if (e.target.id) clearError(e.target.id); });
let submitting = false;
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (submitting) return;
  const message = document.querySelector('#form-message');
  message.hidden = true;
  const required = {
    organization_name: 'Enter your organization name.', contact_name_title: 'Enter your name and title.',
    work_email: 'Enter your work email address.',
    training_location: 'Enter the onsite training city or facility.', industry_sector: 'Choose your industry.',
    participant_count: 'Enter the number of participants.'
  };
  let firstError;
  Object.entries(required).forEach(([id, text]) => {
    clearError(id);
    const input = form.elements[id];
    if (!input.value.trim()) { showError(id, text); firstError ||= input; }
  });
  const email = form.elements.work_email;
  if (email.value && !email.validity.valid) { showError(email.id, 'Enter a valid email address, such as name@organization.com.'); firstError ||= email; }
  const restricted = controls.find(input=>input.value==='daci-level-3' && input.checked);
  if (restricted && form.elements.level3_eligibility?.value !== 'confirmed') { showError('level3_eligibility', 'Confirm that the Level 3 participants are law enforcement or corrections personnel.'); firstError ||= form.elements.level3_eligibility; }
  const count = form.elements.participant_count;
  if (count.value && (!Number.isInteger(Number(count.value)) || Number(count.value) < 1)) { showError(count.id, 'Enter a whole number of at least 1.'); firstError ||= count; }
  if (!controls.some(input => input.checked)) { showError('course-matrix', 'Select at least one training program.'); firstError ||= controls[0]; }
  if (firstError) { firstError.focus(); return; }
  if (form.elements.botcheck.checked) return;
  if (!isQuoteServiceConfigured()) {
    message.textContent = 'Quote submission is not available yet. Your training selections are saved for this visit. Please email DACI at info@dacitraining.com to request a quote.';
    message.hidden = false; message.focus(); return;
  }
  const submit = form.querySelector('[type=submit]');
  submitting = true; submit.disabled = true; submit.textContent = 'Sending your request…'; form.setAttribute('aria-busy','true');
  try {
    const data = new FormData(form);
    data.set('access_key', SITE_CONFIG.web3formsAccessKey);
    data.set('email', email.value.trim());
    data.set('replyto', email.value.trim());
    data.set('name', form.elements.contact_name_title.value.trim());
    data.set('selected_courses', controls.filter(input => input.checked).map(input => input.value).join(','));
    data.set('message', [
      `Organization: ${data.get('organization_name')}`,
      `Contact: ${data.get('contact_name_title')}`,
      `Industry: ${data.get('industry_sector')}`,
      `Programs: ${data.get('selected_courses_summary')}`,
      `Participants: ${data.get('participant_count')}`,
      `Training location: ${data.get('training_location')}`,
      `Preferred dates: ${data.get('preferred_dates') || 'To be discussed'}`,
      `Training notes: ${data.get('training_notes') || 'None provided'}`
    ].join('\n'));
    const response = await fetch(SITE_CONFIG.formEndpoint, { method:'POST', body:data, headers:{ Accept:'application/json' }, signal:AbortSignal.timeout(20000) });
    const result = await response.json();
    if (!response.ok || result.success !== true) throw new Error('Submission failed');
    form.hidden = true;
    const confirmation = document.querySelector('#quote-confirmation'); confirmation.hidden = false; confirmation.focus();
    saveSelection([]);
  } catch {
    message.textContent = 'We couldn’t send your request. Your entries are still here. Please try again or contact DACI directly.';
    message.hidden = false; message.focus();
  } finally {
    submitting = false; submit.disabled = false; submit.textContent = 'Submit Custom Quote Request'; form.removeAttribute('aria-busy');
  }
});
recommend(); updateSummary(false);
