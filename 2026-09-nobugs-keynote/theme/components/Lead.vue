<!-- Sentence between the heading and the body of a slide. -->

<template>
  <p class="lead"><slot /></p>
</template>

<style>
.slidev-layout {
  .lead {
    margin: -0.5rem 0 1.25rem;
    color: var(--prefix-muted);
    font-size: var(--prefix-text-lg);
  }
}
</style>
