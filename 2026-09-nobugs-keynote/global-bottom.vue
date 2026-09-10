<template>
  <footer v-if="$nav.currentLayout !== 'cover'" class="keynote-footer">
    <img src="/prefix-logo.svg" alt="Prefix.dev" />
    <div class="keynote-footer-meta">
      <span>NOBUGS 2026 - 23 September 2026</span>
      <span class="keynote-page">{{ $nav.currentPage }}</span>
    </div>
  </footer>
</template>

<style>
.keynote-footer {
  position: absolute;
  z-index: 10;
  right: 2.25rem;
  bottom: 1.25rem;
  left: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--keynote-ink);
}

/* Paper behind the logo, so it stays readable over a diagram */
.keynote-footer > img {
  width: 7.5rem;
  height: auto;
  padding: 0.375rem 0.5rem;
  margin-left: -0.5rem;
  background: var(--keynote-paper);
  border-radius: var(--keynote-radius-sm);
}

.keynote-footer-meta {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: var(--keynote-text-2xs);
  letter-spacing: var(--keynote-tracking-slight);
}

.keynote-page {
  display: grid;
  place-items: center;
  min-width: 1.75rem;
  height: 1.75rem;
  padding: 0 0.375rem;
  background: var(--keynote-white);
  border: 1px solid var(--keynote-border);
  border-radius: 50%;
  font-variant-numeric: tabular-nums;
}
</style>
