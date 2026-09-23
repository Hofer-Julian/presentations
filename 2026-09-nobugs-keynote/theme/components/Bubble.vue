<!-- One way to reach the speaker, as a card. Becomes a link when `href` is set. -->

<script setup lang="ts">
defineProps<{
  href?: string
}>()
</script>

<template>
  <component :is="href ? 'a' : 'div'" class="bubble" :href="href">
    <slot />
  </component>
</template>

<style>
.bubble {
  display: flex;
  min-width: 0;
  min-height: 5.5rem;
  padding: 1.25rem;
  align-items: center;
  justify-content: center;
  background: var(--prefix-white);
  border-radius: var(--prefix-radius-xl);
  color: var(--prefix-ink);
  font-size: var(--prefix-text-xl);
  font-weight: 500;
  text-align: center;
  text-wrap: balance;

  /* The whole bubble is the link, so it carries no underline of its own */
  &:is(.slidev-layout a),
  &:is(.slidev-layout a):hover {
    border-bottom: 0;
  }
}
</style>
