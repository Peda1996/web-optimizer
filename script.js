// --- Configuration & Elements ---
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const resultsList = document.getElementById('resultsList');
const outputSection = document.getElementById('outputSection');
const countBadge = document.getElementById('countBadge');
const totalSavedInfo = document.getElementById('totalSavedInfo');
const processingStatus = document.getElementById('processingStatus');

// Progress Bar
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');

// Buttons
const downloadAllBtn = document.getElementById('downloadAllBtn');
const downloadAllBtnMobile = document.getElementById('downloadAllBtnMobile');
const clearAllBtn = document.getElementById('clearAllBtn');
const clearAllBtnMobile = document.getElementById('clearAllBtnMobile');
const resetBtn = document.getElementById('resetBtn');
const helpBtn = document.getElementById('helpBtn');

// Settings
const formatSelect = document.getElementById('formatSelect');
const maxWidthInput = document.getElementById('maxWidthInput');
const maxHeightInput = document.getElementById('maxHeightInput');
const prefixInput = document.getElementById('prefixInput');
const suffixInput = document.getElementById('suffixInput');

// Modes
const modeQuality = document.getElementById('modeQuality');
const modeSize = document.getElementById('modeSize');
const qualityControls = document.getElementById('qualityControls');
const sizeControls = document.getElementById('sizeControls');
const qualityRange = document.getElementById('qualityRange');
const qualityValue = document.getElementById('qualityValue');
const targetSizeInput = document.getElementById('targetSizeInput');

// Language & Theme
const langSelect = document.getElementById('langSelect');
const themeToggle = document.getElementById('themeToggle');

// Preview Modal
const previewModal = document.getElementById('previewModal');
const closePreview = document.getElementById('closePreview');
const previewBefore = document.getElementById('previewBefore');
const previewAfter = document.getElementById('previewAfter');
const previewBeforeSize = document.getElementById('previewBeforeSize');
const previewAfterSize = document.getElementById('previewAfterSize');

// Confirm Modal
const confirmModal = document.getElementById('confirmModal');
const confirmOk = document.getElementById('confirmOk');
const confirmCancel = document.getElementById('confirmCancel');

// Shortcuts Panel
const shortcutsPanel = document.getElementById('shortcutsPanel');

// Toast Container
const toastContainer = document.getElementById('toastContainer');

// Presets
const presetBtns = document.querySelectorAll('.preset-btn');

// Preset values
const presets = {
    low: { quality: 50, format: 'image/webp' },
    medium: { quality: 80, format: 'image/webp' },
    high: { quality: 92, format: 'image/webp' },
    max: { quality: 100, format: 'image/png' }
};

// Default settings
const defaultSettings = {
    format: 'image/webp',
    quality: 80,
    mode: 'quality',
    targetSize: 250,
    maxWidth: '',
    maxHeight: '',
    prefix: '',
    suffix: '',
    preset: 'medium'
};

let appState = {
    mode: 'quality',
    files: [],
    totalOriginal: 0,
    totalNew: 0,
    currentPreset: 'medium',
    processing: {
        total: 0,
        completed: 0,
        inProgress: false
    }
};

// --- Initialize ---
document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();
    initTheme();
    loadSettings();
    initPresets();
    initKeyboardShortcuts();
});

// --- Toast Notification System ---
function showToast(message, type = 'info', duration = 3000) {
    const template = document.getElementById('toastTemplate');
    const clone = template.content.cloneNode(true);
    const toast = clone.querySelector('.toast');

    toast.classList.add(`toast-${type}`);
    toast.querySelector('.toast-message').textContent = message;

    // Set icon based on type
    const iconContainer = toast.querySelector('.toast-icon');
    const icons = {
        success: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        error: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        warning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        info: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };
    iconContainer.innerHTML = icons[type] || icons.info;

    // Close button handler
    toast.querySelector('.toast-close').addEventListener('click', () => {
        dismissToast(toast);
    });

    toastContainer.appendChild(toast);

    // Auto dismiss
    if (duration > 0) {
        setTimeout(() => dismissToast(toast), duration);
    }

    return toast;
}

