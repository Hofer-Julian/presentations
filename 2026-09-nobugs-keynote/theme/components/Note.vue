<!-- Aside on a yellow ground that qualifies the slide. -->

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
.slidev-layout .note {
  margin: 0.75rem 0 0;
  padding: 0.75rem 1rem;
  background: var(--prefix-yellow-soft);
  border-left: var(--prefix-rule) solid var(--prefix-yellow);
  border-radius: 0 var(--prefix-radius-sm) var(--prefix-radius-sm) 0;
}

.slidev-layout .note-small {
  font-size: var(--prefix-text-base);
}
</style>
