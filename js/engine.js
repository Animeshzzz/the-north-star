/* =====================================================
   THE NORTH STAR — ENGINE
   Renders a linear sequence of "entries". Each entry is
   a full-screen section. Kingdoms can be visited in any
   order the reader chooses from the map.
   ===================================================== */

const stage = document.getElementById('stage');
const dotsWrap = document.getElementById('progress-dots');

let sequence = [];      // ordered list of entry ids to render/track for progress
let current = 0;
let visitedKingdoms = new Set();

function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function mountEntry(node) {
  stage.appendChild(node);
  requestAnimationFrame(() => node.classList.add('active'));
}

function goTo(id) {
  document.querySelectorAll('.entry').forEach(n => {
    if (n.id !== id) { n.classList.remove('active'); }
  });
  const target = document.getElementById(id);
  target.classList.add('active');
  // retrigger animation
  const inner = target.querySelector('[data-inner]');
  if (inner) {
    inner.style.animation = 'none';
    void inner.offsetWidth;
    inner.style.animation = '';
  }
  window.scrollTo(0, 0);
  updateDots(id);
}

function updateDots(activeId) {
  dotsWrap.querySelectorAll('span').forEach(d => {
    d.classList.toggle('on', d.dataset.id === activeId);
  });
}

function addDot(id) {
  const d = document.createElement('span');
  d.dataset.id = id;
  dotsWrap.appendChild(d);
}

/* ---------- art resolver: real image if present, else hand-coded SVG ---------- */
function artMarkup(kingdom, className) {
  return `
    <div class="${className}">
      <img src="${kingdom.image}" alt="" class="art-photo"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
           onload="this.nextElementSibling.style.display='none';">
      <div class="art-fallback" style="display:none;">${ILLUSTRATIONS[kingdom.id]}</div>
    </div>
  `;
}

/* ---------- simple narrative entry builder ---------- */
function simpleEntry({ id, bg = 'parchment-bg', eyebrow, title, body, marginNote, princess, nextId, nextLabel = 'Continue' }) {
  const node = el(`
    <section class="entry ${bg}" id="${id}">
      <div class="entry-inner" data-inner>
        ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ''}
        ${title ? `<h1>${title}</h1>` : ''}
        <div class="divider"></div>
        ${body ? `<p class="narrator">${body}</p>` : ''}
        ${princess ? `<p class="narrator princess-voice">${princess}</p>` : ''}
        ${marginNote ? `<span class="margin-note">${marginNote}</span>` : ''}
        ${nextId ? `<div><button class="continue-btn" data-next="${nextId}">${nextLabel}</button></div>` : ''}
      </div>
    </section>
  `);
  if (nextId) {
    node.querySelector('.continue-btn').addEventListener('click', () => goTo(nextId));
  }
  stage.appendChild(node);
  addDot(id);
  return node;
}

/* ---------- build the fixed opening chapters ---------- */
function buildOpening() {
  simpleEntry({
    id: 'opening',
    bg: 'night-bg opening',
    eyebrow: 'Explorer\u2019s Field Journal',
    title: 'The North Star',
    princess: '',
    nextId: 'quote',
    nextLabel: 'Begin'
  });

  simpleEntry({
    id: 'quote',
    bg: 'night-bg',
    body: `<em>${QUOTE_TEXT}</em>`,
    nextId: 'journal-intro'
  });

  simpleEntry({
    id: 'journal-intro',
    eyebrow: 'On Journals',
    title: 'Why every traveller deserves one',
    body: 'Not every place can be carried home. A journal is how you try anyway — a way to remember, to search back through, to stay awake to what\u2019s in front of you instead of sleepwalking past it.',
    nextId: 'princess-intro'
  });

  simpleEntry({
    id: 'princess-intro',
    eyebrow: 'The Princess',
    title: 'No one knew she was one',
    body: 'Not even Aditi believed it, most days. She disguised herself as a warrior, and did it well enough that most people stopped looking any closer — dry replies, a quick temper, opinions delivered whether or not they were requested. But she ignored one small, stubborn truth:',
    princess: 'A princess can also be a warrior.',
    nextId: 'map'
  });
}

