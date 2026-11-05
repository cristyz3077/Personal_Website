// Persist the skyline theme across desktop and music pages.
(() => {
  const key = 'cristy-site-theme';
  const root = document.documentElement;
  const normalize = value => value === 'light' ? 'light' : 'dark';
  function readTheme() { try { return normalize(localStorage.getItem(key)); } catch { return 'dark'; } }
  function applyTheme(value, persist = true) {
    const theme = normalize(value);
    root.dataset.theme = theme;
    const light = theme === 'light';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = light ? '#eedbdc' : '#302b49';
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.setAttribute('aria-pressed', String(light));
      button.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} mode`);
      button.title = `${light ? 'Day' : 'Night'} mode · Switch to ${light ? 'dark' : 'light'} mode`;
      button.querySelector('[data-theme-icon]').textContent = light ? '\u2600' : '\u263e';
      button.querySelector('[data-theme-label]').textContent = light ? 'Day mode' : 'Night mode';
    });
    if (persist) { try { localStorage.setItem(key, theme); } catch {} }
  }
  applyTheme(readTheme(), false);
  function initialize() {
    applyTheme(root.dataset.theme, false);
    document.querySelectorAll('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark')));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, {once:true});
  else initialize();
  window.addEventListener('storage', event => { if (event.key === key || event.key === null) applyTheme(readTheme(), false); });
  window.addEventListener('pageshow', () => applyTheme(readTheme(), false));
})();
