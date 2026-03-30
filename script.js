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

const updateScrollUI = () => {
  const scrollRoot = document.documentElement;
  const maxScroll = scrollRoot.scrollHeight - window.innerHeight;
  const scrolled = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${Math.max(0, Math.min(100, scrolled))}%`;
  }

  if (toTopBtn) {
    toTopBtn.classList.toggle('show', window.scrollY > 320);
  }
};

window.addEventListener('scroll', updateScrollUI);
updateScrollUI();

if (toTopBtn) {
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

const counters = document.querySelectorAll('[data-counter]');
counters.forEach((counter) => {
  const target = Number(counter.getAttribute('data-counter') || 0);
  if (!Number.isFinite(target) || target <= 0) return;

  let value = 0;
  const step = Math.max(1, Math.floor(target / 40));

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
  ormForm.addEventListener('submit', (event) => {
    event.preventDefault();

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
    beginner: [
      'Д1: Присед 5x5 + Жим 5x5 + поясница/пресс',
      'Д2: Тяга 4x4 + тяга в наклоне + задняя дельта',
      'Д3: Легкий техничный присед + жим пауза + ОФП'
    ],
    intermediate: [
      'Д1: Присед тяжело + Жим объем + квадрицепс',
      'Д2: Тяга тяжело + задняя цепь + широчайшие',
      'Д3: Жим тяжело + паузный присед + плечи',
      'Д4: Вариативная тяга + скорость + корпус'
    ],
    advanced: [
      'Д1: Соревновательный присед + синглы + добивка квадра',
      'Д2: Соревновательная тяга + блоки/дефицит + спина',
      'Д3: Соревновательный жим + пауза + трицепс',
      'Д4: Спецвариации под слабые точки + восстановительная сессия'
    ]
  };

  planForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const level = document.getElementById('levelInput')?.value || 'beginner';
    const list = document.getElementById('planResult');
    if (!list || !templates[level]) return;

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
const noResults = document.getElementById('noResults');

if (filterButtons.length && videoCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      let visible = 0;

      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      videoCards.forEach((card) => {
        const cat = card.getAttribute('data-cat');
        const shouldShow = filter === 'all' || filter === cat;
        card.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) visible += 1;
      });

      if (noResults) {
        noResults.classList.toggle('show', visible === 0);
      }
    });
  });
}

const tabButtons = document.querySelectorAll('[data-tab]');
const tabPanels = document.querySelectorAll('[data-panel]');
if (tabButtons.length && tabPanels.length) {
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
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.zoomable').forEach((img) => {
  img.addEventListener('click', () => {
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || 'image preview';
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
};

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.id !== 'lightboxImg') {
      closeLightbox();
    }
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

const orbs = document.querySelectorAll('.bg-orb');
window.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 18;
  const y = (event.clientY / window.innerHeight - 0.5) * 18;

  orbs.forEach((orb, index) => {
    orb.style.transform = `translate(${x * (index + 1) * 0.35}px, ${y * (index + 1) * 0.35}px)`;
  });
});

const rotatingLines = document.querySelectorAll('[data-lines]');
rotatingLines.forEach((node) => {
  const raw = node.getAttribute('data-lines') || '';
  const lines = raw
    .split('||')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return;

  let index = 0;
  window.setInterval(() => {
    index = (index + 1) % lines.length;
    node.classList.add('is-swapping');

    window.setTimeout(() => {
      node.textContent = lines[index];
      node.classList.remove('is-swapping');
    }, 160);
  }, 4200);
});
