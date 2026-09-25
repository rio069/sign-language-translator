/**
 * Camera and MediaPipe Hands Pipeline Manager.
 * Handles webcam stream, landmark tracking, and canvas skeleton rendering.
 */

class HandDetector {
  constructor(videoElement, canvasElement, onResultsCallback) {
    this.video = videoElement;
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.onResults = onResultsCallback;

    this.hands = null;
    this.camera = null;
    this.isRunning = false;
    this.showLandmarks = true;
    this.lastFrameTime = 0;
    this.fps = 0;
    this.frameCount = 0;
    this.fpsTimer = performance.now();

    // MediaPipe Hand connections (21 landmarks)
    this.connections = [
      // Thumb
      [0, 1], [1, 2], [2, 3], [3, 4],
      // Index
      [0, 5], [5, 6], [6, 7], [7, 8],
      // Middle
      [0, 9], [9, 10], [10, 11], [11, 12],
      // Ring
      [0, 13], [13, 14], [14, 15], [15, 16],
      // Pinky
      [0, 17], [17, 18], [18, 19], [19, 20],
      // Palm cross connections
      [5, 9], [9, 13], [13, 17]
    ];

    this.initMediaPipe();
  }

  initMediaPipe() {
    if (typeof Hands === 'undefined') {
      console.warn("MediaPipe Hands library not loaded yet. Retrying in 500ms...");
      setTimeout(() => this.initMediaPipe(), 500);
      return;
    }

    try {
      this.hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      this.hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.65,
        minTrackingConfidence: 0.65
      });

      this.hands.onResults((results) => this.handleResults(results));
      console.log("MediaPipe Hands initialized successfully.");
    } catch (err) {
      console.error("Failed to initialize MediaPipe Hands:", err);
    }
  }

  async startCamera(deviceId = null) {
    try {
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
          deviceId: deviceId ? { exact: deviceId } : undefined
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.video.srcObject = stream;

      await new Promise((resolve) => {
        this.video.onloadedmetadata = () => {
          this.video.play();
          resolve();
        };
      });

      this.canvas.width = this.video.videoWidth || 640;
      this.canvas.height = this.video.videoHeight || 480;
      this.isRunning = true;

      // Start processing loop
      this.processVideoFrame();
      return { success: true };
    } catch (err) {
      console.error("Camera access error:", err);
      return {
        success: false,
        error: err.name || "CameraError",
        message: err.message
      };
    }
  }

  stopCamera() {
    this.isRunning = false;
    if (this.video && this.video.srcObject) {
      const tracks = this.video.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      this.video.srcObject = null;
    }
    // Clear canvas
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  async processVideoFrame() {
    if (!this.isRunning) return;

    if (this.video.readyState >= 2 && this.hands) {
      try {
        await this.hands.send({ image: this.video });
      } catch (e) {
        console.warn("Hand processing frame error:", e);
      }
    }

    // Calculate FPS
    this.frameCount++;
    const now = performance.now();
    if (now - this.fpsTimer >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.fpsTimer));
      this.frameCount = 0;
      this.fpsTimer = now;
    }

    if (this.isRunning) {
      requestAnimationFrame(() => this.processVideoFrame());
    }
  }

  handleResults(results) {
    // Clear canvas
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let landmarks = null;
    let handedness = null;

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      landmarks = results.multiHandLandmarks[0];
      if (results.multiHandedness && results.multiHandedness.length > 0) {
        handedness = results.multiHandedness[0].label;
      }

      if (this.showLandmarks) {
        this.drawHandSkeleton(landmarks);
      }
    }

    this.ctx.restore();

    // Fire callback with extracted data and stats
    if (this.onResults) {
      this.onResults({
        landmarks,
        handedness,
        fps: this.fps,
        hasHand: !!landmarks
      });
    }
  }

  drawHandSkeleton(landmarks) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Draw connection lines
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(79, 70, 229, 0.85)"; // Vibrant indigo
    ctx.lineCap = "round";

    for (const [i, j] of this.connections) {
      const p1 = landmarks[i];
      const p2 = landmarks[j];
      ctx.beginPath();
      ctx.moveTo(p1.x * w, p1.y * h);
      ctx.lineTo(p2.x * w, p2.y * h);
      ctx.stroke();
    }

    // Draw landmark joint nodes
    for (let i = 0; i < landmarks.length; i++) {
      const p = landmarks[i];
      const px = p.x * w;
      const py = p.y * h;

      // Fingertip points (4, 8, 12, 16, 20) get special glow
      const isTip = [4, 8, 12, 16, 20].includes(i);
      const radius = isTip ? 6.5 : 4.5;

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, 2 * Math.PI);
      ctx.fillStyle = isTip ? "#06b6d4" : "#ffffff"; // Cyan for tips, white for joints
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = isTip ? "#0891b2" : "#4338ca";
      ctx.stroke();
    }
  }
}

if (typeof window !== 'undefined') {
  window.HandDetector = HandDetector;
}
