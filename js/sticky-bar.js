const bar = document.querySelector('.sticky-bar');
if (bar && 'IntersectionObserver' in window) {
  const visible = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target); });
    const hide = visible.size > 0;
    bar.classList.toggle('is-hidden', hide);
    bar.inert = hide;
    bar.setAttribute('aria-hidden', String(hide));
  }, { threshold: .1 });
  document.querySelectorAll('#site-footer, #quote-form-submit').forEach(el => observer.observe(el));
}
