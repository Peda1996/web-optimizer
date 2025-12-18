# Web Image Optimizer Pro

A powerful, privacy-focused web application for optimizing and converting images directly in your browser. No server uploads required - all processing happens locally on your device.

**[Live Demo](https://peda1996.github.io/web-optimizer/)**

## Features

- **Multiple Output Formats**: Convert images to WebP, AVIF, JPEG, or PNG
- **Two Optimization Modes**:
  - **Quality Mode**: Set a specific quality level (1-100%)
  - **Target Size Mode**: Automatically find the best quality to fit a target file size
- **Quick Presets**: Economy, Balanced, High Quality, and Maximum presets for fast setup
- **Image Resizing**: Set maximum width and/or height while maintaining aspect ratio
- **Batch Processing**: Process multiple images at once
- **ZIP Download**: Download all optimized images in a single ZIP file
- **Before/After Preview**: Compare original and optimized images side by side
- **Custom File Naming**: Add prefix and suffix to output filenames
- **Dark Mode**: Toggle between light and dark themes (follows system preference)
- **Multi-Language Support**: English, German, French, Spanish, Italian, Portuguese (auto-detects browser language)
- **Privacy First**: 100% client-side processing - your images never leave your device

## Supported Input Formats

- JPEG / JPG
- PNG
- WebP
- AVIF
- BMP
- GIF

## Usage

1. Open `index.html` in a modern web browser
2. Select your preferred language (auto-detected) and theme
3. Choose a preset or configure custom settings:
   - Select output format (WebP recommended for best compression)
   - Choose optimization mode (Quality or Target Size)
   - Set maximum dimensions if needed
   - Configure filename prefix/suffix
4. Drag and drop images onto the drop zone, or click to browse
5. Click Preview to compare before/after
6. Download individually or as a ZIP

## Project Structure

```
web optimizer/
├── index.html          # Main HTML structure
├── styles.css          # Custom styles (themes, animations)
├── script.js           # Application logic
├── i18n.js             # Internationalization module
├── locales/
│   ├── en.json         # English translations
│   ├── de.json         # German translations
│   ├── fr.json         # French translations
│   ├── es.json         # Spanish translations
│   ├── it.json         # Italian translations
│   └── pt.json         # Portuguese translations
├── .gitignore          # Git exclusions
├── LICENSE             # MIT License
└── README.md           # This file
```

## Dependencies (CDN)

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [JSZip](https://stuk.github.io/jszip/) - ZIP file generation
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - Client-side file saving

## Browser Compatibility

Works best in modern browsers that support:
- Canvas API
- Blob API
- File API
- WebP/AVIF encoding (browser-dependent)
- ES6+ JavaScript
- CSS Dark Mode (prefers-color-scheme)

## Adding New Languages

1. Create a new JSON file in `locales/` (e.g., `nl.json`)
2. Copy the structure from `en.json` and translate the values
3. Add the language option to the selector in `index.html`
4. Add the language code to `supportedLangs` array in `i18n.js`
5. Add fallback translations to `fallbackTranslations` object in `i18n.js`

## Author

Made by [Peda1996](https://github.com/Peda1996) for [photogala.net](https://photogala.net)

## License

MIT License - Feel free to use and modify as needed.
