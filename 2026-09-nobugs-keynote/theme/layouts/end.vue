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
      <a v-if="email" class="closing-option" :href="`mailto:${email}`">
        <span class="closing-label">Send me an email</span>
        <strong class="closing-email">{{ email }}</strong>
      </a>
      <SlidesQr v-if="qr" class="closing-option" :src="qr" :href="qrHref" :label="qrLabel" />
    </div>
  </div>
</template>
