<!-- One way to reach the speaker, as a labelled card. Becomes a link when `href` is set. -->

<script setup lang="ts">
defineProps<{
  href?: string
  label: string
}>()
</script>

<template>
  <component :is="href ? 'a' : 'div'" class="bubble" :href="href">
    <span class="bubble-label">{{ label }}</span>
    <strong class="bubble-detail"><slot /></strong>
  </component>
</template>

<style>
.bubble {
  display: flex;
  min-width: 0;
  min-height: 9rem;
  padding: 1.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--prefix-white);
  border-radius: var(--prefix-radius-xl);
  color: var(--prefix-ink);
  text-align: center;
}

/* The whole bubble is the link, so it carries no underline of its own */
.slidev-layout a.bubble,
.slidev-layout a.bubble:hover {
  border-bottom: 0;
}

.bubble-label {
  margin-bottom: 1rem;
  font-size: var(--prefix-text-xs);
  font-weight: 600;
  letter-spacing: var(--prefix-tracking-wide);
  text-transform: uppercase;
}

.bubble-detail {
  font-size: var(--prefix-text-md);
  font-weight: 500;
}
</style>
