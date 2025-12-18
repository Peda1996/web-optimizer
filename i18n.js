// --- Internationalization Module ---

const i18n = {
    currentLang: 'en',
    translations: {},
    supportedLangs: ['en', 'de', 'fr', 'es', 'it', 'pt'],

    // Inline fallback translations (for file:// protocol)
    fallbackTranslations: {
        en: {
            app: { title: "Web Optimizer Pro", subtitle: "Advanced Local Image Processor", pageTitle: "Web Image Optimizer & Converter Pro" },
            header: { clearList: "Clear List", downloadZip: "Download ZIP" },
            settings: { title: "Configuration", outputFormat: "Output Format", formatWebp: "WebP (Recommended)", formatAvif: "AVIF (Best Compression)", formatJpeg: "JPEG (Universal)", formatPng: "PNG (Lossless)", optimizationMode: "Optimization Mode", modeQuality: "By Quality", modeSize: "Target Size", qualityLevel: "Quality Level", maxFileSize: "Max File Size (KB)", targetSizeHint: "App calculates best quality to fit size. Processing will be slower.", resizeWidth: "Max Width", resizeHeight: "Max Height", resizeWidthPlaceholder: "Original", resizeHeightPlaceholder: "Auto", presets: "Presets", presetCustom: "Custom", presetLow: "Economy", presetMedium: "Balanced", presetHigh: "High Quality", presetMax: "Maximum", fileNaming: "File Naming", prefix: "Prefix", suffix: "Suffix" },
            privacy: { title: "Privacy Secure", description: "Processing is 100% local. Your images never leave this device." },
            dropzone: { title: "Drop images here", description: "Drag & drop files or click to browse.", formats: "Supports JPG, PNG, WEBP, AVIF, BMP, GIF" },
            results: { title: "Results", fileInfo: "File Info", state: "State", optimization: "Optimization", action: "Action", download: "Download", downloadAll: "Download All", clear: "Clear", preview: "Preview" },
            status: { processing: "Processing", tuning: "Tuning...", ready: "Ready", failed: "Failed" },
            stats: { original: "Original", total: "Total:", saved: "Saved", added: "Added" },
            alerts: { pngTargetSize: "Target size optimization is not available for PNG (Lossless). Switched to JPEG." },
            footer: { madeBy: "Made with", by: "by", forProject: "for" },
            theme: { light: "Light", dark: "Dark", toggle: "Toggle theme" },
            preview: { title: "Comparison", before: "Before", after: "After", close: "Close" }
        },
        de: {
            app: { title: "Web Optimizer Pro", subtitle: "Lokale Bildverarbeitung", pageTitle: "Web Bild-Optimierer & Konverter Pro" },
            header: { clearList: "Liste leeren", downloadZip: "ZIP herunterladen" },
            settings: { title: "Einstellungen", outputFormat: "Ausgabeformat", formatWebp: "WebP (Empfohlen)", formatAvif: "AVIF (Beste Kompression)", formatJpeg: "JPEG (Universal)", formatPng: "PNG (Verlustfrei)", optimizationMode: "Optimierungsmodus", modeQuality: "Nach Qualität", modeSize: "Zielgröße", qualityLevel: "Qualitätsstufe", maxFileSize: "Max. Dateigröße (KB)", targetSizeHint: "App berechnet beste Qualität für Zielgröße. Verarbeitung dauert länger.", resizeWidth: "Max. Breite", resizeHeight: "Max. Höhe", resizeWidthPlaceholder: "Original", resizeHeightPlaceholder: "Auto", presets: "Voreinstellungen", presetCustom: "Benutzerdefiniert", presetLow: "Sparsam", presetMedium: "Ausgewogen", presetHigh: "Hohe Qualität", presetMax: "Maximum", fileNaming: "Dateinamen", prefix: "Präfix", suffix: "Suffix" },
            privacy: { title: "Datenschutz gesichert", description: "Verarbeitung erfolgt 100% lokal. Ihre Bilder verlassen dieses Gerät nicht." },
            dropzone: { title: "Bilder hier ablegen", description: "Dateien hierher ziehen oder klicken zum Durchsuchen.", formats: "Unterstützt JPG, PNG, WEBP, AVIF, BMP, GIF" },
            results: { title: "Ergebnisse", fileInfo: "Dateiinfo", state: "Status", optimization: "Optimierung", action: "Aktion", download: "Herunterladen", downloadAll: "Alle herunterladen", clear: "Leeren", preview: "Vorschau" },
            status: { processing: "Verarbeitung", tuning: "Anpassen...", ready: "Fertig", failed: "Fehlgeschlagen" },
            stats: { original: "Original", total: "Gesamt:", saved: "Gespart", added: "Hinzugefügt" },
            alerts: { pngTargetSize: "Zielgrößen-Optimierung ist für PNG (Verlustfrei) nicht verfügbar. Auf JPEG umgeschaltet." },
            footer: { madeBy: "Erstellt mit", by: "von", forProject: "für" },
            theme: { light: "Hell", dark: "Dunkel", toggle: "Thema wechseln" },
            preview: { title: "Vergleich", before: "Vorher", after: "Nachher", close: "Schließen" }
        },
        fr: {
            app: { title: "Web Optimizer Pro", subtitle: "Traitement d'images local", pageTitle: "Optimiseur et Convertisseur d'Images Web Pro" },
            header: { clearList: "Vider la liste", downloadZip: "Télécharger ZIP" },
            settings: { title: "Configuration", outputFormat: "Format de sortie", formatWebp: "WebP (Recommandé)", formatAvif: "AVIF (Meilleure compression)", formatJpeg: "JPEG (Universel)", formatPng: "PNG (Sans perte)", optimizationMode: "Mode d'optimisation", modeQuality: "Par qualité", modeSize: "Taille cible", qualityLevel: "Niveau de qualité", maxFileSize: "Taille max (Ko)", targetSizeHint: "L'app calcule la meilleure qualité pour la taille. Traitement plus lent.", resizeWidth: "Largeur max", resizeHeight: "Hauteur max", resizeWidthPlaceholder: "Original", resizeHeightPlaceholder: "Auto", presets: "Préréglages", presetCustom: "Personnalisé", presetLow: "Économique", presetMedium: "Équilibré", presetHigh: "Haute qualité", presetMax: "Maximum", fileNaming: "Nommage des fichiers", prefix: "Préfixe", suffix: "Suffixe" },
            privacy: { title: "Confidentialité", description: "Traitement 100% local. Vos images ne quittent jamais cet appareil." },
            dropzone: { title: "Déposez les images ici", description: "Glissez-déposez ou cliquez pour parcourir.", formats: "Supporte JPG, PNG, WEBP, AVIF, BMP, GIF" },
            results: { title: "Résultats", fileInfo: "Fichier", state: "État", optimization: "Optimisation", action: "Action", download: "Télécharger", downloadAll: "Tout télécharger", clear: "Effacer", preview: "Aperçu" },
            status: { processing: "Traitement", tuning: "Ajustement...", ready: "Prêt", failed: "Échec" },
            stats: { original: "Original", total: "Total:", saved: "Économisé", added: "Ajouté" },
            alerts: { pngTargetSize: "L'optimisation par taille n'est pas disponible pour PNG. Basculé sur JPEG." },
            footer: { madeBy: "Créé avec", by: "par", forProject: "pour" },
            theme: { light: "Clair", dark: "Sombre", toggle: "Changer le thème" },
            preview: { title: "Comparaison", before: "Avant", after: "Après", close: "Fermer" }
        },
        es: {
            app: { title: "Web Optimizer Pro", subtitle: "Procesador de imágenes local", pageTitle: "Optimizador y Conversor de Imágenes Web Pro" },
            header: { clearList: "Limpiar lista", downloadZip: "Descargar ZIP" },
            settings: { title: "Configuración", outputFormat: "Formato de salida", formatWebp: "WebP (Recomendado)", formatAvif: "AVIF (Mejor compresión)", formatJpeg: "JPEG (Universal)", formatPng: "PNG (Sin pérdida)", optimizationMode: "Modo de optimización", modeQuality: "Por calidad", modeSize: "Tamaño objetivo", qualityLevel: "Nivel de calidad", maxFileSize: "Tamaño máx (KB)", targetSizeHint: "La app calcula la mejor calidad para el tamaño. Procesamiento más lento.", resizeWidth: "Ancho máximo", resizeHeight: "Alto máximo", resizeWidthPlaceholder: "Original", resizeHeightPlaceholder: "Auto", presets: "Preajustes", presetCustom: "Personalizado", presetLow: "Económico", presetMedium: "Equilibrado", presetHigh: "Alta calidad", presetMax: "Máximo", fileNaming: "Nombres de archivo", prefix: "Prefijo", suffix: "Sufijo" },
            privacy: { title: "Privacidad", description: "Procesamiento 100% local. Tus imágenes nunca salen de este dispositivo." },
            dropzone: { title: "Arrastra imágenes aquí", description: "Arrastra y suelta o haz clic para explorar.", formats: "Soporta JPG, PNG, WEBP, AVIF, BMP, GIF" },
            results: { title: "Resultados", fileInfo: "Archivo", state: "Estado", optimization: "Optimización", action: "Acción", download: "Descargar", downloadAll: "Descargar todo", clear: "Limpiar", preview: "Vista previa" },
            status: { processing: "Procesando", tuning: "Ajustando...", ready: "Listo", failed: "Error" },
            stats: { original: "Original", total: "Total:", saved: "Ahorrado", added: "Añadido" },
            alerts: { pngTargetSize: "La optimización por tamaño no está disponible para PNG. Cambiado a JPEG." },
            footer: { madeBy: "Hecho con", by: "por", forProject: "para" },
            theme: { light: "Claro", dark: "Oscuro", toggle: "Cambiar tema" },
            preview: { title: "Comparación", before: "Antes", after: "Después", close: "Cerrar" }
        },
        it: {
            app: { title: "Web Optimizer Pro", subtitle: "Elaborazione immagini locale", pageTitle: "Ottimizzatore e Convertitore Immagini Web Pro" },
            header: { clearList: "Svuota lista", downloadZip: "Scarica ZIP" },
            settings: { title: "Configurazione", outputFormat: "Formato di output", formatWebp: "WebP (Consigliato)", formatAvif: "AVIF (Migliore compressione)", formatJpeg: "JPEG (Universale)", formatPng: "PNG (Senza perdita)", optimizationMode: "Modalità ottimizzazione", modeQuality: "Per qualità", modeSize: "Dimensione target", qualityLevel: "Livello qualità", maxFileSize: "Dimensione max (KB)", targetSizeHint: "L'app calcola la migliore qualità per la dimensione. Elaborazione più lenta.", resizeWidth: "Larghezza max", resizeHeight: "Altezza max", resizeWidthPlaceholder: "Originale", resizeHeightPlaceholder: "Auto", presets: "Preset", presetCustom: "Personalizzato", presetLow: "Economico", presetMedium: "Bilanciato", presetHigh: "Alta qualità", presetMax: "Massimo", fileNaming: "Nomi file", prefix: "Prefisso", suffix: "Suffisso" },
            privacy: { title: "Privacy", description: "Elaborazione 100% locale. Le tue immagini non lasciano mai questo dispositivo." },
            dropzone: { title: "Trascina le immagini qui", description: "Trascina e rilascia o clicca per sfogliare.", formats: "Supporta JPG, PNG, WEBP, AVIF, BMP, GIF" },
            results: { title: "Risultati", fileInfo: "File", state: "Stato", optimization: "Ottimizzazione", action: "Azione", download: "Scarica", downloadAll: "Scarica tutto", clear: "Cancella", preview: "Anteprima" },
            status: { processing: "Elaborazione", tuning: "Regolazione...", ready: "Pronto", failed: "Fallito" },
            stats: { original: "Originale", total: "Totale:", saved: "Risparmiato", added: "Aggiunto" },
            alerts: { pngTargetSize: "L'ottimizzazione per dimensione non è disponibile per PNG. Passato a JPEG." },
            footer: { madeBy: "Creato con", by: "da", forProject: "per" },
            theme: { light: "Chiaro", dark: "Scuro", toggle: "Cambia tema" },
            preview: { title: "Confronto", before: "Prima", after: "Dopo", close: "Chiudi" }
        },
        pt: {
            app: { title: "Web Optimizer Pro", subtitle: "Processador de imagens local", pageTitle: "Otimizador e Conversor de Imagens Web Pro" },
            header: { clearList: "Limpar lista", downloadZip: "Baixar ZIP" },
            settings: { title: "Configuração", outputFormat: "Formato de saída", formatWebp: "WebP (Recomendado)", formatAvif: "AVIF (Melhor compressão)", formatJpeg: "JPEG (Universal)", formatPng: "PNG (Sem perdas)", optimizationMode: "Modo de otimização", modeQuality: "Por qualidade", modeSize: "Tamanho alvo", qualityLevel: "Nível de qualidade", maxFileSize: "Tamanho máx (KB)", targetSizeHint: "O app calcula a melhor qualidade para o tamanho. Processamento mais lento.", resizeWidth: "Largura máxima", resizeHeight: "Altura máxima", resizeWidthPlaceholder: "Original", resizeHeightPlaceholder: "Auto", presets: "Predefinições", presetCustom: "Personalizado", presetLow: "Econômico", presetMedium: "Equilibrado", presetHigh: "Alta qualidade", presetMax: "Máximo", fileNaming: "Nomes de arquivo", prefix: "Prefixo", suffix: "Sufixo" },
            privacy: { title: "Privacidade", description: "Processamento 100% local. Suas imagens nunca saem deste dispositivo." },
            dropzone: { title: "Arraste imagens aqui", description: "Arraste e solte ou clique para procurar.", formats: "Suporta JPG, PNG, WEBP, AVIF, BMP, GIF" },
            results: { title: "Resultados", fileInfo: "Arquivo", state: "Estado", optimization: "Otimização", action: "Ação", download: "Baixar", downloadAll: "Baixar tudo", clear: "Limpar", preview: "Visualizar" },
            status: { processing: "Processando", tuning: "Ajustando...", ready: "Pronto", failed: "Falhou" },
            stats: { original: "Original", total: "Total:", saved: "Economizado", added: "Adicionado" },
            alerts: { pngTargetSize: "Otimização por tamanho não disponível para PNG. Alterado para JPEG." },
            footer: { madeBy: "Feito com", by: "por", forProject: "para" },
            theme: { light: "Claro", dark: "Escuro", toggle: "Alternar tema" },
            preview: { title: "Comparação", before: "Antes", after: "Depois", close: "Fechar" }
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
