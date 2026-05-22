'use strict';

// Site configuration — one entry per locale
const SITES = {
  ma: {
    domain: 'https://trybloyalty.ma',
    lang: 'fr',
    hreflangCode: 'fr-MA',
    locale: 'ma',
    dateLocale: 'fr-MA',
    orgName: 'TRYB Loyalty Maroc',
  },
  fr: {
    domain: 'https://trybloyalty.fr',
    lang: 'fr',
    hreflangCode: 'fr-FR',
    locale: 'fr',
    dateLocale: 'fr-FR',
    orgName: 'TRYB International',
  },
  com: {
    domain: 'https://trybloyalty.com',
    lang: 'en',
    hreflangCode: 'en',
    locale: 'com',
    dateLocale: 'en-US',
    orgName: 'TRYB International',
  },
  es: {
    domain: 'https://trybloyalty.es',
    lang: 'es',
    hreflangCode: 'es-ES',
    locale: 'es',
    dateLocale: 'es-ES',
    orgName: 'TRYB International',
  },
};

// Homepage content per locale
const HOMEPAGE = {
  fr: {
    metaTitle: 'TRYB Loyalty — Programme de fidélité digital pour commerçants',
    metaDescription:
      'Fidélisez vos clients avec TRYB Loyalty. Simple à lancer, puissant pour fidéliser. Restaurants, cafés, boutiques. Conformité RGPD incluse.',
    hero: {
      headline: 'Transformez vos clients occasionnels en habitués fidèles.',
      sub: "TRYB Loyalty est le programme de fidélisation conçu pour les commerçants indépendants — restaurants, cafés, boutiques. Simple à lancer, puissant pour fidéliser.",
      cta: 'Demander une démo gratuite',
      ctaSecondary: 'Voir comment ça marche',
    },
    features: [
      {
        title: 'Fidélisez sans effort',
        desc: 'Vos clients scannent un QR code. Vous voyez leurs visites. C\'est tout.',
      },
      {
        title: 'Comprenez ce qui fonctionne',
        desc: 'Tableau de bord temps réel : taux de retour, panier moyen, meilleurs clients.',
      },
      {
        title: 'Développez votre réseau',
        desc: 'Connectez-vous aux 1 800+ commerçants TRYB pour des offres croisées locales.',
      },
    ],
    nav: { blog: 'Blog', pricing: 'Tarifs', demo: 'Démo gratuite', privacy: 'Politique de confidentialité' },
    footer: {
      tagline: 'Le programme de fidélité digital pour les commerçants indépendants.',
      links: 'Liens utiles',
      legal: 'Mentions légales',
      contact: 'Contact',
      rgpd:
        "TRYB Loyalty traite les données de vos clients conformément au RGPD (UE 2016/679). Données collectées (email, historique) utilisées exclusivement dans le cadre du programme de fidélité. Droits d'accès, rectification, suppression à tout moment. Données hébergées en UE. DPO : rgpd@trybinternational.com.",
    },
    cookie: {
      text: "Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre",
      policy: 'politique de confidentialité',
      accept: 'Accepter',
      decline: 'Refuser',
    },
    privacyPath: '/politique-confidentialite',
    blogPath: '/blog',
    pricingPath: '/tarifs',
  },
  ma: {
    metaTitle: 'TRYB Loyalty — Programme de fidélité digital au Maroc',
    metaDescription:
      'Fidélisez vos clients au Maroc avec TRYB Loyalty. Adapté aux commerçants marocains — restaurants, cafés, boutiques. Conformité CNDP incluse.',
    hero: {
      headline: 'Fidélisez vos clients marocains avec une solution digitale simple.',
      sub: "TRYB Loyalty est conçu pour les commerçants marocains — restaurants, cafés, boutiques. Démarrez en 24h, sans investissement matériel.",
      cta: 'Demander une démo gratuite',
      ctaSecondary: 'Voir comment ça marche',
    },
    features: [
      {
        title: 'Démarrage rapide',
        desc: 'Votre programme de fidélité est opérationnel en moins de 24h. Aucun matériel requis.',
      },
      {
        title: 'Tableau de bord intelligent',
        desc: 'Suivez vos clients les plus fidèles, votre taux de rétention et vos ventes en temps réel.',
      },
      {
        title: 'Réseau TRYB Maroc',
        desc: 'Rejoignez le réseau de commerçants TRYB au Maroc et proposez des offres croisées à vos voisins.',
      },
    ],
    nav: { blog: 'Blog', pricing: 'Tarifs', demo: 'Démo gratuite', privacy: 'Politique de confidentialité' },
    footer: {
      tagline: 'Le programme de fidélité digital pour les commerçants marocains.',
      links: 'Liens utiles',
      legal: 'Mentions légales',
      contact: 'Contact',
      rgpd:
        "TRYB Loyalty traite les données de vos clients conformément au RGPD (UE 2016/679) et à la loi 09-08 relative à la protection des données personnelles au Maroc. Données collectées (email, historique) utilisées exclusivement dans le cadre du programme de fidélité. Droits d'accès, rectification, suppression à tout moment. DPO : rgpd@trybinternational.com.",
    },
    cookie: {
      text: "Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre",
      policy: 'politique de confidentialité',
      accept: 'Accepter',
      decline: 'Refuser',
    },
    privacyPath: '/politique-confidentialite',
    blogPath: '/blog',
    pricingPath: '/tarifs',
  },
  com: {
    metaTitle: 'TRYB Loyalty — Digital Loyalty Programs for Independent Businesses',
    metaDescription:
      'Turn one-time buyers into loyal regulars with TRYB Loyalty. Simple to launch, powerful to grow. For restaurants, cafés, and retail. GDPR compliant.',
    hero: {
      headline: 'Turn occasional buyers into loyal regulars.',
      sub: 'TRYB Loyalty is the digital loyalty platform built for independent businesses — restaurants, cafés, retail. Launch in under 24 hours.',
      cta: 'Request a free demo',
      ctaSecondary: 'See how it works',
    },
    features: [
      {
        title: 'Effortless loyalty',
        desc: 'Customers scan a QR code. You see their visits. That\'s it.',
      },
      {
        title: 'Real-time insights',
        desc: 'Live dashboard: return rate, average basket, top customers. Know your business at a glance.',
      },
      {
        title: 'Cross-merchant network',
        desc: 'Join 1,800+ TRYB merchants and offer cross-promotions to build local traffic.',
      },
    ],
    nav: { blog: 'Blog', pricing: 'Pricing', demo: 'Free demo', privacy: 'Privacy policy' },
    footer: {
      tagline: 'Digital loyalty programs for independent businesses.',
      links: 'Quick links',
      legal: 'Legal',
      contact: 'Contact',
      rgpd:
        'TRYB Loyalty processes customer data in compliance with GDPR (EU 2016/679). Data collected (email, transaction history) is used exclusively for loyalty program purposes. Rights to access, rectify, and delete data at any time. Data hosted in the EU. DPO: rgpd@trybinternational.com.',
    },
    cookie: {
      text: 'We use cookies to improve your experience. By continuing, you accept our',
      policy: 'privacy policy',
      accept: 'Accept',
      decline: 'Decline',
    },
    privacyPath: '/privacy-policy',
    blogPath: '/blog',
    pricingPath: '/pricing',
  },
  es: {
    metaTitle: 'TRYB Loyalty — Programa de fidelización digital para comercios',
    metaDescription:
      'Convierte compradores ocasionales en clientes fieles con TRYB Loyalty. Fácil de lanzar, potente para crecer. Restaurantes, cafés, tiendas. RGPD incluido.',
    hero: {
      headline: 'Convierte clientes ocasionales en habituales fieles.',
      sub: 'TRYB Loyalty es el programa de fidelización digital para comercios independientes — restaurantes, cafés, tiendas. En marcha en menos de 24 horas.',
      cta: 'Solicitar una demo gratuita',
      ctaSecondary: 'Ver cómo funciona',
    },
    features: [
      {
        title: 'Fidelización sin esfuerzo',
        desc: 'Tus clientes escanean un código QR. Tú ves sus visitas. Así de simple.',
      },
      {
        title: 'Panel en tiempo real',
        desc: 'Tasa de retorno, ticket medio, mejores clientes. Todo en un vistazo.',
      },
      {
        title: 'Red de comercios TRYB',
        desc: 'Únete a más de 1.800 comercios TRYB y ofrece promociones cruzadas locales.',
      },
    ],
    nav: { blog: 'Blog', pricing: 'Precios', demo: 'Demo gratuita', privacy: 'Política de privacidad' },
    footer: {
      tagline: 'Programas de fidelización digital para comercios independientes.',
      links: 'Navegación',
      legal: 'Aviso legal',
      contact: 'Contacto',
      rgpd:
        'TRYB Loyalty trata los datos de tus clientes conforme al RGPD (UE 2016/679). Datos recogidos (email, historial) utilizados exclusivamente para el programa de fidelización. Derechos de acceso, rectificación y supresión en todo momento. Datos alojados en la UE. DPD: rgpd@trybinternational.com.',
    },
    cookie: {
      text: 'Usamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra',
      policy: 'política de privacidad',
      accept: 'Aceptar',
      decline: 'Rechazar',
    },
    privacyPath: '/politica-de-privacidad',
    blogPath: '/blog',
    pricingPath: '/precios',
  },
};

