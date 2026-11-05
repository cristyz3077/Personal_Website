// This is CristyOS's website power screen; it never controls the visitor's device.
(() => {
  const menuButton = document.querySelector('#power-menu-button');
  const options = document.querySelector('#power-options');
  const screen = document.querySelector('#power-screen');
  const heading = document.querySelector('#power-heading');
  const message = document.querySelector('#power-message');
  const spinner = document.querySelector('#power-spinner');
  const moon = document.querySelector('#power-moon');
  const powerOn = document.querySelector('#power-on-button');
  let state = 'on';
  let timer;
  function togglePowerMenu(show, focus = false) {
    options.hidden = !show;
    menuButton.setAttribute('aria-expanded', String(show));
    if (show && focus) options.querySelector('button').focus();
  }
  menuButton.addEventListener('click', () => togglePowerMenu(options.hidden));
  menuButton.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {event.preventDefault();togglePowerMenu(true, true);}
  });
  options.addEventListener('keydown', event => {
    const buttons = [...options.querySelectorAll('button')];
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const index = buttons.indexOf(document.activeElement);
      buttons[(index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length].focus();
    }
    if (event.key === 'Escape') {togglePowerMenu(false);menuButton.focus();}
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.power-menu-wrap, #start-button')) togglePowerMenu(false);
    const action = event.target.closest('[data-power-action]');
    if (action) beginPowerAction(action.dataset.powerAction);
  });
  document.querySelector('#start-button').addEventListener('click', () => togglePowerMenu(false));
  document.addEventListener('keydown', event => {if(event.key === 'Escape') togglePowerMenu(false);});
  function resetDesktop() {
    toggleMenu(false); toggleMusic(false); togglePowerMenu(false);
    if (dialog.open) dialog.close();
    currentApp = null; active.hidden = true;
    search.value = ''; filterApps('');
  }
  function showLoading(title, text) {
    heading.textContent = title; message.textContent = text;
    spinner.hidden = false; moon.hidden = true; powerOn.hidden = true;
    if (!screen.open) screen.showModal();
    heading.focus();
  }
  function restoreDesktop() {
    clearTimeout(timer);
    state = 'on';
    screen.close();
    document.body.classList.remove('desktop-powered-down');
    document.querySelector('#start-button').focus();
  }
  function beginPowerAction(action) {
    if (state !== 'on') return;
    state = action === 'restart' ? 'restarting' : 'shutting-down';
    resetDesktop();
    document.body.classList.add('desktop-powered-down');
    showLoading(action === 'restart' ? 'restarting CristyOS…' : 'shutting down…', 'saving little memories ♡');
    timer = setTimeout(() => {
      if (action === 'restart') {
        showLoading('welcome back to CristyOS ♡', 'a fresh little start…');
        timer = setTimeout(restoreDesktop, 700);
      } else {
        state = 'off';
        spinner.hidden = true; moon.hidden = false;
        heading.textContent = 'thanks for visiting! ♡';
        message.textContent = 'hope to see you again soon!';
        powerOn.hidden = false; powerOn.focus();
      }
    }, 2000);
  }
  powerOn.addEventListener('click', () => {
    if (state !== 'off') return;
    state = 'starting';
    showLoading('starting CristyOS…', 'making a little room for you ♡');
    timer = setTimeout(restoreDesktop, 900);
  });
  screen.addEventListener('cancel', event => event.preventDefault());
})();
