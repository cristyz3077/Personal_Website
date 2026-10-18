// Replace the illustrative covers with project photographs when they are ready.
const projectArtwork = {
  cpu: `<svg viewBox="0 0 360 240" aria-hidden="true"><rect width="360" height="240" fill="#d9d6e1"/><path d="m0 55 90 52 160-90 110 60M0 170l85-51 180 102 95-54" fill="none" stroke="#c4bdd3" stroke-width="18"/><g transform="translate(180 120) rotate(-23)"><rect x="-100" y="-78" width="200" height="156" rx="13" fill="#b1b5b0" stroke="#858994" stroke-width="3"/><g stroke="#e7dfb6" stroke-width="3" fill="none"><path d="M-76-55h35v24M-76-35h22v20M76-55H42v24M76-35H57v20M-76 55h35V31M76 55H42V31M-76 13h23M76 13H53"/><path d="M-30-70v22M-10-70v22M10-70v22M30-70v22M-30 70V48M-10 70V48M10 70V48M30 70V48"/></g><rect x="-49" y="-42" width="98" height="84" rx="7" fill="#595765" stroke="#d4c4a2" stroke-width="5"/><text x="0" y="-4" text-anchor="middle" fill="#ddd3e9" font-family="monospace" font-size="17">RV32I</text><text x="0" y="17" text-anchor="middle" fill="#bdb0ce" font-family="monospace" font-size="11">32-BIT</text><g fill="#e5d8a9"><circle cx="-83" cy="-61" r="4"/><circle cx="83" cy="61" r="4"/><circle cx="83" cy="-61" r="4"/><circle cx="-83" cy="61" r="4"/></g></g></svg>`,
  bot: `<svg viewBox="0 0 360 240" aria-hidden="true"><rect width="360" height="240" fill="#e4ddd0"/><g stroke="#cec3b4" fill="none"><path d="M0 190 360 70M0 100l360 120M40 240 330 0"/></g><ellipse cx="183" cy="190" rx="107" ry="20" fill="#b9ac9d" opacity=".4"/><g transform="translate(180 116) rotate(-13)"><rect x="-106" y="-20" width="25" height="83" rx="10" fill="#68646e"/><rect x="81" y="-20" width="25" height="83" rx="10" fill="#68646e"/><rect x="-85" y="-66" width="170" height="142" rx="15" fill="#b4aa89" stroke="#8c8375" stroke-width="3"/><rect x="-69" y="-54" width="138" height="111" rx="7" fill="#8e9a91" stroke="#737f78" stroke-width="3"/><g stroke="#e5d6ab" stroke-width="3" fill="none"><path d="M-55-37h30v25M55-37H25v25M-55 37h30V12M55 37H25V12M-4-38v20M-4 38V18"/></g><rect x="-21" y="-19" width="42" height="38" rx="3" fill="#535965"/><g fill="#dbc7a1"><circle cx="-55" cy="-40" r="4"/><circle cx="55" cy="-40" r="4"/><circle cx="-55" cy="42" r="4"/><circle cx="55" cy="42" r="4"/></g><rect x="-39" y="61" width="78" height="28" rx="5" fill="#d9d2bc"/><circle cx="-19" cy="75" r="9" fill="#646472"/><circle cx="19" cy="75" r="9" fill="#646472"/></g></svg>`,
  vest: `<svg viewBox="0 0 360 240" aria-hidden="true"><rect width="360" height="240" fill="#ded5e0"/><g stroke="#c3b4cd" fill="none" stroke-width="2"><path d="M27 106q12-40 24 0t24 0M285 106q12-40 24 0t24 0M18 137q13-28 26 0t26 0M290 137q13-28 26 0t26 0"/></g><g transform="translate(180 118)"><path d="m-45-88-38 19 5 60-15 83q40 22 86 9V-60q-27 6-38-28Z" fill="#9b91b0" stroke="#746d87" stroke-width="3"/><path d="m45-88 38 19-5 60 15 83q-40 22-86 9V-60q27 6 38-28Z" fill="#aaa0bc" stroke="#746d87" stroke-width="3"/><path d="M0-57V91" stroke="#e2d4df" stroke-width="4"/><g fill="#cfc0da" stroke="#827691" stroke-width="2"><circle cx="-40" cy="-19" r="16"/><circle cx="40" cy="-19" r="16"/><circle cx="-43" cy="37" r="16"/><circle cx="43" cy="37" r="16"/></g><g fill="none" stroke="#95849f" stroke-width="2"><circle cx="-40" cy="-19" r="8"/><circle cx="40" cy="-19" r="8"/><circle cx="-43" cy="37" r="8"/><circle cx="43" cy="37" r="8"/></g></g></svg>`
};
const projectItems = [
  {id:'cpu', title:'32-bit RV32I Processor', category:'CPU Design', filters:['CPU Design'], link:'https://github.com/cristyz3077/32-bit-RV32I-CPU', linkLabel:'View on GitHub', description:'A 32-bit RISC-V processor built from scratch in SystemVerilog.', dates:'August 2026 – Present', status:'In progress', details:[
    `A personal project where I'm designing and building a 32-bit RISC-V processor (RV32I) from scratch using SystemVerilog. Starting with the ALU and register file, I've been developing the instruction decoder, control unit, memory, and other CPU components to make everything work together.`,
    `I'm currently working toward implementing a five-stage pipeline (Fetch, Decode, Execute, Memory, and Writeback), along with hazard detection and data forwarding to improve instruction execution.`,
    `My next step is to use OpenROAD to explore the physical design process and turn my processor design into a chip layout.`
  ]},
  {id:'hackathon', title:'AI-Powered Verilog Optimization Agent', category:'Hackathon', filters:['Hackathon'], link:'https://lnkd.in/gHjB3MuT', linkLabel:'View hackathon project', subtitle:'Amazon Annapurna Labs · Hack the Chip · NYU Tandon', description:'An AI agent that generates, verifies, and optimizes Verilog designs with automated testbenches and Yosys.', details:[
    `A hackathon project where my team developed an AI-powered agent that generates, verifies, and optimizes Verilog designs. Users can either describe a digital circuit to generate Verilog code or submit their own code for verification.`,
    `The system uses automated testbenches to identify errors and provide feedback for improvements. Once a design passes verification, the agent attempts to reduce its logic gate count using Yosys while ensuring the optimized design maintains the same functionality.`,
    `I focused on the optimization process, helping coordinate synthesis results, testbench verification, and iterative improvements.`
  ]},
  {id:'bot', title:'Autonomous Delivery Robot', category:'Robotics', filters:['Robotics'], link:'https://github.com/cristyz3077/autonomous-delivery-robot', linkLabel:'View on GitHub', description:'A custom STM32-based PCB and embedded motor-control firmware for a delivery robot.', dates:'June 2026 – Present', status:'Almost done | Debugging phase', details:[
    `A hardware-focused project where I designed a custom PCB using Altium Designer for a delivery robot, integrating an STM32F446RE microcontroller, motor drivers, and power management circuitry to replace the original breadboard prototype.`,
    `Alongside the PCB design, I developed embedded firmware in C to implement PWM motor control, encoder feedback, and PID speed control.`,
    `I also established UART communication between the STM32, Raspberry Pi, and PC for motor commands, data monitoring, and debugging.`
  ]},
  {id:'vest', title:'VibraSound Vest', category:'Wearables', filters:['Wearables'], description:'A wearable vest that translates music into vibrations so it can be experienced through touch.', dates:'January 2025 – May 2025', status:'Completed', details:[
    `A wearable project where I designed and developed a vest that transforms pre-recorded and live music into vibrations, allowing individuals with hearing impairments to experience music through touch.`,
    `I implemented real-time audio processing using Fast Fourier Transform (FFT) on a Raspberry Pi to detect different sound frequencies and amplitudes.`,
    `I also established Bluetooth communication between a mobile device, Raspberry Pi, and Arduino using HC-05 modules, and developed Arduino firmware to control vibration motors through PWM signals based on the music's frequencies and intensity.`
  ]}
];
projectArtwork.hackathon = `<svg viewBox="0 0 360 240" aria-hidden="true"><rect width="360" height="240" fill="#dcd6e7"/><path d="M0 190 360 75M0 50l360 130" stroke="#cec4df" stroke-width="14"/><rect x="43" y="37" width="274" height="166" rx="12" fill="#faf5ec" stroke="#b5a4c6" stroke-width="3"/><path d="M43 65h274" stroke="#d4c7df" stroke-width="2"/><g fill="#c5b1d5"><circle cx="59" cy="51" r="4"/><circle cx="72" cy="51" r="4"/><circle cx="85" cy="51" r="4"/></g><text x="62" y="98" fill="#9983ad" font-family="monospace" font-size="16">module optimize;</text><path d="M65 118h95M65 133h70M65 148h90M65 163h60" stroke="#c1b2ce" stroke-width="5" stroke-linecap="round"/><path d="m185 140 22 0-7-7m7 7-7 7" stroke="#a792bd" stroke-width="3" fill="none"/><rect x="224" y="103" width="62" height="62" rx="8" fill="#a8b3a1" stroke="#85937f" stroke-width="2"/><path d="m238 133 11 11 22-25" stroke="#fff9eb" stroke-width="4" fill="none"/><text x="242" y="186" fill="#9a86ac" font-family="monospace" font-size="11">YOSYS</text></svg>`;
const projectCategories = ['All Projects','CPU Design','Robotics','Wearables','Hackathon'];

