<script setup lang="ts">
import SlideMeta from '../components/SlideMeta.vue'
</script>

<template>
  <div class="slidev-layout toc-slide">
    <SlideMeta />
    <slot />
  </div>
</template>

<style>
/* Every part of the talk as its own card */
.slidev-layout.toc-slide ul {
  display: grid;
  max-width: 48rem;
  gap: 0.625rem;
  margin: 0.875rem 0 0;
  padding: 0;
  list-style: none;
}

.slidev-layout.toc-slide li {
  display: flex;
  align-items: center;
  min-height: 3.5rem;
  margin: 0;
  padding: 0.625rem 1.25rem;
  background: var(--keynote-white);
  border: 1px solid var(--keynote-border);
  border-radius: var(--keynote-radius-md);
}

.slidev-layout.toc-slide ul > li::before {
  content: none;
}

.slidev-layout.toc-slide li strong {
  font-size: var(--keynote-text-md);
}
</style>
