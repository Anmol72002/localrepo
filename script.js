<<<<<<< codex/create-valentine-themed-frontend-website-r05bgl
const heartsLayer = document.getElementById('heartsLayer');
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
    const dx = Math.cos(angle) * distance;
    const dy = -(70 + Math.random() * 110);

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty('--dx', `${dx}px`);
    heart.style.setProperty('--dy', `${dy}px`);
    heart.style.setProperty('--dur', `${700 + Math.random() * 900}ms`);

    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 1800);
  }
}

allButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
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
=======
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseText = document.getElementById('surpriseText');
const heartsLayer = document.querySelector('.floating-hearts');
const memoryButtons = document.querySelectorAll('.memory-btn');

if (surpriseBtn && surpriseText) {
  surpriseBtn.addEventListener('click', () => {
    surpriseText.classList.remove('hidden');
    surpriseBtn.textContent = 'You are my favorite person 💞';
  });
}

memoryButtons.forEach((button) => {
  const defaultLabel = button.textContent;
  button.dataset.label = defaultLabel;

  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    const targetCard = document.getElementById(targetId);

    if (!targetCard) {
      return;
    }

    const willReveal = targetCard.classList.contains('hidden');
    targetCard.classList.toggle('hidden');
    button.classList.toggle('is-revealed', willReveal);
    button.textContent = willReveal ? 'Hide memory 💌' : button.dataset.label;
  });
});

function createHeart() {
  if (!heartsLayer) {
    return;
  }

  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.bottom = '-20px';
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;
  heart.style.opacity = `${0.4 + Math.random() * 0.5}`;
  heartsLayer.appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 320);
>>>>>>> main
