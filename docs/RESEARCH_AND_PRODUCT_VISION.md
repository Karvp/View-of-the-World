# Research and Product Vision

## North star

**Build a play environment that adapts to the child, instead of demanding that the child adapt to the software.**

"Special needs" is not a single interface profile. Cognitive, sensory, motor, communication, attention, reading, memory, and emotional-regulation needs vary across people and can also vary for the same child across situations. The product therefore starts from adjustable needs and preferences rather than diagnosis labels.

## Evidence synthesis

### 1. Cognitive accessibility requires personalization and predictability

W3C's *Making Content Usable for People with Cognitive and Learning Disabilities* states that cognitive accessibility is affected by design, structure, language, context, memory load, support, and personalization—not only traditional sensory accessibility. Its design patterns emphasize clear purpose, familiar hierarchy, predictable controls, avoiding memory dependence, focus support, and adaptation/personalization.

Sources:

- W3C, *Making Content Usable for People with Cognitive and Learning Disabilities*: https://www.w3.org/TR/coga-usable/
- W3C, *Cognitive Accessibility at W3C*: https://www.w3.org/WAI/cognitive/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/

**v2 decision:** predictable screens, visible support controls, strong focus indicators, large targets, optional labels/narration, reduced-motion mode, and no dependence on sound/color alone.

### 2. Universal Design for Learning favors learner agency and multiple means

CAST UDL Guidelines 3.0 (2024) centers learner agency and multiple means of engagement, representation, and action/expression. It also emphasizes joy, belonging, and respecting varied forms of communication.

Source:

- CAST UDL Guidelines 3.0: https://udlguidelines.cast.org/

**v2 decision:** activities are described by goals rather than deficit-based levels; the child can pause, ask for help, or end a session; symbols are paired with optional text and speech.

### 3. Serious games are promising, but far-transfer claims should be restrained

Recent reviews report promising benefits from serious/video games for targeted attention, executive-function, and social-emotional tasks in neurodevelopmental populations. At the same time, the strongest recent reviews warn that far transfer and long-term benefit are much less certain.

Selected sources:

- Carneiro et al. (2024), serious games and social skills in autistic children/adolescents: https://pubmed.ncbi.nlm.nih.gov/38470619/
- Lin & Chang (2025), serious games for children with ADHD: https://pubmed.ncbi.nlm.nih.gov/40327858/
- Systematic review of ADHD game content and far transfer (2025): https://pubmed.ncbi.nlm.nih.gov/41122750/
- Systematic review of serious games for attention/executive functions (2026): https://pubmed.ncbi.nlm.nih.gov/42199316/
- Systematic review/meta-analysis of game interventions for executive/motor functions in neurodevelopmental disorders (2026): https://pubmed.ncbi.nlm.nih.gov/41835099/

**v2 decision:** market this as learning support, not treatment. Measure interaction with trained tasks, not inferred general intelligence or clinical change.

### 4. Adaptive difficulty is useful when it remains understandable

Work on adaptive serious games for children with specific learning difficulties has shown strong usability/acceptance and argues for personalized/tailored difficulty, while still relying on educator and child feedback.

Source:

- Yildirim & Surer, adaptive serious games for children with specific learning difficulties: https://pubmed.ncbi.nlm.nih.gov/34057415/

**v2 decision:** a bounded four-band algorithm only adjusts visible task complexity. It is intentionally simple enough that a caregiver can understand it from the source.

### 5. Co-design with neurodivergent people is part of the product, not a final QA step

A systematic review of participatory methods with autistic people highlights engagement, relationships, structure, support, context, and treating participants as equal partners.

Source:

- Maun, Fabri & Trevorrow, participatory design with autistic people: https://pmc.ncbi.nlm.nih.gov/articles/PMC11300472/

**v2 decision:** this codebase is explicitly a foundation to take into co-design. It is not considered "finished for autistic children" merely because developers followed guidelines.

### 6. Child privacy should be high by default

Child-focused privacy guidance calls for best interests of the child, high privacy defaults, data minimization, profiling off by default, geolocation off by default, and avoiding manipulative nudges. The U.S. FTC's 2025 COPPA rule update also strengthens constraints on children's data collection/use/retention and third-party advertising.

Sources:

- UK ICO Age Appropriate Design Code: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/
- FTC 2025 COPPA Rule update: https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-changes-childrens-privacy-rule-limiting-companies-ability-monetize-kids-data

**v2 decision:** no third-party requests, analytics, advertising, accounts, geolocation, or cloud profile. Emotion check-ins are deliberately not stored.

## Design principles

