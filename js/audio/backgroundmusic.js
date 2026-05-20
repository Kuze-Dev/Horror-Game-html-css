let audioCtx;
let masterGain;
let muteGain;
let currentSource = null;

let audioStarted = false;
let muted = false;

async function initAudio(){

  if(audioStarted) return;

  audioStarted = true;

  audioCtx =
    new (window.AudioContext || window.webkitAudioContext)();

  masterGain = audioCtx.createGain();

  muteGain = audioCtx.createGain();

  masterGain.connect(muteGain);
  muteGain.connect(audioCtx.destination);

  await loadMusic('./assets/audio/horror.mp3');
}

async function loadMusic(url){

  const response = await fetch(url);

  const arrayBuffer =
    await response.arrayBuffer();

  const audioBuffer =
    await audioCtx.decodeAudioData(arrayBuffer);

  const source =
    audioCtx.createBufferSource();

  source.buffer = audioBuffer;

  source.loop = true;

  source.connect(masterGain);

  source.start(0);

  currentSource = source;
}

function setVol(v){

  if(masterGain){

    masterGain.gain.value =
      parseFloat(v);

  }
}

function toggleMute(){

  muted = !muted;

  muteGain.gain.value =
    muted ? 0 : 1;

  $('mute-btn').textContent =
    muted ? 'UNMUTE' : 'MUTE';
}
