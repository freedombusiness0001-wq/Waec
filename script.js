document.body.classList.add('enter');

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const navLinks = document.querySelectorAll('.nav-link');

menuBtn?.addEventListener('click', () => {
  menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(menu.classList.contains('open')));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => menu.classList.remove('open'));
});

const sections = document.querySelectorAll('main section[id]');
window.addEventListener('scroll', () => {
  const pos = scrollY + 140;
  sections.forEach((section) => {
    const id = section.id;
    const nav = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!nav) return;
    if (pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight) {
      navLinks.forEach((n) => n.classList.remove('active'));
      nav.classList.add('active');
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const animateCounter = (el) => {
  const target = Number(el.dataset.target);
  let value = 0;
  const step = Math.max(1, Math.floor(target / 90));
  const t = setInterval(() => {
    value += step;
    if (value >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(t);
    } else {
      el.textContent = value.toLocaleString();
    }
  }, 18);
};

const cObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      cObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach((c) => cObs.observe(c));

const data = [
  { q: 'If 3x + 9 = 24, what is x?', o: ['2', '3', '5', '6'], a: 2 },
  { q: 'Choose the antonym of "scarce".', o: ['Rare', 'Few', 'Abundant', 'Brief'], a: 2 },
  { q: 'The powerhouse of the cell is?', o: ['Nucleus', 'Mitochondrion', 'Cell wall', 'Vacuole'], a: 1 }
];

let i = 0;
let score = 0;
let locked = false;

const qEl = document.getElementById('question');
const aEl = document.getElementById('answers');
const sEl = document.getElementById('score');
const nextBtn = document.getElementById('next');

function renderQ() {
  locked = false;
  const item = data[i];
  qEl.textContent = item.q;
  aEl.innerHTML = '';
  item.o.forEach((text, idx) => {
    const b = document.createElement('button');
    b.className = 'ans';
    b.textContent = text;
    b.addEventListener('click', () => pick(idx, b));
    aEl.appendChild(b);
  });
}

function pick(selected, btn) {
  if (locked) return;
  locked = true;
  const correct = data[i].a;
  aEl.querySelectorAll('.ans').forEach((b, idx) => {
    if (idx === correct) b.classList.add('ok');
  });
  if (selected === correct) {
    score += 1;
    btn.classList.add('ok');
  } else {
    btn.classList.add('no');
  }
  sEl.textContent = `Score: ${score}`;
}

nextBtn?.addEventListener('click', () => {
  i += 1;
  if (i >= data.length) {
    qEl.textContent = `Quiz complete! Final score: ${score}/${data.length}`;
    aEl.innerHTML = '';
    nextBtn.disabled = true;
    return;
  }
  renderQ();
});
renderQ();

document.querySelectorAll('.q').forEach((q) => {
  q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
});

document.querySelectorAll('.ripple').forEach((el) => {
  el.addEventListener('click', (e) => {
    const r = el.getBoundingClientRect();
    const d = Math.max(r.width, r.height);
    const c = document.createElement('span');
    c.className = 'ripple-effect';
    c.style.width = c.style.height = `${d}px`;
    c.style.left = `${e.clientX - r.left - d / 2}px`;
    c.style.top = `${e.clientY - r.top - d / 2}px`;
    el.appendChild(c);
    setTimeout(() => c.remove(), 600);
  });
});
