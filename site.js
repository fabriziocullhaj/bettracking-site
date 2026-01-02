(function () {
  const supported = ['en', 'it', 'es', 'fr', 'de', 'pt', 'sq'];
  const select = document.querySelector('[data-lang-select]');
  if (!select) return;

  const path = window.location.pathname;
  const match = path.match(/\/(privacy|terms|account-deletion)\/\1-([a-z]{2})\.html$/);
  const isIndex = path === '/' || path.endsWith('/index.html');
  const isAccountDeletionIndex =
    path.endsWith('/account-deletion/') || path.endsWith('/account-deletion/index.html');

  let currentLang = 'en';
  if (match && match[2]) {
    currentLang = match[2];
  } else {
    const navLang = (navigator.language || 'en').split('-')[0];
    if (supported.includes(navLang)) {
      currentLang = navLang;
    }
  }

  select.value = currentLang;

  const translations = {
    en: {
      site_title: 'Bet Tracking',
      privacy: 'Privacy Policy',
      terms: 'Terms and Conditions',
      account_deletion: 'Account Deletion',
    },
    it: {
      site_title: 'Bet Tracking',
      privacy: 'Privacy',
      terms: 'Termini e condizioni',
      account_deletion: 'Eliminazione account',
    },
    es: {
      site_title: 'Bet Tracking',
      privacy: 'Privacidad',
      terms: 'Terminos y condiciones',
      account_deletion: 'Eliminacion de cuenta',
    },
    fr: {
      site_title: 'Bet Tracking',
      privacy: 'Confidentialite',
      terms: 'Conditions generales',
      account_deletion: 'Suppression de compte',
    },
    de: {
      site_title: 'Bet Tracking',
      privacy: 'Datenschutz',
      terms: 'Allgemeine Geschaftsbedingungen',
      account_deletion: 'Konto loschen',
    },
    pt: {
      site_title: 'Bet Tracking',
      privacy: 'Privacidade',
      terms: 'Termos e condicoes',
      account_deletion: 'Exclusao de conta',
    },
    sq: {
      site_title: 'Bet Tracking',
      privacy: 'Privatesia',
      terms: 'Termat dhe kushtet',
      account_deletion: 'Fshirja e llogarise',
    },
  };

  function applyTranslations(lang) {
    const strings = translations[lang] || translations.en;
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (strings[key]) node.textContent = strings[key];
    });
  }

  function updateIndexLinks(lang) {
    const privacy = document.querySelector('[data-link="privacy"]');
    const terms = document.querySelector('[data-link="terms"]');
    const deletion = document.querySelector('[data-link="account-deletion"]');
    if (privacy) privacy.href = `/privacy/privacy-${lang}.html`;
    if (terms) terms.href = `/terms/terms-${lang}.html`;
    if (deletion) deletion.href = `/account-deletion/account-deletion-${lang}.html`;
  }

  if (isIndex) {
    applyTranslations(currentLang);
    updateIndexLinks(currentLang);
  }

  select.addEventListener('change', () => {
    const lang = select.value;
    if (match && match[1]) {
      const section = match[1];
      window.location.href = `/${section}/${section}-${lang}.html`;
      return;
    }

    if (isAccountDeletionIndex) {
      window.location.href = `/account-deletion/account-deletion-${lang}.html`;
      return;
    }

    if (isIndex) {
      applyTranslations(lang);
      updateIndexLinks(lang);
    }
  });
})();
