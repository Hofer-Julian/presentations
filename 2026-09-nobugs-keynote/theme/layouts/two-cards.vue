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
