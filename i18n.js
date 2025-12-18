// --- Internationalization Module ---

const i18n = {
    currentLang: 'en',
    translations: {},
    supportedLangs: ['en', 'de'],

    // Inline fallback translations (for file:// protocol)
    fallbackTranslations: {
        en: {
            app: { title: "Web Optimizer Pro", subtitle: "Advanced Local Image Processor", pageTitle: "Web Image Optimizer & Converter Pro" },
            header: { clearList: "Clear List", downloadZip: "Download ZIP" },
            settings: { title: "Configuration", outputFormat: "Output Format", formatWebp: "WebP (Recommended)", formatAvif: "AVIF (Best Compression)", formatJpeg: "JPEG (Universal)", formatPng: "PNG (Lossless)", optimizationMode: "Optimization Mode", modeQuality: "By Quality", modeSize: "Target Size", qualityLevel: "Quality Level", maxFileSize: "Max File Size (KB)", targetSizeHint: "App calculates best quality to fit size. Processing will be slower.", resizeWidth: "Resize Width", resizeWidthPlaceholder: "Original" },
            privacy: { title: "Privacy Secure", description: "Processing is 100% local. Your images never leave this device." },
            dropzone: { title: "Drop images here", description: "Drag & drop files or click to browse.", formats: "Supports JPG, PNG, WEBP, AVIF, BMP, GIF" },
            results: { title: "Results", fileInfo: "File Info", state: "State", optimization: "Optimization", action: "Action", download: "Download", downloadAll: "Download All", clear: "Clear" },
            status: { processing: "Processing", tuning: "Tuning...", ready: "Ready", failed: "Failed" },
            stats: { original: "Original", total: "Total:", saved: "Saved", added: "Added" },
            alerts: { pngTargetSize: "Target size optimization is not available for PNG (Lossless). Switched to JPEG." },
            footer: { madeBy: "Made with", by: "by", forProject: "for" }
        },
        de: {
            app: { title: "Web Optimizer Pro", subtitle: "Lokale Bildverarbeitung", pageTitle: "Web Bild-Optimierer & Konverter Pro" },
            header: { clearList: "Liste leeren", downloadZip: "ZIP herunterladen" },
            settings: { title: "Einstellungen", outputFormat: "Ausgabeformat", formatWebp: "WebP (Empfohlen)", formatAvif: "AVIF (Beste Kompression)", formatJpeg: "JPEG (Universal)", formatPng: "PNG (Verlustfrei)", optimizationMode: "Optimierungsmodus", modeQuality: "Nach Qualität", modeSize: "Zielgröße", qualityLevel: "Qualitätsstufe", maxFileSize: "Max. Dateigröße (KB)", targetSizeHint: "App berechnet beste Qualität für Zielgröße. Verarbeitung dauert länger.", resizeWidth: "Breite ändern", resizeWidthPlaceholder: "Original" },
            privacy: { title: "Datenschutz gesichert", description: "Verarbeitung erfolgt 100% lokal. Ihre Bilder verlassen dieses Gerät nicht." },
            dropzone: { title: "Bilder hier ablegen", description: "Dateien hierher ziehen oder klicken zum Durchsuchen.", formats: "Unterstützt JPG, PNG, WEBP, AVIF, BMP, GIF" },
            results: { title: "Ergebnisse", fileInfo: "Dateiinfo", state: "Status", optimization: "Optimierung", action: "Aktion", download: "Herunterladen", downloadAll: "Alle herunterladen", clear: "Leeren" },
            status: { processing: "Verarbeitung", tuning: "Anpassen...", ready: "Fertig", failed: "Fehlgeschlagen" },
            stats: { original: "Original", total: "Gesamt:", saved: "Gespart", added: "Hinzugefügt" },
            alerts: { pngTargetSize: "Zielgrößen-Optimierung ist für PNG (Verlustfrei) nicht verfügbar. Auf JPEG umgeschaltet." },
            footer: { madeBy: "Erstellt mit", by: "von", forProject: "für" }
        }
    },

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
            console.warn('Could not fetch translations, using fallback:', error.message);
            // Use inline fallback translations
            this.translations = this.fallbackTranslations[lang] || this.fallbackTranslations['en'];
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
