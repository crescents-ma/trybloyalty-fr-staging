#!/usr/bin/env node
'use strict';

/**
 * TRYB Loyalty static site generator
 * Generates 4 locale sites: ma (fr-MA), fr (fr-FR), com (en), es (es-ES)
 * SEO: hreflang, Article/Organization JSON-LD schemas, sitemap.xml, robots.txt
 * Compliance: RGPD/GDPR cookie banner, privacy pages
 * Performance: inline CSS, system fonts, no render-blocking resources (target LCP < 2.5s)
 */

const fs = require('fs');
const path = require('path');
const { SITES, HOMEPAGE, BLOG_POSTS, PRIVACY } = require('./content');

const DIST = path.join(__dirname, 'dist');

// ─── CSS (inlined into every page) ────────────────────────────────────────────
const CSS = `
:root{--primary:#0f1f3d;--accent:#e63950;--text:#1a1a2a;--bg:#fff;--muted:#6b7280;--light:#f8f9fc;--border:#e5e7eb}
*{box-sizing:border-box;margin:0;padding:0}
body{font:16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;color:var(--text);background:var(--bg)}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}
img{max-width:100%;height:auto;display:block}
.container{max-width:1080px;margin:0 auto;padding:0 20px}
/* Header */
.site-header{background:var(--primary);color:#fff;padding:0}
.header-inner{display:flex;align-items:center;justify-content:space-between;height:60px}
.logo{font-weight:800;font-size:1.15rem;color:#fff!important;letter-spacing:-.3px}
.logo span{color:var(--accent)}
.site-nav{display:flex;gap:20px;align-items:center}
.site-nav a{color:#cbd5e1;font-size:.9rem}
.site-nav a:hover{color:#fff;text-decoration:none}
.nav-cta{background:var(--accent);color:#fff!important;padding:6px 16px;border-radius:5px;font-weight:600;font-size:.875rem}
.nav-cta:hover{opacity:.9}
/* Hero */
.hero{padding:80px 0 72px;background:var(--light);text-align:center}
.hero h1{font-size:clamp(1.8rem,4.5vw,3rem);font-weight:800;line-height:1.2;color:var(--primary);margin-bottom:20px;max-width:780px;margin-left:auto;margin-right:auto}
.hero .sub{font-size:1.1rem;color:var(--muted);max-width:580px;margin:0 auto 36px}
.btn-primary{display:inline-block;background:var(--accent);color:#fff!important;padding:14px 32px;border-radius:6px;font-weight:700;font-size:1rem;letter-spacing:.2px}
.btn-primary:hover{opacity:.88;text-decoration:none}
.btn-secondary{display:inline-block;color:var(--primary)!important;padding:14px 24px;font-weight:600;font-size:.95rem;margin-left:12px}
.btn-secondary:hover{text-decoration:underline}
/* Features */
.features{padding:72px 0}
.section-title{text-align:center;font-size:1.75rem;font-weight:700;color:var(--primary);margin-bottom:48px}
.grid-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:28px}
.feature-card{padding:28px;border:1px solid var(--border);border-radius:12px;background:#fff}
.feature-card h3{font-size:1.05rem;font-weight:700;color:var(--primary);margin-bottom:10px}
.feature-card p{color:var(--muted);font-size:.93rem;line-height:1.6}
/* CTA strip */
.cta-strip{padding:56px 0;background:var(--primary);text-align:center}
.cta-strip h2{font-size:1.6rem;font-weight:700;color:#fff;margin-bottom:12px}
.cta-strip p{color:#94a3b8;margin-bottom:28px}
/* Blog list */
.blog-section{padding:64px 0}
.post-card{border-bottom:1px solid var(--border);padding:28px 0}
.post-card:first-child{border-top:1px solid var(--border)}
.post-card h2{font-size:1.2rem;font-weight:700;color:var(--primary);margin-bottom:8px}
.post-card h2 a{color:var(--primary)}
.post-card .post-meta{color:var(--muted);font-size:.85rem;margin-bottom:10px}
.post-card p{color:var(--muted);font-size:.93rem}
/* Blog post */
.post-content{max-width:740px;margin:48px auto;padding:0 20px}
.post-content h1{font-size:1.9rem;font-weight:800;color:var(--primary);line-height:1.25;margin-bottom:8px}
.post-content .post-meta{color:var(--muted);font-size:.88rem;margin-bottom:32px;padding-bottom:20px;border-bottom:1px solid var(--border)}
.post-content h2{font-size:1.3rem;font-weight:700;color:var(--primary);margin:32px 0 12px}
.post-content h3{font-size:1.1rem;font-weight:700;color:var(--primary);margin:24px 0 8px}
.post-content p{color:var(--text);margin-bottom:16px;line-height:1.7}
/* Static page */
.page-content{max-width:740px;margin:48px auto;padding:0 20px}
.page-content h1{font-size:1.9rem;font-weight:800;color:var(--primary);margin-bottom:32px}
.page-content h2{font-size:1.2rem;font-weight:700;color:var(--primary);margin:28px 0 8px}
.page-content p{color:var(--text);margin-bottom:14px;line-height:1.7}
/* Footer */
.site-footer{background:var(--primary);color:#94a3b8;padding:48px 0 24px;margin-top:80px}
.footer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;margin-bottom:32px}
.site-footer h4{color:#f1f5f9;font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.6px;margin-bottom:14px}
.site-footer a{color:#94a3b8;font-size:.9rem;display:block;margin-bottom:6px}
.site-footer a:hover{color:#fff;text-decoration:none}
.rgpd-notice{font-size:.78rem;color:#64748b;line-height:1.6;padding-top:24px;border-top:1px solid #1e293b;margin-bottom:20px}
.footer-bottom{font-size:.8rem;color:#475569;padding-top:16px;border-top:1px solid #1e293b}
/* Cookie banner */
.cookie-banner{position:fixed;bottom:0;left:0;right:0;background:#0f1f3d;color:#e2e8f0;padding:16px 20px;display:none;align-items:center;justify-content:space-between;gap:16px;z-index:9999;font-size:.875rem;flex-wrap:wrap;box-shadow:0 -2px 12px rgba(0,0,0,.2)}
.cookie-banner p{margin:0;flex:1;min-width:200px}
.cookie-banner a{color:#93c5fd}
.cookie-actions{display:flex;gap:8px;flex-shrink:0}
.cookie-btn{padding:8px 18px;border:none;border-radius:5px;cursor:pointer;font-size:.875rem;font-weight:600}
.cookie-accept{background:var(--accent);color:#fff}
.cookie-decline{background:transparent;color:#94a3b8;border:1px solid #334155}
.cookie-decline:hover{border-color:#64748b;color:#e2e8f0}
/* Contact form */
.contact-form{max-width:520px;margin:48px auto;padding:0 20px}
.contact-form h1{font-size:1.8rem;font-weight:800;color:var(--primary);margin-bottom:28px}
.form-group{margin-bottom:20px}
.form-group label{display:block;font-size:.9rem;font-weight:600;color:var(--text);margin-bottom:6px}
.form-group input,.form-group textarea{width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:6px;font-size:1rem;font-family:inherit;color:var(--text);background:#fff}
.form-group input:focus,.form-group textarea:focus{outline:2px solid var(--accent);border-color:transparent}
.form-group textarea{min-height:120px;resize:vertical}
.consent-group{display:flex;align-items:flex-start;gap:12px;margin-bottom:24px}
.consent-group input[type=checkbox]{width:18px;height:18px;flex-shrink:0;margin-top:2px;accent-color:var(--accent)}
.consent-group label{font-size:.88rem;color:var(--muted);line-height:1.5}
.btn-submit{background:var(--accent);color:#fff;border:none;padding:13px 28px;border-radius:6px;font-size:1rem;font-weight:700;cursor:pointer;width:100%}
.btn-submit:hover{opacity:.9}
@media(max-width:640px){
  .hero{padding:52px 0 48px}
  .site-nav a:not(.nav-cta){display:none}
  .cookie-banner{flex-direction:column}
  .cookie-actions{width:100%}
  .cookie-btn{flex:1;text-align:center}
}
`.trim();

