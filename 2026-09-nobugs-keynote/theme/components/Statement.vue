<!-- Sentence that closes a slide. -->

<template>
  <p class="statement"><slot /></p>
</template>

<style>
.slidev-layout {
  .statement {
    margin: 1.5rem 0 0;
    font-size: var(--prefix-text-xl);
    line-height: 1.25;
    text-align: center;
  }
}
</style>
