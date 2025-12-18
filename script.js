// --- Configuration & Elements ---
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const resultsList = document.getElementById('resultsList');
const outputSection = document.getElementById('outputSection');
const countBadge = document.getElementById('countBadge');
const totalSavedInfo = document.getElementById('totalSavedInfo');

// Buttons
const downloadAllBtn = document.getElementById('downloadAllBtn');
const downloadAllBtnMobile = document.getElementById('downloadAllBtnMobile');
const clearAllBtn = document.getElementById('clearAllBtn');
const clearAllBtnMobile = document.getElementById('clearAllBtnMobile');

// Settings
const formatSelect = document.getElementById('formatSelect');
const maxWidthInput = document.getElementById('maxWidthInput');

// Modes
const modeQuality = document.getElementById('modeQuality');
const modeSize = document.getElementById('modeSize');
const qualityControls = document.getElementById('qualityControls');
const sizeControls = document.getElementById('sizeControls');
const qualityRange = document.getElementById('qualityRange');
const qualityValue = document.getElementById('qualityValue');
const targetSizeInput = document.getElementById('targetSizeInput');

let appState = {
    mode: 'quality', // 'quality' or 'size'
    files: [], // Array of {id, name, blob, originalSize}
    totalOriginal: 0,
    totalNew: 0
};

// --- Event Listeners: UI Logic ---

// Toggle Modes
modeQuality.addEventListener('click', () => setMode('quality'));
modeSize.addEventListener('click', () => setMode('size'));

function setMode(mode) {
    appState.mode = mode;
    if (mode === 'quality') {
        modeQuality.classList.replace('text-gray-500', 'text-gray-900');
        modeQuality.classList.replace('bg-transparent', 'bg-white');
        modeQuality.classList.add('shadow-sm');

        modeSize.classList.replace('text-gray-900', 'text-gray-500');
        modeSize.classList.replace('bg-white', 'bg-transparent');
        modeSize.classList.remove('shadow-sm');

        qualityControls.classList.remove('hidden');
        sizeControls.classList.add('hidden');
    } else {
        modeSize.classList.replace('text-gray-500', 'text-gray-900');
        modeSize.classList.replace('bg-transparent', 'bg-white');
        modeSize.classList.add('shadow-sm');

        modeQuality.classList.replace('text-gray-900', 'text-gray-500');
        modeQuality.classList.replace('bg-white', 'bg-transparent');
        modeQuality.classList.remove('shadow-sm');

        sizeControls.classList.remove('hidden');
        qualityControls.classList.add('hidden');

        // Warn if PNG
        checkPngCompatibility();
    }
}

// Settings Inputs
qualityRange.addEventListener('input', (e) => qualityValue.textContent = `${e.target.value}%`);

formatSelect.addEventListener('change', (e) => {
    checkPngCompatibility();
});

function checkPngCompatibility() {
    const isPng = formatSelect.value === 'image/png';
    if (isPng && appState.mode === 'size') {
        alert('Target size optimization is not available for PNG (Lossless). Switched to JPEG.');
        formatSelect.value = 'image/jpeg';
    }
}

// Drag & Drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => {
    dropZone.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); });
});
['dragenter', 'dragover'].forEach(evt => dropZone.classList.add('active'));
['dragleave', 'drop'].forEach(evt => dropZone.classList.remove('active'));

dropZone.addEventListener('drop', (e) => handleFiles(e.dataTransfer.files));
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

// Clear List
const clearList = () => {
    resultsList.innerHTML = '';
    appState.files = [];
    appState.totalOriginal = 0;
    appState.totalNew = 0;
    updateStats();
    outputSection.classList.add('hidden');
    fileInput.value = '';
};
clearAllBtn.addEventListener('click', clearList);
clearAllBtnMobile.addEventListener('click', clearList);

// --- Core Logic ---

function handleFiles(files) {
    if (files.length === 0) return;
    outputSection.classList.remove('hidden');
    Array.from(files).forEach(processFile);
}

