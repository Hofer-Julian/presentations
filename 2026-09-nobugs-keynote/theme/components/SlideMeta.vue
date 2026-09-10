<script setup lang="ts">
import Ref from './Ref.vue'

defineProps<{
  eyebrow?: string
  link?: string
}>()
</script>

<template>
  <header class="slide-meta">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <Ref v-if="link" :to="link" />
  </header>
</template>

<style>
/* Eyebrow and reference sharing the line above the heading */
.slide-meta {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  min-height: 1.75rem;
  margin: 0 0 0.75rem;
}

/* The row carries the gap below it, so the eyebrow does not add its own */
.slidev-layout .slide-meta .eyebrow,
.keynote-image-layout .slide-meta .eyebrow {
  margin: 0;
}
</style>