/* ---------- the map ---------- */
function buildMap() {
  const node = el(`
    <section class="entry parchment-bg map-entry" id="map">
      <div class="entry-inner" data-inner style="max-width:900px">
        <span class="eyebrow">The Map</span>
        <h2>Choose where to begin</h2>
        <div class="divider"></div>
        <svg id="map-svg" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="592" height="332" rx="6" fill="none" stroke="#8B6B3D" stroke-width="1.5" stroke-dasharray="2 4"/>
          ${KINGDOMS.map(k => `
            <g class="kingdom-hotspot" data-kingdom="${k.id}" tabindex="0" role="button" aria-label="${k.name}">
              <circle class="hotspot-glow" cx="${k.hotspot.x}" cy="${k.hotspot.y}" r="26" fill="${k.accent}"/>
              <circle cx="${k.hotspot.x}" cy="${k.hotspot.y}" r="7" fill="${k.accent}" stroke="#3A2B1E" stroke-width="1"/>
              <text x="${k.hotspot.x}" y="${k.hotspot.y - 16}" text-anchor="middle">${k.name}</text>
            </g>
          `).join('')}
        </svg>
        <p class="narrator" style="margin-top:1rem;">Every kingdom holds one part of the story. Visit them in any order.</p>
        <div id="map-continue" style="display:none;">
          <button class="continue-btn" data-next="observatory">All five visited — continue</button>
        </div>
      </div>
    </section>
  `);
  node.querySelectorAll('.kingdom-hotspot').forEach(g => {
    const openIt = () => openKingdom(g.dataset.kingdom);
    g.addEventListener('click', openIt);
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openIt(); } });
  });
  stage.appendChild(node);
  addDot('map');
}

function checkMapComplete() {
  if (visitedKingdoms.size === KINGDOMS.length) {
    const btnWrap = document.getElementById('map-continue');
    if (btnWrap) {
      btnWrap.style.display = 'block';
      btnWrap.querySelector('.continue-btn').addEventListener('click', () => goTo('observatory'), { once: true });
    }
  }
}

function openKingdom(id) {
  const existing = document.getElementById('kingdom-' + id);
  if (existing) { goTo('kingdom-' + id); return; }

  const k = KINGDOMS.find(x => x.id === id);
  const layouts = {
    night: kingdomLayoutAuroraFull,
    stories: kingdomLayoutSplit,
    tomorrow: kingdomLayoutOverlay,
    rain: kingdomLayoutFramed,
    lake: kingdomLayoutHero
  };
  const node = layouts[k.id](k);
  node.querySelector('.continue-btn').addEventListener('click', () => goTo('map'));
  stage.appendChild(node);
  addDot('kingdom-' + id);
  visitedKingdoms.add(id);
  goTo('kingdom-' + id);
  checkMapComplete();
}

function eggMarkup(k) {
  return k.eggs.map(e => `<div class="egg-note">${e}</div>`).join('');
}

/* Layout 1 — Endless Night: full-bleed dark art, text overlaid at the base */
function kingdomLayoutAuroraFull(k) {
  return el(`
    <section class="entry kingdom-entry layout-aurora-full" id="kingdom-${k.id}" style="--k-accent:${k.accent}">
      ${artMarkup(k, 'kingdom-art-bg')}
      <div class="kingdom-overlay-scrim"></div>
      <div class="entry-inner" data-inner>
        <span class="eyebrow">${k.name}</span>
        <h2>inspired by ${k.inspiredBy}</h2>
        <div class="divider"></div>
        <p class="narrator">${k.story}</p>
        <span class="margin-note">${k.marginNote}</span>
        ${eggMarkup(k)}
        <div><button class="continue-btn" data-next="map">Back to the map</button></div>
      </div>
    </section>
  `);
}

/* Layout 2 — Hall of Stories: side-by-side on desktop, stacked on mobile */
function kingdomLayoutSplit(k) {
  return el(`
    <section class="entry kingdom-entry layout-split parchment-bg" id="kingdom-${k.id}" style="--k-accent:${k.accent}">
      <div class="split-wrap" data-inner>
        ${artMarkup(k, 'kingdom-art-panel')}
        <div class="split-text">
          <span class="eyebrow">${k.name}</span>
          <h2>inspired by ${k.inspiredBy}</h2>
          <div class="divider" style="margin-left:0;"></div>
          <p class="narrator" style="text-align:left;">${k.story}</p>
          <span class="margin-note">${k.marginNote}</span>
          ${eggMarkup(k)}
          <div><button class="continue-btn" data-next="map">Back to the map</button></div>
        </div>
      </div>
    </section>
  `);
}

/* Layout 3 — City Beyond Tomorrow: bold background image, card overlay */
function kingdomLayoutOverlay(k) {
  return el(`
    <section class="entry kingdom-entry layout-overlay" id="kingdom-${k.id}" style="--k-accent:${k.accent}">
      ${artMarkup(k, 'kingdom-art-bg')}
      <div class="kingdom-overlay-scrim dark"></div>
      <div class="overlay-card" data-inner>
        <span class="eyebrow">${k.name}</span>
        <h2>inspired by ${k.inspiredBy}</h2>
        <div class="divider"></div>
        <p class="narrator">${k.story}</p>
        <span class="margin-note">${k.marginNote}</span>
        ${eggMarkup(k)}
        <div><button class="continue-btn" data-next="map">Back to the map</button></div>
      </div>
    </section>
  `);
}

