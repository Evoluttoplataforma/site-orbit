/* ═══════════════════════════════════════════════════════
   ORBIT GESTÃO — v2 Main JavaScript
   Carousel + Tabs + Form + Interactions
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ═══ HEADER SCROLL ═══
  const header = document.querySelector('.header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    if (backToTop) {
      if (y > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ═══ MOBILE MENU ═══
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');

  window.closeMobileMenu = function() {
    if (menuToggle) menuToggle.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.openMobileMenu = function() {
    if (menuToggle) menuToggle.classList.add('active');
    if (mobileMenu) mobileMenu.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // ═══ NAVBAR DROPDOWN (MEGA MENU) ═══
  document.querySelectorAll('.nav-menu > li').forEach(item => {
    const dropdown = item.querySelector('.dropdown');
    if (!dropdown) return;
    item.addEventListener('mouseenter', () => dropdown.classList.add('show'));
    item.addEventListener('mouseleave', () => dropdown.classList.remove('show'));
  });

  // ═══ CAROUSEL (ZOOM-STYLE) ═══
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.carousel-card');
  const prevBtn = document.querySelector('.carousel-arrow--prev');
  const nextBtn = document.querySelector('.carousel-arrow--next');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentIndex = 0;
  let autoplayInterval;
  let isTransitioning = false;

  function getVisibleCards() {
    const vw = window.innerWidth;
    if (vw <= 480) return 1;
    if (vw <= 768) return 1.2;
    if (vw <= 1024) return 2;
    return 3;
  }

  function getCardWidth() {
    if (!cards.length) return 0;
    const card = cards[0];
    const style = window.getComputedStyle(card);
    const gap = 20; // match CSS gap
    return card.offsetWidth + gap;
  }

  function updateCarousel(animated) {
    if (!track || !cards.length) return;

    const cardW = getCardWidth();
    const maxIndex = Math.max(0, cards.length - Math.floor(getVisibleCards()));
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    if (animated === false) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    }

    track.style.transform = `translateX(-${currentIndex * cardW}px)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    const maxIndex = Math.max(0, cards.length - Math.floor(getVisibleCards()));
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
  }

  function prevSlide() {
    const maxIndex = Math.max(0, cards.length - Math.floor(getVisibleCards()));
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateCarousel();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.dataset.index) || 0;
      updateCarousel();
      startAutoplay();
    });
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const viewport = document.querySelector('.carousel-viewport');

  if (viewport) {
    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoplay();
    }, { passive: true });
  }

  // Init carousel
  updateCarousel(false);
  startAutoplay();

  // Resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => updateCarousel(false), 150);
  });

  // ═══ PLATFORM TABS ═══
  const tabs = document.querySelectorAll('.platform-tab');
  const panels = document.querySelectorAll('.platform-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        if (p.dataset.panel === target) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    });
  });

  // ═══ SMOOTH SCROLL ═══
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

  // ═══ SCROLL REVEAL ═══
  function revealOnScroll() {
    const elements = document.querySelectorAll('[data-reveal]:not(.revealed)');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('revealed');
      }
    });
  }
  revealOnScroll();
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

  // ═══ COUNTER ANIMATION ═══
  const statNumbers = document.querySelectorAll('.stats-banner__number');
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
    const increment = Math.ceil(target / 50);
    const stepTime = 30;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + current + suffix;
    }, stepTime);
  }

  // ═══ LEAD FORM ═══
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

  // Phone mask (BR)
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

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const telefone = document.getElementById('telefone').value.trim();

      if (!nome || !email || !telefone) {
        formError.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        formError.style.display = 'block';
        return;
      }

      formError.style.display = 'none';
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline-flex';
      submitBtn.disabled = true;

      const parts = nome.split(' ');
      const firstName = parts[0];
      const lastName = parts.slice(1).join(' ');

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

      // Redirect to thank you page after dataLayer push
      setTimeout(function() {
        window.location.href = 'pages/obrigado.html';
      }, 1200);
    });
  }

  // ═══ PREMIUM ANIMATIONS (fade-in-up + stagger-children) ═══
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-up, .stagger-children').forEach(el => {
    animObserver.observe(el);
  });

});
