<script setup lang="ts">
import { computed } from 'vue'
import { assetUrl } from '../utils/asset'

const props = defineProps<{
  href?: string
  label?: string
  src: string
}>()

const imageSrc = computed(() => assetUrl(props.src))
</script>

<template>
  <a class="slides-qr" :href="href" target="_blank" rel="noopener noreferrer">
    <img :src="imageSrc" alt="QR code for the hosted slides" />
    <span>{{ label }}</span>
  </a>
</template>