function dismissToast(toast) {
    toast.classList.remove('animate-slide-in');
    toast.classList.add('animate-slide-out');
    setTimeout(() => toast.remove(), 300);
}

// --- Settings Persistence ---
function saveSettings() {
    const settings = {
        format: formatSelect.value,
        quality: qualityRange.value,
        mode: appState.mode,
        targetSize: targetSizeInput.value,
        maxWidth: maxWidthInput.value,
        maxHeight: maxHeightInput.value,
        prefix: prefixInput.value,
        suffix: suffixInput.value,
        preset: appState.currentPreset
    };
    localStorage.setItem('optimizer-settings', JSON.stringify(settings));
}

function loadSettings() {
    const saved = localStorage.getItem('optimizer-settings');
    if (saved) {
        try {
            const settings = JSON.parse(saved);
            formatSelect.value = settings.format || defaultSettings.format;
            qualityRange.value = settings.quality || defaultSettings.quality;
            qualityValue.textContent = `${settings.quality || defaultSettings.quality}%`;
            targetSizeInput.value = settings.targetSize || defaultSettings.targetSize;
            maxWidthInput.value = settings.maxWidth || '';
            maxHeightInput.value = settings.maxHeight || '';
            prefixInput.value = settings.prefix || '';
            suffixInput.value = settings.suffix !== undefined ? settings.suffix : defaultSettings.suffix;
            appState.currentPreset = settings.preset || defaultSettings.preset;

            if (settings.mode === 'size') {
                setMode('size');
            }
        } catch (e) {
            console.error('Failed to load settings:', e);
        }
    }
}

function resetSettings() {
    formatSelect.value = defaultSettings.format;
    qualityRange.value = defaultSettings.quality;
    qualityValue.textContent = `${defaultSettings.quality}%`;
    targetSizeInput.value = defaultSettings.targetSize;
    maxWidthInput.value = '';
    maxHeightInput.value = '';
    prefixInput.value = '';
    suffixInput.value = defaultSettings.suffix;
    setMode('quality');
    setPreset('medium');
    saveSettings();
    showToast(i18n.t('toast.settingsReset'), 'success');
}

// Save settings on change
[formatSelect, qualityRange, targetSizeInput, maxWidthInput, maxHeightInput, prefixInput, suffixInput].forEach(el => {
    el.addEventListener('change', saveSettings);
});

// Reset button
resetBtn.addEventListener('click', resetSettings);

// --- Theme Management ---
function initTheme() {
    const stored = localStorage.getItem('app-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (stored === 'dark' || (!stored && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('app-theme', isDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', toggleTheme);

// --- Keyboard Shortcuts ---
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        // Ctrl+O - Open file picker
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();
            fileInput.click();
        }

        // Ctrl+S - Download ZIP
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            if (appState.files.length > 0) {
                handleZip();
            }
        }

        // Delete - Clear list (with confirmation)
        if (e.key === 'Delete' && appState.files.length > 0) {
            e.preventDefault();
            showConfirmClear();
        }

        // T - Toggle theme
        if (e.key === 't' || e.key === 'T') {
            toggleTheme();
        }

        // Escape - Close modals
        if (e.key === 'Escape') {
            closePreviewModal();
            closeConfirmModal();
            shortcutsPanel.classList.add('hidden');
        }

        // ? or H - Toggle shortcuts panel
        if (e.key === '?' || e.key === 'h' || e.key === 'H') {
            shortcutsPanel.classList.toggle('hidden');
        }
    });
}

// Help button toggles shortcuts panel
helpBtn.addEventListener('click', () => {
    shortcutsPanel.classList.toggle('hidden');
});

