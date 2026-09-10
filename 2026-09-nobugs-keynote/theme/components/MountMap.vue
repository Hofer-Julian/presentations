<script setup lang="ts">
const ENVS = [320, 517, 714]
const BAR_COLUMNS = [0, 50, 100]
const BAR_ROWS = [52, 66, 80]
const CACHE_COLUMNS = [10, 60, 110, 160]
</script>

<template>
  <svg
    class="mount-map"
    viewBox="0 0 900 245"
    role="img"
    aria-label="Today every environment holds a copy of the cache's files. With a virtual filesystem the environments hold no files and read from the cache on demand"
  >
    <g class="mount-map-row-label">
      <text x="0" y="10">Today</text>
      <text x="0" y="137">With a virtual filesystem</text>
    </g>

    <!-- Today: the cache and every environment hold the same files -->
    <g class="mount-map-box">
      <rect x="0" y="20" width="210" height="88" rx="10" />
      <rect v-for="x in ENVS" :key="x" :x="x" y="20" width="186" height="88" rx="10" />
    </g>

    <g class="mount-map-label">
      <text x="14" y="40">Package cache</text>
      <text v-for="(x, index) in ENVS" :key="x" :x="x + 14" y="40">Environment {{ index + 1 }}</text>
    </g>

    <g class="mount-map-bar">
      <template v-for="y in BAR_ROWS" :key="y">
        <rect v-for="x in CACHE_COLUMNS" :key="x" :x="x" :y="y" width="42" height="8" rx="2" />
      </template>
      <template v-for="envX in ENVS" :key="envX">
        <template v-for="y in BAR_ROWS" :key="y">
          <rect v-for="x in BAR_COLUMNS" :key="x" :x="envX + 14 + x" :y="y" width="42" height="8" rx="2" />
        </template>
      </template>
    </g>

    <g class="mount-map-flow">
      <path d="M222 64 H292" />
      <path class="mount-map-head" d="M292 56 L308 64 L292 72 Z" />
    </g>
    <text class="mount-map-flow-label" x="265" y="50">copies</text>

    <!-- With a virtual filesystem: only the cache holds files -->
    <g class="mount-map-box">
      <rect x="0" y="147" width="210" height="88" rx="10" />
    </g>
    <g class="mount-map-box mount-map-box-empty">
      <rect v-for="x in ENVS" :key="x" :x="x" y="147" width="186" height="88" rx="10" />
    </g>

    <g class="mount-map-label">
      <text x="14" y="167">Package cache</text>
      <text v-for="(x, index) in ENVS" :key="x" :x="x + 14" y="167">Environment {{ index + 1 }}</text>
    </g>

    <g class="mount-map-bar">
      <template v-for="y in BAR_ROWS" :key="y">
        <rect v-for="x in CACHE_COLUMNS" :key="x" :x="x" :y="y + 127" width="42" height="8" rx="2" />
      </template>
    </g>

    <g class="mount-map-flow mount-map-flow-accent">
      <path d="M238 191 H308" />
      <path class="mount-map-head" d="M238 183 L222 191 L238 199 Z" />
    </g>
    <text class="mount-map-flow-label" x="265" y="177">reads</text>
  </svg>
</template>

<style>
/* Files an environment holds, with and without a virtual filesystem */
.mount-map {
  display: block;
  width: 100%;
  margin: 0.25rem 0 0.5rem;
}

.mount-map-row-label text {
  fill: var(--prefix-ink);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: var(--prefix-tracking-wide);
  text-transform: uppercase;
}

.mount-map-box rect {
  fill: var(--prefix-white);
  stroke: var(--prefix-border);
}

.mount-map-box-empty rect {
  fill: none;
  stroke: var(--prefix-ink);
  stroke-dasharray: 5 5;
  opacity: 0.45;
}

.mount-map-label text {
  fill: var(--prefix-muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: var(--prefix-tracking-wide);
  text-transform: uppercase;
}

.mount-map-bar rect {
  fill: var(--prefix-ink);
  opacity: 0.18;
}

.mount-map-flow path {
  fill: none;
  stroke: var(--prefix-ink);
  stroke-width: 2;
  opacity: 0.4;
}

.mount-map-flow .mount-map-head {
  fill: var(--prefix-ink);
  stroke: none;
  opacity: 0.4;
}

.mount-map-flow-accent path {
  stroke: var(--prefix-ink);
  opacity: 0.75;
}

.mount-map-flow-accent .mount-map-head {
  fill: var(--prefix-ink);
  opacity: 0.75;
}

.mount-map-flow-label {
  fill: var(--prefix-muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: var(--prefix-tracking-wide);
  text-anchor: middle;
  text-transform: uppercase;
}
</style>
