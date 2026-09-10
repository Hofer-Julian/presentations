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

<style>
/* A band of yellow down the right edge holds the logo and the QR code */
.slidev-layout.keynote-cover {
  position: relative;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  padding: 6rem 4rem 3.5rem;
  background:
    linear-gradient(90deg, transparent 0 74%, var(--keynote-yellow-wash) 74% 100%),
    var(--keynote-paper);
  text-align: left;
}

.cover-brand {
  position: absolute;
  z-index: 2;
  bottom: 2.75rem;
  left: 87%;
  width: 9rem;
  transform: translateX(-50%);
}

.cover-content {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
}

.slidev-layout.keynote-cover h1 {
  max-width: 48rem;
  margin: 0;
  font-size: 4rem;
  line-height: 1.125;
}

/* First line of the title, set lighter than the line it introduces */
.keynote-cover .cover-title-lead {
  display: block;
  font-weight: 300;
}

.cover-speaker {
  margin: 1.25rem 0 0;
  font-size: var(--keynote-text-md);
}

.cover-slides-qr {
  position: absolute;
  top: 2.75rem;
  left: 87%;
  width: max-content;
  transform: translateX(-50%);
}
</style>
