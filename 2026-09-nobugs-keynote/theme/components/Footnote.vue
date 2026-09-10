<template>
  <p class="footnote">
    <slot />
  </p>
</template>

<style>
/* Caveat set below the body of a slide */
.slidev-layout .footnote {
  color: var(--keynote-muted);
  font-size: var(--keynote-text-xs);
}
</style>
