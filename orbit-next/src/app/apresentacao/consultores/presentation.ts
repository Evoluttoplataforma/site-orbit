export const presentationCSS = `
/* ═══ MODO APRESENTAÇÃO ═══ */
body {
  overflow: hidden !important;
  background: #0D1117 !important;
}

.presentation-mode {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* Cada section vira um slide fullscreen */
.presentation-mode > section,
.presentation-mode > div > section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.5s ease, transform 0.5s ease;
  transform: translateX(40px);
  scroll-behavior: smooth;
}

.presentation-mode > section.slide-active,
.presentation-mode > div > section.slide-active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(0);
  z-index: 10;
}

.presentation-mode > section.slide-prev,
.presentation-mode > div > section.slide-prev {
  transform: translateX(-40px);
}

/* Esconde elementos que não são sections (ex: glow dividers, footer, scripts) */
.presentation-mode > hr,
.presentation-mode > .glow-divider,
.presentation-mode > footer,
.presentation-mode > script {
  display: none !important;
}

/* Controles de navegação */
.presentation-controls {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 16px;
  border-radius: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.pres-btn {
  background: rgba(255, 186, 26, 0.1);
  border: 1px solid rgba(255, 186, 26, 0.3);
  color: #ffba1a;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s;
  font-family: inherit;
}

.pres-btn:hover:not(:disabled) {
  background: #ffba1a;
  color: #0D1117;
  transform: scale(1.05);
}

.pres-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pres-counter {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  min-width: 60px;
  text-align: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.pres-counter span {
  color: #ffba1a;
}

/* Barra de progresso */
.presentation-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
  z-index: 9998;
}

.presentation-progress__bar {
  height: 100%;
  background: linear-gradient(90deg, #ffba1a, #ffd666);
  width: 0%;
  transition: width 0.4s ease;
  box-shadow: 0 0 10px rgba(255, 186, 26, 0.5);
}

/* Botão fullscreen */
.pres-fullscreen {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 9999;
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffba1a;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s;
  font-family: inherit;
}

.pres-fullscreen:hover {
  background: #ffba1a;
  color: #0D1117;
}

/* Título do slide no topo */
.pres-slide-title {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 9998;
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 186, 26, 0.3);
  color: #ffba1a;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Dica de teclado */
.pres-hint {
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9997;
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  animation: fadeOutHint 5s forwards;
  pointer-events: none;
}

@keyframes fadeOutHint {
  0%, 70% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; }
}

.pres-hint kbd {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
  margin: 0 2px;
  font-family: ui-monospace, monospace;
}

/* Esconde elementos interativos no modo apresentação */
.presentation-mode .header,
.presentation-mode .footer,
.presentation-mode .mobile-menu,
.presentation-mode .mobile-menu-toggle {
  display: none !important;
}

/* Responsivo */
@media (max-width: 768px) {
  .pres-hint { display: none; }
  .pres-slide-title { font-size: 11px; padding: 6px 12px; }
  .pres-btn { width: 36px; height: 36px; font-size: 16px; }
}

/* Print-friendly (para salvar como PDF se quiser) */
@media print {
  body { overflow: visible !important; }
  .presentation-mode > section {
    position: static !important;
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
    page-break-after: always;
    height: auto !important;
  }
  .presentation-controls,
  .presentation-progress,
  .pres-fullscreen,
  .pres-slide-title,
  .pres-hint { display: none !important; }
}
`;

