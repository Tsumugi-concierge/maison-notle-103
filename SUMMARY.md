Summary of 6-language i18n implementation for Maison Notle 103 manual site

What was done

- Implemented a single-page i18n system across all pages, keeping URLs unchanged and avoiding per-language page copies.
- Added shared assets:
  - assets/i18n.js: shared language runtime handling 6 languages (EN, JA, ZH [Simplified], KO, FR, ES), localStorage persistence, browser-language default on first visit, and applying [data-i18n] strings. It also synchronizes the active state of .lang-btn buttons and exposes setLang for existing markup.
  - assets/i18n.css: minimal shared styles for language buttons without changing page-specific designs.
- Updated all pages to include the shared assets and to rely on the shared runtime instead of per-page i18n functions:
  - index.html
  - access/index.html
  - taxi/index.html
  - gas-reset/index.html
  - nearby-shops/index.html
  - trash/index.html
  - emergency/index.html
  - house-rules/index.html
  - how-to-open/index.html
  - equipment/index.html
  - parking/index.html (previously missing i18n; added language bar and basic translations)
- Preserved existing translation keys and content; only removed duplicate per-page i18n logic. Dictionaries (S/STRINGS/UI_STRINGS) are still defined per page and consumed by the shared i18n.
- Language selection now persists across pages via localStorage and defaults to the browser language on first visit if supported; otherwise English.

Uncommitted change kept

- index.html already contained address translations and inline i18n work. These were preserved. The shared i18n now initializes and applies them; inline per-page i18n functions were removed and replaced by lightweight event listeners.

Access code policy

- To comply with “NEVER include key numbers, lock codes, keybox codes, or any access codes,” the Wi‑Fi password previously visible on index.html was removed from the UI and from QR generation.
  - Display now shows a neutral, translated placeholder: “Provided in your booking messages.”
  - The QR button shows a localized toast that the QR will be available after check-in when no password is present.
- No other access codes were found in the content. The “How to Open” page references that door/box codes will be sent after registration, without including actual values — this is compliant.

Notes

- Buttons continue to use existing markup (either onclick="setLang('xx', this)" or data-lang="xx"). The shared runtime supports both and manages the active state and persistence.
- Dynamic pages (equipment) re-render their content on i18n:ready and i18n:change events to reflect the selected language.
