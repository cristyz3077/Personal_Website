// Personal details live here so they are easy to update without changing the layout.
const aboutPage = `
<div class="about-app">
  <div class="about-tabs" role="tablist" aria-label="About me sections">
    <button id="tab-profile" role="tab" aria-selected="true" aria-controls="panel-profile" tabindex="0">Profile</button>
  </div>
  <div class="about-layout">
    <div class="about-main">
      <section id="panel-profile" role="tabpanel" aria-labelledby="tab-profile" tabindex="0">
        <div class="profile-intro">
          <figure class="profile-frame"><img src="assets/profile.png" alt="My mirror selfie" width="958" height="1034"><span class="photo-star star-one" aria-hidden="true">✧</span><span class="photo-star star-two" aria-hidden="true">✧</span><span class="photo-heart" aria-hidden="true">♡</span></figure>
          <div class="profile-copy"><h1>hi, i'm cristy! ♡</h1><p>i'm a third-year electrical &amp; computer engineering student at NYU Tandon interested in computer chip design.</p><p>When i'm not surrounded by circuits and code, you'll probably find me wandering around the city, or making music whenever inspiration strikes.</p><p>welcome to my little corner of the internet!</p></div>
        </div>
        <ul class="profile-tags" aria-label="My interests"><li>electrical &amp; computer engineering</li><li>chip design</li><li>circuits &amp; code</li><li>city wandering</li><li>making music</li><li>and more…</li></ul>
      </section>
    </div>
    <aside class="currently-panel"><h2>currently…</h2><ul><li>making this space my own</li><li>bringing ideas to life</li><li>learning something new</li><li>building little things ♡</li></ul><div class="currently-bottom"><svg class="cozy-cats" viewBox="0 0 200 175" aria-hidden="true"><g stroke="#9f938b" stroke-width="2.5" stroke-linejoin="round"><path fill="#c9bfd0" d="m20 100 15-25 117 3 25 33-12 40q-62 23-139-1z"/><path fill="#ded3df" d="m35 82-12 30 24 25 112-4 13-27-20-27z"/><path fill="#fff0d3" d="M45 94Q28 80 37 59l2-31 24 16q15-6 28 0l20-19 7 29q17 19 5 40-3 23-37 25-32 1-41-25Z"/><path fill="#fff2d9" d="M76 116q-6-18 5-32l6-22 22 14 27-2 20-13 2 26q23 25 2 43-30 18-66 0Z"/><path fill="#fff0d3" d="M58 100q-8 18 2 19 9 3 13-14M162 117q28 14 4 23"/><path fill="none" d="m52 73 4 2m36-5 4-2m-28 16 5 3 5-3m33 18 5 2m23-4 5-2m-22 15 5 2 4-3"/><path fill="none" stroke="#d5b5a6" d="m46 85 7 1m47-3 7-2m-7 30 5 1m35-2 6-2"/></g></svg><p>always<br>a work<br>in progress<br><span aria-hidden="true">✧ + ♡</span></p></div></aside>
  </div>
</div>`;
