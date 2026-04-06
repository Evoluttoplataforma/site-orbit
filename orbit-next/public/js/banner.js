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
      var imgSrc = banner.image_data;
      inner = '<a href="' + esc(banner.cta_url || '#') + '" class="orbit-banner__image-link">' +
              '<img src="' + imgSrc + '" alt="' + esc(banner.title) + '">' +
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

  // ═══ LIVE POPUP — appears after 3s on all pages ═══
  function showLivePopup() {
    // Skip on live page itself, CMS e chat
    if (window.location.pathname.indexOf('/live') === 0) return;
    if (window.location.pathname.indexOf('/acesso') === 0) return;
    if (window.location.pathname.indexOf('/chat') === 0) return;
    // Check if dismissed on this page load (prevent duplicate)
    if (window.__livePopupShown) return;
    window.__livePopupShown = true;

    setTimeout(function() {

      var overlay = document.createElement('div');
      overlay.id = 'livePopupOverlay';
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);z-index:3000;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity 0.3s;cursor:pointer;';

      var card = document.createElement('div');
      card.style.cssText = 'position:relative;max-width:480px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);transform:scale(0.9);transition:transform 0.3s cubic-bezier(0.16,1,0.3,1);cursor:pointer;';

      var closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = 'position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:50%;background:rgba(0,0,0,0.6);color:#fff;border:none;font-size:20px;cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center;line-height:1;backdrop-filter:blur(4px);';

      var img = document.createElement('img');
      img.src = '/images/banner-live.jpg';
      img.alt = 'Live - A Nova Era da Gestao';
      img.style.cssText = 'width:100%;display:block;';

      function dismiss() {
        overlay.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(function() { overlay.remove(); }, 300);
      }

      closeBtn.onclick = function(e) { e.stopPropagation(); dismiss(); };
      overlay.onclick = dismiss;
      card.onclick = function(e) { e.stopPropagation(); dismiss(); window.location.href = '/live#inscreva-se'; };

      card.appendChild(closeBtn);
      card.appendChild(img);
      overlay.appendChild(card);
      document.body.appendChild(overlay);

      // Animate in
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          overlay.style.opacity = '1';
          card.style.transform = 'scale(1)';
        });
      });
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showLivePopup);
  } else {
    showLivePopup();
  }
})();
