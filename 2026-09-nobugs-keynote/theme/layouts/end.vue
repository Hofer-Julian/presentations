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
  color: var(--prefix-muted);
  font-size: var(--prefix-text-md);
}

.keynote-end .slides-qr {
  width: max-content;
  margin: 2.25rem auto 0;
}

/* The one thing to act on, big enough to scan from the back of the room */
.keynote-end .slides-qr img {
  width: 12rem;
  height: 12rem;
}
</style>
