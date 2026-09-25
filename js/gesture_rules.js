/**
 * Geometric Landmark Feature Extractor & ASL Classifier.
 * Highly robust, scale-invariant, orientation-aware.
 */

class GestureClassifier {
  constructor() {
    this.history = [];
    this.historySize = 6; // smoothing window
    this.lastConfirmedSign = null;
    this.confirmCount = 0;
    this.requiredHoldFrames = 10; // ~0.5s at 20-30fps
    this.hasCommittedCurrent = false;
    this.lastCandidate = null;
  }

  // 2D Euclidean Distance
  dist2d(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // 3D Euclidean Distance (using normalized z when available)
  dist3d(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dz = (p1.z && p2.z) ? (p1.z - p2.z) : 0;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  // Extract normalized biometric features
  extractFeatures(landmarks) {
    if (!landmarks || landmarks.length < 21) return null;

    const lm = landmarks;
    const wrist = lm[0];

    // Reference scale: distance from wrist (0) to middle finger MCP (9)
    const palmSize = this.dist2d(wrist, lm[9]) || 0.1;

    // Helper: calculate curl ratio of a finger
    // ratio = distance(MCP, TIP) / (sum of segment lengths)
    // Straight finger: ratio >= 0.75
    // Bent / curled: ratio < 0.55
    const getFingerCurl = (mcpIdx, pipIdx, dipIdx, tipIdx) => {
      const seg1 = this.dist2d(lm[mcpIdx], lm[pipIdx]);
      const seg2 = this.dist2d(lm[pipIdx], lm[dipIdx]);
      const seg3 = this.dist2d(lm[dipIdx], lm[tipIdx]);
      const totalLen = seg1 + seg2 + seg3;
      const directDist = this.dist2d(lm[mcpIdx], lm[tipIdx]);
      return totalLen > 0 ? (directDist / totalLen) : 0;
    };

    // Calculate curl for 4 fingers
    const indexCurl = getFingerCurl(5, 6, 7, 8);
    const middleCurl = getFingerCurl(9, 10, 11, 12);
    const ringCurl = getFingerCurl(13, 14, 15, 16);
    const pinkyCurl = getFingerCurl(17, 18, 19, 20);

    // Thumb curl & extension
    const thumbSeg1 = this.dist2d(lm[1], lm[2]);
    const thumbSeg2 = this.dist2d(lm[2], lm[3]);
    const thumbSeg3 = this.dist2d(lm[3], lm[4]);
    const thumbLen = thumbSeg1 + thumbSeg2 + thumbSeg3;
    const thumbDirect = this.dist2d(lm[1], lm[4]);
    const thumbCurl = thumbLen > 0 ? (thumbDirect / thumbLen) : 0;

    // Thumb distance to index MCP (5) and pinky MCP (17)
    const thumbToIndexMcp = this.dist2d(lm[4], lm[5]) / palmSize;
    const thumbToPinkyMcp = this.dist2d(lm[4], lm[17]) / palmSize;
    const thumbToIndexTip = this.dist2d(lm[4], lm[8]) / palmSize;
    const thumbToMiddleTip = this.dist2d(lm[4], lm[12]) / palmSize;
    const indexToMiddleTip = this.dist2d(lm[8], lm[12]) / palmSize;

    // Is finger extended?
    const isIndexExtended = indexCurl > 0.72 && lm[8].y < lm[6].y;
    const isMiddleExtended = middleCurl > 0.72 && lm[12].y < lm[10].y;
    const isRingExtended = ringCurl > 0.72 && lm[16].y < lm[14].y;
    const isPinkyExtended = pinkyCurl > 0.72 && lm[20].y < lm[18].y;

    // Thumb state analysis
    // Thumb is pointing UP if tip.y is significantly above MCP.y and IP.y
    const isThumbUp = lm[4].y < lm[2].y - 0.05 && thumbCurl > 0.65;
    // Thumb is pointing DOWN if tip.y is significantly below MCP.y
    const isThumbDown = lm[4].y > lm[2].y + 0.05 && thumbCurl > 0.65;
    // Thumb is extended sideways if far from index MCP
    const isThumbOut = thumbToIndexMcp > 0.7 && thumbCurl > 0.65;
    // Thumb is folded across palm if close to index/middle base
    const isThumbFolded = thumbToIndexMcp < 0.55;

    // Hand orientation
    let orientation = 'UPRIGHT';
    const palmDy = lm[9].y - wrist.y;
    const palmDx = lm[9].x - wrist.x;
    if (Math.abs(palmDx) > Math.abs(palmDy) * 1.5) {
      orientation = palmDx > 0 ? 'RIGHT' : 'LEFT';
    } else if (palmDy > 0.1) {
      orientation = 'DOWNWARD';
    }

    return {
      palmSize,
      curls: {
        thumb: thumbCurl,
        index: indexCurl,
        middle: middleCurl,
        ring: ringCurl,
        pinky: pinkyCurl
      },
      extended: {
        thumb: isThumbUp || isThumbOut,
        thumbUp: isThumbUp,
        thumbDown: isThumbDown,
        thumbOut: isThumbOut,
        thumbFolded: isThumbFolded,
        index: isIndexExtended,
        middle: isMiddleExtended,
        ring: isRingExtended,
        pinky: isPinkyExtended
      },
      distances: {
        thumbToIndexTip,
        thumbToMiddleTip,
        indexToMiddleTip,
        thumbToIndexMcp
      },
      orientation,
      landmarks: lm
    };
  }

  // Classify hand landmarks into known signs
  classify(landmarks) {
    const f = this.extractFeatures(landmarks);
    if (!f) return null;

    const { extended, curls, distances, landmarks: lm } = f;
    const extCount = [extended.index, extended.middle, extended.ring, extended.pinky].filter(Boolean).length;

    let detectedId = null;
    let confidence = 0.85;

    // 1. HELLO / NUM_5: All 5 fingers extended spread
    if (extCount === 4 && (extended.thumbOut || extended.thumbUp)) {
      detectedId = "HELLO";
      confidence = 0.95;
    }
    // 2. I LOVE YOU (🤟): Thumb, Index, Pinky extended, Middle & Ring curled
    else if (extended.index && extended.pinky && !extended.middle && !extended.ring && extended.thumbOut) {
      detectedId = "ILY";
      confidence = 0.97;
    }
    // 3. Y ("Hang Loose"): Thumb and Pinky extended, Index, Middle, Ring curled
    else if (!extended.index && !extended.middle && !extended.ring && extended.pinky && extended.thumbOut) {
      detectedId = "Y";
      confidence = 0.94;
    }
    // 4. L: Index up, Thumb out perpendicular, others curled
    else if (extended.index && !extended.middle && !extended.ring && !extended.pinky && extended.thumbOut) {
      detectedId = "L";
      confidence = 0.96;
    }
    // 5. THUMBS UP / YES: 4 fingers curled, thumb pointing straight UP
    else if (extCount === 0 && extended.thumbUp && f.curls.thumb > 0.7) {
      detectedId = "THUMBS_UP";
      confidence = 0.95;
    }
    // 5b. THUMBS DOWN / NO: 4 fingers curled, thumb pointing straight DOWN
    else if (extCount === 0 && extended.thumbDown && f.curls.thumb > 0.7) {
      detectedId = "THUMBS_DOWN";
      confidence = 0.95;
    }
    // 5c. ROCK ON / HORNS (🤘): Index and pinky extended, middle/ring curled, thumb NOT out
    else if (extended.index && extended.pinky && !extended.middle && !extended.ring && !extended.thumbOut) {
      detectedId = "ROCK";
      confidence = 0.94;
    }
    // 6. PEACE / V vs U: Index and Middle extended, Ring & Pinky curled
    else if (extended.index && extended.middle && !extended.ring && !extended.pinky) {
      if (distances.indexToMiddleTip >= 0.22) {
        detectedId = "V"; // or PEACE
        confidence = 0.93;
      } else {
        // Index and Middle touching together (ASL 'U')
        detectedId = "U";
        confidence = 0.91;
      }
    }
    // 7. W: Index, Middle, Ring extended, Pinky curled, Thumb folded
    else if (extended.index && extended.middle && extended.ring && !extended.pinky) {
      detectedId = "W";
      confidence = 0.92;
    }
    // 8. B / NUM_4: Four fingers extended, thumb folded across palm
    else if (extCount === 4 && extended.thumbFolded) {
      detectedId = "B";
      confidence = 0.92;
    }
    // 9. Letter F: Thumb and Index tips touching in a circle, other 3 fingers extended UP
    else if (distances.thumbToIndexTip < 0.25 && extended.middle && extended.ring && extended.pinky) {
      detectedId = "F";
      confidence = 0.95;
    }
    // 9b. OK Sign (ASL K-sign): Index extended UP, Middle angled forward, Thumb between them, Ring & Pinky curled
    else if (extended.index && curls.middle > 0.52 && !extended.ring && !extended.pinky && distances.thumbToIndexMcp < 0.58) {
      detectedId = "OK";
      confidence = 0.94;
    }
    // 10. D: Index extended up, middle/ring/pinky touch thumb tip
    else if (extended.index && !extended.middle && !extended.ring && !extended.pinky && distances.thumbToMiddleTip < 0.35) {
      detectedId = "D";
      confidence = 0.90;
    }
    // 11. NUM_1: Only Index extended up, others curled
    else if (extended.index && !extended.middle && !extended.ring && !extended.pinky && !extended.thumbOut) {
      detectedId = "NUM_1";
      confidence = 0.89;
    }
    // 12. I: Pinky extended up, Index, Middle, Ring curled, Thumb across
    else if (!extended.index && !extended.middle && !extended.ring && extended.pinky && !extended.thumbOut) {
      detectedId = "I";
      confidence = 0.93;
    }
    // 13. NUM_3: Thumb, Index, Middle extended (ASL 3)
    else if (extended.index && extended.middle && extended.thumbOut && !extended.ring && !extended.pinky) {
      detectedId = "NUM_3";
      confidence = 0.91;
    }
    // 13b. O: All fingertips curved touching thumb tip
    else if (
      distances.thumbToIndexTip < 0.26 && distances.thumbToMiddleTip < 0.28 &&
      curls.index < 0.75 && curls.middle < 0.75 && curls.ring < 0.75 &&
      !extended.index && !extended.middle
    ) {
      detectedId = "O";
      confidence = 0.90;
    }
    // 14. C: All fingers curved in arc, noticeable gap between thumb and fingers
    else if (
      curls.index > 0.45 && curls.index < 0.75 &&
      curls.middle > 0.45 && curls.middle < 0.75 &&
      curls.ring > 0.45 && curls.ring < 0.75 &&
      distances.thumbToIndexTip > 0.25 && distances.thumbToIndexTip < 0.65
    ) {
      detectedId = "C";
      confidence = 0.84;
    }
    // 15. A vs S vs E: All 4 fingers curled down
    else if (extCount === 0) {
      // If thumb is upright alongside index:
      if (lm[4].y < lm[6].y && distances.thumbToIndexMcp < 0.6) {
        detectedId = "A";
        confidence = 0.88;
      }
      // If fingers are tucked down on thumb:
      else if (curls.index < 0.45 && curls.middle < 0.45) {
        detectedId = "E";
        confidence = 0.82;
      }
    }

    // Prepare human-readable finger posture for HUD inspection
    const fingerStatus = {
      thumb: extended.thumbUp ? 'Up' : (extended.thumbDown ? 'Down' : (extended.thumbOut ? 'Out' : 'Tucked')),
      index: extended.index ? 'Extended' : (curls.index < 0.5 ? 'Curled' : 'Bent'),
      middle: extended.middle ? 'Extended' : (curls.middle < 0.5 ? 'Curled' : 'Bent'),
      ring: extended.ring ? 'Extended' : (curls.ring < 0.5 ? 'Curled' : 'Bent'),
      pinky: extended.pinky ? 'Extended' : (curls.pinky < 0.5 ? 'Curled' : 'Bent'),
      orientation: f.orientation
    };

    // Temporal smoothing / buffer
    if (detectedId) {
      this.history.push(detectedId);
      if (this.history.length > this.historySize) this.history.shift();

      // Find mode in history
      const counts = {};
      this.history.forEach(id => counts[id] = (counts[id] || 0) + 1);
      let bestSign = detectedId;
      let maxCount = 0;
      for (const [id, count] of Object.entries(counts)) {
        if (count > maxCount) {
          maxCount = count;
          bestSign = id;
        }
      }

      // Check hold-time stabilization
      let isConfirmed = false;
      let holdProgress = 0;

      if (this.lastCandidate === bestSign) {
        if (!this.hasCommittedCurrent) {
          this.confirmCount++;
          holdProgress = Math.min(1.0, this.confirmCount / this.requiredHoldFrames);
          if (this.confirmCount >= this.requiredHoldFrames) {
            isConfirmed = true;
            this.hasCommittedCurrent = true;
          }
        } else {
          // Already committed once for this held sign, stay full without repeating
          holdProgress = 1.0;
        }
      } else {
        this.lastCandidate = bestSign;
        this.confirmCount = 1;
        this.hasCommittedCurrent = false;
        holdProgress = 1 / this.requiredHoldFrames;
      }

      return {
        signId: bestSign,
        confidence: Math.round(confidence * 100),
        fingerStatus,
        holdProgress,
        isConfirmed,
        hasCommitted: this.hasCommittedCurrent,
        features: f
      };
    } else {
      this.history.shift();
      this.confirmCount = Math.max(0, this.confirmCount - 1);
      if (this.confirmCount === 0) {
        this.hasCommittedCurrent = false;
        this.lastCandidate = null;
      }
      return {
        signId: null,
        confidence: 0,
        fingerStatus,
        holdProgress: 0,
        isConfirmed: false,
        hasCommitted: false,
        features: f
      };
    }
  }

  reset() {
    this.history = [];
    this.lastCandidate = null;
    this.confirmCount = 0;
    this.hasCommittedCurrent = false;
  }
}

if (typeof window !== 'undefined') {
  window.GestureClassifier = GestureClassifier;
}
