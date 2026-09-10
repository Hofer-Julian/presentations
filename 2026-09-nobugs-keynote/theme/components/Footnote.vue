<template>
  <p class="footnote">
    <slot />
  </p>
</template>

<style>
/* Caveat set below the body of a slide */
.slidev-layout .footnote {
  color: var(--prefix-muted);
  font-size: var(--prefix-text-xs);
}
</style>
