const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseText = document.getElementById('surpriseText');
const effectStatus = document.getElementById('effectStatus');
const heartsLayer = document.querySelector('.floating-hearts');
const memoryButtons = document.querySelectorAll('.memory-btn');
const allButtons = document.querySelectorAll('button');

if (surpriseBtn && surpriseText) {
  surpriseBtn.addEventListener('click', () => {
    surpriseText.classList.remove('hidden');
    surpriseBtn.textContent = 'You are my favorite person 💞';
  });
}

allButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const x = Number.isFinite(event.clientX) && event.clientX > 0
      ? event.clientX
      : window.innerWidth / 2;
    const y = Number.isFinite(event.clientY) && event.clientY > 0
      ? event.clientY
      : window.innerHeight / 2;

    burstHeartsAtPoint(x, y, 14);

    if (effectStatus) {
      effectStatus.textContent = `💗 Pop! Hearts launched at x:${Math.round(x)}, y:${Math.round(y)}`;
    }
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
    const spread = 35 + Math.random() * 80;
    const rise = 80 + Math.random() * 120;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty('--x', `${Math.cos(angle) * spread}px`);
    heart.style.setProperty('--y', `${-rise}px`);
    heart.style.setProperty('--duration', `${700 + Math.random() * 900}ms`);
    heart.style.opacity = `${0.55 + Math.random() * 0.4}`;

    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }
}
