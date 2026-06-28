// ============================================================
// Nav: scroll state + mobile toggle
// ============================================================
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ============================================================
// Scroll reveal
// ============================================================
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ============================================================
// Terminal typing effect
// Reads lines from data-lines (JSON array of {type, text}) on #terminal-body
// types: prompt | out | ok
// ============================================================
function typeTerminal(el) {
  if (!el) return;
  let lines;
  try { lines = JSON.parse(el.getAttribute('data-lines')); } catch (e) { return; }
  el.innerHTML = '';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';

  let li = 0, ci = 0;
  const speed = 16;

  function nextLine() {
    if (li >= lines.length) { el.appendChild(cursor); return; }
    const lineDiv = document.createElement('div');
    lineDiv.className = 'line';
    const span = document.createElement('span');
    span.className = lines[li].type === 'prompt' ? 'prompt' : (lines[li].type === 'ok' ? 'ok' : 'out');
    lineDiv.appendChild(span);
    el.appendChild(lineDiv);
    ci = 0;
    typeChar(span, lineDiv);
  }

  function typeChar(span, lineDiv) {
    const text = lines[li].text;
    if (ci < text.length) {
      span.textContent += text.charAt(ci);
      ci++;
      setTimeout(() => typeChar(span, lineDiv), speed);
    } else {
      li++;
      const pause = lines[li - 1].type === 'prompt' ? 90 : 260;
      setTimeout(nextLine, pause);
    }
  }
  nextLine();
}

document.querySelectorAll('[data-terminal]').forEach(el => {
  const io2 = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { typeTerminal(entry.target); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.3 });
  io2.observe(el);
});

// ============================================================
// FAQ accordion
// ============================================================
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(other => {
      if (other !== item) { other.classList.remove('open'); other.querySelector('.faq-a').style.maxHeight = null; }
    });
    item.classList.toggle('open', !isOpen);
    a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
  });
});

// ============================================================
// Contact form (front-end only demo — wire to Formspree/EmailJS/etc. for real submissions)
// ============================================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.style.display = 'none';
    document.getElementById('form-success').classList.add('show');
  });
}

