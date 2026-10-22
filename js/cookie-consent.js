/* =========================================================
   PHONIX IT SOLUTIONS — COOKIE CONSENT ENGINE
   ========================================================= */

(function () {
  const STORAGE_KEY = 'phonix_cookie_consent';
  const CURRENT_VERSION = 1;

  // Default consent state structure
  const defaultConsent = {
    version: CURRENT_VERSION,
    essential: true,
    analytics: false,
    preferences: false,
    marketing: false,
    timestamp: null,
  };

  // Get consent from localStorage
  function getConsent() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.version === CURRENT_VERSION) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Cookie consent localStorage read error:', e);
    }
    return null;
  }

  // Save consent to localStorage
  function saveConsent(state) {
    try {
      const payload = {
        version: CURRENT_VERSION,
        essential: true,
        analytics: Boolean(state.analytics),
        preferences: Boolean(state.preferences),
        marketing: Boolean(state.marketing),
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      applyConsentHooks(payload);
      return payload;
    } catch (e) {
      console.warn('Cookie consent localStorage write error:', e);
    }
  }

  // Public helper: check if specific category has consent
  window.hasConsent = function (category) {
    if (category === 'essential') return true;
    const consent = getConsent();
    return Boolean(consent && consent[category]);
  };

  // Consent Hooks
  function applyConsentHooks(consent) {
    if (!consent) return;

    if (consent.analytics) {
      if (typeof window.loadAnalytics === 'function') {
        window.loadAnalytics();
      }
    }

    if (consent.marketing) {
      if (typeof window.loadMarketing === 'function') {
        window.loadMarketing();
      }
    }

    if (consent.preferences) {
      if (typeof window.loadPreferences === 'function') {
        window.loadPreferences();
      }
    }
  }

  // DOM Elements Injection
  function renderConsentUI() {
    if (document.getElementById('pheonix-cookie-banner')) return;

    // Cookie Banner HTML
    const bannerHTML = `
      <div class="cookie-banner-wrap" id="pheonix-cookie-banner" role="region" aria-label="Cookie Privacy Banner">
        <div class="cookie-banner-inner">
          <div class="cookie-banner-content">
            <div class="cookie-icon-badge">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
              </svg>
            </div>
            <div class="cookie-banner-text">
              <h3>Your Privacy Matters</h3>
              <p>We use cookies to keep our website running securely, analyze visitor traffic, and improve your user experience.</p>
            </div>
          </div>
          <div class="cookie-banner-actions">
            <button type="button" class="cookie-btn cookie-btn-manage" id="btn-cookie-manage">
              Cookie Preferences
            </button>
            <button type="button" class="cookie-btn cookie-btn-reject" id="btn-cookie-reject">
              Reject Optional
            </button>
            <button type="button" class="cookie-btn cookie-btn-accept" id="btn-cookie-accept">
              Accept All
            </button>
          </div>
        </div>
      </div>
    `;

    // Preferences Modal HTML
    const modalHTML = `
      <div class="cookie-modal-backdrop" id="pheonix-cookie-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title-pref" style="display:none;">
        <div class="cookie-modal-box">
          <div class="cookie-modal-header">
            <div class="cookie-modal-title-wrap">
              <div class="cookie-icon-badge modal-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.27.1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.27-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 id="modal-title-pref">Privacy Preferences</h3>
                <p>Customize your cookie consent options below</p>
              </div>
            </div>
            <button type="button" class="cookie-modal-close" id="btn-modal-close" aria-label="Close preferences modal">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="cookie-modal-body">
            <div class="cookie-option-card">
              <div class="cookie-option-info">
                <div class="cookie-option-title">
                  <span>Essential Cookies</span>
                  <span class="cookie-badge-req">Required</span>
                </div>
                <p>Required for fundamental site functions like secure login, navigation, and core operations.</p>
              </div>
              <div class="cookie-switch-wrap">
                <input type="checkbox" id="pref-essential" checked disabled class="cookie-switch-input" />
                <label for="pref-essential" class="cookie-switch-label disabled"></label>
              </div>
            </div>

            <div class="cookie-option-card">
              <div class="cookie-option-info">
                <div class="cookie-option-title">
                  <span>Analytics Cookies</span>
                </div>
                <p>Helps us understand how visitors interact with the site to optimize performance and navigation.</p>
              </div>
              <div class="cookie-switch-wrap">
                <input type="checkbox" id="pref-analytics" class="cookie-switch-input" />
                <label for="pref-analytics" class="cookie-switch-label"></label>
              </div>
            </div>

            <div class="cookie-option-card">
              <div class="cookie-option-info">
                <div class="cookie-option-title">
                  <span>Preference Cookies</span>
                </div>
                <p>Enables the website to remember choices you make for a customized experience.</p>
              </div>
              <div class="cookie-switch-wrap">
                <input type="checkbox" id="pref-preferences" class="cookie-switch-input" />
                <label for="pref-preferences" class="cookie-switch-label"></label>
              </div>
            </div>

            <div class="cookie-option-card">
              <div class="cookie-option-info">
                <div class="cookie-option-title">
                  <span>Marketing Cookies</span>
                </div>
                <p>Used to provide relevant insights, communications, and tailored solutions.</p>
              </div>
              <div class="cookie-switch-wrap">
                <input type="checkbox" id="pref-marketing" class="cookie-switch-input" />
                <label for="pref-marketing" class="cookie-switch-label"></label>
              </div>
            </div>
          </div>

          <div class="cookie-modal-footer">
            <button type="button" class="cookie-btn cookie-btn-reject" id="btn-modal-reject-all">Reject All</button>
            <button type="button" class="cookie-btn cookie-btn-accept" id="btn-modal-save">Save Preferences</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', bannerHTML);
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    attachEventHandlers();
  }

  // Attach Event Handlers
  function attachEventHandlers() {
    const banner = document.getElementById('pheonix-cookie-banner');
    const modal = document.getElementById('pheonix-cookie-modal');

    // Banner Buttons
    const btnAccept = document.getElementById('btn-cookie-accept');
    const btnReject = document.getElementById('btn-cookie-reject');
    const btnManage = document.getElementById('btn-cookie-manage');

    if (btnAccept) {
      btnAccept.addEventListener('click', () => {
        saveConsent({ essential: true, analytics: true, preferences: true, marketing: true });
        hideBanner();
      });
    }

    if (btnReject) {
      btnReject.addEventListener('click', () => {
        saveConsent({ essential: true, analytics: false, preferences: false, marketing: false });
        hideBanner();
      });
    }

    if (btnManage) {
      btnManage.addEventListener('click', () => {
        openModal();
      });
    }

    // Modal Buttons
    const btnClose = document.getElementById('btn-modal-close');
    const btnSave = document.getElementById('btn-modal-save');
    const btnRejectAll = document.getElementById('btn-modal-reject-all');

    if (btnClose) {
      btnClose.addEventListener('click', () => {
        closeModal();
      });
    }

    if (btnRejectAll) {
      btnRejectAll.addEventListener('click', () => {
        saveConsent({ essential: true, analytics: false, preferences: false, marketing: false });
        closeModal();
        hideBanner();
      });
    }

    if (btnSave) {
      btnSave.addEventListener('click', () => {
        const state = {
          essential: true,
          analytics: document.getElementById('pref-analytics').checked,
          preferences: document.getElementById('pref-preferences').checked,
          marketing: document.getElementById('pref-marketing').checked,
        };
        saveConsent(state);
        closeModal();
        hideBanner();
      });
    }

    // Close on backdrop click
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }
  }

  function hideBanner() {
    const banner = document.getElementById('pheonix-cookie-banner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(100%)';
      setTimeout(() => banner.remove(), 350);
    }
  }

  function openModal() {
    const modal = document.getElementById('pheonix-cookie-modal');
    if (!modal) return;

    const consent = getConsent() || defaultConsent;
    document.getElementById('pref-analytics').checked = Boolean(consent.analytics);
    document.getElementById('pref-preferences').checked = Boolean(consent.preferences);
    document.getElementById('pref-marketing').checked = Boolean(consent.marketing);

    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
  }

  function closeModal() {
    const modal = document.getElementById('pheonix-cookie-modal');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 250);
  }

  // Public preference opener
  window.openCookiePreferences = function (e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    openModal();
  };

  // Initialization
  function init() {
    const existingConsent = getConsent();
    if (existingConsent) {
      applyConsentHooks(existingConsent);
    } else {
      renderConsentUI();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
