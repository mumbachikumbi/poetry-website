// =====================================
// 🌿 STATE
// =====================================

let currentPage = "page2";
let i = 0;
let opened = false;
let leafIntervalStarted = false;

// =====================================
// 🌿 MUSIC + START EXPERIENCE
// =====================================

function startSite() {
  const music = document.getElementById("bgMusic");

  goToPage("page3");

  if (music) {
    music.volume = 0;

    const playPromise = music.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => fadeInAudio(music))
        .catch((err) => console.log("Music blocked:", err));
    }
  }
}

// =====================================
// 🌿 FADE IN AUDIO
// =====================================

function fadeInAudio(audio) {
  let v = 0;
  const target = 0.10;

  const interval = setInterval(() => {
    if (v < target) {
      v += 0.005;
      audio.volume = v;
    } else {
      clearInterval(interval);
    }
  }, 60);
}

// =====================================
// 🌿 PAGE SYSTEM
// =====================================

function goToPage(pageId) {
  const current = document.getElementById(currentPage);
  const next = document.getElementById(pageId);

  if (current) {
    current.style.opacity = 0;

    setTimeout(() => {
      current.style.display = "none";
    }, 250);
  }

  if (next) {
    next.style.display = "flex";

    setTimeout(() => {
      next.style.opacity = 1;
    }, 50);
  }

  currentPage = pageId;
}

// =====================================
// 🌿 INIT
// =====================================

window.onload = () => {
  const pages = document.querySelectorAll(".page");

  pages.forEach((p) => {
    if (p.id !== "page2") {
      p.style.display = "none";
      p.style.opacity = 0;
    }
  });

  const start = document.getElementById("page2");

  if (start) {
    start.style.display = "flex";
    start.style.opacity = 1;
  }
};

// =====================================
// 💌 ENVELOPE OPEN (CINEMATIC BUILDUP)
// =====================================

function openLetter() {
  const envelope = document.getElementById("envelope");

  if (opened) return;
  opened = true;

  // STEP 1: tension shake phase
  envelope.classList.add("pre-open");

  // STEP 2: micro delay (anticipation)
  setTimeout(() => {
    envelope.classList.remove("pre-open");
    envelope.classList.add("mid-open");

    // STEP 3: pressure pulse before opening
    triggerPulseEffect();

    // STEP 4: final open
    setTimeout(() => {
      envelope.classList.remove("mid-open");
      envelope.classList.add("open");

      // STEP 5: delay poem (so opening feels physical)
      setTimeout(() => {
        startPoem();
        startLeafFlow();
      }, 800);

    }, 600);

  }, 450);
}

// =====================================
// ✨ CINEMATIC PULSE EFFECT (NEW)
// =====================================

function triggerPulseEffect() {
  const envelope = document.getElementById("envelope");

  if (!envelope) return;

  // quick “breathing glow” burst
  envelope.classList.add("pulse");

  setTimeout(() => {
    envelope.classList.remove("pulse");
  }, 700);
}

// =====================================
// 🌸 POEM
// =====================================

const poem = `
She is colour in empty space,
poetry hidden in an ordinary place.
The kind of person who makes the world feel brighter
without ever trying to be.

She's talented in more ways than she knows.
And her drawings are like windows into her inner world,
portals revealing pieces of her depth.

She has the most interesting personality,
the kind that makes every conversation memorable,
and interests that make her impossible to forget.
And somehow, among all those remarkable things,
she still has the cutest dimple I've ever seen,
a small detail that somehow makes her smile
even more impossible to ignore.

She taught me so much about myself
without ever meaning to.
She helped me see things I never noticed,
ask questions I never thought to ask,
and become someone a little more honest,
a little more aware.

She brightens the world simply by existing.
Not because she tries to,
but because that's who she is.

And if beauty is measured by kindness, depth, creativity
and the way someone leaves the world better than they found it,
then she is the most beautiful girl inside and out.
`;

function startPoem() {
  const target = document.getElementById("poemText");

  if (!target) return;

  target.innerHTML = "";
  i = 0;

  typeWriter();
}

// =====================================
// ✍️ TYPEWRITER (CINEMATIC)
// =====================================

function typeWriter() {
  const target = document.getElementById("poemText");

  if (!target) return;

  if (i < poem.length) {
    const char = poem.charAt(i);

    target.innerHTML += char;

    i++;

    let delay = 45;

    if (char === ",") delay = 140;
    if (char === ".") delay = 220;
    if (char === "\n") delay = 280;
    if (char === " ") delay = 25;

    setTimeout(typeWriter, delay);
  }
}

// =====================================
// 🍃 LEAF SYSTEM
// =====================================

function spawnLeaf() {
  const leafCount = 1;

  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement("div");

    leaf.className = "leaf";
    leaf.innerHTML = "🍀";

    leaf.style.left = Math.random() * window.innerWidth + "px";
    leaf.style.animationDuration = 6 + Math.random() * 5 + "s";
    leaf.style.fontSize = 16 + Math.random() * 10 + "px";

    document.body.appendChild(leaf);

    setTimeout(() => leaf.remove(), 18000);
  }
}

function startLeafFlow() {
  if (leafIntervalStarted) return;

  leafIntervalStarted = true;
  setInterval(spawnLeaf, 2000);
}
