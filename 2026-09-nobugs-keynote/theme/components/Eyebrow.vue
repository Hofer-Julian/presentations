<!-- Small uppercase line introducing the heading under it. -->

<template>
  <p class="eyebrow"><slot /></p>
</template>

<style>
/* Beats the paragraph margin the slide sets on everything else */
.slidev-layout .eyebrow,
.keynote-image-layout .eyebrow {
  margin: 0 0 0.75rem;
  color: var(--prefix-ink);
  font-size: var(--prefix-text-xs);
  font-weight: 600;
  letter-spacing: var(--prefix-tracking-wide);
  text-transform: uppercase;
}
</style>
