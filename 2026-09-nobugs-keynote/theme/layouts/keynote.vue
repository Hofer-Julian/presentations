<script setup lang="ts">
defineProps<{
  eyebrow?: string
}>()
</script>

<template>
  <div class="slidev-layout default">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <slot />
  </div>
</template>
