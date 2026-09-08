<script setup lang="ts">
defineProps<{
  eyebrow?: string
  qr?: string
  qrHref?: string
  qrLabel?: string
  speaker?: string
}>()
</script>

<template>
  <div class="slidev-layout cover keynote-cover">
    <img class="cover-brand" src="/prefix-logo.svg" alt="Prefix.dev" />
    <div class="cover-content">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <slot />
      <p v-if="speaker" class="cover-speaker">{{ speaker }}</p>
    </div>
    <SlidesQr v-if="qr" class="cover-slides-qr" :src="qr" :href="qrHref" :label="qrLabel" />
  </div>
</template>
