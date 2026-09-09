<script setup lang="ts">
defineProps<{
  eyebrow?: string
}>()
</script>

<template>
  <div class="slidev-layout compare-layout">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <slot />
    <div class="compare-grid">
      <div><slot name="left" /></div>
      <div><slot name="right" /></div>
    </div>
    <slot name="after" />
  </div>
</template>
