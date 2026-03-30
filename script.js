const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const toTopBtn = document.getElementById('toTopBtn');
const progressBar = document.getElementById('scrollProgress');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  if (progressBar) progressBar.style.width = `${Math.max(0, Math.min(100, scrolled))}%`;
  if (toTopBtn) toTopBtn.classList.toggle('show', window.scrollY > 350);
});

if (toTopBtn) {
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealElements.forEach((el) => revealObserver.observe(el));
}

const counters = document.querySelectorAll('[data-counter]');
counters.forEach((counter) => {
  const target = Number(counter.getAttribute('data-counter'));
  let value = 0;
  const step = Math.max(1, Math.floor(target / 35));
  const tick = () => {
    value += step;
    if (value >= target) {
      counter.textContent = String(target);
      return;
    }
    counter.textContent = String(value);
    requestAnimationFrame(tick);
  };
  tick();
});

const ormForm = document.getElementById('ormForm');
if (ormForm) {
  ormForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const weight = Number(document.getElementById('weightInput')?.value || 0);
    const reps = Number(document.getElementById('repsInput')?.value || 0);
    const result = document.getElementById('ormResult');
    if (!result || weight <= 0 || reps <= 0) return;

    const oneRM = weight * (1 + reps / 30);
    const trainingMax = oneRM * 0.9;
    result.textContent = `Оценка 1ПМ: ${oneRM.toFixed(1)} кг • Тренировочный максимум (90%): ${trainingMax.toFixed(1)} кг`;
  });
}

const planForm = document.getElementById('planForm');
if (planForm) {
  const templates = {
    beginner: ['Д1: Присед 5x5 + Жим 5x5', 'Д2: Тяга 4x4 + тяга в наклоне', 'Д3: Лёгкий объём + техника'],
    intermediate: ['Д1: Присед тяж + Жим объём', 'Д2: Тяга тяж + задняя цепь', 'Д3: Жим тяж + паузный присед', 'Д4: Вариативная тяга + ОФП'],
    advanced: ['Д1: Соревновательный присед + синглы', 'Д2: Соревновательная тяга + блоки', 'Д3: Жим соревновательный + пауза', 'Д4: Специальные вариации + восстановление']
  };

  planForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const level = document.getElementById('levelInput')?.value || 'beginner';
    const list = document.getElementById('planResult');
    if (!list) return;
    list.innerHTML = '';
    templates[level].forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
  });
}

const filterButtons = document.querySelectorAll('[data-filter]');
const videoCards = document.querySelectorAll('.video-card[data-cat]');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    videoCards.forEach((card) => {
      const cat = card.getAttribute('data-cat');
      card.style.display = filter === 'all' || filter === cat ? 'block' : 'none';
    });
  });
});

const tabButtons = document.querySelectorAll('[data-tab]');
const tabPanels = document.querySelectorAll('[data-panel]');
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const tab = button.getAttribute('data-tab');
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    tabPanels.forEach((panel) => {
      panel.classList.toggle('active', panel.getAttribute('data-panel') === tab);
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.zoomable').forEach((img) => {
  img.addEventListener('click', () => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = img.src;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
if (lightbox) {
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
  });
}

const orbs = document.querySelectorAll('.bg-orb');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 18;
  const y = (e.clientY / window.innerHeight - 0.5) * 18;
  orbs.forEach((orb, idx) => {
    orb.style.transform = `translate(${x * (idx + 1) * 0.35}px, ${y * (idx + 1) * 0.35}px)`;
  });
});
