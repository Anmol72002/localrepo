const gate = document.getElementById('gate');
const gateActions = document.getElementById('gateActions');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainContent = document.getElementById('mainContent');
const heartsLayer = document.getElementById('heartsLayer');
const catFollower = document.getElementById('catFollower');
const gateMoodCat = document.getElementById('gateMoodCat');

const loveBtn = document.getElementById('loveBtn');
const loveMsg = document.getElementById('loveMsg');
const loveLink = document.getElementById('loveLink');
const memoryButtons = document.querySelectorAll('.memory-btn');
const allButtons = document.querySelectorAll('button');
const mediaToggleBtn = document.getElementById('mediaToggleBtn');
let currentlyPlayingAudio = null;

function burstHeartsAt(x, y, count = 12) {
  if (!heartsLayer) return;

  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'pop-heart';

    const angle = (Math.PI * 2 * i) / count;
    const distance = 30 + Math.random() * 85;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    heart.style.setProperty('--dy', `${-(70 + Math.random() * 110)}px`);
    heart.style.setProperty('--dur', `${700 + Math.random() * 900}ms`);

    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 1800);
  }
}

function setGateCatMood(mood) {
  if (!gateMoodCat) return;

  gateMoodCat.classList.remove('is-thinking', 'is-sad', 'is-happy');

  if (mood === 'sad') {
    gateMoodCat.textContent = '😿';
    gateMoodCat.classList.add('is-sad');
  } else if (mood === 'happy') {
    gateMoodCat.textContent = '😻';
    gateMoodCat.classList.add('is-happy');
  } else {
    gateMoodCat.textContent = '😺';
    gateMoodCat.classList.add('is-thinking');
  }
}

function isMouseChasingNoButton(event) {
  if (!noBtn || !gate || gate.classList.contains('hidden')) return false;

  const rect = noBtn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = event.clientX - cx;
  const dy = event.clientY - cy;
  return Math.hypot(dx, dy) < 130;
}

function moveNoButton() {
  if (!gateActions || !noBtn) return;

  const bounds = gateActions.getBoundingClientRect();
  const maxX = Math.max(0, bounds.width - noBtn.offsetWidth);
  const maxY = Math.max(0, bounds.height - noBtn.offsetHeight);

  noBtn.style.left = `${Math.random() * maxX}px`;
  noBtn.style.top = `${Math.random() * maxY}px`;
}

if (noBtn) {
  noBtn.addEventListener('mouseenter', () => {
    moveNoButton();
    setGateCatMood('sad');
  });
}

window.addEventListener('mousemove', (event) => {
  if (isMouseChasingNoButton(event)) {
    setGateCatMood('sad');
  } else if (gate && !gate.classList.contains('hidden')) {
    setGateCatMood('thinking');
  }
});

if (yesBtn && gate && mainContent) {
  yesBtn.addEventListener('click', (event) => {
    const x = Number.isFinite(event.clientX) && event.clientX > 0 ? event.clientX : window.innerWidth / 2;
    const y = Number.isFinite(event.clientY) && event.clientY > 0 ? event.clientY : window.innerHeight / 2;

    setGateCatMood('happy');
    burstHeartsAt(x, y, 20);

    setTimeout(() => {
      gate.classList.add('hidden');
      mainContent.classList.remove('hidden');
      mainContent.setAttribute('aria-hidden', 'false');
    }, 260);
  });
}

allButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (button === noBtn) return;

    const x = Number.isFinite(event.clientX) && event.clientX > 0 ? event.clientX : window.innerWidth / 2;
    const y = Number.isFinite(event.clientY) && event.clientY > 0 ? event.clientY : window.innerHeight / 2;
    // burstHeartsAt(x, y, button === loveBtn ? 18 : 12);
    burstHeartsAt(x, y, button === loveBtn ? 100 : 12);

  });


});

if (loveBtn && loveMsg) {
  loveBtn.addEventListener('click', () => {
    loveMsg.classList.remove('hidden');
    if (loveLink) {
      loveLink.classList.remove('hidden');
      loveLink.classList.add('love-link--revealed');
    }
    loveBtn.textContent = 'You are my favorite person 💞';

    const audioId = loveBtn.dataset.audio;
    const audio = audioId ? document.getElementById(audioId) : null;
    if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
      currentlyPlayingAudio.pause();
      currentlyPlayingAudio.currentTime = 0;
    }
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      currentlyPlayingAudio = audio;
      updateMediaToggleButton();
    }
  });
}

const memoryLightbox = document.getElementById('memoryLightbox');
const memoryLightboxBackdrop = memoryLightbox?.querySelector('.memory-lightbox__backdrop');
const memoryLightboxImg = memoryLightbox?.querySelector('.memory-lightbox__img');
const memoryLightboxCaption = memoryLightbox?.querySelector('.memory-lightbox__caption');

