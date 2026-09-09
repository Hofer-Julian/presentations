<script setup lang="ts">
defineProps<{
  href?: string
  label: string
}>()
</script>

<template>
  <component :is="href ? 'a' : 'div'" class="bubble" :href="href">
    <span class="bubble-label">{{ label }}</span>
    <strong class="bubble-detail"><slot /></strong>
  </component>
</template>
