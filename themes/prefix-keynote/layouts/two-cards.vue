<script setup lang="ts">
const props = defineProps<{
  class?: string
  eyebrow?: string
}>()
</script>

<template>
  <div class="slidev-layout statement-slide" :class="props.class">
    <p v-if="props.eyebrow" class="eyebrow">{{ props.eyebrow }}</p>
    <slot />
    <div class="role-pair">
      <div><slot name="left" /></div>
      <div><slot name="right" /></div>
    </div>
    <slot name="after" />
  </div>
</template>
