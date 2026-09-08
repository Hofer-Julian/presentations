<script setup lang="ts">
defineProps<{
  state: 'shipped' | 'preview' | 'prototype'
}>()
</script>

<template>
  <div class="status-row">
    <span class="status-badge" :class="`status-badge-${state}`">{{ state }}</span>
    <strong><slot /></strong>
  </div>
</template>