1. **Child agency before compliance.**
2. **Needs before diagnosis labels.**
3. **Calm by default; stimulation is opt-in.**
4. **No loss-of-progress punishment for mistakes.**
5. **No "sad"/failure sound.**
6. **Hints are a legitimate strategy, not a penalty.**
7. **No visible countdown unless a future co-design study shows a specific need.**
8. **All important information has more than one cue.**
9. **Adaptation must be inspectable and reversible.**
10. **Private data should not be collected merely because it could be interesting.**

## Product architecture

### Child surface
- short visual schedule;
- choice of activities by learning goal;
- consistent play shell;
- hint/pause/end always available;
- no leaderboards, streak pressure, loot boxes, daily-return pressure, or advertising.

### Accessibility center
- calm/bright visual mode;
- high contrast;
- reduced motion;
- sound;
- narration;
- text scaling;
- large targets;
- icon labels;
- pace;
- proactive hint suggestion;
- non-locking break reminder.

### Adaptive layer
Inputs are limited to:
- attempts;
- correct task actions;
- voluntarily requested hints;
- the current bounded difficulty band.

Outputs are limited to:
- number of pairs;
- number of distractors/targets;
- sequence length.

The engine does not infer:
- diagnosis;
- IQ;
- "severity";
- emotional state;
- attention disorder;
- therapeutic outcome.

### Adult/caregiver surface
- local session count;
- recent within-task interaction accuracy;
- hint count;
- current adaptation band;
- export/delete controls;
- plain-language limitations.

## State-of-the-art roadmap

### Phase A — implemented in this package
- sensory/accessibility personalization;
- explainable adaptive difficulty;
- three adaptive activity families;
- unscored/non-persisted feelings-and-needs check-in;
- local-only progress;
- offline PWA shell;
- no third-party runtime dependencies;
- caregiver transparency.

### Phase B — co-design release
Build with children, not only for them:
- multiple communication methods during testing (talking, pointing, drawing, AAC, observing);
- predictable session structure and advance explanation;
- quiet testing space and opt-out at any moment;
- child assent in addition to adult consent;
- record preferences separately from diagnoses;
- compensate participants where appropriate and allowed;
- treat "I don't want this feature" as valuable design data.

### Phase C — accessibility expansion
- switch scanning and switch-control presets; **initial browser-based one-switch scanning implemented in v2.2; physical-device co-design/testing remains**;
- gamepad input;
- screen-reader-specific interaction audit;
- dyslexia-friendly typography choices without forcing a special font;
- caregiver-created local content packs; **symbol/text pack studio implemented in v2.2; local-photo packs remain future work**;
- optional locally stored real-photo cards;
- symbol-set integrations only where licensing/attribution is clear;
- Vietnamese + English localization architecture;
- alternative activities for users who cannot or do not want memory matching.

### Phase D — educator authoring
A local-first "activity studio":
- choose activity goal;
- choose stimuli;
- set initial support range;
- preview calm/high-contrast/large-target modes;
- export/import a content pack;
- no scripting required.

### Phase E — research instrumentation, only with explicit consent
If the team conducts formal studies:
- separate research build from consumer build;
- explicit adult consent + child assent;
- minimal event schema;
- pseudonymous study IDs;
- finite retention window;
- ethics/IRB-equivalent review where applicable;
- no ad-tech or general-purpose analytics SDK;
- preregistered outcomes for any efficacy claim.

### Phase F — privacy-preserving advanced adaptation
Only after enough co-design data exists:
- on-device contextual bandit or Bayesian adaptation;
- uncertainty-aware recommendations;
- caregiver-readable explanation for every adaptation;
- hard safety bounds and manual override;
- no diagnosis inference;
- no cloud model required for core use.

## Evaluation framework

### Accessibility
- WCAG 2.2 AA audit;
- keyboard-only;
- browser zoom to 200–400%;
- screen-reader task completion;
- reduced motion;
- large touch-target testing;
- switch-access pilot.

### Usability
- task completion without adult rescue;
- voluntary hint use;
- frustration/withdrawal signals captured qualitatively;
- child-reported comfort using accessible response methods;
- caregiver/teacher usability.

### Learning/task performance
Keep claims narrow:
- improvement within the trained activity;
- retention after a short delay;
- transfer only when directly tested;
- no clinical outcome language without appropriate study design.

### Wellbeing
Track whether the design:
- supports stopping and breaks;
- avoids shame/punishment;
- avoids compulsive-return mechanics;
- respects privacy and autonomy;
- is acceptable to the children using it.

## What "groundbreaking" should mean here

Not the largest feature count.

A genuinely leading product would combine:

- evidence-informed interaction design;
- child agency;
- deep personalization without diagnostic stereotyping;
- transparent adaptation;
- strong assistive-technology support;
- privacy by default;
- co-design with disabled/neurodivergent children;
- scientifically humble outcome claims.

That is the direction this v2 establishes.
