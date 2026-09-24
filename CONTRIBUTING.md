# Contributing

Thank you for helping improve Góc nhìn quanh em.

## Development principles

Changes should preserve the project's core qualities: predictable interactions, accessible controls, clear Vietnamese copy, local-first data handling, and compatibility with simple PHP hosting.

When changing the child-facing experience, prefer small and obvious interactions over additional interface complexity. Preserve keyboard access, visible focus behavior, touch usability, reduced-motion behavior, and switch-scanning support where applicable.

## Local checks

The production application does not require a package install. Before submitting a change, run the checks available on your system:

```bash
node --check app.js
php -l index.php
php -l manifest.php
```

Also exercise the changed flow in a browser at both desktop and narrow/mobile viewport sizes. For service-worker changes, test once with a clean site cache.

## Pull requests

Keep each pull request focused on one coherent change. Explain the user-visible behavior, accessibility impact when relevant, and how you tested it. Avoid committing generated browser profiles, dependency folders, local environment files, or credentials.
