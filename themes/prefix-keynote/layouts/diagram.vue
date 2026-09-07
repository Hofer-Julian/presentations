<script setup lang="ts">
const props = defineProps<{
  alt: string
  caption: string
  eyebrow: string
  image: string
}>()
</script>

<template>
  <div class="slidev-layout diagram-slide">
    <p class="eyebrow">{{ props.eyebrow }}</p>
    <slot />
    <img class="workflow-diagram" :src="props.image" :alt="props.alt" />
    <p class="slide-caption">{{ props.caption }}</p>
  </div>
</template>