/* Layout 4 — Garden of Rain: quiet, centered, small framed image */
function kingdomLayoutFramed(k) {
  return el(`
    <section class="entry kingdom-entry layout-framed parchment-bg" id="kingdom-${k.id}">
      <div class="entry-inner" data-inner style="--k-accent:${k.accent}">
        <span class="eyebrow">${k.name}</span>
        <h2>inspired by ${k.inspiredBy}</h2>
        ${artMarkup(k, 'kingdom-art-framed')}
        <div class="divider"></div>
        <p class="narrator">${k.story}</p>
        <span class="margin-note">${k.marginNote}</span>
        ${eggMarkup(k)}
        <div><button class="continue-btn" data-next="map">Back to the map</button></div>
      </div>
    </section>
  `);
}

/* Layout 5 — Lake Above the Clouds: the image is the hero, text minimal beneath */
function kingdomLayoutHero(k) {
  return el(`
    <section class="entry kingdom-entry layout-hero-img parchment-bg" id="kingdom-${k.id}">
      <div class="entry-inner" data-inner style="--k-accent:${k.accent}">
        ${artMarkup(k, 'kingdom-art-hero')}
        <span class="eyebrow">${k.name}</span>
        <h2>inspired by ${k.inspiredBy}</h2>
        <div class="divider"></div>
        <p class="narrator">${k.story}</p>
        <span class="margin-note">${k.marginNote}</span>
        ${eggMarkup(k)}
        <div><button class="continue-btn" data-next="map">Back to the map</button></div>
      </div>
    </section>
  `);
}

/* ---------- observatory / twenty stars ---------- */
function buildObservatory() {
  const positions = STARS.map(() => ({
    x: 6 + Math.random() * 88,
    y: 8 + Math.random() * 84
  }));

  const node = el(`
    <section class="entry night-bg observatory" id="observatory">
      <div class="star-field" id="star-field">
        ${positions.map((p, i) => `<div class="star" data-i="${i}" style="left:${p.x}%; top:${p.y}%;"></div>`).join('')}
      </div>
      <div class="entry-inner star-caption" data-inner>
        <span class="eyebrow">On your twentieth birthday...</span>
        <h2>twenty things I've always appreciated about you</h2>
        <span class="star-count" id="star-count">0 / 20 lit</span>
        <div id="star-text-box"></div>
        <div id="obs-continue" style="display:none; margin-top:1.4rem;">
          <button class="continue-btn" data-next="letter">Continue</button>
        </div>
      </div>
    </section>
  `);
  stage.appendChild(node);
  addDot('observatory');

  let lit = 0;
  const textBox = node.querySelector('#star-text-box');
  const countEl = node.querySelector('#star-count');

  node.querySelectorAll('.star').forEach(starEl => {
    const i = parseInt(starEl.dataset.i, 10);
    setTimeout(() => starEl.classList.add('ready'), 150 * i);

    starEl.addEventListener('click', () => {
      if (starEl.classList.contains('lit')) {
        textBox.textContent = STARS[i];
        return;
      }
      starEl.classList.add('lit');
      lit++;
      countEl.textContent = `${lit} / ${STARS.length} lit`;
      textBox.textContent = STARS[i];
      if (lit === STARS.length) {
        node.querySelector('#obs-continue').style.display = 'block';
        node.querySelector('#obs-continue .continue-btn').addEventListener('click', () => goTo('letter'), { once: true });
      }
    });
  });

  // auto-light stars gently over time so it doesn't feel like a checklist chore
  // but reader can also click ahead
}

/* ---------- final letter + ending ---------- */
function buildClosing() {
  simpleEntry({
    id: 'letter',
    bg: 'parchment-bg letter-entry',
    eyebrow: 'The Final Letter',
    body: FINAL_LETTER.split('\n\n').map(p => p.trim()).join('</p><p class="narrator">'),
    nextId: 'ending'
  });

  const endNode = el(`
    <section class="entry night-bg ending-entry" id="ending">
      <div class="entry-inner" data-inner>
        <h1>Happy Birthday, Princess.</h1>
      </div>
    </section>
  `);
  stage.appendChild(endNode);
  addDot('ending');
}

/* ---------- build everything ---------- */
buildOpening();
buildMap();
buildObservatory();
buildClosing();
goTo('opening');

// fade out quietly after the ending has been visible a while
const endingObserver = new MutationObserver(() => {
  const ending = document.getElementById('ending');
  if (ending && ending.classList.contains('active')) {
    setTimeout(() => {
      const fade = document.createElement('div');
      fade.id = 'final-fade';
      document.body.appendChild(fade);
      requestAnimationFrame(() => fade.classList.add('out'));
    }, 6000);
  }
});
endingObserver.observe(stage, { attributes: true, subtree: true, attributeFilter: ['class'] });
