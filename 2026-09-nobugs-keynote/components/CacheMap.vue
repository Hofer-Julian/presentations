<!-- Which cache each environment takes a package from, for the layered caches slide. -->

<template>
  <svg
    class="cache-map"
    viewBox="0 0 900 250"
    role="img"
    aria-label="Four environments belonging to two researchers draw numpy and mantid from one shared site cache, while both environments of a researcher share dials or h5py from that researcher's own cache"
  >
    <!-- A plate behind each researcher, holding their name and their environments -->
    <g class="cache-map-owner">
      <rect x="0" y="0" width="418" height="100" rx="12" />
      <rect x="482" y="0" width="418" height="100" rx="12" />
    </g>

    <g class="cache-map-owner-name">
      <text x="209" y="20">Researcher A</text>
      <text x="691" y="20">Researcher B</text>
    </g>

    <g class="cache-map-env">
      <rect x="12" y="30" width="190" height="62" rx="10" />
      <rect x="216" y="30" width="190" height="62" rx="10" />
      <rect x="494" y="30" width="190" height="62" rx="10" />
      <rect x="698" y="30" width="190" height="62" rx="10" />
    </g>

    <g class="cache-map-label">
      <text x="24" y="48">Environment 1</text>
      <text x="228" y="48">Environment 2</text>
      <text x="506" y="48">Environment 1</text>
      <text x="710" y="48">Environment 2</text>
    </g>

    <g class="cache-map-chip">
      <rect x="24" y="58" width="79" height="26" rx="6" />
      <rect x="111" y="58" width="79" height="26" rx="6" />
      <rect x="228" y="58" width="79" height="26" rx="6" />
      <rect x="315" y="58" width="79" height="26" rx="6" />
      <rect x="506" y="58" width="79" height="26" rx="6" />
      <rect x="593" y="58" width="79" height="26" rx="6" />
      <rect x="710" y="58" width="79" height="26" rx="6" />
      <rect x="797" y="58" width="79" height="26" rx="6" />
    </g>

    <g class="cache-map-name">
      <text x="64" y="76">dials</text>
      <text x="150" y="76">numpy</text>
      <text x="268" y="76">dials</text>
      <text x="355" y="76">mantid</text>
      <text x="546" y="76">numpy</text>
      <text x="633" y="76">h5py</text>
      <text x="750" y="76">mantid</text>
      <text x="837" y="76">h5py</text>
    </g>

    <!-- The cache boxes paint over these, so every line ends on a box edge -->
    <g class="cache-map-line">
      <path d="M64 84 L98 206" />
      <path d="M268 84 L98 206" />
      <path d="M150 84 L350 206" />
      <path d="M355 84 L500 206" />
      <path d="M546 84 L350 206" />
      <path d="M750 84 L500 206" />
      <path d="M633 84 L803 206" />
      <path d="M837 84 L803 206" />
    </g>

    <g class="cache-map-store">
      <rect x="0" y="175" width="195" height="75" rx="10" />
      <rect x="705" y="175" width="195" height="75" rx="10" />
    </g>
    <rect class="cache-map-site" x="250" y="175" width="400" height="75" rx="10" />

    <g class="cache-map-label cache-map-label-cache">
      <text x="98" y="195">Own cache</text>
      <text x="803" y="195">Own cache</text>
      <text class="cache-map-label-site" x="450" y="195">Read-only site cache</text>
    </g>

    <g class="cache-map-chip">
      <rect x="58" y="206" width="80" height="26" rx="6" />
      <rect x="763" y="206" width="80" height="26" rx="6" />
    </g>
    <g class="cache-map-chip cache-map-chip-site">
      <rect x="300" y="206" width="100" height="26" rx="6" />
      <rect x="450" y="206" width="100" height="26" rx="6" />
    </g>

    <g class="cache-map-name">
      <text x="98" y="224">dials</text>
      <text x="803" y="224">h5py</text>
      <text x="350" y="224">numpy</text>
      <text x="500" y="224">mantid</text>
    </g>
  </svg>
</template>

<style>
.cache-map {
  display: block;
  width: 100%;
  margin: 0.25rem 0 0.5rem;

  /* A wash rather than an outline, so the plate never competes with the lines */
  .cache-map-owner rect {
    fill: rgb(var(--prefix-ink-rgb) / 6%);
  }

  .cache-map-env rect,
  .cache-map-store rect {
    fill: var(--prefix-white);
    stroke: var(--prefix-border);
  }

  .cache-map-site {
    fill: var(--prefix-yellow);
  }

  .cache-map-chip rect {
    fill: var(--prefix-paper);
  }

  .cache-map-chip-site rect {
    fill: var(--prefix-white);
  }

  .cache-map-label,
  .cache-map-label text {
    fill: var(--prefix-muted);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: var(--prefix-tracking-wide);
    text-transform: uppercase;
  }

  /* The name the plate belongs to, centred over the environments it holds */
  .cache-map-owner-name text {
    fill: var(--prefix-ink);
    font-size: 11px;
    text-anchor: middle;
    font-weight: 600;
    letter-spacing: var(--prefix-tracking-wide);
    text-transform: uppercase;
  }

  /* A cache names itself over its middle, where its packages sit */
  .cache-map-label-cache text {
    text-anchor: middle;
  }

  .cache-map-label-site {
    fill: var(--prefix-ink);
  }

  .cache-map-name text {
    fill: var(--prefix-ink);
    font-family: var(--prefix-font-mono);
    font-size: 14px;
    text-anchor: middle;
  }

  .cache-map-line path {
    fill: none;
    stroke: var(--prefix-ink);
    stroke-width: 1.5;
    opacity: 0.3;
  }
}
</style>