function projectMetadata(project, card = false) {
  if (!project.dates && !project.status) return '';
  return `<div class="${card ? 'project-card-meta' : 'project-meta'}">${project.dates ? `<span class="${card ? '' : 'project-dates'}">${project.dates}</span>` : ''}${project.status ? `<span class="project-status${project.status === 'Completed' ? ' is-complete' : ''}">${project.status}</span>` : ''}</div>`;
}
const projectsPage = `<div class="projects-browser"><nav class="project-sidebar" aria-label="Project categories">${projectCategories.map((category,index)=>`<button class="project-filter" data-category="${category}" aria-pressed="${index===0}"><svg aria-hidden="true"><use href="#i-projects"/></svg><span>${category}</span></button>`).join('')}<div class="sidebar-flower" aria-hidden="true"><svg viewBox="0 0 65 95"><path d="M33 89V45" stroke="#8c9b91" stroke-width="4"/><path d="M32 78Q9 75 15 58q18 2 17 20M34 85q25-8 20-25-21 3-20 25" fill="#a5b4a7" stroke="#8c9b91" stroke-width="2"/><path d="M18 17q7-13 14-1 9-14 16 0l-1 19q-12 24-27 0Z" fill="#d4afc5" stroke="#b397b4" stroke-width="2"/></svg></div></nav><section class="project-workspace" aria-label="Projects"><div class="project-grid">${projectItems.map(project=>`<article class="portfolio-card" data-project-card="${project.id}"><div class="project-cover">${projectArtwork[project.id]}</div><h2>${project.title}</h2>${projectMetadata(project, true)}<p>${project.description}</p><button class="view-project" data-project="${project.id}">View Project <span aria-hidden="true">→</span><span class="sr-only">: ${project.title}</span></button></article>`).join('')}</div><section id="project-detail" class="project-detail" hidden aria-label="Project details"></section><p id="project-filter-status" class="sr-only" role="status"></p></section></div>`;

