<script setup lang="ts">
const STAGES = [
  { name: 'staged-recipes', detail: 'one review', mono: true },
  { name: 'your feedstock', detail: 'recipe and CI config', highlight: true },
  { name: 'CI', detail: 'builds every platform' },
  { name: 'conda-forge', detail: 'the channel', mono: true },
]

/** What sends the feedstock around the loop again, both as a bot pull request */
const TRIGGERS = [
  { name: 'version update', detail: 'upstream released a new version', x: 60, enter: 300 },
  { name: 'migration', detail: 'a global pin moved, like hdf5 2', x: 490, enter: 380 },
]

const WIDTH = 200
const GAP = 33
const TRIGGER_WIDTH = 290

function x(index: number) {
  return index * (WIDTH + GAP)
}

function centre(trigger: typeof TRIGGERS[number]) {
  return trigger.x + TRIGGER_WIDTH / 2
}

/** Elbow from a trigger box up into the bottom edge of the feedstock */
function elbow(trigger: typeof TRIGGERS[number]) {
  const from = centre(trigger)
  const turn = from < trigger.enter ? 8 : -8
  return `M${from} 170 V150 Q${from} 142 ${from + turn} 142 H${trigger.enter - turn} Q${trigger.enter} 142 ${trigger.enter} 134 V92`
}
</script>

<template>
  <svg
    class="life-cycle"
    viewBox="0 0 900 245"
    role="img"
    aria-label="A recipe is reviewed once in staged-recipes and becomes a feedstock. CI builds it for every platform and publishes it to the conda-forge channel. The feedstock goes around again whenever upstream releases a new version or a global pin moves."
  >
    <g class="life-cycle-box">
      <rect
        v-for="(stage, index) in STAGES"
        :key="stage.name"
        :class="{ 'life-cycle-box-highlight': stage.highlight }"
        :x="x(index)"
        y="0"
        :width="WIDTH"
        height="84"
        rx="12"
      />
      <rect
        v-for="trigger in TRIGGERS"
        :key="trigger.name"
        :x="trigger.x"
        y="170"
        :width="TRIGGER_WIDTH"
        height="68"
        rx="12"
      />
    </g>

    <g class="life-cycle-arrow">
      <template v-for="index in STAGES.length - 1" :key="index">
        <path :d="`M${x(index) - GAP + 1} 42 H${x(index) - 8}`" />
        <path class="life-cycle-head" :d="`M${x(index) - 9} 36 L${x(index) - 1} 42 L${x(index) - 9} 48 Z`" />
      </template>
      <template v-for="trigger in TRIGGERS" :key="trigger.name">
        <path :d="elbow(trigger)" />
        <path class="life-cycle-head" :d="`M${trigger.enter - 6} 92 L${trigger.enter} 84 L${trigger.enter + 6} 92 Z`" />
      </template>
    </g>

    <g class="life-cycle-name">
      <text
        v-for="(stage, index) in STAGES"
        :key="stage.name"
        :class="{ 'life-cycle-mono': stage.mono }"
        :x="x(index) + WIDTH / 2"
        y="36"
      >{{ stage.name }}</text>
      <text v-for="trigger in TRIGGERS" :key="trigger.name" :x="centre(trigger)" y="200">{{ trigger.name }}</text>
    </g>

    <g class="life-cycle-detail">
      <text
        v-for="(stage, index) in STAGES"
        :key="stage.name"
        :x="x(index) + WIDTH / 2"
        y="59"
      >{{ stage.detail }}</text>
      <text v-for="trigger in TRIGGERS" :key="trigger.name" :x="centre(trigger)" y="222">{{ trigger.detail }}</text>
    </g>
  </svg>
</template>

<style>
/* Stages a conda-forge package passes through */
.life-cycle {
  display: block;
  width: 100%;
  margin: 1.75rem 0 0.5rem;
}

.life-cycle-box rect {
  fill: var(--keynote-white);
  stroke: var(--keynote-border);
}

.life-cycle-box rect.life-cycle-box-highlight {
  fill: var(--keynote-yellow);
  stroke: var(--keynote-yellow);
}

.life-cycle-name text {
  fill: var(--keynote-ink);
  font-size: 16px;
  font-weight: 600;
  text-anchor: middle;
}

.life-cycle-name text.life-cycle-mono {
  font-family: var(--keynote-font-mono);
  font-size: 14px;
}

.life-cycle-detail text {
  fill: var(--keynote-muted);
  font-size: 13px;
  text-anchor: middle;
}

.life-cycle-arrow path,
.life-cycle-loop path {
  fill: none;
  stroke: var(--keynote-muted);
  stroke-width: 1.5;
}

.life-cycle-arrow path.life-cycle-head,
.life-cycle-loop path.life-cycle-head {
  fill: var(--keynote-muted);
  stroke: none;
}

.life-cycle-loop-label {
  fill: var(--keynote-muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: var(--keynote-tracking-wide);
  text-anchor: middle;
  text-transform: uppercase;
}
</style>
