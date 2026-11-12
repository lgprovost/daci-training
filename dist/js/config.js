export const SITE_CONFIG = {
  businessName: 'DACI — De-Escalation & Crisis Intervention',
  shortName: 'DACI',
  phoneDisplay: '[PHONE_DISPLAY]',
  phoneE164: '[PHONE_E164]',
  inquiryEmail: '[EMAIL_INQUIRY]',
  domain: '[DOMAIN]',
  serviceArea: 'Phoenix Metro & Statewide Arizona (Onsite Group Delivery)',
  cpiCredential: 'Certified Crisis Prevention Institute (CPI) Instructor',
  formEndpoint: 'https://formspree.io/f/[FORM_ID]'
};

export function hydrateContacts(root = document) {
  root.querySelectorAll('[data-phone-display]').forEach(el => { el.textContent = SITE_CONFIG.phoneDisplay; });
  root.querySelectorAll('[data-phone-href]').forEach(el => {
    el.href = /^\+[1-9]\d{7,14}$/.test(SITE_CONFIG.phoneE164) ? `tel:${SITE_CONFIG.phoneE164}` : '/request-quote#contact-options';
  });
  root.querySelectorAll('[data-inquiry-email]').forEach(el => {
    el.textContent = SITE_CONFIG.inquiryEmail;
    el.href = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE_CONFIG.inquiryEmail) ? `mailto:${SITE_CONFIG.inquiryEmail}` : '/request-quote#contact-options';
  });
  root.querySelectorAll('[data-cpi-credential]').forEach(el => { el.textContent = SITE_CONFIG.cpiCredential; });
}

export const STORAGE_KEY = 'daci_selected_courses';
export function readSelection() {
  try { const value = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(value) ? value.filter(id => typeof id === 'string') : []; }
  catch { return []; }
}
export function saveSelection(ids) {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set(ids)])); } catch { /* The current page still works when storage is unavailable. */ }
}
