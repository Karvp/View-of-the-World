# UI/UX & gameplay redesign — v2.1

## What changed

### Product experience
- Reframed the home screen as a calm exploration space rather than a level menu.
- Added a persistent local **small garden** that grows after sessions. It is not a score, streak, currency, or unlock gate.
- Added an explicit three-step visual journey so the child knows what comes next.
- Reworked activity cards into visually distinct “worlds” while keeping labels and descriptions visible.
- Added quick accessibility presets: Calm, Balanced, and Focus.
- Improved desktop/mobile responsive layout, hierarchy, spacing, and visual consistency.

### Gameplay flow
- Every scored activity now uses three predictable mini-missions: **Khởi động → Khám phá → Tự tin**.
- The game no longer automatically throws the player into the next round. A transition screen lets the player decide when to continue.
- Added first-class controls during play:
  - **Gợi ý** — highlights the next useful action without completing it.
  - **Xem trước** — memory-game preview; counts as support but never as failure.
  - **Nhẹ hơn** — immediately restarts the current mission with less information; prior missions remain complete.
  - **Bỏ qua chặng** — moves on without penalty.
  - **Tạm nghỉ** — a no-countdown pause.
- Added a fourth adaptive activity, **Con đường hoa văn**, for visual pattern reasoning.
- Improved contextual hints and task feedback without negative/failure sounds.

### Adaptation
- Difficulty can now shift between missions using the previous mission's accuracy/support use.
- Persistent difficulty uses session-level evidence with hysteresis-like thresholds to avoid oscillating after one mistake.
- Manual “Nhẹ hơn” requests are treated as valid preference evidence, not failure.
- Adaptation remains bounded to four transparent bands and never infers diagnosis, IQ, severity, or emotion.

### Reward philosophy
The reward layer is intentionally non-competitive. The garden grows with completed sessions, but:
- there is no daily streak;
- nothing decays;
- nothing is lost for skipping or pausing;
- there is no leaderboard, currency, loot box, or time pressure.

## Browser validation performed
The v2.1 build was exercised in headless Chromium across desktop and mobile-sized viewports. Automated interaction covered:
- memory game start, preview, matching, and full three-mission completion;
- visual-search full completion;
- sequence full completion;
- pattern full completion;
- check-in feeling → need → result flow;
- settings preset rendering;
- zero browser JavaScript errors during these paths.

The repository smoke test also verifies JavaScript parsing, required UI anchors, manifest validity, and the absence of third-party HTTP runtime URLs.
