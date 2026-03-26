/* ═══════════════════════════════════════════════════════
   ORBIT GESTÃO - v2 Main JavaScript
   Carousel + Tabs + Form + Interactions
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // Skip on CMS/admin pages — those have their own scripts
  if (document.querySelector('.sidebar-nav')) return;

  // ═══ HERO ROTATING WORDS ═══
  const heroRotate = document.getElementById('heroRotate');
  if (heroRotate) {
    const words = heroRotate.querySelectorAll('.hero-rotate__word');
    let currentIndex = 0;
    setInterval(() => {
      const current = words[currentIndex];
      current.classList.remove('hero-rotate__word--active');
      current.classList.add('hero-rotate__word--exit');
      setTimeout(() => { current.classList.remove('hero-rotate__word--exit'); }, 500);
      currentIndex = (currentIndex + 1) % words.length;
      words[currentIndex].classList.add('hero-rotate__word--active');
    }, 2500);
  }

  // ═══ COST MOCKUP PARALLAX ═══
  const costMockup = document.querySelector('.cost-mockup-visual');
  if (costMockup) {
    const mockupObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          costMockup.classList.add('parallax-active');
        }
      });
    }, { threshold: 0.3 });
    mockupObs.observe(costMockup);
  }

  // ═══ HEADER SCROLL ═══
  const header = document.querySelector('.header');
  const backToTop = document.getElementById('backToTop');

  if (header || backToTop) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (header) {
        if (y > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
      if (backToTop) {
        if (y > 400) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ═══ MOBILE MENU ═══
  var mobileMenuRetries = 0;
  function initMobileMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.mobile-menu');
    var overlay = document.querySelector('.mobile-menu-overlay');

    if (!toggle || !menu) {
      mobileMenuRetries++;
      if (mobileMenuRetries < 20) setTimeout(initMobileMenu, 250);
      return;
    }

    window.closeMobileMenu = function() {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    window.openMobileMenu = function() {
      toggle.classList.add('active');
      menu.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', function() {
      menu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
    });

    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }
  initMobileMenu();

  // ═══ NAVBAR DROPDOWN (MEGA MENU) ═══
  function initDropdowns() {
    var items = document.querySelectorAll('.nav-menu > li');
    if (!items.length) {
      setTimeout(initDropdowns, 300);
      return;
    }
    var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    items.forEach(function(item) {
      var dropdown = item.querySelector('.dropdown');
      if (!dropdown) return;
      if (isTouch) {
        item.addEventListener('click', function(e) {
          var isOpen = dropdown.classList.contains('show');
          // Close all others
          document.querySelectorAll('.dropdown.show').forEach(function(d) { d.classList.remove('show'); });
          if (!isOpen) {
            e.preventDefault();
            dropdown.classList.add('show');
          }
        });
        document.addEventListener('click', function(e) {
          if (!e.target.closest('.nav-menu > li')) {
            document.querySelectorAll('.dropdown.show').forEach(function(d) { d.classList.remove('show'); });
          }
        });
      } else {
        item.addEventListener('mouseenter', function() { dropdown.classList.add('show'); });
        item.addEventListener('mouseleave', function() { dropdown.classList.remove('show'); });
      }
    });
  }
  initDropdowns();

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

  // ═══ PLATFORM DOCK (macOS-style) ═══
  const dock = document.getElementById('platformDock');
  const dockItems = document.querySelectorAll('.dock-item');
  const panels = document.querySelectorAll('.platform-panel');

  // Tab switching
  var tabOrder = ['estrategista', 'processos', 'pessoas', 'treinamento', 'indicadores', 'pesquisa', 'riscos', 'oportunidades', 'problemas', 'documentos', 'vendas', 'reunioes'];
  var currentTabIdx = 0;
  var autoplayTimer = null;

  function switchTab(target) {
    dockItems.forEach(i => i.classList.remove('active'));
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
    dockItems.forEach(i => { if (i.dataset.tab === target) i.classList.add('active'); });
    currentTabIdx = tabOrder.indexOf(target);
  }

  dockItems.forEach(item => {
    if (!item.dataset.tab) return;
    item.addEventListener('click', () => {
      switchTab(item.dataset.tab);
      // Reset autoplay on manual click
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(autoAdvance, 5000);
    });
  });

  // Autoplay: cycle tabs every 5s
  function autoAdvance() {
    currentTabIdx = (currentTabIdx + 1) % tabOrder.length;
    switchTab(tabOrder[currentTabIdx]);
  }
  autoplayTimer = setInterval(autoAdvance, 5000);

  // Dock magnification effect
  if (dock) {
    const MAGNIFICATION = 76;
    const BASE_SIZE = 48;
    const DISTANCE = 140;

    dock.addEventListener('mousemove', (e) => {
      dockItems.forEach(item => {
        const icon = item.querySelector('.dock-icon');
        if (!icon) return;
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const dist = Math.abs(e.clientX - itemCenterX);
        const scale = Math.max(BASE_SIZE, MAGNIFICATION - (MAGNIFICATION - BASE_SIZE) * (dist / DISTANCE));
        const size = Math.min(MAGNIFICATION, scale);
        icon.style.width = size + 'px';
        icon.style.height = size + 'px';
        icon.style.fontSize = (size / BASE_SIZE) * 1.1 + 'rem';
      });
    });

    dock.addEventListener('mouseleave', () => {
      dockItems.forEach(item => {
        const icon = item.querySelector('.dock-icon');
        if (!icon) return;
        icon.style.width = '';
        icon.style.height = '';
        icon.style.fontSize = '';
      });
    });
  }

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
  const leadForm = document.getElementById('lead-form');
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

      // Get all form values via name attributes (GTM-compatible)
      var f = leadForm;
      var getValue = function(name) { var el = f.querySelector('[name="' + name + '"]'); return el ? el.value.trim() : ''; };

      const nome = getValue('name');
      const email = getValue('email');
      const phone = getValue('phone');
      const role = getValue('role');
      const segment = getValue('segment');
      const company = getValue('company');
      const revenue = getValue('revenue');
      const employees = getValue('employees');
      const priority = getValue('priority');

      if (!nome || !email || !phone || !role || !segment || !company || !revenue || !employees || !priority) {
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

      // Tracking data from hidden fields
      var tracking = window.__wlTracking || {};

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'form_submit_lead',
        lead_name: nome,
        lead_email: email,
        lead_whatsapp: phone,
        role: role,
        segment: segment,
        company: company,
        revenue: revenue,
        employees: employees,
        priority: priority,
        utm_source: tracking.utm_source || null,
        utm_medium: tracking.utm_medium || null,
        utm_campaign: tracking.utm_campaign || null,
        utm_content: tracking.utm_content || null,
        utm_term: tracking.utm_term || null,
        gclid: tracking.gclid || null,
        gbraid: tracking.gbraid || null,
        wbraid: tracking.wbraid || null,
        gad_campaignid: tracking.gad_campaignid || null,
        gad_source: tracking.gad_source || null,
        fbclid: tracking.fbclid || null,
        fbc: tracking.fbc || null,
        fbp: tracking.fbp || null,
        ttclid: tracking.ttclid || null,
        msclkid: tracking.msclkid || null,
        li_fat_id: tracking.li_fat_id || null,
        twclid: tracking.twclid || null,
        sck: tracking.sck || null,
        landing_page: tracking.landing_page || null,
        referrer: tracking.referrer || null,
        user_agent: tracking.user_agent || null,
        first_visit: tracking.first_visit || null,
        session_id: tracking.session_id || null,
        session_attributes_encoded: tracking.session_attributes_encoded || null,
        origin_page: tracking.originPage || null,
        ref: tracking.ref || null
      });

      // Redirect to thank you page after dataLayer push
      setTimeout(function() {
        window.location.href = '/obrigado';
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
