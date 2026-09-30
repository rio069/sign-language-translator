/**
 * HandSpeak AI - Main Application Coordinator
 * Connects Camera, Gesture Recognition, Instructions Library, and Practice Engine.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements - Camera & Recognition
  const videoElem = document.getElementById('webcam');
  const canvasElem = document.getElementById('overlay-canvas');
  const startCameraBtn = document.getElementById('btn-start-camera');
  const toggleSkeletonBtn = document.getElementById('btn-toggle-skeleton');
  const cameraStatusBadge = document.getElementById('camera-status');
  const fpsBadge = document.getElementById('fps-counter');

  // Recognition HUD
  const liveSignBadge = document.getElementById('detected-sign-char');
  const liveSignName = document.getElementById('detected-sign-name');
  const confidenceBar = document.getElementById('confidence-fill');
  const confidenceText = document.getElementById('confidence-text');
  const holdProgressBar = document.getElementById('hold-progress-fill');
  const holdContainer = document.getElementById('hold-container');

  // Camera Screen Floating Overlays (AR Tag & Hover Subtitles)
  const videoCard = document.querySelector('.video-card');
  const arHandTag = document.getElementById('ar-hand-tag');
  const arTagChar = document.getElementById('ar-tag-char');
  const arTagName = document.getElementById('ar-tag-name');
  const arTagProgressFill = document.getElementById('ar-tag-progress-fill');
  const arTagCheck = document.getElementById('ar-tag-check');

  const cameraHoverSentence = document.getElementById('camera-hover-sentence');
  const camBtnSpeak = document.getElementById('cam-btn-speak');
  const camBtnSpace = document.getElementById('cam-btn-space');
  const camBtnBackspace = document.getElementById('cam-btn-backspace');
  const camBtnClear = document.getElementById('cam-btn-clear');

  // Posture Inspector Pills
  const pillThumb = document.getElementById('pill-thumb');
  const pillIndex = document.getElementById('pill-index');
  const pillMiddle = document.getElementById('pill-middle');
  const pillRing = document.getElementById('pill-ring');
  const pillPinky = document.getElementById('pill-pinky');

  // Translation Output
  const translationOutput = document.getElementById('translated-text');
  const btnSpeak = document.getElementById('btn-speak');
  const btnSpace = document.getElementById('btn-space');
  const btnBackspace = document.getElementById('btn-backspace');
  const btnClear = document.getElementById('btn-clear');
  const btnCopy = document.getElementById('btn-copy');
  const copyToast = document.getElementById('copy-toast');
  const historyList = document.getElementById('history-list');

  // Instructions & Reference Library
  const instructionsContainer = document.getElementById('instructions-grid');
  const searchInput = document.getElementById('search-signs');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const spotlightCard = document.getElementById('spotlight-card');

  // Practice Mode
  const tabTranslate = document.getElementById('tab-mode-translate');
  const tabPractice = document.getElementById('tab-mode-practice');
  const practiceBanner = document.getElementById('practice-banner');
  const practiceTargetChar = document.getElementById('practice-target-char');
  const practiceTargetName = document.getElementById('practice-target-name');
  const practiceTargetHint = document.getElementById('practice-target-hint');
  const practiceScoreElem = document.getElementById('practice-score');
  const btnPracticeSkip = document.getElementById('btn-practice-skip');

  // State
  let currentFilter = 'all';
  let searchQuery = '';
  let activeSpotlightSign = null;
  let translatedSentence = "";
  let appMode = 'translate'; // 'translate' | 'practice'
  let practiceTarget = null;
  let practiceScore = 0;
  let practiceSuccessTimer = null;

  // Initialize Engines
  const soundCtrl = new SoundController();
  const classifier = new GestureClassifier();

  const detector = new HandDetector(videoElem, canvasElem, (result) => {
    handleVisionResult(result);
  });

  // ================= CAMERA & DETECTION =================
  startCameraBtn.addEventListener('click', async () => {
    if (detector.isRunning) {
      detector.stopCamera();
      startCameraBtn.innerHTML = `
        <svg class="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
        Start Camera`;
      startCameraBtn.classList.remove('btn-danger');
      cameraStatusBadge.textContent = 'Camera Off';
      cameraStatusBadge.className = 'status-badge status-offline';
      resetHud();
    } else {
      startCameraBtn.innerHTML = `
        <svg class="w-5 h-5 mr-1.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Connecting...`;

      const res = await detector.startCamera();
      if (res.success) {
        startCameraBtn.innerHTML = `
          <svg class="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/>
          </svg>
          Stop Camera`;
        startCameraBtn.classList.add('btn-danger');
        cameraStatusBadge.textContent = 'Live Tracking';
        cameraStatusBadge.className = 'status-badge status-live';
      } else {
        alert("Camera Access Error: " + res.message + "\nPlease allow camera permission in your browser.");
        startCameraBtn.innerHTML = "Start Camera";
      }
    }
  });

  toggleSkeletonBtn.addEventListener('click', () => {
    detector.showLandmarks = !detector.showLandmarks;
    toggleSkeletonBtn.classList.toggle('active', detector.showLandmarks);
  });

  // Handle vision loop frames
  function handleVisionResult(result) {
    fpsBadge.textContent = `${result.fps} FPS`;

    if (!result.hasHand) {
      classifier.reset();
      resetHud();
      if (arHandTag) arHandTag.classList.add('hidden');
      return;
    }

    // Calculate hand position for AR Floating Tag (Mirrored for camera overlay)
    let handNormX = 50, handNormY = 50;
    if (result.landmarks && result.landmarks.length > 9) {
      const mcp = result.landmarks[9];
      handNormX = Math.max(12, Math.min(88, (1 - mcp.x) * 100));
      handNormY = Math.max(15, Math.min(75, (mcp.y - 0.14) * 100));

      if (arHandTag) {
        arHandTag.style.left = `${handNormX}%`;
        arHandTag.style.top = `${handNormY}%`;
        arHandTag.classList.remove('hidden');
      }
    }

    const classification = classifier.classify(result.landmarks);
    if (!classification) return;

    // Update Posture HUD
    updatePostureInspector(classification.fingerStatus);

    if (classification.signId) {
      const signData = SIGN_DATABASE.find(s => s.id === classification.signId);
      const displayName = signData ? signData.name : classification.signId;
      const displayChar = signData ? signData.outputChar : classification.signId;

      // Update AR Floating Hand Tag
      if (arTagChar) arTagChar.textContent = displayChar;
      if (arTagName) arTagName.textContent = displayName;
      const progressPercent = Math.round(classification.holdProgress * 100);
      if (arTagProgressFill) arTagProgressFill.style.width = `${progressPercent}%`;

      if (classification.hasCommitted) {
        if (arTagCheck) arTagCheck.classList.remove('hidden');
      } else {
        if (arTagCheck) arTagCheck.classList.add('hidden');
      }

      // Update Live Detection HUD
      liveSignBadge.textContent = displayChar;
      liveSignName.textContent = displayName;
      confidenceBar.style.width = `${classification.confidence}%`;
      confidenceText.textContent = `${classification.confidence}%`;

      // Update Hold Progress
      holdProgressBar.style.width = `${progressPercent}%`;
      holdContainer.classList.remove('hidden');

      // Check for Confirmation trigger
      if (classification.isConfirmed) {
        spawnWordPopBubble(displayChar, handNormX, handNormY);
        if (appMode === 'practice') {
          handlePracticeMatch(classification.signId);
        } else {
          commitSignToText(signData || { outputChar: displayChar });
        }
      }
    } else {
      confidenceBar.style.width = `0%`;
      confidenceText.textContent = `--`;
      holdProgressBar.style.width = `0%`;
      if (arTagProgressFill) arTagProgressFill.style.width = `0%`;
      if (arTagCheck) arTagCheck.classList.add('hidden');
    }
  }

  function spawnWordPopBubble(text, x, y) {
    if (!videoCard) return;
    const bubble = document.createElement('div');
    bubble.className = 'word-pop-bubble';
    bubble.textContent = `+ ${text}`;
    bubble.style.left = `${x}%`;
    bubble.style.top = `${y}%`;
    videoCard.appendChild(bubble);
    setTimeout(() => {
      if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
    }, 1000);
  }

  function updatePostureInspector(status) {
    if (!status) return;
    setPosturePill(pillThumb, 'Thumb', status.thumb);
    setPosturePill(pillIndex, 'Index', status.index);
    setPosturePill(pillMiddle, 'Middle', status.middle);
    setPosturePill(pillRing, 'Ring', status.ring);
    setPosturePill(pillPinky, 'Pinky', status.pinky);
  }

  function setPosturePill(elem, fingerName, state) {
    if (!elem) return;
    elem.textContent = `${fingerName}: ${state}`;
    elem.className = 'posture-pill';
    if (state === 'Extended' || state === 'Up' || state === 'Out') {
      elem.classList.add('pill-active');
    } else if (state === 'Curled' || state === 'Tucked' || state === 'Down') {
      elem.classList.add('pill-curled');
    } else {
      elem.classList.add('pill-neutral');
    }
  }

  function resetHud() {
    liveSignBadge.textContent = "--";
    liveSignName.textContent = "Show hand to camera";
    confidenceBar.style.width = "0%";
    confidenceText.textContent = "0%";
    holdProgressBar.style.width = "0%";
    if (arTagProgressFill) arTagProgressFill.style.width = "0%";
    if (arTagCheck) arTagCheck.classList.add('hidden');
    updatePostureInspector({
      thumb: '--', index: '--', middle: '--', ring: '--', pinky: '--'
    });
  }

  // ================= TEXT TRANSLATION BUFFER =================
  function commitSignToText(sign) {
    soundCtrl.playConfirmationChime();

    // Visual ripple effect on HUD
    liveSignBadge.classList.add('scale-pop');
    setTimeout(() => liveSignBadge.classList.remove('scale-pop'), 250);

    // Replace the previous text with the latest confirmed recognized sign
    translatedSentence = sign.outputChar;

    renderTranslation();
  }

  function renderTranslation() {
    // 1. Update lower panel translation box
    translationOutput.textContent = translatedSentence || "Detected words will appear here...";
    if (translatedSentence) {
      translationOutput.classList.remove('placeholder-text');
    } else {
      translationOutput.classList.add('placeholder-text');
    }

    // 2. Update FLOATING TRANSLATION OVERLAY directly ON CAMERA SCREEN
    if (cameraHoverSentence) {
      if (translatedSentence && translatedSentence.trim()) {
        cameraHoverSentence.innerHTML = `<span class="hover-text-content">${escapeHtml(translatedSentence)}</span><span class="live-caret">|</span>`;
      } else {
        cameraHoverSentence.innerHTML = `<span class="placeholder-caption">Translated words hover here...</span>`;
      }
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Camera floating quick buttons
  if (camBtnSpeak) {
    camBtnSpeak.addEventListener('click', () => {
      if (translatedSentence.trim()) soundCtrl.speak(translatedSentence.trim());
    });
  }
  if (camBtnSpace) {
    camBtnSpace.addEventListener('click', () => {
      translatedSentence += ' ';
      renderTranslation();
    });
  }
  if (camBtnBackspace) {
    camBtnBackspace.addEventListener('click', () => {
      translatedSentence = translatedSentence.slice(0, -1);
      renderTranslation();
    });
  }
  if (camBtnClear) {
    camBtnClear.addEventListener('click', () => {
      if (translatedSentence.trim()) {
        addHistoryItem(translatedSentence.trim());
      }
      translatedSentence = "";
      renderTranslation();
    });
  }

  btnSpace.addEventListener('click', () => {
    translatedSentence += ' ';
    renderTranslation();
  });

  btnBackspace.addEventListener('click', () => {
    translatedSentence = translatedSentence.slice(0, -1);
    renderTranslation();
  });

  btnClear.addEventListener('click', () => {
    if (translatedSentence.trim()) {
      addHistoryItem(translatedSentence.trim());
    }
    translatedSentence = "";
    renderTranslation();
  });

  btnSpeak.addEventListener('click', () => {
    if (translatedSentence.trim()) {
      soundCtrl.speak(translatedSentence.trim());
    }
  });

  btnCopy.addEventListener('click', () => {
    if (!translatedSentence.trim()) return;
    navigator.clipboard.writeText(translatedSentence.trim()).then(() => {
      copyToast.classList.add('show');
      setTimeout(() => copyToast.classList.remove('show'), 2000);
    });
  });

  function addHistoryItem(text) {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `
      <span class="history-text">${text}</span>
      <button class="btn-icon-mini" title="Speak">🔊</button>
    `;
    li.querySelector('button').addEventListener('click', () => {
      soundCtrl.speak(text);
    });
    historyList.prepend(li);
  }

  // ================= INSTRUCTIONS & REFERENCE LIBRARY =================
  function renderInstructionsGrid() {
    instructionsContainer.innerHTML = '';

    const filtered = SIGN_DATABASE.filter(sign => {
      const matchesCategory = (currentFilter === 'all') || (sign.type === currentFilter);
      const matchesSearch = searchQuery === '' ||
        sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.outputChar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      instructionsContainer.innerHTML = `
        <div class="col-span-full py-8 text-center text-gray-400">
          No signs found matching "${searchQuery}".
        </div>
      `;
      return;
    }

    filtered.forEach(sign => {
      const card = document.createElement('div');
      card.className = 'sign-card';
      if (activeSpotlightSign && activeSpotlightSign.id === sign.id) {
        card.classList.add('card-selected');
      }

      card.innerHTML = `
        <div class="sign-svg-wrapper">
          ${sign.svg}
        </div>
        <div class="sign-info">
          <div class="flex items-center justify-between">
            <span class="sign-title">${sign.name}</span>
            <span class="sign-badge badge-${sign.type}">${sign.badge}</span>
          </div>
          <p class="sign-desc">${sign.description}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        selectSpotlightSign(sign);
      });

      instructionsContainer.appendChild(card);
    });
  }

  function selectSpotlightSign(sign) {
    activeSpotlightSign = sign;

    // Render detailed spotlight panel
    spotlightCard.innerHTML = `
      <div class="spotlight-header">
        <div class="spotlight-title-group">
          <div class="spotlight-icon-wrap">
            ${sign.svg}
          </div>
          <div class="spotlight-title-info">
            <h3 class="spotlight-sign-title">${sign.name}</h3>
            <span class="sign-badge badge-${sign.type}">${sign.badge} · Outputs "${sign.outputChar}"</span>
          </div>
        </div>
        <button id="btn-practice-this" class="spotlight-practice-btn">
          🎯 Practice This Sign
        </button>
      </div>

      <div class="spotlight-section">
        <h4 class="spotlight-section-heading">Step-by-Step Instructions</h4>
        <ol class="instruction-steps">
          ${sign.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>

      <div class="spotlight-finger-grid">
        <div class="finger-guide-box">
          <span class="guide-label">Thumb:</span>
          <span class="guide-val">${sign.fingerState.thumb}</span>
        </div>
        <div class="finger-guide-box">
          <span class="guide-label">Index:</span>
          <span class="guide-val">${sign.fingerState.index}</span>
        </div>
        <div class="finger-guide-box">
          <span class="guide-label">Middle:</span>
          <span class="guide-val">${sign.fingerState.middle}</span>
        </div>
        <div class="finger-guide-box">
          <span class="guide-label">Ring:</span>
          <span class="guide-val">${sign.fingerState.ring}</span>
        </div>
        <div class="finger-guide-box finger-box-full">
          <span class="guide-label">Pinky:</span>
          <span class="guide-val">${sign.fingerState.pinky}</span>
        </div>
      </div>

      <div class="spotlight-tip-box">
        💡 <strong>Pro Tip:</strong> ${sign.tips}
      </div>
    `;

    spotlightCard.classList.remove('hidden');

    // Practice button inside spotlight
    const practiceBtn = document.getElementById('btn-practice-this');
    if (practiceBtn) {
      practiceBtn.addEventListener('click', () => {
        switchMode('practice');
        startPracticeWithSign(sign);
      });
    }

    // Refresh grid to highlight card
    renderInstructionsGrid();
  }

  // Filter tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-filter');
      renderInstructionsGrid();
    });
  });

  // Search input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderInstructionsGrid();
  });

  // ================= PRACTICE & LEARN MODE =================
  function switchMode(mode) {
    appMode = mode;
    if (mode === 'practice') {
      tabTranslate.classList.remove('active');
      tabPractice.classList.add('active');
      practiceBanner.classList.remove('hidden');
      if (!practiceTarget) {
        pickNextPracticeTarget();
      }
    } else {
      tabPractice.classList.remove('active');
      tabTranslate.classList.add('active');
      practiceBanner.classList.add('hidden');
    }
  }

  tabTranslate.addEventListener('click', () => switchMode('translate'));
  tabPractice.addEventListener('click', () => switchMode('practice'));

  function pickNextPracticeTarget() {
    // Pick a random sign from database
    const pool = SIGN_DATABASE;
    const next = pool[Math.floor(Math.random() * pool.length)];
    startPracticeWithSign(next);
  }

  function startPracticeWithSign(sign) {
    practiceTarget = sign;
    practiceTargetChar.textContent = sign.outputChar;
    practiceTargetName.textContent = sign.name;
    practiceTargetHint.textContent = sign.practicePrompt || sign.description;
    selectSpotlightSign(sign);
  }

  btnPracticeSkip.addEventListener('click', () => {
    pickNextPracticeTarget();
  });

  function handlePracticeMatch(matchedSignId) {
    if (!practiceTarget || matchedSignId !== practiceTarget.id) return;

    if (practiceSuccessTimer) return; // debounce celebration

    soundCtrl.playSuccessArpeggio();
    practiceScore += 10;
    practiceScoreElem.textContent = `${practiceScore} pts`;

    // Confetti or visual banner success
    practiceBanner.classList.add('practice-success-flash');

    practiceSuccessTimer = setTimeout(() => {
      practiceBanner.classList.remove('practice-success-flash');
      practiceSuccessTimer = null;
      pickNextPracticeTarget();
    }, 1200);
  }

  // Select initial default spotlight card
  if (SIGN_DATABASE.length > 0) {
    selectSpotlightSign(SIGN_DATABASE[0]);
  }
  renderInstructionsGrid();
  renderTranslation();
});
