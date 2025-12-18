// --- Internationalization Module ---

const i18n = {
    currentLang: 'en',
    translations: {},
    supportedLangs: ['en', 'de'],

    async init() {
        // Detect browser language or use stored preference
        const stored = localStorage.getItem('app-language');
        const browserLang = navigator.language.split('-')[0];

        if (stored && this.supportedLangs.includes(stored)) {
            this.currentLang = stored;
        } else if (this.supportedLangs.includes(browserLang)) {
            this.currentLang = browserLang;
        }

        await this.loadTranslations(this.currentLang);
        this.applyTranslations();
        this.updateLangSelector();
    },

    async loadTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to English
            if (lang !== 'en') {
                await this.loadTranslations('en');
            }
        }
    },

    async setLanguage(lang) {
        if (!this.supportedLangs.includes(lang)) return;

        this.currentLang = lang;
        localStorage.setItem('app-language', lang);
        await this.loadTranslations(lang);
        this.applyTranslations();
        this.updateLangSelector();

        // Update page title
        document.title = this.t('app.pageTitle');
    },

    t(key, replacements = {}) {
        const keys = key.split('.');
        let value = this.translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }

        // Handle replacements like {count}
        if (typeof value === 'string') {
            for (const [placeholder, replacement] of Object.entries(replacements)) {
                value = value.replace(new RegExp(`{${placeholder}}`, 'g'), replacement);
            }
        }

        return value;
    },

    applyTranslations() {
        // Apply to elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);

            if (translation !== key) {
                el.textContent = translation;
            }
        });

        // Apply to elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);

            if (translation !== key) {
                el.placeholder = translation;
            }
        });

        // Apply to elements with data-i18n-title attribute
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const translation = this.t(key);

            if (translation !== key) {
                el.title = translation;
            }
        });

        // Update page title
        document.title = this.t('app.pageTitle');
    },

    updateLangSelector() {
        const selector = document.getElementById('langSelect');
        if (selector) {
            selector.value = this.currentLang;
        }
    }
};

// Export for use in other modules
window.i18n = i18n;
