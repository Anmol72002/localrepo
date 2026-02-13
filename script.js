const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseText = document.getElementById('surpriseText');
const heartsLayer = document.querySelector('.floating-hearts');
const memoryButtons = document.querySelectorAll('.memory-btn');
const allButtons = document.querySelectorAll('button');

const MAX_FLOATING_HEARTS = 18;
let floatingHeartCount = 0;

if (surpriseBtn && surpriseText) {
  surpriseBtn.addEventListener('click', () => {
    surpriseText.classList.remove('hidden');
    surpriseBtn.textContent = 'You are my favorite person 💞';
  });
}

allButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    burstHeartsAtPoint(event.clientX, event.clientY, 12);
  });
});

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

function burstHeartsAtPoint(x, y, count = 10) {
  if (!heartsLayer) {
    return;
  }

  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'burst-heart';

    const angle = (Math.PI * 2 * i) / count;
    const spread = 45 + Math.random() * 65;
    const rise = 95 + Math.random() * 95;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty('--x', `${Math.cos(angle) * spread}px`);
    heart.style.setProperty('--y', `${-rise}px`);
    heart.style.setProperty('--duration', `${900 + Math.random() * 800}ms`);
    heart.style.opacity = `${0.55 + Math.random() * 0.4}`;

    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 2200);
  }
}

function createHeart() {
  if (!heartsLayer || floatingHeartCount >= MAX_FLOATING_HEARTS) {
    return;
  }

  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.bottom = '-20px';
  heart.style.animationDuration = `${5 + Math.random() * 4}s`;
  heart.style.opacity = `${0.35 + Math.random() * 0.45}`;
  heartsLayer.appendChild(heart);
  floatingHeartCount += 1;

  setTimeout(() => {
    heart.remove();
    floatingHeartCount = Math.max(0, floatingHeartCount - 1);
  }, 9000);
}

setInterval(createHeart, 900);