// --- Presets Management ---
function initPresets() {
    setPreset(appState.currentPreset);
}

presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const preset = btn.dataset.preset;
        setPreset(preset);
        saveSettings();
    });
});

function setPreset(preset) {
    if (!presets[preset]) return;

    appState.currentPreset = preset;

    // Update UI
    presetBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.preset === preset);
    });

    // Apply preset values
    const values = presets[preset];
    qualityRange.value = values.quality;
    qualityValue.textContent = `${values.quality}%`;

    if (preset === 'max') {
        formatSelect.value = 'image/png';
    } else if (formatSelect.value === 'image/png') {
        formatSelect.value = 'image/webp';
    }
}

// Quality slider changes preset to custom
qualityRange.addEventListener('input', (e) => {
    qualityValue.textContent = `${e.target.value}%`;
    // Mark as custom when manually changed
    presetBtns.forEach(btn => btn.classList.remove('active'));
    appState.currentPreset = 'custom';
});

// --- Language selector ---
langSelect.addEventListener('change', async (e) => {
    await i18n.setLanguage(e.target.value);
    updateStats();
});

// --- Mode Toggle ---
modeQuality.addEventListener('click', () => setMode('quality'));
modeSize.addEventListener('click', () => setMode('size'));

function setMode(mode) {
    appState.mode = mode;
    if (mode === 'quality') {
        modeQuality.classList.add('bg-white', 'dark:bg-slate-600', 'text-gray-900', 'dark:text-white', 'shadow-sm');
        modeQuality.classList.remove('text-gray-500', 'dark:text-gray-400');

        modeSize.classList.remove('bg-white', 'dark:bg-slate-600', 'text-gray-900', 'dark:text-white', 'shadow-sm');
        modeSize.classList.add('text-gray-500', 'dark:text-gray-400');

        qualityControls.classList.remove('hidden');
        sizeControls.classList.add('hidden');
    } else {
        modeSize.classList.add('bg-white', 'dark:bg-slate-600', 'text-gray-900', 'dark:text-white', 'shadow-sm');
        modeSize.classList.remove('text-gray-500', 'dark:text-gray-400');

        modeQuality.classList.remove('bg-white', 'dark:bg-slate-600', 'text-gray-900', 'dark:text-white', 'shadow-sm');
        modeQuality.classList.add('text-gray-500', 'dark:text-gray-400');

        sizeControls.classList.remove('hidden');
        qualityControls.classList.add('hidden');

        checkPngCompatibility();
    }
    saveSettings();
}

formatSelect.addEventListener('change', () => {
    checkPngCompatibility();
    checkAvifCompatibility();
    saveSettings();
});

function checkPngCompatibility() {
    const isPng = formatSelect.value === 'image/png';
    if (isPng && appState.mode === 'size') {
        showToast(i18n.t('alerts.pngTargetSize'), 'warning');
        formatSelect.value = 'image/jpeg';
    }
}

function checkAvifCompatibility() {
    if (formatSelect.value === 'image/avif') {
        // Check browser support
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        if (!canvas.toDataURL('image/avif').startsWith('data:image/avif')) {
            showToast(i18n.t('toast.formatWarning'), 'warning', 5000);
        }
    }
}

// --- Drag & Drop ---
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => {
    dropZone.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); });
});
['dragenter', 'dragover'].forEach(evt => {
    dropZone.addEventListener(evt, () => dropZone.classList.add('active'));
});
['dragleave', 'drop'].forEach(evt => {
    dropZone.addEventListener(evt, () => dropZone.classList.remove('active'));
});

dropZone.addEventListener('drop', (e) => handleFiles(e.dataTransfer.files));
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

