/* ═══════════════════════════════════════════════════════
   ORBIT GESTÃO — Internationalization Engine
   Supports PT-BR (default) and EN
   ═══════════════════════════════════════════════════════ */

var OrbitI18n = (function() {
  'use strict';

  var DEFAULT_LANG = 'pt';
  var SUPPORTED = ['pt', 'en'];
  var currentLang = DEFAULT_LANG;

  // Merge common + page translations
  function getTranslations() {
    var common = window.ORBIT_I18N_COMMON || {};
    var page = window.ORBIT_I18N_PAGE || {};
    var merged = {};
    var lang = currentLang;

    // Merge common
    if (common[lang]) {
      Object.keys(common[lang]).forEach(function(k) { merged[k] = common[lang][k]; });
    }
    // Merge page (overrides common)
    if (page[lang]) {
      Object.keys(page[lang]).forEach(function(k) { merged[k] = page[lang][k]; });
    }
    return merged;
  }

  // Detect language from URL, localStorage, or browser
  function detectLang() {
    // 1. URL param ?lang=en
    var params = new URLSearchParams(window.location.search);
    var urlLang = params.get('lang');
    if (urlLang && SUPPORTED.indexOf(urlLang) !== -1) {
      return urlLang;
    }
    // 2. URL path /en/...
    if (window.location.pathname.indexOf('/en/') === 0 || window.location.pathname === '/en') {
      return 'en';
    }
    // 3. localStorage
    var stored = localStorage.getItem('orbit_lang');
    if (stored && SUPPORTED.indexOf(stored) !== -1) {
      return stored;
    }
    // 4. Default
    return DEFAULT_LANG;
  }

  // Apply translations to DOM
  function applyTranslations() {
    var t = getTranslations();

    // data-i18n="key" → textContent
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    // data-i18n-html="key" → innerHTML (for formatted text)
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    // data-i18n-placeholder="key" → placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    // data-i18n-title="key" → title attribute
    document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-title');
      if (t[key] !== undefined) {
        el.setAttribute('title', t[key]);
      }
    });

    // Update <html lang>
    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';

    // Update page title
    if (t['meta.title']) {
      document.title = t['meta.title'];
    }

    // Update meta description
    if (t['meta.description']) {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', t['meta.description']);
      var ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', t['meta.description']);
    }

    // Update OG title
    if (t['meta.title']) {
      var ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', t['meta.title']);
    }

    // Update lang switcher button
    document.querySelectorAll('.lang-switch__label').forEach(function(el) {
      el.textContent = currentLang === 'pt' ? 'EN' : 'PT';
    });
    document.querySelectorAll('.lang-switch__flag').forEach(function(el) {
      el.textContent = currentLang === 'pt' ? '🇺🇸' : '🇧🇷';
    });
  }

  // Set language
  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    currentLang = lang;
    localStorage.setItem('orbit_lang', lang);
    applyTranslations();
  }

  // Toggle between PT and EN
  function toggle() {
    setLang(currentLang === 'pt' ? 'en' : 'pt');
  }

  // Get current language
  function getLang() {
    return currentLang;
  }

  // Initialize
  function init() {
    currentLang = detectLang();
    localStorage.setItem('orbit_lang', currentLang);

    // Only apply if not default (PT is already in the HTML)
    if (currentLang !== DEFAULT_LANG) {
      applyTranslations();
    } else {
      // Still update switcher UI
      document.querySelectorAll('.lang-switch__label').forEach(function(el) {
        el.textContent = 'EN';
      });
      document.querySelectorAll('.lang-switch__flag').forEach(function(el) {
        el.textContent = '🇺🇸';
      });
    }

    // Add hreflang tags
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      var baseUrl = canonical.getAttribute('href');
      var ptLink = document.createElement('link');
      ptLink.rel = 'alternate';
      ptLink.hreflang = 'pt-BR';
      ptLink.href = baseUrl;
      document.head.appendChild(ptLink);

      var enLink = document.createElement('link');
      enLink.rel = 'alternate';
      enLink.hreflang = 'en';
      enLink.href = baseUrl + (baseUrl.indexOf('?') === -1 ? '?lang=en' : '&lang=en');
      document.head.appendChild(enLink);
    }
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    setLang: setLang,
    toggle: toggle,
    getLang: getLang,
    t: function(key) {
      var t = getTranslations();
      return t[key] || key;
    }
  };
})();
