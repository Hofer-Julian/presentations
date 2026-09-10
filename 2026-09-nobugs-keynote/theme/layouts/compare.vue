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
