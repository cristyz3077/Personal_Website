// Personal details live here so they are easy to update without changing the layout.
const aboutPage = `
<div class="about-app">
  <div class="about-tabs" role="tablist" aria-label="About me sections">
    <button id="tab-profile" role="tab" aria-selected="true" aria-controls="panel-profile" tabindex="0">Profile</button>
    <button id="tab-education" role="tab" aria-selected="false" aria-controls="panel-education" tabindex="-1">Education</button>
    <button id="tab-skills" role="tab" aria-selected="false" aria-controls="panel-skills" tabindex="-1">Skills</button>
    <button id="tab-interests" role="tab" aria-selected="false" aria-controls="panel-interests" tabindex="-1">Interests</button>
  </div>
  <div class="about-layout">
    <div class="about-main">
      <section id="panel-profile" role="tabpanel" aria-labelledby="tab-profile" tabindex="0">
        <div class="profile-intro">
          <figure class="profile-frame"><img src="assets/profile.png" alt="My mirror selfie" width="958" height="1034"><span class="photo-star star-one" aria-hidden="true">✧</span><span class="photo-star star-two" aria-hidden="true">✧</span><span class="photo-heart" aria-hidden="true">♡</span></figure>
          <div class="profile-copy"><h1>hi, it’s me! ♡</h1><p>Welcome to my little corner of the internet.</p><p>I love learning how things work, making things of my own, and finding a little inspiration in the everyday.</p><p>This is a home for my projects, my ideas, and all the things I’m figuring out along the way.</p></div>
        </div>
        <ul class="profile-tags" aria-label="A few things you’ll find here"><li>little projects</li><li>curiosity</li><li>creative ideas</li><li>learning</li><li>building things</li><li>work in progress</li><li>and more…</li></ul>
      </section>
      <section id="panel-education" role="tabpanel" aria-labelledby="tab-education" tabindex="0" hidden><span class="about-eyebrow">ONE CHAPTER AT A TIME</span><h1>always learning ♡</h1><p>There’s always something new to figure out.</p><div class="about-detail-card"><span class="detail-mark" aria-hidden="true">✎</span><div><h2>My education</h2><p>School, degree, and graduation year coming soon.</p></div></div><div class="about-detail-card"><span class="detail-mark" aria-hidden="true">✧</span><div><h2>Beyond the classroom</h2><p>A space for favorite classes, independent learning, and the ideas that stick with me.</p></div></div></section>
      <section id="panel-skills" role="tabpanel" aria-labelledby="tab-skills" tabindex="0" hidden><span class="about-eyebrow">MY LITTLE TOOLBOX</span><h1>things I’m working on ♡</h1><p>A growing collection of tools, techniques, and things I’ve learned by trying.</p><div class="about-detail-card"><span class="detail-mark" aria-hidden="true">⌘</span><div><h2>Tools & technologies</h2><p>My skills list is coming soon.</p></div></div><div class="about-detail-card"><span class="detail-mark" aria-hidden="true">♡</span><div><h2>Learning by making</h2><p>Open the Projects folder to follow what I’m building.</p><button class="about-link" data-app="projects">Explore projects <span aria-hidden="true">↗</span></button></div></div></section>
      <section id="panel-interests" role="tabpanel" aria-labelledby="tab-interests" tabindex="0" hidden><span class="about-eyebrow">THE LITTLE THINGS</span><h1>room for more than work ♡</h1><p>A little shelf for the things that make me, me.</p><div class="about-detail-card"><span class="detail-mark" aria-hidden="true">☼</span><div><h2>Outside the usual</h2><p>Favorite hobbies, small joys, and current interests coming soon.</p></div></div><p class="handwritten-note">a few more pieces of the story, soon… ✧</p></section>
    </div>
    <aside class="currently-panel"><h2>currently…</h2><ul><li>making this space my own</li><li>bringing ideas to life</li><li>learning something new</li><li>building little things ♡</li></ul><div class="currently-bottom"><svg class="cozy-cats" viewBox="0 0 200 175" aria-hidden="true"><g stroke="#9f938b" stroke-width="2.5" stroke-linejoin="round"><path fill="#c9bfd0" d="m20 100 15-25 117 3 25 33-12 40q-62 23-139-1z"/><path fill="#ded3df" d="m35 82-12 30 24 25 112-4 13-27-20-27z"/><path fill="#fff0d3" d="M45 94Q28 80 37 59l2-31 24 16q15-6 28 0l20-19 7 29q17 19 5 40-3 23-37 25-32 1-41-25Z"/><path fill="#fff2d9" d="M76 116q-6-18 5-32l6-22 22 14 27-2 20-13 2 26q23 25 2 43-30 18-66 0Z"/><path fill="#fff0d3" d="M58 100q-8 18 2 19 9 3 13-14M162 117q28 14 4 23"/><path fill="none" d="m52 73 4 2m36-5 4-2m-28 16 5 3 5-3m33 18 5 2m23-4 5-2m-22 15 5 2 4-3"/><path fill="none" stroke="#d5b5a6" d="m46 85 7 1m47-3 7-2m-7 30 5 1m35-2 6-2"/></g></svg><p>always<br>a work<br>in progress<br><span aria-hidden="true">✧ + ♡</span></p></div></aside>
  </div>
</div>`;

function setupAboutTabs() {
  const tabs = [...document.querySelectorAll('.about-tabs [role="tab"]')];
  function selectTab(tab, focus = false) {
    for (const item of tabs) {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    }
    if (focus) tab.focus();
  }
  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectTab(tabs[next], true);
    });
  }
}
