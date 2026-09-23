<template>
  <div class="slidev-layout toc-slide">
    <slot />
  </div>
</template>

<style>
/* Every part of the talk as its own card */
.slidev-layout.toc-slide {
  ul {
    display: grid;
    max-width: 48rem;
    gap: 0.5rem;
    margin: 0.875rem 0 0;
    padding: 0;
    list-style: none;

    > li::before {
      content: none;
    }
  }

  li {
    display: flex;
    align-items: center;
    min-height: 2.5rem;
    margin: 0;
    padding: 0.5rem 1.125rem;
    background: var(--prefix-white);
    border: 1px solid var(--prefix-border);
    border-radius: var(--prefix-radius-md);

    strong {
      font-size: var(--prefix-text-md);
    }
  }
}
</style>
