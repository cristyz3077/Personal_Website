const apps = {about:'About Me', projects:'Projects', terminal:'Terminal', resume:'Resume', contact:'Contact', music:'Music', travel:'Travel With Me'};
const dialog = document.querySelector('#app-window');
const content = document.querySelector('#window-content');
const menu = document.querySelector('#start-menu');
const start = document.querySelector('#start-button');
const search = document.querySelector('#search');
const active = document.querySelector('#active-app');
let currentApp = null;
const pages = {
  travel: `<div class="travel-page"><span class="eyebrow">POSTCARDS & LITTLE DETOURS</span><h1>travel with me ♡</h1><p>A little journal for city wanderings, new places, and memories along the way.</p><div class="travel-postcard"><span aria-hidden="true">✧</span><h2>The first postcard is on its way</h2><p>Photos and stories from my adventures will live here.</p><span class="postcard-stamp" aria-hidden="true">♡</span></div></div>`,
  about: aboutPage,
  projects: projectsPage,
  resume: `<span class="eyebrow">MY JOURNEY SO FAR</span><h1>A little about my path</h1><p class="placeholder">Your resume hasn’t been added yet.</p><h2>Education</h2><p>Add your school, degree, and graduation year.</p><h2>Experience</h2><p>Share your work, internships, clubs, or personal projects.</p><h2>Skills</h2><p>Include the tools and technologies you enjoy working with.</p>`,
  contact: `<span class="eyebrow">LET’S SAY HELLO</span><h1>My door is always open ♡</h1><p>Have an idea, a question, or something interesting to share? This is where we can connect.</p><p class="placeholder">Contact details coming soon. Add your email, GitHub, or LinkedIn here.</p><p>Until then, thanks for stopping by. I hope you enjoyed your little visit.</p>`,
  terminal: `<div class="terminal"><p>little-corner terminal [version 1.0]<br>Type “help” to see what’s here. ♡</p><div class="terminal-output" id="terminal-output" role="log" aria-live="polite"></div><form id="terminal-form"><label for="terminal-input">visitor ~ $</label><input id="terminal-input" autocomplete="off" spellcheck="false" aria-label="Terminal command"></form></div>`
};
function toggleMenu(show) { menu.hidden = !show; start.setAttribute('aria-expanded', String(show)); }
function openApp(app) {
  if (!apps[app]) return;
  if (app === 'music') {
    if (dialog.open) { dialog.close(); currentApp = null; active.hidden = true; }
    toggleMenu(false);
    toggleMusic(document.querySelector('#music-papers').hidden);
    return;
  }
  toggleMusic(false);
  const preserve = app === currentApp;
  currentApp = app;
  toggleMenu(false);
  search.value = '';
  filterApps('');
  dialog.classList.toggle('about-window', app === 'about');
  dialog.classList.toggle('projects-window', app === 'projects');
  document.querySelector('#window-title').textContent = app === 'about' ? 'about_me.exe' : apps[app];
  document.querySelector('#window-icon use').setAttribute('href', '#i-' + app);
  if (!preserve) content.innerHTML = pages[app];
  if (app === 'projects' && !preserve) setupProjects();
  active.textContent = apps[app]; active.hidden = false;
  if (!dialog.open) dialog.showModal();
  if(app === 'terminal') {
    if (!preserve) setupTerminal();
    document.querySelector('#terminal-input').focus();
  } else document.querySelector('#close-window').focus();
}
document.addEventListener('click', e => { const item=e.target.closest('[data-app]'); if(item) openApp(item.dataset.app); });
document.querySelector('#close-window').addEventListener('click', () => { dialog.close(); currentApp=null; active.hidden=true; });
document.querySelector('#minimize').addEventListener('click', () => dialog.close());
active.addEventListener('click', () => openApp(currentApp));
dialog.addEventListener('cancel', () => { currentApp=null; active.hidden=true; });
start.addEventListener('click', () => { toggleMenu(menu.hidden); if(!menu.hidden) filterApps(search.value); });
document.addEventListener('click', e => { if(!e.target.closest('#start-menu, #start-button, .search')) toggleMenu(false); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') { toggleMenu(false); if(!document.querySelector('#music-papers').hidden) { toggleMusic(false); document.querySelector('#music-folder-button').focus(); } } });
function toggleMusic(show) {
  const papers = document.querySelector('#music-papers');
  papers.hidden = !show;
  document.querySelector('#music-folder-button').setAttribute('aria-expanded', String(show));
  if (show) papers.querySelector('a').focus();
}
document.addEventListener('click', e => {
  if (!e.target.closest('.music-folder, [data-app="music"]')) toggleMusic(false);
});
const menuApps=document.querySelector('#menu-apps');
for (const [key,label] of Object.entries(apps)) { const button=document.createElement('button');button.className='menu-item';button.dataset.app=key;button.innerHTML=`<svg aria-hidden="true"><use href="#i-${key}"/></svg><span>${label}</span>`;menuApps.append(button); }
function filterApps(query) { let count=0; for(const b of menuApps.children) { b.hidden=!b.textContent.toLowerCase().includes(query.toLowerCase().trim());if(!b.hidden)count++; } document.querySelector('#no-results').hidden=count>0; }
search.addEventListener('input', () => { toggleMenu(true); filterApps(search.value); });
search.addEventListener('keydown', e => { if(e.key === 'Enter'){const first=menuApps.querySelector('button:not([hidden])');if(first)openApp(first.dataset.app);} });
function updateClock(){ const now=new Date();document.querySelector('#date').textContent=now.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'}); const time=now.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'}); document.querySelector('#widget-time').textContent=time;document.querySelector('#tray-time').textContent=time; }
updateClock();setInterval(updateClock,1000);
if (location.hash === '#music') openApp('music');
function setupTerminal(){
 const form=document.querySelector('#terminal-form'),input=document.querySelector('#terminal-input'),output=document.querySelector('#terminal-output');
 form.addEventListener('submit',e=>{e.preventDefault();const raw=input.value.trim(),cmd=raw.toLowerCase();input.value='';if(!raw)return;
 if(cmd==='clear'){output.textContent='';return;}
 const line=document.createElement('div');line.textContent='visitor ~ $ '+raw;output.append(line);
 const reply=document.createElement('p');
 if(cmd==='help')reply.textContent='help       Show commands\nabout      Meet the person behind this space\nprojects   Open the project shelf\nresume     View the resume window\ncontact    Say hello\ndate       The time, right here and now\nls         List desktop windows\nclear      A fresh start';
 else if(cmd==='ls')reply.textContent=Object.keys(apps).join('   ');
 else if(cmd==='date')reply.textContent=new Date().toLocaleString();
 else if(apps[cmd]&&cmd!=='terminal'){openApp(cmd);return;}
 else reply.textContent=`Command not found: ${raw}. Try “help”.`;
 output.append(reply);content.scrollTop=content.scrollHeight;
 });
}
// Gentle synthesized rain: activated only by the visitor; no external audio needed.
let audioContext, audioSource, audioGain;
const soundButton=document.querySelector('#sound-button');
soundButton.addEventListener('click',async()=>{
 const enabled=soundButton.getAttribute('aria-pressed')!=='true';
 try {
  if(enabled){
   if(!audioContext){const AudioCtx=window.AudioContext||window.webkitAudioContext;if(!AudioCtx)throw new Error('Audio unavailable');audioContext=new AudioCtx();const buffer=audioContext.createBuffer(1,audioContext.sampleRate*4,audioContext.sampleRate),data=buffer.getChannelData(0);let last=0;for(let i=0;i<data.length;i++){last=(last+Math.random()*.04-.02)/1.02;data[i]=last*3.5;}audioSource=audioContext.createBufferSource();audioSource.buffer=buffer;audioSource.loop=true;audioGain=audioContext.createGain();audioGain.gain.value=.24;audioSource.connect(audioGain);audioGain.connect(audioContext.destination);audioSource.start();}
   await audioContext.resume();
  }else if(audioContext)await audioContext.suspend();
  soundButton.setAttribute('aria-pressed',String(enabled));soundButton.setAttribute('aria-label',enabled?'Turn ambient sound off':'Turn ambient sound on');soundButton.title=enabled?'Turn ambient sound off':'Turn ambient sound on';soundButton.querySelector('.sound-off').hidden=enabled;
 }catch{soundButton.title='Ambient audio is unavailable in this browser';}
});
