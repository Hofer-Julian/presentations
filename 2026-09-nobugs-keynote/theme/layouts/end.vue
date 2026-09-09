<script setup lang="ts">
defineProps<{
  email?: string
  qr?: string
  qrHref?: string
  qrLabel?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="slidev-layout end keynote-end">
    <slot />
    <p v-if="subtitle" class="closing-subtitle">{{ subtitle }}</p>
    <div class="closing-options">
      <slot name="options" />
      <a v-if="email" class="closing-option closing-option-accent" :href="`mailto:${email}`">
        <span class="closing-label">By email</span>
        <strong class="closing-detail">{{ email }}</strong>
      </a>
    </div>
    <SlidesQr v-if="qr" class="end-slides-qr" :src="qr" :href="qrHref" :label="qrLabel" />
  </div>
</template>
