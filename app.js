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
    narration: true,
    textSize: "1.15",
    largeTargets: true,
    labels: false,
    preschoolMode: true,
    supportLevel: "high",
    stableDifficulty: true,
    errorlessSupport: true,
    showAdvancedActivities: false,
    pace: "gentle",
    autoHint: true,
    breakMinutes: 4,
    switchScanning: false,
    scanSpeed: 1800
  };

  const DEFAULT_PROGRESS = {
    version: 2.9,
    sessions: [],
    activities: {
      match: { difficulty: 0, sessions: 0, totalHints: 0, lastAccuracy: null },
      focus: { difficulty: 0, sessions: 0, totalHints: 0, lastAccuracy: null },
      sequence: { difficulty: 0, sessions: 0, totalHints: 0, lastAccuracy: null },
      pattern: { difficulty: 0, sessions: 0, totalHints: 0, lastAccuracy: null },
      classify: { difficulty: 0, sessions: 0, totalHints: 0, lastAccuracy: null },
      daily: { difficulty: 0, sessions: 0, totalHints: 0, lastAccuracy: null }
    }
  };

  const ACTIVITY_META = {
    match: {
      title: "Ghép hình",
      skill: "Nhìn và nhớ hình",
      instruction: "Tìm hai hình giống nhau.",
      icon: "◆",
      intro: [
        "Cùng tìm hai hình giống nhau.",
        "Có thêm vài hình mới.",
        "Chạm từng hình một nhé."
      ]
    },
    focus: {
      title: "Tìm giống nhau",
      skill: "Nhìn mẫu và tìm lại",
      instruction: "Tìm các hình giống mẫu.",
      icon: "◎",
      intro: [
        "Nhìn hình mẫu rồi tìm hình giống nó.",
        "Có thêm vài hình để quan sát.",
        "Cứ tìm từng hình một."
      ]
    },
    sequence: {
      title: "Đi theo thứ tự",
      skill: "Theo đúng thứ tự",
      instruction: "Chọn theo đúng thứ tự.",
      icon: "123",
      intro: [
        "Đi từng bước một.",
        "Con đường dài hơn một chút.",
        "Chọn bước tiếp theo nhé."
      ]
    },
    pattern: {
      title: "Mảnh còn thiếu",
      skill: "Nhìn quy luật đơn giản",
      instruction: "Chọn hình còn thiếu.",
      icon: "◈",
      intro: [
        "Nhìn các hình đang lặp lại.",
        "Có một thay đổi nhỏ.",
        "Tìm mảnh còn thiếu nhé."
      ]
    },
    classify: {
      title: "Về đúng nhà",
      skill: "Nhóm đồ vật giống nhau",
      instruction: "Chọn ngôi nhà đúng.",
      icon: "▦",
      intro: [
        "Mỗi đồ vật cần về đúng nhà.",
        "Có thêm vài đồ vật mới.",
        "Chọn ngôi nhà đúng nhé."
      ]
    },
    daily: {
      title: "Việc tiếp theo",
      skill: "Sinh hoạt hằng ngày • chọn bước tiếp theo",
      instruction: "Chọn việc tiếp theo.",
      icon: "👐",
      intro: [
        "Nhìn việc đang làm rồi chọn bước tiếp theo.",
        "Mình làm thêm một trình tự quen thuộc."
      ]
    },
    checkin: {
      title: "Mặt cảm xúc",
      skill: "Cảm xúc và nhu cầu",
      instruction: "Chọn khuôn mặt gần giống bé lúc này.",
      icon: "♡"
    }
  };


  const ACTIVITY_ICON_IDS = {
    daily: "daily",
    match: "match",
    focus: "target",
    sequence: "sequence",
    pattern: "pattern",
    classify: "classify",
    checkin: "face"
  };

  const ACTIVITY_SESSION_META = {
    daily: [
      ["Thời lượng", "3–5 phút"],
      ["Lựa chọn", "2 hình mỗi bước"],
      ["Tốc độ", "Không đếm ngược"],
      ["Hỗ trợ", "Giọng đọc • gợi ý ít lỗi"]
    ],
    match: [
      ["Thời lượng", "3–5 phút"],
      ["Nội dung", "2–4 cặp hình"],
      ["Tốc độ", "Không đếm ngược"],
      ["Hỗ trợ", "Xem mẫu • ảnh thật quen thuộc"]
    ],
    focus: [
      ["Thời lượng", "3–5 phút"],
      ["Lựa chọn", "4 ô ở mức hỗ trợ cao"],
      ["Tốc độ", "Không yêu cầu phản ứng nhanh"],
      ["Hỗ trợ", "Mẫu luôn nhìn thấy"]
    ],
    checkin: [
      ["Thời lượng", "1–3 phút"],
      ["Lựa chọn", "4 lựa chọn ở mức hỗ trợ cao"],
      ["Chấm điểm", "Không"],
      ["Lưu dữ liệu", "Không lưu lựa chọn"]
    ],
    classify: [
      ["Thời lượng", "3–5 phút"],
      ["Lựa chọn", "2–3 nhóm"],
      ["Tốc độ", "Không đếm ngược"],
      ["Hỗ trợ", "Chỉ nhóm nên thử tiếp"]
    ],
    sequence: [
      ["Thời lượng", "3–5 phút"],
      ["Độ dài", "3–4 bước"],
      ["Tốc độ", "Không đếm ngược"],
      ["Hỗ trợ", "Giữ lại bước đã đúng"]
    ],
    pattern: [
      ["Thời lượng", "3–5 phút"],
      ["Lựa chọn", "2–3 mảnh"],
      ["Tốc độ", "Không đếm ngược"],
      ["Hỗ trợ", "Đánh dấu mảnh có thể thử"]
    ]
  };

  const ACTIVITY_INFO = {
    daily: {
      summary: "Luyện trình tự quen thuộc bằng hai lựa chọn lớn và hình cụ thể.",
      needs: ["routine", "low-choice", "visual", "communication"],
      who: ["Cần biết bước tiếp theo", "Cần 2 lựa chọn", "Học tốt hơn bằng hình", "Đang luyện hoạt động sinh hoạt hằng ngày"],
      about: "Trẻ nhìn một bước đang diễn ra trong trình tự quen thuộc rồi chọn việc tiếp theo. Cấu trúc giữ ổn định, không có đếm ngược và có thể lặp lại cùng trình tự nhiều lần.",
      skills: {
        "Kỹ năng chức năng": ["Theo trình tự quen thuộc", "Hoàn thành nhiệm vụ", "Chuỗi hoạt động hằng ngày"],
        "Nhận thức": ["Sắp xếp thứ tự", "Nguyên nhân – kết quả", "Chọn giữa hai phương án"],
        "Giao tiếp": ["Hiểu hướng dẫn ngắn", "Dùng gợi ý bằng hình"]
      },
      support: ["Làm mẫu một lần trước khi yêu cầu trẻ chọn.", "Nếu trẻ do dự, dùng gợi ý ít lỗi thay vì lặp lại câu hỏi.", "Ưu tiên trình tự thật đang dùng ở nhà hoặc lớp."],
      access: ["Cảm ứng / chuột", "Bàn phím", "Quét bằng một nút", "Giọng đọc trên thiết bị"]
    },
    match: {
      summary: "Ghép hai hình giống nhau với luật chơi lặp lại và ít thay đổi.",
      needs: ["visual", "low-choice", "cognitive"],
      who: ["Học bằng hình", "Cần luật chơi rất ổn định", "Đang luyện ghép hình", "Cần ảnh thật quen thuộc"],
      about: "Hai thẻ được mở để tìm cặp giống nhau. Phần đã làm đúng luôn được giữ lại; người lớn có thể dùng ảnh thật của người hoặc vật quen thuộc thay cho biểu tượng.",
      skills: {
        "Nhận thức": ["Ghép hình giống nhau", "Ghi nhớ ngắn hạn", "Nhận biết đồ vật"],
        "Học tập": ["Ghép tương ứng", "Hoàn thành nhiệm vụ"]
      },
      support: ["Bắt đầu với 2 cặp.", "Dùng ảnh thật quen thuộc nếu biểu tượng trừu tượng khó hiểu.", "Cho trẻ xem mẫu trước khi chơi nếu cần."],
      access: ["Cảm ứng / chuột", "Bàn phím", "Quét bằng một nút", "Ảnh thật lưu cục bộ", "Giọng thu của người lớn"]
    },
    focus: {
      summary: "Nhìn mẫu rồi tìm một hình giống mẫu trong một nhóm nhỏ.",
      needs: ["visual", "low-choice", "cognitive"],
      who: ["Cần luyện quét tìm bằng mắt", "Cần ít chi tiết gây nhiễu", "Học tốt bằng mẫu trực quan"],
      about: "Một mẫu lớn được hiển thị trước. Trẻ tìm hình giống mẫu trong một số lựa chọn giới hạn. High-support mode giảm số ô và target để tránh quá tải.",
      skills: {
        "Nhận thức": ["Chú ý bằng mắt", "Phân biệt hình ảnh", "Nhận biết đồ vật"],
        "Học tập": ["Ghép theo mẫu", "Làm theo hướng dẫn một bước"]
      },
      support: ["Giữ mẫu luôn nhìn thấy.", "Giảm chi tiết gây nhiễu trước khi tăng lượng thông tin.", "Không yêu cầu trẻ phải phản ứng thật nhanh."],
      access: ["Cảm ứng / chuột", "Bàn phím", "Quét bằng một nút", "Ảnh thật lưu cục bộ"]
    },
    checkin: {
      summary: "Bảng hình giúp trẻ thể hiện cảm xúc hoặc nhu cầu mà không chấm điểm.",
      needs: ["communication", "socio-emotional", "visual", "low-choice"],
      who: ["Ngôn ngữ nói còn hạn chế", "Cần cách từ chối/nghỉ", "Cần hình để nói về trạng thái hiện tại"],
      about: "Trẻ chọn khuôn mặt hoặc nhu cầu gần nhất với mình. Lựa chọn chỉ phục vụ giao tiếp hiện tại và không được lưu vào progress.",
      skills: {
        "Giao tiếp": ["Giao tiếp chức năng", "Thể hiện nhu cầu", "Đưa ra lựa chọn"],
        "Cảm xúc xã hội": ["Nhận biết trạng thái bản thân", "Yêu cầu hỗ trợ", "Tự quyết định"]
      },
      support: ["Người lớn vừa nói vừa chạm biểu tượng để model AAC.", "Chấp nhận mọi phương thức phản hồi, không ép trẻ nói.", "Không biến lựa chọn cảm xúc thành bài kiểm tra."],
      access: ["Cảm ứng / chuột", "Bàn phím", "Quét bằng một nút", "Giọng đọc trên thiết bị"]
    },
    classify: {
      summary: "Chọn nhóm phù hợp cho một đồ vật bằng nút lớn, không kéo-thả.",
      needs: ["visual", "cognitive"],
      who: ["Đã quen ghép hình", "Đang luyện nhóm khái niệm cụ thể", "Có thể chọn giữa 2–3 nhóm"],
      about: "Một đồ vật xuất hiện và trẻ chọn nhóm phù hợp. Phần đúng được giữ lại; chế độ gợi ý ít lỗi có thể làm nổi lựa chọn nên thử tiếp.",
      skills: {
        "Nhận thức": ["Phân nhóm", "Hình thành khái niệm cụ thể", "Đưa ra lựa chọn"],
        "Học tập": ["Liên hệ đồ vật – nhóm", "Sắp xếp theo nhóm"]
      },
      support: ["Chỉ dùng nhóm rất cụ thể và quen thuộc.", "Bắt đầu 2 nhóm.", "Không dùng category trừu tượng nếu trẻ chưa sẵn sàng."],
      access: ["Cảm ứng / chuột", "Bàn phím", "Quét bằng một nút"]
    },
    sequence: {
      summary: "Chọn từng bước theo thứ tự, giữ lại mọi bước đã đúng.",
      needs: ["routine", "cognitive"],
      who: ["Đã hiểu chọn 1 trong nhiều hình", "Đang luyện trình tự 3–4 bước"],
      about: "Trẻ chọn các hình theo trình tự. Một lựa chọn chưa đúng không xóa những bước đã hoàn thành.",
      skills: {
        "Nhận thức": ["Sắp xếp thứ tự", "Ghi nhớ ngắn hạn", "Lập trình tự"],
        "Kỹ năng chức năng": ["Làm theo thứ tự", "Hoàn thành nhiệm vụ"]
      },
      support: ["Ưu tiên chuỗi quen thuộc.", "Dùng 3 bước trước.", "Cho visual model nếu trẻ chưa hiểu thứ tự."],
      access: ["Cảm ứng / chuột", "Bàn phím", "Quét bằng một nút"]
    },
    pattern: {
      summary: "Tìm mảnh còn thiếu trong một quy luật hình đơn giản.",
      needs: ["cognitive", "visual"],
      who: ["Đã sẵn sàng với hoạt động trừu tượng hơn", "Có thể so sánh nhiều hình"],
      about: "Một chuỗi hình lặp được hiển thị và trẻ chọn phần còn thiếu. Không có giới hạn thời gian.",
      skills: {
        "Nhận thức": ["Nhận biết quy luật", "Suy luận bằng hình", "Dự đoán bước tiếp"],
        "Học tập": ["Ghép theo quy luật", "Đưa ra lựa chọn"]
      },
      support: ["Chỉ bật khi trẻ đã thoải mái với ghép hình và trình tự quen thuộc.", "Dùng quy luật AB trước.", "Tắt activity nếu abstraction làm trẻ khó chịu."],
      access: ["Cảm ứng / chuột", "Bàn phím", "Quét bằng một nút"]
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


  const DAILY_ROUTINES = [
    {
      id: "wash-hands",
      title: "Rửa tay",
      steps: [
        { icon: "faucet", symbol: "🚰", label: "Mở nước" },
        { icon: "soap", symbol: "🧴", label: "Lấy xà phòng" },
        { icon: "hands", symbol: "👐", label: "Chà tay" },
        { icon: "waterdrop", symbol: "💧", label: "Rửa sạch" },
        { icon: "towel", symbol: "🧻", label: "Lau tay" }
      ]
    },
    {
      id: "drink-water",
      title: "Uống nước",
      steps: [
        { icon: "cup", symbol: "🥤", label: "Lấy cốc" },
        { icon: "faucet", symbol: "🚰", label: "Rót nước" },
        { icon: "waterdrop", symbol: "💧", label: "Uống nước" },
        { icon: "check", symbol: "✓", label: "Đặt cốc lại" }
      ]
    },
    {
      id: "tidy-toys",
      title: "Cất đồ chơi",
      steps: [
        { icon: "toy", symbol: "★", label: "Chọn đồ chơi" },
        { icon: "box", symbol: "□", label: "Tìm hộp" },
        { icon: "put-in", symbol: "↓", label: "Bỏ vào hộp" },
        { icon: "check", symbol: "✓", label: "Xong" }
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

  let preferences = normalizePreferences(loadJson(STORAGE_KEYS.preferences, DEFAULT_PREFERENCES));
  let progress = normalizeProgress(loadJson(STORAGE_KEYS.progress, DEFAULT_PROGRESS));
  let contentPacks = normalizePacks(loadArrayJson(STORAGE_KEYS.packs));
  let session = null;
  let breakTimer = null;
  let toastTimer = null;
  let answerFeedbackTimer = null;
  let answerFeedbackHideTimer = null;
  let audioContext = null;
  let lastFocusedBeforeModal = null;
  let scanTimer = null;
  let scanIndex = -1;
  let scanTargets = [];
  let scanRefreshTimer = null;
  let pendingPhotoItems = [];
  let pendingVoiceData = null;
  let mediaRecorder = null;
  let recordingStream = null;
  let voiceChunks = [];
  let voiceStopTimer = null;
  let currentVoiceAudio = null;
  let adultUnlockedUntil = 0;
  let adultGateTimer = null;
  let adultIdleTimer = null;
  let pendingAdultRoute = null;
  let editingPackId = null;
  let dialogResolver = null;
  let dialogPreviousFocus = null;

  const els = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheElements();
    bindNavigation();
    bindDialogSystem();
    bindAdultGate();
    bindSettings();
    bindPlayControls();
    bindProgressControls();
    bindPackControls();
    bindCommunicationControls();
    bindGuideControls();
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
    els.toastMessage = document.getElementById("toastMessage");
    els.toastIconUse = document.getElementById("toastIconUse");
    els.appDialog = document.getElementById("appDialog");
    els.appDialogTitle = document.getElementById("appDialogTitle");
    els.appDialogMessage = document.getElementById("appDialogMessage");
    els.appDialogDetail = document.getElementById("appDialogDetail");
    els.appDialogEyebrow = document.getElementById("appDialogEyebrow");
    els.appDialogIconUse = document.getElementById("appDialogIconUse");
    els.appDialogCancelBtn = document.getElementById("appDialogCancelBtn");
    els.appDialogConfirmBtn = document.getElementById("appDialogConfirmBtn");
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
    els.customPacksSection = document.getElementById("customPacksSection");
    els.customPacksList = document.getElementById("customPacksList");
    els.packLibraryList = document.getElementById("packLibraryList");
    els.communicationModal = document.getElementById("communicationModal");
    els.homeCommunicationBtn = document.getElementById("homeCommunicationBtn");
    els.pictureRoutine = document.getElementById("pictureRoutine");
    els.adultGateModal = document.getElementById("adultGateModal");
    els.adultGateBtn = document.getElementById("adultGateBtn");
    els.adultHoldBtn = document.getElementById("adultHoldBtn");
    els.adultHoldProgress = document.getElementById("adultHoldProgress");
    els.adultMenu = document.getElementById("adultMenu");
    els.packSourceInput = document.getElementById("packSourceInput");
    els.symbolPackField = document.getElementById("symbolPackField");
    els.photoPackField = document.getElementById("photoPackField");
    els.packPhotoInput = document.getElementById("packPhotoInput");
    els.packPhotoPreview = document.getElementById("packPhotoPreview");
    els.voiceRecordStatus = document.getElementById("voiceRecordStatus");
    els.adultGameCatalog = document.getElementById("adultGameCatalog");
    els.gameInfoModal = document.getElementById("gameInfoModal");
    els.gameInfoSession = document.getElementById("gameInfoSession");
    els.readActivityChoicesBtn = document.getElementById("readActivityChoicesBtn");
    els.communicationMoreBtn = document.getElementById("communicationMoreBtn");
    els.communicationMoreGrid = document.getElementById("communicationMoreGrid");
    els.quickStartLabel = document.getElementById("quickStartLabel");
    els.answerFeedback = document.getElementById("answerFeedback");
    els.answerFeedbackTitle = document.getElementById("answerFeedbackTitle");
    els.answerFeedbackDetail = document.getElementById("answerFeedbackDetail");
    els.answerFeedbackIconUse = document.getElementById("answerFeedbackIconUse");
    els.packEditBanner = document.getElementById("packEditBanner");
    els.packSaveBtn = document.getElementById("packSaveBtn");
    els.cancelPackEditBtn = document.getElementById("cancelPackEditBtn");
    els.restoreBackupInput = document.getElementById("restoreBackupInput");
  }

  function bindNavigation() {
    document.querySelectorAll("[data-route]").forEach((button) => {
      button.addEventListener("click", () => {
        const route = button.dataset.route;
        if (button.dataset.adultRoute && preferences.preschoolMode && !isAdultUnlocked()) {
          openAdultGate(route);
          return;
        }
        showScreen(route);
      });
    });

    document.querySelectorAll("[data-activity]").forEach((button) => {
      button.addEventListener("click", () => startActivity(button.dataset.activity));
    });

    document.addEventListener("click", (event) => {
      const startPackButton = event.target.closest("[data-custom-pack]");
      if (startPackButton) startActivity(startPackButton.dataset.packType, startPackButton.dataset.customPack);
    });

    els.readActivityChoicesBtn?.addEventListener("click", () => {
      const visible = [...document.querySelectorAll(".child-activity-grid [data-activity]")]
        .filter((button) => !button.hidden && getComputedStyle(button).display !== "none")
        .map((button) => button.querySelector("strong")?.textContent?.trim())
        .filter(Boolean);
      speak(`Con có thể chọn: ${visible.join(", ")}.`, true);
    });
  }



  function bindDialogSystem() {
    if (!els.appDialog) return;

    const finish = (accepted) => {
      const resolver = dialogResolver;
      dialogResolver = null;
      els.appDialog.hidden = true;
      syncModalState();
      scheduleScanRefresh();
      if (dialogPreviousFocus && typeof dialogPreviousFocus.focus === "function") {
        dialogPreviousFocus.focus({ preventScroll: true });
      }
      dialogPreviousFocus = null;
      resolver?.(accepted);
    };

    els.appDialogCancelBtn.addEventListener("click", () => finish(false));
    els.appDialogConfirmBtn.addEventListener("click", () => finish(true));
    els.appDialog.addEventListener("click", (event) => {
      if (event.target === els.appDialog) finish(false);
    });

    const modalObserver = new MutationObserver(syncModalState);
    document.querySelectorAll(".modal-backdrop").forEach((modal) => {
      modalObserver.observe(modal, { attributes: true, attributeFilter: ["hidden"] });
    });

    document.addEventListener("keydown", (event) => {
      const openModal = [...document.querySelectorAll(".modal-backdrop:not([hidden])")].at(-1);
      if (!openModal) return;

      if (event.key === "Escape") {
        event.preventDefault();
        if (openModal === els.appDialog) finish(false);
        else if (openModal === els.communicationModal) closeCommunicationBoard();
        else if (openModal === els.gameInfoModal) closeGameInfo();
        else if (openModal === els.pauseModal) closePause();
        else if (openModal === els.adultGateModal) closeAdultGate();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = [...openModal.querySelectorAll(
        'button:not([disabled]):not([hidden]), input:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])'
      )].filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    syncModalState();
  }

  function syncModalState() {
    const anyOpen = Boolean(document.querySelector(".modal-backdrop:not([hidden])"));
    document.body.classList.toggle("has-modal", anyOpen);
  }

  function openAppDialog({
    kind = "info",
    eyebrow = "Xác nhận",
    title,
    message,
    detail = "",
    confirmLabel = "Tiếp tục",
    cancelLabel = "Quay lại",
    confirmStyle = "primary",
    icon = null
  }) {
    if (!els.appDialog) return Promise.resolve(true);

    if (dialogResolver) {
      dialogResolver(false);
      dialogResolver = null;
    }

    dialogPreviousFocus = document.activeElement;

    // A blocking dialog becomes the single active feedback layer.
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = null;
    els.toast?.classList.remove("is-visible");
    hideAnswerFeedback();

    const iconMap = {
      info: "info",
      success: "check",
      warning: "warning",
      danger: "trash"
    };
    const iconName = icon || iconMap[kind] || "info";

    els.appDialog.dataset.kind = kind;
    els.appDialogEyebrow.textContent = eyebrow;
    els.appDialogTitle.textContent = title || "";
    els.appDialogMessage.textContent = message || "";
    els.appDialogDetail.textContent = detail || "";
    els.appDialogDetail.hidden = !detail;
    els.appDialogIconUse.setAttribute("href", `#ui-${iconName}`);

    els.appDialogCancelBtn.textContent = cancelLabel || "Đóng";
    els.appDialogCancelBtn.hidden = !cancelLabel;
    els.appDialogConfirmBtn.textContent = confirmLabel;
    els.appDialogConfirmBtn.className = confirmStyle === "danger" ? "danger-button" : "primary-button";

    els.appDialog.hidden = false;
    syncModalState();
    scheduleScanRefresh();
    requestAnimationFrame(() => {
      (cancelLabel ? els.appDialogCancelBtn : els.appDialogConfirmBtn).focus();
    });

    return new Promise((resolve) => {
      dialogResolver = resolve;
    });
  }

  function bindAdultGate() {
    if (!els.adultGateBtn || !els.adultGateModal || !els.adultHoldBtn) return;

    els.adultGateBtn.addEventListener("click", () => openAdultGate());
    document.getElementById("closeAdultGateBtn").addEventListener("click", closeAdultGate);
    els.adultGateModal.addEventListener("click", (event) => {
      if (event.target === els.adultGateModal) closeAdultGate();
    });

    let activeHoldPointerId = null;

    const beginHold = (event) => {
      if (event?.type === "keydown" && ![" ", "Enter"].includes(event.key)) return;
      if (event?.type === "keydown" && event.repeat) return;

      event?.preventDefault?.();
      cancelAdultHold(false);

      if (event?.type === "pointerdown") {
        activeHoldPointerId = event.pointerId;
        try { els.adultHoldBtn.setPointerCapture(event.pointerId); } catch (_) {}
      }

      els.adultHoldBtn.classList.add("is-holding");
      els.adultHoldBtn.setAttribute("aria-busy", "true");
      const holdLabel = els.adultHoldBtn.querySelector("strong");
      if (holdLabel) holdLabel.textContent = "Giữ tiếp…";
      els.adultHoldProgress.style.setProperty("--hold-progress", "100%");
      adultGateTimer = window.setTimeout(() => {
        activeHoldPointerId = null;
        unlockAdultArea();
      }, 2000);
    };

    const endHold = (event) => {
      if (event?.type === "keyup" && ![" ", "Enter"].includes(event.key)) return;
      if (event?.type === "pointerup" && activeHoldPointerId !== null && event.pointerId !== activeHoldPointerId) return;

      if (event?.type?.startsWith("pointer") && activeHoldPointerId !== null) {
        try { els.adultHoldBtn.releasePointerCapture(activeHoldPointerId); } catch (_) {}
      }
      activeHoldPointerId = null;
      cancelAdultHold(true);
    };

    if (window.PointerEvent) {
      els.adultHoldBtn.addEventListener("pointerdown", beginHold);
      els.adultHoldBtn.addEventListener("pointerup", endHold);
      els.adultHoldBtn.addEventListener("pointercancel", endHold);
      // Do not cancel on pointerleave. Pointer capture keeps a slightly moving
      // finger/trackpad gesture attached to the adult-gate button.
    } else {
      els.adultHoldBtn.addEventListener("mousedown", beginHold);
      els.adultHoldBtn.addEventListener("mouseup", endHold);
      els.adultHoldBtn.addEventListener("touchstart", beginHold, { passive: false });
      els.adultHoldBtn.addEventListener("touchend", endHold);
      els.adultHoldBtn.addEventListener("touchcancel", endHold);
    }

    els.adultHoldBtn.addEventListener("keydown", beginHold);
    els.adultHoldBtn.addEventListener("keyup", endHold);

    document.querySelectorAll("[data-adult-destination]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!isAdultUnlocked()) return;
        touchAdultAccess();
        const destination = button.dataset.adultDestination;
        closeAdultGate();
        showScreen(destination);
      });
    });

    document.getElementById("adultLockNowBtn")?.addEventListener("click", () => {
      closeAdultGate();
      lockAdultArea(true);
    });

    document.addEventListener("pointerdown", () => {
      if (isAdultUnlocked() && isAdultScreenActive()) touchAdultAccess();
    }, { capture: true, passive: true });
    document.addEventListener("keydown", () => {
      if (isAdultUnlocked() && isAdultScreenActive()) touchAdultAccess();
    }, { capture: true });
  }

  function isAdultUnlocked() {
    return Date.now() < adultUnlockedUntil;
  }

  function isAdultScreenActive() {
    const active = document.querySelector("[data-screen].is-active")?.dataset.screen;
    return ["progress", "guide", "packs", "settings"].includes(active);
  }

  function touchAdultAccess() {
    if (!isAdultUnlocked() && adultUnlockedUntil !== 0) return;
    adultUnlockedUntil = Date.now() + 5 * 60 * 1000;
    if (adultIdleTimer) window.clearTimeout(adultIdleTimer);
    adultIdleTimer = window.setTimeout(() => lockAdultArea(true, true), 5 * 60 * 1000 + 200);
    syncAdultAccessUI();
  }

  function lockAdultArea(returnHome = false, notify = false) {
    adultUnlockedUntil = 0;
    if (adultIdleTimer) window.clearTimeout(adultIdleTimer);
    adultIdleTimer = null;
    syncAdultAccessUI();
    if (returnHome && isAdultScreenActive()) showScreen("home");
    if (notify) showToast("Khu vực người lớn đã được khóa.", "info");
  }

  function openAdultGate(route = null) {
    if (!preferences.preschoolMode) {
      if (route) showScreen(route);
      return;
    }
    pendingAdultRoute = route;
    lastFocusedBeforeModal = document.activeElement;
    els.adultGateModal.hidden = false;
    if (isAdultUnlocked()) showAdultMenu();
    else resetAdultGateView();
    els.adultHoldBtn?.focus();
  }

  function closeAdultGate() {
    cancelAdultHold(false);
    els.adultGateModal.hidden = true;
    pendingAdultRoute = null;
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") lastFocusedBeforeModal.focus();
  }

  function resetAdultGateView() {
    document.getElementById("adultGateTitle").textContent = "Nhấn giữ để mở";
    document.getElementById("adultGateHelp").textContent = "Nhấn và giữ nút bên dưới khoảng 2 giây. Không cần PIN và app không lưu mật khẩu.";
    els.adultHoldBtn.hidden = false;
    els.adultMenu.hidden = true;
    els.adultHoldBtn.classList.remove("is-holding");
    els.adultHoldBtn.removeAttribute("aria-busy");
    const holdLabel = els.adultHoldBtn.querySelector("strong");
    if (holdLabel) holdLabel.textContent = "Nhấn giữ 2 giây";
    els.adultHoldProgress.style.setProperty("--hold-progress", "0%");
  }

  function cancelAdultHold(animateBack = true) {
    if (adultGateTimer) window.clearTimeout(adultGateTimer);
    adultGateTimer = null;
    if (!els.adultHoldBtn) return;
    els.adultHoldBtn.classList.remove("is-holding");
    els.adultHoldBtn.removeAttribute("aria-busy");
    const holdLabel = els.adultHoldBtn.querySelector("strong");
    if (holdLabel) holdLabel.textContent = "Nhấn giữ 2 giây";
    if (animateBack) els.adultHoldProgress.style.setProperty("--hold-progress", "0%");
  }

  function unlockAdultArea() {
    cancelAdultHold(false);
    adultUnlockedUntil = Date.now() + 5 * 60 * 1000;
    touchAdultAccess();
    showAdultMenu();
    if (pendingAdultRoute) {
      const route = pendingAdultRoute;
      pendingAdultRoute = null;
      window.setTimeout(() => {
        closeAdultGate();
        showScreen(route);
      }, 240);
    }
  }

  function showAdultMenu() {
    document.getElementById("adultGateTitle").textContent = "Đã mở khu vực người lớn";
    document.getElementById("adultGateHelp").textContent = "Chọn nơi bạn muốn quản lý. Khu vực này sẽ tự khóa lại sau một lúc.";
    els.adultHoldBtn.hidden = true;
    els.adultMenu.hidden = false;
  }

  function syncAdultAccessUI() {
    const unlocked = isAdultUnlocked();
    document.documentElement.dataset.adultUnlocked = unlocked ? "true" : "false";
    if (els.adultGateBtn) {
      els.adultGateBtn.setAttribute("aria-label", unlocked ? "Quản lý hoặc khóa khu vực người lớn" : "Mở khu vực người lớn");
      els.adultGateBtn.title = unlocked ? "Khu vực người lớn đang mở" : "Mở khu vực người lớn";
    }
  }


  function iconMarkup(name, className = "ui-icon") {
    const safe = String(name || "info").replace(/[^a-z0-9-]/gi, "");
    return `<svg class="${escapeHtml(className)}" aria-hidden="true" focusable="false"><use href="#ui-${safe}"></use></svg>`;
  }

  function bindGuideControls() {
    if (!els.adultGameCatalog || !els.gameInfoModal) return;

    document.querySelectorAll("[data-guide-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-guide-filter]").forEach((chip) => chip.classList.toggle("is-active", chip === button));
        renderAdultGameCatalog(button.dataset.guideFilter);
      });
    });

    els.adultGameCatalog.addEventListener("click", (event) => {
      const infoButton = event.target.closest("[data-game-info]");
      if (infoButton) openGameInfo(infoButton.dataset.gameInfo);
    });

    const close = () => closeGameInfo();
    document.getElementById("closeGameInfoBtn")?.addEventListener("click", close);
    document.getElementById("closeGameInfoBtnBottom")?.addEventListener("click", close);
    els.gameInfoModal.addEventListener("click", (event) => {
      if (event.target === els.gameInfoModal) closeGameInfo();
    });
    document.getElementById("startFromGameInfoBtn")?.addEventListener("click", () => {
      const type = els.gameInfoModal.dataset.activity;
      closeGameInfo();
      if (type) startActivity(type);
    });
  }

  function renderAdultGameCatalog(filter = "all") {
    if (!els.adultGameCatalog) return;
    const order = ["daily", "checkin", "match", "focus", "classify", "sequence", "pattern"];
    const cards = order.filter((type) => {
      const info = ACTIVITY_INFO[type];
      return info && (filter === "all" || info.needs.includes(filter));
    });

    els.adultGameCatalog.innerHTML = cards.map((type) => {
      const meta = ACTIVITY_META[type];
      const info = ACTIVITY_INFO[type];
      const skills = Object.values(info.skills).flat();
      const iconId = ACTIVITY_ICON_IDS[type] || "activities";
      return `
        <article class="adult-game-card adult-game-card--wonder">
          <div class="adult-game-card-top">
            <span class="adult-game-icon" aria-hidden="true">${iconMarkup(iconId, "ui-icon")}</span>
            <div>
              <p class="eyebrow">${escapeHtml(meta.skill)}</p>
              <h3>${escapeHtml(meta.title)}</h3>
            </div>
          </div>

          <section class="catalog-mini-section">
            <p class="wonder-label">PHÙ HỢP VỚI AI?</p>
            <div class="info-chip-list compact-chip-list">
              ${info.who.slice(0, 2).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
            </div>
          </section>

          <section class="catalog-mini-section catalog-about-section">
            <p class="wonder-label">HOẠT ĐỘNG DIỄN RA THẾ NÀO?</p>
            <p>${escapeHtml(info.summary)}</p>
          </section>

          <div class="catalog-facts">
            ${(ACTIVITY_SESSION_META[type] || []).slice(0, 2).map(([label, value]) => `<span><b>${escapeHtml(label)}</b>${escapeHtml(value)}</span>`).join("")}
          </div>

          <section class="catalog-mini-section">
            <p class="wonder-label">MỤC TIÊU LUYỆN TRONG HOẠT ĐỘNG</p>
            <div class="info-chip-list compact-chip-list skill-chip-list">
              ${skills.slice(0, 3).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
            </div>
          </section>

          <button class="secondary-button" type="button" data-game-info="${escapeHtml(type)}">Xem đầy đủ thông tin</button>
        </article>
      `;
    }).join("") || `<div class="empty-state">Chưa có hoạt động phù hợp với bộ lọc này.</div>`;
  }

  function openGameInfo(type) {
    const meta = ACTIVITY_META[type];
    const info = ACTIVITY_INFO[type];
    if (!meta || !info || !els.gameInfoModal) return;

    els.gameInfoModal.dataset.activity = type;
    const iconId = ACTIVITY_ICON_IDS[type] || "activities";
    document.getElementById("gameInfoIcon").innerHTML = iconMarkup(iconId, "ui-icon game-info-vector");
    document.getElementById("gameInfoTitle").textContent = meta.title;
    document.getElementById("gameInfoSummary").textContent = info.summary;
    document.getElementById("gameInfoAbout").textContent = info.about;
    document.getElementById("gameInfoWho").innerHTML = info.who.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
    document.getElementById("gameInfoSkills").innerHTML = Object.entries(info.skills).map(([category, skills]) => `
      <section><strong>${escapeHtml(category)}</strong><div>${skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}</div></section>
    `).join("");
    document.getElementById("gameInfoSupport").innerHTML = info.support.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    document.getElementById("gameInfoAccess").innerHTML = info.access.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

    const sessionInfo = ACTIVITY_SESSION_META[type] || [];
    if (els.gameInfoSession) {
      els.gameInfoSession.innerHTML = sessionInfo.map(([label, value]) => `
        <div class="session-info-item"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>
      `).join("");
    }

    els.gameInfoModal.hidden = false;
    lastFocusedBeforeModal = document.activeElement;
    document.getElementById("closeGameInfoBtn")?.focus();
  }

  function closeGameInfo() {
    if (!els.gameInfoModal) return;
    els.gameInfoModal.hidden = true;
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") lastFocusedBeforeModal.focus();
  }

  function bindSettings() {
    document.getElementById("saveSettingsBtn").addEventListener("click", () => {
      preferences = readSettingsForm();
      saveJson(STORAGE_KEYS.preferences, preferences);
      applyPreferences();
      updateHome();
      showToast("Đã lưu cách chơi trên thiết bị này.", "success");
      showScreen("home");
    });

    document.getElementById("restoreDefaultsBtn").addEventListener("click", async () => {
      const confirmed = await openAppDialog({
        kind: "warning",
        eyebrow: "Cài đặt",
        title: "Khôi phục cài đặt mặc định?",
        message: "Các tùy chỉnh hiện tại sẽ được thay bằng cấu hình hỗ trợ cao, dịu và ổn định.",
        confirmLabel: "Khôi phục",
        cancelLabel: "Giữ cài đặt hiện tại"
      });
      if (!confirmed) return;
      preferences = { ...DEFAULT_PREFERENCES };
      saveJson(STORAGE_KEYS.preferences, preferences);
      applyPreferences();
      syncSettingsForm();
      updateHome();
      showToast("Đã khôi phục cài đặt mặc định.", "success");
    });

    document.querySelectorAll("[data-preset]").forEach((button) => {
      button.addEventListener("click", () => applyPreset(button.dataset.preset));
    });
  }

  function bindPlayControls() {
    document.getElementById("leaveActivityBtn").addEventListener("click", requestEndActivity);
    document.getElementById("pauseBtn").addEventListener("click", () => openPause(false));
    document.getElementById("communicationBtn").addEventListener("click", openCommunicationBoard);
    els.homeCommunicationBtn?.addEventListener("click", openCommunicationBoard);
    document.getElementById("resumeBtn").addEventListener("click", closePause);
    document.getElementById("finishFromPauseBtn").addEventListener("click", () => {
      closePause();
      endActivityEarly();
    });

    document.getElementById("readInstructionBtn").addEventListener("click", () => {
      if (session?.customPack?.voiceData) playVoiceData(session.customPack.voiceData);
      else speak(els.gameInstruction.textContent, true);
    });

    els.hintBtn.addEventListener("click", requestHint);
    els.previewBtn.addEventListener("click", previewCurrentRound);
    els.easierBtn.addEventListener("click", makeCurrentRoundEasier);
    els.skipRoundBtn.addEventListener("click", skipCurrentRound);

    document.getElementById("playAgainBtn").addEventListener("click", () => {
      if (session?.type && session.type !== "checkin") startActivity(session.type, session.customPack?.id || null);
      else showScreen("home");
    });
  }

  function bindProgressControls() {
    document.getElementById("exportDataBtn").addEventListener("click", exportData);
    document.getElementById("backupAllBtn")?.addEventListener("click", exportFullBackup);
    document.getElementById("restoreBackupBtn")?.addEventListener("click", () => els.restoreBackupInput?.click());
    els.restoreBackupInput?.addEventListener("change", restoreFullBackup);

    document.getElementById("resetDataBtn").addEventListener("click", async () => {
      const confirmed = await openAppDialog({
        kind: "danger",
        eyebrow: "Xóa dữ liệu",
        title: "Xóa toàn bộ tiến trình?",
        message: "Thao tác này xóa lịch sử buổi chơi và mức thích ứng đã lưu trên thiết bị.",
        detail: "Cài đặt và gói nội dung tự tạo sẽ không bị xóa.",
        confirmLabel: "Xóa tiến trình",
        cancelLabel: "Giữ lại",
        confirmStyle: "danger"
      });
      if (!confirmed) return;
      progress = structuredCloneSafe(DEFAULT_PROGRESS);
      saveJson(STORAGE_KEYS.progress, progress);
      renderProgress();
      updateHome();
      showToast("Đã xóa tiến trình cục bộ.", "success");
    });
  }

  function bindPackControls() {
    const form = document.getElementById("packForm");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = document.getElementById("packTitleInput").value.trim();
      const type = document.getElementById("packTypeInput").value;
      const source = els.packSourceInput?.value === "photo" ? "photo" : "symbol";
      let items = [];

      if (source === "photo") {
        items = pendingPhotoItems.map((item, index) => {
          const labelInput = els.packPhotoPreview?.querySelector(`[data-photo-label="${index}"]`);
          const label = String(labelInput?.value || item.label || `Ảnh ${index + 1}`).trim().slice(0, 36) || `Ảnh ${index + 1}`;
          return { ...item, label };
        });
      } else {
        items = parsePackItems(document.getElementById("packItemsInput").value);
      }

      if (!title || items.length < 4) {
        showToast(source === "photo" ? "Cần tên gói và ít nhất 4 ảnh." : "Cần tên gói và ít nhất 4 mục hợp lệ.");
        return;
      }

      const pack = {
        id: `pack-${Date.now().toString(36)}`,
        title: title.slice(0, 48),
        type: type === "focus" ? "focus" : "match",
        mediaType: source,
        voiceData: pendingVoiceData || null,
        items: items.slice(0, source === "photo" ? 8 : 12)
      };

      if (JSON.stringify(pack).length > 2800000) {
        showToast("Gói này quá lớn để lưu an toàn trên trình duyệt. Hãy dùng ít ảnh hơn hoặc ảnh đơn giản hơn.");
        return;
      }

      if (editingPackId) {
        const existingIndex = contentPacks.findIndex((item) => item.id === editingPackId);
        if (existingIndex < 0) {
          cancelPackEdit();
          showToast("Không tìm thấy gói cần sửa.", "error");
          return;
        }
        pack.id = editingPackId;
        contentPacks[existingIndex] = pack;
        if (!savePacks()) return;
        showToast("Đã lưu thay đổi cho gói nội dung.", "success");
      } else {
        contentPacks.push(pack);
        if (!savePacks()) {
          contentPacks.pop();
          return;
        }
        showToast("Đã lưu gói nội dung trên thiết bị này.", "success");
      }

      form.reset();
      resetPackBuilderMedia();
      finishPackEditUI();
      renderContentPacks();
      updateHome();
    });

    els.cancelPackEditBtn?.addEventListener("click", cancelPackEdit);
    els.packSourceInput?.addEventListener("change", updatePackSourceUI);
    document.getElementById("choosePhotosBtn")?.addEventListener("click", () => els.packPhotoInput?.click());
    els.packPhotoInput?.addEventListener("change", handlePhotoSelection);
    document.getElementById("clearPackPhotosBtn")?.addEventListener("click", () => {
      pendingPhotoItems = [];
      if (els.packPhotoInput) els.packPhotoInput.value = "";
      renderPhotoPreviews();
    });

    document.getElementById("startVoiceRecordBtn")?.addEventListener("click", startVoiceRecording);
    document.getElementById("stopVoiceRecordBtn")?.addEventListener("click", stopVoiceRecording);
    document.getElementById("playVoiceRecordBtn")?.addEventListener("click", () => {
      if (pendingVoiceData) playVoiceData(pendingVoiceData);
    });
    document.getElementById("clearVoiceRecordBtn")?.addEventListener("click", clearPendingVoice);

    document.getElementById("exportPacksBtn").addEventListener("click", exportPacks);
    document.getElementById("importPacksBtn").addEventListener("click", () => document.getElementById("importPacksInput").click());
    document.getElementById("importPacksInput").addEventListener("change", importPacks);

    els.packLibraryList.addEventListener("click", async (event) => {
      const editButton = event.target.closest("[data-edit-pack]");
      if (editButton) {
        startPackEdit(editButton.dataset.editPack);
        return;
      }

      const deleteButton = event.target.closest("[data-delete-pack]");
      if (!deleteButton) return;
      const pack = contentPacks.find((item) => item.id === deleteButton.dataset.deletePack);
      if (!pack) return;

      const confirmed = await openAppDialog({
        kind: "danger",
        eyebrow: "Xóa gói nội dung",
        title: `Xóa “${pack.title}”?`,
        message: "Gói sẽ biến mất khỏi thiết bị này.",
        detail: pack.mediaType === "photo" || pack.voiceData ? "Ảnh và bản thu nằm trong gói cũng sẽ bị xóa." : "Bạn có thể xuất tệp trước nếu muốn giữ bản sao.",
        confirmLabel: "Xóa gói",
        cancelLabel: "Giữ lại",
        confirmStyle: "danger"
      });
      if (!confirmed) return;

      contentPacks = contentPacks.filter((item) => item.id !== pack.id);
      if (editingPackId === pack.id) cancelPackEdit();
      savePacks();
      renderContentPacks();
      updateHome();
      showToast("Đã xóa gói nội dung.", "success");
    });

    updatePackSourceUI();
    renderPhotoPreviews();
  }

  function bindCommunicationControls() {
    document.getElementById("closeCommunicationBtn").addEventListener("click", closeCommunicationBoard);
    els.communicationModal.addEventListener("click", (event) => {
      if (event.target === els.communicationModal) closeCommunicationBoard();
    });
    document.querySelectorAll("[data-comm]").forEach((button) => {
      button.addEventListener("click", () => handleCommunicationChoice(button.dataset.comm));
    });
    els.communicationMoreBtn?.addEventListener("click", () => {
      const nextHidden = !els.communicationMoreGrid?.hidden;
      if (els.communicationMoreGrid) els.communicationMoreGrid.hidden = nextHidden;
      els.communicationMoreBtn.setAttribute("aria-expanded", String(!nextHidden));
      els.communicationMoreBtn.textContent = nextHidden ? "Thêm lựa chọn" : "Ít lựa chọn hơn";
      scheduleScanRefresh();
    });
  }

  function bindSwitchScanning() {
    document.addEventListener("keydown", (event) => {
      const playActive = document.getElementById("playScreen").classList.contains("is-active");
      const communicationOpen = !els.communicationModal.hidden;
      const appDialogOpen = els.appDialog && !els.appDialog.hidden;
      if (!preferences.switchScanning || (!playActive && !communicationOpen && !appDialogOpen)) return;
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
    if (els.appDialog) observer.observe(els.appDialog, { subtree: true, childList: true, attributes: true, attributeFilter: ["hidden", "disabled"] });
  }

  function showScreen(name, focus = true) {
    document.documentElement.dataset.screen = name;
    if (["progress", "guide", "packs", "settings"].includes(name) && preferences.preschoolMode && !isAdultUnlocked()) {
      openAdultGate(name);
      return;
    }
    syncAdultAccessUI();
    document.querySelectorAll("[data-screen]").forEach((screen) => {
      screen.classList.toggle("is-active", screen.dataset.screen === name);
    });

    document.querySelectorAll(".nav-button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.route === name);
    });

    if (name === "progress") { touchAdultAccess(); renderProgress(); }
    if (name === "guide") { touchAdultAccess(); renderAdultGameCatalog(); }
    if (name === "packs") { touchAdultAccess(); renderContentPacks(); }
    if (name === "settings") { touchAdultAccess(); syncSettingsForm(); }
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
    hideAnswerFeedback();
    clearBreakTimer();
    const customPack = packId ? contentPacks.find((pack) => pack.id === packId && pack.type === type) : null;

    if (type === "checkin") {
      session = { type, checkin: {}, startedAt: Date.now() };
      configureGameHeader(type);
      setPlaySupports({ hint: false, preview: false, easier: false, skip: false });
      els.supportText.textContent = "Phần này giúp con nói điều mình cảm thấy. Không lưu lại.";
      showScreen("play");
      renderCheckinFeelings();
      return;
    }

    const activityProgress = progress.activities[type] || DEFAULT_PROGRESS.activities[type];
    const completedSessions = activityProgress.sessions || 0;
    const totalRounds = preferences.preschoolMode
      ? (preferences.supportLevel === "low" ? 3 : 2)
      : 3;
    const matchPoolOrder = ["animals", "colors", "shapes"];
    const focusGroupOrder = [2, 0, 1];
    const contextIndex = preferences.supportLevel === "high" ? 0 : Math.floor(completedSessions / 2);

    session = {
      type,
      round: 1,
      totalRounds,
      baseDifficulty: clamp(activityProgress.difficulty ?? 0, 0, supportDifficultyCap()),
      roundDifficulty: clamp(activityProgress.difficulty ?? 0, 0, supportDifficultyCap()),
      startedAt: Date.now(),
      rounds: [],
      totalSupports: 0,
      manualEaseCount: 0,
      skippedRounds: 0,
      current: null,
      phase: "intro",
      customPack,
      context: {
        matchPoolKey: preferences.supportLevel === "high" ? "animals" : matchPoolOrder[contextIndex % matchPoolOrder.length],
        focusGroupIndex: preferences.supportLevel === "high" ? 2 : focusGroupOrder[contextIndex % focusGroupOrder.length],
        routineIndex: completedSessions % DAILY_ROUTINES.length,
        sequenceIndex: preferences.supportLevel === "high" ? 1 : completedSessions % SEQUENCES.length,
        categoryIndex: preferences.supportLevel === "high" ? 2 : completedSessions % CATEGORY_SETS.length,
        patternSetIndex: preferences.supportLevel === "high" ? 2 : completedSessions % PATTERN_SYMBOL_SETS.length
      },
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
    els.gameSkill.textContent = preferences.preschoolMode
      ? "Chạm hình • nghe hướng dẫn"
      : (session?.customPack ? `Gói gia đình • ${meta.skill}` : meta.skill);
    els.gameInstruction.textContent = session?.customPack
      ? (preferences.preschoolMode ? `${meta.instruction}` : `Chơi với gói “${session.customPack.title}”. ${meta.instruction}`)
      : meta.instruction;
    els.difficultyChip.textContent = type === "checkin" ? "Không chấm điểm" : difficultyLabel(session?.roundDifficulty ?? 0);
    updatePictureRoutine(type === "checkin" ? "play" : "listen");
    if (session?.customPack?.voiceData) playVoiceData(session.customPack.voiceData);
    else if (preferences.narration) speak(els.gameInstruction.textContent);
    renderMissionProgress();
  }

  function showRoundIntro() {
    hideAnswerFeedback();
    if (!session || session.type === "checkin") return;
    session.phase = "intro";
    session.current = null;
    updatePictureRoutine("listen");
    session.roundDifficulty = chooseRoundDifficulty();
    renderMissionProgress();
    els.difficultyChip.textContent = difficultyLabel(session.roundDifficulty);
    setPlaySupports({ hint: false, preview: false, easier: false, skip: false });

    const meta = ACTIVITY_META[session.type];
    const intro = session.customPack ? `Chặng này dùng gói “${session.customPack.title}”. ${meta.intro[session.round - 1] || meta.intro.at(-1)}` : (meta.intro[session.round - 1] || meta.intro.at(-1));
    const stage = document.createElement("div");
    stage.className = "round-intro";
    stage.innerHTML = `
      <div class="round-badge" aria-hidden="true">${iconMarkup(ACTIVITY_ICON_IDS[session.type] || "activities", "ui-icon round-badge-icon")}</div>
      <p class="eyebrow">Phần ${session.round} / ${session.totalRounds}</p>
      <h2>${escapeHtml(roundName(session.round))}</h2>
      <p>${escapeHtml(intro)}</p>
      <div class="round-detail-row">
        <span>không cần làm nhanh</span>
        <span>có thể nghỉ bất cứ lúc nào</span>
      </div>
    `;

    const start = document.createElement("button");
    start.type = "button";
    start.className = "primary-button";
    start.textContent = preferences.preschoolMode ? "▶ Chơi" : (session.round === 1 ? "Bắt đầu chặng" : "Mình sẵn sàng");
    start.addEventListener("click", startRound);
    stage.appendChild(start);
    els.gameArea.replaceChildren(stage);
    els.supportText.textContent = preferences.preschoolMode ? "Nghe xong rồi chạm Chơi." : "Bạn quyết định lúc bắt đầu. Không có đồng hồ đếm ngược.";
    bringPlayContextIntoView();
  }

  function bringPlayContextIntoView() {
    if (!preferences.preschoolMode) return;
    requestAnimationFrame(() => {
      document.getElementById("pictureRoutine")?.scrollIntoView({
        block: "start",
        behavior: preferences.reduceMotion ? "auto" : "smooth"
      });
    });
  }

  function startRound() {
    if (!session || session.type === "checkin") return;
    session.phase = "playing";
    updatePictureRoutine("play");
    renderMissionProgress();
    els.difficultyChip.textContent = difficultyLabel(session.roundDifficulty);
    setPlaySupports({ hint: true, preview: session.type === "match", easier: session.roundDifficulty > 0, skip: true });
    els.supportText.textContent = preferences.preschoolMode ? "Cần giúp? Con có thể xem mẫu, xin chỉ giúp hoặc nghỉ." : "Cần giúp? Bạn có thể xin gợi ý, chọn nhẹ hơn hoặc kết thúc phần này.";

    if (session.type === "match") setupMatchRound();
    if (session.type === "focus") setupFocusRound();
    if (session.type === "sequence") setupSequenceRound();
    if (session.type === "pattern") setupPatternRound();
    if (session.type === "classify") setupClassifyRound();
    if (session.type === "daily") setupDailyRound();
    scheduleScanRefresh();
    bringPlayContextIntoView();
  }

  function supportDifficultyCap() {
    if (!preferences.preschoolMode) return 3;
    if (preferences.supportLevel === "high") return 1;
    if (preferences.supportLevel === "medium") return 2;
    return 2;
  }

  function supportChoiceCount() {
    if (!preferences.preschoolMode) return 4;
    if (preferences.supportLevel === "high") return 2;
    if (preferences.supportLevel === "medium") return 3;
    return 4;
  }

  function chooseRoundDifficulty() {
    let difficulty = session.baseDifficulty;
    const previous = [...session.rounds].reverse().find((round) => !round.skipped);
    if (!previous) return clamp(difficulty, 0, supportDifficultyCap());

    // Predictability first: high-support mode never raises complexity automatically.
    if (!preferences.stableDifficulty && previous.accuracy >= 0.88 && previous.hints === 0 && previous.manualEase === 0) difficulty += 1;
    else if (previous.accuracy < 0.58 || previous.hints >= 2 || previous.manualEase > 0) difficulty -= 1;

    return clamp(difficulty, 0, supportDifficultyCap());
  }

  function setupMatchRound() {
    const pairCount = clamp(2 + session.roundDifficulty, 2, preferences.preschoolMode ? Math.min(3, supportChoiceCount() + 1) : 5);
    const pool = session.customPack?.type === "match"
      ? session.customPack.items
      : MATCH_POOLS[session.context?.matchPoolKey || "animals"];
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
      const visual = card.image
        ? `<img class="item-photo memory-photo" src="${escapeHtml(card.image)}" alt="">`
        : `<span class="symbol" aria-hidden="true"${toneStyle}>${escapeHtml(card.symbol)}</span>`;
      button.innerHTML = `
        <span class="card-inner">
          ${visual}
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
        showAnswerFeedback("correct", "Đúng rồi!", "Hai hình giống nhau.");
        announce(`Đúng rồi. Đã tìm thấy cặp ${first.label}.`);
      } else {
        round.mismatches += 1;
        showAnswerFeedback("retry", "Thử lại nhé", "Hai hình này chưa giống nhau.");
        announce(preferences.errorlessSupport ? "Thử lại nhé. Thử cặp được đánh dấu." : "Thử lại nhé. Hai thẻ khác nhau. Những cặp con đã tìm đúng vẫn ở đó.");
        if (preferences.errorlessSupport && round.hints === 0) {
          round.hints += 1;
          session.totalSupports += 1;
          session.supports.hint += 1;
          window.setTimeout(() => { if (session?.current === round) hintMatch(round); }, 80);
        } else if (preferences.autoHint && round.mismatches >= 2 && round.hints === 0) {
          els.supportText.textContent = "Nút Chỉ giúp sẽ đánh dấu một cặp để con tự chọn.";
        }
      }

      round.opened = [];
      round.locked = false;
      renderMatchRound();
      if (round.matched.size === round.cards.length) window.setTimeout(finishRound, 1050);
    }, preferences.pace === "gentle" ? 1050 : 680);
  }

  function setupFocusRound() {
    const itemCount = preferences.preschoolMode && preferences.supportLevel === "high"
      ? 4
      : preferences.preschoolMode && preferences.supportLevel === "medium"
        ? 6
        : [6, 8, 10, 12][session.roundDifficulty];
    const group = session.customPack?.type === "focus"
      ? session.customPack.items
      : FOCUS_GROUPS[session.context?.focusGroupIndex ?? 2];
    const target = pick(group);
    const distractorPool = group.filter((item) => item.id !== target.id);
    const targetCount = preferences.preschoolMode && preferences.supportLevel === "high"
      ? 1
      : session.roundDifficulty >= 2 ? 3 : 2;
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
        ${round.target.image ? `<img class="item-photo target-photo" src="${escapeHtml(round.target.image)}" alt="">` : `<span class="target-symbol" aria-hidden="true">${escapeHtml(round.target.symbol)}</span>`}
        <span class="target-copy"><small>${preferences.preschoolMode ? "Tìm hình này" : "Tìm tất cả"}</small><strong>${preferences.labels || !preferences.preschoolMode ? escapeHtml(round.target.label) : ""}</strong></span>
      </div>
      <span class="found-counter">${preferences.preschoolMode ? `${round.found.size} / ${round.targetCount}` : `Đã tìm ${round.found.size} / ${round.targetCount}`}</span>
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
      button.innerHTML = cell.image
        ? `<img class="item-photo find-photo" src="${escapeHtml(cell.image)}" alt="">`
        : `<span class="find-symbol" aria-hidden="true">${escapeHtml(cell.symbol)}</span>`;
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
      showAnswerFeedback("correct", "Đúng rồi!", "Con đã tìm đúng hình.");
      announce(`Đúng rồi. Đây là ${cell.label}.`);
      renderFocusRound();
      if (round.found.size === round.targetCount) window.setTimeout(finishRound, 1050);
    } else {
      round.misses += 1;
      showAnswerFeedback("retry", "Thử lại nhé", "Hãy nhìn lại hình mẫu.");
      if (preferences.errorlessSupport) {
        round.hints += 1;
        session.totalSupports += 1;
        session.supports.hint += 1;
        announce(`Thử lại nhé. Hãy tìm ${round.target.label}.`);
        hintFocus(round);
      } else {
        announce(`Thử lại nhé. Đây là ${cell.label}. Hãy tiếp tục tìm ${round.target.label}.`);
        if (preferences.autoHint && round.misses >= 2 && round.hints === 0) {
          els.supportText.textContent = "Nếu muốn, Gợi ý sẽ đánh dấu một mục tiêu còn lại.";
        }
      }
    }
  }

  function setupSequenceRound() {
    const base = SEQUENCES[session.context?.sequenceIndex ?? 1];
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
      showAnswerFeedback("correct", "Đúng rồi!", "Đúng bước tiếp theo.");
      announce(`Đúng rồi. ${expected.label} đúng thứ tự.`);
      renderSequenceRound();
      if (round.selectedIds.length === round.ordered.length) window.setTimeout(finishRound, 1050);
    } else {
      const chosen = round.shuffled.find((item) => item.id === itemId);
      showAnswerFeedback("retry", "Thử lại nhé", "Bước này chưa phải bước tiếp theo.");
      if (preferences.errorlessSupport) {
        round.hints += 1;
        session.totalSupports += 1;
        session.supports.hint += 1;
        hintSequence(round);
      } else {
        announce(`Thử lại nhé. ${chosen?.label || "Mục này"} chưa phải bước tiếp theo. Phần đúng vẫn được giữ lại.`);
      }
    }
  }

  function setupClassifyRound() {
    const set = CATEGORY_SETS[session.context?.categoryIndex ?? 2];
    const desired = [4, 5, 6, 8][session.roundDifficulty];
    const candidates = set.groups.flatMap((group) => group.items.map((item, index) => ({ ...item, id: `${group.id}-${index}`, groupId: group.id })));
    const queue = shuffle(candidates).slice(0, Math.min(desired, candidates.length));
    session.current = {
      mode: "classify",
      label: set.label,
      groups: (() => {
        const all = set.groups.map(({ id, label, symbol }) => ({ id, label, symbol }));
        const required = new Set(queue.map((item) => item.groupId));
        const requiredGroups = all.filter((group) => required.has(group.id));
        const extra = all.filter((group) => !required.has(group.id));
        return [...requiredGroups, ...extra].slice(0, Math.max(requiredGroups.length, supportChoiceCount()));
      })(),
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
      showAnswerFeedback("correct", "Đúng rồi!", "Đã chọn đúng nhóm.");
      announce(`Đúng rồi. ${item.label} đã tìm được nhóm phù hợp.`);
      if (round.index >= round.queue.length) {
        round.complete = true;
        els.gameArea.querySelectorAll("button").forEach((button) => { button.disabled = true; });
        window.setTimeout(finishRound, 1050);
      } else renderClassifyRound();
    } else {
      showAnswerFeedback("retry", "Thử lại nhé", "Nhóm này chưa phù hợp.");
      if (preferences.errorlessSupport) {
        round.hints += 1;
        session.totalSupports += 1;
        session.supports.hint += 1;
        hintClassify(round);
      } else {
        announce("Thử lại nhé. Nhóm này chưa phù hợp. Mục đã làm đúng trước đó vẫn được giữ lại.");
      }
    }
  }


  function setupDailyRound() {
    const routine = DAILY_ROUTINES[session.context?.routineIndex ?? 0];
    const stepIndex = Math.min((session.round - 1) + session.roundDifficulty, routine.steps.length - 2);
    const current = routine.steps[stepIndex];
    const answer = routine.steps[stepIndex + 1];
    const distractorPool = routine.steps.filter((_, index) => index !== stepIndex + 1);
    const distractor = pick(distractorPool.filter((item) => item.label !== answer.label));
    const options = shuffle([answer, distractor]).slice(0, 2);

    session.current = {
      mode: "daily",
      routine,
      current,
      answer,
      options,
      attempts: 0,
      correct: 0,
      hints: 0,
      manualEase: 0,
      hintTarget: null,
      locked: false
    };
    renderDailyRound();
  }

  function dailyVisualMarkup(item, className = "daily-pictogram") {
    if (item?.icon) return iconMarkup(item.icon, `ui-icon ${className}`);
    return `<span class="${escapeHtml(className)} daily-pictogram--fallback">${escapeHtml(item?.symbol || "")}</span>`;
  }

  function renderDailyRound() {
    const round = session.current;
    if (!round || round.mode !== "daily") return;
    const wrap = document.createElement("div");
    wrap.className = "daily-wrap";
    wrap.innerHTML = `
      <div class="daily-context">
        <p class="eyebrow">${escapeHtml(round.routine.title)}</p>
        <div class="daily-current" aria-label="Đang làm ${escapeHtml(round.current.label)}">
          <span class="daily-pictogram-frame" aria-hidden="true">${dailyVisualMarkup(round.current)}</span>
          <strong>${escapeHtml(round.current.label)}</strong>
        </div>
        <div class="daily-arrow" aria-hidden="true">↓</div>
        <h2>Tiếp theo?</h2>
      </div>
    `;
    const choices = document.createElement("div");
    choices.className = "daily-choices";
    round.options.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `daily-choice${round.hintTarget === item.label ? " is-hint" : ""}`;
      button.setAttribute("aria-label", item.label);
      button.innerHTML = `<span class="daily-pictogram-frame" aria-hidden="true">${dailyVisualMarkup(item)}</span><strong>${escapeHtml(item.label)}</strong>`;
      button.addEventListener("click", () => onDailyChoice(item));
      choices.appendChild(button);
    });
    wrap.appendChild(choices);
    els.gameArea.replaceChildren(wrap);
  }

  function onDailyChoice(item) {
    const round = session.current;
    if (!round || round.locked) return;
    round.attempts += 1;
    if (item.label === round.answer.label) {
      round.correct += 1;
      round.locked = true;
      playSuccessTone();
      showAnswerFeedback("correct", "Đúng rồi!", "Đúng việc tiếp theo.");
      announce(`Đúng rồi. Bước tiếp theo là ${round.answer.label}.`);
      els.gameArea.querySelectorAll("button").forEach((button) => { button.disabled = true; });
      window.setTimeout(finishRound, 1050);
      return;
    }

    showAnswerFeedback("retry", "Thử lại nhé", "Hãy nhìn lại việc đang làm.");

    // Low-error mode immediately models the next successful response instead of
    // repeatedly presenting failure feedback.
    if (preferences.errorlessSupport) {
      round.hints += 1;
      session.totalSupports += 1;
      session.supports.hint += 1;
      round.hintTarget = round.answer.label;
      renderDailyRound();
      announce(`Thử lại nhé. Thử ${round.answer.label}.`);
      return;
    }
    announce("Thử lại nhé. Hãy nhìn lại bước tiếp theo.");
  }

  function hintDaily(round) {
    round.hintTarget = round.answer.label;
    renderDailyRound();
    announce(`Thử ${round.answer.label} nhé.`);
  }

  function setupPatternRound() {
    const symbolSet = shuffle([...(PATTERN_SYMBOL_SETS[session.context?.patternSetIndex ?? 2])]);
    const symbols = symbolSet.slice(0, session.roundDifficulty >= 2 ? 3 : 2);
    const definition = buildPattern(symbols, session.roundDifficulty);
    const distractorCount = Math.max(1, supportChoiceCount() - 1);
    const options = shuffle([definition.answer, ...symbolSet.filter((symbol) => symbol !== definition.answer).slice(0, distractorCount)]).slice(0, supportChoiceCount());

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
    question.innerHTML = `<h2>Mảnh nào đi tiếp theo?</h2><p>Nhìn các hình lặp lại. Con có thể thử nhiều lần.</p>`;

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
      showAnswerFeedback("correct", "Đúng rồi!", "Mảnh này phù hợp.");
      announce("Đúng rồi. Mảnh này làm quy luật tiếp tục.");
      const missing = els.gameArea.querySelector(".pattern-token.is-missing");
      if (missing) {
        missing.textContent = symbol;
        missing.classList.remove("is-missing");
      }
      els.gameArea.querySelectorAll("button").forEach((button) => { button.disabled = true; });
      window.setTimeout(finishRound, 1050);
    } else {
      showAnswerFeedback("retry", "Thử lại nhé", "Hãy nhìn lại các hình.");
      if (preferences.errorlessSupport) {
        round.hints += 1;
        session.totalSupports += 1;
        session.supports.hint += 1;
        hintPattern(round);
      } else {
        announce("Thử lại nhé. Mảnh này chưa tiếp tục quy luật. Nhìn lại những hình ngay trước dấu hỏi.");
      }
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
    announce("Các thẻ đang mở. Con có thể nhìn trước.");

    window.setTimeout(() => {
      if (!session || session.current !== round) return;
      round.previewing = false;
      els.previewBtn.disabled = false;
      renderMatchRound();
      announce("Các thẻ đã úp lại. Con có thể bắt đầu.");
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
    else if (round.mode === "daily") hintDaily(round);
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
    announce("Mảnh có thể đi tiếp đã được đánh dấu. Con vẫn là người chọn.");
  }

  function hintClassify(round) {
    const item = round.queue[round.index];
    if (!item) return;
    round.hintTarget = item.groupId;
    renderClassifyRound();
    announce("Nhóm có thể thử đã được đánh dấu. Con vẫn là người chọn.");
  }

  function makeCurrentRoundEasier() {
    if (!session || session.phase !== "playing" || session.roundDifficulty <= 0) {
      showToast("Phần này đã ở mức dễ nhất.");
      return;
    }

    session.roundDifficulty -= 1;
    session.manualEaseCount += 1;
    session.totalSupports += 1;
    session.supports.easier += 1;
    els.difficultyChip.textContent = difficultyLabel(session.roundDifficulty);
    showToast("Đã giảm lượng thông tin. Phần này bắt đầu lại; những phần trước vẫn được giữ.");
    startRound();
    if (session.current) session.current.manualEase = 1;
  }

  function skipCurrentRound() {
    if (!session || session.phase !== "playing") return;
    session.skippedRounds += 1;
    session.supports.skip += 1;
    session.rounds.push({ skipped: true, accuracy: null, attempts: 0, correct: 0, hints: 0, manualEase: 0, difficulty: session.roundDifficulty });
    announce("Phần này đã xong. Mình sang bước tiếp theo nhé.");
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
    updatePictureRoutine("rest");
    renderMissionProgress();
    setPlaySupports({ hint: false, preview: false, easier: false, skip: false });

    if (session.round >= session.totalRounds) {
      finishSession();
      return;
    }

    const stage = document.createElement("div");
    stage.className = "round-break";
    const reward = Array.from({ length: session.totalRounds }, (_, offset) => offset + 1).map((index) => `<span class="${index <= session.round && !skipped ? "is-earned" : ""}${index === session.round && !skipped ? " is-new" : ""}">${index <= session.round && !skipped ? "❧" : "○"}</span>`).join("");
    stage.innerHTML = preferences.preschoolMode ? `
      <div class="round-reward" aria-label="${session.round} phần đã đi qua">${reward}</div>
      <h2>${skipped ? "Phần này đã xong." : "Xong một phần."}</h2>
      <p>${skipped ? "Con có thể chơi phần tiếp theo hoặc nghỉ." : "Con có thể nghỉ một chút trước khi chơi tiếp."}</p>
    ` : `
      <div class="round-reward" aria-label="${session.round} chặng đã đi qua">${reward}</div>
      <p class="eyebrow">${skipped ? "Đã bỏ qua chặng" : `Chặng ${session.round} hoàn thành`}</p>
      <h2>${skipped ? "Mình có thể đi tiếp mà không cần hoàn thành mọi thứ." : "Một chiếc lá mới cho khu vườn."}</h2>
      <p>${skipped ? "Không có điểm bị trừ. Chặng tiếp theo bắt đầu khi bạn chọn." : "Trò chơi sẽ chỉ thay đổi nhẹ nếu chặng vừa rồi có vẻ quá dễ hoặc quá khó."}</p>
    `;

    const next = document.createElement("button");
    next.type = "button";
    next.className = "primary-button";
    next.textContent = preferences.preschoolMode ? "▶ Chơi tiếp" : "Đi tới chặng tiếp theo";
    next.addEventListener("click", () => {
      session.round += 1;
      showRoundIntro();
    });
    stage.appendChild(next);
    els.gameArea.replaceChildren(stage);
    els.supportText.textContent = preferences.preschoolMode ? "Con có thể nghỉ. Khi sẵn sàng, chạm Chơi tiếp." : "Không tự chuyển màn hình. Bạn tự quyết định lúc tiếp tục.";
    bringPlayContextIntoView();
    playSuccessTone();
  }

  function finishSession() {
    clearBreakTimer();
    session.phase = "complete";
    updatePictureRoutine("done");
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
      customPack: Boolean(session.customPack),
      totalRounds: session.totalRounds
    });
    progress.sessions = progress.sessions.slice(-80);
    saveJson(STORAGE_KEYS.progress, progress);

    const adjustmentMessage = nextDifficulty > previousDifficulty
      ? "Lần tới có thể có thêm một chút thông tin. Nút Dễ hơn vẫn luôn có sẵn."
      : nextDifficulty < previousDifficulty
        ? "Lần tới trò chơi sẽ bắt đầu nhẹ hơn một chút."
        : "Lần tới trò chơi sẽ giữ nhịp gần như hiện tại.";

    document.getElementById("completeTitle").textContent = preferences.preschoolMode ? "Xong rồi" : `Bạn đã hoàn thành ${session.totalRounds} phần.`;
    els.completeMessage.textContent = preferences.preschoolMode ? "Con muốn chơi lại hay về trang đầu?" : `Buổi chơi đã kết thúc. ${adjustmentMessage}`;
    const minutes = Math.max(1, Math.round((endedAt - session.startedAt) / 60000));
    els.sessionReflection.innerHTML = preferences.preschoolMode ? "" : `
      <div class="reflection-chip"><strong>${session.totalRounds - session.skippedRounds}/${session.totalRounds}</strong><span>phần đã hoàn thành</span></div>
      <div class="reflection-chip"><strong>${session.totalSupports}</strong><span>lần dùng hỗ trợ</span></div>
      <div class="reflection-chip"><strong>${minutes} phút</strong><span>thời lượng buổi chơi</span></div>
    `;
    document.getElementById("playAgainBtn").textContent = preferences.preschoolMode ? "▶ Chơi lại" : "Khám phá lại";

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

    const maxDifficulty = supportDifficultyCap();
    if (!preferences.stableDifficulty && average >= 0.87 && hints <= 1 && eased === 0) return clamp(current + 1, 0, maxDifficulty);
    if (average < 0.57 || hints >= 4 || eased > 0) return clamp(current - 1, 0, maxDifficulty);
    return clamp(current, 0, maxDifficulty);
  }


  function updatePictureRoutine(stage) {
    if (!els.pictureRoutine) return;
    const order = ["listen", "play", "rest", "done"];
    const currentIndex = Math.max(0, order.indexOf(stage));
    els.pictureRoutine.querySelectorAll("[data-routine]").forEach((step) => {
      const index = order.indexOf(step.dataset.routine);
      step.classList.toggle("is-current", index === currentIndex);
      step.classList.toggle("is-done", index < currentIndex);
    });
    const labels = { listen: "Nghe hướng dẫn", play: "Đang chơi", rest: "Đang nghỉ", done: "Đã xong" };
    els.pictureRoutine.setAttribute("aria-label", labels[stage] || "Trình tự buổi chơi");
  }

  function renderMissionProgress() {
    els.roundDots.innerHTML = "";
    if (!session || session.type === "checkin") {
      els.roundDots.setAttribute("aria-label", "Hoạt động tự nhận biết không có chặng chấm điểm.");
      return;
    }

    els.roundDots.setAttribute("aria-label", `Phần ${session.round} trên ${session.totalRounds}`);
    const names = preferences.preschoolMode
      ? ["Chơi", "Chơi thêm", "Xong"]
      : ["Khởi động", "Khám phá", "Kết thúc"];
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
    question.innerHTML = preferences.preschoolMode
      ? `<h2>Con thấy thế nào?</h2><p>Chạm vào một khuôn mặt. Không có đáp án sai.</p>`
      : `<h2>Lúc này con thấy gần với điều nào nhất?</h2><p>Con cũng có thể chọn “Không chắc”. Không có lựa chọn sai.</p>`;
    const options = document.createElement("div");
    options.className = "checkin-options";

    const feelings = preferences.preschoolMode && preferences.supportLevel === "high"
      ? CHECKIN_FEELINGS.filter((item) => ["comfortable", "tired", "upset", "unsure"].includes(item.id))
      : CHECKIN_FEELINGS;
    feelings.forEach((feeling) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "checkin-option";
      button.setAttribute("aria-label", feeling.label);
      button.innerHTML = `<span class="symbol" aria-hidden="true">${feeling.symbol}</span><span>${feeling.label}</span>`;
      button.addEventListener("click", () => {
        session.checkin.feeling = feeling;
        if (preferences.narration) speak(feeling.label, true);
        renderCheckinNeeds();
      });
      options.appendChild(button);
    });

    const note = document.createElement("div");
    note.className = "checkin-note";
    note.textContent = "Lựa chọn này chỉ dùng ở màn hình hiện tại và không được lưu vào lịch sử.";
    wrap.append(question, options, note);
    els.gameArea.replaceChildren(wrap);
  }

  function renderCheckinNeeds() {
    const feeling = session.checkin.feeling;
    const wrap = document.createElement("div");
    wrap.className = "checkin-wrap";
    const question = document.createElement("div");
    question.className = "checkin-question";
    question.innerHTML = preferences.preschoolMode
      ? `<h2>Con cần gì?</h2><p>Chạm vào điều có thể giúp con.</p>`
      : `<h2>Đã nghe con.</h2><p>Con có thể chọn điều giúp con lúc này.</p>`;
    const options = document.createElement("div");
    options.className = "need-options";

    const needs = preferences.preschoolMode && preferences.supportLevel === "high"
      ? CHECKIN_NEEDS.filter((item) => ["quiet", "help", "water", "alone"].includes(item.id))
      : CHECKIN_NEEDS;
    needs.forEach((need) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "need-option";
      button.setAttribute("aria-label", need.label);
      button.innerHTML = `<span class="symbol" aria-hidden="true">${need.symbol}</span><span>${need.label}</span>`;
      button.addEventListener("click", () => {
        if (preferences.narration) speak(need.label, true);
        renderCheckinResult(feeling, need);
      });
      options.appendChild(button);
    });

    const skip = document.createElement("button");
    skip.type = "button";
    skip.className = "quiet-button";
    skip.textContent = "Con chưa muốn chọn";
    skip.addEventListener("click", () => renderCheckinResult(feeling, null));
    wrap.append(question, options, skip);
    els.gameArea.replaceChildren(wrap);
  }

  function renderCheckinResult(feeling, need) {
    const wrap = document.createElement("div");
    wrap.className = "checkin-wrap";
    const question = document.createElement("div");
    question.className = "checkin-question";
    question.innerHTML = `<h2>Đã ghi nhận lựa chọn.</h2><p>Con chọn “${escapeHtml(feeling.label)}”.${need ? ` Con muốn “${escapeHtml(need.label)}”.` : ""}</p>`;
    const note = document.createElement("div");
    note.className = "checkin-note";
    note.innerHTML = `<strong>Con chọn bước tiếp theo.</strong><br>Con có thể nghỉ, về trang đầu hoặc chọn một trò chơi khác. Lựa chọn này biến mất khi rời màn hình.`;
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


  async function requestEndActivity() {
    if (!session) {
      showScreen("home");
      return;
    }
    const confirmed = await openAppDialog({
      kind: "warning",
      eyebrow: "Kết thúc buổi chơi",
      title: "Con muốn xong bây giờ?",
      message: "Phần đang chơi sẽ dừng. Những buổi đã hoàn thành trước đó vẫn được giữ.",
      confirmLabel: "Xong buổi chơi",
      cancelLabel: "Chơi tiếp",
      confirmStyle: "primary",
      icon: "stop"
    });
    if (confirmed) endActivityEarly();
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
    const completedParts = sum(sessions.map((item) => Math.max(0, (item.totalRounds || (preferences.preschoolMode ? 2 : 3)) - (item.skippedRounds || 0))));
    const averageMinutes = sessions.length
      ? Math.max(1, Math.round(sum(sessions.map((item) => item.durationSeconds || 0)) / sessions.length / 60))
      : null;
    const totalSupports = sum(sessions.map((item) => item.supports
      ? (item.supports.hint || 0) + (item.supports.preview || 0) + (item.supports.easier || 0)
      : (item.hints || 0) + (item.manualEaseCount || 0)));

    els.metricGrid.innerHTML = `
      <article class="metric-card"><strong>${totalSessions}</strong><span>buổi chơi đã lưu trên thiết bị</span></article>
      <article class="metric-card"><strong>${completedParts}</strong><span>phần hoạt động đã hoàn thành</span></article>
      <article class="metric-card"><strong>${averageMinutes === null ? "—" : `${averageMinutes} phút`}</strong><span>thời lượng trung bình mỗi buổi</span></article>
      <article class="metric-card"><strong>${totalSupports}</strong><span>lần dùng xem mẫu / chỉ giúp / dễ hơn</span></article>
    `;

    const labels = {
      match: ["Ghép hình", "Ghép hai hình giống nhau"],
      focus: ["Tìm giống nhau", "Quét tìm trực quan"],
      sequence: ["Đi theo thứ tự", "Trình tự"],
      pattern: ["Mảnh còn thiếu", "Quy luật trực quan"],
      classify: ["Về đúng nhà", "Phân nhóm"],
      daily: ["Việc tiếp theo", "Trình tự sinh hoạt"]
    };

    els.skillProgressList.innerHTML = Object.entries(progress.activities).map(([key, activity]) => {
      const [title, dimension] = labels[key] || [key, "Hoạt động"];
      const recent = [...sessions].reverse().find((item) => item.activity === key);
      const supportCount = recent?.supports
        ? (recent.supports.hint || 0) + (recent.supports.preview || 0) + (recent.supports.easier || 0)
        : 0;
      const recentText = recent
        ? `Buổi gần nhất: ${Math.max(1, Math.round((recent.durationSeconds || 0) / 60))} phút • ${supportCount} lần dùng hỗ trợ.`
        : "Chưa có buổi chơi.";
      return `
        <div class="skill-progress-item">
          <div><strong>${title}</strong><p>${dimension}. Đã chơi ${activity.sessions || 0} buổi. ${recentText}</p></div>
          <span class="support-badge">${difficultyLabel(activity.difficulty)}</span>
        </div>
      `;
    }).join("");

    const activityNames = Object.fromEntries(Object.entries(ACTIVITY_META).map(([key, value]) => [key, value.title]));
    const latest = [...sessions].slice(-5).reverse();
    els.recentList.innerHTML = latest.length ? latest.map((item) => {
      const date = new Date(item.startedAt);
      const supports = item.supports
        ? (item.supports.hint || 0) + (item.supports.preview || 0) + (item.supports.easier || 0)
        : (item.hints || 0) + (item.manualEaseCount || 0);
      return `
        <div class="recent-item">
          <div><strong>${escapeHtml(activityNames[item.activity] || item.activity)}</strong><p>${Math.max(1, Math.round((item.durationSeconds || 0) / 60))} phút • ${supports} lần dùng hỗ trợ${item.skippedRounds ? ` • ${item.skippedRounds} phần kết thúc sớm` : ""}</p></div>
          <time datetime="${escapeHtml(item.startedAt)}">${formatDate(date)}</time>
        </div>
      `;
    }).join("") : `<div class="recent-item"><div><strong>Chưa có buổi chơi</strong><p>Khi trẻ hoàn thành một hoạt động, thông tin tóm tắt sẽ xuất hiện ở đây.</p></div></div>`;
  }

  function updateHome() {
    const total = progress.sessions.length;
    const stage = total === 0 ? 0 : total < 2 ? 1 : total < 4 ? 2 : 3;
    const labels = ["Mới bắt đầu", "Đã nảy mầm", "Đang xanh lên", "Đang nở hoa"];
    const messages = [
      "Khu vườn ở đây để tạo cảm giác quen thuộc.",
      "Một mầm nhỏ đã xuất hiện.",
      "Khu vườn đang xanh thêm một chút.",
      "Khu vườn đã có ba cây nhỏ."
    ];

    document.getElementById("gardenLevelLabel").textContent = labels[stage];
    document.getElementById("gardenMessage").textContent = messages[stage];
    document.querySelectorAll(".garden-plant").forEach((plant, index) => plant.classList.toggle("is-grown", index < stage));

    const dots = document.getElementById("gardenDots");
    dots.innerHTML = "";
    for (let index = 0; index < 4; index += 1) {
      const dot = document.createElement("span");
      if (index <= stage) dot.classList.add("is-filled");
      dots.appendChild(dot);
    }

    const familiar = getFamiliarActivity();
    if (els.quickStartBtn) els.quickStartBtn.dataset.activity = familiar;
    if (els.quickStartLabel) els.quickStartLabel.textContent = total ? ACTIVITY_META[familiar].title : "Việc tiếp theo";
    renderContentPacks();
  }

  function getFamiliarActivity() {
    const allowed = preferences.showAdvancedActivities
      ? ["daily", "match", "focus", "classify", "sequence", "pattern"]
      : ["daily", "match", "focus"];

    const recent = [...progress.sessions]
      .reverse()
      .find((item) => allowed.includes(item.activity) && !item.customPack);
    if (recent) return recent.activity;

    const practiced = allowed
      .map((type) => ({ type, sessions: progress.activities[type]?.sessions || 0 }))
      .filter((item) => item.sessions > 0)
      .sort((a, b) => b.sessions - a.sessions);
    return practiced[0]?.type || "daily";
  }


  function difficultyLabel(level) {
    return ["Nhịp rất nhẹ", "Nhịp nhẹ", "Nhịp vừa", "Thêm thử thách"][clamp(level, 0, 3)];
  }

  function roundName(round) {
    if (preferences.preschoolMode) return ["Cùng chơi", "Chơi thêm", "Xong rồi"][round - 1] || `Phần ${round}`;
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
      preschoolMode: document.getElementById("preschoolModeSetting").checked,
      supportLevel: document.getElementById("supportLevelSetting").value,
      stableDifficulty: document.getElementById("stableDifficultySetting").checked,
      errorlessSupport: document.getElementById("errorlessSupportSetting").checked,
      showAdvancedActivities: document.getElementById("showAdvancedActivitiesSetting").checked,
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
    document.getElementById("preschoolModeSetting").checked = Boolean(preferences.preschoolMode);
    document.getElementById("supportLevelSetting").value = preferences.supportLevel || "high";
    document.getElementById("stableDifficultySetting").checked = preferences.stableDifficulty !== false;
    document.getElementById("errorlessSupportSetting").checked = preferences.errorlessSupport !== false;
    document.getElementById("showAdvancedActivitiesSetting").checked = Boolean(preferences.showAdvancedActivities);
    document.getElementById("labelsSetting").checked = preferences.labels;
    document.getElementById("paceSetting").value = preferences.pace;
    document.getElementById("autoHintSetting").checked = preferences.autoHint;
    document.getElementById("breakSetting").value = String(preferences.breakMinutes);
    document.getElementById("switchScanningSetting").checked = Boolean(preferences.switchScanning);
    document.getElementById("scanSpeedSetting").value = String(preferences.scanSpeed ?? 1800);
  }

  function applyPreset(name) {
    if (name === "calm") {
      preferences = { ...preferences, visualMode: "calm", highContrast: false, reduceMotion: true, sound: false, narration: true, textSize: "1.15", largeTargets: true, preschoolMode: true, labels: false, pace: "gentle" };
    } else if (name === "balanced") {
      preferences = { ...preferences, visualMode: "bright", highContrast: false, reduceMotion: false, sound: false, narration: true, textSize: "1", largeTargets: true, preschoolMode: false, labels: true, pace: "steady" };
    } else if (name === "focus") {
      preferences = { ...preferences, visualMode: "calm", highContrast: true, reduceMotion: true, sound: false, narration: true, textSize: "1.15", largeTargets: true, preschoolMode: false, labels: true, pace: "gentle" };
    } else if (name === "preschool") {
      preferences = { ...preferences, visualMode: "calm", highContrast: false, reduceMotion: true, sound: false, narration: true, textSize: "1.15", largeTargets: true, preschoolMode: true, supportLevel: "high", stableDifficulty: true, errorlessSupport: true, showAdvancedActivities: false, labels: false, pace: "gentle", breakMinutes: 4 };
    }
    syncSettingsForm();
    applyPreferences();
    showToast("Đang xem trước bộ cài đặt. Bấm “Lưu cách chơi” để giữ lại.", "info");
  }

  function applyPreferences() {
    const html = document.documentElement;
    html.dataset.theme = preferences.visualMode;
    html.dataset.contrast = preferences.highContrast ? "high" : "normal";
    html.dataset.motion = preferences.reduceMotion ? "reduced" : "full";
    html.dataset.targets = preferences.largeTargets ? "large" : "standard";
    html.dataset.audience = preferences.preschoolMode ? "preschool" : "general";
    html.dataset.support = preferences.supportLevel || "high";
    html.dataset.advanced = preferences.showAdvancedActivities ? "show" : "hide";
    html.style.setProperty("--font-scale", preferences.textSize);

    if (els.visualModeChip) els.visualModeChip.innerHTML = `${iconMarkup("eye", "ui-icon status-chip-icon")} ${preferences.visualMode === "calm" ? "Dịu" : "Tươi"}`;
    if (els.soundChip) els.soundChip.innerHTML = `${iconMarkup("volume", "ui-icon status-chip-icon")} ${preferences.sound ? "Âm bật" : "Âm tắt"}`;
    if (els.motionChip) els.motionChip.innerHTML = `${iconMarkup("pause", "ui-icon status-chip-icon")} ${preferences.reduceMotion ? "Ít chuyển động" : "Chuyển động nhẹ"}`;
    syncAdultAccessUI();
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
    updatePictureRoutine("rest");
    els.pauseModal.hidden = false;
    scheduleScanRefresh();
    document.getElementById("pauseTitle").textContent = fromReminder
      ? (preferences.preschoolMode ? "Đến giờ nghỉ một chút." : "Bạn đã chơi một lúc. Muốn nghỉ không?")
      : (preferences.preschoolMode ? "Con nghỉ một chút nhé." : "Bạn có thể dừng một chút.");
    document.getElementById("resumeBtn").focus();
  }

  function closePause() {
    els.pauseModal.hidden = true;
    if (session?.phase === "playing") updatePictureRoutine("play");
    else if (session?.phase === "intro") updatePictureRoutine("listen");
    else if (session?.phase === "break") updatePictureRoutine("rest");
    scheduleScanRefresh();
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") lastFocusedBeforeModal.focus();
  }

  function speak(text, force = false) {
    if (!force && !preferences.narration) return;
    if (!("speechSynthesis" in window)) {
      showToast("Thiết bị này không hỗ trợ đọc văn bản.", "warning");
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

  function showAnswerFeedback(kind, title, detail = "") {
    if (!els.answerFeedback) return;

    if (answerFeedbackTimer) window.clearTimeout(answerFeedbackTimer);
    if (answerFeedbackHideTimer) window.clearTimeout(answerFeedbackHideTimer);

    const isCorrect = kind === "correct";
    els.answerFeedback.classList.remove("is-correct", "is-retry", "is-visible");
    els.answerFeedback.classList.add(isCorrect ? "is-correct" : "is-retry");
    els.answerFeedbackTitle.textContent = title;
    els.answerFeedbackDetail.textContent = detail;
    els.answerFeedbackDetail.hidden = !detail;
    els.answerFeedbackIconUse?.setAttribute("href", isCorrect ? "#ui-check" : "#ui-repeat");
    els.answerFeedback.hidden = false;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => els.answerFeedback.classList.add("is-visible"));
    });

    answerFeedbackTimer = window.setTimeout(() => {
      els.answerFeedback.classList.remove("is-visible");
      answerFeedbackHideTimer = window.setTimeout(() => {
        if (els.answerFeedback) els.answerFeedback.hidden = true;
      }, preferences.reduceMotion ? 0 : 180);
    }, isCorrect ? 1150 : 1300);
  }

  function hideAnswerFeedback() {
    if (answerFeedbackTimer) window.clearTimeout(answerFeedbackTimer);
    if (answerFeedbackHideTimer) window.clearTimeout(answerFeedbackHideTimer);
    answerFeedbackTimer = null;
    answerFeedbackHideTimer = null;
    if (!els.answerFeedback) return;
    els.answerFeedback.classList.remove("is-visible");
    els.answerFeedback.hidden = true;
  }

  function announce(message) {
    els.supportText.textContent = message;
    if (preferences.narration) speak(message);
  }

  function showToast(message, kind = "info") {
    if (!els.toast) return;
    const safeKind = ["info", "success", "warning", "error"].includes(kind) ? kind : "info";
    const iconMap = { info: "info", success: "check", warning: "warning", error: "warning" };
    els.toast.className = `toast toast--${safeKind}`;
    els.toastMessage.textContent = message;
    els.toastIconUse.setAttribute("href", `#ui-${iconMap[safeKind]}`);
    requestAnimationFrame(() => els.toast.classList.add("is-visible"));
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => els.toast.classList.remove("is-visible"), safeKind === "error" ? 4200 : 3000);
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



  function startPackEdit(packId) {
    const pack = contentPacks.find((item) => item.id === packId);
    if (!pack) {
      showToast("Không tìm thấy gói cần sửa.", "error");
      return;
    }

    editingPackId = pack.id;
    document.getElementById("packTitleInput").value = pack.title;
    document.getElementById("packTypeInput").value = pack.type;
    els.packSourceInput.value = pack.mediaType === "photo" ? "photo" : "symbol";

    if (pack.mediaType === "photo") {
      pendingPhotoItems = pack.items.map((item) => ({ ...item }));
      document.getElementById("packItemsInput").value = "";
    } else {
      pendingPhotoItems = [];
      document.getElementById("packItemsInput").value = pack.items
        .map((item) => `${item.symbol} | ${item.label}`)
        .join("\n");
    }

    pendingVoiceData = pack.voiceData || null;
    els.voiceRecordStatus.textContent = pendingVoiceData
      ? "Gói này đã có bản thu cục bộ. Bạn có thể nghe thử, thay hoặc xóa."
      : "Chưa có bản thu.";
    document.getElementById("playVoiceRecordBtn").hidden = !pendingVoiceData;
    document.getElementById("clearVoiceRecordBtn").hidden = !pendingVoiceData;

    updatePackSourceUI();
    renderPhotoPreviews();

    els.packEditBanner.hidden = false;
    els.cancelPackEditBtn.hidden = false;
    els.packSaveBtn.querySelector("span").textContent = "Lưu thay đổi";
    document.getElementById("packBuilderTitle").textContent = `Sửa: ${pack.title}`;

    document.querySelector(".pack-builder")?.scrollIntoView({ behavior: preferences.reduceMotion ? "auto" : "smooth", block: "start" });
    document.getElementById("packTitleInput").focus({ preventScroll: true });
  }

  function finishPackEditUI() {
    editingPackId = null;
    if (els.packEditBanner) els.packEditBanner.hidden = true;
    if (els.cancelPackEditBtn) els.cancelPackEditBtn.hidden = true;
    if (els.packSaveBtn) els.packSaveBtn.querySelector("span").textContent = "Lưu gói trên thiết bị";
    const heading = document.getElementById("packBuilderTitle");
    if (heading) heading.textContent = "Một gói, một chủ đề quen thuộc";
  }

  function cancelPackEdit() {
    const form = document.getElementById("packForm");
    form?.reset();
    resetPackBuilderMedia();
    finishPackEditUI();
    showToast("Đã hủy chỉnh sửa.", "info");
  }

  function updatePackSourceUI() {
    if (!els.packSourceInput || !els.symbolPackField || !els.photoPackField) return;
    const photoMode = els.packSourceInput.value === "photo";
    els.symbolPackField.hidden = photoMode;
    els.photoPackField.hidden = !photoMode;
  }

  async function handlePhotoSelection(event) {
    const files = [...(event.target.files || [])].filter((file) => file.type.startsWith("image/")).slice(0, 8);
    event.target.value = "";
    if (!files.length) return;
    showToast("Đang chuẩn bị ảnh trên thiết bị…");

    const next = [];
    for (const file of files) {
      try {
        const image = await compressImageFile(file);
        const baseName = file.name.replace(/\.[^.]+$/, "").trim().slice(0, 36) || `Ảnh ${next.length + 1}`;
        next.push({
          id: `photo-${Date.now().toString(36)}-${next.length}`,
          symbol: "▧",
          label: baseName,
          image
        });
      } catch {
        // Skip unreadable images while keeping valid selections.
      }
    }

    pendingPhotoItems = [...pendingPhotoItems, ...next].slice(0, 8);
    renderPhotoPreviews();
    showToast(next.length ? `Đã thêm ${next.length} ảnh. Ảnh chỉ ở trên thiết bị này.` : "Không đọc được ảnh đã chọn.");
  }

  function renderPhotoPreviews() {
    if (!els.packPhotoPreview) return;
    els.packPhotoPreview.innerHTML = pendingPhotoItems.length ? pendingPhotoItems.map((item, index) => `
      <label class="photo-pack-item">
        <img src="${escapeHtml(item.image)}" alt="Ảnh ${index + 1}">
        <span>Tên để đọc</span>
        <input type="text" maxlength="36" value="${escapeHtml(item.label)}" data-photo-label="${index}" aria-label="Tên cho ảnh ${index + 1}">
        <button type="button" class="photo-remove-button" data-remove-photo="${index}" aria-label="Xóa ảnh ${index + 1}">×</button>
      </label>
    `).join("") : `<div class="photo-empty-state"><span aria-hidden="true">🖼️</span><p>Chưa chọn ảnh. Nên dùng ảnh rõ, một vật chính và nền đơn giản.</p></div>`;

    els.packPhotoPreview.querySelectorAll("[data-remove-photo]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        pendingPhotoItems.splice(Number(button.dataset.removePhoto), 1);
        renderPhotoPreviews();
      });
    });
    const clear = document.getElementById("clearPackPhotosBtn");
    if (clear) clear.hidden = pendingPhotoItems.length === 0;
  }

  async function compressImageFile(file) {
    if (!file.type.startsWith("image/")) throw new Error("not image");
    if (file.size > 10 * 1024 * 1024) throw new Error("too large");

    const objectUrl = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.decoding = "async";
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = objectUrl;
      });

      const maxSide = 420;
      const scale = Math.min(1, maxSide / Math.max(image.naturalWidth || 1, image.naturalHeight || 1));
      const width = Math.max(1, Math.round(image.naturalWidth * scale));
      const height = Math.max(1, Math.round(image.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { alpha: false });
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.76));
      if (!blob) throw new Error("encode failed");
      const data = await blobToDataURL(blob);
      if (data.length > 500000) throw new Error("encoded image too large");
      return data;
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("file read failed"));
      reader.readAsDataURL(blob);
    });
  }

  async function startVoiceRecording() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      showToast("Trình duyệt này không hỗ trợ thu giọng trực tiếp.", "warning");
      return;
    }
    if (mediaRecorder?.state === "recording") return;

    try {
      recordingStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const preferred = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus"];
      const mimeType = preferred.find((type) => MediaRecorder.isTypeSupported?.(type));
      mediaRecorder = mimeType ? new MediaRecorder(recordingStream, { mimeType }) : new MediaRecorder(recordingStream);
      voiceChunks = [];
      mediaRecorder.addEventListener("dataavailable", (event) => { if (event.data?.size) voiceChunks.push(event.data); });
      mediaRecorder.addEventListener("stop", finalizeVoiceRecording, { once: true });
      mediaRecorder.start();
      document.getElementById("startVoiceRecordBtn").disabled = true;
      document.getElementById("stopVoiceRecordBtn").disabled = false;
      els.voiceRecordStatus.textContent = "Đang thu… nói một câu ngắn. Tự dừng sau 8 giây.";
      voiceStopTimer = window.setTimeout(stopVoiceRecording, 8000);
    } catch {
      stopRecordingTracks();
      showToast("Không mở được microphone. Bạn có thể tiếp tục mà không cần bản thu.", "warning");
    }
  }

  function stopVoiceRecording() {
    if (voiceStopTimer) window.clearTimeout(voiceStopTimer);
    voiceStopTimer = null;
    if (mediaRecorder?.state === "recording") mediaRecorder.stop();
    else stopRecordingTracks();
  }

  async function finalizeVoiceRecording() {
    document.getElementById("startVoiceRecordBtn").disabled = false;
    document.getElementById("stopVoiceRecordBtn").disabled = true;
    try {
      const type = mediaRecorder?.mimeType || voiceChunks[0]?.type || "audio/webm";
      const blob = new Blob(voiceChunks, { type });
      const data = await blobToDataURL(blob);
      if (!blob.size || data.length > 700000) throw new Error("audio too large");
      pendingVoiceData = data;
      els.voiceRecordStatus.textContent = "Đã có bản thu cục bộ. Bạn có thể nghe thử hoặc xóa.";
      document.getElementById("playVoiceRecordBtn").hidden = false;
      document.getElementById("clearVoiceRecordBtn").hidden = false;
    } catch {
      pendingVoiceData = null;
      els.voiceRecordStatus.textContent = "Bản thu quá lớn hoặc không đọc được. Hãy thử một câu ngắn hơn.";
    } finally {
      stopRecordingTracks();
      voiceChunks = [];
      mediaRecorder = null;
    }
  }

  function stopRecordingTracks() {
    recordingStream?.getTracks?.().forEach((track) => track.stop());
    recordingStream = null;
  }

  function clearPendingVoice() {
    if (currentVoiceAudio) {
      currentVoiceAudio.pause();
      currentVoiceAudio = null;
    }
    pendingVoiceData = null;
    els.voiceRecordStatus.textContent = "Chưa có bản thu.";
    document.getElementById("playVoiceRecordBtn").hidden = true;
    document.getElementById("clearVoiceRecordBtn").hidden = true;
  }

  function playVoiceData(data) {
    const safe = sanitizeAudioData(data);
    if (!safe) return;
    try {
      window.speechSynthesis?.cancel?.();
      if (currentVoiceAudio) currentVoiceAudio.pause();
      currentVoiceAudio = new Audio(safe);
      currentVoiceAudio.volume = 0.92;
      currentVoiceAudio.play().catch(() => {});
    } catch {}
  }

  function resetPackBuilderMedia() {
    pendingPhotoItems = [];
    if (els.packPhotoInput) els.packPhotoInput.value = "";
    clearPendingVoice();
    if (els.packSourceInput) els.packSourceInput.value = "symbol";
    updatePackSourceUI();
    renderPhotoPreviews();
  }

  function sanitizeImageData(value) {
    const text = String(value || "");
    if (!/^data:image\/(?:jpeg|png|webp);base64,/i.test(text)) return "";
    return text.length <= 500000 ? text : "";
  }

  function sanitizeAudioData(value) {
    const text = String(value || "");
    if (!/^data:audio\/(?:webm|ogg|mp4|wav|mpeg|x-wav)[^,]*;base64,/i.test(text)) return "";
    return text.length <= 700000 ? text : "";
  }

  function normalizePacks(value) {
    if (!Array.isArray(value)) return [];
    return value.map((pack) => {
      if (!pack || typeof pack !== "object") return null;
      const type = pack.type === "focus" ? "focus" : pack.type === "match" ? "match" : null;
      const title = String(pack.title || "").trim().slice(0, 48);
      const items = Array.isArray(pack.items) ? pack.items.map((item, index) => {
        const image = sanitizeImageData(item?.image);
        const symbol = String(item?.symbol || "").slice(0, 8);
        const label = String(item?.label || `Mục ${index + 1}`).trim().slice(0, 36) || `Mục ${index + 1}`;
        if (!image && !symbol) return null;
        return { id: String(item?.id || `item-${index}`), symbol: symbol || "▧", label, ...(image ? { image } : {}) };
      }).filter(Boolean).slice(0, 12) : [];
      if (!type || !title || items.length < 4) return null;
      const voiceData = sanitizeAudioData(pack.voiceData);
      const mediaType = items.some((item) => item.image) ? "photo" : "symbol";
      return {
        id: String(pack.id || `pack-${Math.random().toString(36).slice(2, 9)}`),
        title,
        type,
        mediaType,
        voiceData: voiceData || null,
        items
      };
    }).filter(Boolean).slice(0, 30);
  }

  function savePacks() {
    try {
      localStorage.setItem(STORAGE_KEYS.packs, JSON.stringify(contentPacks));
      return true;
    } catch {
      showToast("Bộ nhớ cục bộ đã gần đầy. Hãy xóa bớt gói ảnh hoặc dùng ít ảnh hơn.", "error");
      return false;
    }
  }

  function packItemPreview(item) {
    if (item.image) return `<img class="pack-thumb" src="${escapeHtml(item.image)}" alt="">`;
    return `<span class="pack-symbol">${escapeHtml(item.symbol)}</span>`;
  }

  function renderContentPacks() {
    if (!els.customPacksList || !els.packLibraryList) return;
    els.customPacksSection.hidden = contentPacks.length === 0;
    const cards = contentPacks.map((pack) => `
      <article class="custom-pack-card">
        <span class="pack-symbols" aria-hidden="true">${pack.items.slice(0, 3).map(packItemPreview).join("")}</span>
        <div><small>${pack.type === "match" ? "Ghép đôi" : "Tìm mục tiêu"}${pack.mediaType === "photo" ? " • ảnh thật" : ""}${pack.voiceData ? " • có giọng thu" : ""}</small><strong>${escapeHtml(pack.title)}</strong><span>${pack.items.length} mục • lưu cục bộ</span></div>
        <button class="secondary-button" type="button" data-custom-pack="${escapeHtml(pack.id)}" data-pack-type="${pack.type}">Chơi</button>
      </article>`).join("");
    els.customPacksList.innerHTML = cards;
    els.packLibraryList.innerHTML = contentPacks.length ? contentPacks.map((pack) => `
      <article class="pack-library-item">
        <div><span class="pack-symbols" aria-hidden="true">${pack.items.slice(0, 4).map(packItemPreview).join("")}</span><strong>${escapeHtml(pack.title)}</strong><small>${pack.type === "match" ? "Ghép đôi" : "Tìm mục tiêu"} • ${pack.items.length} mục${pack.mediaType === "photo" ? " • ảnh thật" : ""}${pack.voiceData ? " • 🎙 giọng thu" : ""}</small></div>
        <div class="pack-item-actions"><button class="secondary-button" type="button" data-custom-pack="${escapeHtml(pack.id)}" data-pack-type="${pack.type}">Chơi thử</button><button class="secondary-button support-icon-button" type="button" data-edit-pack="${escapeHtml(pack.id)}">${iconMarkup("edit", "ui-icon ui-icon--button")}<span>Sửa</span></button><button class="danger-button" type="button" data-delete-pack="${escapeHtml(pack.id)}">Xóa</button></div>
      </article>`).join("") : `<div class="empty-pack-state"><span aria-hidden="true">▦</span><strong>Chưa có gói nào</strong><p>Tạo gói đầu tiên ở phía trên. Một gói cần ít nhất 4 mục.</p></div>`;
  }

  function exportPacks() {
    downloadJson({ schema: "votw-content-packs", version: 2, exportedAt: new Date().toISOString(), privacyNotice: "Tệp này có thể chứa ảnh và bản thu cục bộ do người lớn thêm.", packs: contentPacks }, `goc-nhin-content-packs-${new Date().toISOString().slice(0, 10)}.json`);
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
      savePacks(); renderContentPacks(); updateHome(); showToast(`Đã nhập ${incoming.length} gói nội dung.`, "success");
    } catch { showToast("Không thể đọc tệp gói nội dung này.", "error"); }
  }

  function openCommunicationBoard() {
    lastFocusedBeforeModal = document.activeElement;
    if (els.communicationMoreGrid) els.communicationMoreGrid.hidden = true;
    if (els.communicationMoreBtn) {
      els.communicationMoreBtn.setAttribute("aria-expanded", "false");
      els.communicationMoreBtn.textContent = "Thêm lựa chọn";
    }
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
    const button = els.communicationModal.querySelector(`[data-comm="${choice}"]`);
    const voice = button?.dataset.voice || button?.textContent?.trim() || "";
    if (voice) speak(voice, true);
    closeCommunicationBoard();

    // AAC remains useful even when no game is running. Game actions are only
    // added while the play screen is actually active; communication never depends on a session.
    const gameIsActive = Boolean(session) && document.getElementById("playScreen").classList.contains("is-active");
    if (!gameIsActive) return;
    if (choice === "pause") openPause(false);
    else if (choice === "help") { if (session.current) requestHint(); }
    else if (choice === "quiet") { preferences.sound = false; applyPreferences(); }
    else if (choice === "explain") { speak(els.gameInstruction.textContent, true); }
    else if (choice === "finish") endActivityEarly();
  }

  function scheduleScanRefresh() {
    if (scanRefreshTimer) window.clearTimeout(scanRefreshTimer);
    scanRefreshTimer = window.setTimeout(refreshSwitchScan, 60);
  }

  function refreshSwitchScan() {
    stopSwitchScan(false);
    const playActive = document.getElementById("playScreen").classList.contains("is-active");
    const communicationOpen = !els.communicationModal.hidden;
    const appDialogOpen = els.appDialog && !els.appDialog.hidden;
    if (!preferences.switchScanning || (!playActive && !communicationOpen && !appDialogOpen)) return;
    const container = appDialogOpen
      ? els.appDialog
      : (communicationOpen
          ? els.communicationModal
          : (!els.pauseModal.hidden ? els.pauseModal : document.getElementById("playScreen")));
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
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1200);
  }


  function exportFullBackup() {
    const payload = {
      schema: "votw-full-backup",
      schemaVersion: 3.1,
      exportedAt: new Date().toISOString(),
      app: "Góc nhìn quanh em",
      privacyNotice: "Tệp này có thể chứa tiến trình, cài đặt, ảnh và bản thu cục bộ do người lớn thêm.",
      preferences,
      progress,
      contentPacks
    };
    downloadJson(payload, `goc-nhin-quanh-em-backup-${new Date().toISOString().slice(0, 10)}.json`);
    showToast("Đã tạo tệp sao lưu toàn bộ.", "success");
  }

  async function restoreFullBackup(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      if (file.size > 12 * 1024 * 1024) throw new Error("backup too large");
      const parsed = JSON.parse(await file.text());
      if (!parsed || parsed.schema !== "votw-full-backup") throw new Error("wrong schema");

      const nextPreferences = normalizePreferences(parsed.preferences || {});
      const nextProgress = normalizeProgress(parsed.progress || {});
      const nextPacks = normalizePacks(parsed.contentPacks || parsed.packs || []);

      const confirmed = await openAppDialog({
        kind: "warning",
        eyebrow: "Khôi phục dữ liệu",
        title: "Thay dữ liệu hiện tại bằng bản sao lưu?",
        message: "Cài đặt, tiến trình và thư viện nội dung hiện tại sẽ được thay bằng dữ liệu trong tệp.",
        detail: `${nextProgress.sessions.length} buổi chơi • ${nextPacks.length} gói nội dung. Hãy chắc rằng đây là đúng tệp bạn muốn khôi phục.`,
        confirmLabel: "Khôi phục",
        cancelLabel: "Hủy"
      });
      if (!confirmed) return;

      const previousPreferences = preferences;
      const previousProgress = progress;
      const previousPacks = contentPacks;

      try {
        localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(nextPreferences));
        localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(nextProgress));
        localStorage.setItem(STORAGE_KEYS.packs, JSON.stringify(nextPacks));
        preferences = nextPreferences;
        progress = nextProgress;
        contentPacks = nextPacks;
      } catch (storageError) {
        preferences = previousPreferences;
        progress = previousProgress;
        contentPacks = previousPacks;
        throw storageError;
      }

      cancelPackEditSilently();
      applyPreferences();
      syncSettingsForm();
      renderProgress();
      renderContentPacks();
      updateHome();
      showToast("Đã khôi phục bản sao lưu.", "success");
    } catch (error) {
      showToast("Không thể khôi phục tệp này. Hãy kiểm tra đúng tệp sao lưu của ứng dụng.", "error");
    }
  }

  function cancelPackEditSilently() {
    editingPackId = null;
    pendingPhotoItems = [];
    pendingVoiceData = null;
    document.getElementById("packForm")?.reset();
    if (els.packPhotoInput) els.packPhotoInput.value = "";
    if (els.packSourceInput) els.packSourceInput.value = "symbol";
    if (els.voiceRecordStatus) els.voiceRecordStatus.textContent = "Chưa có bản thu.";
    document.getElementById("playVoiceRecordBtn").hidden = true;
    document.getElementById("clearVoiceRecordBtn").hidden = true;
    updatePackSourceUI();
    renderPhotoPreviews();
    finishPackEditUI();
  }

  function exportData() {
    const payload = {
      exportedAt: new Date().toISOString(),
      app: "Góc nhìn quanh em",
      schemaVersion: 2.9,
      note: "Dữ liệu mô tả hoạt động, thời lượng và hỗ trợ đã dùng; không phải đánh giá lâm sàng hoặc điểm năng lực.",
      preferences,
      progress
    };
    downloadJson(payload, `goc-nhin-quanh-em-progress-${new Date().toISOString().slice(0, 10)}.json`);
    showToast("Đã tạo tệp tiến trình.", "success");
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


  function normalizePreferences(value) {
    const raw = value && typeof value === "object" ? value : {};
    return {
      visualMode: ["calm", "bright"].includes(raw.visualMode) ? raw.visualMode : DEFAULT_PREFERENCES.visualMode,
      highContrast: Boolean(raw.highContrast),
      reduceMotion: raw.reduceMotion !== false,
      sound: Boolean(raw.sound),
      narration: raw.narration !== false,
      textSize: ["1", "1.15", "1.3"].includes(String(raw.textSize)) ? String(raw.textSize) : DEFAULT_PREFERENCES.textSize,
      largeTargets: raw.largeTargets !== false,
      labels: Boolean(raw.labels),
      preschoolMode: raw.preschoolMode !== false,
      supportLevel: ["high", "medium", "low"].includes(raw.supportLevel) ? raw.supportLevel : "high",
      stableDifficulty: raw.stableDifficulty !== false,
      errorlessSupport: raw.errorlessSupport !== false,
      showAdvancedActivities: Boolean(raw.showAdvancedActivities),
      pace: ["gentle", "steady"].includes(raw.pace) ? raw.pace : "gentle",
      autoHint: raw.autoHint !== false,
      breakMinutes: [0, 3, 4, 5, 8].includes(Number(raw.breakMinutes)) ? Number(raw.breakMinutes) : DEFAULT_PREFERENCES.breakMinutes,
      switchScanning: Boolean(raw.switchScanning),
      scanSpeed: [0, 1200, 1800, 2500].includes(Number(raw.scanSpeed)) ? Number(raw.scanSpeed) : DEFAULT_PREFERENCES.scanSpeed
    };
  }

  function normalizeProgress(value) {
    const base = structuredCloneSafe(DEFAULT_PROGRESS);
    return {
      ...base,
      ...value,
      version: 2.9,
      sessions: Array.isArray(value?.sessions)
        ? value.sessions.slice(-500).map((item) => ({
            ...item,
            activity: String(item?.activity || "").slice(0, 24),
            startedAt: String(item?.startedAt || ""),
            durationSeconds: clamp(Number(item?.durationSeconds || 0), 0, 6 * 60 * 60),
            skippedRounds: clamp(Number(item?.skippedRounds || 0), 0, 20),
            totalRounds: clamp(Number(item?.totalRounds || 0), 0, 20)
          }))
        : [],
      activities: {
        match: { ...base.activities.match, ...(value?.activities?.match || {}) },
        focus: { ...base.activities.focus, ...(value?.activities?.focus || {}) },
        sequence: { ...base.activities.sequence, ...(value?.activities?.sequence || {}) },
        pattern: { ...base.activities.pattern, ...(value?.activities?.pattern || {}) },
        classify: { ...base.activities.classify, ...(value?.activities?.classify || {}) },
        daily: { ...base.activities.daily, ...(value?.activities?.daily || {}) }
      }
    };
  }

  function saveJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { showToast("Trình duyệt không cho phép lưu cục bộ.", "error"); }
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
