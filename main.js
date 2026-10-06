document.addEventListener('DOMContentLoaded', () => {
  // --- 1. THEME TOGGLE LOGIC ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // Retrieve theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fa-solid fa-moon';
      } else {
        themeIcon.className = 'fa-solid fa-sun';
      }
    }
  }

  // Set initial theme
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // --- 2. TYPEWRITER EFFECT LOGIC ---
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const words = ["Software Engineer", "Backend Developer", "Automation Specialist"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 60 : 120;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  // --- 3. SLOW & SMOOTH ALTERNATING FADE-IN FOR PROJECT CARDS ---
  const projectCards = document.querySelectorAll('.project-card');

  if (projectCards.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardsArray = Array.from(projectCards);
          const index = cardsArray.indexOf(entry.target);

          setTimeout(() => {
            entry.target.classList.add('show');
          }, index * 200);

          observerInstance.unobserve(entry.target);
        }
      });
    }, observerOptions);

    projectCards.forEach(card => observer.observe(card));
  }

  // --- 4. ABOUT SECTION ANIMATIONS (LEFT & RIGHT SLIDE) ---
  const aboutElements = document.querySelectorAll('.about-animate-left, .about-animate-right');

  if (aboutElements.length > 0) {
    const aboutObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    aboutElements.forEach(el => aboutObserver.observe(el));
  }

  // --- 5. ONE-PAGE NAV: HIGHLIGHT ACTIVE SECTION WHILE SCROLLING ---
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const navSections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function updateActiveNav() {
    if (navSections.length === 0) return;

    const scrollPos = window.scrollY + 140;
    let current = navSections[0];

    navSections.forEach(section => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      if (top <= scrollPos) current = section;
    });

    // Kapag nasa pinakababa na ng page, laging huling section ang active
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = navSections[navSections.length - 1];
    }

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current.id);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav);
  updateActiveNav();

  // --- 6. SCROLL DOWN INDICATOR: MAWAWALA KAPAG NAG-SCROLL NA ---
  const scrollDown = document.querySelector('.scroll-down');
  if (scrollDown) {
    const toggleScrollHint = () => {
      scrollDown.classList.toggle('hide', window.scrollY > 80);
    };
    window.addEventListener('scroll', toggleScrollHint, { passive: true });
    toggleScrollHint();
  }
});