let lightboxMemoryId = null;

function openMemoryLightbox(memoryEl) {
  if (!memoryLightbox || !memoryLightboxImg || !memoryLightboxCaption || !memoryEl) return;
  const img = memoryEl.querySelector('img');
  const cap = memoryEl.querySelector('figcaption');
  if (!img) return;
  memoryLightboxImg.src = img.src;
  memoryLightboxImg.alt = img.alt || '';
  memoryLightboxCaption.textContent = cap ? cap.textContent : '';
  lightboxMemoryId = memoryEl.id;
  memoryLightbox.setAttribute('aria-hidden', 'false');
  memoryLightbox.classList.add('is-open');
}

function closeMemoryLightbox(setIntoPlace) {
  if (!memoryLightbox || !memoryLightbox.classList.contains('is-open')) return;
  memoryLightbox.classList.add('is-closing');
  memoryLightbox.classList.remove('is-open');
  setTimeout(() => {
    memoryLightbox.classList.remove('is-closing');
    memoryLightbox.setAttribute('aria-hidden', 'true');
    if (setIntoPlace && lightboxMemoryId) {
      const mem = document.getElementById(lightboxMemoryId);
      if (mem && mem.classList.contains('memory')) {
        mem.classList.remove('memory--hidden');
        mem.classList.add('memory--revealed');
      }
      lightboxMemoryId = null;
    }
  }, 320);
}

if (memoryLightbox) {
  memoryLightbox.addEventListener('click', (e) => {
    if (e.target === memoryLightboxBackdrop || e.target.closest('.memory-lightbox__backdrop')) {
      closeMemoryLightbox(true);
    }
  });
}

memoryButtons.forEach((button) => {
  const original = button.textContent;

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const target = document.getElementById(button.dataset.target);
    if (!target || !target.classList.contains('memory')) return;

    const isHidden = target.classList.contains('memory--hidden');

    if (isHidden) {
      openMemoryLightbox(target);
      button.textContent = 'Hide memory 💌';
      const audioId = button.dataset.audio;
      const audio = audioId ? document.getElementById(audioId) : null;
      if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
      }
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        currentlyPlayingAudio = audio;
      }
      updateMediaToggleButton();
    } else {
      closeMemoryWithFadeOut(target, () => {
        button.textContent = original;
      });
    }
  });
});

function closeMemoryWithFadeOut(memoryEl, onDone) {
  if (!memoryEl.classList.contains('memory--revealed') || memoryEl.classList.contains('memory--closing')) return;
  memoryEl.classList.add('memory--closing');
  const once = () => {
    memoryEl.removeEventListener('animationend', once);
    memoryEl.classList.remove('memory--revealed', 'memory--closing');
    memoryEl.classList.add('memory--hidden');
    if (onDone) onDone();
  };
  memoryEl.addEventListener('animationend', once);
}

const memoryButtonLabels = { m1: 'Our First Date', m2: 'Best Chai Date Ever', m3: 'Forever Us' };

function updateMediaToggleButton() {
  if (!mediaToggleBtn) return;
  const isPlaying = currentlyPlayingAudio && !currentlyPlayingAudio.paused;
  const label = isPlaying ? 'Pause music' : 'Play music';
  const text = isPlaying ? '⏸ Pause' : '▶ Play';
  mediaToggleBtn.setAttribute('aria-label', label);
  mediaToggleBtn.title = label;
  mediaToggleBtn.querySelector('span').textContent = text;
  mediaToggleBtn.classList.toggle('is-paused', !isPlaying);
  mediaToggleBtn.disabled = !currentlyPlayingAudio;
}

document.querySelectorAll('#audio-date, #audio-chai, #audio-forever, #audio-love').forEach((el) => {
  el.addEventListener('ended', updateMediaToggleButton);
});

if (mediaToggleBtn) {
  updateMediaToggleButton();
  mediaToggleBtn.addEventListener('click', () => {
    if (!currentlyPlayingAudio) return;
    if (currentlyPlayingAudio.paused) {
      currentlyPlayingAudio.play().catch(() => {});
    } else {
      currentlyPlayingAudio.pause();
    }
    updateMediaToggleButton();
  });
}

window.addEventListener('resize', () => {
  if (gate && !gate.classList.contains('hidden')) {
    moveNoButton();
  }
});

moveNoButton();
setGateCatMood('thinking');

const contentSwipe = document.getElementById('contentSwipe');
const goToHeroBtn = document.getElementById('goToHeroBtn');
if (goToHeroBtn && contentSwipe) {
  goToHeroBtn.addEventListener('click', () => {
    contentSwipe.classList.add('at-hero');
  });
}



