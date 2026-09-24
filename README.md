# Góc nhìn quanh em · View of the World

[![Validate](https://github.com/Karvp/View-of-the-World/actions/workflows/validate.yml/badge.svg)](https://github.com/Karvp/View-of-the-World/actions/workflows/validate.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)

**Góc nhìn quanh em** is a Vietnamese, accessibility-focused learning and communication web app designed around predictable interactions, visual support, and configurable assistance for children who benefit from a simpler interface.

## Features

- Child-first home and activity flows with large, visual controls.
- Guided learning activities with immediate feedback and adjustable support.
- A quick communication board for expressing needs.
- Local progress tracking and personalization.
- Family-created content packs using familiar images and optional voice data.
- Adult-facing progress, content, and settings areas protected by a hold interaction.
- Switch-scanning and reduced-complexity options for additional accessibility support.
- Installable PWA behavior through the web manifest and service worker.

## Run locally

The production app has no npm, Composer, or database dependency. A PHP 8.1+ server is enough:

```bash
php -S 127.0.0.1:8080
```

Then open `http://127.0.0.1:8080/index.php`.

For syntax checks during development:

```bash
node --check app.js
php -l index.php
php -l manifest.php
```

## Project layout

```text
.
├── index.php                 # Production entry point
├── index.html                # Compatibility/fallback entry
├── app.js                    # Application behavior and local persistence
├── style.css                 # Core styles
├── design-system.css         # Design tokens and shared components
├── dialog-system.css         # Dialog and modal styling
├── ui-polish.css             # UI refinement layer
├── qa-polish.css             # Final QA fixes
├── sw.js                     # Service worker
├── manifest.webmanifest      # PWA manifest
├── manifest.php              # PHP manifest endpoint
└── assets/icon.svg           # Application icon
```

## Deployment

The application can be served from a standard PHP 8.1+ web host. Place the runtime files in the site's document root and open `index.php`. No build step is required.

Because the app uses a service worker, a browser can temporarily retain an older UI after a deployment. A hard refresh or clearing the previous site/service-worker cache resolves that when checking a new release.

## Data and privacy

Progress, preferences, and user-created content are stored in the browser on the device. The production code does not require an application database.

## Contributing

Contributions are welcome. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request. Security-sensitive reports should follow [`SECURITY.md`](SECURITY.md).

## License

This project is licensed under the **GNU General Public License v3.0**. See [`LICENSE`](LICENSE).
