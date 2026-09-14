<!-- Labelled row of logos, one per item. -->

<script setup lang="ts">
import { assetUrl } from '../utils/asset'

interface Logo {
  alt: string
  /** Multiplier on the shared row height, to even out optical weight. */
  scale?: number
  src: string
}

defineProps<{
  items: Logo[]
  label: string
}>()
</script>

<template>
  <div class="logo-row">
    <span class="logo-row-label">{{ label }}</span>
    <ul role="list">
      <li v-for="logo in items" :key="logo.src">
        <img
          :src="assetUrl(logo.src)"
          :alt="logo.alt"
          :style="logo.scale ? { height: `calc(var(--logo-row-height) * ${logo.scale})` } : undefined"
        />
      </li>
    </ul>
  </div>
</template>

<style>
.logo-row {
  --logo-row-height: 3.5rem;
  /* Sets the logos off from the copy without letting them drift into the footer */
  margin-top: 2.5rem;
}

.logo-row-label {
  display: block;
  color: var(--prefix-muted);
  font-size: var(--prefix-text-xs);
  letter-spacing: var(--prefix-tracking-wide);
  text-transform: uppercase;
}

.logo-row ul {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 0;
  margin: 1rem 0 0;
  list-style: none;
}

.logo-row li {
  margin: 0;
}

.logo-row ul > li::before {
  content: none;
}

.logo-row img {
  display: block;
  width: auto;
  height: var(--logo-row-height);
}
</style>
