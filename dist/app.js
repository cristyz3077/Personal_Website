const apps = {about:'About Me', projects:'Projects', terminal:'Terminal', resume:'Resume', contact:'Contact', music:'Music', travel:'Travel With Me', explorer:'File Explorer'};
const dialog = document.querySelector('#app-window');
const content = document.querySelector('#window-content');
const menu = document.querySelector('#start-menu');
const start = document.querySelector('#start-button');
const search = document.querySelector('#search');
const active = document.querySelector('#active-app');
let currentApp = null;
const explorerTree = {
  id:'desktop', name:'Desktop', kind:'folder', children:[
    {id:'about',name:'About Me',kind:'file',app:'about',keywords:'profile biography'},
    {id:'projects',name:'Projects',kind:'folder',keywords:'engineering',children:[
      {id:'project-cpu',name:'32-bit RISC-V Processor',kind:'file',app:'projects',projectId:'cpu',keywords:'RV32I CPU processor'},
      {id:'project-robot',name:'Delivery Robot PCB',kind:'file',app:'projects',projectId:'bot',keywords:'autonomous robotics STM32'},
      {id:'project-vest',name:'VibraSound Vest',kind:'file',app:'projects',projectId:'vest',keywords:'wearable music vibrations'},
      {id:'project-hackathon',name:'Hackathon',kind:'folder',keywords:'hack the chip competition',children:[
        {id:'project-agent',name:'AI Verilog Optimization Agent',kind:'file',app:'projects',projectId:'hackathon',keywords:'Verilog optimization hackathon'}
      ]}
    ]},
    {id:'music',name:'Music',kind:'folder',keywords:'songs tracks instruments',children:[
      {id:'instruments',name:'Instruments',kind:'folder',keywords:'crystal gallery instruments',children:[
        {id:'instrument-gallery',name:'Crystal Instrument Gallery',kind:'file',href:'instruments.html',keywords:'2x2 crystals instruments'}
      ]},
      {id:'tracks',name:'Tracks',kind:'folder',keywords:'songs music player',children:[
        {id:'track-player',name:'Music Player',kind:'file',href:'tracks.html',keywords:'player songs audio'},
        {id:'audio-foundation',name:'Audio Foundation HW3',kind:'file',href:'tracks.html',keywords:'song audio track'}
      ]}
    ]},
    {id:'travel',name:'Travel With Me',kind:'folder',keywords:'travel destinations cities photos albums',children:[
      {id:'travel-cities',name:'Cities & Photo Albums',kind:'folder',keywords:'destinations travel photos',children:[
        {id:'travel-cities-coming',name:'Under construction',kind:'file',app:'travel',keywords:'cities destinations'}
      ]},
      {id:'travel-favorites',name:'Favorites',kind:'folder',keywords:'saved favorite places',children:[
        {id:'travel-favorites-coming',name:'Under construction',kind:'file',app:'travel',keywords:'destinations places'}
      ]}
    ]},
    {id:'resume',name:'Resume.pdf',kind:'file',app:'resume',keywords:'CV curriculum vitae'},
    {id:'terminal',name:'Terminal',kind:'file',app:'terminal',keywords:'command line'},
    {id:'contact',name:'Contact',kind:'file',app:'contact',keywords:'email'}
  ]
};
const explorerNodes = new Map();
function indexExplorerNodes(node, ancestors = []) {
  explorerNodes.set(node.id, {node, ancestors});
  for (const child of node.children || []) indexExplorerNodes(child, [...ancestors, node]);
}
indexExplorerNodes(explorerTree);
let explorerPath = ['desktop'];
let explorerBack = [];
let explorerForward = [];
let explorerSelected = null;
let explorerSearch = '';
const pages = {
  travel: `<div class="travel-page"><span class="eyebrow">POSTCARDS & LITTLE DETOURS</span><h1>travel with me ♡</h1><p>Under construction.</p><div class="travel-postcard"><span aria-hidden="true">✧</span><h2>The first postcard is on its way</h2><p>Photos and stories from my adventures will live here.</p><span class="postcard-stamp" aria-hidden="true">♡</span></div></div>`,
  about: aboutPage,
  projects: projectsPage,
  resume: `<section class="resume-reader" aria-label="Cristy Zhang’s resume"><div class="resume-toolbar"><span class="resume-document-label">Cristy Zhang <span>· PDF</span></span><div class="resume-actions"><a href="assets/Cristy-Zhang-Resume-First-Page.pdf" target="_blank" rel="noopener noreferrer">Open PDF <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a><a class="resume-download" href="assets/Cristy-Zhang-Resume-First-Page.pdf" download="Cristy-Zhang-Resume.pdf">Download <span aria-hidden="true">↓</span></a></div></div><div class="resume-page-view"><img class="resume-page-image" src="assets/resume-first-page.png" alt="First page of Cristy Zhang's resume" width="1530" height="1980"></div><p class="resume-fallback">Page 1 of 1 · <a href="assets/Cristy-Zhang-Resume-First-Page.pdf" target="_blank" rel="noopener noreferrer">Open the resume directly<span class="sr-only"> (opens in a new tab)</span></a>.</p></section>`,
  contact: contactPage,
  explorer: `<section class="file-explorer" aria-label="File Explorer"><div class="explorer-toolbar"><div class="explorer-history"><button type="button" data-explorer-back aria-label="Back" title="Back">‹</button><button type="button" data-explorer-forward aria-label="Forward" title="Forward">›</button></div><nav class="explorer-breadcrumbs" id="explorer-breadcrumbs" aria-label="Folder path"></nav><label class="explorer-search"><svg aria-hidden="true"><use href="#i-search"/></svg><input type="search" id="explorer-search" placeholder="Search files, songs, places…" aria-label="Search Explorer"></label></div><div class="explorer-body"><nav class="explorer-sidebar" aria-label="Quick access"><button type="button" data-explorer-shortcut="desktop">Desktop</button><button type="button" data-explorer-shortcut="projects">Projects</button><button type="button" data-explorer-shortcut="music">Music</button><button type="button" data-explorer-shortcut="travel">Travel With Me</button></nav><section class="explorer-main"><div class="explorer-list-heading"><span>Name</span><span>Type</span></div><div id="explorer-items" class="explorer-items" role="group" aria-label="Files and folders"></div><p id="explorer-empty" class="explorer-empty" hidden>No matching items.</p><footer class="explorer-status" id="explorer-status" aria-live="polite"></footer></section></div></section>`,
  terminal: `<div class="terminal"><p>little-corner terminal [version 1.0]<br>Type “help” to see what’s here. ♡</p><div class="terminal-output" id="terminal-output" role="log" aria-live="polite"></div><form id="terminal-form"><label for="terminal-input">visitor ~ $</label><input id="terminal-input" autocomplete="off" spellcheck="false" aria-label="Terminal command"></form></div>`
};
function toggleMenu(show) { menu.hidden = !show; start.setAttribute('aria-expanded', String(show)); }
function openApp(app, options = {}) {
  if (!apps[app]) return;
  if (app === 'music') {
    if (dialog.open) { dialog.close(); currentApp = null; active.hidden = true; }
    toggleMenu(false);
    toggleMusic(document.querySelector('#music-papers').hidden);
    return;
  }
  toggleMusic(false);
  const preserve = app === currentApp && !options.refresh;
  if (app !== 'explorer') {
    dialog.style.removeProperty('left');
    dialog.style.removeProperty('top');
    dialog.style.removeProperty('margin');
  }
  currentApp = app;
  toggleMenu(false);
  search.value = '';
  filterApps('');
  dialog.classList.toggle('about-window', app === 'about');
  dialog.classList.toggle('projects-window', app === 'projects');
  dialog.classList.toggle('resume-window', app === 'resume');
  dialog.classList.toggle('contact-window', app === 'contact');
  dialog.classList.toggle('explorer-window', app === 'explorer');
  document.querySelector('#window-title').textContent = app === 'about' ? 'about_me.exe' : app === 'resume' ? 'resume.pdf' : app === 'contact' ? 'contact.exe' : apps[app];
  document.querySelector('#window-icon use').setAttribute('href', '#i-' + app);
  document.querySelector('#explorer-button').setAttribute('aria-pressed', String(app === 'explorer'));
  if (!preserve) content.innerHTML = pages[app];
  if (app === 'projects' && !preserve) setupProjects(options.projectId);
  if (app === 'explorer' && !preserve) setupExplorer();
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
function setupExplorer() {
  const list = document.querySelector('#explorer-items');
  const searchInput = document.querySelector('#explorer-search');
  const backButton = document.querySelector('[data-explorer-back]');
  const forwardButton = document.querySelector('[data-explorer-forward]');
  function currentNodes() {
    return explorerPath.map(id => explorerNodes.get(id)?.node).filter(Boolean);
  }
  function navigate(path, record = true) {
    if (record && path.join('/') !== explorerPath.join('/')) {
      explorerBack.push([...explorerPath]);
      explorerForward = [];
    }
    explorerPath = path;
    explorerSelected = null;
    explorerSearch = '';
    searchInput.value = '';
    render();
  }
  function render() {
    const pathNodes = currentNodes();
    const current = pathNodes[pathNodes.length - 1] || explorerTree;
    const breadcrumbs = document.querySelector('#explorer-breadcrumbs');
    breadcrumbs.replaceChildren();
    pathNodes.forEach((node, index) => {
      if (index) {
        const divider = document.createElement('span');
        divider.setAttribute('aria-hidden', 'true');
        divider.textContent = '›';
        breadcrumbs.append(divider);
      }
      const crumb = document.createElement('button');
      crumb.type = 'button';
      crumb.textContent = node.name;
      crumb.setAttribute('aria-current', String(index === pathNodes.length - 1));
      crumb.addEventListener('click', () => navigate(explorerPath.slice(0, index + 1)));
      breadcrumbs.append(crumb);
    });
    backButton.disabled = explorerBack.length === 0;
    forwardButton.disabled = explorerForward.length === 0;
    const query = explorerSearch.trim().toLocaleLowerCase();
    const entries = query
      ? [...explorerNodes.values()]
        .filter(({node, ancestors}) => node !== explorerTree && [node.name, node.keywords || '', ...ancestors.map(parent => parent.name)].join(' ').toLocaleLowerCase().includes(query))
        .map(({node, ancestors}) => ({node, parentPath: [...ancestors.map(parent => parent.id)], location: ancestors.map(parent => parent.name).join(' › ')}))
      : (current.children || []).map(node => ({node, parentPath: [...explorerPath], location:''}));
    history.replaceState(null, '', '#files/' + explorerPath.map(encodeURIComponent).join('/'));
    list.replaceChildren();
    document.querySelector('#explorer-empty').hidden = entries.length > 0;
    for (const {node, parentPath, location} of entries) {
      const row = document.createElement(node.kind === 'folder' ? 'a' : 'button');
      if (node.kind === 'folder') {
        row.href = '#files/' + [...parentPath, node.id].map(encodeURIComponent).join('/');
      } else {
        row.type = 'button';
      }
      row.className = 'explorer-item';
      row.dataset.explorerId = node.id;
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('aria-hidden', 'true');
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('href', node.kind === 'folder' ? '#i-explorer' : `#i-${node.app || 'resume'}`);
      icon.append(use);
      const label = document.createElement('span');
      label.className = 'explorer-item-name';
      label.textContent = node.name;
      if (location) {
        const parent = document.createElement('small');
        parent.textContent = location;
        label.append(parent);
      }
      const type = document.createElement('span');
      type.className = 'explorer-item-type';
      type.textContent = node.kind === 'folder' ? 'Folder' : node.href ? 'Web page' : 'App';
      row.append(icon, label, type);
      list.append(row);
      // Native button clicks work with mouse, touch, Enter, and Space.
      if (node.kind !== 'folder') row.addEventListener('click', () => activate(node, parentPath));
    }
    document.querySelector('#explorer-status').textContent = query
      ? `${entries.length} ${entries.length === 1 ? 'result' : 'results'}`
      : `${entries.length} ${entries.length === 1 ? 'item' : 'items'}`;
  }
  function activate(node, parentPath) {
    if (node.kind === 'folder') {
      navigate([...parentPath, node.id]);
    } else if (node.href) {
      location.href = node.href;
    } else if (node.app) {
      openApp(node.app, {projectId:node.projectId});
    }
  }
  backButton.addEventListener('click', () => {
    if (!explorerBack.length) return;
    explorerForward.push([...explorerPath]);
    explorerPath = explorerBack.pop();
    explorerSelected = null;
    explorerSearch = '';
    searchInput.value = '';
    render();
  });
  forwardButton.addEventListener('click', () => {
    if (!explorerForward.length) return;
    explorerBack.push([...explorerPath]);
    explorerPath = explorerForward.pop();
    explorerSelected = null;
    explorerSearch = '';
    searchInput.value = '';
    render();
  });
  searchInput.addEventListener('input', () => {
    explorerSearch = searchInput.value;
    explorerSelected = null;
    render();
    searchInput.focus();
  });
  document.querySelectorAll('[data-explorer-shortcut]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.explorerShortcut;
      navigate(id === 'desktop' ? ['desktop'] : ['desktop', id]);
    });
  });
  render();
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
function openExplorerHash() {
  if (!location.hash.startsWith('#files/')) return;
  let path;
  try { path = location.hash.slice(7).split('/').map(decodeURIComponent); }
  catch { return; }
  if (path[0] !== 'desktop') return;
  let folder = explorerTree;
  for (const id of path.slice(1)) {
    folder = folder.children?.find(child => child.id === id && child.kind === 'folder');
    if (!folder) return;
  }
  if (path.join('/') !== explorerPath.join('/')) {
    explorerBack.push([...explorerPath]);
    explorerForward = [];
  }
  explorerPath = path;
  explorerSearch = '';
  explorerSelected = null;
  openApp('explorer', {refresh:true});
}
window.addEventListener('hashchange', openExplorerHash);
openExplorerHash();
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
const explorerBar = document.querySelector('#app-window .window-bar');
let explorerDrag = null;
explorerBar.addEventListener('pointerdown', event => {
  if (!dialog.classList.contains('explorer-window') || event.target.closest('.window-controls')) return;
  const rect = dialog.getBoundingClientRect();
  explorerDrag = {pointerId:event.pointerId, x:event.clientX, y:event.clientY, left:rect.left, top:rect.top};
  explorerBar.setPointerCapture(event.pointerId);
});
explorerBar.addEventListener('pointermove', event => {
  if (!explorerDrag || event.pointerId !== explorerDrag.pointerId) return;
  const left = Math.max(0, Math.min(innerWidth - dialog.offsetWidth, explorerDrag.left + event.clientX - explorerDrag.x));
  const top = Math.max(0, Math.min(innerHeight - 80, explorerDrag.top + event.clientY - explorerDrag.y));
  dialog.style.left = `${left}px`;
  dialog.style.top = `${top}px`;
  dialog.style.margin = '0';
});
function endExplorerDrag(event) {
  if (explorerDrag?.pointerId === event.pointerId) explorerDrag = null;
}
explorerBar.addEventListener('pointerup', endExplorerDrag);
explorerBar.addEventListener('pointercancel', endExplorerDrag);
window.addEventListener('resize', () => {
  if (!dialog.open || !dialog.classList.contains('explorer-window')) return;
  if (innerWidth <= 700) {
    dialog.style.removeProperty('left');
    dialog.style.removeProperty('top');
    dialog.style.removeProperty('margin');
    return;
  }
  const rect = dialog.getBoundingClientRect();
  dialog.style.left = `${Math.max(0, Math.min(innerWidth - rect.width, rect.left))}px`;
  dialog.style.top = `${Math.max(0, Math.min(innerHeight - 80, rect.top))}px`;
  dialog.style.margin = '0';
});
