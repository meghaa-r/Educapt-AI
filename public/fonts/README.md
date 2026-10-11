# OpenDyslexic Font Asset Instructions

This directory (`/public/fonts/`) is configured to host local font files for **OpenDyslexic**.

## How to Add OpenDyslexic Font Files

1. Visit the official OpenDyslexic repository or project website:
   - Official website: https://opendyslexic.org/
   - SIL Open Font License (OFL) repository: https://github.com/antijingoist/opendyslexic

2. Download the web font files (WOFF2 format recommended for modern browsers, or WOFF/OTF):
   - `OpenDyslexic-Regular.woff2` (or `.otf`)
   - `OpenDyslexic-Bold.woff2` (or `.otf`)
   - `OpenDyslexic-Italic.woff2` (or `.otf`)

3. Place the downloaded files directly into this directory:
   ```
   public/
     fonts/
       OpenDyslexic-Regular.woff2
       OpenDyslexic-Bold.woff2
       OpenDyslexic-Italic.woff2
   ```

4. The application CSS (`src/styles/variables.css`) already defines the `@font-face` rules:
   ```css
   @font-face {
     font-family: 'OpenDyslexic';
     src: local('OpenDyslexic'),
          url('/fonts/OpenDyslexic-Regular.woff2') format('woff2'),
          url('/fonts/OpenDyslexic-Regular.otf') format('opentype');
     font-weight: 400;
     font-style: normal;
     font-display: swap;
   }
   ```

## Fallback Font Stack

When the local font files are not placed in this folder, Educapt AI automatically uses its robust, research-backed dyslexia-friendly fallback font stack:
```css
--reader-font-fallback: 'Lexend', 'Comic Sans MS', 'Verdana', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```
This ensures high character distinction, generous counter spaces, and heavy baseline weighting even before optional font files are downloaded.
