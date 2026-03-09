/* ============================================
   SITE ORBIT - Main JavaScript
   Enhanced with more animations and effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Header Scroll Effect ----------
  const header = document.querySelector('.header');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header background
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button
    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Mobile Menu ----------
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Scroll Animations (Scroll-based reveal) ----------
  function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in:not(.visible), .slide-left:not(.visible), .slide-right:not(.visible), .scale-in:not(.visible)');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Reveal when element top is within viewport + 100px buffer
      if (rect.top < windowHeight + 100 && rect.bottom > -100) {
        el.classList.add('visible');
      }
    });
  }

  // Run on load
  revealOnScroll();

  // Run on scroll with throttle
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        revealOnScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // ---------- Testimonial Slider ----------
  const testimonials = document.querySelectorAll('.testimonial-card');
  const sliderDotsContainers = document.querySelectorAll('.slider-dots');
  let currentSlide = 0;
  let testimonialInterval;

  // Get first set of dots (testimonials)
  const testimonialDots = sliderDotsContainers[0] ? sliderDotsContainers[0].querySelectorAll('.slider-dot') : [];

  function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    testimonialDots.forEach(d => d.classList.remove('active'));

    if (testimonials[index]) {
      testimonials[index].classList.add('active');
    }
    if (testimonialDots[index]) {
      testimonialDots[index].classList.add('active');
    }
    currentSlide = index;
  }

  function nextTestimonial() {
    const next = (currentSlide + 1) % testimonials.length;
    showTestimonial(next);
  }

  if (testimonials.length > 0) {
    testimonialDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showTestimonial(i);
        resetAutoplay();
      });
    });

    testimonialInterval = setInterval(nextTestimonial, 5000);
  }

  function resetAutoplay() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }

  // ---------- Knowledge Cards Slider ----------
  const knowledgeCards = document.querySelectorAll('.knowledge-card');
  const knowledgeDots = sliderDotsContainers[1] ? sliderDotsContainers[1].querySelectorAll('.slider-dot') : [];
  let currentKnowledge = 0;
  let knowledgeInterval;

  function showKnowledgeCard(index) {
    knowledgeCards.forEach(c => c.classList.remove('active'));
    knowledgeDots.forEach(d => d.classList.remove('active'));

    if (knowledgeCards[index]) {
      knowledgeCards[index].classList.add('active');
    }
    if (knowledgeDots[index]) {
      knowledgeDots[index].classList.add('active');
    }
    currentKnowledge = index;
  }

  // Only activate slider on mobile (handled by CSS showing all on desktop)
  if (knowledgeCards.length > 0 && knowledgeDots.length > 0) {
    knowledgeDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showKnowledgeCard(i);
        clearInterval(knowledgeInterval);
        knowledgeInterval = setInterval(() => {
          showKnowledgeCard((currentKnowledge + 1) % knowledgeCards.length);
        }, 6000);
      });
    });
  }

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = header.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Counter Animation for Stats ----------
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));

  function animateCounter(el) {
    const text = el.textContent;
    const match = text.match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[1]);
    const prefix = text.split(match[1])[0];
    const suffix = text.split(match[1])[1];
    let current = 0;
    const increment = Math.ceil(target / 60);
    const duration = 1500;
    const stepTime = duration / (target / increment);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + current + suffix;
    }, stepTime);
  }

  // ---------- Parallax Effect on Hero ----------
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroRight = hero.querySelector('.hero-right');
      if (heroRight && scrollY < window.innerHeight) {
        heroRight.style.transform = `translateY(${scrollY * 0.08}px)`;
      }
    });
  }

  // ---------- Navbar Dropdown (hover for desktop) ----------
  const dropdownParents = document.querySelectorAll('.nav-menu > li');
  dropdownParents.forEach(item => {
    const dropdown = item.querySelector('.dropdown');
    if (!dropdown) return;

    item.addEventListener('mouseenter', () => {
      dropdown.style.opacity = '1';
      dropdown.style.visibility = 'visible';
      dropdown.style.transform = 'translateY(0)';
    });

    item.addEventListener('mouseleave', () => {
      dropdown.style.opacity = '0';
      dropdown.style.visibility = 'hidden';
      dropdown.style.transform = 'translateY(10px)';
    });
  });

  // ---------- Pill Buttons Hover Effect ----------
  const pillButtons = document.querySelectorAll('.pill-button');
  pillButtons.forEach(pill => {
    pill.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.05)';
    });
    pill.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ---------- Typing Effect for AI Chat Placeholder ----------
  const chatInput = document.querySelector('.chat-input');
  if (chatInput) {
    const phrases = [
      'Quais processos estão atrasados esta semana?',
      'Qual é o status dos meus KPIs?',
      'Como posso melhorar a produtividade?',
      'Mostre o desempenho do meu time',
      'Quais tarefas são prioritárias hoje?'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeTimeout;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];

      if (document.activeElement === chatInput) {
        // Don't animate while user is typing
        typeTimeout = setTimeout(typeEffect, 1000);
        return;
      }

      if (isDeleting) {
        chatInput.placeholder = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        chatInput.placeholder = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 30 : 60;

      if (!isDeleting && charIndex === currentPhrase.length) {
        delay = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 500;
      }

      typeTimeout = setTimeout(typeEffect, delay);
    }

    setTimeout(typeEffect, 1500);
  }

  // ---------- Feature Section Parallax on Scroll ----------
  const featureImages = document.querySelectorAll('.feature-section .feature-image img');
  window.addEventListener('scroll', () => {
    featureImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const translateY = (progress - 0.5) * 20;
        img.style.transform = `translateY(${translateY}px)`;
      }
    });
  });

  // ---------- Smooth Reveal for Wave Dividers ----------
  const waveDividers = document.querySelectorAll('.wave-divider svg');
  const waveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        waveObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  waveDividers.forEach(wave => {
    wave.style.opacity = '0';
    wave.style.transform = 'translateY(20px)';
    wave.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    waveObserver.observe(wave);
  });

  // ---------- Lead Form Handling ----------
  const leadForm = document.getElementById('form-lead');
  const pageStart = Date.now();

  // Session ID
  var sessionId = (function() {
    try {
      var key = 'apex_session_id';
      var s = sessionStorage.getItem(key);
      if (!s) {
        s = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem(key, s);
      }
      return s;
    } catch(e) { return Date.now() + '_' + Math.random().toString(36).substr(2, 9); }
  })();

  // Phone mask (BR format)
  const phoneInput = document.getElementById('telefone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 11) val = val.slice(0, 11);
      if (val.length > 6) {
        val = '(' + val.slice(0,2) + ') ' + val.slice(2,7) + '-' + val.slice(7);
      } else if (val.length > 2) {
        val = '(' + val.slice(0,2) + ') ' + val.slice(2);
      } else if (val.length > 0) {
        val = '(' + val;
      }
      e.target.value = val;
    });
  }

  // Form submit
  if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const btnText = leadForm.querySelector('.btn-text');
      const btnLoading = leadForm.querySelector('.btn-loading');
      const formError = document.getElementById('form-error');
      const formSuccess = document.getElementById('form-success');
      const submitBtn = leadForm.querySelector('.btn-submit');

      // Validate
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const telefone = document.getElementById('telefone').value.trim();

      if (!nome || !email || !telefone) {
        formError.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        formError.style.display = 'block';
        return;
      }

      formError.style.display = 'none';

      // Show loading
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline-flex';
      submitBtn.disabled = true;

      // Split name
      const parts = nome.split(' ');
      const firstName = parts[0];
      const lastName = parts.slice(1).join(' ');

      // DataLayer push (GTM pattern)
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'form_submit_success',
        email: email,
        phoneNumber: telefone.replace(/\D/g, ''),
        nome: firstName,
        sobrenome: lastName,
        apex_session_id: sessionId,
        time_on_page_at_submit: Math.round((Date.now() - pageStart) / 1000)
      });

      // Simulate success (replace with actual webhook)
      setTimeout(function() {
        leadForm.style.display = 'none';
        document.querySelector('.form-card-header').style.display = 'none';
        formSuccess.style.display = 'block';
      }, 1200);
    });
  }

  // ---------- Integration Icons Hover Pause ----------
  const orbitIcons = document.querySelectorAll('.orbit-icon');
  const orbitContainer = document.querySelector('.integration-orbit');
  if (orbitContainer) {
    orbitContainer.addEventListener('mouseenter', () => {
      orbitIcons.forEach(icon => {
        icon.style.animationPlayState = 'paused';
      });
    });
    orbitContainer.addEventListener('mouseleave', () => {
      orbitIcons.forEach(icon => {
        icon.style.animationPlayState = 'running';
      });
    });
  }

});
