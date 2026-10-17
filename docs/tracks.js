// Add future productions here; the library count and track navigation update automatically.
const studioTracks = [
  {id:'audio-foundation-hw3', title:'Audio Foundation HW3', src:'assets/audio/audio-foundation-hw3.mp3'}
];
const audio = document.querySelector('#studio-audio');
const disc = document.querySelector('#record-disc');
const playButton = document.querySelector('#play-pause');
const progress = document.querySelector('#track-progress');
const playerStatus = document.querySelector('#player-status');
const library = document.querySelector('#track-library');
const listeningPage = document.querySelector('#listening-page');
const requestedTrack = new URLSearchParams(location.search).get('track');
let currentTrack = Math.max(0, studioTracks.findIndex(track=>track.id === requestedTrack));
let seeking = false;
let isBuffering = false;

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
  return `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
}
function setStatus(message) { playerStatus.textContent = message; }
function updateMotion() {
  // Only animate after the media element has playable audio, never during buffering.
  disc.classList.toggle('is-spinning', !audio.paused && !audio.ended && !audio.error && audio.readyState >= 3 && !isBuffering && !listeningPage.hidden);
  playButton.setAttribute('aria-pressed',String(!audio.paused && !audio.ended));
  playButton.setAttribute('aria-label',audio.paused || audio.ended ? 'Play' : 'Pause');
  playButton.querySelector('use').setAttribute('href',audio.paused || audio.ended ? '#play' : '#pause');
}
function updateProgress() {
  const duration = audio.duration;
  document.querySelector('#current-time').textContent = formatTime(audio.currentTime);
  document.querySelector('#total-time').textContent = formatTime(duration);
  progress.disabled = !Number.isFinite(duration) || duration <= 0;
  if (!seeking) progress.value = Number.isFinite(duration) && duration > 0 ? audio.currentTime/duration*100 : 0;
  progress.setAttribute('aria-valuetext',`${formatTime(audio.currentTime)} of ${formatTime(duration)}`);
  const durationLabel = document.querySelector(`[data-track-duration="${studioTracks[currentTrack].id}"]`);
  if (durationLabel) durationLabel.textContent = formatTime(duration);
}
function loadTrack(index, continuePlaying = false) {
  currentTrack = (index + studioTracks.length) % studioTracks.length;
  const track = studioTracks[currentTrack];
  audio.pause();
  audio.src = track.src;
  audio.load();
  document.querySelector('#playing-title').textContent = track.title;
  document.querySelector('#track-number').textContent = `Track ${String(currentTrack+1).padStart(2,'0')}`;
  document.querySelector('#current-time').textContent = '0:00';
  document.querySelector('#total-time').textContent = '--:--';
  progress.value = 0; progress.disabled = true;
  isBuffering = false;
  setStatus('Ready when you are.');
  updateMotion();
  if (continuePlaying) startPlayback();
}
async function startPlayback() {
  setStatus('Loading your little soundtrack…');
  try { await audio.play(); }
  catch (error) {
    if (error.name !== 'AbortError') setStatus('Playback couldn’t start. Press play to try again.');
    updateMotion();
  }
}
document.querySelector('#track-count').textContent = `${studioTracks.length} ${studioTracks.length === 1 ? 'track' : 'tracks'}`;
const trackList = document.querySelector('#track-list');
for (const [index,track] of studioTracks.entries()) {
  const link = document.createElement('a');
  link.className = 'track-row';
  link.href = `tracks.html?track=${encodeURIComponent(track.id)}`;
  const number = document.createElement('span'); number.className = 'library-track-number'; number.textContent = String(index+1).padStart(2,'0');
  const name = document.createElement('span'); name.className = 'library-track-name';
  const eyebrow = document.createElement('small'); eyebrow.textContent = `Track ${String(index+1).padStart(2,'0')}`;
  const title = document.createElement('strong'); title.textContent = track.title; name.append(eyebrow,title);
  const duration = document.createElement('span'); duration.className = 'library-track-duration'; duration.dataset.trackDuration = track.id; duration.textContent = '--:--';
  const arrow = document.createElement('span'); arrow.className = 'library-play'; arrow.textContent = '▷'; arrow.setAttribute('aria-hidden','true');
  link.append(number,name,duration,arrow); trackList.append(link);
  // Read each real file's metadata rather than displaying example durations.
  if (index !== currentTrack) {
    const probe = new Audio(); probe.preload = 'metadata';
    probe.addEventListener('loadedmetadata',()=>{duration.textContent = formatTime(probe.duration); probe.removeAttribute('src'); probe.load();},{once:true});
    probe.src = track.src;
  }
}
if (studioTracks.some(track=>track.id === requestedTrack)) {
  library.hidden = true; listeningPage.hidden = false;
  document.querySelector('#studio-window-title').textContent = 'now_playing.exe';
  document.querySelector('#studio-back').href = 'tracks.html';
  document.querySelector('#studio-back').textContent = '← Back to my tracks';
  document.title = `${studioTracks[currentTrack].title} | Cristy’s little studio`;
}
audio.volume = .75;
loadTrack(currentTrack);
playButton.addEventListener('click',()=>{if(audio.paused || audio.ended)startPlayback();else audio.pause();});
for (const [id,offset] of [['previous-track',-1],['next-track',1]]) {
  const button = document.getElementById(id);
  button.disabled = studioTracks.length < 2;
  if (button.disabled) button.title = 'More tracks coming soon';
  button.addEventListener('click',()=>{
    loadTrack(currentTrack+offset,!audio.paused);
    history.replaceState(null,'',`tracks.html?track=${encodeURIComponent(studioTracks[currentTrack].id)}`);
    document.title = `${studioTracks[currentTrack].title} | Cristy’s little studio`;
  });
}
progress.addEventListener('input',()=>{
  seeking = true;
  const target = Number(progress.value)/100*audio.duration;
  if (Number.isFinite(target)) {
    audio.currentTime = target;
    document.querySelector('#current-time').textContent = formatTime(target);
    progress.setAttribute('aria-valuetext',`${formatTime(target)} of ${formatTime(audio.duration)}`);
  }
});
progress.addEventListener('change',()=>{seeking = false;updateProgress();});
document.querySelector('#track-volume').addEventListener('input',event=>{
  audio.volume = Number(event.target.value)/100;
  document.querySelector('#volume-value').textContent = `${event.target.value}%`;
});
document.querySelector('#loop-track').addEventListener('click',event=>{
  audio.loop = !audio.loop;
  document.querySelector('#loop-track').setAttribute('aria-pressed',String(audio.loop));
  setStatus(audio.loop ? 'Loop is on. Stay a little longer ♡' : 'Loop is off.');
});
audio.addEventListener('loadedmetadata',updateProgress);
audio.addEventListener('durationchange',updateProgress);
audio.addEventListener('timeupdate',updateProgress);
audio.addEventListener('playing',()=>{isBuffering = false;updateMotion();setStatus('Playing ♡');});
audio.addEventListener('pause',()=>{updateMotion();if(!audio.ended)setStatus('Paused. Your place is saved.');});
audio.addEventListener('waiting',()=>{isBuffering = true;updateMotion();setStatus('Buffering…');});
audio.addEventListener('seeking',()=>{isBuffering = true;updateMotion();});
audio.addEventListener('seeked',()=>{isBuffering = false;updateMotion();});
audio.addEventListener('ended',()=>{
  updateMotion();
  if (studioTracks.length > 1 && !audio.loop)loadTrack(currentTrack+1,true);
  else setStatus('Thanks for listening ♡');
});
audio.addEventListener('error',()=>{isBuffering = false;disc.classList.remove('is-spinning');setStatus('This audio couldn’t load. Please refresh and try again.');});
window.addEventListener('pagehide',()=>audio.pause());
