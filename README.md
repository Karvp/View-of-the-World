# Góc nhìn quanh em — Adaptive Inclusive v2

A privacy-first, adaptive learning-through-play web app for children with diverse cognitive, sensory, communication, motor, and learning needs.

This branch/package is a **research-informed product foundation**, not a medical device and not a digital therapeutic. It deliberately avoids diagnosing, profiling, or ranking children.

## Why v2.2 is different

The original prototype was a fixed card-matching game with five escalating levels. v2.1 changes the product model and adds a more intentional child-facing experience:

- **Needs, not labels:** a child or caregiver chooses sensory and interaction preferences without selecting a diagnosis.
- **Explainable adaptation:** task complexity changes only from observable interaction with the activity (for example, number of pairs or sequence length).
- **No punitive feedback:** a wrong selection never removes prior progress and does not trigger a negative sound.
- **Multiple means of representation:** symbols, labels, optional text-to-speech, large targets, keyboard access, high contrast, reduced motion.
- **Child agency:** pause, hint, preview, make-it-easier, skip-round, finish, and check-in controls are first-class gameplay choices.
- **Predictable mini-missions:** each session has three explicit stages with a user-controlled pause between them instead of automatic round chaining.
- **Calm intrinsic reward:** a small local garden grows across completed sessions without streaks, daily-return pressure, or loss mechanics.
- **Privacy by default:** no account, analytics, ads, geolocation, remote API, external font, or external audio.
- **Local progress:** the browser stores only activity metrics needed for adaptation. Emotion/needs check-ins are not persisted.
- **Offline-first:** a service worker caches the app shell.
- **Caregiver transparency:** the progress screen explains exactly what is stored and what adaptation means.
- **Switch-access scanning:** optional one-switch auto scanning or manual left/right scanning in the play surface and communication board, while touch/mouse/keyboard remain available.
- **AAC-friendly quick communication:** a non-persisted “Tôi cần…” board for rest, help, less information, quieter play, repeated instructions, or finishing.
- **Local content studio:** caregivers/educators can create, import, export, play, and delete symbol/text packs without an account or cloud service.
- **Support-aware recommendations:** the home suggestion uses only local play/support history and explains why it is recommending an activity; it never changes sensory settings silently.

## Included activities

### 1. Ghép đôi
Visual matching and working-memory practice. Difficulty changes the number of pairs.

### 2. Tìm mục tiêu
Visual scanning and selective attention. Difficulty changes the number of distractors/targets.

### 3. Xếp thứ tự
Sequencing and executive-function practice. A wrong choice does not erase correct steps. Difficulty changes sequence length.

### 4. Con đường hoa văn
Pattern-completion practice with bounded complexity and no time limit. Difficulty changes the repeating rule, not speed pressure.

### 5. Ngôi nhà của đồ vật
Categorization without drag-and-drop. Each item is placed by choosing a large category button, which supports keyboard, touch, and scanning access. Difficulty changes the number of items rather than adding speed pressure.

### 6. Mình đang thế nào?
A non-scored, non-persisted feelings/needs check-in. It is a communication affordance, not an emotion-recognition test.

## Adaptive engine

The engine has four bounded difficulty bands. After a three-round session:

- high interaction accuracy with no hints can increase complexity by one band;
- low accuracy or repeated hints can reduce complexity by one band;
- otherwise complexity is held steady.

The algorithm is intentionally simple and inspectable. It never infers a condition, intelligence, "ability level," or clinical status.

## Accessibility defaults

- calm visual theme;
- reduced motion;
- large touch targets;
- labels shown with icons;
- audio off by default;
- optional device-local speech synthesis;
- no information conveyed only by color or sound;
- strong keyboard focus styling;
- responsive mobile/desktop layout;
- pause and hint controls remain available during play;
- optional one-switch scanning with adjustable cadence;
- an ephemeral communication board that is excluded from progress history.

The implementation targets WCAG 2.2 AA behavior and additionally follows W3C cognitive accessibility guidance where practical.

## Privacy model

`localStorage` contains:

- display/accessibility preferences;
- recent activity summaries;
- per-activity adaptation state;
- caregiver-created symbol/text content packs, when the user explicitly creates or imports them.

It does **not** contain:

- a name or account identifier;
- location;
- microphone/camera data;
- emotion check-in history;
- AAC/communication-board choices;
- advertising identifiers;
- remote analytics identifiers.

Users can export the local JSON or erase progress from the Progress page.

## Run locally

Because service workers require a secure context, use a local HTTP server rather than opening the HTML directly.

```bash
cd src
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Quality check

No npm dependencies are required.

```bash
npm test
```

The smoke test checks JavaScript syntax, required UI IDs, manifest/service-worker presence, and verifies that the runtime source does not contain third-party HTTP calls.

## Project structure

```text
.
├── .github/workflows/quality.yml
├── docs/
│   ├── CO_DESIGN_PROTOCOL.md
│   ├── RESEARCH_AND_PRODUCT_VISION.md
│   ├── UI_UX_GAMEPLAY_V2_1.md
│   └── UI_UX_GAMEPLAY_V2_2.md
├── scripts/smoke.mjs
├── src/
│   ├── assets/icon.svg
│   ├── app.js
│   ├── index.html
│   ├── manifest.webmanifest
│   ├── style.css
│   └── sw.js
├── LICENSE
├── package.json
└── README.md
```

## What still must happen before making “state-of-the-art effectiveness” claims

Software features alone do not establish effectiveness. The next stages should include:

1. participatory co-design with children who have varied access needs;
2. structured testing with caregivers, teachers, and relevant clinicians/therapists;
3. accessibility testing with keyboard, screen readers, touch, switch-access pathways, and real assistive-technology users;
4. content validation so activities do not teach stereotypes or over-generalized social rules;
5. an ethics/privacy review before collecting any research telemetry;
6. a preregistered pilot if the team eventually wants to make learning/therapeutic outcome claims.

See `docs/RESEARCH_AND_PRODUCT_VISION.md`.
