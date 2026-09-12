# Upgrade application instructions

This package is designed to replace the current prototype source while preserving the repository license.

## Replace

- `src/index.html`
- `src/style.css`
- `src/app.js`

## Add

- `src/manifest.webmanifest`
- `src/sw.js`
- `src/assets/icon.svg`
- `README.md`
- `docs/RESEARCH_AND_PRODUCT_VISION.md`
- `docs/CO_DESIGN_PROTOCOL.md`
- `package.json`
- `scripts/smoke.mjs`
- `.github/workflows/quality.yml`

## Preserve

- `LICENSE`

## Suggested Git workflow

```bash
git checkout -b research/adaptive-inclusive-v2.2
# copy the files from this package into the repository
npm test
git add .
git commit -m "feat: rebuild as adaptive inclusive learning platform"
git push -u origin research/adaptive-inclusive-v2.2
```

Then open a pull request into `main`.

The connected GitHub integration used while preparing this package returned HTTP 403 when asked to create a branch, so the repository itself was intentionally left unchanged rather than writing directly to `main`.


## v2.2 additions

This checkpoint also adds switch-access scanning, a non-persisted quick communication board, local caregiver content packs, categorization gameplay, and support-aware local recommendations.
