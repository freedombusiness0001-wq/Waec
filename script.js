document.body.classList.add('page-enter');

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const isOpen = navMenu.classList.contains('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

const sections = document.querySelectorAll('main section[id]');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 130;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const nav = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!nav) return;
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((l) => l.classList.remove('active'));
      nav.classList.add('active');
    }
  });
});

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => revealObserver.observe(el));

const counters = document.querySelectorAll('.counter');
const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);
  let current = 0;
  const increment = Math.max(1, Math.floor(target / 90));
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      counter.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      counter.textContent = current.toLocaleString();
    }
  }, 18);
};
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach((counter) => counterObserver.observe(counter));

const quizData = [
  {
    q: 'What is the value of x in 2x + 6 = 18?',
    options: ['4', '6', '8', '12'],
    answer: 1,
  },
  {
    q: 'Choose the correct synonym for "rapid".',
    options: ['Slow', 'Quick', 'Weak', 'Tiny'],
    answer: 1,
  },
  {
    q: 'Which organelle controls cell activities?',
    options: ['Nucleus', 'Ribosome', 'Cytoplasm', 'Membrane'],
    answer: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next-btn');

function loadQuestion() {
  answered = false;
  const current = quizData[currentQuestion];
  questionEl.textContent = current.q;
  optionsEl.innerHTML = '';
  current.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = option;
    btn.addEventListener('click', () => checkAnswer(index, btn));
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected, button) {
  if (answered) return;
  answered = true;
  const correct = quizData[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll('.option');
  buttons.forEach((btn, index) => {
    if (index === correct) btn.classList.add('correct');
  });
  if (selected === correct) {
    score += 1;
    button.classList.add('correct');
  } else {
    button.classList.add('wrong');
  }
  scoreEl.textContent = `Score: ${score}`;
}

nextBtn?.addEventListener('click', () => {
  currentQuestion += 1;
  if (currentQuestion >= quizData.length) {
    questionEl.textContent = `Quiz complete! Final Score: ${score}/${quizData.length}`;
    optionsEl.innerHTML = '';
    nextBtn.disabled = true;
    return;
  }
  loadQuestion();
});

loadQuestion();

document.querySelectorAll('.faq-question').forEach((faqBtn) => {
  faqBtn.addEventListener('click', () => {
    const item = faqBtn.parentElement;
    item.classList.toggle('open');
  });
});

document.querySelectorAll('.ripple').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const circle = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - rect.left - size / 2}px`;
    circle.style.top = `${e.clientY - rect.top - size / 2}px`;
    circle.classList.add('ripple-effect');
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});
