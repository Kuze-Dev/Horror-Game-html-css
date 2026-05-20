function playScare(){
    if(!audioStarted||!audioCtx)return;
    const t=audioCtx.currentTime;
    [110,165,220,330].forEach((f,i)=>{
      const o=audioCtx.createOscillator(),g=audioCtx.createGain();
      o.type='sawtooth';o.frequency.value=f*(1+Math.random()*0.05);
      g.gain.setValueAtTime(0.12/(i+1),t);g.gain.exponentialRampToValueAtTime(0.001,t+1.6);
      o.connect(g);g.connect(masterGain);o.start(t);o.stop(t+1.7);
    });
  }
  
  /* ══ EXTREME SHOCK SOUND ══
     9 simultaneous layers of terror */
  function playShockSound(){
    if(!audioStarted||!audioCtx)return;
    const t=audioCtx.currentTime;
  
    /* 1. EARTH-SHAKING SUB THUD */
    const sub=audioCtx.createOscillator(),subG=audioCtx.createGain();
    sub.frequency.setValueAtTime(90,t);sub.frequency.exponentialRampToValueAtTime(18,t+0.7);
    sub.type='sine';subG.gain.setValueAtTime(1.0,t);subG.gain.exponentialRampToValueAtTime(0.001,t+0.75);
    sub.connect(subG);subG.connect(masterGain);sub.start(t);sub.stop(t+0.8);
  
    /* 2. SECOND SUB LAYER — slightly offset */
    const sub2=audioCtx.createOscillator(),sub2G=audioCtx.createGain();
    sub2.frequency.setValueAtTime(60,t+0.02);sub2.frequency.exponentialRampToValueAtTime(14,t+0.8);
    sub2.type='sine';sub2G.gain.setValueAtTime(0.7,t+0.02);sub2G.gain.exponentialRampToValueAtTime(0.001,t+0.85);
    sub2.connect(sub2G);sub2G.connect(masterGain);sub2.start(t+0.02);sub2.stop(t+0.9);
  
    /* 3. DISTORTED MID CRASH — 8 detuned saws through waveshaper */
    [52,56,69,78,92,104,138,155].forEach((f,i)=>{
      const o=audioCtx.createOscillator(),g=audioCtx.createGain(),ds=audioCtx.createWaveShaper();
      const cv=new Float32Array(512);
      for(let k=0;k<512;k++){const x=k*2/511-1;cv[k]=x<0?-Math.pow(-x,0.3):Math.pow(x,0.3);}
      ds.curve=cv;
      o.type='sawtooth';o.frequency.value=f*(1+Math.random()*0.06);
      g.gain.setValueAtTime(0.28-i*0.022,t);g.gain.exponentialRampToValueAtTime(0.001,t+2.2);
      o.connect(ds);ds.connect(g);g.connect(masterGain);o.start(t);o.stop(t+2.3);
    });
  
    /* 4. ULTRA-HIGH SCREECH — sweeps 200→5000→700 Hz */
    const scr=audioCtx.createOscillator(),scrG=audioCtx.createGain(),scrDs=audioCtx.createWaveShaper();
    const sc=new Float32Array(512);for(let k=0;k<512;k++){const x=k*2/511-1;sc[k]=Math.tanh(x*8);}
    scrDs.curve=sc;
    scr.type='sawtooth';
    scr.frequency.setValueAtTime(180,t);
    scr.frequency.exponentialRampToValueAtTime(5000,t+0.06);
    scr.frequency.exponentialRampToValueAtTime(1200,t+0.4);
    scr.frequency.exponentialRampToValueAtTime(350,t+1.6);
    scrG.gain.setValueAtTime(0,t);scrG.gain.linearRampToValueAtTime(0.42,t+0.04);scrG.gain.exponentialRampToValueAtTime(0.001,t+2.0);
    scr.connect(scrDs);scrDs.connect(scrG);scrG.connect(masterGain);scr.start(t);scr.stop(t+2.1);
  
    /* 5. SECOND SCREECH — slightly different pitch trajectory */
    const scr2=audioCtx.createOscillator(),scr2G=audioCtx.createGain();
    scr2.type='square';
    scr2.frequency.setValueAtTime(220,t+0.01);
    scr2.frequency.exponentialRampToValueAtTime(4200,t+0.07);
    scr2.frequency.exponentialRampToValueAtTime(900,t+0.5);
    scr2.frequency.exponentialRampToValueAtTime(200,t+2.0);
    scr2G.gain.setValueAtTime(0,t+0.01);scr2G.gain.linearRampToValueAtTime(0.25,t+0.06);scr2G.gain.exponentialRampToValueAtTime(0.001,t+2.1);
    scr2.connect(scr2G);scr2G.connect(masterGain);scr2.start(t+0.01);scr2.stop(t+2.2);
  
    /* 6. NOISE EXPLOSION — full spectrum burst */
    const nd=1.5,nb=audioCtx.createBuffer(1,Math.floor(audioCtx.sampleRate*nd),audioCtx.sampleRate);
    const nda=nb.getChannelData(0);for(let i=0;i<nda.length;i++)nda[i]=Math.random()*2-1;
    const ns=audioCtx.createBufferSource(),ng=audioCtx.createGain(),nf=audioCtx.createBiquadFilter();
    nf.type='bandpass';nf.frequency.value=1400;nf.Q.value=0.25;
    ns.buffer=nb;ng.gain.setValueAtTime(0.55,t);ng.gain.exponentialRampToValueAtTime(0.001,t+nd);
    ns.connect(nf);nf.connect(ng);ng.connect(masterGain);ns.start(t);ns.stop(t+nd);
  
    /* 7. FORMANT SCREAM — simulate human terror vocal */
    [[820,0.22],[1300,0.16],[2600,0.12],[3500,0.08],[4800,0.05]].forEach(([freq,vol],i)=>{
      const fo=audioCtx.createOscillator(),ff=audioCtx.createBiquadFilter(),fg=audioCtx.createGain();
      fo.type='sawtooth';
      fo.frequency.setValueAtTime(190+i*6,t);fo.frequency.linearRampToValueAtTime(240+i*8,t+0.25);fo.frequency.linearRampToValueAtTime(170+i*4,t+1.1);
      ff.type='bandpass';ff.frequency.value=freq;ff.Q.value=10;
      fg.gain.setValueAtTime(0,t+0.015);fg.gain.linearRampToValueAtTime(vol,t+0.07);fg.gain.exponentialRampToValueAtTime(0.001,t+1.8);
      fo.connect(ff);ff.connect(fg);fg.connect(masterGain);fo.start(t+0.015);fo.stop(t+1.9);
    });
  
    /* 8. METALLIC CLANG — high resonant impact */
    const cl=audioCtx.createOscillator(),clG=audioCtx.createGain();
    cl.type='triangle';cl.frequency.setValueAtTime(1800,t);cl.frequency.exponentialRampToValueAtTime(400,t+0.3);
    clG.gain.setValueAtTime(0.35,t);clG.gain.exponentialRampToValueAtTime(0.001,t+0.35);
    cl.connect(clG);clG.connect(masterGain);cl.start(t);cl.stop(t+0.38);
  
    /* 9. IMPACT CLICK — bone-snap transient at frame zero */
    const ck=audioCtx.createBuffer(1,Math.floor(audioCtx.sampleRate*0.025),audioCtx.sampleRate);
    const ckd=ck.getChannelData(0);
    for(let i=0;i<ckd.length;i++)ckd[i]=(Math.random()*2-1)*Math.exp(-i/(audioCtx.sampleRate*0.004))*0.95;
    const cks=audioCtx.createBufferSource(),ckg=audioCtx.createGain();
    ckg.gain.value=0.7;cks.buffer=ck;cks.connect(ckg);ckg.connect(masterGain);cks.start(t);
  }
  
  /* Cross angelic chime */
  function playCrossChime(){
    if(!audioStarted||!audioCtx)return;
    const t=audioCtx.currentTime;
    [523,659,784,1047,1318].forEach((f,i)=>{
      const o=audioCtx.createOscillator(),g=audioCtx.createGain();
      o.type='sine';o.frequency.value=f;
      g.gain.setValueAtTime(0,t+i*0.08);g.gain.linearRampToValueAtTime(0.14,t+i*0.08+0.05);g.gain.exponentialRampToValueAtTime(0.001,t+i*0.08+1.4);
      o.connect(g);g.connect(masterGain);o.start(t+i*0.08);o.stop(t+i*0.08+1.5);
    });
  }
  
  /* Full jumpscare: shock sound + face + shake */
  function playJumpscare(){
    playShockSound();
    document.body.classList.remove('shaking');void document.body.offsetWidth;document.body.classList.add('shaking');
    setTimeout(()=>document.body.classList.remove('shaking'),850);
    const ov=document.getElementById('jumpscare-overlay');
    ov.classList.remove('show');void ov.offsetWidth;ov.classList.add('show');
    setTimeout(()=>ov.classList.remove('show'),2100);
  }
