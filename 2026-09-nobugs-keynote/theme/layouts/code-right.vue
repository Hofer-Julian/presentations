<script setup lang="ts">
import SlideMeta from '../components/SlideMeta.vue'

const props = defineProps<{
  eyebrow?: string
  link?: string
  split?: string
}>()
</script>

<template>
  <div class="slidev-layout code-right-layout">
    <SlideMeta :eyebrow="props.eyebrow" :link="props.link" />
    <slot name="title" />
    <div class="code-right-grid" :style="props.split ? { gridTemplateColumns: props.split } : undefined">
      <div class="code-right-copy">
        <slot />
        <slot name="left" />
      </div>
      <div class="code-right-code"><slot name="right" /></div>
    </div>
    <slot name="after" />
  </div>
</template>
