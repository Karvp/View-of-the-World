(() => {
  "use strict";

  const STORAGE_KEYS = {
    preferences: "votw.preferences.v2",
    progress: "votw.progress.v2",
    packs: "votw.content-packs.v1"
  };

  const DEFAULT_PREFERENCES = {
    visualMode: "calm",
    highContrast: false,
    reduceMotion: true,
    sound: false,
    narration: false,
    textSize: "1",
    largeTargets: true,
    labels: true,
    pace: "gentle",
    autoHint: true,
    breakMinutes: 5,
    switchScanning: false,
    scanSpeed: 1800
  };

  const DEFAULT_PROGRESS = {
    version: 2.2,
    sessions: [],
    activities: {
      match: { difficulty: 0, sessions: 0, totalHints: 0, lastAccuracy: null },
      focus: { difficulty: 0, sessions: 0, totalHints: 0, lastAccuracy: null },
      sequence: { difficulty: 0, sessions: 0, totalHints: 0, lastAccuracy: null },
      pattern: { difficulty: 0, sessions: 0, totalHints: 0, lastAccuracy: null },
      classify: { difficulty: 0, sessions: 0, totalHints: 0, lastAccuracy: null }
    }
  };

  const ACTIVITY_META = {
    match: {
      title: "Vườn ghép đôi",
      skill: "Ghi nhớ • phân biệt hình ảnh",
      instruction: "Tìm hai thẻ giống nhau. Có thể xem trước hoặc xin gợi ý.",
      icon: "◆",
      intro: [
        "Bắt đầu với một khu vườn nhỏ.",
        "Một vài thẻ mới xuất hiện.",
        "Chặng cuối vẫn theo nhịp của bạn."
      ]
    },
    focus: {
      title: "Săn dấu hiệu",
      skill: "Chú ý thị giác • quét tìm",
      instruction: "Tìm tất cả biểu tượng giống mẫu. Chọn nhầm cũng không sao.",
      icon: "◎",
      intro: [
        "Nhìn mẫu rồi tìm những dấu hiệu giống nó.",
        "Khu vườn có thêm vài chi tiết.",
        "Chặng cuối: cứ tìm từng dấu hiệu một."
      ]
    },
    sequence: {
      title: "Đường đi nhỏ",
      skill: "Trình tự • chức năng điều hành",
      instruction: "Chọn từng bước theo thứ tự. Phần đúng luôn được giữ lại.",
      icon: "123",
      intro: [
        "Đi từng bước, không cần vội.",
        "Con đường dài hơn một chút nếu chặng trước thoải mái.",
        "Chọn bước tiếp theo và giữ lại mọi phần đã đúng."
      ]
    },
    pattern: {
      title: "Con đường hoa văn",
      skill: "Nhận biết quy luật • suy luận",
      instruction: "Nhìn chuỗi hình và chọn mảnh còn thiếu. Không cần làm nhanh.",
      icon: "◈",
      intro: [
        "Quan sát nhịp lặp của các hình.",
        "Quy luật có thể thay đổi một chút.",
        "Chặng cuối: tìm mảnh khiến con đường tiếp tục."
      ]
    },
    classify: {
      title: "Ngôi nhà của đồ vật",
      skill: "Phân loại • khái niệm",
      instruction: "Nhìn một mục rồi chọn nhóm phù hợp. Không cần kéo thả.",
      icon: "▦",
      intro: [
        "Mỗi đồ vật chỉ cần tìm một ngôi nhà phù hợp.",
        "Có thêm vài mục, nhưng cách chọn vẫn giống nhau.",
        "Chặng cuối: nhìn từng mục một và chọn nhóm phù hợp."
      ]
    },
    checkin: {
      title: "Mình đang thế nào?",
      skill: "Tự nhận biết • giao tiếp nhu cầu",
      instruction: "Chọn điều gần nhất với bạn lúc này. Không có đáp án đúng và lựa chọn này không được lưu.",
      icon: "♡"
    }
  };

  const MATCH_POOLS = {
    colors: [
      { id: "red", symbol: "●", label: "Đỏ", tone: "#b84b4b" },
      { id: "blue", symbol: "●", label: "Xanh dương", tone: "#3d73a2" },
      { id: "green", symbol: "●", label: "Xanh lá", tone: "#43805a" },
      { id: "yellow", symbol: "●", label: "Vàng", tone: "#a98222" },
      { id: "purple", symbol: "●", label: "Tím", tone: "#7561a5" }
    ],
    shapes: [
      { id: "triangle", symbol: "▲", label: "Tam giác" },
      { id: "square", symbol: "■", label: "Hình vuông" },
      { id: "star", symbol: "★", label: "Ngôi sao" },
      { id: "circle", symbol: "○", label: "Hình tròn" },
      { id: "diamond", symbol: "◆", label: "Hình thoi" }
    ],
    animals: [
      { id: "cat", symbol: "🐱", label: "Mèo" },
      { id: "dog", symbol: "🐶", label: "Chó" },
      { id: "rabbit", symbol: "🐰", label: "Thỏ" },
      { id: "fish", symbol: "🐟", label: "Cá" },
      { id: "bird", symbol: "🐦", label: "Chim" }
    ]
  };

  const FOCUS_GROUPS = [
    [
      { id: "leaf", symbol: "🍃", label: "chiếc lá" },
      { id: "flower", symbol: "🌼", label: "bông hoa" },
      { id: "tree", symbol: "🌳", label: "cái cây" },
      { id: "seedling", symbol: "🌱", label: "mầm cây" },
      { id: "clover", symbol: "☘", label: "cỏ ba lá" }
    ],
    [
      { id: "star", symbol: "★", label: "ngôi sao" },
      { id: "circle", symbol: "●", label: "hình tròn" },
      { id: "triangle", symbol: "▲", label: "tam giác" },
      { id: "diamond", symbol: "◆", label: "hình thoi" },
      { id: "square", symbol: "■", label: "hình vuông" }
    ],
    [
      { id: "cat", symbol: "🐱", label: "con mèo" },
      { id: "dog", symbol: "🐶", label: "con chó" },
      { id: "rabbit", symbol: "🐰", label: "con thỏ" },
      { id: "fish", symbol: "🐟", label: "con cá" },
      { id: "bird", symbol: "🐦", label: "con chim" }
    ]
  ];

  const SEQUENCES = [
    {
      id: "numbers",
      label: "Các số tăng dần",
      items: [
        { id: "n1", symbol: "1", label: "Một" },
        { id: "n2", symbol: "2", label: "Hai" },
        { id: "n3", symbol: "3", label: "Ba" },
        { id: "n4", symbol: "4", label: "Bốn" },
        { id: "n5", symbol: "5", label: "Năm" }
      ]
    },
    {
      id: "plant",
      label: "Cây lớn lên",
      items: [
        { id: "p1", symbol: "•", label: "Hạt" },
        { id: "p2", symbol: "🌱", label: "Mầm" },
        { id: "p3", symbol: "🌿", label: "Cây non" },
        { id: "p4", symbol: "🌳", label: "Cây lớn" }
      ]
    },
    {
      id: "moon",
      label: "Từ ít sáng đến tròn",
      items: [
        { id: "m1", symbol: "🌑", label: "Trăng mới" },
        { id: "m2", symbol: "🌓", label: "Bán nguyệt" },
        { id: "m3", symbol: "🌕", label: "Trăng tròn" }
      ]
    },
    {
      id: "day",
      label: "Một ngày đi qua",
      items: [
        { id: "d1", symbol: "🌅", label: "Buổi sáng" },
        { id: "d2", symbol: "☀", label: "Buổi trưa" },
        { id: "d3", symbol: "🌇", label: "Buổi chiều" },
        { id: "d4", symbol: "🌙", label: "Buổi tối" }
      ]
    }
  ];

  const PATTERN_SYMBOL_SETS = [
    ["●", "▲", "■", "◆"],
    ["🍃", "🌼", "🌱", "☘"],
    ["🐟", "🐰", "🐦", "🐱"],
    ["1", "2", "3", "4"]
  ];

  const CATEGORY_SETS = [
    {
      label: "Thiên nhiên quanh em",
      groups: [
        { id: "plant", label: "Cây & hoa", symbol: "🌿", items: [{ symbol: "🍃", label: "Lá" }, { symbol: "🌼", label: "Hoa" }, { symbol: "🌱", label: "Mầm cây" }, { symbol: "🌳", label: "Cây" }] },
        { id: "animal", label: "Con vật", symbol: "🐾", items: [{ symbol: "🐱", label: "Mèo" }, { symbol: "🐟", label: "Cá" }, { symbol: "🐦", label: "Chim" }, { symbol: "🐰", label: "Thỏ" }] }
      ]
    },
    {
      label: "Ký hiệu",
      groups: [
        { id: "number", label: "Con số", symbol: "123", items: [{ symbol: "1", label: "Số một" }, { symbol: "2", label: "Số hai" }, { symbol: "3", label: "Số ba" }, { symbol: "4", label: "Số bốn" }] },
        { id: "shape", label: "Hình", symbol: "◆", items: [{ symbol: "▲", label: "Tam giác" }, { symbol: "■", label: "Hình vuông" }, { symbol: "●", label: "Hình tròn" }, { symbol: "★", label: "Ngôi sao" }] }
      ]
    },
    {
      label: "Đồ dùng quen thuộc",
      groups: [
        { id: "food", label: "Đồ ăn", symbol: "🍎", items: [{ symbol: "🍎", label: "Táo" }, { symbol: "🍞", label: "Bánh mì" }, { symbol: "🥕", label: "Cà rốt" }, { symbol: "🍌", label: "Chuối" }] },
        { id: "clothes", label: "Quần áo", symbol: "👕", items: [{ symbol: "👕", label: "Áo" }, { symbol: "🧦", label: "Tất" }, { symbol: "🧢", label: "Mũ" }, { symbol: "👟", label: "Giày" }] }
      ]
    }
  ];

  const CHECKIN_FEELINGS = [
    { id: "comfortable", symbol: "🙂", label: "Dễ chịu" },
    { id: "tired", symbol: "😴", label: "Mệt" },
    { id: "worried", symbol: "😟", label: "Lo" },
    { id: "upset", symbol: "😣", label: "Khó chịu" },
    { id: "sad", symbol: "😔", label: "Buồn" },
    { id: "unsure", symbol: "😐", label: "Không chắc" }
  ];

  const CHECKIN_NEEDS = [
    { id: "quiet", symbol: "◌", label: "Yên tĩnh" },
    { id: "move", symbol: "↗", label: "Vận động" },
    { id: "help", symbol: "🤝", label: "Giúp đỡ" },
    { id: "water", symbol: "💧", label: "Uống nước" },
    { id: "alone", symbol: "□", label: "Ở một mình" },
    { id: "talk", symbol: "💬", label: "Nói chuyện" }
  ];

  let preferences = loadJson(STORAGE_KEYS.preferences, DEFAULT_PREFERENCES);
  let progress = normalizeProgress(loadJson(STORAGE_KEYS.progress, DEFAULT_PROGRESS));
  let contentPacks = normalizePacks(loadArrayJson(STORAGE_KEYS.packs));
  let session = null;
  let breakTimer = null;
  let toastTimer = null;
  let audioContext = null;
  let lastFocusedBeforeModal = null;
  let scanTimer = null;
  let scanIndex = -1;
  let scanTargets = [];
  let scanRefreshTimer = null;

  const els = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheElements();
    bindNavigation();
    bindSettings();
    bindPlayControls();
    bindProgressControls();
    bindPackControls();
    bindCommunicationControls();
    bindSwitchScanning();
    applyPreferences();
    syncSettingsForm();
    renderProgress();
    renderContentPacks();
    updateHome();
    showScreen("home", false);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  }

  function cacheElements() {
    els.mainContent = document.getElementById("mainContent");
    els.gameArea = document.getElementById("gameArea");
    els.gameTitle = document.getElementById("gameTitle");
    els.gameSkill = document.getElementById("gameSkill");
    els.gameInstruction = document.getElementById("gameInstruction");
    els.roundDots = document.getElementById("roundDots");
    els.hintBtn = document.getElementById("hintBtn");
    els.previewBtn = document.getElementById("previewBtn");
    els.easierBtn = document.getElementById("easierBtn");
    els.skipRoundBtn = document.getElementById("skipRoundBtn");
    els.supportText = document.getElementById("supportText");
    els.toast = document.getElementById("toast");
    els.pauseModal = document.getElementById("pauseModal");
    els.metricGrid = document.getElementById("metricGrid");
    els.skillProgressList = document.getElementById("skillProgressList");
    els.recentList = document.getElementById("recentList");
    els.completeMessage = document.getElementById("completeMessage");
    els.sessionReflection = document.getElementById("sessionReflection");
    els.visualModeChip = document.getElementById("visualModeChip");
    els.soundChip = document.getElementById("soundChip");
    els.motionChip = document.getElementById("motionChip");
    els.difficultyChip = document.getElementById("difficultyChip");
    els.quickStartBtn = document.getElementById("quickStartBtn");
    els.recommendationBtn = document.getElementById("recommendationBtn");
    els.recommendationTitle = document.getElementById("recommendationTitle");
    els.recommendationText = document.getElementById("recommendationText");
    els.customPacksSection = document.getElementById("customPacksSection");
    els.customPacksList = document.getElementById("customPacksList");
    els.packLibraryList = document.getElementById("packLibraryList");
    els.communicationModal = document.getElementById("communicationModal");
  }

  function bindNavigation() {
    document.querySelectorAll("[data-route]").forEach((button) => {
      button.addEventListener("click", () => showScreen(button.dataset.route));
    });

    document.querySelectorAll("[data-activity]").forEach((button) => {
      button.addEventListener("click", () => startActivity(button.dataset.activity));
    });

    document.addEventListener("click", (event) => {
      const startPackButton = event.target.closest("[data-custom-pack]");
      if (startPackButton) startActivity(startPackButton.dataset.packType, startPackButton.dataset.customPack);
    });
  }

  function bindSettings() {
    document.getElementById("saveSettingsBtn").addEventListener("click", () => {
      preferences = readSettingsForm();
      saveJson(STORAGE_KEYS.preferences, preferences);
      applyPreferences();
      updateHome();
      showToast("Đã lưu cách chơi trên thiết bị này.");
      showScreen("home");
    });

    document.getElementById("restoreDefaultsBtn").addEventListener("click", () => {
      preferences = { ...DEFAULT_PREFERENCES };
      saveJson(STORAGE_KEYS.preferences, preferences);
      applyPreferences();
      syncSettingsForm();
      updateHome();
      showToast("Đã khôi phục cài đặt mặc định dễ chịu.");
    });

    document.querySelectorAll("[data-preset]").forEach((button) => {
      button.addEventListener("click", () => applyPreset(button.dataset.preset));
    });
  }

  function bindPlayControls() {
    document.getElementById("leaveActivityBtn").addEventListener("click", endActivityEarly);
    document.getElementById("pauseBtn").addEventListener("click", () => openPause(false));
    document.getElementById("communicationBtn").addEventListener("click", openCommunicationBoard);
    document.getElementById("resumeBtn").addEventListener("click", closePause);
    document.getElementById("finishFromPauseBtn").addEventListener("click", () => {
      closePause();
      endActivityEarly();
    });

    document.getElementById("readInstructionBtn").addEventListener("click", () => {
      speak(els.gameInstruction.textContent, true);
    });

    els.hintBtn.addEventListener("click", requestHint);
    els.previewBtn.addEventListener("click", previewCurrentRound);
    els.easierBtn.addEventListener("click", makeCurrentRoundEasier);
    els.skipRoundBtn.addEventListener("click", skipCurrentRound);

    document.getElementById("playAgainBtn").addEventListener("click", () => {
      if (session?.type && session.type !== "checkin") startActivity(session.type);
      else showScreen("home");
    });
  }

  function bindProgressControls() {
    document.getElementById("exportDataBtn").addEventListener("click", exportData);
    document.getElementById("resetDataBtn").addEventListener("click", () => {
      const confirmed = window.confirm("Xóa toàn bộ tiến trình thích ứng trên thiết bị này?");
      if (!confirmed) return;
      progress = structuredCloneSafe(DEFAULT_PROGRESS);
      saveJson(STORAGE_KEYS.progress, progress);
      renderProgress();
      updateHome();
      showToast("Đã xóa tiến trình cục bộ.");
    });
  }

  function bindPackControls() {
    const form = document.getElementById("packForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = document.getElementById("packTitleInput").value.trim();
      const type = document.getElementById("packTypeInput").value;
      const parsed = parsePackItems(document.getElementById("packItemsInput").value);
      if (!title || parsed.length < 4) {
        showToast("Cần tên gói và ít nhất 4 mục hợp lệ.");
        return;
      }
      const pack = { id: `pack-${Date.now().toString(36)}`, title: title.slice(0, 48), type: type === "focus" ? "focus" : "match", items: parsed.slice(0, 12) };
      contentPacks.push(pack);
      savePacks();
      form.reset();
      renderContentPacks();
      updateHome();
      showToast("Đã lưu gói nội dung trên thiết bị này.");
    });

    document.getElementById("exportPacksBtn").addEventListener("click", exportPacks);
    document.getElementById("importPacksBtn").addEventListener("click", () => document.getElementById("importPacksInput").click());
    document.getElementById("importPacksInput").addEventListener("change", importPacks);

    els.packLibraryList.addEventListener("click", (event) => {
      const deleteButton = event.target.closest("[data-delete-pack]");
      if (!deleteButton) return;
      const pack = contentPacks.find((item) => item.id === deleteButton.dataset.deletePack);
      if (!pack || !window.confirm(`Xóa gói “${pack.title}”?`)) return;
      contentPacks = contentPacks.filter((item) => item.id !== pack.id);
      savePacks();
      renderContentPacks();
      updateHome();
    });
  }

  function bindCommunicationControls() {
    document.getElementById("closeCommunicationBtn").addEventListener("click", closeCommunicationBoard);
    els.communicationModal.addEventListener("click", (event) => {
      if (event.target === els.communicationModal) closeCommunicationBoard();
    });
    document.querySelectorAll("[data-comm]").forEach((button) => {
      button.addEventListener("click", () => handleCommunicationChoice(button.dataset.comm));
    });
  }

  function bindSwitchScanning() {
    document.addEventListener("keydown", (event) => {
      if (!preferences.switchScanning || !document.getElementById("playScreen").classList.contains("is-active")) return;
      if (event.key === " " || event.key === "Enter") {
        if (!scanTargets.length || scanIndex < 0) return;
        event.preventDefault();
        scanTargets[scanIndex]?.click();
        scheduleScanRefresh();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        advanceScan(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        advanceScan(-1);
      }
    });

    const observer = new MutationObserver(() => scheduleScanRefresh());
    observer.observe(document.getElementById("playScreen"), { subtree: true, childList: true, attributes: true, attributeFilter: ["hidden", "disabled"] });
    observer.observe(els.communicationModal, { subtree: true, childList: true, attributes: true, attributeFilter: ["hidden", "disabled"] });
  }

  function showScreen(name, focus = true) {
    document.querySelectorAll("[data-screen]").forEach((screen) => {
      screen.classList.toggle("is-active", screen.dataset.screen === name);
    });

    document.querySelectorAll(".nav-button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.route === name);
    });

    if (name === "progress") renderProgress();
    if (name === "packs") renderContentPacks();
    if (name === "settings") syncSettingsForm();
    if (name === "home") updateHome();
    if (name === "play") scheduleScanRefresh();
    else stopSwitchScan();

    if (focus) {
      requestAnimationFrame(() => {
        els.mainContent.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: preferences.reduceMotion ? "auto" : "smooth" });
      });
    }
  }

  function startActivity(type, packId = null) {
    clearBreakTimer();
    const customPack = packId ? contentPacks.find((pack) => pack.id === packId && pack.type === type) : null;

    if (type === "checkin") {
      session = { type, checkin: {}, startedAt: Date.now() };
      configureGameHeader(type);
      setPlaySupports({ hint: false, preview: false, easier: false, skip: false });
      els.supportText.textContent = "Lựa chọn này chỉ tồn tại trong buổi hiện tại và không được lưu.";
      showScreen("play");
      renderCheckinFeelings();
      return;
    }

    const activityProgress = progress.activities[type] || DEFAULT_PROGRESS.activities[type];
    session = {
      type,
      round: 1,
      totalRounds: 3,
      baseDifficulty: clamp(activityProgress.difficulty ?? 0, 0, 3),
      roundDifficulty: clamp(activityProgress.difficulty ?? 0, 0, 3),
      startedAt: Date.now(),
      rounds: [],
      totalSupports: 0,
      manualEaseCount: 0,
      skippedRounds: 0,
      current: null,
      phase: "intro",
      customPack,
      supports: { hint: 0, preview: 0, easier: 0, skip: 0 }
    };

    configureGameHeader(type);
    setPlaySupports({ hint: false, preview: false, easier: false, skip: false });
    showScreen("play");
    scheduleBreakReminder();
    showRoundIntro();
  }

  function configureGameHeader(type) {
    const meta = ACTIVITY_META[type];
    els.gameTitle.textContent = session?.customPack?.title || meta.title;
    els.gameSkill.textContent = session?.customPack ? `Gói gia đình • ${meta.skill}` : meta.skill;
    els.gameInstruction.textContent = session?.customPack ? `Chơi với gói “${session.customPack.title}”. ${meta.instruction}` : meta.instruction;
    els.difficultyChip.textContent = type === "checkin" ? "Không chấm điểm" : difficultyLabel(session?.roundDifficulty ?? 0);
    if (preferences.narration) speak(meta.instruction);
    renderMissionProgress();
  }

  function showRoundIntro() {
    if (!session || session.type === "checkin") return;
    session.phase = "intro";
    session.current = null;
    session.roundDifficulty = chooseRoundDifficulty();
    renderMissionProgress();
    els.difficultyChip.textContent = difficultyLabel(session.roundDifficulty);
    setPlaySupports({ hint: false, preview: false, easier: false, skip: false });

    const meta = ACTIVITY_META[session.type];
    const intro = session.customPack ? `Chặng này dùng gói “${session.customPack.title}”. ${meta.intro[session.round - 1] || meta.intro.at(-1)}` : (meta.intro[session.round - 1] || meta.intro.at(-1));
    const stage = document.createElement("div");
    stage.className = "round-intro";
    stage.innerHTML = `
      <div class="round-badge" aria-hidden="true">${escapeHtml(meta.icon)}</div>
      <p class="eyebrow">Chặng ${session.round} / ${session.totalRounds}</p>
      <h2>${escapeHtml(roundName(session.round))}</h2>
      <p>${escapeHtml(intro)}</p>
      <div class="round-detail-row">
        <span>${escapeHtml(difficultyLabel(session.roundDifficulty))}</span>
        <span>không giới hạn thời gian</span>
        <span>có thể bỏ qua</span>
      </div>
    `;

    const start = document.createElement("button");
    start.type = "button";
    start.className = "primary-button";
    start.textContent = session.round === 1 ? "Bắt đầu chặng" : "Mình sẵn sàng";
    start.addEventListener("click", startRound);
    stage.appendChild(start);
    els.gameArea.replaceChildren(stage);
    els.supportText.textContent = "Bạn quyết định lúc bắt đầu. Không có đồng hồ đếm ngược.";
  }

  function startRound() {
    if (!session || session.type === "checkin") return;
    session.phase = "playing";
    renderMissionProgress();
    els.difficultyChip.textContent = difficultyLabel(session.roundDifficulty);
    setPlaySupports({ hint: true, preview: session.type === "match", easier: session.roundDifficulty > 0, skip: true });
    els.supportText.textContent = "Cần giúp? Bạn có thể xin gợi ý, chọn nhẹ hơn hoặc bỏ qua chặng.";

    if (session.type === "match") setupMatchRound();
    if (session.type === "focus") setupFocusRound();
    if (session.type === "sequence") setupSequenceRound();
    if (session.type === "pattern") setupPatternRound();
    if (session.type === "classify") setupClassifyRound();
    scheduleScanRefresh();
  }

  function chooseRoundDifficulty() {
    let difficulty = session.baseDifficulty;
    const previous = [...session.rounds].reverse().find((round) => !round.skipped);
    if (!previous) return clamp(difficulty, 0, 3);

    if (previous.accuracy >= 0.88 && previous.hints === 0 && previous.manualEase === 0) difficulty += 1;
    else if (previous.accuracy < 0.58 || previous.hints >= 2 || previous.manualEase > 0) difficulty -= 1;

    return clamp(difficulty, 0, 3);
  }

  function setupMatchRound() {
    const pairCount = clamp(2 + session.roundDifficulty, 2, 5);
    const poolNames = ["colors", "shapes", "animals"];
    const pool = session.customPack?.type === "match" ? session.customPack.items : MATCH_POOLS[poolNames[(session.round - 1) % poolNames.length]];
    const chosen = shuffle([...pool]).slice(0, Math.min(pairCount, pool.length));
    const cards = shuffle(chosen.flatMap((item) => [
      { ...item, instanceId: `${item.id}-a` },
      { ...item, instanceId: `${item.id}-b` }
    ]));

    session.current = {
      mode: "match",
      cards,
      opened: [],
      matched: new Set(),
      attempts: 0,
      correct: 0,
      hints: 0,
      manualEase: 0,
      mismatches: 0,
      locked: false,
      previewing: false
    };
    renderMatchRound();
  }

  function renderMatchRound() {
    const round = session.current;
    if (!round) return;
    const cols = round.cards.length === 4 ? 2 : round.cards.length <= 6 ? 3 : round.cards.length <= 8 ? 4 : 5;
    const grid = document.createElement("div");
    grid.className = "memory-grid";
    grid.style.setProperty("--cols", cols);

    round.cards.forEach((card, index) => {
      const isOpen = round.opened.includes(index);
      const isMatched = round.matched.has(index);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `memory-card${isOpen ? " is-open" : ""}${isMatched ? " is-matched" : ""}${round.previewing && !isMatched ? " is-preview" : ""}`;
      button.dataset.index = String(index);
      button.disabled = isMatched || round.locked || round.previewing;
      button.setAttribute("aria-label", isOpen || isMatched || round.previewing ? `${card.label}${isMatched ? ", đã ghép" : ""}` : `Thẻ úp ${index + 1}`);
      const toneStyle = card.tone ? ` style="color:${card.tone}"` : "";
      button.innerHTML = `
        <span class="card-inner">
          <span class="symbol" aria-hidden="true"${toneStyle}>${escapeHtml(card.symbol)}</span>
          ${preferences.labels ? `<span class="label">${escapeHtml(card.label)}</span>` : ""}
        </span>
      `;
      button.addEventListener("click", () => onMatchCard(index));
      grid.appendChild(button);
    });

    els.gameArea.replaceChildren(grid);
  }

  function onMatchCard(index) {
    const round = session.current;
    if (!round || round.locked || round.previewing || round.opened.includes(index) || round.matched.has(index)) return;

    round.opened.push(index);
    renderMatchRound();
    if (round.opened.length < 2) return;

    round.locked = true;
    round.attempts += 1;
    const [firstIndex, secondIndex] = round.opened;
    const first = round.cards[firstIndex];
    const second = round.cards[secondIndex];
    const isMatch = first.id === second.id;

    window.setTimeout(() => {
      if (!session || session.current !== round) return;

      if (isMatch) {
        round.matched.add(firstIndex);
        round.matched.add(secondIndex);
        round.correct += 1;
        playSuccessTone();
        announce(`Đã tìm thấy cặp ${first.label}.`);
      } else {
        round.mismatches += 1;
        announce("Hai thẻ khác nhau. Những gì bạn đã tìm đúng vẫn ở đó.");
        if (preferences.autoHint && round.mismatches >= 2 && round.hints === 0) {
          els.supportText.textContent = "Muốn một dấu gợi ý? Nút Gợi ý sẽ đánh dấu một cặp, không tự lật thay bạn.";
        }
      }

      round.opened = [];
      round.locked = false;
      renderMatchRound();
      if (round.matched.size === round.cards.length) window.setTimeout(finishRound, 260);
    }, preferences.pace === "gentle" ? 1050 : 680);
  }

  function setupFocusRound() {
    const itemCount = [6, 8, 10, 12][session.roundDifficulty];
    const group = session.customPack?.type === "focus" ? session.customPack.items : FOCUS_GROUPS[(session.round - 1) % FOCUS_GROUPS.length];
    const target = pick(group);
    const distractorPool = group.filter((item) => item.id !== target.id);
    const targetCount = session.roundDifficulty >= 2 ? 3 : 2;
    const cells = [];

    for (let i = 0; i < targetCount; i += 1) cells.push({ ...target, isTarget: true, key: `t-${i}` });
    while (cells.length < itemCount) {
      const distractor = pick(distractorPool);
      cells.push({ ...distractor, isTarget: false, key: `d-${cells.length}-${distractor.id}` });
    }

    session.current = {
      mode: "focus",
      target,
      targetCount,
      cells: shuffle(cells),
      found: new Set(),
      attempts: 0,
      correct: 0,
      hints: 0,
      manualEase: 0,
      misses: 0
    };
    renderFocusRound();
  }

  function renderFocusRound() {
    const round = session.current;
    if (!round) return;
    const wrap = document.createElement("div");
    wrap.className = "find-wrap";

    const prompt = document.createElement("div");
    prompt.className = "target-prompt";
    prompt.innerHTML = `
      <div class="target-prompt-main">
        <span class="target-symbol" aria-hidden="true">${escapeHtml(round.target.symbol)}</span>
        <span class="target-copy"><small>Tìm tất cả</small><strong>${escapeHtml(round.target.label)}</strong></span>
      </div>
      <span class="found-counter">Đã tìm ${round.found.size} / ${round.targetCount}</span>
    `;

    const grid = document.createElement("div");
    grid.className = "find-grid";
    grid.style.setProperty("--cols", round.cells.length <= 8 ? 4 : round.cells.length <= 10 ? 5 : 6);

    round.cells.forEach((cell, index) => {
      const found = round.found.has(index);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `find-card${found ? " is-found" : ""}`;
      button.disabled = found;
      button.textContent = cell.symbol;
      button.setAttribute("aria-label", `${cell.label}${found ? ", đã tìm thấy" : ""}`);
      button.addEventListener("click", () => onFocusCell(index));
      grid.appendChild(button);
    });

    wrap.append(prompt, grid);
    els.gameArea.replaceChildren(wrap);
  }

  function onFocusCell(index) {
    const round = session.current;
    if (!round || round.found.has(index)) return;
    const cell = round.cells[index];
    round.attempts += 1;

    if (cell.isTarget) {
      round.found.add(index);
      round.correct += 1;
      playSuccessTone();
      announce(`Đúng, đây là ${cell.label}.`);
      renderFocusRound();
      if (round.found.size === round.targetCount) window.setTimeout(finishRound, 260);
    } else {
      round.misses += 1;
      announce(`Đây là ${cell.label}. Mình tiếp tục tìm ${round.target.label}.`);
      if (preferences.autoHint && round.misses >= 2 && round.hints === 0) {
        els.supportText.textContent = "Nếu muốn, Gợi ý sẽ đánh dấu một mục tiêu còn lại.";
      }
    }
  }

  function setupSequenceRound() {
    const base = SEQUENCES[(session.round - 1 + Math.floor(Math.random() * SEQUENCES.length)) % SEQUENCES.length];
    const desiredLength = clamp(3 + session.roundDifficulty, 3, 5);
    const ordered = base.items.slice(0, Math.min(desiredLength, base.items.length));
    session.current = {
      mode: "sequence",
      label: base.label,
      ordered,
      shuffled: shuffle([...ordered]),
      selectedIds: [],
      attempts: 0,
      correct: 0,
      hints: 0,
      manualEase: 0,
      hintTarget: null
    };
    renderSequenceRound();
  }

  function renderSequenceRound() {
    const round = session.current;
    if (!round) return;
    const wrap = document.createElement("div");
    wrap.className = "sequence-wrap";

    const description = document.createElement("p");
    description.className = "sequence-example";
    description.textContent = `${round.label}. Chọn mục tiếp theo trong chuỗi.`;

    const progressRow = document.createElement("div");
    progressRow.className = "sequence-progress";
    progressRow.setAttribute("aria-label", "Các bước đã chọn");
    round.ordered.forEach((item, index) => {
      const slot = document.createElement("span");
      const selected = round.selectedIds[index] === item.id;
      slot.className = selected ? "is-filled" : "";
      slot.textContent = selected ? item.symbol : String(index + 1);
      slot.setAttribute("aria-label", selected ? item.label : `Bước ${index + 1}`);
      progressRow.appendChild(slot);
    });

    const grid = document.createElement("div");
    grid.className = "sequence-grid";
    const nextExpected = round.ordered[round.selectedIds.length];

    round.shuffled.forEach((item) => {
      const isSelected = round.selectedIds.includes(item.id);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `sequence-card${isSelected ? " is-selected" : ""}`;
      button.disabled = isSelected;
      button.innerHTML = `<span class="symbol" aria-hidden="true">${escapeHtml(item.symbol)}</span>${preferences.labels ? `<span>${escapeHtml(item.label)}</span>` : ""}`;
      button.setAttribute("aria-label", `${item.label}${isSelected ? ", đã chọn" : ""}`);
      button.addEventListener("click", () => onSequenceItem(item.id));
      if (round.hintTarget === item.id && nextExpected?.id === item.id) button.classList.add("is-next-hint");
      grid.appendChild(button);
    });

    wrap.append(description, progressRow, grid);
    els.gameArea.replaceChildren(wrap);
  }

  function onSequenceItem(itemId) {
    const round = session.current;
    if (!round) return;
    const expected = round.ordered[round.selectedIds.length];
    if (!expected) return;

    round.attempts += 1;
    if (itemId === expected.id) {
      round.selectedIds.push(itemId);
      round.correct += 1;
      round.hintTarget = null;
      playSuccessTone();
      announce(`${expected.label}. Đúng thứ tự.`);
      renderSequenceRound();
      if (round.selectedIds.length === round.ordered.length) window.setTimeout(finishRound, 260);
    } else {
      const chosen = round.shuffled.find((item) => item.id === itemId);
      announce(`${chosen?.label || "Mục này"} chưa phải bước tiếp theo. Phần đúng vẫn được giữ lại.`);
    }
  }

  function setupClassifyRound() {
    const set = CATEGORY_SETS[(session.round - 1) % CATEGORY_SETS.length];
    const desired = [4, 5, 6, 8][session.roundDifficulty];
    const candidates = set.groups.flatMap((group) => group.items.map((item, index) => ({ ...item, id: `${group.id}-${index}`, groupId: group.id })));
    const queue = shuffle(candidates).slice(0, Math.min(desired, candidates.length));
    session.current = {
      mode: "classify",
      label: set.label,
      groups: set.groups.map(({ id, label, symbol }) => ({ id, label, symbol })),
      queue,
      index: 0,
      attempts: 0,
      correct: 0,
      hints: 0,
      manualEase: 0,
      hintTarget: null
    };
    renderClassifyRound();
  }

  function renderClassifyRound() {
    const round = session.current;
    if (!round) return;
    const item = round.queue[round.index];
    if (!item) { finishRound(); return; }
    const wrap = document.createElement("div");
    wrap.className = "classify-wrap";
    wrap.innerHTML = `<div class="classify-progress"><span>${round.index + 1}</span> / ${round.queue.length}</div><div class="classify-prompt"><p class="eyebrow">${escapeHtml(round.label)}</p><span class="classify-symbol" aria-hidden="true">${escapeHtml(item.symbol)}</span><h2>${escapeHtml(item.label)}</h2><p>Mục này thuộc nhóm nào?</p></div>`;
    const choices = document.createElement("div");
    choices.className = "classify-choices";
    round.groups.forEach((group) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `classify-choice${round.hintTarget === group.id ? " is-hint" : ""}`;
      button.innerHTML = `<span aria-hidden="true">${escapeHtml(group.symbol)}</span><strong>${escapeHtml(group.label)}</strong>`;
      button.addEventListener("click", () => onClassifyChoice(group.id));
      choices.appendChild(button);
    });
    wrap.appendChild(choices);
    els.gameArea.replaceChildren(wrap);
    scheduleScanRefresh();
  }

  function onClassifyChoice(groupId) {
    const round = session.current;
    if (!round) return;
    const item = round.queue[round.index];
    if (!item || round.complete) return;
    round.attempts += 1;
    if (groupId === item.groupId) {
      round.correct += 1;
      round.index += 1;
      round.hintTarget = null;
      playSuccessTone();
      announce(`${item.label} đã tìm được nhóm phù hợp.`);
      if (round.index >= round.queue.length) {
        round.complete = true;
        els.gameArea.querySelectorAll("button").forEach((button) => { button.disabled = true; });
        window.setTimeout(finishRound, 260);
      } else renderClassifyRound();
    } else {
      announce("Nhóm này chưa phù hợp. Mục đã làm đúng trước đó vẫn được giữ lại.");
    }
  }

  function setupPatternRound() {
    const symbolSet = shuffle([...pick(PATTERN_SYMBOL_SETS)]);
    const symbols = symbolSet.slice(0, session.roundDifficulty >= 2 ? 3 : 2);
    const definition = buildPattern(symbols, session.roundDifficulty);
    const options = shuffle([definition.answer, ...symbolSet.filter((symbol) => symbol !== definition.answer).slice(0, 2)]);

    session.current = {
      mode: "pattern",
      sequence: definition.sequence,
      missingIndex: definition.missingIndex,
      answer: definition.answer,
      options,
      attempts: 0,
      correct: 0,
      hints: 0,
      manualEase: 0,
      hintTarget: null
    };
    renderPatternRound();
  }

  function buildPattern(symbols, difficulty) {
    let cycle;
    let length;
    if (difficulty === 0) { cycle = [symbols[0], symbols[1]]; length = 6; }
    else if (difficulty === 1) { cycle = [symbols[0], symbols[0], symbols[1]]; length = 7; }
    else if (difficulty === 2) { cycle = [symbols[0], symbols[1], symbols[2]]; length = 8; }
    else { cycle = [symbols[0], symbols[1], symbols[1], symbols[2]]; length = 9; }

    const full = Array.from({ length }, (_, index) => cycle[index % cycle.length]);
    const missingIndex = length - 1;
    return { sequence: full, missingIndex, answer: full[missingIndex] };
  }

  function renderPatternRound() {
    const round = session.current;
    if (!round) return;
    const wrap = document.createElement("div");
    wrap.className = "pattern-wrap";

    const question = document.createElement("div");
    question.className = "pattern-question";
    question.innerHTML = `<h2>Mảnh nào đi tiếp theo?</h2><p>Nhìn cách các hình lặp lại. Bạn có thể thử nhiều lần.</p>`;

    const sequence = document.createElement("div");
    sequence.className = "pattern-sequence";
    sequence.setAttribute("aria-label", "Chuỗi quy luật");
    round.sequence.forEach((symbol, index) => {
      const token = document.createElement("span");
      token.className = `pattern-token${index === round.missingIndex ? " is-missing" : ""}`;
      token.textContent = index === round.missingIndex ? "?" : symbol;
      sequence.appendChild(token);
    });

    const options = document.createElement("div");
    options.className = "pattern-options";
    round.options.forEach((symbol) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "pattern-option";
      button.textContent = symbol;
      button.setAttribute("aria-label", `Chọn ${symbol}`);
      if (round.hintTarget === symbol) button.classList.add("is-hint");
      button.addEventListener("click", () => onPatternOption(symbol));
      options.appendChild(button);
    });

    wrap.append(question, sequence, options);
    els.gameArea.replaceChildren(wrap);
  }

  function onPatternOption(symbol) {
    const round = session.current;
    if (!round) return;
    round.attempts += 1;
    if (symbol === round.answer) {
      round.correct += 1;
      playSuccessTone();
      announce("Mảnh này làm quy luật tiếp tục. Bạn đã tìm thấy nó.");
      const missing = els.gameArea.querySelector(".pattern-token.is-missing");
      if (missing) {
        missing.textContent = symbol;
        missing.classList.remove("is-missing");
      }
      els.gameArea.querySelectorAll("button").forEach((button) => { button.disabled = true; });
      window.setTimeout(finishRound, 450);
    } else {
      announce("Mảnh này chưa tiếp tục quy luật. Nhìn lại những hình ngay trước dấu hỏi nhé.");
    }
  }

  function previewCurrentRound() {
    if (!session?.current || session.current.mode !== "match") return;
    const round = session.current;
    if (round.previewing || round.locked) return;

    round.previewing = true;
    round.hints += 1;
    session.totalSupports += 1;
    session.supports.preview += 1;
    renderMatchRound();
    els.previewBtn.disabled = true;
    announce("Các thẻ đang mở trong chốc lát. Cứ nhìn theo cách bạn muốn.");

    window.setTimeout(() => {
      if (!session || session.current !== round) return;
      round.previewing = false;
      els.previewBtn.disabled = false;
      renderMatchRound();
      announce("Các thẻ đã úp lại. Bạn có thể bắt đầu từ bất kỳ thẻ nào.");
    }, preferences.pace === "gentle" ? 2200 : 1500);
  }

  function requestHint() {
    if (!session?.current) return;
    const round = session.current;
    round.hints += 1;
    session.totalSupports += 1;
    session.supports.hint += 1;

    if (round.mode === "match") hintMatch(round);
    else if (round.mode === "focus") hintFocus(round);
    else if (round.mode === "sequence") hintSequence(round);
    else if (round.mode === "pattern") hintPattern(round);
    else if (round.mode === "classify") hintClassify(round);
  }

  function hintMatch(round) {
    let targetIndices = [];
    if (round.opened.length === 1) {
      const openIndex = round.opened[0];
      const openCard = round.cards[openIndex];
      const matchIndex = round.cards.findIndex((card, index) => card.id === openCard.id && index !== openIndex && !round.matched.has(index));
      if (matchIndex >= 0) targetIndices = [matchIndex];
    }

    if (targetIndices.length === 0) {
      const unmatchedIds = [...new Set(round.cards.filter((_, index) => !round.matched.has(index)).map((card) => card.id))];
      const id = pick(unmatchedIds);
      targetIndices = round.cards.map((card, index) => ({ card, index })).filter(({ card, index }) => card.id === id && !round.matched.has(index)).map(({ index }) => index);
    }

    renderMatchRound();
    targetIndices.forEach((index) => els.gameArea.querySelector(`[data-index="${index}"]`)?.classList.add("is-hint"));
    announce(targetIndices.length > 1 ? "Mình đã đánh dấu một cặp có thể thử." : "Mình đã đánh dấu thẻ có thể ghép với thẻ đang mở.");
  }

  function hintFocus(round) {
    const nextIndex = round.cells.findIndex((cell, index) => cell.isTarget && !round.found.has(index));
    if (nextIndex < 0) return;
    renderFocusRound();
    els.gameArea.querySelectorAll(".find-card")[nextIndex]?.classList.add("is-hint");
    announce(`Một ${round.target.label} còn lại đã được đánh dấu.`);
  }

  function hintSequence(round) {
    const expected = round.ordered[round.selectedIds.length];
    if (!expected) return;
    round.hintTarget = expected.id;
    renderSequenceRound();
    announce(`Bước tiếp theo là ${expected.label}.`);
  }

  function hintPattern(round) {
    round.hintTarget = round.answer;
    renderPatternRound();
    announce("Mình đã đánh dấu mảnh tiếp tục quy luật. Bạn vẫn là người chọn nó.");
  }

  function hintClassify(round) {
    const item = round.queue[round.index];
    if (!item) return;
    round.hintTarget = item.groupId;
    renderClassifyRound();
    announce("Mình đã đánh dấu nhóm có thể thử. Bạn vẫn là người chọn.");
  }

  function makeCurrentRoundEasier() {
    if (!session || session.phase !== "playing" || session.roundDifficulty <= 0) {
      showToast("Chặng này đã ở mức nhẹ nhất.");
      return;
    }

    session.roundDifficulty -= 1;
    session.manualEaseCount += 1;
    session.totalSupports += 1;
    session.supports.easier += 1;
    els.difficultyChip.textContent = difficultyLabel(session.roundDifficulty);
    showToast("Đã giảm lượng thông tin. Chặng bắt đầu lại, không mất thành quả của các chặng trước.");
    startRound();
    if (session.current) session.current.manualEase = 1;
  }

  function skipCurrentRound() {
    if (!session || session.phase !== "playing") return;
    const confirmed = window.confirm("Bỏ qua chặng này và đi tiếp? Không có hình phạt hay mất tiến trình.");
    if (!confirmed) return;
    session.skippedRounds += 1;
    session.supports.skip += 1;
    session.rounds.push({ skipped: true, accuracy: null, attempts: 0, correct: 0, hints: 0, manualEase: 0, difficulty: session.roundDifficulty });
    showRoundBreak(true);
  }

  function finishRound() {
    if (!session?.current || session.phase !== "playing") return;
    const round = session.current;
    const accuracy = round.attempts > 0 ? round.correct / round.attempts : 1;

    session.rounds.push({
      skipped: false,
      accuracy: roundNumber(accuracy, 3),
      attempts: round.attempts,
      correct: round.correct,
      hints: round.hints,
      manualEase: round.manualEase || 0,
      difficulty: session.roundDifficulty
    });
    showRoundBreak(false);
  }

  function showRoundBreak(skipped) {
    session.phase = "break";
    session.current = null;
    renderMissionProgress();
    setPlaySupports({ hint: false, preview: false, easier: false, skip: false });

    if (session.round >= session.totalRounds) {
      finishSession();
      return;
    }

    const stage = document.createElement("div");
    stage.className = "round-break";
    const reward = [1, 2, 3].map((index) => `<span class="${index <= session.round && !skipped ? "is-earned" : ""}${index === session.round && !skipped ? " is-new" : ""}">${index <= session.round && !skipped ? "❧" : "○"}</span>`).join("");
    stage.innerHTML = `
      <div class="round-reward" aria-label="${session.round} chặng đã đi qua">${reward}</div>
      <p class="eyebrow">${skipped ? "Đã bỏ qua chặng" : `Chặng ${session.round} hoàn thành`}</p>
      <h2>${skipped ? "Mình có thể đi tiếp mà không cần hoàn thành mọi thứ." : "Một chiếc lá mới cho khu vườn."}</h2>
      <p>${skipped ? "Không có điểm bị trừ. Chặng tiếp theo bắt đầu khi bạn chọn." : "Trò chơi sẽ chỉ thay đổi nhẹ nếu chặng vừa rồi có vẻ quá dễ hoặc quá khó."}</p>
    `;

    const next = document.createElement("button");
    next.type = "button";
    next.className = "primary-button";
    next.textContent = "Đi tới chặng tiếp theo";
    next.addEventListener("click", () => {
      session.round += 1;
      showRoundIntro();
    });
    stage.appendChild(next);
    els.gameArea.replaceChildren(stage);
    els.supportText.textContent = "Không tự chuyển màn hình. Bạn tự quyết định lúc tiếp tục.";
    playSuccessTone();
  }

  function finishSession() {
    clearBreakTimer();
    session.phase = "complete";
    const endedAt = Date.now();
    const completedRounds = session.rounds.filter((round) => !round.skipped);
    const totalAttempts = sum(completedRounds.map((round) => round.attempts));
    const totalCorrect = sum(completedRounds.map((round) => round.correct));
    const totalHints = sum(completedRounds.map((round) => round.hints));
    const accuracy = totalAttempts > 0 ? totalCorrect / totalAttempts : null;
    const activity = progress.activities[session.type];
    const previousDifficulty = activity.difficulty;
    const nextDifficulty = adaptDifficulty(previousDifficulty, completedRounds);

    activity.difficulty = nextDifficulty;
    activity.sessions += 1;
    activity.totalHints += totalHints;
    activity.lastAccuracy = accuracy === null ? activity.lastAccuracy : roundNumber(accuracy, 3);

    progress.sessions.push({
      activity: session.type,
      startedAt: new Date(session.startedAt).toISOString(),
      durationSeconds: Math.round((endedAt - session.startedAt) / 1000),
      accuracy: accuracy === null ? null : roundNumber(accuracy, 3),
      hints: totalHints,
      manualEaseCount: session.manualEaseCount,
      skippedRounds: session.skippedRounds,
      difficultyBefore: previousDifficulty,
      difficultyAfter: nextDifficulty,
      supports: { ...session.supports },
      customPack: Boolean(session.customPack)
    });
    progress.sessions = progress.sessions.slice(-80);
    saveJson(STORAGE_KEYS.progress, progress);

    const adjustmentMessage = nextDifficulty > previousDifficulty
      ? "Lần tới có thể có thêm một chút thông tin. Bạn vẫn có nút “Nhẹ hơn”."
      : nextDifficulty < previousDifficulty
        ? "Lần tới trò chơi sẽ bắt đầu nhẹ hơn một chút."
        : "Lần tới trò chơi sẽ giữ nhịp gần như hiện tại.";

    els.completeMessage.textContent = `Bạn đã đi theo nhịp của mình. ${adjustmentMessage}`;
    const minutes = Math.max(1, Math.round((endedAt - session.startedAt) / 60000));
    els.sessionReflection.innerHTML = `
      <div class="reflection-chip"><strong>${3 - session.skippedRounds}/3</strong><span>chặng đã hoàn thành</span></div>
      <div class="reflection-chip"><strong>${session.totalSupports}</strong><span>lần dùng hỗ trợ</span></div>
      <div class="reflection-chip"><strong>${minutes} phút</strong><span>nhịp của buổi chơi</span></div>
    `;

    playSuccessTone(true);
    renderProgress();
    updateHome();
    showScreen("complete");
  }

  function adaptDifficulty(current, rounds) {
    if (!rounds.length) return current;
    const usable = rounds.filter((round) => round.accuracy !== null);
    if (!usable.length) return current;
    const average = sum(usable.map((round) => round.accuracy)) / usable.length;
    const hints = sum(usable.map((round) => round.hints));
    const eased = sum(usable.map((round) => round.manualEase || 0));

    if (average >= 0.87 && hints <= 1 && eased === 0) return clamp(current + 1, 0, 3);
    if (average < 0.57 || hints >= 4 || eased > 0) return clamp(current - 1, 0, 3);
    return current;
  }

  function renderMissionProgress() {
    els.roundDots.innerHTML = "";
    if (!session || session.type === "checkin") {
      els.roundDots.setAttribute("aria-label", "Hoạt động tự nhận biết không có chặng chấm điểm.");
      return;
    }

    els.roundDots.setAttribute("aria-label", `Chặng ${session.round} trên ${session.totalRounds}`);
    const names = ["Khởi động", "Khám phá", "Tự tin"];
    for (let index = 1; index <= session.totalRounds; index += 1) {
      const step = document.createElement("span");
      const completed = session.rounds.length >= index;
      step.className = `mission-step${index === session.round ? " is-current" : ""}${completed ? " is-done" : ""}`;
      step.innerHTML = `<i>${completed ? "✓" : index}</i><span>${names[index - 1]}</span>`;
      els.roundDots.appendChild(step);
    }
  }

  function setPlaySupports({ hint, preview, easier, skip }) {
    els.hintBtn.hidden = !hint;
    els.previewBtn.hidden = !preview;
    els.easierBtn.hidden = !easier;
    els.skipRoundBtn.hidden = !skip;
  }

  function renderCheckinFeelings() {
    const wrap = document.createElement("div");
    wrap.className = "checkin-wrap";
    const question = document.createElement("div");
    question.className = "checkin-question";
    question.innerHTML = `<h2>Lúc này bạn thấy gần với điều nào nhất?</h2><p>Bạn cũng có thể chọn “Không chắc”. Không có lựa chọn sai.</p>`;
    const options = document.createElement("div");
    options.className = "checkin-options";

    CHECKIN_FEELINGS.forEach((feeling) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "checkin-option";
      button.innerHTML = `<span class="symbol" aria-hidden="true">${feeling.symbol}</span><span>${feeling.label}</span>`;
      button.addEventListener("click", () => {
        session.checkin.feeling = feeling;
        renderCheckinNeeds();
      });
      options.appendChild(button);
    });

    const note = document.createElement("div");
    note.className = "checkin-note";
    note.textContent = "Vì cảm xúc là riêng tư, lựa chọn ở hoạt động này không được thêm vào lịch sử tiến trình.";
    wrap.append(question, options, note);
    els.gameArea.replaceChildren(wrap);
  }

  function renderCheckinNeeds() {
    const feeling = session.checkin.feeling;
    const wrap = document.createElement("div");
    wrap.className = "checkin-wrap";
    const question = document.createElement("div");
    question.className = "checkin-question";
    question.innerHTML = `<h2>Cảm ơn bạn đã cho mình biết.</h2><p>Nếu muốn, bạn có thể chọn điều có thể giúp ngay lúc này.</p>`;
    const options = document.createElement("div");
    options.className = "need-options";

    CHECKIN_NEEDS.forEach((need) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "need-option";
      button.innerHTML = `<span class="symbol" aria-hidden="true">${need.symbol}</span><span>${need.label}</span>`;
      button.addEventListener("click", () => renderCheckinResult(feeling, need));
      options.appendChild(button);
    });

    const skip = document.createElement("button");
    skip.type = "button";
    skip.className = "quiet-button";
    skip.textContent = "Mình chưa muốn chọn";
    skip.addEventListener("click", () => renderCheckinResult(feeling, null));
    wrap.append(question, options, skip);
    els.gameArea.replaceChildren(wrap);
  }

  function renderCheckinResult(feeling, need) {
    const wrap = document.createElement("div");
    wrap.className = "checkin-wrap";
    const question = document.createElement("div");
    question.className = "checkin-question";
    question.innerHTML = `<h2>Mình đã nghe bạn.</h2><p>Bạn chọn “${escapeHtml(feeling.label)}”.${need ? ` Bạn muốn “${escapeHtml(need.label)}”.` : ""}</p>`;
    const note = document.createElement("div");
    note.className = "checkin-note";
    note.innerHTML = `<strong>Bước tiếp theo là do bạn chọn.</strong><br>Bạn có thể nghỉ, về khu vườn hoặc bắt đầu một trò chơi khác. Lựa chọn này biến mất khi rời màn hình.`;
    const actions = document.createElement("div");
    actions.className = "button-row";

    const rest = document.createElement("button");
    rest.type = "button";
    rest.className = "primary-button";
    rest.textContent = "Nghỉ một chút";
    rest.addEventListener("click", () => openPause(false));
    const home = document.createElement("button");
    home.type = "button";
    home.className = "secondary-button";
    home.textContent = "Về khu vườn";
    home.addEventListener("click", () => {
      session = null;
      showScreen("home");
    });
    actions.append(rest, home);
    wrap.append(question, note, actions);
    els.gameArea.replaceChildren(wrap);
  }

  function endActivityEarly() {
    clearBreakTimer();
    if (els.communicationModal) els.communicationModal.hidden = true;
    session = null;
    closePause();
    showScreen("home");
  }

  function renderProgress() {
    const sessions = progress.sessions;
    const totalSessions = sessions.length;
    const recent = sessions.slice(-10).filter((item) => item.accuracy !== null);
    const averageAccuracy = recent.length ? sum(recent.map((item) => item.accuracy)) / recent.length : null;
    const totalSupports = sum(sessions.map((item) => item.supports ? (item.supports.hint || 0) + (item.supports.preview || 0) + (item.supports.easier || 0) : (item.hints || 0) + (item.manualEaseCount || 0)));

    els.metricGrid.innerHTML = `
      <article class="metric-card"><strong>${totalSessions}</strong><span>buổi khám phá đã lưu cục bộ</span></article>
      <article class="metric-card"><strong>${averageAccuracy === null ? "—" : `${Math.round(averageAccuracy * 100)}%`}</strong><span>thao tác đúng trong các buổi gần nhất</span></article>
      <article class="metric-card"><strong>${totalSupports}</strong><span>lần chủ động dùng hỗ trợ</span></article>
    `;

    const labels = {
      match: ["Vườn ghép đôi", "Số cặp"],
      focus: ["Săn dấu hiệu", "Số chi tiết"],
      sequence: ["Đường đi nhỏ", "Độ dài chuỗi"],
      pattern: ["Con đường hoa văn", "Độ phức tạp quy luật"],
      classify: ["Ngôi nhà của đồ vật", "Số mục cần phân loại"]
    };

    els.skillProgressList.innerHTML = Object.entries(progress.activities).map(([key, activity]) => {
      const [title, dimension] = labels[key] || [key, "Độ khó"];
      const accuracyText = activity.lastAccuracy === null ? "Chưa có buổi chơi" : `Buổi gần nhất: ${Math.round(activity.lastAccuracy * 100)}% thao tác đúng`;
      return `
        <div class="skill-progress-item">
          <div><strong>${title}</strong><p>${dimension} được điều chỉnh trong phạm vi nhỏ. ${accuracyText}.</p></div>
          <span class="support-badge">${difficultyLabel(activity.difficulty)}</span>
        </div>
      `;
    }).join("");

    const activityNames = Object.fromEntries(Object.entries(ACTIVITY_META).map(([key, value]) => [key, value.title]));
    const latest = [...sessions].slice(-5).reverse();
    els.recentList.innerHTML = latest.length ? latest.map((item) => {
      const date = new Date(item.startedAt);
      const detail = item.skippedRounds ? `${item.skippedRounds} chặng bỏ qua • ` : "";
      return `
        <div class="recent-item">
          <div><strong>${escapeHtml(activityNames[item.activity] || item.activity)}</strong><p>${detail}${item.hints || 0} gợi ý • ${Math.max(1, Math.round((item.durationSeconds || 0) / 60))} phút</p></div>
          <time datetime="${escapeHtml(item.startedAt)}">${formatDate(date)}</time>
        </div>
      `;
    }).join("") : `<div class="recent-item"><div><strong>Chưa có buổi chơi</strong><p>Khi hoàn thành một chuyến khám phá, nó sẽ xuất hiện ở đây.</p></div></div>`;
  }

  function updateHome() {
    const total = progress.sessions.length;
    const stage = total === 0 ? 0 : total < 2 ? 1 : total < 4 ? 2 : 3;
    const labels = ["Mới bắt đầu", "Đã nảy mầm", "Đang xanh lên", "Đang nở rộ"];
    const messages = [
      "Mỗi buổi chơi sẽ làm khu vườn thay đổi một chút.",
      "Một mầm nhỏ đã xuất hiện từ chuyến khám phá của bạn.",
      "Khu vườn đang có thêm nhiều dấu hiệu của riêng bạn.",
      "Khu vườn đã đầy sức sống — và vẫn không cần streak."
    ];

    document.getElementById("gardenLevelLabel").textContent = labels[stage];
    document.getElementById("gardenMessage").textContent = messages[stage];
    document.querySelectorAll(".garden-plant").forEach((plant, index) => plant.classList.toggle("is-grown", index < stage));

    const dots = document.getElementById("gardenDots");
    dots.innerHTML = "";
    for (let index = 0; index < 5; index += 1) {
      const dot = document.createElement("span");
      if (index < Math.min(5, total)) dot.classList.add("is-filled");
      dots.appendChild(dot);
    }

    const recommend = Object.entries(progress.activities).sort((a, b) => {
      if (a[1].sessions !== b[1].sessions) return a[1].sessions - b[1].sessions;
      return a[1].difficulty - b[1].difficulty;
    })[0]?.[0] || "match";
    els.quickStartBtn.dataset.activity = recommend;
    els.quickStartBtn.querySelector("span:first-child").textContent = total ? `Khám phá ${ACTIVITY_META[recommend].title}` : "Bắt đầu chuyến khám phá";
    updateRecommendation();
    renderContentPacks();
  }

  function updateRecommendation() {
    const recommendation = getRecommendation();
    if (!recommendation || !els.recommendationBtn) return;
    els.recommendationBtn.dataset.activity = recommendation.type;
    els.recommendationTitle.textContent = recommendation.title;
    els.recommendationText.textContent = recommendation.reason;
  }

  function getRecommendation() {
    const types = Object.keys(progress.activities);
    const recent = progress.sessions.slice(-8);
    const scored = types.map((type) => {
      const activity = progress.activities[type];
      const activityRecent = recent.filter((item) => item.activity === type);
      const supports = sum(activityRecent.map((item) => (item.supports?.hint || 0) + (item.supports?.preview || 0) + (item.supports?.easier || 0)));
      return { type, sessions: activity.sessions, supports, difficulty: activity.difficulty };
    }).sort((a, b) => (a.sessions - b.sessions) || (a.supports - b.supports) || (a.difficulty - b.difficulty));
    const choice = scored[0] || { type: "match", sessions: 0, supports: 0 };
    const previewUsed = recent.some((item) => item.activity === "match" && (item.supports?.preview || 0) > 0);
    const easierUsed = recent.some((item) => (item.supports?.easier || 0) > 0);
    let reason = `Đề xuất ${ACTIVITY_META[choice.type].title} vì đây là một thế giới bạn đã khám phá ít hơn gần đây.`;
    if (previewUsed && choice.type === "match") reason += " Nút Xem trước vẫn sẵn vì nó từng được dùng.";
    else if (easierUsed) reason += " Nút Nhẹ hơn luôn sẵn; trò chơi không tự ép tăng độ khó.";
    else reason += " Gợi ý này chỉ dùng lịch sử chơi cục bộ, không suy đoán chẩn đoán.";
    return { type: choice.type, title: `Có thể thử: ${ACTIVITY_META[choice.type].title}`, reason };
  }

  function difficultyLabel(level) {
    return ["Nhịp rất nhẹ", "Nhịp nhẹ", "Nhịp vừa", "Thêm thử thách"][clamp(level, 0, 3)];
  }

  function roundName(round) {
    return ["Khởi động", "Khám phá", "Tự tin"][round - 1] || `Chặng ${round}`;
  }

  function readSettingsForm() {
    const visualMode = document.querySelector('input[name="visualMode"]:checked')?.value || "calm";
    return {
      visualMode,
      highContrast: document.getElementById("highContrastSetting").checked,
      reduceMotion: document.getElementById("reduceMotionSetting").checked,
      sound: document.getElementById("soundSetting").checked,
      narration: document.getElementById("narrationSetting").checked,
      textSize: document.getElementById("textSizeSetting").value,
      largeTargets: document.getElementById("largeTargetsSetting").checked,
      labels: document.getElementById("labelsSetting").checked,
      pace: document.getElementById("paceSetting").value,
      autoHint: document.getElementById("autoHintSetting").checked,
      breakMinutes: Number(document.getElementById("breakSetting").value),
      switchScanning: document.getElementById("switchScanningSetting").checked,
      scanSpeed: Number(document.getElementById("scanSpeedSetting").value)
    };
  }

  function syncSettingsForm() {
    const visual = document.querySelector(`input[name="visualMode"][value="${preferences.visualMode}"]`);
    if (visual) visual.checked = true;
    document.getElementById("highContrastSetting").checked = preferences.highContrast;
    document.getElementById("reduceMotionSetting").checked = preferences.reduceMotion;
    document.getElementById("soundSetting").checked = preferences.sound;
    document.getElementById("narrationSetting").checked = preferences.narration;
    document.getElementById("textSizeSetting").value = preferences.textSize;
    document.getElementById("largeTargetsSetting").checked = preferences.largeTargets;
    document.getElementById("labelsSetting").checked = preferences.labels;
    document.getElementById("paceSetting").value = preferences.pace;
    document.getElementById("autoHintSetting").checked = preferences.autoHint;
    document.getElementById("breakSetting").value = String(preferences.breakMinutes);
    document.getElementById("switchScanningSetting").checked = Boolean(preferences.switchScanning);
    document.getElementById("scanSpeedSetting").value = String(preferences.scanSpeed ?? 1800);
  }

  function applyPreset(name) {
    if (name === "calm") {
      preferences = { ...preferences, visualMode: "calm", highContrast: false, reduceMotion: true, sound: false, textSize: "1.15", largeTargets: true, labels: true, pace: "gentle" };
    } else if (name === "balanced") {
      preferences = { ...preferences, visualMode: "bright", highContrast: false, reduceMotion: false, sound: false, textSize: "1", largeTargets: true, labels: true, pace: "steady" };
    } else if (name === "focus") {
      preferences = { ...preferences, visualMode: "calm", highContrast: true, reduceMotion: true, sound: false, textSize: "1.15", largeTargets: true, labels: true, pace: "gentle" };
    }
    syncSettingsForm();
    applyPreferences();
    showToast("Đã xem trước bộ cài đặt. Chọn “Lưu cách chơi” để giữ lại.");
  }

  function applyPreferences() {
    const html = document.documentElement;
    html.dataset.theme = preferences.visualMode;
    html.dataset.contrast = preferences.highContrast ? "high" : "normal";
    html.dataset.motion = preferences.reduceMotion ? "reduced" : "full";
    html.dataset.targets = preferences.largeTargets ? "large" : "standard";
    html.style.setProperty("--font-scale", preferences.textSize);

    els.visualModeChip.innerHTML = `<span aria-hidden="true">◐</span> Giao diện: ${preferences.visualMode === "calm" ? "dịu" : "tươi"}`;
    els.soundChip.innerHTML = `<span aria-hidden="true">♪</span> Âm thanh: ${preferences.sound ? "bật" : "tắt"}`;
    els.motionChip.innerHTML = `<span aria-hidden="true">≈</span> Chuyển động: ${preferences.reduceMotion ? "giảm" : "nhẹ"}`;
    scheduleScanRefresh();
  }

  function scheduleBreakReminder() {
    clearBreakTimer();
    if (!preferences.breakMinutes || !session) return;
    breakTimer = window.setTimeout(() => {
      if (!session || session.type === "checkin") return;
      openPause(true);
    }, preferences.breakMinutes * 60 * 1000);
  }

  function clearBreakTimer() {
    if (breakTimer) window.clearTimeout(breakTimer);
    breakTimer = null;
  }

  function openPause(fromReminder = false) {
    lastFocusedBeforeModal = document.activeElement;
    els.pauseModal.hidden = false;
    scheduleScanRefresh();
    document.getElementById("pauseTitle").textContent = fromReminder ? "Mình đã chơi một lúc rồi. Muốn nghỉ không?" : "Mình có thể dừng một chút.";
    document.getElementById("resumeBtn").focus();
  }

  function closePause() {
    els.pauseModal.hidden = true;
    scheduleScanRefresh();
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") lastFocusedBeforeModal.focus();
  }

  function speak(text, force = false) {
    if (!force && !preferences.narration) return;
    if (!("speechSynthesis" in window)) {
      showToast("Thiết bị này không hỗ trợ đọc văn bản.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    utterance.rate = preferences.pace === "gentle" ? 0.86 : 1;
    window.speechSynthesis.speak(utterance);
  }

  function playSuccessTone(sessionComplete = false) {
    if (!preferences.sound) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const now = audioContext.currentTime;
      const notes = sessionComplete ? [392, 494, 587] : [440];
      notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const start = now + index * 0.11;
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.042, start + 0.014);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.13);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start(start);
        oscillator.stop(start + 0.15);
      });
    } catch {}
  }

  function announce(message) {
    els.supportText.textContent = message;
    if (preferences.narration) speak(message);
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 2800);
  }

  function parsePackItems(text) {
    const seen = new Set();
    return text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line, index) => {
      const parts = line.split("|");
      const symbol = (parts[0] || "").trim().slice(0, 8);
      const label = (parts.slice(1).join("|") || "").trim().slice(0, 36);
      if (!symbol || !label) return null;
      const key = `${symbol.toLowerCase()}::${label.toLowerCase()}`;
      if (seen.has(key)) return null;
      seen.add(key);
      return { id: `item-${index}-${slugify(label)}`, symbol, label };
    }).filter(Boolean);
  }

  function normalizePacks(value) {
    if (!Array.isArray(value)) return [];
    return value.map((pack) => {
      if (!pack || typeof pack !== "object") return null;
      const type = pack.type === "focus" ? "focus" : pack.type === "match" ? "match" : null;
      const title = String(pack.title || "").trim().slice(0, 48);
      const items = Array.isArray(pack.items) ? pack.items.map((item, index) => ({ id: String(item.id || `item-${index}`), symbol: String(item.symbol || "").slice(0, 8), label: String(item.label || "").slice(0, 36) })).filter((item) => item.symbol && item.label).slice(0, 12) : [];
      if (!type || !title || items.length < 4) return null;
      return { id: String(pack.id || `pack-${Math.random().toString(36).slice(2, 9)}`), title, type, items };
    }).filter(Boolean).slice(0, 30);
  }

  function savePacks() {
    saveJson(STORAGE_KEYS.packs, contentPacks);
  }

  function renderContentPacks() {
    if (!els.customPacksList || !els.packLibraryList) return;
    els.customPacksSection.hidden = contentPacks.length === 0;
    const cards = contentPacks.map((pack) => `
      <article class="custom-pack-card">
        <span class="pack-symbols" aria-hidden="true">${pack.items.slice(0, 3).map((item) => escapeHtml(item.symbol)).join(" ")}</span>
        <div><small>${pack.type === "match" ? "Ghép đôi" : "Tìm mục tiêu"}</small><strong>${escapeHtml(pack.title)}</strong><span>${pack.items.length} mục • lưu cục bộ</span></div>
        <button class="secondary-button" type="button" data-custom-pack="${escapeHtml(pack.id)}" data-pack-type="${pack.type}">Chơi</button>
      </article>`).join("");
    els.customPacksList.innerHTML = cards;
    els.packLibraryList.innerHTML = contentPacks.length ? contentPacks.map((pack) => `
      <article class="pack-library-item">
        <div><span class="pack-symbols" aria-hidden="true">${pack.items.slice(0, 4).map((item) => escapeHtml(item.symbol)).join(" ")}</span><strong>${escapeHtml(pack.title)}</strong><small>${pack.type === "match" ? "Ghép đôi" : "Tìm mục tiêu"} • ${pack.items.length} mục</small></div>
        <div class="pack-item-actions"><button class="secondary-button" type="button" data-custom-pack="${escapeHtml(pack.id)}" data-pack-type="${pack.type}">Chơi thử</button><button class="danger-button" type="button" data-delete-pack="${escapeHtml(pack.id)}">Xóa</button></div>
      </article>`).join("") : `<div class="empty-pack-state"><span aria-hidden="true">▦</span><strong>Chưa có gói nào</strong><p>Tạo gói đầu tiên ở phía trên. Một gói cần ít nhất 4 mục.</p></div>`;
  }

  function exportPacks() {
    downloadJson({ schema: "votw-content-packs", version: 1, exportedAt: new Date().toISOString(), packs: contentPacks }, `goc-nhin-content-packs-${new Date().toISOString().slice(0, 10)}.json`);
  }

  async function importPacks(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const incoming = normalizePacks(Array.isArray(parsed) ? parsed : parsed.packs);
      if (!incoming.length) throw new Error("no packs");
      const known = new Set(contentPacks.map((pack) => pack.id));
      incoming.forEach((pack) => { if (known.has(pack.id)) pack.id = `${pack.id}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`; known.add(pack.id); contentPacks.push(pack); });
      contentPacks = contentPacks.slice(0, 30);
      savePacks(); renderContentPacks(); updateHome(); showToast(`Đã nhập ${incoming.length} gói nội dung.`);
    } catch { showToast("Không thể đọc tệp gói nội dung này."); }
  }

  function openCommunicationBoard() {
    if (!session) return;
    lastFocusedBeforeModal = document.activeElement;
    els.communicationModal.hidden = false;
    scheduleScanRefresh();
    document.querySelector("[data-comm]")?.focus();
  }

  function closeCommunicationBoard() {
    els.communicationModal.hidden = true;
    scheduleScanRefresh();
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") lastFocusedBeforeModal.focus();
  }

  function handleCommunicationChoice(choice) {
    closeCommunicationBoard();
    if (!session) return;
    if (choice === "pause") openPause(false);
    else if (choice === "help") { if (session.current) requestHint(); else announce("Khi chặng bắt đầu, nút Gợi ý sẽ xuất hiện."); }
    else if (choice === "easier") { if (session.phase === "playing") makeCurrentRoundEasier(); else announce("Chặng tiếp theo sẽ bắt đầu ở nhịp hiện tại. Khi chơi, bạn có thể chọn Nhẹ hơn."); }
    else if (choice === "quiet") { preferences.sound = false; applyPreferences(); announce("Đã tắt âm thanh cho lúc này."); }
    else if (choice === "explain") { speak(els.gameInstruction.textContent, true); announce(els.gameInstruction.textContent); }
    else if (choice === "finish") endActivityEarly();
  }

  function scheduleScanRefresh() {
    if (scanRefreshTimer) window.clearTimeout(scanRefreshTimer);
    scanRefreshTimer = window.setTimeout(refreshSwitchScan, 60);
  }

  function refreshSwitchScan() {
    stopSwitchScan(false);
    if (!preferences.switchScanning || !document.getElementById("playScreen").classList.contains("is-active")) return;
    const container = !els.communicationModal.hidden ? els.communicationModal : (!els.pauseModal.hidden ? els.pauseModal : document.getElementById("playScreen"));
    scanTargets = [...container.querySelectorAll("button:not([disabled]):not([hidden]), [role=button]:not([aria-disabled=true])")].filter((element) => element.offsetParent !== null);
    if (!scanTargets.length) return;
    scanIndex = Math.min(Math.max(scanIndex, 0), scanTargets.length - 1);
    paintScanTarget();
    if (Number(preferences.scanSpeed) > 0) scanTimer = window.setInterval(() => advanceScan(1), Number(preferences.scanSpeed));
  }

  function advanceScan(direction = 1) {
    if (!scanTargets.length) return;
    scanIndex = (scanIndex + direction + scanTargets.length) % scanTargets.length;
    paintScanTarget();
  }

  function paintScanTarget() {
    document.querySelectorAll(".is-scan-target").forEach((element) => element.classList.remove("is-scan-target"));
    const target = scanTargets[scanIndex];
    if (!target) return;
    target.classList.add("is-scan-target");
    target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "auto" });
  }

  function stopSwitchScan(clearTargets = true) {
    if (scanTimer) window.clearInterval(scanTimer);
    scanTimer = null;
    document.querySelectorAll(".is-scan-target").forEach((element) => element.classList.remove("is-scan-target"));
    if (clearTargets) { scanTargets = []; scanIndex = -1; }
  }

  function slugify(value) {
    return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24) || "item";
  }

  function downloadJson(payload, filename) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = filename; anchor.click(); URL.revokeObjectURL(url);
  }

  function exportData() {
    const payload = {
      exportedAt: new Date().toISOString(),
      app: "Góc nhìn quanh em",
      schemaVersion: 2.2,
      note: "Dữ liệu mô tả tương tác với trò chơi; không phải đánh giá lâm sàng.",
      preferences,
      progress
    };
    downloadJson(payload, `goc-nhin-quanh-em-progress-${new Date().toISOString().slice(0, 10)}.json`);
  }

  function loadArrayJson(key) {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function loadJson(key, fallback) {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return structuredCloneSafe(fallback);
      return { ...structuredCloneSafe(fallback), ...JSON.parse(stored) };
    } catch {
      return structuredCloneSafe(fallback);
    }
  }

  function normalizeProgress(value) {
    const base = structuredCloneSafe(DEFAULT_PROGRESS);
    return {
      ...base,
      ...value,
      version: 2.2,
      sessions: Array.isArray(value?.sessions) ? value.sessions : [],
      activities: {
        match: { ...base.activities.match, ...(value?.activities?.match || {}) },
        focus: { ...base.activities.focus, ...(value?.activities?.focus || {}) },
        sequence: { ...base.activities.sequence, ...(value?.activities?.sequence || {}) },
        pattern: { ...base.activities.pattern, ...(value?.activities?.pattern || {}) },
        classify: { ...base.activities.classify, ...(value?.activities?.classify || {}) }
      }
    };
  }

  function saveJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { showToast("Trình duyệt không cho phép lưu cục bộ."); }
  }

  function structuredCloneSafe(value) {
    return typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value));
  }

  function shuffle(array) {
    for (let index = array.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }
    return array;
  }

  function pick(array) { return array[Math.floor(Math.random() * array.length)]; }
  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  function sum(values) { return values.reduce((total, value) => total + Number(value || 0), 0); }
  function roundNumber(value, digits = 2) { const factor = 10 ** digits; return Math.round(value * factor) / factor; }
  function formatDate(date) { return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit" }).format(date); }
  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
