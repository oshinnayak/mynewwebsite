/* One Thought — fades one thought out, then the next in. */

const THOUGHTS = [
  "A quiet mind can hear what hurry hides.",
  "Not everything that matters can be measured—yet it can be felt.",
  "The present is where your life keeps arriving.",
  "You become what you repeatedly return to.",
  "Clarity often costs the comfort of confusion.",
  "Small choices are the architecture of a day.",
  "Sometimes growth looks like subtraction.",
  "Peace is not the absence of noise, but the presence of meaning.",
  "The way you speak to yourself becomes the way you live.",
  "Patience is time made intentional.",
  "Your attention is your most honest currency.",
  "What you avoid quietly shapes you.",
  "The simplest truth is often the hardest to accept.",
  "The world changes when you change what you notice.",
  "You can be right, or you can be free.",
  "There is strength in moving slowly on purpose.",
  "Gratitude turns enough into abundance.",
  "Some answers arrive when the question softens.",
  "Your life is made of moments you stop rushing through.",
  "The meaning you seek is also something you create.",
  "Stillness is a skill, not a luxury.",
  "What you water will grow.",
  "A boundary is a form of respect.",
  "Let your values be louder than your mood.",
  "Even gentle decisions can be brave.",
  "You do not have to carry what you can release.",
  "A good life is built more than it is found.",
  "The future is shaped by the rituals you keep today.",
  "Listen closely: your body often tells the truth first.",
  "The heart learns in spirals, not straight lines.",
  "Nothing changes until honesty becomes kind.",
  "Your pace is allowed to be human.",
  "Sometimes the next step is simply to breathe.",
  "The most powerful direction is inward.",
  "What is meant for you will ask for your presence.",
];

const el = document.getElementById("thought");

const FADE_MS = 900;
const HOLD_MS = 3200;

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function pickNextIndex(currentIndex) {
  if (THOUGHTS.length <= 1) return 0;

  let next = currentIndex;
  while (next === currentIndex) {
    next = Math.floor(Math.random() * THOUGHTS.length);
  }
  return next;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function cycleThoughts() {
  if (!el) return;

  let index = Math.floor(Math.random() * THOUGHTS.length);
  el.textContent = THOUGHTS[index];

  while (true) {
    await sleep(HOLD_MS);

    const nextIndex = pickNextIndex(index);

    if (prefersReducedMotion) {
      el.textContent = THOUGHTS[nextIndex];
      index = nextIndex;
      continue;
    }

    el.classList.add("is-fading");
    await sleep(FADE_MS);

    el.textContent = THOUGHTS[nextIndex];

    // Ensure the browser applies the text change before fading back in.
    void el.offsetWidth;

    el.classList.remove("is-fading");
    index = nextIndex;
  }
}

cycleThoughts();
