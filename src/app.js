// Góc nhìn quanh em - Web Game
// Layout mới với sidebar header, main content, footer blocks

document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.getElementById('startGameBtn');
  const navPlayBtn = document.getElementById('navPlayBtn');
  const landingScreen = document.getElementById('landingScreen');
  const levelScreen = document.getElementById('levelScreen');
  const gameScreen = document.getElementById('gameScreen');
  const victoryScreen = document.getElementById('victoryScreen');

  // Level data
  const levels = [
    { name: 'Màu sắc', color: '#88A452', pairs: 2, grid: 4 },
    { name: 'Hình học', color: '#76B9E4', pairs: 4, grid: 8 },
    { name: 'Con số', color: '#E67E22', pairs: 5, grid: 10 },
    { name: 'Con vật', color: '#B388EB', pairs: 6, grid: 12 },
    { name: 'Cảm xúc', color: '#FFD166', pairs: 7, grid: 14 }
  ];

  // Card data cho từng cấp độ
  const cardData = [
    // Cấp 1: Màu sắc (mở rộng)
    [
      { label: 'Đỏ', value: 'red', color: '#E74C3C', emoji: '🔴', alt: 'Thẻ màu đỏ' },
      { label: 'Xanh lá', value: 'green', color: '#27AE60', emoji: '🟢', alt: 'Thẻ màu xanh lá' },
      { label: 'Xanh dương', value: 'blue', color: '#3498DB', emoji: '🔵', alt: 'Thẻ màu xanh dương' },
      { label: 'Vàng', value: 'yellow', color: '#F1C40F', emoji: '🟡', alt: 'Thẻ màu vàng' },
      { label: 'Tím', value: 'purple', color: '#9B59B6', emoji: '🟣', alt: 'Thẻ màu tím' },
      { label: 'Cam', value: 'orange', color: '#E67E22', emoji: '🟠', alt: 'Thẻ màu cam' }
    ],
    // Cấp 2: Hình học (mở rộng)
    [
      { label: 'Tròn', value: 'circle', color: '#F7CA18', emoji: '⚪', alt: 'Thẻ hình tròn' },
      { label: 'Vuông', value: 'square', color: '#22A7F0', emoji: '🟦', alt: 'Thẻ hình vuông' },
      { label: 'Chữ nhật', value: 'rect', color: '#F9690E', emoji: '▬', alt: 'Thẻ hình chữ nhật' },
      { label: 'Tam giác', value: 'triangle', color: '#8E44AD', emoji: '🔺', alt: 'Thẻ hình tam giác' },
      { label: 'Ngôi sao', value: 'star', color: '#F39C12', emoji: '⭐', alt: 'Thẻ hình ngôi sao' },
      { label: 'Tim', value: 'heart', color: '#E91E63', emoji: '❤️', alt: 'Thẻ hình tim' }
    ],
    // Cấp 3: Con số (mở rộng)
    [
      { label: 'Một', value: '1', color: '#E67E22', emoji: '1️⃣', alt: 'Số 1' },
      { label: 'Hai', value: '2', color: '#E67E22', emoji: '2️⃣', alt: 'Số 2' },
      { label: 'Ba', value: '3', color: '#E67E22', emoji: '3️⃣', alt: 'Số 3' },
      { label: 'Bốn', value: '4', color: '#E67E22', emoji: '4️⃣', alt: 'Số 4' },
      { label: 'Năm', value: '5', color: '#E67E22', emoji: '5️⃣', alt: 'Số 5' },
      { label: 'Sáu', value: '6', color: '#E67E22', emoji: '6️⃣', alt: 'Số 6' },
      { label: 'Bảy', value: '7', color: '#E67E22', emoji: '7️⃣', alt: 'Số 7' },
      { label: 'Tám', value: '8', color: '#E67E22', emoji: '8️⃣', alt: 'Số 8' },
      { label: 'Chín', value: '9', color: '#E67E22', emoji: '9️⃣', alt: 'Số 9' }
    ],
    // Cấp 4: Con vật (mở rộng)
    [
      { label: 'Mèo', value: 'cat', color: '#B388EB', emoji: '🐱', alt: 'Con mèo' },
      { label: 'Chó', value: 'dog', color: '#B388EB', emoji: '🐶', alt: 'Con chó' },
      { label: 'Cá', value: 'fish', color: '#B388EB', emoji: '🐟', alt: 'Con cá' },
      { label: 'Vịt', value: 'duck', color: '#B388EB', emoji: '🦆', alt: 'Con vịt' },
      { label: 'Thỏ', value: 'rabbit', color: '#B388EB', emoji: '🐰', alt: 'Con thỏ' },
      { label: 'Gà', value: 'chicken', color: '#B388EB', emoji: '🐔', alt: 'Con gà' },
      { label: 'Chim', value: 'bird', color: '#B388EB', emoji: '🐦', alt: 'Con chim' }
    ],
    // Cấp 5: Cảm xúc (mở rộng)
    [
      { label: 'Vui', value: 'happy', color: '#FFD166', emoji: '😊', alt: 'Khuôn mặt vui' },
      { label: 'Buồn', value: 'sad', color: '#FFD166', emoji: '😢', alt: 'Khuôn mặt buồn' },
      { label: 'Ngạc nhiên', value: 'surprised', color: '#FFD166', emoji: '😮', alt: 'Khuôn mặt ngạc nhiên' },
      { label: 'Tức giận', value: 'angry', color: '#FFD166', emoji: '😠', alt: 'Khuôn mặt tức giận' },
      { label: 'Sợ', value: 'scared', color: '#FFD166', emoji: '😱', alt: 'Khuôn mặt sợ' },
      { label: 'Bối rối', value: 'confused', color: '#FFD166', emoji: '😕', alt: 'Khuôn mặt bối rối' },
      { label: 'Tự tin', value: 'confident', color: '#FFD166', emoji: '😎', alt: 'Khuôn mặt tự tin' }
    ]
  ];

  // Âm thanh feedback
  const successAudio = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae7e2.mp3');
  
  // Âm thanh kỷ vọng/chúc mừng (level complete)
  const celebrationAudio = new Audio('https://cdn.pixabay.com/audio/2022/04/21/audio_30a5d2e8da.mp3');

  // Hàm tạo âm thanh bằng Web Audio API
  function playTone(frequency, duration, type = 'sine') {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const envelope = audioContext.createGain();
    
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.connect(envelope);
    envelope.connect(audioContext.destination);
    
    envelope.gain.setValueAtTime(0.3, audioContext.currentTime);
    envelope.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }

  // Âm thanh đúng (correct): cao & vui
  function playCorrectSound() {
    playTone(800, 0.1);
    setTimeout(() => playTone(1000, 0.1), 50);
  }

  // Âm thanh sai (incorrect): thấp & buồn
  function playIncorrectSound() {
    playTone(300, 0.15);
    setTimeout(() => playTone(200, 0.15), 75);
  }

  // Âm thanh qua ván (round complete)
  function playRoundCompleteSound() {
    playTone(523, 0.1);
    setTimeout(() => playTone(659, 0.1), 100);
    setTimeout(() => playTone(784, 0.2), 200);
  }

  // Âm thanh qua cấp độ (level complete)
  function playLevelCompleteSound() {
    const freqs = [523, 659, 784, 1047];
    freqs.forEach((f, i) => {
      setTimeout(() => playTone(f, 0.15), i * 120);
    });
  }

  function hideAllScreens() {
    landingScreen.classList.remove('active');
    levelScreen.classList.remove('active');
    gameScreen.classList.remove('active');
    victoryScreen.classList.remove('active');
  }

  function showScreen(screen) {
    hideAllScreens();
    screen.classList.add('active');
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function startGame(levelIdx) {
    const level = levels[levelIdx];
    const baseCards = cardData[levelIdx];
    const totalRounds = 3; // Số ván trong mỗi cấp độ
    let currentRound = 1;

    function playRound() {
      let cards = [];
      for (let i = 0; i < level.pairs; i++) {
        cards.push({ ...baseCards[i], id: i + '-a' });
        cards.push({ ...baseCards[i], id: i + '-b' });
      }
      cards = shuffle(cards);

      let flipped = [];
      let matched = [];
      let lock = false;

      const gameGrid = document.getElementById('gameGrid');
      const gameLevelTitle = document.getElementById('gameLevelTitle');
      const roundCounter = document.getElementById('roundCounter');
      const roundTotal = document.getElementById('roundTotal');
      
      gameLevelTitle.textContent = level.name;
      roundCounter.textContent = `Ván ${currentRound}`;
      roundTotal.textContent = totalRounds;

      const cols = Math.ceil(Math.sqrt(cards.length));
      gameGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

      function render() {
        gameGrid.innerHTML = cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return `
            <button
              class="card${isFlipped ? ' flipped' : ''}"
              style="background:${isFlipped ? card.color : '#fff'}"
              data-idx="${idx}"
              aria-label="${isFlipped ? card.alt : 'Thẻ úp'}"
              tabindex="0"
              ${matched.includes(idx) ? 'disabled' : ''}
            >
              <span class="card-face">${isFlipped ? card.emoji : '❓'}</span>
            </button>
          `;
        }).join('');

        document.querySelectorAll('.card').forEach(btn => {
          btn.onclick = handleFlip;
        });
      }

      function handleFlip(e) {
        if (lock) return;
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
        if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
        flipped.push(idx);
        render();
        if (flipped.length === 2) {
          lock = true;
          setTimeout(() => {
            const [i1, i2] = flipped;
            if (cards[i1].value === cards[i2].value) {
              matched.push(i1, i2);
              playCorrectSound();
              
              // Thêm animation shake cho 2 thẻ
              const buttons = document.querySelectorAll('.card');
              buttons[i1].classList.add('matched');
              buttons[i2].classList.add('matched');
              
              if (matched.length === cards.length) {
                setTimeout(() => {
                  playRoundCompleteSound();
                  if (currentRound < totalRounds) {
                    currentRound++;
                    playRound();
                  } else {
                    playLevelCompleteSound();
                    setTimeout(() => showVictory(levelIdx), 500);
                  }
                }, 600);
              }
            } else {
              playIncorrectSound();
            }
            flipped = [];
            lock = false;
            render();
          }, 900);
        }
      }

      showScreen(gameScreen);
      render();
    }

    playRound();
  }

  function showVictory(levelIdx) {
    const victoryMessage = document.getElementById('victoryMessage');
    victoryMessage.textContent = `Bạn đã hoàn thành tất cả 3 ván cấp độ "${levels[levelIdx].name}"!`;
    
    // Phát âm thanh kỷ vọng
    playLevelCompleteSound();
    
    const nextBtn = document.getElementById('nextRoundBtn');
    const backBtn = document.getElementById('backToLevelsBtnVictory');

    nextBtn.onclick = () => {
      if (levelIdx < levels.length - 1) {
        startGame(levelIdx + 1);
      } else {
        showScreen(levelScreen);
      }
    };

    backBtn.onclick = () => showScreen(levelScreen);

    showScreen(victoryScreen);
  }

  // Event listeners
  startBtn.onclick = () => showScreen(levelScreen);
  navPlayBtn.onclick = () => showScreen(levelScreen);

  document.querySelectorAll('.level-card').forEach(btn => {
    btn.onclick = () => {
      const levelIdx = parseInt(btn.getAttribute('data-level'));
      startGame(levelIdx);
    };
  });

  document.getElementById('backToLevelsBtn').onclick = () => showScreen(levelScreen);

  // Show landing screen on load
  showScreen(landingScreen);
});
