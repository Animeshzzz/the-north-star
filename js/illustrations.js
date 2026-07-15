/* =====================================================
   FALLBACK ILLUSTRATIONS
   Simple hand-coded SVG art per kingdom. Automatically
   replaced the instant a matching file appears at the
   kingdom's `image` path in data.js (see assets/README).
   ===================================================== */

const ILLUSTRATIONS = {
  night: `
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="260" fill="#16211f"/>
      <g opacity="0.85">
        <path d="M0,140 Q100,60 200,120 T400,90" stroke="#6FA8A0" stroke-width="18" fill="none" opacity="0.35"/>
        <path d="M0,170 Q100,100 200,150 T400,120" stroke="#9ED6C9" stroke-width="10" fill="none" opacity="0.4"/>
        <path d="M0,110 Q120,40 220,95 T400,70" stroke="#C9E8DD" stroke-width="4" fill="none" opacity="0.5"/>
      </g>
      <polygon points="0,260 60,170 120,230 190,150 260,225 330,175 400,260" fill="#0A100E"/>
      <circle cx="70" cy="45" r="1.4" fill="#EFE6D3"/>
      <circle cx="150" cy="30" r="1" fill="#EFE6D3"/>
      <circle cx="300" cy="50" r="1.6" fill="#EFE6D3"/>
      <circle cx="340" cy="25" r="1" fill="#EFE6D3"/>
      <circle cx="230" cy="20" r="1.2" fill="#EFE6D3"/>
    </svg>`,

  stories: `
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="260" fill="#EFE6D3"/>
      <g stroke="#3A2B1E" stroke-width="1.4" fill="none" opacity="0.7">
        <rect x="40" y="70" width="60" height="140"/>
        <rect x="105" y="50" width="60" height="160"/>
        <rect x="170" y="85" width="60" height="125"/>
        <rect x="235" y="40" width="60" height="170"/>
        <rect x="300" y="65" width="60" height="145"/>
      </g>
      <g stroke="#C98A93" stroke-width="1" opacity="0.6">
        <line x1="40" y1="90" x2="100" y2="90"/>
        <line x1="105" y1="70" x2="165" y2="70"/>
        <line x1="170" y1="105" x2="230" y2="105"/>
        <line x1="235" y1="65" x2="295" y2="65"/>
        <line x1="300" y1="90" x2="360" y2="90"/>
      </g>
      <path d="M180,215 L200,195 L220,215 L200,235 Z" fill="#C98A93" opacity="0.5"/>
    </svg>`,

  tomorrow: `
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="260" fill="#1C140D"/>
      <g fill="#D6B370" opacity="0.85">
        <polygon points="60,260 60,90 90,60 120,90 120,260"/>
        <polygon points="140,260 140,60 175,20 210,60 210,260"/>
        <polygon points="230,260 230,110 255,85 280,110 280,260"/>
        <polygon points="295,260 295,140 320,120 345,140 345,260"/>
      </g>
      <g stroke="#1C140D" stroke-width="1" opacity="0.5">
        <line x1="90" y1="70" x2="90" y2="250"/>
        <line x1="175" y1="35" x2="175" y2="250"/>
      </g>
      <circle cx="175" cy="20" r="3" fill="#EFE6D3"/>
    </svg>`,

  rain: `
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="260" fill="#EFE6D3"/>
      <circle cx="200" cy="130" r="70" fill="none" stroke="#7FA06E" stroke-width="1.5" opacity="0.5"/>
      <g stroke="#7FA06E" stroke-width="2" opacity="0.6">
        <line x1="120" y1="60" x2="112" y2="80"/>
        <line x1="150" y1="40" x2="144" y2="62"/>
        <line x1="260" y1="55" x2="266" y2="76"/>
        <line x1="290" y1="80" x2="298" y2="100"/>
        <line x1="200" y1="35" x2="200" y2="58"/>
      </g>
      <path d="M160,150 Q200,110 240,150 Q220,175 200,150 Q180,175 160,150 Z" fill="#7FA06E" opacity="0.7"/>
    </svg>`,

  lake: `
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="260" fill="#0F1A22"/>
      <polygon points="0,160 90,80 160,150 230,60 310,150 400,110 400,260 0,260" fill="#1C2D38"/>
      <polygon points="0,260 400,260 400,220 0,220" fill="#152229"/>
      <g stroke="#9EC6D9" stroke-width="0.8" opacity="0.4">
        <line x1="80" y1="230" x2="140" y2="230"/>
        <line x1="200" y1="240" x2="260" y2="240"/>
        <line x1="90" y1="245" x2="170" y2="245"/>
      </g>
      <circle cx="330" cy="45" r="16" fill="#EFE6D3" opacity="0.85"/>
    </svg>`
};
