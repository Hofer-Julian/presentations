<script setup lang="ts">
defineProps<{
  name: string
  accent?: boolean
}>()
</script>

<template>
  <div class="code-file" :class="{ 'code-file-accent': accent }">
    <p class="code-file-name">{{ name }}</p>
    <slot />
  </div>
</template>