// Blog posts — one per locale (more to be added by CMO)
const BLOG_POSTS = {
  fr: [
    {
      slug: 'comment-fideliser-vos-clients-en-2025',
      title: 'Comment fidéliser vos clients en 2025 : le guide pratique pour les commerçants',
      description:
        "Augmentez votre taux de rétention client avec ces stratégies éprouvées adaptées aux restaurants, cafés et boutiques indépendants en France.",
      date: '2025-12-01',
      author: 'TRYB International',
      body: `
<p>La fidélisation client est l'un des leviers de croissance les plus rentables pour un commerce indépendant. Acquérir un nouveau client coûte en moyenne 5 à 7 fois plus cher que de retenir un client existant.</p>
<h2>Pourquoi fidéliser plutôt que conquérir</h2>
<p>Un client fidèle dépense en moyenne 67 % de plus qu'un nouveau client. Il recommande votre établissement à son entourage. Il revient même si un concurrent propose une promotion.</p>
<h2>Les 3 piliers d'un programme de fidélité efficace</h2>
<h3>1. La simplicité avant tout</h3>
<p>Un programme trop complexe est un programme abandonné. Le QR code s'est imposé comme le format le plus adopté — aucune application à télécharger pour le client, aucun matériel spécifique pour le commerçant.</p>
<h3>2. La personnalisation des récompenses</h3>
<p>Offrez ce que vos clients valorisent réellement : un café offert, une réduction sur l'anniversaire, un accès prioritaire à vos nouveautés. La personnalisation augmente le taux d'engagement de 40 % selon les données TRYB.</p>
<h3>3. La mesure des résultats</h3>
<p>Ce qui ne se mesure pas ne s'améliore pas. Suivez votre taux de rétention mensuel, votre fréquence de visite moyenne et l'évolution du panier moyen des membres vs non-membres.</p>
<h2>Conclusion</h2>
<p>Un programme de fidélité digital bien conçu est votre meilleur investissement marketing pour 2025. Simple, mesurable et rentable dès le premier mois.</p>
      `.trim(),
    },
  ],
  ma: [
    {
      slug: 'fidelisation-clients-maroc-guide-2025',
      title: 'Fidélisation clients au Maroc : guide pratique pour les commerçants 2025',
      description:
        "Stratégies éprouvées pour fidéliser vos clients au Maroc — restaurants, cafés, boutiques. Adapté au marché marocain et conforme à la loi 09-08.",
      date: '2025-12-01',
      author: 'TRYB Loyalty Maroc',
      body: `
<p>Le marché du commerce de détail au Maroc est en pleine transformation digitale. Les commerçants qui adoptent des solutions numériques dès maintenant prennent une longueur d'avance durable.</p>
<h2>Le contexte marocain</h2>
<p>Avec 47 millions d'habitants et un taux de pénétration smartphone de plus de 80 %, le Maroc offre un terrain idéal pour les programmes de fidélité digitaux. Les clients marocains sont très réceptifs aux offres personnalisées.</p>
<h2>Adapter votre programme au marché local</h2>
<h3>Le QR code, standard universel</h3>
<p>Le QR code est devenu un réflexe pour les consommateurs marocains depuis 2020. Aucune application à installer — le client scanne avec son appareil photo et accumule ses points instantanément.</p>
<h3>Récompenses adaptées aux habitudes locales</h3>
<p>Offrez des récompenses en phase avec vos clients : café offert, réduction Ramadan, offre anniversaire. Les données TRYB Maroc montrent qu'un programme actif augmente la fréquence de visite de 35 % en 3 mois.</p>
<h2>Conformité loi 09-08</h2>
<p>La loi 09-08 relative à la protection des données personnelles s'applique à tout programme collectant des données client au Maroc. TRYB Loyalty est entièrement conforme : consentement explicite, données hébergées en UE, droits d'accès garantis.</p>
      `.trim(),
    },
  ],
  com: [
    {
      slug: 'how-to-build-customer-loyalty-2025',
      title: 'How to Build Customer Loyalty in 2025: A Practical Guide for Independent Businesses',
      description:
        "Boost your customer retention rate with proven loyalty strategies tailored for restaurants, cafés, and independent retail in 2025.",
      date: '2025-12-01',
      author: 'TRYB International',
      body: `
<p>Customer loyalty is the most cost-effective growth lever available to independent businesses. Acquiring a new customer costs 5–7× more than retaining an existing one — yet most marketing budgets still focus almost entirely on acquisition.</p>
<h2>Why loyalty beats acquisition</h2>
<p>Loyal customers spend 67% more on average than new ones. They refer friends. They return even when a competitor runs a promotion. A 5% increase in retention can increase profits by 25–95% according to Bain & Company research.</p>
<h2>The three pillars of an effective loyalty program</h2>
<h3>1. Frictionless enrollment</h3>
<p>If joining your program takes more than 10 seconds, most customers won't bother. QR-code-based programs have the highest adoption rates — no app download required, no card to carry, no form to fill out on a slow connection.</p>
<h3>2. Meaningful rewards</h3>
<p>Reward what your customers actually value: a free coffee, a birthday discount, early access to your new menu. TRYB data shows personalized rewards drive 40% higher engagement than generic points programs.</p>
<h3>3. Measurable outcomes</h3>
<p>Track monthly retention rate, average visit frequency, and basket size for members vs. non-members. You'll see ROI within the first month.</p>
<h2>Getting started</h2>
<p>A well-designed digital loyalty program is your best marketing investment for 2025. Simple, measurable, and profitable from day one.</p>
      `.trim(),
    },
  ],
  es: [
    {
      slug: 'como-fidelizar-clientes-2025',
      title: 'Cómo fidelizar a tus clientes en 2025: guía práctica para comercios independientes',
      description:
        "Aumenta tu tasa de retención con estrategias probadas de fidelización adaptadas a restaurantes, cafeterías y tiendas independientes en España.",
      date: '2025-12-01',
      author: 'TRYB International',
      body: `
<p>La fidelización de clientes es el motor de crecimiento más rentable para un comercio independiente. Captar un cliente nuevo cuesta entre 5 y 7 veces más que retener uno existente.</p>
<h2>Por qué fidelizar es más rentable que captar</h2>
<p>Un cliente fiel gasta de media un 67 % más que uno nuevo. Recomienda tu negocio a su entorno. Vuelve aunque la competencia lance una promoción.</p>
<h2>Los 3 pilares de un programa de fidelización eficaz</h2>
<h3>1. Máxima simplicidad</h3>
<p>Un programa complicado es un programa abandonado. El código QR se ha convertido en el estándar: sin app que instalar, sin tarjeta que llevar.</p>
<h3>2. Recompensas que importan</h3>
<p>Ofrece lo que tus clientes valoran: un café gratis, un descuento de cumpleaños, acceso anticipado a tus novedades. Los datos de TRYB muestran que las recompensas personalizadas aumentan el engagement un 40 %.</p>
<h3>3. Resultados medibles</h3>
<p>Sigue tu tasa de retención mensual, la frecuencia de visitas y el ticket medio de socios frente a no socios. El ROI es visible desde el primer mes.</p>
<h2>Conclusión</h2>
<p>Un programa de fidelización digital bien diseñado es tu mejor inversión de marketing para 2025. Simple, medible y rentable desde el día uno.</p>
      `.trim(),
    },
  ],
};

