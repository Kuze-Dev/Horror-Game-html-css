window.addEventListener('click', () => {

    initAudio();
  
  }, { once:true });
  
  /* START BUTTON */
  
  $('start-btn')
  .addEventListener('click', startGame);
  
  /* LIGHT SWITCH */
  
  $('switch-area')
  .addEventListener('click', toggleLight);
  
  /* CROSS */
  
  $('cross-item')
  .addEventListener('click', useCross);
  
  /* DOOR */
  
  $('door-area')
  .addEventListener('click', openDoor);
  
  /* AUDIO */
  
  $('vol-slider')
  .addEventListener('input', e => {
  
    setVol(e.target.value);
  
  });
  
  $('mute-btn')
  .addEventListener('click', toggleMute);
  
  /* KEYS */
  
  document.addEventListener('keydown', e => {
  
    if(e.key === 'l'){
  
      toggleLight();
    }
  
    if(e.key === 'c'){
  
      useCross();
    }
  
    if(e.key === 'o'){
  
      openDoor();
    }
  });
