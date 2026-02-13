const gate = document.getElementById('gate');
const gateActions = document.getElementById('gateActions');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainContent = document.getElementById('mainContent');
const heartsLayer = document.getElementById('heartsLayer');
const catFollower = document.getElementById('catFollower');

const loveBtn = document.getElementById('loveBtn');
const loveMsg = document.getElementById('loveMsg');
const memoryButtons = document.querySelectorAll('.memory-btn');
const allButtons = document.querySelectorAll('button');

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

function moveNoButton() {
  if (!gateActions || !noBtn) return;

  const bounds = gateActions.getBoundingClientRect();
  const maxX = Math.max(0, bounds.width - noBtn.offsetWidth);
  const maxY = Math.max(0, bounds.height - noBtn.offsetHeight);

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

if (noBtn) {
  noBtn.addEventListener('click', () => {
    moveNoButton();
  });
}

if (yesBtn && gate && mainContent) {
  yesBtn.addEventListener('click', (event) => {
    const x = Number.isFinite(event.clientX) && event.clientX > 0 ? event.clientX : window.innerWidth / 2;
    const y = Number.isFinite(event.clientY) && event.clientY > 0 ? event.clientY : window.innerHeight / 2;

    burstHeartsAt(x, y, 20);
    gate.classList.add('hidden');
    mainContent.classList.remove('hidden');
    mainContent.setAttribute('aria-hidden', 'false');
  });
}

allButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (button === noBtn) return;

    const x = Number.isFinite(event.clientX) && event.clientX > 0 ? event.clientX : window.innerWidth / 2;
    const y = Number.isFinite(event.clientY) && event.clientY > 0 ? event.clientY : window.innerHeight / 2;
    burstHeartsAt(x, y, button === loveBtn ? 18 : 12);
  });
});

if (loveBtn && loveMsg) {
  loveBtn.addEventListener('click', () => {
    loveMsg.classList.remove('hidden');
    loveBtn.textContent = 'You are my favorite person 💞';
  });
}

memoryButtons.forEach((button) => {
  const original = button.textContent;

  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    if (!target) return;

    const reveal = target.classList.contains('hidden');
    target.classList.toggle('hidden');
    button.textContent = reveal ? 'Hide memory 💌' : original;
  });
});

window.addEventListener('resize', () => {
  if (!gate.classList.contains('hidden')) {
    moveNoButton();
  }
});

moveNoButton();

let catX = window.innerWidth / 2;
let catY = window.innerHeight / 2;
let targetX = catX;
let targetY = catY;
let lastMoveTs = 0;

function animateCat() {
  if (!catFollower) return;

  catX += (targetX - catX) * 0.18;
  catY += (targetY - catY) * 0.18;

  const moving = Date.now() - lastMoveTs < 140;
  catFollower.classList.toggle('is-resting', !moving);
  catFollower.style.transform = `translate(${catX}px, ${catY}px) translate(-50%, -50%)`;

  requestAnimationFrame(animateCat);
}

window.addEventListener('mousemove', (event) => {
  targetX = event.clientX + 14;
  targetY = event.clientY + 16;
  lastMoveTs = Date.now();
});

if (catFollower) {
  catFollower.style.transform = `translate(${catX}px, ${catY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCat);
}

