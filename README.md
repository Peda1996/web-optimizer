# Web Image Optimizer Pro

A powerful, privacy-focused web application for optimizing and converting images directly in your browser. No server uploads required - all processing happens locally on your device.

## Features

- **Multiple Output Formats**: Convert images to WebP, AVIF, JPEG, or PNG
- **Two Optimization Modes**:
  - **Quality Mode**: Set a specific quality level (1-100%)
  - **Target Size Mode**: Automatically find the best quality to fit a target file size
- **Image Resizing**: Optionally resize images by specifying a maximum width
- **Batch Processing**: Process multiple images at once
- **ZIP Download**: Download all optimized images in a single ZIP file
- **Multi-Language Support**: English and German (auto-detects browser language)
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
2. Select your preferred language (EN/DE) - defaults to browser language
3. Configure your optimization settings:
   - Select output format (WebP recommended for best compression)
   - Choose optimization mode (Quality or Target Size)
   - Optionally set a maximum width for resizing
4. Drag and drop images onto the drop zone, or click to browse
5. View results and download individually or as a ZIP

## Project Structure

```
web optimizer/
├── index.html          # Main HTML structure
├── styles.css          # Custom styles (scrollbar, drop zone, animations)
├── script.js           # Application logic
├── i18n.js             # Internationalization module
├── locales/
│   ├── en.json         # English translations
│   └── de.json         # German translations
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

## Adding New Languages

1. Create a new JSON file in `locales/` (e.g., `fr.json`)
2. Copy the structure from `en.json` and translate the values
3. Add the language option to the selector in `index.html`
4. Add the language code to `supportedLangs` array in `i18n.js`

## Author

Made by [Peda1996](https://github.com/Peda1996) for [photogala.net](https://photogala.net)

## License

MIT License - Feel free to use and modify as needed.
