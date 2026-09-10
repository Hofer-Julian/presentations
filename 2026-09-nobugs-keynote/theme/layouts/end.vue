<template>
  <div class="slidev-layout end keynote-end">
    <slot />
  </div>
</template>

<style>
.slidev-layout.keynote-end {
  padding: 3rem 4rem 4rem;
  text-align: center;
}

.slidev-layout.keynote-end h1 {
  margin: 0 auto 0.5rem;
}

/* The gap below comes from the theme's paragraph margin */
.slidev-layout.keynote-end .closing-subtitle {
  color: var(--keynote-muted);
  font-size: var(--keynote-text-md);
}

.keynote-end .slides-qr {
  width: max-content;
  margin: 1.5rem auto 0;
}
</style>
