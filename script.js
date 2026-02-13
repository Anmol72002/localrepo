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
