document.addEventListener('DOMContentLoaded', () => {
  // --- 1. THEME TOGGLE LOGIC ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // Retrieve theme preference or default to dark
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
});