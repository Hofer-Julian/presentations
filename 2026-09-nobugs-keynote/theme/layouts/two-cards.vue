<script setup lang="ts">
import SlideMeta from '../components/SlideMeta.vue'

defineProps<{
  eyebrow?: string
  link?: string
}>()
</script>

<template>
  <div class="slidev-layout two-cards-layout">
    <SlideMeta :eyebrow="eyebrow" :link="link" />
    <slot />
    <div class="role-pair">
      <div><slot name="left" /></div>
      <div><slot name="right" /></div>
    </div>
    <slot name="after" />
  </div>
</template>

<style>
.slidev-layout.two-cards-layout {
  display: flex;
  flex-direction: column;
}

/* Two cards, each opened by a yellow edge */
.role-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1.75rem;
}

/* A card row with nothing after it fills the slide */
.role-pair:last-child {
  flex: 1;
}

.role-pair > div {
  display: flex;
  min-height: 9rem;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1.25rem;
  background: var(--prefix-white);
  border-left: var(--prefix-rule) solid var(--prefix-yellow);
  border-radius: 0 var(--prefix-radius-md) var(--prefix-radius-md) 0;
}

.slidev-layout .role-pair p {
  margin: 0.5rem 0;
  font-size: var(--prefix-text-md);
}

.slidev-layout .role-pair code {
  font-size: var(--prefix-text-xs);
}
</style>
