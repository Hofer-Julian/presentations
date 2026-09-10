<script setup lang="ts">
import SlideMeta from '../components/SlideMeta.vue'

const props = defineProps<{
  eyebrow?: string
  link?: string
  split?: string
}>()
</script>

<template>
  <div class="slidev-layout code-right-layout">
    <SlideMeta :eyebrow="props.eyebrow" :link="props.link" />
    <slot name="title" />
    <div class="code-right-grid" :style="props.split ? { gridTemplateColumns: props.split } : undefined">
      <div class="code-right-copy">
        <slot />
        <slot name="left" />
      </div>
      <div class="code-right-code"><slot name="right" /></div>
    </div>
    <slot name="after" />
  </div>
</template>

<style>
.slidev-layout.code-right-layout {
  display: flex;
  flex-direction: column;
}

.code-right-grid {
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  flex: 1;
  gap: 2rem;
  align-items: stretch;
  min-height: 0;
}

/* A grid followed by more content keeps its own height */
.code-right-grid:not(:last-child) {
  flex: none;
}

.code-right-copy {
  padding-top: 0.25rem;
}

.slidev-layout.code-right-layout > h1 {
  margin-bottom: 1rem;
}

/* A title placed in the left column instead of above the grid */
.slidev-layout .code-right-copy h1 {
  margin-bottom: 1rem;
  font-size: 2.25rem;
}
</style>
