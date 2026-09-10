<!-- Caveat set small and muted below the body of a slide. -->

<template>
  <p class="footnote">
    <slot />
  </p>
</template>

<style>
.slidev-layout .footnote {
  color: var(--prefix-muted);
  font-size: var(--prefix-text-xs);
}
</style>
