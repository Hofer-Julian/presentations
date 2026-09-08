<script setup lang="ts">
defineProps<{
  href?: string
  label?: string
  src: string
}>()
</script>

<template>
  <a class="slides-qr" :href="href" target="_blank" rel="noopener noreferrer">
    <img :src="src" alt="QR code for the hosted slides" />
    <span>{{ label }}</span>
  </a>
</template>