// --- Confirmation Modal ---
function showConfirmClear() {
    if (appState.files.length === 0) return;
    confirmModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeConfirmModal() {
    confirmModal.classList.remove('active');
    document.body.style.overflow = '';
}

confirmCancel.addEventListener('click', closeConfirmModal);
confirmModal.addEventListener('click', (e) => {
    if (e.target === confirmModal) closeConfirmModal();
});

confirmOk.addEventListener('click', () => {
    closeConfirmModal();
    clearList();
    showToast(i18n.t('toast.allCleared'), 'success');
});

// --- Clear List ---
const clearList = () => {
    // Revoke object URLs to free memory
    appState.files.forEach(f => {
        if (f.originalUrl) URL.revokeObjectURL(f.originalUrl);
        if (f.optimizedUrl) URL.revokeObjectURL(f.optimizedUrl);
    });

    resultsList.innerHTML = '';
    appState.files = [];
    appState.totalOriginal = 0;
    appState.totalNew = 0;
    appState.processing = { total: 0, completed: 0, inProgress: false };
    updateStats();
    updateProgress();
    outputSection.classList.add('hidden');
    fileInput.value = '';
};

clearAllBtn.addEventListener('click', showConfirmClear);
clearAllBtnMobile.addEventListener('click', showConfirmClear);

// --- Preview Modal ---
closePreview.addEventListener('click', closePreviewModal);
previewModal.addEventListener('click', (e) => {
    if (e.target === previewModal) closePreviewModal();
});

function openPreviewModal(id) {
    const file = appState.files.find(f => f.id === id);
    if (!file) return;

    previewBefore.src = file.originalUrl;
    previewAfter.src = file.optimizedUrl;
    previewBeforeSize.textContent = formatBytes(file.originalSize);
    previewAfterSize.textContent = formatBytes(file.blob.size);

    previewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePreviewModal() {
    previewModal.classList.remove('active');
    document.body.style.overflow = '';
}

// --- Progress Tracking ---
function updateProgress() {
    const { total, completed, inProgress } = appState.processing;

    if (inProgress && total > 0) {
        progressBar.classList.remove('hidden');
        const percent = Math.round((completed / total) * 100);
        progressFill.style.width = `${percent}%`;

        processingStatus.classList.remove('hidden');
        processingStatus.textContent = i18n.t('progress.processing')
            .replace('{current}', completed)
            .replace('{total}', total);
    } else {
        progressBar.classList.add('hidden');
        progressFill.style.width = '0%';
        processingStatus.classList.add('hidden');
    }
}

// --- Core Logic ---
function handleFiles(files) {
    if (files.length === 0) return;
    outputSection.classList.remove('hidden');

    // Setup progress tracking
    appState.processing.total += files.length;
    appState.processing.inProgress = true;
    updateProgress();

    Array.from(files).forEach(processFile);
}

async function processFile(file) {
    // Validation - support as many formats as possible
    const supportedTypes = /^image\/(jpeg|png|webp|gif|bmp|tiff|avif|heic|heif|svg\+xml|x-icon|vnd\.microsoft\.icon|ico|x-ms-bmp|jp2|jpx|jpm|jxl|apng|x-portable-pixmap|x-portable-graymap|x-portable-bitmap|x-portable-anymap|x-pcx|x-tga|x-rgb)/;
    const supportedExtensions = /\.(jpg|jpeg|jpe|jfif|pjpeg|pjp|png|webp|avif|gif|bmp|dib|tif|tiff|ico|cur|svg|heic|heif|jp2|j2k|jpf|jpx|jpm|jxl|apng|pcx|tga|ppm|pgm|pbm|pnm|xbm|xpm|wbmp|raw|dng|nef|cr2|arw|orf|rw2)$/i;

    if (!file.type.match(supportedTypes) && !file.name.match(supportedExtensions)) {
        appState.processing.completed++;
        checkProcessingComplete();
        return;
    }

    const id = Math.random().toString(36).substr(2, 9);
    const originalUrl = URL.createObjectURL(file);
    createListItem(id, file, originalUrl);

    try {
        // 1. Read Image
        const img = await loadImage(file);

        // 2. Resize Logic
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const maxW = parseInt(maxWidthInput.value) || Infinity;
        const maxH = parseInt(maxHeightInput.value) || Infinity;

        // Calculate scale factor
        const scaleW = maxW / width;
        const scaleH = maxH / height;
        const scale = Math.min(scaleW, scaleH, 1); // Don't upscale

        if (scale < 1) {
            width = Math.round(width * scale);
            height = Math.round(height * scale);
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // 3. Compression Logic
        const format = formatSelect.value;
        let blob;

        if (appState.mode === 'size' && format !== 'image/png') {
            updateStatus(id, 'calculating');
            const targetBytes = parseInt(targetSizeInput.value) * 1024;
            blob = await optimizeToSize(canvas, format, targetBytes);
        } else {
            const quality = parseInt(qualityRange.value) / 100;
            blob = await new Promise(resolve => canvas.toBlob(resolve, format, quality));
        }

        // 4. Finalize
        if (blob) {
            handleSuccess(id, file, blob, format, width, height, originalUrl);
        } else {
            throw new Error("Conversion failed");
        }

    } catch (err) {
        console.error(err);
        markError(id, i18n.t('status.failed'));
    }

    // Update progress
    appState.processing.completed++;
    updateProgress();
    checkProcessingComplete();
}

function checkProcessingComplete() {
    const { total, completed } = appState.processing;
    if (completed >= total && total > 0) {
        setTimeout(() => {
            appState.processing.inProgress = false;
            updateProgress();

            // Show completion toast
            if (appState.files.length > 1) {
                showToast(
                    i18n.t('toast.processingCompleteMulti').replace('{count}', appState.files.length),
                    'success'
                );
            } else if (appState.files.length === 1) {
                showToast(i18n.t('toast.processingComplete'), 'success');
            }
        }, 500);
    }
}

// Helper: Binary Search for Target Size
async function optimizeToSize(canvas, format, targetBytes) {
    let min = 0;
    let max = 1;
    let bestBlob = null;

    const maxBlob = await new Promise(r => canvas.toBlob(r, format, 1));
    if (maxBlob.size <= targetBytes) return maxBlob;

    for (let i = 0; i < 6; i++) {
        const mid = (min + max) / 2;
        const blob = await new Promise(r => canvas.toBlob(r, format, mid));

        if (blob.size <= targetBytes) {
            bestBlob = blob;
            min = mid;
        } else {
            max = mid;
        }
    }

    return bestBlob || await new Promise(r => canvas.toBlob(r, format, 0.01));
}

// --- UI Helpers ---
function createListItem(id, file, originalUrl) {
    const template = document.getElementById('listItemTemplate');
    const clone = template.content.cloneNode(true);
    const el = clone.querySelector('div');
    el.id = `item-${id}`;
    el.dataset.fileId = id;

    el.querySelector('.result-name').textContent = file.name;
    el.querySelector('.result-meta').textContent = `${i18n.t('stats.original')}: ${formatBytes(file.size)}`;
    el.querySelector('.result-thumb').src = originalUrl;
    el.querySelector('.status-text').textContent = i18n.t('status.processing');

    // Apply translations
    const downloadText = el.querySelector('[data-i18n="results.download"]');
    if (downloadText) downloadText.textContent = i18n.t('results.download');

    const previewText = el.querySelector('[data-i18n="results.preview"]');
    if (previewText) previewText.textContent = i18n.t('results.preview');

    resultsList.insertBefore(clone, resultsList.firstChild);
}

function updateStatus(id, state) {
    const el = document.getElementById(`item-${id}`);
    if (!el) return;
    const badge = el.querySelector('.status-badge');

    if (state === 'calculating') {
        badge.innerHTML = `<svg class="animate-spin -ml-0.5 mr-1.5 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span class="status-text">${i18n.t('status.tuning')}</span>`;
        badge.className = 'status-badge inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300';
    }
}

function handleSuccess(id, original, blob, format, w, h, originalUrl) {
    const el = document.getElementById(`item-${id}`);
    if (!el) return;

    // Determine Extension
    const extMap = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' };
    const ext = extMap[format] || 'img';
    const namePart = original.name.substring(0, original.name.lastIndexOf('.')) || original.name;
    const prefix = prefixInput.value || '';
    const suffix = suffixInput.value || '';
    const filename = `${prefix}${namePart}${suffix}.${ext}`;

    const optimizedUrl = URL.createObjectURL(blob);

    // Update State
    appState.files.push({
        id,
        name: filename,
        blob,
        originalSize: original.size,
        originalUrl,
        optimizedUrl
    });
    appState.totalOriginal += original.size;
    appState.totalNew += blob.size;
    updateStats();

    // Update UI
    el.querySelector('.result-meta').textContent = `${i18n.t('stats.original')}: ${formatBytes(original.size)} • ${w}x${h}px`;

    const badge = el.querySelector('.status-badge');
    badge.innerHTML = `<svg class="w-3 h-3 mr-1 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span class="status-text">${i18n.t('status.ready')}</span>`;
    badge.className = 'status-badge inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';

    el.querySelector('.result-size').textContent = formatBytes(blob.size);

    const saved = original.size - blob.size;
    const pct = Math.round((saved / original.size) * 100);
    const savedEl = el.querySelector('.result-savings');

    if (saved > 0) {
        savedEl.textContent = `-${pct}% (${formatBytes(saved)})`;
        savedEl.classList.add('text-green-600', 'dark:text-green-400');
    } else {
        savedEl.textContent = `+${Math.abs(pct)}%`;
        savedEl.className = 'text-xs font-medium text-amber-600 dark:text-amber-400';
    }

    // Download Link
    const link = el.querySelector('.download-link');
    link.href = optimizedUrl;
    link.download = filename;
    link.classList.remove('opacity-50', 'pointer-events-none');

    // Preview Button
    const previewBtn = el.querySelector('.preview-btn');
    previewBtn.classList.remove('opacity-50', 'pointer-events-none');
    previewBtn.addEventListener('click', () => openPreviewModal(id));
}

function markError(id, msg) {
    const el = document.getElementById(`item-${id}`);
    if (!el) return;
    const badge = el.querySelector('.status-badge');
    badge.innerHTML = `<svg class="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><span class="status-text">${msg}</span>`;
    badge.className = 'status-badge inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
}

function updateStats() {
    countBadge.textContent = appState.files.length;

    const btnState = appState.files.length === 0;
    downloadAllBtn.disabled = btnState;
    downloadAllBtnMobile.disabled = btnState;
    if(!btnState) downloadAllBtn.classList.remove('opacity-50', 'cursor-not-allowed');

    if (appState.totalOriginal > 0) {
        const diff = appState.totalOriginal - appState.totalNew;
        const sign = diff > 0 ? i18n.t('stats.saved') : i18n.t('stats.added');
        totalSavedInfo.innerHTML = `<span class="hidden md:inline">${i18n.t('stats.total')} </span><span class="font-bold ${diff > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}">${sign} ${formatBytes(Math.abs(diff))}</span>`;
    } else {
        totalSavedInfo.textContent = '';
    }
}

// --- Utilities ---
const loadImage = (file) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
});

function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

// ZIP Download
const handleZip = async () => {
    if(appState.files.length === 0) return;

    showToast(i18n.t('toast.downloadStarted'), 'info');

    const zip = new JSZip();
    appState.files.forEach(f => zip.file(f.name, f.blob));
    const content = await zip.generateAsync({type:"blob"});
    saveAs(content, "optimized_images.zip");
};

downloadAllBtn.addEventListener('click', handleZip);
downloadAllBtnMobile.addEventListener('click', handleZip);
