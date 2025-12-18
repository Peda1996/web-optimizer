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
            settings: { title: "Configuration", outputFormat: "Output Format", formatWebp: "WebP (Recommended)", formatAvif: "AVIF (Best Compression)", formatJpeg: "JPEG (Universal)", formatPng: "PNG (Lossless)", formatHint: "WebP offers the best balance of quality and file size for web use.", optimizationMode: "Optimization Mode", modeQuality: "By Quality", modeSize: "Target Size", qualityLevel: "Quality Level", qualityHint: "Higher = better quality, larger file. 80% is ideal for most uses.", maxFileSize: "Max File Size (KB)", targetSizeHint: "App calculates best quality to fit size. Processing will be slower.", resizeWidth: "Max Width", resizeHeight: "Max Height", resizeWidthPlaceholder: "Original", resizeHeightPlaceholder: "Auto", resizeHint: "Leave empty to keep original dimensions. Aspect ratio is preserved.", presets: "Quick Presets", presetCustom: "Custom", presetLow: "Economy", presetMedium: "Balanced", presetHigh: "High", presetMax: "Max", presetHint: "Click a preset to quickly apply recommended settings.", fileNaming: "File Naming", prefix: "Prefix", suffix: "Suffix", fileNamingHint: "Add text before or after the original filename.", resetDefaults: "Reset" },
            privacy: { title: "Privacy Secure", description: "Processing is 100% local. Your images never leave this device." },
            dropzone: { title: "Drop images here", description: "Drag & drop files or click to browse.", formats: "Supports JPG, PNG, WebP, AVIF, GIF, BMP, TIFF, SVG, ICO, HEIC", hint: "You can select multiple files at once" },
            results: { title: "Results", fileInfo: "File Info", state: "State", optimization: "Optimization", action: "Action", download: "Download", downloadAll: "Download All", clear: "Clear", preview: "Preview" },
            status: { processing: "Processing", tuning: "Tuning...", ready: "Ready", failed: "Failed" },
            stats: { original: "Original", total: "Total:", saved: "Saved", added: "Added" },
            alerts: { pngTargetSize: "Target size optimization is not available for PNG (Lossless). Switched to JPEG." },
            confirm: { clearTitle: "Clear all images?", clearMessage: "This will remove all processed images from the list.", clearConfirm: "Yes, clear all", clearCancel: "Cancel" },
            toast: { settingsSaved: "Settings saved", settingsReset: "Settings reset to defaults", processingComplete: "Processing complete!", processingCompleteMulti: "{count} images processed", downloadStarted: "Download started", imageCopied: "Image copied to clipboard", errorOccurred: "An error occurred", formatWarning: "AVIF may not be supported in all browsers", allCleared: "All images cleared" },
            progress: { processing: "Processing {current} of {total}...", complete: "All done!" },
            footer: { madeBy: "Made with", by: "by", forProject: "for" },
            theme: { light: "Light", dark: "Dark", toggle: "Toggle theme" },
            preview: { title: "Comparison", before: "Before", after: "After", close: "Close" },
            shortcuts: { title: "Keyboard Shortcuts", upload: "Upload files", download: "Download ZIP", clear: "Clear list", theme: "Toggle theme", escape: "Close modal" },
            tooltips: { formatWebp: "Best for web - small files with great quality", formatAvif: "Newest format - smallest files but slower", formatJpeg: "Works everywhere - good for photos", formatPng: "No quality loss - best for graphics/logos", presetLow: "50% quality - smallest files", presetMedium: "80% quality - great balance", presetHigh: "92% quality - near-perfect", presetMax: "100% PNG - no loss at all" }
        },
        de: {
            app: { title: "Web Optimizer Pro", subtitle: "Lokale Bildverarbeitung", pageTitle: "Web Bild-Optimierer & Konverter Pro" },
            header: { clearList: "Liste leeren", downloadZip: "ZIP herunterladen" },
            settings: { title: "Einstellungen", outputFormat: "Ausgabeformat", formatWebp: "WebP (Empfohlen)", formatAvif: "AVIF (Beste Kompression)", formatJpeg: "JPEG (Universal)", formatPng: "PNG (Verlustfrei)", formatHint: "WebP bietet das beste Verhältnis von Qualität und Dateigröße.", optimizationMode: "Optimierungsmodus", modeQuality: "Nach Qualität", modeSize: "Zielgröße", qualityLevel: "Qualitätsstufe", qualityHint: "Höher = bessere Qualität, größere Datei. 80% ist ideal für die meisten Anwendungen.", maxFileSize: "Max. Dateigröße (KB)", targetSizeHint: "App berechnet beste Qualität für Zielgröße. Verarbeitung dauert länger.", resizeWidth: "Max. Breite", resizeHeight: "Max. Höhe", resizeWidthPlaceholder: "Original", resizeHeightPlaceholder: "Auto", resizeHint: "Leer lassen für Originalgröße. Seitenverhältnis wird beibehalten.", presets: "Schnellauswahl", presetCustom: "Benutzerdefiniert", presetLow: "Sparsam", presetMedium: "Ausgewogen", presetHigh: "Hoch", presetMax: "Max", presetHint: "Klicken Sie auf eine Voreinstellung für empfohlene Einstellungen.", fileNaming: "Dateinamen", prefix: "Präfix", suffix: "Suffix", fileNamingHint: "Text vor oder nach dem Dateinamen hinzufügen.", resetDefaults: "Zurücksetzen" },
            privacy: { title: "Datenschutz gesichert", description: "Verarbeitung erfolgt 100% lokal. Ihre Bilder verlassen dieses Gerät nicht." },
            dropzone: { title: "Bilder hier ablegen", description: "Dateien hierher ziehen oder klicken zum Durchsuchen.", formats: "Unterstützt JPG, PNG, WebP, AVIF, GIF, BMP, TIFF, SVG, ICO, HEIC", hint: "Sie können mehrere Dateien gleichzeitig auswählen" },
            results: { title: "Ergebnisse", fileInfo: "Dateiinfo", state: "Status", optimization: "Optimierung", action: "Aktion", download: "Herunterladen", downloadAll: "Alle herunterladen", clear: "Leeren", preview: "Vorschau" },
            status: { processing: "Verarbeitung", tuning: "Anpassen...", ready: "Fertig", failed: "Fehlgeschlagen" },
            stats: { original: "Original", total: "Gesamt:", saved: "Gespart", added: "Hinzugefügt" },
            alerts: { pngTargetSize: "Zielgrößen-Optimierung ist für PNG (Verlustfrei) nicht verfügbar. Auf JPEG umgeschaltet." },
            confirm: { clearTitle: "Alle Bilder löschen?", clearMessage: "Dies entfernt alle verarbeiteten Bilder aus der Liste.", clearConfirm: "Ja, alle löschen", clearCancel: "Abbrechen" },
            toast: { settingsSaved: "Einstellungen gespeichert", settingsReset: "Einstellungen zurückgesetzt", processingComplete: "Verarbeitung abgeschlossen!", processingCompleteMulti: "{count} Bilder verarbeitet", downloadStarted: "Download gestartet", imageCopied: "Bild in Zwischenablage kopiert", errorOccurred: "Ein Fehler ist aufgetreten", formatWarning: "AVIF wird möglicherweise nicht in allen Browsern unterstützt", allCleared: "Alle Bilder gelöscht" },
            progress: { processing: "Verarbeite {current} von {total}...", complete: "Alles fertig!" },
            footer: { madeBy: "Erstellt mit", by: "von", forProject: "für" },
            theme: { light: "Hell", dark: "Dunkel", toggle: "Thema wechseln" },
            preview: { title: "Vergleich", before: "Vorher", after: "Nachher", close: "Schließen" },
            shortcuts: { title: "Tastenkürzel", upload: "Dateien hochladen", download: "ZIP herunterladen", clear: "Liste leeren", theme: "Thema wechseln", escape: "Modal schließen" },
            tooltips: { formatWebp: "Ideal für Web - kleine Dateien mit guter Qualität", formatAvif: "Neuestes Format - kleinste Dateien aber langsamer", formatJpeg: "Funktioniert überall - gut für Fotos", formatPng: "Kein Qualitätsverlust - ideal für Grafiken/Logos", presetLow: "50% Qualität - kleinste Dateien", presetMedium: "80% Qualität - gute Balance", presetHigh: "92% Qualität - fast perfekt", presetMax: "100% PNG - kein Verlust" }
        },
        fr: {
            app: { title: "Web Optimizer Pro", subtitle: "Traitement d'images local", pageTitle: "Optimiseur et Convertisseur d'Images Web Pro" },
            header: { clearList: "Vider la liste", downloadZip: "Télécharger ZIP" },
            settings: { title: "Configuration", outputFormat: "Format de sortie", formatWebp: "WebP (Recommandé)", formatAvif: "AVIF (Meilleure compression)", formatJpeg: "JPEG (Universel)", formatPng: "PNG (Sans perte)", formatHint: "WebP offre le meilleur équilibre entre qualité et taille de fichier.", optimizationMode: "Mode d'optimisation", modeQuality: "Par qualité", modeSize: "Taille cible", qualityLevel: "Niveau de qualité", qualityHint: "Plus élevé = meilleure qualité, fichier plus grand. 80% est idéal.", maxFileSize: "Taille max (Ko)", targetSizeHint: "L'app calcule la meilleure qualité pour la taille. Traitement plus lent.", resizeWidth: "Largeur max", resizeHeight: "Hauteur max", resizeWidthPlaceholder: "Original", resizeHeightPlaceholder: "Auto", resizeHint: "Laisser vide pour garder les dimensions originales.", presets: "Préréglages rapides", presetCustom: "Personnalisé", presetLow: "Économique", presetMedium: "Équilibré", presetHigh: "Haute", presetMax: "Max", presetHint: "Cliquez sur un préréglage pour appliquer les paramètres recommandés.", fileNaming: "Nommage des fichiers", prefix: "Préfixe", suffix: "Suffixe", fileNamingHint: "Ajouter du texte avant ou après le nom de fichier.", resetDefaults: "Réinitialiser" },
            privacy: { title: "Confidentialité", description: "Traitement 100% local. Vos images ne quittent jamais cet appareil." },
            dropzone: { title: "Déposez les images ici", description: "Glissez-déposez ou cliquez pour parcourir.", formats: "Supporte JPG, PNG, WebP, AVIF, GIF, BMP, TIFF, SVG, ICO, HEIC", hint: "Vous pouvez sélectionner plusieurs fichiers à la fois" },
            results: { title: "Résultats", fileInfo: "Fichier", state: "État", optimization: "Optimisation", action: "Action", download: "Télécharger", downloadAll: "Tout télécharger", clear: "Effacer", preview: "Aperçu" },
            status: { processing: "Traitement", tuning: "Ajustement...", ready: "Prêt", failed: "Échec" },
            stats: { original: "Original", total: "Total:", saved: "Économisé", added: "Ajouté" },
            alerts: { pngTargetSize: "L'optimisation par taille n'est pas disponible pour PNG. Basculé sur JPEG." },
            confirm: { clearTitle: "Effacer toutes les images?", clearMessage: "Cela supprimera toutes les images traitées de la liste.", clearConfirm: "Oui, tout effacer", clearCancel: "Annuler" },
            toast: { settingsSaved: "Paramètres enregistrés", settingsReset: "Paramètres réinitialisés", processingComplete: "Traitement terminé!", processingCompleteMulti: "{count} images traitées", downloadStarted: "Téléchargement démarré", imageCopied: "Image copiée dans le presse-papiers", errorOccurred: "Une erreur s'est produite", formatWarning: "AVIF peut ne pas être supporté dans tous les navigateurs", allCleared: "Toutes les images effacées" },
            progress: { processing: "Traitement {current} sur {total}...", complete: "Tout est fait!" },
            footer: { madeBy: "Créé avec", by: "par", forProject: "pour" },
            theme: { light: "Clair", dark: "Sombre", toggle: "Changer le thème" },
            preview: { title: "Comparaison", before: "Avant", after: "Après", close: "Fermer" },
            shortcuts: { title: "Raccourcis clavier", upload: "Importer des fichiers", download: "Télécharger ZIP", clear: "Vider la liste", theme: "Changer le thème", escape: "Fermer le modal" },
            tooltips: { formatWebp: "Idéal pour le web - petits fichiers de qualité", formatAvif: "Format récent - plus petits fichiers mais plus lent", formatJpeg: "Fonctionne partout - bon pour les photos", formatPng: "Sans perte - idéal pour graphiques/logos", presetLow: "50% qualité - plus petits fichiers", presetMedium: "80% qualité - bon équilibre", presetHigh: "92% qualité - presque parfait", presetMax: "100% PNG - aucune perte" }
        },
        es: {
            app: { title: "Web Optimizer Pro", subtitle: "Procesador de imágenes local", pageTitle: "Optimizador y Conversor de Imágenes Web Pro" },
            header: { clearList: "Limpiar lista", downloadZip: "Descargar ZIP" },
            settings: { title: "Configuración", outputFormat: "Formato de salida", formatWebp: "WebP (Recomendado)", formatAvif: "AVIF (Mejor compresión)", formatJpeg: "JPEG (Universal)", formatPng: "PNG (Sin pérdida)", formatHint: "WebP ofrece el mejor equilibrio entre calidad y tamaño de archivo.", optimizationMode: "Modo de optimización", modeQuality: "Por calidad", modeSize: "Tamaño objetivo", qualityLevel: "Nivel de calidad", qualityHint: "Mayor = mejor calidad, archivo más grande. 80% es ideal.", maxFileSize: "Tamaño máx (KB)", targetSizeHint: "La app calcula la mejor calidad para el tamaño. Procesamiento más lento.", resizeWidth: "Ancho máximo", resizeHeight: "Alto máximo", resizeWidthPlaceholder: "Original", resizeHeightPlaceholder: "Auto", resizeHint: "Dejar vacío para mantener las dimensiones originales.", presets: "Preajustes rápidos", presetCustom: "Personalizado", presetLow: "Económico", presetMedium: "Equilibrado", presetHigh: "Alta", presetMax: "Máx", presetHint: "Haz clic en un preajuste para aplicar configuraciones recomendadas.", fileNaming: "Nombres de archivo", prefix: "Prefijo", suffix: "Sufijo", fileNamingHint: "Agregar texto antes o después del nombre de archivo.", resetDefaults: "Restablecer" },
            privacy: { title: "Privacidad", description: "Procesamiento 100% local. Tus imágenes nunca salen de este dispositivo." },
            dropzone: { title: "Arrastra imágenes aquí", description: "Arrastra y suelta o haz clic para explorar.", formats: "Soporta JPG, PNG, WebP, AVIF, GIF, BMP, TIFF, SVG, ICO, HEIC", hint: "Puedes seleccionar varios archivos a la vez" },
            results: { title: "Resultados", fileInfo: "Archivo", state: "Estado", optimization: "Optimización", action: "Acción", download: "Descargar", downloadAll: "Descargar todo", clear: "Limpiar", preview: "Vista previa" },
            status: { processing: "Procesando", tuning: "Ajustando...", ready: "Listo", failed: "Error" },
            stats: { original: "Original", total: "Total:", saved: "Ahorrado", added: "Añadido" },
            alerts: { pngTargetSize: "La optimización por tamaño no está disponible para PNG. Cambiado a JPEG." },
            confirm: { clearTitle: "¿Borrar todas las imágenes?", clearMessage: "Esto eliminará todas las imágenes procesadas de la lista.", clearConfirm: "Sí, borrar todo", clearCancel: "Cancelar" },
            toast: { settingsSaved: "Configuración guardada", settingsReset: "Configuración restablecida", processingComplete: "¡Procesamiento completado!", processingCompleteMulti: "{count} imágenes procesadas", downloadStarted: "Descarga iniciada", imageCopied: "Imagen copiada al portapapeles", errorOccurred: "Ocurrió un error", formatWarning: "AVIF puede no ser compatible en todos los navegadores", allCleared: "Todas las imágenes eliminadas" },
            progress: { processing: "Procesando {current} de {total}...", complete: "¡Todo listo!" },
            footer: { madeBy: "Hecho con", by: "por", forProject: "para" },
            theme: { light: "Claro", dark: "Oscuro", toggle: "Cambiar tema" },
            preview: { title: "Comparación", before: "Antes", after: "Después", close: "Cerrar" },
            shortcuts: { title: "Atajos de teclado", upload: "Subir archivos", download: "Descargar ZIP", clear: "Limpiar lista", theme: "Cambiar tema", escape: "Cerrar modal" },
            tooltips: { formatWebp: "Ideal para web - archivos pequeños con buena calidad", formatAvif: "Formato nuevo - archivos más pequeños pero más lento", formatJpeg: "Funciona en todas partes - bueno para fotos", formatPng: "Sin pérdida - ideal para gráficos/logos", presetLow: "50% calidad - archivos más pequeños", presetMedium: "80% calidad - buen equilibrio", presetHigh: "92% calidad - casi perfecto", presetMax: "100% PNG - sin pérdida" }
        },
        it: {
            app: { title: "Web Optimizer Pro", subtitle: "Elaborazione immagini locale", pageTitle: "Ottimizzatore e Convertitore Immagini Web Pro" },
            header: { clearList: "Svuota lista", downloadZip: "Scarica ZIP" },
            settings: { title: "Configurazione", outputFormat: "Formato di output", formatWebp: "WebP (Consigliato)", formatAvif: "AVIF (Migliore compressione)", formatJpeg: "JPEG (Universale)", formatPng: "PNG (Senza perdita)", formatHint: "WebP offre il miglior equilibrio tra qualità e dimensione file.", optimizationMode: "Modalità ottimizzazione", modeQuality: "Per qualità", modeSize: "Dimensione target", qualityLevel: "Livello qualità", qualityHint: "Maggiore = migliore qualità, file più grande. 80% è ideale.", maxFileSize: "Dimensione max (KB)", targetSizeHint: "L'app calcola la migliore qualità per la dimensione. Elaborazione più lenta.", resizeWidth: "Larghezza max", resizeHeight: "Altezza max", resizeWidthPlaceholder: "Originale", resizeHeightPlaceholder: "Auto", resizeHint: "Lasciare vuoto per mantenere le dimensioni originali.", presets: "Preset rapidi", presetCustom: "Personalizzato", presetLow: "Economico", presetMedium: "Bilanciato", presetHigh: "Alta", presetMax: "Max", presetHint: "Clicca su un preset per applicare le impostazioni consigliate.", fileNaming: "Nomi file", prefix: "Prefisso", suffix: "Suffisso", fileNamingHint: "Aggiungi testo prima o dopo il nome file.", resetDefaults: "Ripristina" },
            privacy: { title: "Privacy", description: "Elaborazione 100% locale. Le tue immagini non lasciano mai questo dispositivo." },
            dropzone: { title: "Trascina le immagini qui", description: "Trascina e rilascia o clicca per sfogliare.", formats: "Supporta JPG, PNG, WebP, AVIF, GIF, BMP, TIFF, SVG, ICO, HEIC", hint: "Puoi selezionare più file contemporaneamente" },
            results: { title: "Risultati", fileInfo: "File", state: "Stato", optimization: "Ottimizzazione", action: "Azione", download: "Scarica", downloadAll: "Scarica tutto", clear: "Cancella", preview: "Anteprima" },
            status: { processing: "Elaborazione", tuning: "Regolazione...", ready: "Pronto", failed: "Fallito" },
            stats: { original: "Originale", total: "Totale:", saved: "Risparmiato", added: "Aggiunto" },
            alerts: { pngTargetSize: "L'ottimizzazione per dimensione non è disponibile per PNG. Passato a JPEG." },
            confirm: { clearTitle: "Cancellare tutte le immagini?", clearMessage: "Questo rimuoverà tutte le immagini elaborate dalla lista.", clearConfirm: "Sì, cancella tutto", clearCancel: "Annulla" },
            toast: { settingsSaved: "Impostazioni salvate", settingsReset: "Impostazioni ripristinate", processingComplete: "Elaborazione completata!", processingCompleteMulti: "{count} immagini elaborate", downloadStarted: "Download avviato", imageCopied: "Immagine copiata negli appunti", errorOccurred: "Si è verificato un errore", formatWarning: "AVIF potrebbe non essere supportato in tutti i browser", allCleared: "Tutte le immagini cancellate" },
            progress: { processing: "Elaborazione {current} di {total}...", complete: "Tutto fatto!" },
            footer: { madeBy: "Creato con", by: "da", forProject: "per" },
            theme: { light: "Chiaro", dark: "Scuro", toggle: "Cambia tema" },
            preview: { title: "Confronto", before: "Prima", after: "Dopo", close: "Chiudi" },
            shortcuts: { title: "Scorciatoie da tastiera", upload: "Carica file", download: "Scarica ZIP", clear: "Svuota lista", theme: "Cambia tema", escape: "Chiudi modale" },
            tooltips: { formatWebp: "Ideale per il web - file piccoli di buona qualità", formatAvif: "Formato recente - file più piccoli ma più lento", formatJpeg: "Funziona ovunque - buono per le foto", formatPng: "Senza perdita - ideale per grafica/loghi", presetLow: "50% qualità - file più piccoli", presetMedium: "80% qualità - buon equilibrio", presetHigh: "92% qualità - quasi perfetto", presetMax: "100% PNG - nessuna perdita" }
        },
        pt: {
            app: { title: "Web Optimizer Pro", subtitle: "Processador de imagens local", pageTitle: "Otimizador e Conversor de Imagens Web Pro" },
            header: { clearList: "Limpar lista", downloadZip: "Baixar ZIP" },
            settings: { title: "Configuração", outputFormat: "Formato de saída", formatWebp: "WebP (Recomendado)", formatAvif: "AVIF (Melhor compressão)", formatJpeg: "JPEG (Universal)", formatPng: "PNG (Sem perdas)", formatHint: "WebP oferece o melhor equilíbrio entre qualidade e tamanho de arquivo.", optimizationMode: "Modo de otimização", modeQuality: "Por qualidade", modeSize: "Tamanho alvo", qualityLevel: "Nível de qualidade", qualityHint: "Maior = melhor qualidade, arquivo maior. 80% é ideal.", maxFileSize: "Tamanho máx (KB)", targetSizeHint: "O app calcula a melhor qualidade para o tamanho. Processamento mais lento.", resizeWidth: "Largura máxima", resizeHeight: "Altura máxima", resizeWidthPlaceholder: "Original", resizeHeightPlaceholder: "Auto", resizeHint: "Deixe vazio para manter as dimensões originais.", presets: "Predefinições rápidas", presetCustom: "Personalizado", presetLow: "Econômico", presetMedium: "Equilibrado", presetHigh: "Alta", presetMax: "Máx", presetHint: "Clique em uma predefinição para aplicar configurações recomendadas.", fileNaming: "Nomes de arquivo", prefix: "Prefixo", suffix: "Sufixo", fileNamingHint: "Adicionar texto antes ou depois do nome do arquivo.", resetDefaults: "Redefinir" },
            privacy: { title: "Privacidade", description: "Processamento 100% local. Suas imagens nunca saem deste dispositivo." },
            dropzone: { title: "Arraste imagens aqui", description: "Arraste e solte ou clique para procurar.", formats: "Suporta JPG, PNG, WebP, AVIF, GIF, BMP, TIFF, SVG, ICO, HEIC", hint: "Você pode selecionar vários arquivos de uma vez" },
            results: { title: "Resultados", fileInfo: "Arquivo", state: "Estado", optimization: "Otimização", action: "Ação", download: "Baixar", downloadAll: "Baixar tudo", clear: "Limpar", preview: "Visualizar" },
            status: { processing: "Processando", tuning: "Ajustando...", ready: "Pronto", failed: "Falhou" },
            stats: { original: "Original", total: "Total:", saved: "Economizado", added: "Adicionado" },
            alerts: { pngTargetSize: "Otimização por tamanho não disponível para PNG. Alterado para JPEG." },
            confirm: { clearTitle: "Limpar todas as imagens?", clearMessage: "Isso removerá todas as imagens processadas da lista.", clearConfirm: "Sim, limpar tudo", clearCancel: "Cancelar" },
            toast: { settingsSaved: "Configurações salvas", settingsReset: "Configurações redefinidas", processingComplete: "Processamento concluído!", processingCompleteMulti: "{count} imagens processadas", downloadStarted: "Download iniciado", imageCopied: "Imagem copiada para a área de transferência", errorOccurred: "Ocorreu um erro", formatWarning: "AVIF pode não ser suportado em todos os navegadores", allCleared: "Todas as imagens removidas" },
            progress: { processing: "Processando {current} de {total}...", complete: "Tudo pronto!" },
            footer: { madeBy: "Feito com", by: "por", forProject: "para" },
            theme: { light: "Claro", dark: "Escuro", toggle: "Alternar tema" },
            preview: { title: "Comparação", before: "Antes", after: "Depois", close: "Fechar" },
            shortcuts: { title: "Atalhos de teclado", upload: "Carregar arquivos", download: "Baixar ZIP", clear: "Limpar lista", theme: "Alternar tema", escape: "Fechar modal" },
            tooltips: { formatWebp: "Ideal para web - arquivos pequenos com boa qualidade", formatAvif: "Formato recente - arquivos menores mas mais lento", formatJpeg: "Funciona em todo lugar - bom para fotos", formatPng: "Sem perdas - ideal para gráficos/logos", presetLow: "50% qualidade - arquivos menores", presetMedium: "80% qualidade - bom equilíbrio", presetHigh: "92% qualidade - quase perfeito", presetMax: "100% PNG - sem perda" }
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
