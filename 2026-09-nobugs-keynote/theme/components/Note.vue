<script setup lang="ts">
defineProps<{
  /** Sets the aside a step below body size, for notes that run long */
  small?: boolean
}>()
</script>

<template>
  <p class="note" :class="{ 'note-small': small }">
    <slot />
  </p>
</template>

<style>
/* Aside that qualifies the slide */
.slidev-layout .note {
  margin: 0.75rem 0 0;
  padding: 0.75rem 1rem;
  background: var(--keynote-yellow-soft);
  border-left: var(--keynote-rule) solid var(--keynote-yellow);
  border-radius: 0 var(--keynote-radius-sm) var(--keynote-radius-sm) 0;
}

.slidev-layout .note-small {
  font-size: var(--keynote-text-base);
}
</style>
