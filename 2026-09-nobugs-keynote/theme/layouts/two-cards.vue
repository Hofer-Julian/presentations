<script setup lang="ts">
defineProps<{
  eyebrow?: string
}>()
</script>

<template>
  <div class="slidev-layout two-cards-layout">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <slot />
    <div class="role-pair">
      <div><slot name="left" /></div>
      <div><slot name="right" /></div>
    </div>
    <slot name="after" />
  </div>
</template>
