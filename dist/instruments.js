const instrumentDrawings = {
  piano: `<g stroke="#686273" stroke-width="3" stroke-linejoin="round"><path d="M95 111 246 26l20 13-121 99Z" fill="#7c7189"/><path d="M117 136h155q31 0 36 28l-9 24H113Z" fill="#72667e"/><path d="m115 188-6 71m173-71 9 71m-145-71 5 65" stroke-width="9"/><path d="m105 164 175 0-10 29H98Z" fill="#f8f0de"/><path d="M117 166v24m16-24v24m16-24v24m16-24v24m16-24v24m16-24v24m16-24v24m16-24v24m16-24v24m16-24v24" stroke="#bdb0bb" stroke-width="1.5"/><path d="M125 164v16m16-16v16m32-16v16m16-16v16m16-16v16m32-16v16m16-16v16" stroke-width="6"/><path d="M162 131v-36l25 4 23-4v36" fill="#faf0d7" stroke="#b9a78f" stroke-width="2"/><path d="M187 100v29m-18-23h11m-11 7h11m14-7h10m-10 7h10" stroke="#bdada2" stroke-width="1.5"/><path d="M153 131 245 47" fill="none" stroke-width="3"/><rect x="255" y="222" width="83" height="12" rx="4" fill="#9a879a"/><path d="M264 235v30m63-30v30" stroke-width="6"/></g>`,
  flute: `<g transform="translate(180 145) rotate(-32)" stroke="#9291b2" stroke-width="3"><rect x="-133" y="-12" width="266" height="24" rx="10" fill="#d6d7e6"/><path d="M-112-12v24M96-12v24M119-12v24"/><path d="M-74 10v17H72V10" fill="none"/><g fill="#faf5e9"><ellipse cx="-106" cy="0" rx="9" ry="5"/><circle cx="-67" cy="0" r="8"/><circle cx="-39" cy="0" r="8"/><circle cx="-11" cy="0" r="8"/><circle cx="17" cy="0" r="8"/><circle cx="45" cy="0" r="8"/><circle cx="73" cy="0" r="8"/></g><path d="M-57-10v-10m28 10v-10m28 10v-10m28 10v-10m28 10v-10"/></g>`,
  guitar: `<g transform="translate(192 150) rotate(25)" stroke="#9c7b68" stroke-width="3"><path d="M-12-59q-37-24-53 4-10 18 4 33-42 20-25 67 15 37 72 33 48-4 56-41 9-32-24-55 16-25 3-39-12-20-33-2Z" fill="#e7be89"/><path d="M-9-63v-63H10v63" fill="#a78a7c"/><path d="m-11-124-4-26 30-2-2 28Z" fill="#d6ae7d"/><circle cx="-7" cy="0" r="19" fill="#8e7669"/><circle cx="-7" cy="0" r="24" fill="none" stroke="#c29c77"/><rect x="-29" y="40" width="45" height="10" rx="2" fill="#9e7d6d"/><path d="M-12-145V44M-8-145V44M-4-145V44M0-145V44M4-145V44" stroke="#e3d5bc" stroke-width="1"/><path d="M-9-111h19m-19 15h19m-19 15h19m-19 15h19" stroke="#cfc1b2" stroke-width="1.5"/><path d="M-15-140h-8m8 12h-8m38-12h8m-8 12h8" stroke-width="5"/></g>`,
  saxophone: `<g transform="translate(183 150) rotate(-17)" stroke="#ad8d57" stroke-width="3" stroke-linejoin="round"><path d="M-5-111h28q19 0 19 22v100q0 49-44 49-44 0-44-45V-7h25v23q0 23 18 23 17 0 17-24v-104H-5Z" fill="#e8c782"/><path d="m-45-20-17-40h60l-17 40Z" fill="#f0dca2"/><ellipse cx="-32" cy="-60" rx="30" ry="9" fill="#bf9c5d"/><path d="M-5-111v-12h-24" fill="none" stroke="#736879" stroke-width="9"/><g fill="#fae9bb"><circle cx="29" cy="-67" r="7"/><circle cx="29" cy="-40" r="7"/><circle cx="29" cy="-13" r="7"/><circle cx="19" cy="15" r="7"/></g><path d="M46-80v79M39-70h13M39-43h13M39-16h13" fill="none" stroke-width="2"/></g>`
};
const instrumentNames = {piano:'Piano', flute:'Flute', guitar:'Guitar', saxophone:'Saxophone'};

// Inline vectors keep the instruments part of the page, with no image backgrounds.
function crystalInstrument(key) {
  const artwork = instrumentDrawings[key]
    .replace(/fill="#[0-9a-f]+"/gi, `fill="url(#glass-${key})"`)
    .replace(/stroke="#[0-9a-f]+"/gi, 'stroke="#a8a4d5"');
  return `<svg class="crystal-instrument" viewBox="0 0 360 280" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="glass-${key}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#e1d7fa" stop-opacity=".48"/>
        <stop offset=".23" stop-color="#c8b7ef" stop-opacity=".65"/>
        <stop offset=".45" stop-color="#eef7ff" stop-opacity=".75"/>
        <stop offset=".62" stop-color="#b5d4ed" stop-opacity=".6"/>
        <stop offset="1" stop-color="#b3a4df" stop-opacity=".64"/>
      </linearGradient>
      <clipPath id="glass-clip-${key}">${artwork}</clipPath>
    </defs>
    <g class="glass-body" stroke-opacity=".72">${artwork}</g>
    <g clip-path="url(#glass-clip-${key})" pointer-events="none">
      <path d="M56 0h42L280 280h-42Z" fill="#fff" opacity=".3"/>
      <path d="M117 0h9l182 280h-9Z" fill="#fff" opacity=".65"/>
      <path d="M0 194 360 73v35L0 229Z" fill="#c0dff7" opacity=".23"/>
    </g>
  </svg>`;
}
const gallery = document.querySelector('#instrument-gallery');
gallery.innerHTML = Object.entries(instrumentNames).map(([key,name])=>`
  <figure class="glass-instrument" tabindex="0" aria-labelledby="name-${key}">
    <div class="instrument-sway">${crystalInstrument(key)}</div>
    <span class="instrument-sparkle" aria-hidden="true">✧</span>
    <figcaption id="name-${key}">${name}</figcaption>
  </figure>`).join('');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
for (const instrument of gallery.querySelectorAll('.glass-instrument')) {
  const artwork = instrument.querySelector('.instrument-sway');
  let motion;
  function startWiggle() {
    if (reducedMotion.matches) return;
    const current = getComputedStyle(artwork).transform;
    motion?.cancel();
    motion = artwork.animate([
      {transform: current === 'none' ? 'rotate(0deg)' : current},
      {transform:'rotate(-2deg)', offset:.25},
      {transform:'rotate(2deg)', offset:.75},
      {transform:'rotate(0deg)'}
    ], {duration:1100, iterations:Infinity, easing:'ease-in-out'});
  }
  function settle() {
    const current = getComputedStyle(artwork).transform;
    motion?.cancel();
    if (!reducedMotion.matches) motion = artwork.animate([
      {transform:current}, {transform:'rotate(0deg)'}
    ], {duration:280, easing:'ease-out'});
  }
  instrument.addEventListener('pointerenter',startWiggle);
  instrument.addEventListener('pointerleave',settle);
  instrument.addEventListener('focus',startWiggle);
  instrument.addEventListener('blur',settle);
  reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)motion?.cancel();});
}
