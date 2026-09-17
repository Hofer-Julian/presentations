<script setup lang="ts">
const props = defineProps<{
  label?: string
}>()
</script>

<template>
  <div class="slidev-layout keynote-section">
    <p v-if="props.label" class="section-label">{{ props.label }}</p>
    <slot />
  </div>
</template>

<style>
/* A yellow bar down the left edge marks the start of a part */
.slidev-layout.keynote-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 6rem 5rem;
  background:
    linear-gradient(90deg, var(--prefix-yellow) 0 0.875rem, transparent 0.875rem),
    var(--prefix-paper);
}

.slidev-layout.keynote-section .section-label {
  margin: 0 0 1rem;
  font-size: var(--prefix-text-sm);
  font-weight: 600;
  letter-spacing: var(--prefix-tracking-wide);
  text-transform: uppercase;
}

.slidev-layout.keynote-section h1 {
  max-width: 48rem;
  margin-bottom: 1.25rem;
  font-size: 3.75rem;
}
</style>
