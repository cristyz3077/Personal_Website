const instrumentDrawings = {
  piano: `<g stroke="#686273" stroke-width="3" stroke-linejoin="round"><path d="M95 111 246 26l20 13-121 99Z" fill="#7c7189"/><path d="M117 136h155q31 0 36 28l-9 24H113Z" fill="#72667e"/><path d="m115 188-6 71m173-71 9 71m-145-71 5 65" stroke-width="9"/><path d="m105 164 175 0-10 29H98Z" fill="#f8f0de"/><path d="M117 166v24m16-24v24m16-24v24m16-24v24m16-24v24m16-24v24m16-24v24m16-24v24m16-24v24m16-24v24" stroke="#bdb0bb" stroke-width="1.5"/><path d="M125 164v16m16-16v16m32-16v16m16-16v16m16-16v16m32-16v16m16-16v16" stroke-width="6"/><path d="M162 131v-36l25 4 23-4v36" fill="#faf0d7" stroke="#b9a78f" stroke-width="2"/><path d="M187 100v29m-18-23h11m-11 7h11m14-7h10m-10 7h10" stroke="#bdada2" stroke-width="1.5"/><path d="M153 131 245 47" fill="none" stroke-width="3"/><rect x="255" y="222" width="83" height="12" rx="4" fill="#9a879a"/><path d="M264 235v30m63-30v30" stroke-width="6"/></g>`,
  flute: `<g transform="translate(180 145) rotate(-32)" stroke="#9291b2" stroke-width="3"><rect x="-133" y="-12" width="266" height="24" rx="10" fill="#d6d7e6"/><path d="M-112-12v24M96-12v24M119-12v24"/><path d="M-74 10v17H72V10" fill="none"/><g fill="#faf5e9"><ellipse cx="-106" cy="0" rx="9" ry="5"/><circle cx="-67" cy="0" r="8"/><circle cx="-39" cy="0" r="8"/><circle cx="-11" cy="0" r="8"/><circle cx="17" cy="0" r="8"/><circle cx="45" cy="0" r="8"/><circle cx="73" cy="0" r="8"/></g><path d="M-57-10v-10m28 10v-10m28 10v-10m28 10v-10m28 10v-10"/></g>`,
  guitar: `<g transform="translate(192 150) rotate(25)" stroke="#9c7b68" stroke-width="3"><path d="M-12-59q-37-24-53 4-10 18 4 33-42 20-25 67 15 37 72 33 48-4 56-41 9-32-24-55 16-25 3-39-12-20-33-2Z" fill="#e7be89"/><path d="M-9-63v-63H10v63" fill="#a78a7c"/><path d="m-11-124-4-26 30-2-2 28Z" fill="#d6ae7d"/><circle cx="-7" cy="0" r="19" fill="#8e7669"/><circle cx="-7" cy="0" r="24" fill="none" stroke="#c29c77"/><rect x="-29" y="40" width="45" height="10" rx="2" fill="#9e7d6d"/><path d="M-12-145V44M-8-145V44M-4-145V44M0-145V44M4-145V44" stroke="#e3d5bc" stroke-width="1"/><path d="M-9-111h19m-19 15h19m-19 15h19m-19 15h19" stroke="#cfc1b2" stroke-width="1.5"/><path d="M-15-140h-8m8 12h-8m38-12h8m-8 12h8" stroke-width="5"/></g>`,
  saxophone: `<g transform="translate(183 150) rotate(-17)" stroke="#ad8d57" stroke-width="3" stroke-linejoin="round"><path d="M-5-111h28q19 0 19 22v100q0 49-44 49-44 0-44-45V-7h25v23q0 23 18 23 17 0 17-24v-104H-5Z" fill="#e8c782"/><path d="m-45-20-17-40h60l-17 40Z" fill="#f0dca2"/><ellipse cx="-32" cy="-60" rx="30" ry="9" fill="#bf9c5d"/><path d="M-5-111v-12h-24" fill="none" stroke="#736879" stroke-width="9"/><g fill="#fae9bb"><circle cx="29" cy="-67" r="7"/><circle cx="29" cy="-40" r="7"/><circle cx="29" cy="-13" r="7"/><circle cx="19" cy="15" r="7"/></g><path d="M46-80v79M39-70h13M39-43h13M39-16h13" fill="none" stroke-width="2"/></g>`
};
const instruments = {
  piano: {title:'Piano', description:'A space for piano pieces, practice sessions, and little improvisations. From familiar melodies to new ideas, one key at a time.'},
  flute: {title:'Flute', description:'A space for flute melodies, breath, and phrasing. Little moments of music, carried on a stream of air.'},
  guitar: {title:'Guitar', description:'A space for guitar chords, gentle strumming, and melodies taking shape. A few strings, and so many possibilities.'},
  saxophone: {title:'Saxophone', description:'A space for the saxophone’s warm tone, expressive melodies, and musical experiments. Finding a little character in every note.'}
};
function instrumentScene(drawing) {
  return `<svg viewBox="0 0 400 280"><defs><linearGradient id="room-sky" x2="0" y2="1"><stop stop-color="#aeb6d6"/><stop offset="1" stop-color="#f3d6be"/></linearGradient></defs><rect width="400" height="280" fill="#e9decf"/><rect x="18" y="15" width="260" height="203" rx="4" fill="url(#room-sky)"/><path d="M27 191v-51h31v51m13 0v-69h38v69m12 0v-39h32v39m12 0v-85h35v85m13 0v-55h40v55" fill="#a6a7bc" opacity=".7"/><path d="M0 224h400v56H0" fill="#d3b8a4"/><path d="M18 15v203h260V15ZM148 15v203M18 114h260" fill="none" stroke="#f5ebd8" stroke-width="10"/><path d="M0 0h16v225M284 0h25v225" stroke="#c2b1aa" stroke-width="5" fill="none"/><path d="M365 233v-91m0 53q-41-2-31-35 30-3 31 35m1-10q43-2 32-37-28 4-32 37m-1-19q-32-5-23-30 24 1 23 30" fill="#9ca68d" stroke="#83937b" stroke-width="2"/><path d="m338 215 9 48h37l10-48Z" fill="#d0bdc9" stroke="#aa96ad" stroke-width="2"/>${drawing}<path d="m321 52 3 8 9 1-7 6 2 9-7-5-7 5 2-9-7-6 9-1z" fill="#f6e6bc" stroke="#c8b28c"/><circle cx="56" cy="57" r="3" fill="#fff1d4"/></svg>`;
}
const instrumentTabs = [...document.querySelectorAll('[data-instrument]')];
function selectInstrument(key, focus = false) {
  const item = instruments[key];
  if (!item) return;
  for (const tab of instrumentTabs) {
    const selected = tab.dataset.instrument === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  }
  document.querySelector('#instrument-panel').setAttribute('aria-labelledby','tab-'+key);
  document.querySelector('#instrument-title').textContent = item.title+' ♡';
  document.querySelector('#instrument-description').textContent = item.description;
  document.querySelector('#instrument-art').innerHTML = instrumentScene(instrumentDrawings[key]);
}
instrumentTabs.forEach((tab,index)=>{
  tab.insertAdjacentHTML('afterbegin',`<svg viewBox="0 0 400 280" aria-hidden="true">${instrumentDrawings[tab.dataset.instrument]}</svg>`);
  tab.addEventListener('click',()=>selectInstrument(tab.dataset.instrument));
  tab.addEventListener('keydown',event=>{
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index+1)%instrumentTabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index+instrumentTabs.length-1)%instrumentTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = instrumentTabs.length-1;
    if (next === undefined) return;
    event.preventDefault(); selectInstrument(instrumentTabs[next].dataset.instrument,true);
  });
});
selectInstrument('piano');