function setupProjects(initialProjectId) {
  const root = document.querySelector('.projects-browser');
  const grid = root.querySelector('.project-grid');
  const detail = root.querySelector('#project-detail');
  let selectedCategory = 'All Projects';
  function filterProjects(category) {
    selectedCategory = category;
    detail.hidden = true;
    grid.hidden = false;
    root.querySelectorAll('.project-filter').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
    let count = 0;
    root.querySelectorAll('[data-project-card]').forEach(card => {
      const project = projectItems.find(item => item.id === card.dataset.projectCard);
      card.hidden = category !== 'All Projects' && !project.filters.includes(category);
      if (!card.hidden) count++;
    });
    root.querySelector('#project-filter-status').textContent = `${count} ${count === 1 ? 'project' : 'projects'} in ${category}`;
  }
  root.addEventListener('click', event => {
    const filter = event.target.closest('[data-category]');
    if (filter) filterProjects(filter.dataset.category);
    const view = event.target.closest('[data-project]');
    if (view) {
      const project = projectItems.find(item => item.id === view.dataset.project);
      if (!project) return;
      grid.hidden = true;
      detail.hidden = false;
      detail.innerHTML = `<button class="project-back">← Back to ${selectedCategory.toLowerCase()}</button><div class="detail-layout"><div class="project-visual"><div class="project-cover detail-cover">${projectArtwork[project.id]}</div>${project.link ? `<a class="project-source-link" href="${project.link}" target="_blank" rel="noopener noreferrer">${project.linkLabel} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>` : ''}</div><div><span class="project-category">${project.category}</span><h1 tabindex="-1">${project.title}</h1>${project.subtitle ? `<p class="project-subtitle">${project.subtitle}</p>` : ''}${projectMetadata(project)}<div class="project-notes"><h2>Inside the project</h2>${project.details.map(paragraph=>`<p>${paragraph}</p>`).join('')}</div></div></div>`;
      detail.querySelector('h1').focus();
    }
    if (event.target.closest('.project-back')) {
      filterProjects(selectedCategory);
      root.querySelector('.portfolio-card:not([hidden]) .view-project')?.focus();
    }
  });
  if (initialProjectId) {
    const projectButton = root.querySelector(`[data-project="${CSS.escape(initialProjectId)}"]`);
    if (projectButton) projectButton.click();
  }
}
