<script setup lang="ts">
const props = defineProps<{
  class?: string
  eyebrow?: string
}>()
</script>

<template>
  <div class="slidev-layout default" :class="props.class">
    <p v-if="props.eyebrow" class="eyebrow">{{ props.eyebrow }}</p>
    <slot />
  </div>
</template>
