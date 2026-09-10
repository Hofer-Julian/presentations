<script setup lang="ts">
import SlideMeta from '../components/SlideMeta.vue'

defineProps<{
  eyebrow?: string
  link?: string
}>()
</script>

<template>
  <div class="slidev-layout default">
    <SlideMeta :eyebrow="eyebrow" :link="link" />
    <slot />
  </div>
</template>
