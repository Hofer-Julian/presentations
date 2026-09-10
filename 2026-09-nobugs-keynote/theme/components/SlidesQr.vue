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

<style>
/* QR code plus caption */
.slides-qr {
  display: grid;
  justify-items: center;
  gap: 0.625rem;
}

.slides-qr img {
  display: block;
  width: 10rem;
  height: 10rem;
  padding: 0.5rem;
  background: var(--prefix-white);
  border: 1px solid var(--prefix-border);
  border-radius: var(--prefix-radius-md);
}

.slides-qr span {
  font-size: var(--prefix-text-xs);
  font-weight: 500;
  letter-spacing: var(--prefix-tracking-slight);
}

/* The code itself is the link, so it carries no underline of its own */
.slidev-layout a.slides-qr,
.slidev-layout a.slides-qr:hover {
  border-bottom: 0;
}
</style>
