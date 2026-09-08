<script setup lang="ts">
const props = defineProps<{
  label?: string
}>()
</script>

<template>
  <div class="slidev-layout keynote-section">
    <p v-if="props.label" class="section-label">{{ props.label }}</p>
    <slot />
  </div>
</template>
