<template>
  <div class="slidev-layout compare-layout">
    <slot />
    <div class="compare-grid">
      <div><slot name="left" /></div>
      <div><slot name="right" /></div>
    </div>
    <slot name="after" />
  </div>
</template>

<style>
/* Two takes on the same thing, side by side, held in the middle of the slide */
.compare-layout {
  display: flex;
  height: 100%;
  flex-direction: column;

  .compare-grid {
    display: grid;
    flex: 1;
    grid-template-columns: 1fr 1fr;
    align-content: center;
    gap: 2rem;

    .slidev-layout & {
      h2 {
        margin-bottom: 1rem;
        font-size: var(--prefix-text-2xl);
      }

      p {
        margin: 0.75rem 0 0;
        color: var(--prefix-muted);
        font-size: var(--prefix-text-base);
      }

      /* The line under a column is the point of that column, not an aside. It stays
         a child selector so the file-name bar inside a CodeFile keeps its own rules. */
      > div > p {
        margin: 1rem 0 0;
        color: var(--prefix-ink);
        font-size: var(--prefix-text-lg);
      }
    }
  }
}
</style>