async function processFile(file) {
    // Validation
    if (!file.type.match(/^image\/(jpeg|png|webp|gif|bmp|tiff|avif|heic)/)) {
        // If it's a file but browser doesn't know mime type well, try anyway if it has extension
        if(!file.name.match(/\.(jpg|jpeg|png|webp|avif|gif)$/i)) return;
    }

    const id = Math.random().toString(36).substr(2, 9);
    createListItem(id, file);

    try {
        // 1. Read Image
        const img = await loadImage(file);

        // 2. Resize Logic
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const maxW = parseInt(maxWidthInput.value);

        if (maxW && width > maxW) {
            height = height * (maxW / width);
            width = maxW;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // 3. Compression Logic
        const format = formatSelect.value;
        let blob;

        if (appState.mode === 'size' && format !== 'image/png') {
            // Update UI to show "Calculating"
            updateStatus(id, 'calculating');
            const targetBytes = parseInt(targetSizeInput.value) * 1024;
            blob = await optimizeToSize(canvas, format, targetBytes);
        } else {
            // Standard Quality Mode
            const quality = parseInt(qualityRange.value) / 100;
            blob = await new Promise(resolve => canvas.toBlob(resolve, format, quality));
        }

        // 4. Finalize
        if (blob) {
            handleSuccess(id, file, blob, format, width, height);
        } else {
            throw new Error("Conversion failed");
        }

    } catch (err) {
        console.error(err);
        markError(id, "Failed");
    }
}

// Helper: Binary Search for Target Size
async function optimizeToSize(canvas, format, targetBytes) {
    let min = 0;
    let max = 1;
    let bestBlob = null;
    let bestDiff = Infinity;

    // Try max quality first
    const maxBlob = await new Promise(r => canvas.toBlob(r, format, 1));
    if (maxBlob.size <= targetBytes) return maxBlob;

    // Iterative approach (Binary Search limited to 6 steps for performance)
    for (let i = 0; i < 6; i++) {
        const mid = (min + max) / 2;
        const blob = await new Promise(r => canvas.toBlob(r, format, mid));

        if (blob.size <= targetBytes) {
            // Fits! Can we go higher?
            bestBlob = blob;
            min = mid;
        } else {
            // Too big
            max = mid;
        }
    }

    // Fallback: If we couldn't fit target, return the smallest possible (quality 0.01)
    // or the best fit we found.
    return bestBlob || await new Promise(r => canvas.toBlob(r, format, 0.01));
}

// --- UI Helpers ---

function createListItem(id, file) {
    const template = document.getElementById('listItemTemplate');
    const clone = template.content.cloneNode(true);
    const el = clone.querySelector('div');
    el.id = `item-${id}`;

    el.querySelector('.result-name').textContent = file.name;
    el.querySelector('.result-meta').textContent = `Original: ${formatBytes(file.size)}`;
    el.querySelector('.result-thumb').src = URL.createObjectURL(file);

    resultsList.insertBefore(clone, resultsList.firstChild);
}

function updateStatus(id, state) {
    const el = document.getElementById(`item-${id}`);
    if (!el) return;
    const badge = el.querySelector('.status-badge');

    if (state === 'calculating') {
        badge.innerHTML = `<svg class="animate-spin -ml-0.5 mr-1.5 h-3 w-3 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Tuning...`;
        badge.className = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800';
    }
}

function handleSuccess(id, original, blob, format, w, h) {
    const el = document.getElementById(`item-${id}`);
    if (!el) return;

    // Determine Extension
    const extMap = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' };
    const ext = extMap[format] || 'img';
    const namePart = original.name.substring(0, original.name.lastIndexOf('.')) || original.name;
    const filename = `${namePart}.${ext}`;

    // Update State
    appState.files.push({ name: filename, blob: blob });
    appState.totalOriginal += original.size;
    appState.totalNew += blob.size;
    updateStats();

    // Update UI
    el.querySelector('.result-meta').textContent = `Original: ${formatBytes(original.size)} • ${w}x${h}px`;

    const badge = el.querySelector('.status-badge');
    badge.textContent = 'Ready';
    badge.className = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800';

    el.querySelector('.result-size').textContent = formatBytes(blob.size);

    const saved = original.size - blob.size;
    const pct = Math.round((saved / original.size) * 100);
    const savedEl = el.querySelector('.result-savings');

    if (saved > 0) {
        savedEl.textContent = `-${pct}% (${formatBytes(saved)})`;
        savedEl.classList.add('text-green-600');
    } else {
        savedEl.textContent = `+${Math.abs(pct)}%`;
        savedEl.className = 'text-xs font-medium text-amber-600';
    }

    // Download Link
    const link = el.querySelector('.download-link');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.classList.remove('opacity-50', 'pointer-events-none');
    el.querySelector('.opacity-0').classList.remove('opacity-0'); // Show action area
}

function markError(id, msg) {
    const el = document.getElementById(`item-${id}`);
    if (!el) return;
    const badge = el.querySelector('.status-badge');
    badge.textContent = msg;
    badge.className = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800';
}

function updateStats() {
    countBadge.textContent = appState.files.length;

    const btnState = appState.files.length === 0;
    downloadAllBtn.disabled = btnState;
    downloadAllBtnMobile.disabled = btnState;
    if(!btnState) downloadAllBtn.classList.remove('opacity-50', 'cursor-not-allowed');

    if (appState.totalOriginal > 0) {
        const diff = appState.totalOriginal - appState.totalNew;
        const sign = diff > 0 ? 'Saved' : 'Added';
        totalSavedInfo.innerHTML = `<span class="hidden md:inline">Total: </span><span class="font-bold ${diff > 0 ? 'text-green-600' : 'text-gray-600'}">${sign} ${formatBytes(Math.abs(diff))}</span>`;
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
    const zip = new JSZip();
    appState.files.forEach(f => zip.file(f.name, f.blob));
    const content = await zip.generateAsync({type:"blob"});
    saveAs(content, "optimized_images_pro.zip");
};
downloadAllBtn.addEventListener('click', handleZip);
downloadAllBtnMobile.addEventListener('click', handleZip);
