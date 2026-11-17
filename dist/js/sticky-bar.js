const bar = document.querySelector('.sticky-bar');
if (bar) {
  const trigger = document.querySelector('[data-sticky-quote-trigger]');
  const visible = new Set();
  function updateVisibility() {
    const reachedCardBottom = !trigger || trigger.getBoundingClientRect().bottom <= window.innerHeight;
    const hide = !reachedCardBottom || visible.size > 0;
    bar.classList.toggle('is-hidden', hide);
    bar.inert = hide;
    bar.setAttribute('aria-hidden', String(hide));
  }
  let scheduled = false;
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => { scheduled = false; updateVisibility(); });
  }
  if (trigger) {
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('pageshow', scheduleUpdate);
    if ('ResizeObserver' in window) new window.ResizeObserver(scheduleUpdate).observe(trigger);
  }
  if ('IntersectionObserver' in window) {
    const observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target); });
      updateVisibility();
    }, { threshold: .1 });
    document.querySelectorAll('#site-footer, #quote-form-submit').forEach(el => observer.observe(el));
  }
  updateVisibility();
}