export const presentationJS = `
(function() {
  if (window.__presInit) return;
  window.__presInit = true;

  // Títulos amigáveis pra cada slide (nomes curtos)
  var TITLES = [
    'Abertura',
    'Dores',
    'Novo Modelo',
    'Matemática',
    'Agentes de IA',
    'O que você ganha',
    'Roadmap',
    'FAQ',
    'Vamos começar'
  ];

  // Encontra todas as sections do slide deck
  var allSections = document.querySelectorAll('.presentation-mode > section, .presentation-mode > div > section');
  var slides = Array.from(allSections).filter(function(s) {
    // Filtra sections que estão dentro de modal/popup
    return !s.closest('[id*="Wrapper"]') || s.tagName === 'SECTION';
  });

  // Remove sections aninhadas (mantém só os top-level)
  slides = slides.filter(function(s) {
    var parent = s.parentElement;
    while (parent && !parent.classList.contains('presentation-mode')) {
      if (parent.tagName === 'SECTION') return false;
      parent = parent.parentElement;
    }
    return true;
  });

  if (slides.length === 0) return;

  var currentSlide = 0;

  // Criar UI
  var progressBar = document.createElement('div');
  progressBar.className = 'presentation-progress';
  progressBar.innerHTML = '<div class="presentation-progress__bar"></div>';
  document.body.appendChild(progressBar);

  var slideTitle = document.createElement('div');
  slideTitle.className = 'pres-slide-title';
  document.body.appendChild(slideTitle);

  var fullscreenBtn = document.createElement('button');
  fullscreenBtn.className = 'pres-fullscreen';
  fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullscreenBtn.title = 'Tela cheia (F)';
  document.body.appendChild(fullscreenBtn);

  var controls = document.createElement('div');
  controls.className = 'presentation-controls';
  controls.innerHTML =
    '<button class="pres-btn" id="presPrev" title="Anterior (←)"><i class="fas fa-chevron-left"></i></button>' +
    '<div class="pres-counter"><span id="presCurrent">1</span> / <span id="presTotal">' + slides.length + '</span></div>' +
    '<button class="pres-btn" id="presNext" title="Próximo (→)"><i class="fas fa-chevron-right"></i></button>';
  document.body.appendChild(controls);

  var hint = document.createElement('div');
  hint.className = 'pres-hint';
  hint.innerHTML = 'Use <kbd>←</kbd> <kbd>→</kbd> para navegar · <kbd>F</kbd> tela cheia · <kbd>ESC</kbd> sair';
  document.body.appendChild(hint);

  var prevBtn = document.getElementById('presPrev');
  var nextBtn = document.getElementById('presNext');
  var currentEl = document.getElementById('presCurrent');
  var progressEl = progressBar.querySelector('.presentation-progress__bar');

  function updateUI() {
    slides.forEach(function(s, i) {
      s.classList.remove('slide-active', 'slide-prev');
      if (i === currentSlide) s.classList.add('slide-active');
      else if (i < currentSlide) s.classList.add('slide-prev');
      // Reset scroll do slide ao navegar
      if (i === currentSlide) s.scrollTop = 0;
    });
    currentEl.textContent = currentSlide + 1;
    slideTitle.textContent = (currentSlide + 1) + '. ' + (TITLES[currentSlide] || 'Slide');
    var progress = ((currentSlide + 1) / slides.length) * 100;
    progressEl.style.width = progress + '%';
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === slides.length - 1;
  }

  function goTo(index) {
    if (index < 0 || index >= slides.length) return;
    currentSlide = index;
    updateUI();
  }

  function next() { goTo(currentSlide + 1); }
  function prev() { goTo(currentSlide - 1); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Fullscreen
  fullscreenBtn.addEventListener('click', function() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
      document.exitFullscreen();
      fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
  });

  document.addEventListener('fullscreenchange', function() {
    fullscreenBtn.innerHTML = document.fullscreenElement
      ? '<i class="fas fa-compress"></i>'
      : '<i class="fas fa-expand"></i>';
  });

  // Teclado
  document.addEventListener('keydown', function(e) {
    // Ignora se tá digitando em input
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prev();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(slides.length - 1);
    } else if (e.key === 'f' || e.key === 'F') {
      fullscreenBtn.click();
    } else if (/^[1-9]$/.test(e.key)) {
      var n = parseInt(e.key) - 1;
      if (n < slides.length) goTo(n);
    }
  });

  // Swipe em mobile
  var touchStartX = 0;
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  document.addEventListener('touchend', function(e) {
    var diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev(); else next();
    }
  }, { passive: true });

  // Init
  updateUI();
})();
`;
