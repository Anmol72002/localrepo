const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseText = document.getElementById('surpriseText');
const heartsLayer = document.querySelector('.floating-hearts');
const memoryButtons = document.querySelectorAll('.memory-btn');

if (surpriseBtn && surpriseText) {
  surpriseBtn.addEventListener('click', () => {
    surpriseText.classList.remove('hidden');
    surpriseBtn.textContent = 'You are my favorite person 💞';
    burstHeartsFromButton(surpriseBtn, 14);
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

function burstHeartsFromButton(button, count = 10) {
  if (!heartsLayer || !button) {
    return;
  }

  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'burst-heart';

    const angle = (Math.PI * 2 * i) / count;
    const spread = 45 + Math.random() * 65;
    const rise = 95 + Math.random() * 95;

    heart.style.left = `${centerX}px`;
    heart.style.top = `${centerY}px`;
    heart.style.setProperty('--x', `${Math.cos(angle) * spread}px`);
    heart.style.setProperty('--y', `${-rise}px`);
    heart.style.setProperty('--duration', `${900 + Math.random() * 800}ms`);
    heart.style.opacity = `${0.55 + Math.random() * 0.4}`;

    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 2200);
  }
}

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
