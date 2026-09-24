<?php
declare(strict_types=1);
if (PHP_VERSION_ID < 80100) {
    http_response_code(503);
    header('Content-Type: text/html; charset=UTF-8');
    echo '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">';
    echo '<title>PHP 8.1 required</title><main style="font:16px/1.55 system-ui;max-width:720px;margin:48px auto;padding:24px">';
    echo '<h1>PHP 8.1+ is required</h1><p>Select PHP 8.1 or newer, then reload.</p>';
    echo '<p>Detected: <strong>' . htmlspecialchars(PHP_VERSION, ENT_QUOTES, 'UTF-8') . '</strong></p></main>';
    exit;
}
header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');
header('Cross-Origin-Resource-Policy: same-origin');
header(
    "Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; " .
    "img-src 'self' data: blob:; media-src 'self' data: blob:; connect-src 'self'; " .
    "worker-src 'self' blob:; manifest-src 'self'; object-src 'none'; base-uri 'self'; " .
    "form-action 'self'; frame-ancestors 'none'"
);
header('Cache-Control: no-cache, max-age=0, must-revalidate');
?>
<!doctype html>
<html lang="vi" data-theme="calm" data-contrast="normal" data-motion="reduced" data-targets="large">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#eaf4ef">
  <meta name="description" content="Góc nhìn quanh em — không gian giao tiếp và học qua chơi, ưu tiên tính dự đoán, hình ảnh và hỗ trợ cá nhân cho trẻ tự kỷ có khuyết tật trí tuệ.">
  <title>Góc nhìn quanh em</title>
  <link rel="manifest" href="manifest.php">
  <link rel="icon" href="assets/icon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="design-system.css">
  <link rel="stylesheet" href="ui-polish.css">
  <link rel="stylesheet" href="dialog-system.css">
  <link rel="stylesheet" href="qa-polish.css">
