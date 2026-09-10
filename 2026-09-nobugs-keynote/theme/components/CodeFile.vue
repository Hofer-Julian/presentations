<!-- Code block under a bar naming the file it comes from. -->

<script setup lang="ts">
defineProps<{
  name: string
  accent?: boolean
}>()
</script>

<template>
  <div class="code-file" :class="{ 'code-file-accent': accent }">
    <p class="code-file-name">{{ name }}</p>
    <slot />
  </div>
</template>

<style>
/* Selectors carry the layout class so the theme's generic paragraph rules
   cannot reclaim the bar's colour, size or margins. */
.slidev-layout .code-file {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--prefix-radius-sm);
  /* Slidev applies these variables with !important, so the block is rounded
     by this container instead and the bar meets the code on a straight edge */
  --slidev-code-margin: 0;
  --slidev-code-radius: 0;
}

.slidev-layout .code-file .code-file-name {
  margin: 0;
  padding: 0.5rem 0.75rem;
  background: var(--prefix-ink);
  color: var(--prefix-white);
  font-size: var(--prefix-text-2xs);
  font-weight: 600;
  letter-spacing: var(--prefix-tracking-slight);
}

.slidev-layout .code-file pre {
  border-top: 0;
}

/* Marks the code block as the point of the slide */
.slidev-layout .code-file-accent pre {
  border-left: var(--prefix-rule) solid var(--prefix-yellow);
}
</style>
