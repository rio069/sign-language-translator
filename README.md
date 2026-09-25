# 🤟 HandSpeak AI — Real-Time Sign Language Translator & Interactive Guide

**HandSpeak AI** is a real-time American Sign Language (ASL) and gesture-to-text translator powered by computer vision. It features a modern, side-by-side user interface: the camera tracking & translation engine on the left, and a visual instruction manual and practice guide right beside it.

---

## ✨ Key Features

1. **Side-by-Side Dual Panel Layout**:
   - **Left Panel (Camera & Translator)**: Live webcam feed with 21-point hand skeleton tracking, detection confidence meters, hold-to-confirm progress bar, and real-time finger posture telemetry.
   - **Right Panel (Visual Instructions & Reference Library)**: Illustrated hand diagrams, step-by-step finger instructions, category filters, and search bar.

2. **Real-Time Landmark Recognition**:
   - Uses Google MediaPipe Hands with a scale-invariant, 3D geometric vector analyzer.
   - Accurately distinguishes subtle finger states (finger curls, inter-finger distances, angles, and thumb placement).

3. **Sentence Builder & Speech Synthesis**:
   - Converts recognized signs into continuous sentences with customizable hold-time debouncing.
   - Includes **Space (␣)**, **Backspace (⌫)**, **Clear (🗑)**, and **Copy (📋)**.
   - **Text-to-Speech (TTS)**: Reads completed sentences aloud with natural voice synthesis.

4. **Interactive Practice & Challenge Mode**:
   - Switch between **Live Translator** and **Interactive Practice** modes.
   - The system challenges you to sign specific letters or phrases, guides your posture, and rewards you with score points and celebration chimes upon success!

5. **Zero External Dependencies**:
   - Built with pure HTML5, CSS3, Modern JavaScript, and MediaPipe.
   - Includes a standalone Python runner (`server.py`) using only the Python standard library.

---

## 🚀 Quick Start

### Option 1: Run with Python Server (Recommended)
From your terminal:
```bash
python3 server.py
```
This automatically starts a local server and opens **HandSpeak AI** in your default web browser (`http://localhost:8000`).

### Option 2: Open Directly
You can also open `index.html` directly in Chrome, Safari, Edge, or Brave:
```bash
open index.html
```

---

## ✋ Supported Signs & Gestures

### 🔤 ASL Alphabet (Fingerspelling)
- **A**: Fist with thumb resting straight upright along the side of index finger.
- **B**: Four fingers straight up together, thumb folded flat across palm.
- **C**: Hand curved in a 'C' cup shape.
- **D**: Index finger pointing up; middle, ring, pinky touch thumb in a loop.
- **E**: All fingers curled down tightly with fingertips resting on thumb.
- **F**: Thumb and index touching to form an 'O' ring; other 3 fingers extended up.
- **I**: Only pinky finger extended straight up.
- **L**: Classic right-angle 'L' shape (index up, thumb out sideways).
- **O**: All four fingertips touch thumb tip forming a closed circle.
- **U**: Index and middle fingers extended straight up pressed tightly together.
- **V**: Index and middle fingers extended spread apart in a 'V'.
- **W**: Index, middle, and ring fingers extended up spread apart; pinky tucked.
- **Y**: Thumb and pinky extended outwards ('Hang Loose' / Shaka shape).

### 💬 Common Words & Gestures
- **HELLO / OPEN PALM**: 5 fingers fully extended and spread facing camera.
- **I LOVE YOU (🤟)**: Universal sign (Thumb, Index, and Pinky extended).
- **YES / THUMBS UP**: Fist with thumb pointing straight up.
- **NO / THUMBS DOWN**: Fist with thumb pointing straight down.
- **PEACE / VICTORY (✌️)**: Index and middle fingers spread in a V.
- **OK (ASL K-Sign)**: Index finger up, middle finger angled forward, thumb tucked between them (authentic ASL sign for 'OK', distinct from letter F).
- **ROCK ON (🤘)**: Index and pinky up, thumb folding down middle and ring.

### 🔢 Numbers
- **1**: Index pointing straight up.
- **2**: Index and middle fingers up.
- **3**: Thumb, index, and middle fingers extended (ASL 3).
- **4**: Four fingers extended upright, thumb folded across palm.
- **5**: All five fingers spread wide.

---

## 🎯 Pro Tips for Accurate Recognition

1. **Camera Framing**: Position your hand roughly 1.5 to 2.5 feet (45–75 cm) in front of the camera, centered in the frame.
2. **Lighting**: Ensure good front lighting on your hand so the landmarks can be tracked crisply without motion blur.
3. **Palm Orientation**: Keep your palm facing toward the camera lens for optimal finger landmark visibility.
4. **Hold to Confirm**: When signing a letter, hold your hand steady for approximately half a second (~0.5s); the green ring will fill up and automatically commit the letter into the text buffer with an audio chime!

---

## 📁 File Structure

```
├── index.html           # Main application web interface (Side-by-Side UI)
├── css/
│   └── styles.css       # Glassmorphism styling, responsive layout, dark theme
├── js/
│   ├── signs_data.js    # Database of signs, SVG diagrams, steps, and tips
│   ├── gesture_rules.js # Geometric feature extractor and ASL classifier
│   ├── hand_detector.js # Camera stream and MediaPipe skeleton renderer
│   ├── speech.js        # Text-to-Speech & Web Audio feedback chimes
│   └── app.js           # Main coordinator and event controller
├── server.py            # Zero-dependency Python HTTP server runner
└── README.md            # Complete user guide and documentation
```
