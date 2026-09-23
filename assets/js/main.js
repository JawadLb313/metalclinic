/* The Metal Clinic — site behaviour.
   Everything here is progressive: with JavaScript off, the page still reads,
   every link still works, and the first programme is still open. */
(function () {
  'use strict';

  /* ---------- header scroll state ---------- */
  var hdr = document.getElementById('hdr');
  var onScroll = function () {
    hdr.classList.toggle('stuck', window.scrollY > 60);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var mnav = document.getElementById('mnav');
  var lastFocus = null;

  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mnav.classList.toggle('open', open);
    mnav.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('is-locked', open);
    if (open) {
      lastFocus = document.activeElement;
      var first = mnav.querySelector('a');
      if (first) first.focus();
    } else if (lastFocus) {
      lastFocus.focus();
    }
  }

  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });
  mnav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mnav.classList.contains('open')) setMenu(false);
  });
  // keep focus inside the open menu
  mnav.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var items = mnav.querySelectorAll('a, button');
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- programmes accordion (one open at a time) ---------- */
  var acc = document.getElementById('acc');
  if (acc) {
    acc.addEventListener('click', function (e) {
      var btn = e.target.closest('.row');
      if (!btn) return;
      var item = btn.parentElement;
      var isOpen = item.classList.contains('open');
      acc.querySelectorAll('.item').forEach(function (i) {
        i.classList.remove('open');
        i.querySelector('.row').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  /* ---------- open / closed pill (Beirut time) ---------- */
  var pill = document.getElementById('openpill');
  var hoursEl = document.getElementById('hours');
  if (pill && hoursEl) {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Beirut', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      var get = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
      var day = get('weekday');
      var mins = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);

      var span = day === 'Sat' ? hoursEl.dataset.sat
        : day === 'Sun' ? hoursEl.dataset.sun
        : hoursEl.dataset.monFri;

      var label, open = false;
      if (!span || span === 'closed') {
        label = 'Closed today';
      } else {
        var b = span.split('-');
        var toMin = function (s) { var x = s.split(':'); return +x[0] * 60 + +x[1]; };
        var from = toMin(b[0]), to = toMin(b[1]);
        open = mins >= from && mins < to;
        label = open ? 'Open now — closes ' + b[1]
          : mins < from ? 'Closed — opens ' + b[0] : 'Closed for today';
      }
      pill.querySelector('span').textContent = label;
      pill.classList.add('show');
      pill.classList.toggle('shut', !open);
    } catch (err) { /* leave the pill hidden if anything is unsupported */ }
  }

  /* ---------- Instagram video in a lightbox ----------
     Any link with data-ig="<post id>" opens that post's player here instead
     of leaving the site. Without JavaScript the link simply opens Instagram.
     The player is only loaded on click, so it costs nothing on page load. */
  var vm = document.getElementById('vmodal');
  var vf = document.getElementById('vframe');
  var vclose = document.getElementById('vclose');
  var vOpener = null;

  function openVideo(id, opener) {
    vOpener = opener;
    vf.innerHTML = '<iframe src="https://www.instagram.com/p/' + encodeURIComponent(id) +
      '/embed/" title="The Metal Clinic on Instagram" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
    vm.hidden = false;
    document.body.classList.add('is-locked');
    vclose.focus();
  }
  function closeVideo() {
    vf.innerHTML = '';                 // removing the iframe stops playback
    vm.hidden = true;
    document.body.classList.remove('is-locked');
    if (vOpener) vOpener.focus();
  }
  if (vm && vf && vclose) {
    document.querySelectorAll('[data-ig]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        openVideo(a.getAttribute('data-ig'), a);
      });
    });
    vclose.addEventListener('click', closeVideo);
    vm.addEventListener('click', function (e) { if (e.target === vm) closeVideo(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !vm.hidden) closeVideo();
    });
  }

  /* ---------- footer year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
