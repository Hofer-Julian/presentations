<script setup lang="ts">
import SlideMeta from '../components/SlideMeta.vue'

defineProps<{
  eyebrow?: string
  link?: string
}>()
</script>

<template>
  <div class="slidev-layout compare-layout">
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
  font-size: var(--keynote-text-xl);
}

.slidev-layout .compare-grid p {
  margin: 0.75rem 0 0;
  color: var(--keynote-muted);
  font-size: var(--keynote-text-base);
}
</style>
