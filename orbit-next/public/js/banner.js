/* ═══ ORBIT — Site-wide Banner System ═══ */
(function() {
  var SUPABASE_URL = 'https://yfpdrckyuxltvznqfqgh.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcGRyY2t5dXhsdHZ6bnFmcWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwMDYsImV4cCI6MjA5MDAzMjAwNn0.PVMRz04lvMLepjv0ZCsr5mJ8K_Ux1fQlQgX1vOd4O2g';

  function fetchBanners() {
    var url = SUPABASE_URL + '/rest/v1/site_banners?active=eq.true&order=priority.desc&limit=5&select=id,title,description,cta_text,cta_url,image_data,display_mode,position,dismissible,bg_color,text_color';
    fetch(url, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    })
    .then(function(r) { return r.json(); })
    .then(function(banners) {
      if (Array.isArray(banners)) banners.forEach(renderBanner);
    })
    .catch(function(e) { console.warn('Banner fetch error:', e); });
  }

  function isDismissed(id) {
    try { return sessionStorage.getItem('orbit_bn_' + id) === '1'; }
    catch(e) { return false; }
  }

  function dismissBanner(id) {
    try { sessionStorage.setItem('orbit_bn_' + id, '1'); } catch(e) {}
    var el = document.getElementById('orbit-banner-' + id);
    if (!el) return;
    // Remove overlay if popup
    var overlay = document.getElementById('orbit-banner-overlay-' + id);
    el.style.transition = 'opacity 0.3s, transform 0.3s';
    el.style.opacity = '0';
    el.style.transform = 'scale(0.95)';
    if (overlay) overlay.style.transition = 'opacity 0.3s';
    if (overlay) overlay.style.opacity = '0';
    setTimeout(function() {
      el.remove();
      if (overlay) overlay.remove();
      adjustHeaderOffset();
    }, 300);
  }

  function esc(s) { var d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }

  function renderBanner(banner) {
    if (isDismissed(banner.id)) return;
    if (document.querySelector('.orbit-banner--' + banner.position)) return;

    var isPopup = banner.position === 'popup-center' || banner.position === 'popup-side';

    var div = document.createElement('div');
    div.id = 'orbit-banner-' + banner.id;
    div.className = 'orbit-banner orbit-banner--' + banner.display_mode + ' orbit-banner--' + banner.position;
    div.style.backgroundColor = banner.bg_color || '#ffba1a';
    div.style.color = banner.text_color || '#0D1117';

    var inner = '';
    if (banner.display_mode === 'image' && banner.image_data) {
      inner = '<a href="' + esc(banner.cta_url || '#') + '" class="orbit-banner__image-link">' +
              '<img src="' + esc(banner.image_data) + '" alt="' + esc(banner.title) + '">' +
              '</a>';
    } else {
      inner = '<div class="orbit-banner__content">' +
              (banner.title ? '<strong class="orbit-banner__title">' + esc(banner.title) + '</strong>' : '') +
              (banner.description ? '<span class="orbit-banner__desc">' + esc(banner.description) + '</span>' : '') +
              (banner.cta_text && banner.cta_url ? '<a href="' + esc(banner.cta_url) + '" class="orbit-banner__cta">' + esc(banner.cta_text) + '</a>' : '') +
              '</div>';
    }
    if (banner.dismissible) {
      inner += '<button class="orbit-banner__close" onclick="window.__dismissBanner(\'' + banner.id + '\')" aria-label="Fechar">&times;</button>';
    }
    div.innerHTML = inner;

    // Insert based on position
    if (isPopup) {
      // Dark overlay behind popup
      var overlay = document.createElement('div');
      overlay.id = 'orbit-banner-overlay-' + banner.id;
      overlay.className = 'orbit-banner-overlay';
      if (banner.dismissible) {
        overlay.onclick = function() { window.__dismissBanner(banner.id); };
      }
      document.body.appendChild(overlay);
      document.body.appendChild(div);
    } else if (banner.position === 'above-header') {
      document.body.insertBefore(div, document.body.firstChild);
    } else if (banner.position === 'below-header') {
      var header = document.querySelector('.header');
      if (header && header.parentNode) {
        header.parentNode.insertBefore(div, header.nextSibling);
      } else {
        document.body.insertBefore(div, document.body.firstChild);
      }
    } else if (banner.position === 'floating-bottom') {
      document.body.appendChild(div);
    }
    adjustHeaderOffset();
  }

  function adjustHeaderOffset() {
    var aboveBanners = document.querySelectorAll('.orbit-banner--above-header');
    var totalHeight = 0;
    aboveBanners.forEach(function(b) { totalHeight += b.offsetHeight; });
    var header = document.querySelector('.header');
    if (header) {
      header.style.top = totalHeight > 0 ? (totalHeight + 16) + 'px' : '';
    }
  }

  window.__dismissBanner = dismissBanner;
  window.addEventListener('resize', adjustHeaderOffset);

  function init() {
    if (document.querySelector('.header') || document.querySelector('.sidebar-nav')) {
      if (document.querySelector('.sidebar-nav')) return;
      fetchBanners();
    } else {
      var obs = new MutationObserver(function() {
        if (document.querySelector('.sidebar-nav')) { obs.disconnect(); return; }
        if (document.querySelector('.header')) {
          obs.disconnect();
          fetchBanners();
        }
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