// Privacy policy content per locale
const PRIVACY = {
  fr: {
    path: 'politique-confidentialite',
    metaTitle: 'Politique de confidentialité — TRYB Loyalty',
    metaDescription: 'Politique de confidentialité et traitement des données personnelles de TRYB Loyalty, conforme au RGPD.',
    title: 'Politique de confidentialité',
    body: `
<h2>1. Responsable du traitement</h2>
<p>TRYB International, joignable à : <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a></p>
<h2>2. Données collectées</h2>
<p>Adresse e-mail, historique des visites et des achats dans le cadre du programme de fidélité. Aucune donnée sensible (RGPD Art. 9) n'est collectée.</p>
<h2>3. Finalités</h2>
<p>Les données sont utilisées exclusivement pour la gestion du programme de fidélité TRYB Loyalty (points, récompenses, communications transactionnelles).</p>
<h2>4. Base légale</h2>
<p>Consentement explicite (RGPD Art. 6.1.a) recueilli lors de l'inscription via case à cocher.</p>
<h2>5. Durée de conservation</h2>
<p>Les données sont conservées pendant la durée de la relation commerciale, puis supprimées dans un délai de 3 ans après le dernier contact.</p>
<h2>6. Hébergement</h2>
<p>Toutes les données sont hébergées dans l'Union européenne.</p>
<h2>7. Vos droits</h2>
<p>Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité. Pour exercer ces droits : <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a></p>
<h2>8. Cookies</h2>
<p>Nous utilisons des cookies fonctionnels et, avec votre consentement, des cookies analytiques. Vous pouvez retirer votre consentement à tout moment via la bannière cookies.</p>
<h2>9. Contact DPO</h2>
<p>Délégué à la Protection des Données : <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a></p>
    `.trim(),
  },
  ma: {
    path: 'politique-confidentialite',
    metaTitle: 'Politique de confidentialité — TRYB Loyalty Maroc',
    metaDescription: 'Politique de confidentialité de TRYB Loyalty conforme au RGPD et à la loi 09-08 marocaine.',
    title: 'Politique de confidentialité',
    body: `
<h2>1. Responsable du traitement</h2>
<p>TRYB International, joignable à : <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a></p>
<h2>2. Données collectées</h2>
<p>Adresse e-mail, historique des visites et des achats dans le cadre du programme de fidélité.</p>
<h2>3. Finalités</h2>
<p>Les données sont utilisées exclusivement pour la gestion du programme de fidélité TRYB Loyalty.</p>
<h2>4. Base légale</h2>
<p>Consentement explicite (RGPD Art. 6.1.a / loi 09-08 Art. 4) recueilli lors de l'inscription.</p>
<h2>5. Durée de conservation</h2>
<p>Données conservées pendant la durée de la relation commerciale, puis supprimées dans un délai de 3 ans.</p>
<h2>6. Hébergement</h2>
<p>Toutes les données sont hébergées dans l'Union européenne.</p>
<h2>7. Vos droits</h2>
<p>Conformément au RGPD et à la loi marocaine 09-08, vous disposez d'un droit d'accès, de rectification et d'effacement. Contact : <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a></p>
<h2>8. Contact DPO</h2>
<p>Délégué à la Protection des Données : <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a></p>
    `.trim(),
  },
  com: {
    path: 'privacy-policy',
    metaTitle: 'Privacy Policy — TRYB Loyalty',
    metaDescription: 'TRYB Loyalty privacy policy and GDPR-compliant data processing.',
    title: 'Privacy Policy',
    body: `
<h2>1. Data Controller</h2>
<p>TRYB International. Contact: <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a></p>
<h2>2. Data Collected</h2>
<p>Email address, visit history, and purchase history within the loyalty program. No special category data (GDPR Art. 9) is collected.</p>
<h2>3. Purposes</h2>
<p>Data is used exclusively for managing the TRYB Loyalty program (points, rewards, transactional communications).</p>
<h2>4. Legal Basis</h2>
<p>Explicit consent (GDPR Art. 6.1.a) collected at sign-up via checkbox.</p>
<h2>5. Retention</h2>
<p>Data is retained for the duration of the commercial relationship, then deleted within 3 years of the last contact.</p>
<h2>6. Hosting</h2>
<p>All data is hosted within the European Union.</p>
<h2>7. Your Rights</h2>
<p>You have rights to access, rectify, erase, object to, and port your data. Contact: <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a></p>
<h2>8. Cookies</h2>
<p>We use functional cookies and, with your consent, analytics cookies. You may withdraw consent at any time via the cookie banner.</p>
<h2>9. DPO Contact</h2>
<p>Data Protection Officer: <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a></p>
    `.trim(),
  },
  es: {
    path: 'politica-de-privacidad',
    metaTitle: 'Política de privacidad — TRYB Loyalty',
    metaDescription: 'Política de privacidad de TRYB Loyalty y tratamiento de datos conforme al RGPD.',
    title: 'Política de privacidad',
    body: `
<h2>1. Responsable del tratamiento</h2>
<p>TRYB International. Contacto: <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a></p>
<h2>2. Datos recogidos</h2>
<p>Dirección de correo electrónico, historial de visitas y compras en el programa de fidelización.</p>
<h2>3. Finalidades</h2>
<p>Los datos se utilizan exclusivamente para gestionar el programa de fidelización TRYB Loyalty (puntos, recompensas, comunicaciones transaccionales).</p>
<h2>4. Base jurídica</h2>
<p>Consentimiento explícito (RGPD Art. 6.1.a) recabado en el registro mediante casilla de verificación.</p>
<h2>5. Conservación</h2>
<p>Los datos se conservan durante la relación comercial y se eliminan en un plazo de 3 años tras el último contacto.</p>
<h2>6. Alojamiento</h2>
<p>Todos los datos se alojan en la Unión Europea.</p>
<h2>7. Tus derechos</h2>
<p>Tienes derecho de acceso, rectificación, supresión, oposición y portabilidad. Contacto: <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a></p>
<h2>8. DPD</h2>
<p>Delegado de Protección de Datos: <a href="mailto:rgpd@trybinternational.com">rgpd@trybinternational.com</a></p>
    `.trim(),
  },
};

module.exports = { SITES, HOMEPAGE, BLOG_POSTS, PRIVACY };