// ─── Cookie consent JS (inline, minimal) ──────────────────────────────────────
const COOKIE_JS = `
(function(){
  var b=document.getElementById('cookie-banner');
  if(!b)return;
  if(localStorage.getItem('tryb_consent')){b.remove();return;}
  b.style.display='flex';
  document.getElementById('cookie-accept').onclick=function(){
    localStorage.setItem('tryb_consent','accepted');
    b.remove();
  };
  document.getElementById('cookie-decline').onclick=function(){
    localStorage.setItem('tryb_consent','declined');
    b.remove();
  };
})();
`.trim();

// ─── Schema helpers ────────────────────────────────────────────────────────────
function orgSchema(locale) {
  const site = SITES[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.orgName,
    alternateName: 'TRYB Loyalty',
    url: site.domain,
    logo: {
      '@type': 'ImageObject',
      url: `${site.domain}/logo.png`,
      width: 200,
      height: 60,
    },
    foundingDate: '2025',
    description: 'Digital loyalty platform for independent businesses.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'contact@trybinternational.com',
    },
    sameAs: [
      'https://www.linkedin.com/company/tryb-international',
    ],
  };
}

function articleSchema(post, locale) {
  const site = SITES[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: site.orgName,
      url: site.domain,
    },
    publisher: {
      '@type': 'Organization',
      name: site.orgName,
      logo: {
        '@type': 'ImageObject',
        url: `${site.domain}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.domain}/blog/${post.slug}`,
    },
    image: `${site.domain}/og-default.png`,
    inLanguage: SITES[locale].lang,
  };
}

