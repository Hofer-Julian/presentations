<script setup lang="ts">
defineProps<{
  number: string | number
  title: string
}>()
</script>

<template>
  <div class="step">
    <span class="step-number">{{ number }}</span>
    <p>
      <strong>{{ title }}</strong><br>
      <slot />
    </p>
  </div>
</template>
