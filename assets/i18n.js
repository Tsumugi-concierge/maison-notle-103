/* Shared i18n runtime for 6 languages across all pages
 * Supported: en, ja, zh (Simplified), ko, fr, es
 * Features: persistence in localStorage, browser-language default,
 * applies [data-i18n] texts, and syncs .lang-btn active state.
 */
(function(){
  const SUPPORTED = ['en','ja','zh','ko','fr','es'];
  const STORAGE_KEY = 'siteLang';

  function normalize(lang){
    if(!lang) return null;
    const l = String(lang).toLowerCase();
    if(l.startsWith('en')) return 'en';
    if(l.startsWith('ja')) return 'ja';
    if(l.startsWith('zh')) return 'zh'; // Simplified Chinese is our default mapping
    if(l.startsWith('ko')) return 'ko';
    if(l.startsWith('fr')) return 'fr';
    if(l.startsWith('es')) return 'es';
    return null;
  }

  function getDict(){
    // Accept any of the per-page globals without forcing refactors
    return (window.I18N_STRINGS || window.UI_STRINGS || window.STRINGS || window.S) || null;
  }

  function applyTranslations(lang){
    const dict = getDict();
    const t = dict && dict[lang];
    if(!t) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(key in t){
        if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          // If inputs later use placeholders
          el.placeholder = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });
  }

  function highlightActive(lang){
    const target = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      let code = btn.getAttribute('data-lang') || '';
      if(!code){
        const oc = btn.getAttribute('onclick') || '';
        const m = oc.match(/setLang\(['"]([a-zA-Z-]+)['"]/);
        if(m) code = m[1];
      }
      if(!code){
        // Fallback: infer from visible code in button text (e.g. "EN")
        const txt = (btn.textContent || '').trim().toUpperCase();
        const short = target.toUpperCase().split('-')[0];
        if(txt.includes(short)) code = target;
      }
      btn.classList.toggle('active', normalize(code) === target);
    });
  }

  function setLang(lang, btn){
    const n = normalize(lang) || 'en';
    window.currentLang = n; // expose for pages that read it
    try { localStorage.setItem(STORAGE_KEY, n); } catch {}
    applyTranslations(n);
    document.documentElement.lang = n;
    highlightActive(n);
    const ev = new CustomEvent('i18n:change', { detail: { lang: n } });
    document.dispatchEvent(ev);
  }

  // Expose globals expected by existing markup
  window.setLang = setLang;
  window.i18n = {
    setLang,
    apply: applyTranslations,
    getLanguage: () => window.currentLang,
  };

  function detectInitial(){
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch {}
    let lang = normalize(saved);
    if(!lang){
      const prefs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']);
      for(const l of prefs){
        const n = normalize(l);
        if(n){ lang = n; break; }
      }
      if(!lang) lang = 'en';
    }
    window.currentLang = lang;
    applyTranslations(lang);
    document.documentElement.lang = lang;
    highlightActive(lang);
    const ev = new CustomEvent('i18n:ready', { detail: { lang } });
    document.dispatchEvent(ev);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Auto-bind buttons that declare data-lang but not onclick
    document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
      if(!btn.getAttribute('onclick')){
        btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang'), btn));
      }
    });
    detectInitial();
  });
})();
