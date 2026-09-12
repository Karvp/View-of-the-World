# UI/UX & Gameplay v2.2 — Access, authorship, communication

## Goal

v2.2 moves the project from a polished adaptive game shell toward an **inclusive learning platform**. The emphasis is not more visual effects. It is increasing the number of ways a child can participate and increasing caregiver control without turning the child into a data profile.

## 1. One-switch / scanning access

A new optional scanning mode is available in Settings → Điều khiển thay thế.

- automatic scan cadences: 2.5 s, 1.8 s, or 1.2 s;
- manual scan using Left/Right arrows;
- Space or Enter activates the highlighted target;
- scanning works in the play surface and the “Tôi cần…” communication board;
- touch, mouse, ordinary keyboard navigation, and screen-reader semantics remain present;
- the scan indicator is deliberately very visible and receives a stronger alternate color in high-contrast mode.

The scanner does not run on general settings/forms, reducing accidental activation while adults configure the app.

## 2. AAC-friendly “Tôi cần…” board

A persistent play-surface button opens six large communication choices:

- Nghỉ một chút;
- Giúp tôi;
- Ít hơn;
- Yên hơn;
- Nói lại;
- Tôi xong rồi.

These choices invoke immediate actions rather than creating an emotional/behavioral record. **The selected communication choice is not persisted in progress history.**

This is intentionally a lightweight communication affordance, not a replacement for a child’s AAC system.

## 3. Local content studio

The new Nội dung screen lets an adult create familiar content without developer tools.

Each line has the form:

```text
🥄 | Cái thìa
🧦 | Đôi tất
📘 | Quyển sách
🪥 | Bàn chải
```

A pack can currently power:

- Vườn ghép đôi;
- Săn dấu hiệu.

Properties:

- 4–12 items per pack;
- stored only in local browser storage;
- JSON import/export for transferring packs intentionally;
- no image upload, microphone, camera, account, or server endpoint;
- pack deletion is explicit;
- custom pack titles are not copied into adaptation/session history.

Future co-design should decide whether local real photographs are worth the extra privacy/storage complexity.

## 4. Fifth adaptive activity: Ngôi nhà của đồ vật

This is a categorization activity designed **without drag-and-drop**.

A single item is shown, followed by two large category choices. A wrong choice:

- does not erase earlier correct placements;
- does not play a failure sound;
- leaves the item available to try again.

The final choice set locks immediately once a round completes, preventing double-activation from rapid touch or switch input during the transition.

## 5. Support-aware personalization

The recommendation layer now considers:

- how often each activity has been played;
- the bounded current activity complexity;
- recent use of hints, preview, or “Nhẹ hơn”.

It only recommends an activity and explains the reason. It **does not**:

- infer diagnosis;
- infer intelligence;
- infer mood;
- silently turn sensory settings on/off;
- silently remove support buttons.

The child remains able to ignore the recommendation.

## 6. Accessibility interaction rules

v2.2 adds or reinforces these rules:

1. No essential task requires dragging.
2. Important actions remain large buttons.
3. Switch scanning is additive, not an exclusive input mode.
4. Communication choices are ephemeral.
5. Adult-authored content remains local unless explicitly exported.
6. Help use is treated as a strategy, not failure.
7. The app never increases difficulty by more than one bounded step.
8. A user can request less information immediately.

## Validation completed for this checkpoint

- `npm test` passes;
- browser JavaScript parses;
- no duplicate DOM IDs;
- every static `<button>` declares `type="button"` or `type="submit"`;
- no third-party runtime HTTP URLs;
- browser interaction test exercised custom pack creation/play, AAC board, three-stage categorization completion, switch-scanning target advancement, and mobile horizontal-overflow checks;
- no page or console JavaScript errors were observed in those exercised paths.

## Still required before broad accessibility claims

Real assistive-technology testing remains mandatory. In particular:

- physical switch devices and OS switch-control software;
- VoiceOver/TalkBack/NVDA/JAWS combinations;
- children who already use AAC systems;
- motor-access users with involuntary/repeated activation;
- caregivers and teachers authoring real content packs.

The implementation is a testable engineering foundation, not evidence that all switch/AAC users will find the interaction suitable.
