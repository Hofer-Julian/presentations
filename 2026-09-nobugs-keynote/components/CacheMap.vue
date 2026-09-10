<!-- Which cache each environment takes a package from, for the layered caches slide. -->

<template>
  <svg
    class="cache-map"
    viewBox="0 0 900 250"
    role="img"
    aria-label="Four environments belonging to two researchers draw numpy and mantid from one shared site cache, while both environments of a researcher share dials or h5py from that researcher's own cache"
  >
    <g class="cache-map-group">
      <text x="2" y="12">Researcher A</text>
      <text x="898" y="12" text-anchor="end">Researcher B</text>
    </g>

    <g class="cache-map-env">
      <rect x="0" y="26" width="195" height="64" rx="10" />
      <rect x="215" y="26" width="195" height="64" rx="10" />
      <rect x="490" y="26" width="195" height="64" rx="10" />
      <rect x="705" y="26" width="195" height="64" rx="10" />
    </g>

    <g class="cache-map-label">
      <text x="14" y="46">Environment 1</text>
      <text x="229" y="46">Environment 2</text>
      <text x="504" y="46">Environment 1</text>
      <text x="719" y="46">Environment 2</text>
    </g>

    <g class="cache-map-chip">
      <rect x="12" y="56" width="80" height="26" rx="6" />
      <rect x="103" y="56" width="80" height="26" rx="6" />
      <rect x="227" y="56" width="80" height="26" rx="6" />
      <rect x="318" y="56" width="80" height="26" rx="6" />
      <rect x="502" y="56" width="80" height="26" rx="6" />
      <rect x="593" y="56" width="80" height="26" rx="6" />
      <rect x="717" y="56" width="80" height="26" rx="6" />
      <rect x="808" y="56" width="80" height="26" rx="6" />
    </g>

    <g class="cache-map-name">
      <text x="52" y="74">dials</text>
      <text x="143" y="74">numpy</text>
      <text x="267" y="74">dials</text>
      <text x="358" y="74">mantid</text>
      <text x="542" y="74">numpy</text>
      <text x="633" y="74">h5py</text>
      <text x="757" y="74">mantid</text>
      <text x="848" y="74">h5py</text>
    </g>

    <g class="cache-map-line">
      <path d="M52 82 V206" />
      <path d="M267 82 L52 206" />
      <path d="M143 82 L350 206" />
      <path d="M358 82 L500 206" />
      <path d="M542 82 L350 206" />
      <path d="M633 82 L848 206" />
      <path d="M757 82 L500 206" />
      <path d="M848 82 V206" />
    </g>

    <g class="cache-map-store">
      <rect x="0" y="175" width="195" height="75" rx="10" />
      <rect x="705" y="175" width="195" height="75" rx="10" />
    </g>
    <rect class="cache-map-site" x="250" y="175" width="400" height="75" rx="10" />

    <g class="cache-map-label">
      <text x="14" y="195">Own cache</text>
      <text x="719" y="195">Own cache</text>
    </g>
    <text class="cache-map-label cache-map-label-site" x="264" y="195">Site cache · read-only</text>

    <g class="cache-map-chip">
      <rect x="12" y="206" width="80" height="26" rx="6" />
      <rect x="808" y="206" width="80" height="26" rx="6" />
    </g>
    <g class="cache-map-chip cache-map-chip-site">
      <rect x="300" y="206" width="100" height="26" rx="6" />
      <rect x="450" y="206" width="100" height="26" rx="6" />
    </g>

    <g class="cache-map-name">
      <text x="52" y="224">dials</text>
      <text x="848" y="224">h5py</text>
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

.cache-map-group text,
.cache-map-label,
.cache-map-label text {
  fill: var(--prefix-muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: var(--prefix-tracking-wide);
  text-transform: uppercase;
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
</style>