</head>
<body>
  <svg class="ui-symbol-sprite" aria-hidden="true" focusable="false">
    <symbol id="ui-home" viewBox="0 0 24 24"><path d="M3.5 10.5 12 3.8l8.5 6.7v9.2a1.5 1.5 0 0 1-1.5 1.5h-5v-6.2h-4v6.2H5a1.5 1.5 0 0 1-1.5-1.5Z"/></symbol>
    <symbol id="ui-progress" viewBox="0 0 24 24"><path d="M4 19V9m6 10V5m6 14v-7m4 7H2"/></symbol>
    <symbol id="ui-activities" viewBox="0 0 24 24"><rect x="3" y="4" width="8" height="7" rx="1.5"/><rect x="13" y="4" width="8" height="7" rx="1.5"/><rect x="3" y="13" width="8" height="7" rx="1.5"/><rect x="13" y="13" width="8" height="7" rx="1.5"/></symbol>
    <symbol id="ui-content" viewBox="0 0 24 24"><path d="M3.5 7.5h6l1.7 2H20a1.5 1.5 0 0 1 1.5 1.5v7.5A1.5 1.5 0 0 1 20 20H4a1.5 1.5 0 0 1-1.5-1.5V9A1.5 1.5 0 0 1 4 7.5Z"/><path d="m7 17 3-3 2.2 2 2.8-3 3 4"/><circle cx="16.5" cy="12" r="1.2"/></symbol>
    <symbol id="ui-settings" viewBox="0 0 24 24"><path d="M4 6h8m4 0h4M4 12h3m4 0h9M4 18h10m4 0h2"/><circle cx="14" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="16" cy="18" r="2"/></symbol>
    <symbol id="ui-lock" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1.2"/></symbol>
    <symbol id="ui-message" viewBox="0 0 24 24"><path d="M4 4.5h16v11H10l-5 4v-4H4Z"/><circle cx="8" cy="10" r=".8"/><circle cx="12" cy="10" r=".8"/><circle cx="16" cy="10" r=".8"/></symbol>
    <symbol id="ui-play" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z"/></symbol>
    <symbol id="ui-pause" viewBox="0 0 24 24"><path d="M8 7v10m8-10v10"/></symbol>
    <symbol id="ui-check" viewBox="0 0 24 24"><path d="m5 12.5 4.2 4.2L19 7"/></symbol>
    <symbol id="ui-volume" viewBox="0 0 24 24"><path d="M4 10h4l5-4v12l-5-4H4Z"/><path d="M16 9c1.1.8 1.7 1.8 1.7 3S17.1 14.2 16 15m2.6-8.5c2 1.5 3 3.3 3 5.5s-1 4-3 5.5"/></symbol>
    <symbol id="ui-eye" viewBox="0 0 24 24"><path d="M2.5 12s3.4-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.4 5.5-9.5 5.5S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.5"/></symbol>
    <symbol id="ui-easier" viewBox="0 0 24 24"><path d="M5 7h14M7.5 12h9M10 17h4"/></symbol>
    <symbol id="ui-hint" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-3.6 10.8c.9.7 1.6 1.5 1.6 2.7h4c0-1.2.7-2 1.6-2.7A6 6 0 0 0 12 3Z"/><path d="M10 20h4m-4-1.5h4"/></symbol>
    <symbol id="ui-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></symbol>
    <symbol id="ui-routine" viewBox="0 0 24 24"><path d="M6 5h12M6 12h12M6 19h12"/><circle cx="3.5" cy="5" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="19" r="1"/></symbol>
    <symbol id="ui-visual" viewBox="0 0 24 24"><path d="M2.5 12s3.4-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.4 5.5-9.5 5.5S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.5"/></symbol>
    <symbol id="ui-low-choice" viewBox="0 0 24 24"><rect x="3" y="6" width="7" height="12" rx="2"/><rect x="14" y="6" width="7" height="12" rx="2"/></symbol>
    <symbol id="ui-leaf" viewBox="0 0 24 24"><path d="M20 4C11 4 5 8.8 5 15c0 2.7 1.8 5 4.8 5C16 20 20 13 20 4Z"/><path d="M5 20c2.8-4.2 6.4-7.5 11-10"/></symbol>
    <symbol id="ui-hand" viewBox="0 0 24 24"><path d="M8.5 11V5.5a1.5 1.5 0 0 1 3 0V10m0-4.5a1.5 1.5 0 0 1 3 0V10m0-3a1.5 1.5 0 0 1 3 0v4m0-2a1.5 1.5 0 0 1 3 0v5.2c0 4.2-2.8 6.8-7 6.8h-1.4c-2.2 0-4.2-1-5.5-2.8L3.8 14a1.6 1.6 0 0 1 2.4-2.1Z"/></symbol>
    <symbol id="ui-shield" viewBox="0 0 24 24"><path d="M12 3 20 6v5.5c0 4.7-3 8-8 9.5-5-1.5-8-4.8-8-9.5V6Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></symbol>
    <symbol id="ui-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 10v6m0-9.2v.2"/></symbol>
    <symbol id="ui-repeat" viewBox="0 0 24 24"><path d="M19 7h-9a5 5 0 0 0-5 5v1"/><path d="m16 4 3 3-3 3M5 17h9a5 5 0 0 0 5-5v-1"/><path d="m8 20-3-3 3-3"/></symbol>
    <symbol id="ui-chevron" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></symbol>
    <symbol id="ui-person" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-4.3 3-6.5 7-6.5s6.2 2.2 7 6.5"/></symbol>
    <symbol id="ui-mic" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4m-4 0h8"/></symbol>
    <symbol id="ui-stop" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/></symbol>
    <symbol id="ui-warning" viewBox="0 0 24 24"><path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 8.4v5.5"/><circle cx="12" cy="17.1" r=".9" fill="currentColor" stroke="none"/></symbol>
    <symbol id="ui-trash" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4.5h6V7M7 7l.8 13h8.4L17 7M10 10v6m4-6v6"/></symbol>
    <symbol id="ui-download" viewBox="0 0 24 24"><path d="M12 3v11m-4-4 4 4 4-4M5 18v2h14v-2"/></symbol>
    <symbol id="ui-upload" viewBox="0 0 24 24"><path d="M12 16V5m-4 4 4-4 4 4M5 19v2h14v-2"/></symbol>
    <symbol id="ui-edit" viewBox="0 0 24 24"><path d="M4 20h4l11-11-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></symbol>
    <symbol id="ui-save" viewBox="0 0 24 24"><path d="M4 3h13l3 3v15H4V3Z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/></symbol>
    <symbol id="ui-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
    <symbol id="ui-faucet" viewBox="0 0 24 24">
      <path d="M5 10h12v3H5z"/><path d="M8 10V7h5a3 3 0 0 1 3 3M4 13v3h5v-3M17 13v2"/>
      <path d="M17 18c0-1.3 1.5-2.5 1.5-2.5S20 16.7 20 18a1.5 1.5 0 0 1-3 0Z"/>
    </symbol>
    <symbol id="ui-soap" viewBox="0 0 24 24">
      <path d="M8 7h8l1.5 3v9h-11v-9L8 7Z"/><path d="M10 7V4h5M15 4v2"/>
      <path d="M9.5 13.5h5"/>
    </symbol>
    <symbol id="ui-hands" viewBox="0 0 24 24">
      <path d="M4 13c2-1 3-3 4-5 .5-1 2-.5 1.7.6l-1 3 3-5c.6-1 2-.2 1.5.8l-1.2 3 2.2-3.3c.7-1 2 .1 1.3 1.1L13 12"/>
      <path d="M20 13c-2-1-3-3-4-5-.5-1-2-.5-1.7.6l1 3-3-5c-.6-1-2-.2-1.5.8l1.2 3-2.2-3.3c-.7-1-2 .1-1.3 1.1L11 12"/>
      <path d="M5 14c1.5 4 4 6 7 6s5.5-2 7-6"/>
    </symbol>
    <symbol id="ui-waterdrop" viewBox="0 0 24 24">
      <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z"/>
    </symbol>
    <symbol id="ui-towel" viewBox="0 0 24 24">
      <path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>
    </symbol>
    <symbol id="ui-cup" viewBox="0 0 24 24">
      <path d="M6 6h10l-1 13H7L6 6Z"/><path d="M16 9h2a2 2 0 0 1 0 4h-2"/>
    </symbol>
    <symbol id="ui-toy" viewBox="0 0 24 24">
      <path d="m12 3 2.3 4.7 5.2.8-3.8 3.7.9 5.2L12 15l-4.6 2.4.9-5.2-3.8-3.7 5.2-.8L12 3Z"/>
    </symbol>
    <symbol id="ui-box" viewBox="0 0 24 24">
      <path d="M4 8h16v11H4z"/><path d="M4 8l3-4h10l3 4M9 12h6"/>
    </symbol>
    <symbol id="ui-put-in" viewBox="0 0 24 24">
      <path d="M12 3v9m-4-4 4 4 4-4"/><path d="M5 15h14v5H5z"/>
    </symbol>
    <symbol id="ui-daily" viewBox="0 0 24 24">
      <rect x="2.5" y="5" width="7" height="14" rx="2.1"/>
      <rect x="14.5" y="5" width="7" height="14" rx="2.1"/>
      <circle cx="6" cy="12" r="1.5" fill="currentColor" stroke="none"/>
      <path d="M10.7 12h2.7m-1.1-2 2 2-2 2"/>
      <path d="m16.5 12 1.35 1.35 2.5-3"/>
    </symbol>
    <symbol id="ui-match" viewBox="0 0 24 24">
      <rect x="2.75" y="5" width="7.5" height="14" rx="2.2"/>
      <rect x="13.75" y="5" width="7.5" height="14" rx="2.2"/>
      <circle cx="6.5" cy="12" r="1.9" fill="currentColor" stroke="none"/>
      <circle cx="17.5" cy="12" r="1.9" fill="currentColor" stroke="none"/>
    </symbol>
    <symbol id="ui-face" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="8.8" cy="9.6" r="1" fill="currentColor" stroke="none"/>
      <circle cx="15.2" cy="9.6" r="1" fill="currentColor" stroke="none"/>
      <path d="M8.3 14.2c1.15 1.55 2.4 2.3 3.7 2.3s2.55-.75 3.7-2.3"/>
    </symbol>
    <symbol id="ui-classify" viewBox="0 0 24 24">
      <circle cx="12" cy="4.6" r="2.1" fill="currentColor" stroke="none"/>
      <path d="M12 7.5v3.2M12 10.7H6.3v2.1M12 10.7h5.7v2.1"/>
      <rect x="2.7" y="13" width="7.2" height="6.4" rx="1.8"/>
      <rect x="14.1" y="13" width="7.2" height="6.4" rx="1.8"/>
    </symbol>
    <symbol id="ui-sequence" viewBox="0 0 24 24">
      <circle cx="4.7" cy="12" r="3"/>
      <circle cx="12" cy="12" r="3"/>
      <circle cx="19.3" cy="12" r="3"/>
      <path d="M7.8 12h1.1m6.2 0h1.1"/>
      <circle cx="4.7" cy="12" r=".8" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="12" r=".8" fill="currentColor" stroke="none"/>
      <circle cx="19.3" cy="12" r=".8" fill="currentColor" stroke="none"/>
    </symbol>
    <symbol id="ui-pattern" viewBox="0 0 24 24">
      <circle cx="4" cy="12" r="2.5" fill="currentColor" stroke="none"/>
      <path d="m9.25 9 3 6h-6Z" fill="currentColor" stroke="none"/>
      <circle cx="15.25" cy="12" r="2.5" fill="currentColor" stroke="none"/>
      <rect x="20" y="9.5" width="2.5" height="5" rx="1.1"/>
    </symbol>
  </svg>

  <a class="skip-link" href="#mainContent">Bỏ qua điều hướng</a>

  <div class="ambient ambient-a" aria-hidden="true"></div>
  <div class="ambient ambient-b" aria-hidden="true"></div>

  <div class="app-shell" id="app">
    <header class="topbar" aria-label="Thanh điều hướng chính">
      <button class="brand" type="button" data-route="home" aria-label="Về trang chủ">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 44 44" focusable="false">
            <circle cx="22" cy="22" r="16" fill="none" stroke="currentColor" stroke-width="2.6"/>
            <circle cx="22" cy="22" r="6" fill="currentColor"/>
            <circle cx="26" cy="18" r="2" fill="white" opacity=".9"/>
          </svg>
        </span>
        <span class="brand-copy">
          <strong>Góc nhìn quanh em</strong>
          <small>Giao tiếp • trình tự • chơi bằng hình</small>
        </span>
      </button>

      <nav class="main-nav" aria-label="Điều hướng">
        <button class="nav-button is-active" type="button" data-route="home">
          <span class="nav-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-home"></use></svg></span><span>Khám phá</span>
        </button>
        <button class="nav-button adult-nav" type="button" data-route="progress" data-adult-route="progress">
          <span class="nav-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-progress"></use></svg></span><span>Tiến trình</span>
        </button>
        <button class="nav-button adult-nav" type="button" data-route="guide" data-adult-route="guide">
          <span class="nav-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-activities"></use></svg></span><span>Hoạt động</span>
        </button>
        <button class="nav-button adult-nav" type="button" data-route="packs" data-adult-route="packs">
          <span class="nav-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-content"></use></svg></span><span>Nội dung</span>
        </button>
        <button class="nav-button adult-nav" type="button" data-route="settings" data-adult-route="settings">
          <span class="nav-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-settings"></use></svg></span><span>Cài đặt</span>
        </button>
        <button class="nav-button adult-gate-entry" type="button" id="adultGateBtn" aria-label="Mở khu vực người lớn">
          <span class="nav-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-lock"></use></svg></span><span>Người lớn</span>
        </button>
      </nav>
    </header>

    <main id="mainContent" class="main-content" tabindex="-1">
      <section class="screen is-active" id="homeScreen" data-screen="home" aria-labelledby="homeTitle">
        <div class="child-home">
          <section class="child-start-card" aria-labelledby="homeTitle">
            <div class="child-start-copy">
              <span class="child-state-badge"><span aria-hidden="true">●</span> Một việc mỗi lần</span>
              <h1 id="homeTitle">Con muốn làm gì?</h1>
              <p>Con có thể nói điều mình cần trước. Sau đó chọn một hình để chơi.</p>
            </div>

            <div class="home-routine" aria-label="Trình tự: nói điều cần, chơi, nghỉ, xong">
              <div class="home-routine-step is-current"><span class="routine-mini-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-message"></use></svg></span><strong>Nói</strong></div>
              <span class="home-routine-arrow" aria-hidden="true">→</span>
              <div class="home-routine-step"><span class="routine-mini-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-play"></use></svg></span><strong>Chơi</strong></div>
              <span class="home-routine-arrow" aria-hidden="true">→</span>
              <div class="home-routine-step"><span class="routine-mini-icon"><svg class="ui-icon v28-icon" aria-hidden="true" focusable="false"><use href="#ui-pause"></use></svg></span><strong>Nghỉ</strong></div>
              <span class="home-routine-arrow" aria-hidden="true">→</span>
              <div class="home-routine-step"><span class="routine-mini-icon"><svg class="ui-icon v28-icon" aria-hidden="true" focusable="false"><use href="#ui-check"></use></svg></span><strong>Xong</strong></div>
            </div>

            <div class="child-primary-choices">
              <button class="child-choice child-choice--communication" type="button" id="homeCommunicationBtn">
                <span class="child-choice-icon"><svg class="ui-icon primary-action-icon" aria-hidden="true" focusable="false"><use href="#ui-message"></use></svg></span>
                <span class="child-choice-copy"><strong>Con cần gì?</strong><small>Nói bằng hình</small></span>
              </button>
              <button class="child-choice child-choice--play" type="button" id="quickStartBtn" data-activity="daily">
                <span class="child-choice-icon"><svg class="ui-icon primary-action-icon" aria-hidden="true" focusable="false"><use href="#ui-play"></use></svg></span>
                <span class="child-choice-copy"><strong>Chơi</strong><small id="quickStartLabel">Việc quen thuộc</small></span>
              </button>
            </div>
          </section>

          <section class="child-activity-section" aria-labelledby="activitiesTitle">
            <div class="child-section-heading">
              <div>
                <span class="child-section-number" aria-hidden="true">2</span>
                <div>
                  <p class="eyebrow">Chọn một hình</p>
                  <h2 id="activitiesTitle">Con muốn chơi gì?</h2>
                </div>
              </div>
              <button class="voice-cue-button" type="button" id="readActivityChoicesBtn"><svg class="ui-icon ui-icon--button" aria-hidden="true" focusable="false"><use href="#ui-volume"></use></svg><span>Nghe</span></button>
            </div>

            <div class="activity-grid child-activity-grid">
              <button class="activity-card activity-card--daily" type="button" data-activity="daily">
                <span class="activity-art daily-art"><svg class="ui-icon activity-vector-icon" aria-hidden="true" focusable="false"><use href="#ui-daily"></use></svg></span>
                <span class="activity-copy"><strong>Việc tiếp theo</strong><span>Chọn bước tiếp theo</span></span>
                <span class="activity-go" aria-hidden="true">›</span>
              </button>

              <button class="activity-card activity-card--memory" type="button" data-activity="match">
                <span class="activity-art"><svg class="ui-icon activity-vector-icon" aria-hidden="true" focusable="false"><use href="#ui-match"></use></svg></span>
                <span class="activity-copy"><strong>Ghép hình</strong><span>Tìm hai hình giống nhau</span></span>
                <span class="activity-go" aria-hidden="true">›</span>
              </button>

              <button class="activity-card activity-card--focus" type="button" data-activity="focus">
                <span class="activity-art"><svg class="ui-icon activity-vector-icon" aria-hidden="true" focusable="false"><use href="#ui-target"></use></svg></span>
                <span class="activity-copy"><strong>Tìm giống nhau</strong><span>Nhìn mẫu rồi tìm lại</span></span>
                <span class="activity-go" aria-hidden="true">›</span>
              </button>

              <button class="activity-card activity-card--reflect" type="button" data-activity="checkin">
                <span class="activity-art reflect-art"><svg class="ui-icon activity-vector-icon" aria-hidden="true" focusable="false"><use href="#ui-face"></use></svg></span>
                <span class="activity-copy"><strong>Con thấy sao?</strong><span>Chọn khuôn mặt hoặc điều con cần</span></span>
                <span class="activity-go" aria-hidden="true">›</span>
              </button>

              <button class="activity-card activity-card--classify advanced-activity" type="button" data-activity="classify">
                <span class="activity-art classify-art"><svg class="ui-icon activity-vector-icon" aria-hidden="true" focusable="false"><use href="#ui-classify"></use></svg></span>
                <span class="activity-copy"><strong>Về đúng nhà</strong><span>Chọn nhóm phù hợp</span></span>
                <span class="activity-go" aria-hidden="true">›</span>
              </button>

              <button class="activity-card activity-card--sequence advanced-activity" type="button" data-activity="sequence">
                <span class="activity-art sequence-art"><svg class="ui-icon activity-vector-icon" aria-hidden="true" focusable="false"><use href="#ui-sequence"></use></svg></span>
                <span class="activity-copy"><strong>Đi theo thứ tự</strong><span>Chọn từng bước</span></span>
                <span class="activity-go" aria-hidden="true">›</span>
              </button>

              <button class="activity-card activity-card--pattern advanced-activity" type="button" data-activity="pattern">
                <span class="activity-art pattern-art"><svg class="ui-icon activity-vector-icon" aria-hidden="true" focusable="false"><use href="#ui-pattern"></use></svg></span>
                <span class="activity-copy"><strong>Mảnh còn thiếu</strong><span>Tìm hình đi tiếp</span></span>
                <span class="activity-go" aria-hidden="true">›</span>
              </button>
            </div>
          </section>

          <section class="custom-packs-home" id="customPacksSection" aria-labelledby="customPacksTitle" hidden>
            <div class="child-section-heading">
              <div>
                <span class="child-section-number" aria-hidden="true">★</span>
                <div><p class="eyebrow">Hình quen thuộc</p><h2 id="customPacksTitle">Nội dung của con</h2></div>
              </div>
            </div>
            <div class="custom-pack-grid" id="customPacksList"></div>
          </section>

          <section class="calm-garden-card" aria-labelledby="gardenTitle">
            <div class="calm-garden-copy">
              <p class="eyebrow">Góc yên bình</p>
              <h2 id="gardenTitle">Khu vườn nhỏ</h2>
              <strong id="gardenMessage">Mỗi buổi chơi làm khu vườn thay đổi một chút.</strong>
              <small>Không cần chơi mỗi ngày. Nghỉ lâu cũng không mất gì.</small>
              <span class="world-level" id="gardenLevelLabel">Mới bắt đầu</span>
              <div class="garden-dots" id="gardenDots" aria-hidden="true"></div>
            </div>
            <div class="mini-garden" id="gardenScene" aria-label="Khu vườn thay đổi theo các buổi chơi">
              <svg viewBox="0 0 420 220" role="img" aria-label="Khu vườn yên bình">
                <rect width="420" height="220" rx="28" fill="#edf5f1"/>
                <circle cx="340" cy="52" r="24" fill="#eedaa0"/>
                <path d="M0 158C65 127 130 138 192 162C270 192 335 138 420 153V220H0Z" fill="#c7dfcf"/>
                <path d="M0 184C75 158 153 178 218 193C289 210 356 169 420 177V220H0Z" fill="#9fc7ab"/>
                <g class="garden-plant garden-plant-1"><path d="M100 188V138" stroke="#477d5e" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="126" r="17" fill="#e6afa7"/></g>
                <g class="garden-plant garden-plant-2"><path d="M210 196V148" stroke="#477d5e" stroke-width="7" stroke-linecap="round"/><circle cx="210" cy="137" r="16" fill="#e8cc78"/></g>
                <g class="garden-plant garden-plant-3"><path d="M310 190V134" stroke="#477d5e" stroke-width="7" stroke-linecap="round"/><circle cx="310" cy="122" r="17" fill="#bbb0d8"/></g>
              </svg>
            </div>
          </section>

          <div class="home-status-row" aria-label="Thiết lập hiện tại">
            <span class="status-chip" id="visualModeChip"><span aria-hidden="true">◐</span> Dịu</span>
            <span class="status-chip" id="soundChip"><span aria-hidden="true">♪</span> Âm tắt</span>
            <span class="status-chip" id="motionChip"><span aria-hidden="true">≈</span> Ít chuyển động</span>
          </div>
        </div>
      </section>

      <section class="screen play-screen" id="playScreen" data-screen="play" aria-labelledby="gameTitle">
        <div class="play-shell">
          <div class="play-topline">
            <button class="quiet-button quiet-button--back" type="button" id="leaveActivityBtn">← Xong</button>
            <div class="mission-progress" id="roundDots" aria-label="Tiến trình chặng"></div>
            <div class="play-top-actions">
              <button class="communication-button" type="button" id="communicationBtn"><svg class="ui-icon play-control-icon" aria-hidden="true" focusable="false"><use href="#ui-message"></use></svg> Con cần gì?</button>
              <button class="quiet-button" type="button" id="pauseBtn"><svg class="ui-icon play-control-icon" aria-hidden="true" focusable="false"><use href="#ui-pause"></use></svg> Nghỉ</button>
            </div>
          </div>

          <div class="picture-routine" id="pictureRoutine" aria-label="Trình tự buổi chơi">
            <span class="routine-step" data-routine="listen"><svg class="ui-icon routine-glyph-icon" aria-hidden="true" focusable="false"><use href="#ui-volume"></use></svg><small>Nghe</small></span>
            <span class="routine-arrow" aria-hidden="true">›</span>
            <span class="routine-step" data-routine="play"><svg class="ui-icon routine-glyph-icon" aria-hidden="true" focusable="false"><use href="#ui-play"></use></svg><small>Chơi</small></span>
            <span class="routine-arrow" aria-hidden="true">›</span>
            <span class="routine-step" data-routine="rest"><svg class="ui-icon routine-glyph-icon" aria-hidden="true" focusable="false"><use href="#ui-pause"></use></svg><small>Nghỉ</small></span>
            <span class="routine-arrow" aria-hidden="true">›</span>
            <span class="routine-step" data-routine="done"><svg class="ui-icon routine-glyph-icon" aria-hidden="true" focusable="false"><use href="#ui-check"></use></svg><small>Xong</small></span>
          </div>

          <header class="game-header">
            <div class="game-heading-row">
              <div>
                <p class="eyebrow" id="gameSkill">Hoạt động</p>
                <h1 id="gameTitle">Vườn ghép đôi</h1>
              </div>
              <span class="difficulty-chip" id="difficultyChip">Nhịp nhẹ</span>
            </div>
            <div class="instruction-card">
              <span class="instruction-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-info"></use></svg></span>
              <p id="gameInstruction">Tìm hai thẻ giống nhau.</p>
              <button class="read-button" id="readInstructionBtn" type="button" aria-label="Đọc hướng dẫn"><svg class="ui-icon ui-icon--button" aria-hidden="true" focusable="false"><use href="#ui-volume"></use></svg><span>Đọc</span></button>
            </div>
          </header>

          <div class="game-stage" id="gameArea" aria-live="polite"></div>

          <div class="answer-feedback" id="answerFeedback" role="status" aria-live="assertive" aria-atomic="true" hidden>
            <span class="answer-feedback-icon" aria-hidden="true">
              <svg class="ui-icon" focusable="false"><use id="answerFeedbackIconUse" href="#ui-check"></use></svg>
            </span>
            <span class="answer-feedback-copy">
              <strong id="answerFeedbackTitle">Đúng rồi!</strong>
              <small id="answerFeedbackDetail">Con làm đúng rồi.</small>
            </span>
          </div>

          <div class="support-dock" aria-label="Trợ giúp trong hoạt động">
            <div class="support-message">
              <span class="support-orb" aria-hidden="true">•</span>
              <p id="supportText">Nếu bé cần, hãy bấm nút tai hoặc nút gợi ý.</p>
            </div>
            <div class="support-actions">
              <button class="soft-button support-icon-button" id="previewBtn" type="button"><svg class="ui-icon ui-icon--button" aria-hidden="true" focusable="false"><use href="#ui-eye"></use></svg><span>Xem mẫu</span></button>
              <button class="soft-button support-icon-button" id="easierBtn" type="button"><svg class="ui-icon ui-icon--button" aria-hidden="true" focusable="false"><use href="#ui-easier"></use></svg><span>Dễ hơn</span></button>
              <button class="primary-button primary-button--small support-icon-button" id="hintBtn" type="button"><svg class="ui-icon ui-icon--button" aria-hidden="true" focusable="false"><use href="#ui-hint"></use></svg><span>Chỉ giúp</span></button>
              <button class="quiet-button support-icon-button" id="skipRoundBtn" type="button"><svg class="ui-icon ui-icon--button" aria-hidden="true" focusable="false"><use href="#ui-check"></use></svg><span>Xong phần này</span></button>
            </div>
          </div>
        </div>
      </section>


      <section class="screen" id="guideScreen" data-screen="guide" aria-labelledby="guideTitle">
        <div class="page-narrow guide-page">
          <div class="page-heading-row">
            <div>
              <p class="eyebrow">Thư viện hoạt động dành cho người lớn</p>
              <h1 id="guideTitle">Chọn hoạt động theo nhu cầu của trẻ</h1>
              <p class="page-lead">
                Mỗi hoạt động được mô tả theo nhu cầu hỗ trợ thực tế, cách chơi và kỹ năng được luyện.
                Các nhãn dưới đây không phải chẩn đoán, thang năng lực hay khuyến nghị điều trị.
              </p>
            </div>
            <div class="local-badge"><span class="local-badge-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-target"></use></svg></span><strong>Chọn có mục đích</strong><small>Biết vì sao trước khi chơi</small></div>
          </div>

          <section class="who-support-panel" aria-labelledby="whoSupportTitle">
            <div class="wonder-section-heading">
              <p class="wonder-label">PHÙ HỢP VỚI AI?</p>
              <h2 id="whoSupportTitle">Phù hợp với ai?</h2>
              <p>Đối tượng chính là <strong>trẻ tự kỷ có khuyết tật trí tuệ</strong>. Mỗi hoạt động phù hợp khác nhau tùy cách trẻ giao tiếp, tiếp nhận hình ảnh, xử lý lựa chọn, điều hòa cảm giác và truy cập vận động.</p>
            </div>
            <div class="target-audience-callout">
              <span class="target-audience-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-person"></use></svg></span>
              <div><strong>Không dùng chẩn đoán như một “mức”.</strong><p>Hãy chọn theo nhu cầu hỗ trợ đang quan sát được ở thời điểm này.</p></div>
            </div>
            <div class="support-need-grid">
              <article><span class="support-need-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-message"></use></svg></span><strong>Giao tiếp chức năng</strong><p>Yêu cầu giúp, nghỉ, thêm, từ chối hoặc kết thúc.</p></article>
              <article><span class="support-need-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-routine"></use></svg></span><strong>Trình tự & dự đoán</strong><p>Biết việc gì đang diễn ra và bước nào đến tiếp theo.</p></article>
              <article><span class="support-need-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-visual"></use></svg></span><strong>Học bằng hình</strong><p>Ưu tiên ảnh, biểu tượng và thao tác trực tiếp hơn chữ viết.</p></article>
              <article><span class="support-need-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-low-choice"></use></svg></span><strong>Ít lựa chọn</strong><p>Cần 2–3 lựa chọn lớn, cấu trúc ổn định và prompt rõ.</p></article>
              <article><span class="support-need-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-leaf"></use></svg></span><strong>Điều hòa cảm giác</strong><p>Cần màu dịu, ít chuyển động, không đếm ngược và có quyền nghỉ.</p></article>
              <article><span class="support-need-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-hand"></use></svg></span><strong>Truy cập vận động</strong><p>Cần nút lớn, cảm ứng, bàn phím hoặc quét bằng một nút thay cho kéo-thả.</p></article>
            </div>
          </section>

          <section class="catalog-controls" aria-labelledby="catalogTitle">
            <div class="section-heading section-heading--compact">
              <div><p class="wonder-label">FIND THE RIGHT GAME</p><h2 id="catalogTitle">Tìm hoạt động phù hợp</h2></div>
              <p>Chọn theo nhu cầu hoặc nhóm kỹ năng. Không cần chọn chẩn đoán.</p>
            </div>
            <div class="catalog-filter-row" role="group" aria-label="Lọc hoạt động theo nhu cầu">
              <button class="filter-chip is-active" type="button" data-guide-filter="all">Tất cả</button>
              <button class="filter-chip" type="button" data-guide-filter="communication">Giao tiếp</button>
              <button class="filter-chip" type="button" data-guide-filter="routine">Trình tự</button>
              <button class="filter-chip" type="button" data-guide-filter="visual">Học bằng hình</button>
              <button class="filter-chip" type="button" data-guide-filter="low-choice">Ít lựa chọn</button>
              <button class="filter-chip" type="button" data-guide-filter="cognitive">Nhận thức</button>
              <button class="filter-chip" type="button" data-guide-filter="socio-emotional">Cảm xúc</button>
            </div>
            <div class="adult-game-catalog" id="adultGameCatalog"></div>
          </section>

          <section class="design-principles-panel" aria-labelledby="howGamesWorkTitle">
            <div class="section-heading section-heading--compact">
              <div><p class="eyebrow">Nguyên tắc thiết kế</p><h2 id="howGamesWorkTitle">Game được thiết kế như thế nào?</h2></div>
            </div>
            <div class="principle-grid">
              <article><b>1</b><strong>Một mục tiêu rõ</strong><p>Mỗi activity chỉ có một loop chính và một hành động cần hiểu.</p></article>
              <article><b>2</b><strong>Hành động → phản hồi</strong><p>Chạm/chọn phải tạo phản hồi ngay, nhưng không dùng hiệu ứng quá kích thích.</p></article>
              <article><b>3</b><strong>Không phạt lỗi</strong><p>Sai không xóa tiến trình; gợi ý ít lỗi có thể chỉ lựa chọn nên thử tiếp.</p></article>
              <article><b>4</b><strong>Lặp lại an toàn</strong><p>Luật chơi giữ ổn định để trẻ có thể luyện lại mà không phải học giao diện mới.</p></article>
              <article><b>5</b><strong>Nhiều cách truy cập</strong><p>Cảm ứng, chuột, bàn phím và quét một nút cùng tồn tại; gói ảnh/giọng có thể cá nhân hóa.</p></article>
              <article><b>6</b><strong>Quan sát, không xếp hạng</strong><p>Báo cáo mô tả hỗ trợ đã dùng và phần hoạt động đã hoàn thành, không suy ra IQ hay chẩn đoán.</p></article>
            </div>
          </section>
          <section class="product-about-panel" aria-labelledby="aboutProductTitle">
            <div class="wonder-section-heading">
              <p class="wonder-label">VỀ NỀN TẢNG</p>
              <h2 id="aboutProductTitle">Về Góc nhìn quanh em</h2>
              <p>Một môi trường giao tiếp và học qua chơi bằng hình, ưu tiên sự quen thuộc, khả năng dự đoán và quyền chủ động của trẻ.</p>
            </div>
            <div class="about-platform-grid">
              <article><span class="about-platform-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-target"></use></svg></span><strong>Sứ mệnh</strong><p>Giúp trẻ luyện giao tiếp chức năng, trình tự quen thuộc và kỹ năng trong hoạt động qua những phiên chơi ngắn, dễ hiểu.</p></article>
              <article><span class="about-platform-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-routine"></use></svg></span><strong>Cách tiếp cận</strong><p>Một mục tiêu mỗi lần, ít lựa chọn, phản hồi tức thì, lặp lại an toàn và không tự tăng độ khó khi chưa được người lớn cho phép.</p></article>
              <article><span class="about-platform-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-hand"></use></svg></span><strong>Người đồng hành</strong><p>Phụ huynh, giáo viên và chuyên gia có thể chọn mức hỗ trợ, tạo nội dung quen thuộc và xem trẻ đã dùng loại hỗ trợ nào.</p></article>
              <article><span class="about-platform-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-shield"></use></svg></span><strong>Riêng tư & bằng chứng</strong><p>Ảnh/giọng được giữ cục bộ. App không suy ra IQ, mức độ tự kỷ hay hiệu quả điều trị từ dữ liệu chơi.</p></article>
            </div>
          </section>
        </div>
      </section>

      <section class="screen" id="progressScreen" data-screen="progress" aria-labelledby="progressTitle">
        <div class="page-narrow">
          <div class="page-heading-row">
            <div>
              <p class="eyebrow">Góc dành cho người đồng hành</p>
              <h1 id="progressTitle">Tiến trình trên thiết bị này</h1>
              <p class="page-lead">
                Trang này giúp người lớn nhìn lại hoạt động, thời lượng và mức hỗ trợ trẻ đã dùng. Không dùng để chẩn đoán hoặc xếp hạng năng lực.
              </p>
            </div>
            <div class="local-badge"><span class="local-badge-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-shield"></use></svg></span><strong>Chỉ lưu cục bộ</strong><small>Không gửi lên máy chủ</small></div>
          </div>

          <div class="metric-grid" id="metricGrid"></div>

          <section class="progress-section" aria-labelledby="skillProgressTitle">
            <div class="section-heading section-heading--compact">
              <div>
                <p class="eyebrow">Điều chỉnh thích ứng</p>
                <h2 id="skillProgressTitle">Cách trẻ đang tham gia hoạt động</h2>
              </div>
              <p>Ưu tiên cấu trúc ổn định. App chỉ giảm tải khi cần; tăng độ phức tạp chỉ xảy ra khi người lớn cho phép.</p>
            </div>
            <div id="skillProgressList" class="skill-progress-list"></div>
          </section>

          <section class="progress-section" aria-labelledby="recentTitle">
            <div class="section-heading section-heading--compact">
              <div>
                <p class="eyebrow">Gần đây</p>
                <h2 id="recentTitle">Nhịp khám phá</h2>
              </div>
              <p>Không có streak. Khoảng nghỉ dài không làm mất thành quả.</p>
            </div>
            <div class="recent-list" id="recentList"></div>
          </section>

          <section class="progress-section" aria-labelledby="dataTitle">
            <div class="section-heading section-heading--compact">
              <div>
                <p class="eyebrow">Quyền kiểm soát dữ liệu</p>
                <h2 id="dataTitle">Xuất hoặc xóa</h2>
              </div>
            </div>
            <div class="data-management-grid">
              <button class="secondary-button support-icon-button" type="button" id="backupAllBtn">
                <svg class="ui-icon ui-icon--button" aria-hidden="true"><use href="#ui-download"></use></svg><span>Sao lưu tất cả</span>
              </button>
              <button class="secondary-button support-icon-button" type="button" id="restoreBackupBtn">
                <svg class="ui-icon ui-icon--button" aria-hidden="true"><use href="#ui-upload"></use></svg><span>Khôi phục bản sao lưu</span>
              </button>
              <button class="quiet-button support-icon-button" type="button" id="exportDataBtn">
                <svg class="ui-icon ui-icon--button" aria-hidden="true"><use href="#ui-progress"></use></svg><span>Chỉ xuất tiến trình</span>
              </button>
              <button class="danger-button support-icon-button" type="button" id="resetDataBtn">
                <svg class="ui-icon ui-icon--button" aria-hidden="true"><use href="#ui-trash"></use></svg><span>Xóa tiến trình</span>
              </button>
              <input id="restoreBackupInput" type="file" accept="application/json,.json" hidden aria-label="Chọn tệp sao lưu để khôi phục">
            </div>
            <p class="data-management-note">“Sao lưu tất cả” gồm cài đặt, tiến trình và các gói nội dung local. Tệp có thể chứa ảnh/giọng và nên được giữ riêng tư.</p>
          </section>
        </div>
      </section>

      <section class="screen" id="packsScreen" data-screen="packs" aria-labelledby="packsTitle">
        <div class="page-narrow">
          <div class="page-heading-row">
            <div>
              <p class="eyebrow">Xưởng nội dung cục bộ</p>
              <h1 id="packsTitle">Biến điều quen thuộc thành trò chơi</h1>
              <p class="page-lead">Tạo gói bằng biểu tượng hoặc ảnh thật quen thuộc với trẻ. Có thể thêm một câu giọng thu ngắn của người lớn. Mọi dữ liệu chỉ nằm trên trình duyệt này trừ khi bạn chủ động xuất tệp.</p>
            </div>
            <div class="local-badge"><span class="local-badge-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-content"></use></svg></span><strong>Không cần tài khoản</strong><small>Không tải lên đám mây</small></div>
          </div>

          <section class="pack-builder" aria-labelledby="packBuilderTitle">
            <div class="section-heading section-heading--compact">
              <div><p class="eyebrow">Tạo gói</p><h2 id="packBuilderTitle">Một gói, một chủ đề quen thuộc</h2></div>
              <p>Ví dụ: người thân, đồ dùng lớp học, động vật yêu thích hoặc từ vựng đang học.</p>
            </div>
            <form id="packForm" class="pack-form">
              <label><span>Tên gói</span><input id="packTitleInput" maxlength="48" required placeholder="Ví dụ: Đồ vật ở nhà"></label>
              <label><span>Kiểu trò chơi</span><select id="packTypeInput"><option value="match">Ghép đôi</option><option value="focus">Tìm mục tiêu</option></select></label>
              <label><span>Loại hình ảnh</span><select id="packSourceInput"><option value="symbol">Biểu tượng / emoji</option><option value="photo">Ảnh thật trên máy</option></select></label>
              <label class="pack-items-field" id="symbolPackField"><span>Các mục — mỗi dòng: <b>biểu tượng | tên</b></span><textarea id="packItemsInput" rows="7" placeholder="🥄 | Cái thìa