(function oneko() {
    const isReducedMotion =
      window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  
    if (isReducedMotion) return;
  
    const nekoEl = document.createElement("div");
    let persistPosition = true;
  
    let nekoPosX = 32;
    let nekoPosY = 32;
    
    let mousePosX = 0;
    let mousePosY = 0;
  
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;
  
    const nekoSpeed = 30;
    const spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      scratchWallN: [
        [0, 0],
        [0, -1],
      ],
      scratchWallS: [
        [-7, -1],
        [-6, -2],
      ],
      scratchWallE: [
        [-2, -2],
        [-2, -3],
      ],
      scratchWallW: [
        [-4, 0],
        [-4, -1],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    };
  
    function init() {
      let nekoFile = "./oneko.gif"
      const curScript = document.currentScript
      if (curScript && curScript.dataset.cat) {
        nekoFile = curScript.dataset.cat
      }
      if (curScript && curScript.dataset.persistPosition) {
        if (curScript.dataset.persistPosition === "") {
          persistPosition = true;
        } else {
          persistPosition = JSON.parse(curScript.dataset.persistPosition.toLowerCase());
        }
      }
    
      if (persistPosition) {
        let storedNeko = JSON.parse(window.localStorage.getItem("oneko"));
        if (storedNeko !== null) {
          nekoPosX = storedNeko.nekoPosX;
          nekoPosY = storedNeko.nekoPosY;
          mousePosX = storedNeko.mousePosX;
          mousePosY = storedNeko.mousePosY;
          frameCount = storedNeko.frameCount;
          idleTime = storedNeko.idleTime;
          idleAnimation = storedNeko.idleAnimation;
          idleAnimationFrame = storedNeko.idleAnimationFrame;
          nekoEl.style.backgroundPosition = storedNeko.bgPos;
        }
      }
    
      nekoEl.id = "oneko";
      nekoEl.ariaHidden = true;
      nekoEl.style.width = "32px";
      nekoEl.style.height = "32px";
      nekoEl.style.position = "fixed";
      nekoEl.style.pointerEvents = "none";
      nekoEl.style.imageRendering = "pixelated";
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
      nekoEl.style.zIndex = 2147483647;
  
      nekoEl.style.backgroundImage = `url(${nekoFile})`;
      
      document.body.appendChild(nekoEl);
  
      document.addEventListener("mousemove", function (event) {
        mousePosX = event.clientX;
        mousePosY = event.clientY;
      });
      
      if (persistPosition) {
        window.addEventListener("beforeunload", function (event) {
          window.localStorage.setItem("oneko", JSON.stringify({
            nekoPosX: nekoPosX,
            nekoPosY: nekoPosY,
            mousePosX: mousePosX,
            mousePosY: mousePosY,
            frameCount: frameCount,
            idleTime: idleTime,
            idleAnimation: idleAnimation,
            idleAnimationFrame: idleAnimationFrame,
            bgPos: nekoEl.style.backgroundPosition
          }));
        });
      }
      
      window.requestAnimationFrame(onAnimationFrame);
    }
  
    let lastFrameTimestamp;
  
    function onAnimationFrame(timestamp) {
      // Stops execution if the neko element is removed from DOM
      if (!nekoEl.isConnected) {
        return;
      }
      if (!lastFrameTimestamp) {
        lastFrameTimestamp = timestamp;
      }
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp;
        frame();
      }
      window.requestAnimationFrame(onAnimationFrame);
    }
  
    function setSprite(name, frame) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }
  
    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }
  
    function idle() {
      idleTime += 1;
  
      // every ~ 20 seconds
      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) == 0 &&
        idleAnimation == null
      ) {
        let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) {
          avalibleIdleAnimations.push("scratchWallW");
        }
        if (nekoPosY < 32) {
          avalibleIdleAnimations.push("scratchWallN");
        }
        if (nekoPosX > window.innerWidth - 32) {
          avalibleIdleAnimations.push("scratchWallE");
        }
        if (nekoPosY > window.innerHeight - 32) {
          avalibleIdleAnimations.push("scratchWallS");
        }
        idleAnimation =
          avalibleIdleAnimations[
            Math.floor(Math.random() * avalibleIdleAnimations.length)
          ];
      }
  
      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }
  
    function frame() {
      frameCount += 1;
      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
  
      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }
  
      idleAnimation = null;
      idleAnimationFrame = 0;
  
      if (idleTime > 1) {
        setSprite("alert", 0);
        // count down after being alerted before moving
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }
  
      let direction;
      direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);
  
      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;
  
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
  
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }
  
    init();
  })();
  