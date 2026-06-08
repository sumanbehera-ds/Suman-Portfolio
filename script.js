const typedText = document.getElementById('typedText');
const phrases = ['Data Scientist', 'Machine Learning', 'MLOps', 'NLP + Transformers', 'Recommender Systems'];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  typedText.textContent = deleting ? phrase.slice(0, charIndex--) : phrase.slice(0, charIndex++);

  let delay = deleting ? 38 : 72;
  if (!deleting && charIndex > phrase.length) {
    delay = 1050;
    deleting = true;
  }
  if (deleting && charIndex < 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    charIndex = 0;
    delay = 250;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

const nav = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 24);
  backToTop.classList.toggle('show', window.scrollY > 600);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const categories = card.dataset.category || '';
      card.classList.toggle('hidden', filter !== 'all' && !categories.includes(filter));
    });
  });
});

const caseStudies = {
  recommender: {
    title: 'Hybrid E-Commerce Recommendation Engine',
    subtitle: 'A deployed recommendation system using collaborative, neural, and sequential signals.',
    sections: [
      ['Problem', 'E-commerce platforms need relevant product recommendations from noisy implicit feedback such as views, add-to-cart events, and transactions.'],
      ['Dataset', 'RetailRocket e-commerce dataset using events.csv for user interaction modeling, with 2.75M+ user interactions processed.'],
      ['Workflow', 'Built popularity baseline, Item-Based Collaborative Filtering, Neural Collaborative Filtering, GRU4Rec, and a hybrid fallback architecture.'],
      ['Model Architecture', 'Item-CF captured similarity signals, NCF learned user-item interaction patterns, and GRU4Rec modeled sequential behavior. The deployed version uses GRU4Rec with popularity fallback for lightweight inference.'],
      ['Metrics', 'Benchmarked recommendation quality using HR@10 and MSE across multiple approaches.'],
      ['Deployment', 'Deployed FastAPI API and Streamlit UI on Render with Docker.'],
      ['Challenge Solved', 'Replaced a 774 MB item-similarity matrix with a GRU4Rec + popularity fallback architecture, reducing Docker image size from 11.5 GB to 434 MB.']
    ],
    links: [
      ['GitHub', 'https://github.com/sumanbehera-ds/hybrid-ecommerce-recommender-system'],
      ['Live UI', 'https://ecommerce-recommender-ui.onrender.com'],
      ['API', 'https://ecommerce-recommender-api-slg9.onrender.com']
    ]
  },
  fakeNews: {
    title: 'Transformer-Based Fake News Classifier',
    subtitle: 'A RoBERTa-based text classification system with MLflow tracking and Hugging Face deployment.',
    sections: [
      ['Problem', 'Classify political statements from the LIAR dataset into fake/real style labels while improving over traditional TF-IDF baselines.'],
      ['Dataset', 'LIAR dataset with train, validation, and test splits. Main modeling field: text statement.'],
      ['Workflow', 'Built baselines with TF-IDF Logistic Regression and Naive Bayes, then trained DistilBERT, RoBERTa, and Weighted RoBERTa.'],
      ['Model Architecture', 'Final model uses Weighted RoBERTa with class-weighted loss to improve minority-class performance.'],
      ['Metrics', 'Improved F1 from 0.3423 to 0.5664 over the TF-IDF Logistic Regression baseline. Tracked accuracy, precision, recall, F1, and ROC-AUC.'],
      ['Deployment', 'Deployed as a FastAPI prediction API on Hugging Face Spaces with Docker and hosted model weights on Hugging Face Model Hub.'],
      ['Challenge Solved', 'Render free-tier memory limits failed while loading RoBERTa, so deployment was moved to Hugging Face Spaces.']
    ],
    links: [
      ['GitHub', 'https://github.com/sumanbehera-ds/transformer-fake-news-detection'],
      ['Hugging Face Space', 'https://huggingface.co/spaces/sumanbehera-ds/roberta-fake-news-api'],
      ['Model Hub', 'https://huggingface.co/sumanbehera-ds/roberta-fake-news-detector']
    ]
  },
  churn: {
    title: 'Customer Churn Prediction MLOps Pipeline',
    subtitle: 'A reproducible machine learning pipeline from ingestion to deployment.',
    sections: [
      ['Problem', 'Predict telecom customer churn from customer attributes and support reliable model serving through a reproducible MLOps workflow.'],
      ['Dataset', 'Telco churn data with imbalanced churn labels.'],
      ['Workflow', 'Created a 7-stage pipeline covering ingestion, preprocessing, training, experiment tracking, API serving, containerization, and deployment.'],
      ['Model Architecture', 'Preprocessing pipeline plus SMOTEENN and GradientBoostingClassifier. Resampling was applied strictly after the train-test split to prevent leakage.'],
      ['Metrics', 'Recall: 0.813, F1: 0.607, ROC-AUC: 0.837 on held-out evaluation.'],
      ['Deployment', 'FastAPI prediction API deployed on Render using Docker; experiments tracked with MLflow and pipeline managed with DVC.'],
      ['Challenge Solved', 'Combined DVC, MLflow, GitHub Actions, API tests, and Docker deployment into a reproducible MLOps project.']
    ],
    links: [
      ['GitHub', 'https://github.com/sumanbehera-ds/customer-churn-mlops-pipeline'],
      ['Live API', 'https://customer-churn-mlops-pipeline-85tj.onrender.com']
    ]
  }
};

const modal = document.getElementById('caseModal');
const modalContent = document.getElementById('modalContent');
function openCase(caseKey) {
  const data = caseStudies[caseKey];
  if (!data) return;
  modalContent.innerHTML = `
    <h2 id="modalTitle">${data.title}</h2>
    <p>${data.subtitle}</p>
    ${data.sections.map(([heading, text]) => `<h3>${heading}</h3><p>${text}</p>`).join('')}
    <div class="modal-links">${data.links.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`).join('')}</div>
  `;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeCase() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('.case-btn').forEach(btn => btn.addEventListener('click', () => openCase(btn.dataset.case)));
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeCase));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeCase(); });

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  createParticles();
}
function createParticles() {
  const count = Math.min(75, Math.floor(window.innerWidth / 18));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - .5) * .34,
    vy: (Math.random() - .5) * .34,
    r: Math.random() * 1.7 + .7
  }));
}
function drawParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = 'rgba(148, 229, 255, .72)';
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.strokeStyle = 'rgba(6, 182, 212, .10)';
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 115) {
        ctx.globalAlpha = 1 - dist / 115;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawParticles();
