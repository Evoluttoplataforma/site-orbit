/* ORBIT — i18n (PT/EN) */
(function(){
  var C = window.ORBIT_I18N_COMMON || {};
  var P = window.ORBIT_I18N_PAGE || {};

  function lang() { return localStorage.getItem('orbit_lang') || 'pt'; }

  function merge(l) {
    var t = {};
    if (C[l]) for (var k in C[l]) t[k] = C[l][k];
    if (P[l]) for (var k2 in P[l]) t[k2] = P[l][k2];
    return t;
  }

  function apply() {
    var l = lang();
    var t = merge(l);

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var v = t[el.getAttribute('data-i18n')];
      if (v !== undefined) el.textContent = v;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      var v = t[el.getAttribute('data-i18n-html')];
      if (v !== undefined) el.innerHTML = v;
    });

    document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
    if (t['meta.title']) document.title = t['meta.title'];

    document.querySelectorAll('.lang-switch__label').forEach(function(el) {
      el.textContent = l === 'pt' ? 'EN' : 'PT';
    });
    document.querySelectorAll('.lang-switch__flag').forEach(function(el) {
      el.textContent = l === 'pt' ? '🇺🇸' : '🇧🇷';
    });
  }

  // Toggle = save preference + reload page (guarantees full re-render)
  window.switchLang = function() {
    var next = lang() === 'pt' ? 'en' : 'pt';
    localStorage.setItem('orbit_lang', next);
    window.location.reload();
  };

  // Init
  function go() { apply(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', go);
  } else {
    go();
  }
})();
