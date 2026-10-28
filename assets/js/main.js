/* ─────────────────────────────────────────────────────────────
   LimePointing Works – site script
   Menu · header · reveals · services explorer · lightbox · form
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Header shadow once the page scrolls ── */
  var header = document.querySelector('[data-header]');
  var onScroll = function () { header && header.classList.toggle('is-scrolled', window.scrollY > 12); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile menu ── */
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-menu]');
  var menuIcon = document.querySelector('[data-menu-icon] use');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuIcon && menuIcon.setAttribute('href', open ? '#i-close' : '#i-menu');
  }
  if (toggle) {
    toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('is-open') && !menu.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });
  }

  /* ── Reveal on scroll ── */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ── Services explorer (ARIA tabs) ── */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-services] [role="tab"]'));
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var next = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (next) { e.preventDefault(); selectTab(tabs[(i + next + tabs.length) % tabs.length], true); }
      if (e.key === 'Home') { e.preventDefault(); selectTab(tabs[0], true); }
      if (e.key === 'End') { e.preventDefault(); selectTab(tabs[tabs.length - 1], true); }
    });
  });

  /* "Get a quote" inside a service pre-selects it in the form */
  var serviceSelect = document.getElementById('f-service');
  document.querySelectorAll('[data-quote]').forEach(function (a) {
    a.addEventListener('click', function () { if (serviceSelect) serviceSelect.value = a.getAttribute('data-quote'); });
  });

  /* ── Lightbox ── */
  var lb = document.querySelector('[data-lightbox]');
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-lb]'));
  if (lb && items.length) {
    var lbImg = lb.querySelector('[data-lb-img]');
    var lbCap = lb.querySelector('[data-lb-caption]');
    var lbCount = lb.querySelector('[data-lb-count]');
    var current = 0, lastFocus = null;
    var show = function (i) {
      current = (i + items.length) % items.length;
      var it = items[current];
      lbImg.style.opacity = '0';
      var src = it.getAttribute('data-lb');
      var pre = new Image();
      pre.onload = pre.onerror = function () {
        lbImg.src = src;
        lbImg.alt = it.querySelector('img').alt;
        lbImg.style.opacity = '1';
      };
      pre.src = src;
      lbCap.textContent = it.getAttribute('data-caption') || '';
      lbCount.textContent = (current + 1) + ' / ' + items.length;
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lb.querySelector('[data-lb-close]').focus();
    };
    var close = function () {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      lastFocus && lastFocus.focus();
    };
    items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
    lb.querySelector('[data-lb-close]').addEventListener('click', close);
    lb.querySelector('[data-lb-prev]').addEventListener('click', function () { show(current - 1); });
    lb.querySelector('[data-lb-next]').addEventListener('click', function () { show(current + 1); });
    lb.querySelector('[data-lb-stage]').addEventListener('click', function (e) { if (e.target === this) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
      if (e.key === 'Tab') { // keep focus inside the viewer
        var f = Array.prototype.slice.call(lb.querySelectorAll('button')).filter(function (b) { return b.offsetParent !== null; });
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // Swipe on touch screens
    var x0 = null, y0 = null;
    lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
      x0 = y0 = null;
    }, { passive: true });
  }

  /* ── Hide the sticky mobile bar while the form is on screen ── */
  var bar = document.querySelector('[data-mobile-bar]');
  var formEl = document.querySelector('[data-form]');
  if (bar && formEl && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      bar.style.transform = entries[0].isIntersecting ? 'translateY(110%)' : '';
    }, { threshold: 0.15 }).observe(formEl);
  }

  /* ── Quote form: inline validation + sending state ── */
  if (formEl) {
    var fields = formEl.querySelectorAll('[required]');
    var check = function (f) {
      var ok = f.value.trim() !== '' && (f.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
      if (f.type === 'tel' && ok) ok = f.value.replace(/\D/g, '').length >= 6;
      f.setAttribute('aria-invalid', String(!ok));
      var err = document.getElementById(f.getAttribute('aria-describedby'));
      err && err.classList.toggle('is-shown', !ok);
      return ok;
    };
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value) check(f); });
      f.addEventListener('input', function () { if (f.getAttribute('aria-invalid') === 'true') check(f); });
    });
    formEl.addEventListener('submit', function (e) {
      var firstBad = null;
      fields.forEach(function (f) { if (!check(f) && !firstBad) firstBad = f; });
      if (firstBad) { e.preventDefault(); firstBad.focus(); return; }
      var btn = formEl.querySelector('[data-submit]');
      btn.disabled = true;
      btn.classList.add('opacity-80', 'cursor-wait');
      formEl.querySelector('[data-submit-label]').textContent = 'Sending…';
    });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
