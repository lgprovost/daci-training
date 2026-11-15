export const SITE_CONFIG = {
  businessName: 'DACI — De-Escalation & Crisis Intervention',
  shortName: 'DACI',
  inquiryEmail: 'info@dacitraining.com',
  domain: 'dacitraining.com',
  serviceArea: 'Nationwide (Live Onsite Group Training)',
  homeInstructorCredential: 'Certified De-Escalation and Crisis Intervention | DACI Instructor',
  cpiCredential: 'Certified Crisis Prevention Institute (CPI) Instructor',
  formEndpoint: 'https://api.web3forms.com/submit',
  web3formsAccessKey: 'bfbd8cbd-58c4-4b5c-a550-e4cb502b8db3'
};

export function isQuoteServiceConfigured(config = SITE_CONFIG) {
  return config.formEndpoint === 'https://api.web3forms.com/submit'
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(config.web3formsAccessKey || '')
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.inquiryEmail);
}

// Pages supplies its mount path at export time; the review preview uses '/'.
export function sitePath(route) {
  const base = document.querySelector('meta[name="daci-base-path"]')?.content || '/';
  return base + route.replace(/^\//, '');
}

export function hydrateContacts(root = document) {
  root.querySelectorAll('[data-inquiry-email]').forEach(el => {
    el.textContent = SITE_CONFIG.inquiryEmail;
    el.href = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE_CONFIG.inquiryEmail) ? `mailto:${SITE_CONFIG.inquiryEmail}` : sitePath('/request-quote#contact-options');
  });
  root.querySelectorAll('[data-cpi-credential]').forEach(el => { el.textContent = SITE_CONFIG.cpiCredential; });
  root.querySelectorAll('[data-instructor-credential]').forEach(el => { el.textContent = SITE_CONFIG.homeInstructorCredential; });
}

export const STORAGE_KEY = 'daci_selected_courses';
export function readSelection() {
  try { const value = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(value) ? value.filter(id => typeof id === 'string') : []; }
  catch { return []; }
}
export function saveSelection(ids) {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set(ids)])); } catch { /* The current page still works when storage is unavailable. */ }
}
