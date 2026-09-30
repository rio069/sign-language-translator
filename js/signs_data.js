/**
 * Database of Sign Language Gestures, Instructions, and Visual Guides.
 * Includes ASL Alphabet (A-Z), Numbers (0-9), and Common Phrases / Gestures.
 */

// Helper to generate clean SVG hand diagrams for instructions
function generateHandSvg(poseType) {
  // Common styles
  const baseSkin = "#f5c59f";
  const palmColor = "#ebba94";
  const outline = "#2d3748";
  const highlight = "#4f46e5";
  const strokeW = "3.5";

  switch (poseType) {
    case 'A':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M45,95 L45,110 C45,115 75,115 75,110 L75,95" fill="${baseSkin}"/>
        <!-- Curled fingers forming fist -->
        <rect x="35" y="45" width="45" height="50" rx="12" fill="${palmColor}"/>
        <path d="M40,58 Q55,62 75,58" stroke="${outline}"/>
        <path d="M40,70 Q55,74 75,70" stroke="${outline}"/>
        <!-- Thumb upright against side -->
        <path d="M35,75 C25,65 24,42 33,34 C40,28 44,38 42,55" fill="${highlight}" fill-opacity="0.3"/>
        <path d="M35,75 C25,65 24,42 33,34 C40,28 44,38 42,55" stroke="${highlight}" stroke-width="4"/>
        <circle cx="33" cy="34" r="3" fill="${highlight}"/>
      </svg>`;

    case 'B':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M48,95 L48,110 C48,115 72,115 72,110 L72,95" fill="${baseSkin}"/>
        <!-- 4 Extended fingers straight up -->
        <rect x="38" y="15" width="10" height="55" rx="5" fill="${highlight}" fill-opacity="0.25" stroke="${highlight}"/>
        <rect x="49" y="10" width="10" height="60" rx="5" fill="${highlight}" fill-opacity="0.25" stroke="${highlight}"/>
        <rect x="60" y="12" width="10" height="58" rx="5" fill="${highlight}" fill-opacity="0.25" stroke="${highlight}"/>
        <rect x="71" y="20" width="10" height="50" rx="5" fill="${highlight}" fill-opacity="0.25" stroke="${highlight}"/>
        <!-- Palm -->
        <path d="M38,65 Q58,68 80,65 L80,95 Q58,98 38,95 Z" fill="${palmColor}"/>
        <!-- Thumb folded across palm -->
        <path d="M36,80 C36,65 52,65 62,70" stroke="${outline}" stroke-width="4"/>
      </svg>`;

    case 'C':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M50,95 L50,110 C50,115 70,115 70,110 L70,95" fill="${baseSkin}"/>
        <!-- Curved hand forming C -->
        <path d="M35,35 C55,20 85,25 90,45 C75,50 65,42 45,50" fill="${highlight}" fill-opacity="0.25" stroke="${highlight}"/>
        <path d="M35,80 C55,95 85,90 90,70 C75,65 65,72 45,65" fill="${highlight}" fill-opacity="0.25" stroke="${highlight}"/>
        <path d="M35,35 C20,55 20,65 35,80" stroke="${outline}"/>
      </svg>`;

    case 'D':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M48,95 L48,110 C48,115 72,115 72,110 L72,95" fill="${baseSkin}"/>
        <!-- Index finger up -->
        <rect x="42" y="10" width="12" height="60" rx="6" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
        <!-- Loop formed by thumb and other fingers -->
        <ellipse cx="66" cy="62" rx="18" ry="16" fill="${palmColor}"/>
        <circle cx="66" cy="62" r="7" stroke="${outline}"/>
      </svg>`;

    case 'E':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M48,95 L48,110 C48,115 72,115 72,110 L72,95" fill="${baseSkin}"/>
        <rect x="36" y="55" width="48" height="40" rx="10" fill="${palmColor}"/>
        <!-- Clamped curled fingers pointing down onto thumb -->
        <path d="M40,55 C40,35 78,35 78,55" fill="${highlight}" fill-opacity="0.2" stroke="${highlight}"/>
        <line x1="42" y1="55" x2="76" y2="55" stroke="${outline}"/>
        <line x1="40" y1="72" x2="78" y2="72" stroke="${outline}"/>
      </svg>`;

    case 'F':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M48,95 L48,110 C48,115 72,115 72,110 L72,95" fill="${baseSkin}"/>
        <!-- Middle, Ring, Pinky extended up -->
        <rect x="52" y="10" width="10" height="58" rx="5" fill="${highlight}" fill-opacity="0.2" stroke="${highlight}"/>
        <rect x="64" y="14" width="10" height="54" rx="5" fill="${highlight}" fill-opacity="0.2" stroke="${highlight}"/>
        <rect x="76" y="22" width="9" height="46" rx="4.5" fill="${highlight}" fill-opacity="0.2" stroke="${highlight}"/>
        <!-- Thumb and index touching (circle) -->
        <circle cx="44" cy="55" r="14" fill="${palmColor}" stroke="${outline}"/>
        <circle cx="44" cy="55" r="6" fill="#fff" stroke="${outline}"/>
      </svg>`;

    case 'I':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M45,95 L45,110 C45,115 75,115 75,110 L75,95" fill="${baseSkin}"/>
        <rect x="35" y="48" width="42" height="47" rx="10" fill="${palmColor}"/>
        <!-- Pinky extended straight up -->
        <rect x="72" y="12" width="11" height="55" rx="5.5" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
        <!-- Thumb crossed over fingers -->
        <path d="M35,62 Q52,65 65,60" stroke="${outline}" stroke-width="3"/>
      </svg>`;

    case 'L':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M50,95 L50,110 C50,115 74,115 74,110 L74,95" fill="${baseSkin}"/>
        <!-- Index finger pointing straight up -->
        <rect x="48" y="12" width="12" height="58" rx="6" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
        <rect x="48" y="55" width="30" height="40" rx="8" fill="${palmColor}"/>
        <!-- Thumb extended sideways 90 deg -->
        <path d="M52,70 L20,70 C16,70 16,60 22,58 L50,60" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
      </svg>`;

    case 'V':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M46,95 L46,110 C46,115 74,115 74,110 L74,95" fill="${baseSkin}"/>
        <rect x="40" y="55" width="40" height="40" rx="10" fill="${palmColor}"/>
        <!-- Index finger angled left -->
        <rect x="36" y="15" width="11" height="52" rx="5.5" transform="rotate(-15 42 60)" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
        <!-- Middle finger angled right -->
        <rect x="66" y="15" width="11" height="52" rx="5.5" transform="rotate(15 72 60)" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
        <!-- Thumb folded over ring/pinky -->
        <path d="M38,72 Q55,75 70,70" stroke="${outline}" stroke-width="3"/>
      </svg>`;

    case 'W':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M46,95 L46,110 C46,115 74,115 74,110 L74,95" fill="${baseSkin}"/>
        <rect x="40" y="58" width="40" height="37" rx="10" fill="${palmColor}"/>
        <!-- Index, Middle, Ring spread out -->
        <rect x="35" y="14" width="10" height="55" rx="5" transform="rotate(-18 40 60)" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}"/>
        <rect x="52" y="10" width="10" height="56" rx="5" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}"/>
        <rect x="68" y="14" width="10" height="55" rx="5" transform="rotate(18 73 60)" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}"/>
        <!-- Thumb holding pinky -->
        <circle cx="56" cy="72" r="8" fill="${palmColor}" stroke="${outline}"/>
      </svg>`;

    case 'Y':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M48,95 L48,110 C48,115 72,115 72,110 L72,95" fill="${baseSkin}"/>
        <rect x="40" y="48" width="40" height="47" rx="10" fill="${palmColor}"/>
        <!-- Thumb extended left -->
        <path d="M42,65 L18,52 C14,50 16,42 22,44 L44,56" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
        <!-- Pinky extended right -->
        <path d="M78,65 L102,52 C106,50 104,42 98,44 L76,56" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
      </svg>`;


    case 'HELLO':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M48,95 L48,110 C48,115 72,115 72,110 L72,95" fill="${baseSkin}"/>
        <!-- 5 fingers open wide -->
        <rect x="22" y="40" width="10" height="40" rx="5" transform="rotate(-40 27 60)" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}"/>
        <rect x="36" y="14" width="10" height="55" rx="5" transform="rotate(-15 41 40)" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}"/>
        <rect x="52" y="8" width="10" height="60" rx="5" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}"/>
        <rect x="67" y="12" width="10" height="56" rx="5" transform="rotate(12 72 40)" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}"/>
        <rect x="80" y="24" width="9" height="48" rx="4.5" transform="rotate(25 84 50)" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}"/>
        <ellipse cx="60" cy="70" rx="22" ry="20" fill="${palmColor}"/>
      </svg>`;

    case 'THUMBS_UP':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M35,92 L20,92 C15,92 15,65 20,65 L35,65" fill="${baseSkin}"/>
        <rect x="35" y="45" width="45" height="50" rx="10" fill="${palmColor}"/>
        <!-- Thumb pointing up -->
        <path d="M45,55 L45,15 C45,10 60,10 60,18 L60,55" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
      </svg>`;

    case 'O':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M48,95 L48,110 C48,115 72,115 72,110 L72,95" fill="${baseSkin}"/>
        <!-- Circle formed by all fingers touching thumb -->
        <ellipse cx="60" cy="55" rx="24" ry="26" fill="${palmColor}" stroke="${outline}"/>
        <ellipse cx="60" cy="55" rx="11" ry="13" fill="#fff" stroke="${highlight}" stroke-width="4"/>
      </svg>`;

    case 'U':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M46,95 L46,110 C46,115 74,115 74,110 L74,95" fill="${baseSkin}"/>
        <rect x="40" y="55" width="40" height="40" rx="10" fill="${palmColor}"/>
        <!-- Index and Middle fingers pressed together straight up -->
        <rect x="44" y="10" width="12" height="58" rx="6" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
        <rect x="58" y="10" width="12" height="58" rx="6" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
        <!-- Thumb folded over ring/pinky -->
        <path d="M38,70 Q55,73 70,68" stroke="${outline}" stroke-width="3"/>
      </svg>`;

    case 'ROCK':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M48,95 L48,110 C48,115 72,115 72,110 L72,95" fill="${baseSkin}"/>
        <rect x="40" y="50" width="40" height="45" rx="10" fill="${palmColor}"/>
        <!-- Index extended -->
        <rect x="42" y="12" width="11" height="55" rx="5.5" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
        <!-- Pinky extended -->
        <rect x="75" y="18" width="10" height="50" rx="5" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
        <!-- Thumb tucked across folded middle/ring -->
        <path d="M40,65 Q58,68 70,62" stroke="${outline}" stroke-width="4"/>
      </svg>`;

    case 'THUMBS_DOWN':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M35,28 L20,28 C15,28 15,55 20,55 L35,55" fill="${baseSkin}"/>
        <rect x="35" y="25" width="45" height="50" rx="10" fill="${palmColor}"/>
        <!-- Thumb pointing down -->
        <path d="M45,65 L45,105 C45,110 60,110 60,102 L60,65" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
      </svg>`;

    case 'OK':
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M48,95 L48,110 C48,115 72,115 72,110 L72,95" fill="${baseSkin}"/>
        <rect x="40" y="52" width="40" height="43" rx="10" fill="${palmColor}"/>
        <!-- Index finger straight up -->
        <rect x="42" y="12" width="11" height="55" rx="5.5" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
        <!-- Middle finger angled forward/up at 35 deg -->
        <rect x="62" y="18" width="11" height="52" rx="5.5" transform="rotate(32 67 60)" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}" stroke-width="4"/>
        <!-- Thumb placed between index and middle knuckles -->
        <path d="M38,62 C46,55 54,58 52,48 C50,42 42,46 38,55" fill="${highlight}" fill-opacity="0.4" stroke="${highlight}" stroke-width="3.5"/>
        <!-- Ring & Pinky curled -->
        <path d="M60,68 Q72,70 76,64" stroke="${outline}" stroke-width="3"/>
        <!-- Distinct green 'OK' emblem -->
        <rect x="76" y="8" width="34" height="20" rx="6" fill="#10b981" stroke="#059669" stroke-width="1.5"/>
        <text x="93" y="23" font-size="11" font-weight="900" fill="#ffffff" stroke="none" text-anchor="middle" font-family="sans-serif">OK</text>
      </svg>`;

    default:
      // Generic hand icon
      return `<svg viewBox="0 0 120 120" class="hand-svg" fill="none" stroke="${outline}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
        <rect x="40" y="45" width="40" height="50" rx="10" fill="${palmColor}"/>
        <rect x="42" y="14" width="10" height="45" rx="5" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}"/>
        <rect x="55" y="10" width="10" height="50" rx="5" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}"/>
        <rect x="68" y="16" width="10" height="44" rx="5" fill="${highlight}" fill-opacity="0.3" stroke="${highlight}"/>
      </svg>`;
  }
}

