<!-- QR code linking somewhere worth scanning, with an optional caption under it. -->

<script setup lang="ts">
import { computed } from 'vue'
import { assetUrl } from '../utils/asset'

const props = withDefaults(
  defineProps<{
    href?: string
    label?: string
    src: string
    /* Half the usual size, for a code that shares a slide with other content */
    small?: boolean
  }>(),
  { small: false },
)

const imageSrc = computed(() => assetUrl(props.src))
</script>

<template>
  <a
    class="slides-qr"
    :class="{ 'slides-qr-small': small }"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img :src="imageSrc" :alt="`QR code for ${label ?? href}`" />
    <span v-if="label">{{ label }}</span>
  </a>
</template>

<style>
.slides-qr {
  display: grid;
  justify-items: center;
  gap: 0.625rem;

  img {
    display: block;
    width: 10rem;
    height: 10rem;
    padding: 0.5rem;
    background: var(--prefix-white);
    border: 1px solid var(--prefix-border);
    border-radius: var(--prefix-radius-md);
  }

  span {
    font-size: var(--prefix-text-xs);
    font-weight: 500;
    letter-spacing: var(--prefix-tracking-slight);
  }

  &.slides-qr-small {
    gap: 0.375rem;

    img {
      width: 5.5rem;
      height: 5.5rem;
      /* The code itself carries the quiet zone at this size */
      padding: 0;
    }

    span {
      font-size: var(--prefix-text-2xs);
      color: var(--prefix-muted);
    }
  }

  /* The code itself is the link, so it carries no underline of its own */
  &:is(.slidev-layout a),
  &:is(.slidev-layout a):hover {
    border-bottom: 0;
  }
}
</style>
