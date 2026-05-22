/**
 * trybloyalty.fr — Main JS
 * - UTM pass-through on all CTA links
 * - RGPD cookie consent banner
 * - Contact form validation (RGPD Art. 7 opt-in required)
 * - No analytics loaded until consent is given
 */

(function () {
  'use strict';

  /* ── UTM Pass-Through ─────────────────────────────────────────────── */

  function getUTMParams() {
    const params = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const result = {};
    utmKeys.forEach(k => { if (params.has(k)) result[k] = params.get(k); });
    return result;
  }

  function injectUTMIntoLinks() {
    const utm = getUTMParams();
    if (!Object.keys(utm).length) return;

    document.querySelectorAll('a[data-utm-passthrough]').forEach(a => {
      try {
        const url = new URL(a.href, window.location.href);
        Object.entries(utm).forEach(([k, v]) => url.searchParams.set(k, v));
        a.href = url.toString();
      } catch (_) {}
    });
  }

  /* ── Cookie Consent ──────────────────────────────────────────────── */

  var CONSENT_KEY = 'tryb_cookie_consent';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (_) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (_) {}
  }

  function loadAnalytics() {
    // Only load analytics scripts after explicit consent.
    // Placeholder: replace GA_MEASUREMENT_ID with real ID when analytics approved.
    if (typeof window.__analyticsLoaded !== 'undefined') return;
    window.__analyticsLoaded = true;
    // Future: inject GA4 script tag here after board approves analytics vendor.
    console.info('[TRYB] Analytics consent granted — ready to load GA4.');
  }

  function initCookieBanner() {
    var consent = getConsent();
    if (consent !== null) {
      if (consent === 'accepted') loadAnalytics();
      return; // already decided
    }

    var banner = document.getElementById('cookie-banner');
    if (!banner) return;

    // Show banner after short delay
    setTimeout(function () { banner.classList.add('visible'); }, 800);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      setConsent('accepted');
      banner.classList.remove('visible');
      loadAnalytics();
    });

    document.getElementById('cookie-reject').addEventListener('click', function () {
      setConsent('rejected');
      banner.classList.remove('visible');
    });
  }

  /* ── Contact Form ─────────────────────────────────────────────────── */

  function initContactForm() {
    var form = document.getElementById('demo-form');
    if (!form) return;

    var optinCheckbox = document.getElementById('rgpd-optin');
    var optinNote = document.getElementById('optin-required-note');
    var submitBtn = document.getElementById('form-submit');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // RGPD Art. 7 — explicit opt-in is mandatory
      if (!optinCheckbox || !optinCheckbox.checked) {
        if (optinNote) optinNote.classList.add('visible');
        if (optinCheckbox) optinCheckbox.focus();
        return;
      }
      if (optinNote) optinNote.classList.remove('visible');

      // Collect form data
      var data = {
        prenom: form.querySelector('[name="prenom"]').value.trim(),
        nom: form.querySelector('[name="nom"]').value.trim(),
        email: form.querySelector('[name="email"]').value.trim(),
        telephone: form.querySelector('[name="telephone"]') ? form.querySelector('[name="telephone"]').value.trim() : '',
        enseigne: form.querySelector('[name="enseigne"]').value.trim(),
        secteur: form.querySelector('[name="secteur"]').value,
        message: form.querySelector('[name="message"]') ? form.querySelector('[name="message"]').value.trim() : '',
        rgpd_optin: true,
        utm: getUTMParams(),
        submitted_at: new Date().toISOString()
      };

      if (!data.prenom || !data.nom || !data.email || !data.enseigne || !data.secteur) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      if (submitBtn) submitBtn.disabled = true;

      // Submit to form endpoint (Formspree placeholder — replace with real endpoint)
      var endpoint = form.dataset.endpoint || '#';
      if (endpoint === '#') {
        // Dev mode: simulate success
        showFormSuccess(form);
        return;
      }

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) {
          if (r.ok) { showFormSuccess(form); }
          else { throw new Error('Erreur serveur'); }
        })
        .catch(function () {
          if (submitBtn) submitBtn.disabled = false;
          alert('Une erreur est survenue. Veuillez réessayer ou contacter hello@trybinternational.com.');
        });
    });
  }

  function showFormSuccess(form) {
    form.style.display = 'none';
    var success = document.getElementById('form-success');
    if (success) success.classList.add('visible');
  }

  /* ── Intersection Observer Animations ─────────────────────────────── */

  function initAnimations() {
    if (!('IntersectionObserver' in window)) return;
    var els = document.querySelectorAll('.animate-delay-1, .animate-delay-2, .animate-delay-3');
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ── Init ─────────────────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    injectUTMIntoLinks();
    initCookieBanner();
    initContactForm();
    initAnimations();
  });

})();
