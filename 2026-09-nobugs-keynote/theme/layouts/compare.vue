<script setup lang="ts">
import SlideMeta from '../components/SlideMeta.vue'

defineProps<{
  eyebrow?: string
  link?: string
  /** Sets the pair in the middle of the slide, for columns short enough to float */
  centered?: boolean
}>()
</script>

<template>
  <div class="slidev-layout compare-layout" :class="{ 'compare-centered': centered }">
    <SlideMeta :eyebrow="eyebrow" :link="link" />
    <slot />
    <div class="compare-grid">
      <div><slot name="left" /></div>
      <div><slot name="right" /></div>
    </div>
    <slot name="after" />
  </div>
</template>

<style>
/* Two takes on the same thing, side by side */
.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1.25rem;
}

.slidev-layout .compare-grid h2 {
  margin-bottom: 0.75rem;
  font-size: var(--prefix-text-xl);
}

.slidev-layout .compare-grid p {
  margin: 0.75rem 0 0;
  color: var(--prefix-muted);
  font-size: var(--prefix-text-base);
}

/* A short pair keeps the middle of the slide and reads a size up */
.compare-layout.compare-centered {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.compare-centered .compare-grid {
  flex: 1;
  align-content: center;
  margin-top: 0;
}

.slidev-layout.compare-centered .compare-grid h2 {
  margin-bottom: 1rem;
  font-size: var(--prefix-text-2xl);
}

/* The line under a column is the point of that column, not an aside. It stays
   a child selector so the file-name bar inside a CodeFile keeps its own rules. */
.compare-centered .compare-grid > div > p {
  margin: 1rem 0 0;
  color: var(--prefix-ink);
  font-size: var(--prefix-text-lg);
}
</style>