function websiteSchema(locale, path_) {
  const site = SITES[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.orgName,
    url: site.domain,
    inLanguage: site.lang,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.domain}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

// ─── hreflang links ────────────────────────────────────────────────────────────
function hreflangLinks(currentPath, slugMap) {
  const lines = [];
  for (const [loc, site] of Object.entries(SITES)) {
    const p = slugMap ? (slugMap[loc] || currentPath) : currentPath;
    lines.push(`  <link rel="alternate" hreflang="${site.hreflangCode}" href="${site.domain}${p}">`);
  }
  // x-default points to .com
  const xdefPath = slugMap ? (slugMap.com || currentPath) : currentPath;
  lines.push(`  <link rel="alternate" hreflang="x-default" href="${SITES.com.domain}${xdefPath}">`);
  return lines.join('\n');
}

// ─── Base HTML template ────────────────────────────────────────────────────────
function baseHtml({
  locale,
  title,
  description,
  canonical,
  hreflangBlock,
  schemas,
  body,
  ogImage,
}) {
  const site = SITES[locale];
  const content = HOMEPAGE[locale];
  const schemasJson = schemas
    .map(s => `  <script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n');
  const ogImg = ogImage || `${site.domain}/og-default.png`;

  return `<!DOCTYPE html>
<html lang="${site.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escHtml(title)}</title>
  <meta name="description" content="${escHtml(description)}">
  <link rel="canonical" href="${canonical}">
${hreflangBlock}
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escHtml(title)}">
  <meta property="og:description" content="${escHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImg}">
  <meta name="twitter:card" content="summary_large_image">
  <!-- Structured data -->
${schemasJson}
  <style>${CSS}</style>
</head>
<body>
${siteHeader(locale)}
${body}
${cookieBanner(locale)}
<script>${COOKIE_JS}</script>
</body>
</html>`;
}

// ─── Header / Footer ──────────────────────────────────────────────────────────
function siteHeader(locale) {
  const nav = HOMEPAGE[locale].nav;
  const site = SITES[locale];
  const utm = '?utm_source=nav&utm_medium=web&utm_campaign=demo';
  return `<header class="site-header">
  <div class="container">
    <div class="header-inner">
      <a href="/" class="logo">TRYB<span>.</span>Loyalty</a>
      <nav class="site-nav" aria-label="Main navigation">
        <a href="${HOMEPAGE[locale].blogPath}">${nav.blog}</a>
        <a href="${HOMEPAGE[locale].privacyPath}">${nav.privacy}</a>
        <a href="/demo${utm}" class="nav-cta">${nav.demo}</a>
      </nav>
    </div>
  </div>
</header>`;
}

function siteFooter(locale) {
  const c = HOMEPAGE[locale];
  const nav = c.nav;
  const site = SITES[locale];
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4>TRYB Loyalty</h4>
        <p style="font-size:.88rem;line-height:1.6;">${escHtml(c.footer.tagline)}</p>
      </div>
      <div>
        <h4>${escHtml(c.footer.links)}</h4>
        <a href="/">${escHtml(c.hero ? c.hero.cta : 'Home')}</a>
        <a href="${c.blogPath}">Blog</a>
        <a href="${c.privacyPath}">${escHtml(nav.privacy)}</a>
      </div>
      <div>
        <h4>${escHtml(c.footer.contact)}</h4>
        <a href="mailto:contact@trybinternational.com">contact@trybinternational.com</a>
        <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a>
      </div>
    </div>
    <p class="rgpd-notice">${escHtml(c.footer.rgpd)}</p>
    <div class="footer-bottom">© ${year} TRYB International. All rights reserved.</div>
  </div>
</footer>`;
}

function cookieBanner(locale) {
  const c = HOMEPAGE[locale].cookie;
  return `<div id="cookie-banner" class="cookie-banner" role="dialog" aria-label="Cookie consent">
  <p>${escHtml(c.text)} <a href="${HOMEPAGE[locale].privacyPath}">${escHtml(c.policy)}</a>.</p>
  <div class="cookie-actions">
    <button id="cookie-decline" class="cookie-btn cookie-decline">${escHtml(c.decline)}</button>
    <button id="cookie-accept" class="cookie-btn cookie-accept">${escHtml(c.accept)}</button>
  </div>
</div>`;
}

// ─── Page builders ─────────────────────────────────────────────────────────────
function buildHomepage(locale) {
  const c = HOMEPAGE[locale];
  const site = SITES[locale];
  const canonical = site.domain + '/';
  const utm = '?utm_source=hero&utm_medium=web&utm_campaign=demo';

  const body = `
<main>
  <section class="hero">
    <div class="container">
      <h1>${escHtml(c.hero.headline)}</h1>
      <p class="sub">${escHtml(c.hero.sub)}</p>
      <a href="/demo${utm}" class="btn-primary">${escHtml(c.hero.cta)}</a>
      <a href="${c.blogPath}" class="btn-secondary">${escHtml(c.hero.ctaSecondary)}</a>
    </div>
  </section>

  <section class="features">
    <div class="container">
      <h2 class="section-title">TRYB Loyalty</h2>
      <div class="grid-3">
        ${c.features.map(f => `
        <div class="feature-card">
          <h3>${escHtml(f.title)}</h3>
          <p>${escHtml(f.desc)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="cta-strip">
    <div class="container">
      <h2>${escHtml(c.hero.cta)}</h2>
      <p>${escHtml(c.hero.sub)}</p>
      <a href="/demo${utm}" class="btn-primary">${escHtml(c.hero.cta)}</a>
    </div>
  </section>
</main>
${siteFooter(locale)}`;

  return baseHtml({
    locale,
    title: c.metaTitle,
    description: c.metaDescription,
    canonical,
    hreflangBlock: hreflangLinks('/'),
    schemas: [orgSchema(locale), websiteSchema(locale, '/')],
    body,
  });
}

function buildBlogList(locale) {
  const posts = BLOG_POSTS[locale] || [];
  const c = HOMEPAGE[locale];
  const site = SITES[locale];
  const canonical = `${site.domain}/blog/`;
  const lang = site.lang;

  const titles = { fr: 'Blog', en: 'Blog', es: 'Blog' };
  const descs = {
    fr: 'Conseils et stratégies pour fidéliser vos clients.',
    en: 'Tips and strategies to build customer loyalty.',
    es: 'Consejos y estrategias para fidelizar a tus clientes.',
  };

  const postHtml = posts.map(p => {
    const d = new Date(p.date).toLocaleDateString(site.dateLocale, {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    return `
    <article class="post-card">
      <p class="post-meta"><time datetime="${p.date}">${d}</time></p>
      <h2><a href="/blog/${p.slug}/">${escHtml(p.title)}</a></h2>
      <p>${escHtml(p.description)}</p>
    </article>`;
  }).join('');

  const body = `
<main>
  <section class="blog-section">
    <div class="container">
      <h1 class="section-title" style="text-align:left;margin-bottom:32px">${titles[lang] || 'Blog'}</h1>
      ${postHtml || '<p>No posts yet.</p>'}
    </div>
  </section>
</main>
${siteFooter(locale)}`;

  return baseHtml({
    locale,
    title: `${titles[lang] || 'Blog'} — TRYB Loyalty`,
    description: descs[lang] || descs.en,
    canonical,
    hreflangBlock: hreflangLinks('/blog/'),
    schemas: [orgSchema(locale)],
    body,
  });
}

function buildBlogPost(post, locale) {
  const site = SITES[locale];
  const canonical = `${site.domain}/blog/${post.slug}/`;
  const c = HOMEPAGE[locale];
  const d = new Date(post.date).toLocaleDateString(site.dateLocale, {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Build a slug map so hreflang points to same-language equivalent posts
  const slugMap = {};
  for (const [loc] of Object.entries(SITES)) {
    const locPosts = BLOG_POSTS[loc] || [];
    slugMap[loc] = locPosts.length ? `/blog/${locPosts[0].slug}/` : '/blog/';
  }

  const body = `
<main>
  <article class="post-content">
    <h1>${escHtml(post.title)}</h1>
    <p class="post-meta"><time datetime="${post.date}">${d}</time> — ${escHtml(post.author)}</p>
    ${post.body}
  </article>
</main>
${siteFooter(locale)}`;

  return baseHtml({
    locale,
    title: `${post.title} — TRYB Loyalty`,
    description: post.description,
    canonical,
    hreflangBlock: hreflangLinks(`/blog/${post.slug}/`, slugMap),
    schemas: [articleSchema(post, locale), orgSchema(locale)],
    body,
  });
}

function buildPrivacyPage(locale) {
  const pv = PRIVACY[locale];
  const site = SITES[locale];
  const canonical = `${site.domain}/${pv.path}/`;

  const body = `
<main>
  <div class="page-content">
    <h1>${escHtml(pv.title)}</h1>
    ${pv.body}
  </div>
</main>
${siteFooter(locale)}`;

  return baseHtml({
    locale,
    title: pv.metaTitle,
    description: pv.metaDescription,
    canonical,
    hreflangBlock: hreflangLinks(`/${pv.path}/`),
    schemas: [orgSchema(locale)],
    body,
  });
}

function buildDemoPage(locale) {
  const c = HOMEPAGE[locale];
  const site = SITES[locale];
  const canonical = `${site.domain}/demo/`;
  const lang = site.lang;

  const ui = {
    fr: {
      title: 'Demander une démo gratuite — TRYB Loyalty',
      desc: 'Réservez votre démo TRYB Loyalty. Sans engagement.',
      h1: 'Demander une démo gratuite',
      name: 'Nom complet',
      email: 'Email professionnel',
      company: 'Nom de votre commerce',
      message: 'Message (optionnel)',
      consent: "J'accepte que TRYB International traite mes données pour répondre à ma demande, conformément au RGPD (Art. 7). Je peux retirer mon consentement à tout moment.",
      submit: 'Envoyer ma demande',
    },
    en: {
      title: 'Request a Free Demo — TRYB Loyalty',
      desc: 'Book your TRYB Loyalty demo. No commitment required.',
      h1: 'Request a free demo',
      name: 'Full name',
      email: 'Business email',
      company: 'Business name',
      message: 'Message (optional)',
      consent: "I agree that TRYB International may process my data to respond to my request, in accordance with GDPR (Art. 7). I can withdraw consent at any time.",
      submit: 'Send my request',
    },
    es: {
      title: 'Solicitar una demo gratuita — TRYB Loyalty',
      desc: 'Reserva tu demo de TRYB Loyalty. Sin compromiso.',
      h1: 'Solicitar una demo gratuita',
      name: 'Nombre completo',
      email: 'Email profesional',
      company: 'Nombre del negocio',
      message: 'Mensaje (opcional)',
      consent: "Acepto que TRYB International trate mis datos para responder a mi solicitud, conforme al RGPD (Art. 7). Puedo retirar mi consentimiento en cualquier momento.",
      submit: 'Enviar mi solicitud',
    },
  };
  const t = ui[lang] || ui.en;

  const body = `
<main>
  <section class="contact-form">
    <h1>${escHtml(t.h1)}</h1>
    <form action="https://api.trybinternational.com/demo-request" method="POST" novalidate>
      <input type="hidden" name="locale" value="${locale}">
      <div class="form-group">
        <label for="name">${escHtml(t.name)} *</label>
        <input type="text" id="name" name="name" required autocomplete="name">
      </div>
      <div class="form-group">
        <label for="email">${escHtml(t.email)} *</label>
        <input type="email" id="email" name="email" required autocomplete="email">
      </div>
      <div class="form-group">
        <label for="company">${escHtml(t.company)} *</label>
        <input type="text" id="company" name="company" required>
      </div>
      <div class="form-group">
        <label for="message">${escHtml(t.message)}</label>
        <textarea id="message" name="message"></textarea>
      </div>
      <!-- RGPD Art. 7 explicit opt-in (required) -->
      <div class="consent-group">
        <input type="checkbox" id="consent" name="rgpd_consent" value="1" required>
        <label for="consent">${escHtml(t.consent)} <a href="${c.privacyPath}">${escHtml(c.nav.privacy)}</a>.</label>
      </div>
      <button type="submit" class="btn-submit">${escHtml(t.submit)}</button>
    </form>
  </section>
</main>
${siteFooter(locale)}`;

  return baseHtml({
    locale,
    title: t.title,
    description: t.desc,
    canonical,
    hreflangBlock: hreflangLinks('/demo/'),
    schemas: [orgSchema(locale)],
    body,
  });
}

// ─── Sitemap ──────────────────────────────────────────────────────────────────
function buildSitemap(locale) {
  const site = SITES[locale];
  const posts = BLOG_POSTS[locale] || [];
  const pv = PRIVACY[locale];
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: `${site.domain}/`, changefreq: 'weekly', priority: '1.0', lastmod: today },
    { loc: `${site.domain}/blog/`, changefreq: 'weekly', priority: '0.9', lastmod: today },
    { loc: `${site.domain}/demo/`, changefreq: 'monthly', priority: '0.8', lastmod: today },
    { loc: `${site.domain}/${pv.path}/`, changefreq: 'yearly', priority: '0.3', lastmod: today },
    ...posts.map(p => ({
      loc: `${site.domain}/blog/${p.slug}/`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: p.date,
    })),
  ];

  const urlset = urls
    .map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;
}

// ─── robots.txt ───────────────────────────────────────────────────────────────
function buildRobots(locale) {
  const site = SITES[locale];
  return `User-agent: *
Allow: /
Allow: /blog/
Allow: /sitemap.xml

Sitemap: ${site.domain}/sitemap.xml
`;
}

// ─── Utility ──────────────────────────────────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function generate() {
  console.log('Generating TRYB Loyalty static sites...\n');

  for (const locale of Object.keys(SITES)) {
    const distDir = path.join(DIST, locale);
    console.log(`  [${locale.toUpperCase()}] ${SITES[locale].domain}`);

    // Homepage
    write(path.join(distDir, 'index.html'), buildHomepage(locale));

    // Blog listing
    write(path.join(distDir, 'blog', 'index.html'), buildBlogList(locale));

    // Blog posts
    for (const post of (BLOG_POSTS[locale] || [])) {
      write(path.join(distDir, 'blog', post.slug, 'index.html'), buildBlogPost(post, locale));
      console.log(`    post: /blog/${post.slug}/`);
    }

    // Privacy page
    const pv = PRIVACY[locale];
    write(path.join(distDir, pv.path, 'index.html'), buildPrivacyPage(locale));

    // Demo page
    write(path.join(distDir, 'demo', 'index.html'), buildDemoPage(locale));

    // Sitemap
    write(path.join(distDir, 'sitemap.xml'), buildSitemap(locale));

    // robots.txt
    write(path.join(distDir, 'robots.txt'), buildRobots(locale));

    // 404 page (simple redirect to homepage)
    write(path.join(distDir, '404.html'), `<!DOCTYPE html>
<html lang="${SITES[locale].lang}">
<head><meta charset="UTF-8"><title>404 — TRYB Loyalty</title>
<meta http-equiv="refresh" content="3;url=/">
<style>body{font-family:sans-serif;text-align:center;padding:80px 20px;color:#0f1f3d}</style>
</head>
<body><h1>404</h1><p>Redirecting...</p></body>
</html>`);

    console.log(`    homepage, blog/, privacy, demo/, sitemap.xml, robots.txt ✓`);
  }

  const totalSites = Object.keys(SITES).length;
  console.log(`\n✓ Generated ${totalSites} sites in site/dist/`);
}

generate();