🪥 | Bàn chải
🧦 | Đôi tất
📘 | Quyển sách"></textarea><small>Từ 4 đến 12 mục. Tên dùng cho giọng đọc và hỗ trợ người lớn.</small></label>
              <div class="photo-pack-field" id="photoPackField" hidden>
                <div class="photo-pack-heading"><div><strong>Ảnh thật quen thuộc</strong><small>Chọn 4–8 ảnh. Ảnh được tự thu nhỏ và chỉ lưu trên trình duyệt này.</small></div><button class="secondary-button" type="button" id="choosePhotosBtn">Chọn ảnh</button></div>
                <input id="packPhotoInput" aria-label="Chọn ảnh cho gói nội dung" type="file" accept="image/*" multiple hidden>
                <div class="photo-pack-preview" id="packPhotoPreview"></div>
                <button class="quiet-button" type="button" id="clearPackPhotosBtn" hidden>Xóa ảnh đã chọn</button>
              </div>
              <div class="voice-recorder">
                <div><strong>Giọng của người lớn <span class="optional-tag">tùy chọn</span></strong><small>Thu một câu ngắn như “Con hãy tìm hai hình giống nhau nhé”. Mic chỉ bật khi bạn bấm thu.</small></div>
                <div class="voice-recorder-actions">
                  <button class="secondary-button support-icon-button" type="button" id="startVoiceRecordBtn"><svg class="ui-icon ui-icon--button" aria-hidden="true"><use href="#ui-mic"></use></svg><span>Thu giọng</span></button>
                  <button class="secondary-button support-icon-button" type="button" id="stopVoiceRecordBtn" disabled><svg class="ui-icon ui-icon--button" aria-hidden="true"><use href="#ui-stop"></use></svg><span>Dừng</span></button>
                  <button class="quiet-button support-icon-button" type="button" id="playVoiceRecordBtn" hidden><svg class="ui-icon ui-icon--button" aria-hidden="true"><use href="#ui-play"></use></svg><span>Nghe thử</span></button>
                  <button class="quiet-button" type="button" id="clearVoiceRecordBtn" hidden>Xóa bản thu</button>
                </div>
                <p class="voice-status" id="voiceRecordStatus">Chưa có bản thu.</p>
              </div>
              <div class="pack-edit-banner" id="packEditBanner" hidden>
                <span><svg class="ui-icon" aria-hidden="true"><use href="#ui-edit"></use></svg></span>
                <div><strong>Đang sửa gói đã lưu</strong><small>Mọi thay đổi chỉ được ghi khi bạn bấm “Lưu thay đổi”.</small></div>
              </div>
              <div class="pack-submit-row">
                <button class="primary-button support-icon-button" type="submit" id="packSaveBtn">
                  <svg class="ui-icon ui-icon--button" aria-hidden="true"><use href="#ui-save"></use></svg><span>Lưu gói trên thiết bị</span>
                </button>
                <button class="secondary-button" type="button" id="cancelPackEditBtn" hidden>Hủy sửa</button>
              </div>
            </form>
          </section>

          <section class="progress-section" aria-labelledby="packLibraryTitle">
            <div class="section-heading section-heading--compact">
              <div><p class="eyebrow">Thư viện</p><h2 id="packLibraryTitle">Gói đã lưu</h2></div>
              <div class="button-row pack-library-actions"><button class="secondary-button" type="button" id="importPacksBtn">Nhập tệp</button><button class="secondary-button" type="button" id="exportPacksBtn">Xuất tất cả</button><input id="importPacksInput" aria-label="Nhập tệp gói nội dung" type="file" accept="application/json,.json" hidden></div>
            </div>
            <div id="packLibraryList" class="pack-library-list"></div>
          </section>

          <aside class="pack-safety-note"><strong>Riêng tư:</strong> ảnh và bản thu chỉ được lưu cục bộ trong trình duyệt. App không tự bật camera/mic, không tải lên máy chủ và không gửi cho bên thứ ba. Chỉ thêm ảnh/giọng khi người lớn chủ động chọn. Tệp xuất có thể chứa ảnh/giọng và nên được xem là dữ liệu riêng tư.</aside>
        </div>
      </section>

      <section class="screen" id="settingsScreen" data-screen="settings" aria-labelledby="settingsTitle">
        <div class="page-narrow">
          <div class="page-heading-row">
            <div>
              <p class="eyebrow">Trung tâm dễ tiếp cận</p>
              <h1 id="settingsTitle">Tạo một môi trường dễ chịu hơn</h1>
              <p class="page-lead">
                Không cần chọn nhãn chẩn đoán. Chỉ chọn cách hiển thị, âm thanh và nhịp chơi phù hợp lúc này.
              </p>
            </div>
            <div class="settings-preview" aria-hidden="true"><span>Aa</span><span>◐</span><span>Ⅱ</span></div>
          </div>

          <div class="preset-row" aria-label="Cài đặt nhanh">
            <button class="preset-card" type="button" data-preset="calm"><strong>Dịu</strong><span>ít chuyển động • nút lớn</span></button>
            <button class="preset-card" type="button" data-preset="balanced"><strong>Cân bằng</strong><span>nhịp vừa • nhãn rõ • hiệu ứng nhẹ</span></button>
            <button class="preset-card" type="button" data-preset="focus"><strong>Tập trung</strong><span>tương phản cao • ít trang trí • chữ lớn</span></button>
                      <button class="preset-card" type="button" data-preset="preschool"><strong>Hỗ trợ cao</strong><span>2 lựa chọn • cấu trúc ổn định • gợi ý ít lỗi • AAC luôn sẵn</span></button>
          </div>

          <div class="settings-grid">
            <fieldset class="settings-card">
              <legend>Giao diện</legend>
              <label class="choice-row">
                <input type="radio" name="visualMode" value="calm">
                <span><strong>Dịu</strong><small>Màu mềm, nền ổn định.</small></span>
              </label>
              <label class="choice-row">
                <input type="radio" name="visualMode" value="bright">
                <span><strong>Tươi</strong><small>Nhiều màu hơn nhưng không nhấp nháy.</small></span>
              </label>
              <label class="toggle-row">
                <input type="checkbox" id="highContrastSetting">
                <span><strong>Tương phản cao</strong><small>Tăng ranh giới và độ nổi của nút.</small></span>
              </label>
            </fieldset>

            <fieldset class="settings-card">
              <legend>Chuyển động & âm thanh</legend>
              <label class="toggle-row">
                <input type="checkbox" id="reduceMotionSetting">
                <span><strong>Giảm chuyển động</strong><small>Tắt hiệu ứng không cần thiết.</small></span>
              </label>
              <label class="toggle-row">
                <input type="checkbox" id="soundSetting">
                <span><strong>Âm thanh nhẹ</strong><small>Chỉ bổ sung cảm giác, không mang thông tin bắt buộc.</small></span>
              </label>
              <label class="toggle-row">
                <input type="checkbox" id="narrationSetting">
                <span><strong>Tự đọc hướng dẫn</strong><small>Dùng giọng đọc có sẵn trên thiết bị.</small></span>
              </label>
            </fieldset>

            <fieldset class="settings-card settings-card--display-controls">
              <legend>Chữ dễ đọc & nút</legend>
              <label class="select-row" for="textSizeSetting">
                <span><strong>Cỡ chữ</strong><small>Mặc định dùng chữ lớn, thoáng và dễ đọc.</small></span>
                <select id="textSizeSetting">
                  <option value="1">Dễ đọc · 18 px</option>
                  <option value="1.15">Lớn · khoảng 21 px</option>
                  <option value="1.3">Rất lớn · khoảng 23 px</option>
                </select>
              </label>
              <label class="toggle-row">
                <input type="checkbox" id="largeTargetsSetting">
                <span><strong>Nút lớn</strong><small>Tăng diện tích chạm.</small></span>
              </label>
              <label class="toggle-row">
                <input type="checkbox" id="preschoolModeSetting">
                <span><strong>Chế độ mầm non</strong><small>Giảm chữ ở màn hình chơi, tăng hình lớn và ưu tiên giọng đọc.</small></span>
              </label>
              <label class="toggle-row">
                <input type="checkbox" id="labelsSetting">
                <span><strong>Hiện nhãn chữ</strong><small>Bật khi người lớn muốn thêm chữ dưới biểu tượng.</small></span>
              </label>
            </fieldset>

            <fieldset class="settings-card settings-card--support-profile">
              <legend>Mức hỗ trợ học & giao tiếp</legend>
              <label class="select-row" for="supportLevelSetting">
                <span><strong>Mức hỗ trợ mặc định</strong><small>Không phải “mức năng lực”. Chỉ quyết định lượng thông tin xuất hiện cùng lúc.</small></span>
                <select id="supportLevelSetting">
                  <option value="high">Hỗ trợ cao · 2 lựa chọn · cấu trúc ổn định</option>
                  <option value="medium">Hỗ trợ vừa · tối đa 3 lựa chọn</option>
                  <option value="low">Ít hỗ trợ hơn · cho phép thêm lựa chọn</option>
                </select>
              </label>
              <label class="toggle-row">
                <input type="checkbox" id="stableDifficultySetting">
                <span><strong>Giữ độ khó ổn định</strong><small>Không tự tăng độ khó sau khi trẻ làm đúng. Mặc định bật.</small></span>
              </label>
              <label class="toggle-row">
                <input type="checkbox" id="errorlessSupportSetting">
                <span><strong>Gợi ý ít lỗi</strong><small>Sau lựa chọn chưa đúng, app chỉ ngay lựa chọn nên thử thay vì lặp báo sai.</small></span>
              </label>
              <label class="toggle-row">
                <input type="checkbox" id="showAdvancedActivitiesSetting">
                <span><strong>Hiện hoạt động nâng cao</strong><small>Mở thêm quy luật, phân loại và trình tự trừu tượng khi trẻ đã quen.</small></span>
              </label>
            </fieldset>

            <fieldset class="settings-card">
              <legend>Nhịp hỗ trợ</legend>
              <label class="select-row" for="paceSetting">
                <span><strong>Nhịp xử lý</strong><small>Ảnh hưởng thời gian xem thẻ và chuyển chặng.</small></span>
                <select id="paceSetting">
                  <option value="gentle">Chậm rãi</option>
                  <option value="steady">Vừa phải</option>
                </select>
              </label>
              <label class="toggle-row">
                <input type="checkbox" id="autoHintSetting">
                <span><strong>Gợi ý chủ động</strong><small>Đề nghị trợ giúp sau vài lần thử, không tự làm thay.</small></span>
              </label>
              <label class="select-row" for="breakSetting">
                <span><strong>Nhắc nghỉ</strong><small>Chỉ gợi ý, không khóa hoạt động.</small></span>
                <select id="breakSetting">
                  <option value="3">Sau 3 phút</option>
                  <option value="5">Sau 5 phút</option>
                  <option value="8">Sau 8 phút</option>
                  <option value="0">Không nhắc</option>
                </select>
              </label>
            </fieldset>

            <fieldset class="settings-card settings-card--access">
              <legend>Điều khiển thay thế</legend>
              <label class="toggle-row">
                <input type="checkbox" id="switchScanningSetting">
                <span><strong>Quét bằng một nút</strong><small>Một khung sáng lần lượt đi qua các lựa chọn; Space/Enter kích hoạt mục đang sáng.</small></span>
              </label>
              <label class="select-row" for="scanSpeedSetting">
                <span><strong>Tốc độ quét</strong><small>Có thể dùng quét tự động hoặc tự chuyển bằng phím mũi tên.</small></span>
                <select id="scanSpeedSetting">
                  <option value="2500">Rất chậm · 2,5 giây</option>
                  <option value="1800">Chậm · 1,8 giây</option>
                  <option value="1200">Vừa · 1,2 giây</option>
                  <option value="0">Thủ công bằng ← →</option>
                </select>
              </label>
              <p class="setting-note">Quét chỉ chạy trong màn chơi và bảng giao tiếp. Chuột, cảm ứng và bàn phím vẫn hoạt động bình thường.</p>
            </fieldset>
          </div>

          <div class="settings-actions">
            <button class="primary-button" type="button" id="saveSettingsBtn">Lưu cách chơi</button>
            <button class="quiet-button" type="button" id="restoreDefaultsBtn">Khôi phục mặc định dễ chịu</button>
          </div>
        </div>
      </section>

      <section class="screen" id="completeScreen" data-screen="complete" aria-labelledby="completeTitle">
        <div class="complete-card">
          <div class="complete-art" aria-hidden="true">
            <span class="complete-sprout">❧</span>
            <span class="complete-ring"></span>
          </div>
          <p class="eyebrow">Đã xong</p>
          <h1 id="completeTitle">Xong rồi</h1>
          <p id="completeMessage">Con muốn chơi lại hay về trang đầu?</p>
          <div class="session-reflection" id="sessionReflection"></div>
          <div class="complete-actions">
            <button class="primary-button" type="button" id="playAgainBtn">Chơi lại</button>
            <button class="secondary-button" type="button" data-route="home">Về trang đầu</button>
          </div>
        </div>
      </section>
    </main>
  </div>

  <div class="toast toast--info" id="toast" role="status" aria-live="polite" aria-atomic="true">
    <span class="toast-icon" aria-hidden="true"><svg class="ui-icon"><use id="toastIconUse" href="#ui-info"></use></svg></span>
    <span class="toast-message" id="toastMessage"></span>
  </div>


  <div class="modal-backdrop app-dialog-backdrop" id="appDialog" hidden>
    <section class="modal-card app-dialog-card" role="dialog" aria-modal="true" aria-labelledby="appDialogTitle" aria-describedby="appDialogMessage">
      <div class="app-dialog-icon" id="appDialogIcon" aria-hidden="true">
        <svg class="ui-icon"><use id="appDialogIconUse" href="#ui-info"></use></svg>
      </div>
      <p class="eyebrow" id="appDialogEyebrow">Xác nhận</p>
      <h2 id="appDialogTitle">Bạn có chắc không?</h2>
      <p id="appDialogMessage"></p>
      <div class="app-dialog-detail" id="appDialogDetail" hidden></div>
      <div class="modal-actions app-dialog-actions">
        <button class="secondary-button" type="button" id="appDialogCancelBtn">Quay lại</button>
        <button class="primary-button" type="button" id="appDialogConfirmBtn">Tiếp tục</button>
      </div>
    </section>
  </div>

  <div class="modal-backdrop" id="pauseModal" hidden>
    <section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="pauseTitle">
      <div class="pause-visual"><svg class="ui-icon pause-leaf-icon" aria-hidden="true"><use href="#ui-leaf"></use></svg></div>
      <p class="eyebrow">Tạm dừng</p>
      <h2 id="pauseTitle">Con nghỉ một chút nhé.</h2>
      <p>Không cần vội. Khi sẵn sàng, con tự chọn chơi tiếp hoặc xong.</p>
      <div class="modal-actions">
        <button class="primary-button" type="button" id="resumeBtn">Tiếp tục</button>
        <button class="secondary-button" type="button" id="finishFromPauseBtn">Kết thúc buổi chơi</button>
      </div>
    </section>
  </div>

  <div class="modal-backdrop communication-backdrop" id="communicationModal" hidden>
    <section class="modal-card communication-card" role="dialog" aria-modal="true" aria-labelledby="communicationTitle">
      <div class="communication-heading"><div><p class="eyebrow">Bảng giao tiếp nhanh</p><h2 id="communicationTitle">Con cần…</h2></div><button class="quiet-button" type="button" id="closeCommunicationBtn" aria-label="Đóng bảng giao tiếp">Đóng</button></div>
      <p class="communication-intro">Chạm vào hình để nói điều con cần. Con không cần nói thành tiếng.</p>
      <div class="communication-grid communication-grid--core">
        <button type="button" data-comm="help" data-voice="Giúp con"><span aria-hidden="true">🙋</span><strong>Giúp con</strong></button>
        <button type="button" data-comm="pause" data-voice="Con muốn nghỉ"><span aria-hidden="true">🌿</span><strong>Nghỉ</strong></button>
        <button type="button" data-comm="no" data-voice="Không"><span aria-hidden="true">✋</span><strong>Không</strong></button>
        <button type="button" data-comm="more" data-voice="Thêm nữa"><span aria-hidden="true">➕</span><strong>Thêm nữa</strong></button>
        <button type="button" data-comm="finish" data-voice="Con xong rồi"><span aria-hidden="true">✓</span><strong>Xong rồi</strong></button>
        <button type="button" data-comm="hurt" data-voice="Con khó chịu"><span aria-hidden="true">😣</span><strong>Khó chịu</strong></button>
      </div>
      <button class="communication-more-button" type="button" id="communicationMoreBtn" aria-expanded="false">Thêm lựa chọn</button>
      <div class="communication-grid communication-grid--more" id="communicationMoreGrid" hidden>
        <button type="button" data-comm="quiet" data-voice="Yên hơn"><span aria-hidden="true">🤫</span><strong>Yên hơn</strong></button>
        <button type="button" data-comm="explain" data-voice="Nói lại"><span aria-hidden="true">↻</span><strong>Nói lại</strong></button>
      </div>
      <p class="communication-model-note">Người lớn có thể vừa nói vừa chạm biểu tượng để làm mẫu. Không ép trẻ phải lặp lại bằng lời nói.</p>
    </section>
  </div>



  <div class="modal-backdrop game-info-backdrop" id="gameInfoModal" hidden>
    <section class="modal-card game-info-card" role="dialog" aria-modal="true" aria-labelledby="gameInfoTitle">
      <button class="quiet-button modal-close" type="button" id="closeGameInfoBtn" aria-label="Đóng">Đóng</button>
      <div class="game-info-hero">
        <div class="game-info-icon" id="gameInfoIcon" aria-hidden="true">◆</div>
        <div>
          <p class="eyebrow">Thông tin hoạt động</p>
          <h2 id="gameInfoTitle">Ghép hình</h2>
          <p id="gameInfoSummary"></p>
        </div>
      </div>

      <div class="game-info-section game-info-section--wonder">
        <p class="wonder-label">PHÙ HỢP VỚI AI?</p>
        <h3>Phù hợp với ai?</h3>
        <p class="game-info-audience">Được thiết kế cho trẻ tự kỷ có khuyết tật trí tuệ; các thẻ dưới đây mô tả nhu cầu hỗ trợ cụ thể mà hoạt động này phù hợp hơn.</p>
        <div class="info-chip-list" id="gameInfoWho"></div>
      </div>

      <div class="game-info-section game-info-section--wonder">
        <p class="wonder-label">HOẠT ĐỘNG DIỄN RA THẾ NÀO?</p>
        <h3>Trò chơi diễn ra thế nào?</h3>
        <p id="gameInfoAbout"></p>
      </div>

      <div class="game-info-section game-info-section--wonder">
        <p class="wonder-label">MỤC TIÊU LUYỆN TRONG HOẠT ĐỘNG</p>
        <h3>Kỹ năng được thực hành trong game</h3>
        <div class="skill-category-list" id="gameInfoSkills"></div>
      </div>

      <div class="game-info-section game-info-section--wonder">
        <p class="wonder-label">THÔNG TIN BUỔI CHƠI</p>
        <h3>Một phiên chơi trông như thế nào?</h3>
        <div class="session-info-grid" id="gameInfoSession"></div>
      </div>

      <div class="game-info-two-col">
        <div class="game-info-section">
          <p class="wonder-label">CÁCH NGƯỜI LỚN HỖ TRỢ</p><h3>Cách người lớn hỗ trợ</h3>
          <ul id="gameInfoSupport"></ul>
        </div>
        <div class="game-info-section">
          <p class="wonder-label">CÁCH TRUY CẬP</p><h3>Cách truy cập</h3>
          <ul id="gameInfoAccess"></ul>
        </div>
      </div>

      <div class="modal-actions">
        <button class="primary-button" type="button" id="startFromGameInfoBtn">Chơi hoạt động này</button>
        <button class="secondary-button" type="button" id="closeGameInfoBtnBottom">Quay lại thư viện</button>
      </div>
      <p class="game-info-disclaimer">Đây là mô tả mục tiêu luyện tập trong game, không phải cam kết hiệu quả lâm sàng.</p>
    </section>
  </div>

  <div class="modal-backdrop adult-gate-backdrop" id="adultGateModal" hidden>
    <section class="modal-card adult-gate-card" role="dialog" aria-modal="true" aria-labelledby="adultGateTitle">
      <button class="quiet-button modal-close" type="button" id="closeAdultGateBtn" aria-label="Đóng">Đóng</button>
      <div class="adult-lock-icon"><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#ui-lock"></use></svg></div>
      <p class="eyebrow">Khu vực người lớn</p>
      <h2 id="adultGateTitle">Nhấn giữ để mở</h2>
      <p id="adultGateHelp">Nhấn và giữ nút bên dưới khoảng 2 giây. Không cần PIN và app không lưu mật khẩu.</p>
      <button class="adult-hold-button" type="button" id="adultHoldBtn">
        <span class="adult-hold-progress" id="adultHoldProgress" aria-hidden="true"></span>
        <span class="adult-hold-content"><svg class="ui-icon adult-hold-icon" aria-hidden="true" focusable="false"><use href="#ui-hand"></use></svg><strong>Nhấn giữ 2 giây</strong></span>
      </button>
      <div class="adult-menu" id="adultMenu" hidden>
        <button type="button" data-adult-destination="progress"><svg class="ui-icon adult-menu-icon" aria-hidden="true" focusable="false"><use href="#ui-progress"></use></svg><strong>Tiến trình</strong></button>
        <button type="button" data-adult-destination="guide"><svg class="ui-icon adult-menu-icon" aria-hidden="true" focusable="false"><use href="#ui-activities"></use></svg><strong>Thư viện hoạt động</strong></button>
        <button type="button" data-adult-destination="packs"><svg class="ui-icon adult-menu-icon" aria-hidden="true" focusable="false"><use href="#ui-content"></use></svg><strong>Nội dung</strong></button>
        <button type="button" data-adult-destination="settings"><svg class="ui-icon adult-menu-icon" aria-hidden="true" focusable="false"><use href="#ui-settings"></use></svg><strong>Cài đặt</strong></button>
        <button type="button" id="adultLockNowBtn" class="adult-menu-lock"><svg class="ui-icon adult-menu-icon" aria-hidden="true" focusable="false"><use href="#ui-lock"></use></svg><strong>Khóa lại ngay</strong></button>
      </div>
      <small class="adult-unlock-note">Sau 5 phút không có thao tác trong khu vực người lớn, app sẽ tự khóa lại.</small>
    </section>
  </div>

  <noscript><div class="noscript-message">Trò chơi cần JavaScript để hoạt động.</div></noscript>
  <script src="app.js" defer></script>
</body>
</html>