const SIGN_DATABASE = [
  // ================= COMMON PHRASES & GESTURES =================
  {
    id: "HELLO",
    name: "Hello / Open Hand",
    type: "phrase",
    badge: "Phrase",
    outputChar: "HELLO",
    svg: generateHandSvg('HELLO'),
    description: "Open hand facing forward with all 5 fingers spread naturally.",
    steps: [
      "Open your entire hand flat facing the camera.",
      "Spread all five fingers comfortably apart.",
      "Keep palm visible, angled towards the webcam.",
      "Gently hold for 1 second to translate."
    ],
    fingerState: {
      thumb: "Extended Outwards",
      index: "Extended Up",
      middle: "Extended Up",
      ring: "Extended Up",
      pinky: "Extended Up"
    },
    tips: "Great for starting a sentence or greeting someone!",
    practicePrompt: "Show an open flat hand to sign HELLO"
  },

  {
    id: "THUMBS_UP",
    name: "Thumbs Up / Good / Yes",
    type: "phrase",
    badge: "Gesture",
    outputChar: "YES",
    svg: generateHandSvg('THUMBS_UP'),
    description: "Closed fist with thumb extended straight upward.",
    steps: [
      "Make a tight fist curling all four fingers.",
      "Point your thumb straight up toward the ceiling.",
      "Hold steady in center of frame."
    ],
    fingerState: {
      thumb: "Pointing Up",
      index: "Curled",
      middle: "Curled",
      ring: "Curled",
      pinky: "Curled"
    },
    tips: "Used to confirm, say Yes, or express agreement!",
    practicePrompt: "Give a thumbs up to sign YES / GOOD"
  },
  {
    id: "PEACE",
    name: "Peace / Victory (✌️)",
    type: "phrase",
    badge: "Gesture",
    outputChar: "PEACE",
    svg: generateHandSvg('V'),
    description: "Index and middle fingers extended in a V shape.",
    steps: [
      "Extend index and middle fingers spread apart.",
      "Curl ring and pinky fingers down.",
      "Thumb locks over curled fingers.",
      "Palm faces forward."
    ],
    fingerState: {
      thumb: "Folded",
      index: "Extended",
      middle: "Extended",
      ring: "Curled",
      pinky: "Curled"
    },
    tips: "Also represents the letter V or the number 2!",
    practicePrompt: "Make a V sign for PEACE"
  },
  {
    id: "OK",
    name: "OK / All Good (ASL K-Sign)",
    type: "phrase",
    badge: "Gesture",
    outputChar: "OK",
    svg: generateHandSvg('OK'),
    description: "In ASL, 'OK' is signed using the K-handshape (or fingerspelled O-K): Index up, middle angled forward, thumb tucked between them.",
    steps: [
      "Point your index finger straight up toward the ceiling.",
      "Angle your middle finger upward and forward at about 45°.",
      "Rest the tip of your thumb right at the knuckle between index and middle.",
      "Curl your ring and pinky fingers tightly into your palm.",
      "Keep palm facing the camera."
    ],
    fingerState: {
      thumb: "Between Index & Middle",
      index: "Extended Straight Up",
      middle: "Extended Forward (45°)",
      ring: "Curled",
      pinky: "Curled"
    },
    tips: "Distinct from letter F! Letter F forms a circle with thumb & index while 3 fingers extend up.",
    practicePrompt: "Make the K-shape (index up, middle angled, thumb between) for OK"
  },
  {
    id: "THUMBS_DOWN",
    name: "Thumbs Down / No / Bad",
    type: "phrase",
    badge: "Gesture",
    outputChar: "NO",
    svg: generateHandSvg('THUMBS_DOWN'),
    description: "Closed fist with thumb extended straight downwards.",
    steps: [
      "Curl all four fingers into a tight fist.",
      "Point your thumb straight down toward the floor.",
      "Hold steady facing camera."
    ],
    fingerState: {
      thumb: "Pointing Down",
      index: "Curled",
      middle: "Curled",
      ring: "Curled",
      pinky: "Curled"
    },
    tips: "Used to signify 'No', disagreement, or disapproval.",
    practicePrompt: "Point your thumb down for NO / THUMBS DOWN"
  },
  {
    id: "ROCK",
    name: "Rock On / Horns (🤘)",
    type: "phrase",
    badge: "Gesture",
    outputChar: "ROCK ON",
    svg: generateHandSvg('ROCK'),
    description: "Index and pinky fingers extended up; thumb holding down middle and ring.",
    steps: [
      "Extend your index finger and pinky finger straight up.",
      "Curl your middle and ring fingers into your palm.",
      "Fold thumb over the middle and ring fingers to lock them."
    ],
    fingerState: {
      thumb: "Holding middle & ring",
      index: "Extended Up",
      middle: "Curled",
      ring: "Curled",
      pinky: "Extended Up"
    },
    tips: "Make sure your thumb is folded across middle & ring fingers, locking them down.",
    practicePrompt: "Extend index and pinky while holding middle two down"
  },

  // ================= ASL ALPHABET (A - Z) =================
  {
    id: "A",
    name: "Letter A",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "A",
    svg: generateHandSvg('A'),
    description: "Fist with thumb resting upright along the side of index finger.",
    steps: [
      "Curl all four fingers down into a closed fist.",
      "Keep thumb straight and upright along the side of your index finger.",
      "Do NOT cross thumb across the front of fingers (that is letter S)."
    ],
    fingerState: {
      thumb: "Straight up on side",
      index: "Curled",
      middle: "Curled",
      ring: "Curled",
      pinky: "Curled"
    },
    tips: "Key difference from 'S': Thumb stays alongside, not folded over knuckles.",
    practicePrompt: "Make a fist with thumb on the side for A"
  },
  {
    id: "B",
    name: "Letter B",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "B",
    svg: generateHandSvg('B'),
    description: "Four fingers held straight up together, thumb folded across palm.",
    steps: [
      "Extend all four fingers straight up, pressed close together.",
      "Fold your thumb flat across your palm.",
      "Palm faces forward toward camera."
    ],
    fingerState: {
      thumb: "Folded across palm",
      index: "Extended Straight Up",
      middle: "Extended Straight Up",
      ring: "Extended Straight Up",
      pinky: "Extended Straight Up"
    },
    tips: "Keep fingers glued together! Spreading them looks like the number 4.",
    practicePrompt: "Hold four fingers straight up with thumb tucked for B"
  },
  {
    id: "C",
    name: "Letter C",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "C",
    svg: generateHandSvg('C'),
    description: "Curved hand resembling the letter 'C', as if holding a cup.",
    steps: [
      "Curve all four fingers and thumb into a gentle arc.",
      "Leave a distinct circular gap between thumb tip and finger tips.",
      "Turn hand slightly sideways so the 'C' silhouette is visible."
    ],
    fingerState: {
      thumb: "Curved",
      index: "Curved",
      middle: "Curved",
      ring: "Curved",
      pinky: "Curved"
    },
    tips: "Imagine holding a glass of water.",
    practicePrompt: "Curve fingers and thumb like holding a mug for C"
  },
  {
    id: "D",
    name: "Letter D",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "D",
    svg: generateHandSvg('D'),
    description: "Index finger straight up; middle, ring, pinky touch thumb in a circle.",
    steps: [
      "Point index finger straight up toward the ceiling.",
      "Curve middle, ring, and pinky down so their tips touch the thumb.",
      "Forms a small 'd' loop at bottom."
    ],
    fingerState: {
      thumb: "Touching middle finger",
      index: "Extended Straight Up",
      middle: "Curled to thumb",
      ring: "Curled to thumb",
      pinky: "Curled to thumb"
    },
    tips: "Only index points up! Contrast with letter F where 3 fingers point up.",
    practicePrompt: "Point index up while thumb touches other fingers for D"
  },
  {
    id: "E",
    name: "Letter E",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "E",
    svg: generateHandSvg('E'),
    description: "All fingers curled down tightly, resting on top of bent thumb.",
    steps: [
      "Bend all 4 fingers at the second joint, pressing tips into upper palm.",
      "Tuck thumb under finger tips horizontally.",
      "Keep hand facing forward."
    ],
    fingerState: {
      thumb: "Tucked horizontally",
      index: "Clamped down",
      middle: "Clamped down",
      ring: "Clamped down",
      pinky: "Clamped down"
    },
    tips: "Fingertips should rest snugly on top edge of thumb.",
    practicePrompt: "Curl all fingertips down onto thumb for E"
  },
  {
    id: "F",
    name: "Letter F",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "F",
    svg: generateHandSvg('F'),
    description: "Thumb and index tips touch in an 'O' ring; middle, ring, pinky extend up.",
    steps: [
      "Touch tip of index finger to tip of thumb.",
      "Extend middle, ring, and pinky fingers straight up.",
      "Keep palm facing camera."
    ],
    fingerState: {
      thumb: "Touching index tip",
      index: "Touching thumb tip",
      middle: "Extended Up",
      ring: "Extended Up",
      pinky: "Extended Up"
    },
    tips: "Three fingers straight up with thumb and index pinched into a circle.",
    practicePrompt: "Form a circle with thumb & index, 3 fingers up for F"
  },
  {
    id: "I",
    name: "Letter I",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "I",
    svg: generateHandSvg('I'),
    description: "Pinky finger points straight up, other fingers curled into fist with thumb across.",
    steps: [
      "Curl index, middle, and ring fingers down into a fist.",
      "Hold thumb across the curled fingers.",
      "Extend only the pinky finger straight up."
    ],
    fingerState: {
      thumb: "Crossed over fist",
      index: "Curled",
      middle: "Curled",
      ring: "Curled",
      pinky: "Extended Straight Up"
    },
    tips: "Keep only the smallest finger pointing to the sky!",
    practicePrompt: "Raise only your pinky finger for I"
  },
  {
    id: "L",
    name: "Letter L",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "L",
    svg: generateHandSvg('L'),
    description: "Classic 'L' shape: Index finger up, thumb straight out at 90 degrees.",
    steps: [
      "Point index finger straight up.",
      "Stick thumb straight out horizontally at a 90° right angle.",
      "Curl middle, ring, and pinky into your palm.",
      "Palm faces camera."
    ],
    fingerState: {
      thumb: "Extended at 90° angle",
      index: "Extended Straight Up",
      middle: "Curled",
      ring: "Curled",
      pinky: "Curled"
    },
    tips: "Visually spells out the letter 'L' directly.",
    practicePrompt: "Make an L shape with your thumb and index finger"
  },
  {
    id: "V",
    name: "Letter V",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "V",
    svg: generateHandSvg('V'),
    description: "Index and middle fingers extended in a spread 'V' shape.",
    steps: [
      "Extend index and middle fingers straight up.",
      "Spread them apart into a distinct 'V'.",
      "Fold ring and pinky fingers down with thumb holding them."
    ],
    fingerState: {
      thumb: "Folded over ring/pinky",
      index: "Extended angled left",
      middle: "Extended angled right",
      ring: "Curled",
      pinky: "Curled"
    },
    tips: "Keep a noticeable gap between index and middle.",
    practicePrompt: "Spread index and middle fingers in a V for V"
  },
  {
    id: "W",
    name: "Letter W",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "W",
    svg: generateHandSvg('W'),
    description: "Index, middle, and ring fingers extended up spread out; pinky and thumb touch.",
    steps: [
      "Extend index, middle, and ring fingers straight up.",
      "Spread them apart to form the letter 'W'.",
      "Tuck pinky finger down and hold with your thumb."
    ],
    fingerState: {
      thumb: "Holding pinky",
      index: "Extended Up",
      middle: "Extended Up",
      ring: "Extended Up",
      pinky: "Curled Down"
    },
    tips: "Three fingers up forming 'W' peaks.",
    practicePrompt: "Hold 3 middle fingers up spread apart for W"
  },
  {
    id: "Y",
    name: "Letter Y",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "Y",
    svg: generateHandSvg('Y'),
    description: "Thumb and pinky extended outwards; middle three fingers curled in fist.",
    steps: [
      "Stick thumb out to one side.",
      "Stick pinky out to the other side.",
      "Keep index, middle, and ring fingers tightly curled.",
      "Known as the 'Hang Loose' or 'Shaka' sign."
    ],
    fingerState: {
      thumb: "Extended Out",
      index: "Curled",
      middle: "Curled",
      ring: "Curled",
      pinky: "Extended Out"
    },
    tips: "Only the two outer fingers are extended.",
    practicePrompt: "Extend only thumb and pinky for Y"
  },
  {
    id: "O",
    name: "Letter O",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "O",
    svg: generateHandSvg('O'),
    description: "All fingers curved touching thumb tip forming an O shape.",
    steps: [
      "Curve all four fingers downward.",
      "Touch all four fingertips to the tip of your thumb.",
      "Hold your hand steady facing the camera so the circular 'O' is clear."
    ],
    fingerState: {
      thumb: "Touching fingertips",
      index: "Curved touching thumb",
      middle: "Curved touching thumb",
      ring: "Curved touching thumb",
      pinky: "Curved touching thumb"
    },
    tips: "Keep fingertips touching the thumb to form a closed ring!",
    practicePrompt: "Touch all fingertips to your thumb to form an O"
  },
  {
    id: "U",
    name: "Letter U",
    type: "alphabet",
    badge: "Alphabet",
    outputChar: "U",
    svg: generateHandSvg('U'),
    description: "Index and middle fingers held straight up pressed tightly together.",
    steps: [
      "Extend index and middle fingers straight up.",
      "Keep them pressed together with NO gap between them.",
      "Curl ring and pinky fingers down with thumb holding them."
    ],
    fingerState: {
      thumb: "Holding ring/pinky",
      index: "Extended (touching middle)",
      middle: "Extended (touching index)",
      ring: "Curled",
      pinky: "Curled"
    },
    tips: "Fingers together = U. Fingers spread apart = V or Peace!",
    practicePrompt: "Hold index and middle together straight up for U"
  },

  // ================= NUMBERS (1 - 5) =================
  {
    id: "NUM_1",
    name: "Number 1",
    type: "number",
    badge: "Number",
    outputChar: "1",
    svg: generateHandSvg('D'),
    description: "Index finger pointing up, all other fingers curled into fist.",
    steps: [
      "Extend index finger straight up.",
      "Curl all other fingers and thumb together into a fist.",
      "Palm faces forward."
    ],
    fingerState: {
      thumb: "Curled over fingers",
      index: "Extended Straight Up",
      middle: "Curled",
      ring: "Curled",
      pinky: "Curled"
    },
    tips: "Standard index-pointing gesture.",
    practicePrompt: "Point index finger up for 1"
  },
  {
    id: "NUM_2",
    name: "Number 2",
    type: "number",
    badge: "Number",
    outputChar: "2",
    svg: generateHandSvg('V'),
    description: "Index and middle fingers extended up.",
    steps: [
      "Extend index and middle fingers straight up.",
      "Keep thumb, ring, and pinky curled down."
    ],
    fingerState: {
      thumb: "Folded",
      index: "Extended Up",
      middle: "Extended Up",
      ring: "Curled",
      pinky: "Curled"
    },
    tips: "Similar to V sign.",
    practicePrompt: "Hold up two fingers for 2"
  },
  {
    id: "NUM_3",
    name: "Number 3",
    type: "number",
    badge: "Number",
    outputChar: "3",
    svg: generateHandSvg('W'),
    description: "In ASL, 3 is signed with Thumb, Index, and Middle fingers extended.",
    steps: [
      "Extend your thumb, index finger, and middle finger.",
      "Keep ring and pinky fingers curled down.",
      "Palm faces forward."
    ],
    fingerState: {
      thumb: "Extended",
      index: "Extended",
      middle: "Extended",
      ring: "Curled",
      pinky: "Curled"
    },
    tips: "ASL 3 uses the thumb! (Index+Middle+Ring is 6 or W in ASL).",
    practicePrompt: "Extend thumb, index, and middle for 3"
  },
  {
    id: "NUM_4",
    name: "Number 4",
    type: "number",
    badge: "Number",
    outputChar: "4",
    svg: generateHandSvg('B'),
    description: "Four fingers extended upright spread out, thumb folded in.",
    steps: [
      "Extend index, middle, ring, and pinky fingers upright.",
      "Fold thumb across your palm."
    ],
    fingerState: {
      thumb: "Folded across palm",
      index: "Extended",
      middle: "Extended",
      ring: "Extended",
      pinky: "Extended"
    },
    tips: "Four fingers spread apart.",
    practicePrompt: "Show four fingers with thumb tucked for 4"
  },
  {
    id: "NUM_5",
    name: "Number 5",
    type: "number",
    badge: "Number",
    outputChar: "5",
    svg: generateHandSvg('HELLO'),
    description: "All five fingers fully extended and spread.",
    steps: [
      "Spread all five fingers wide facing camera."
    ],
    fingerState: {
      thumb: "Extended",
      index: "Extended",
      middle: "Extended",
      ring: "Extended",
      pinky: "Extended"
    },
    tips: "Same shape as Open Palm / Hello.",
    practicePrompt: "Spread all 5 fingers wide for 5"
  }
];

// Export to window
if (typeof window !== 'undefined') {
  window.SIGN_DATABASE = SIGN_DATABASE;
}
