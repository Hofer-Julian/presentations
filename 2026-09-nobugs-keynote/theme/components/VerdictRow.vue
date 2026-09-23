<!-- One piece of the conda ecosystem, badged with what it costs. -->

<script setup lang="ts">
defineProps<{
  kind: string
  name: string
  verdict: 'open' | 'free' | 'commercial' | 'soon'
}>()
</script>

<template>
  <div class="verdict-row">
    <span class="verdict-kind">{{ kind }}</span>
    <div>
      <strong>{{ name }}</strong>
      <p class="verdict-sub"><slot /></p>
    </div>
    <span class="verdict-badge" :class="`verdict-badge-${verdict}`">{{ verdict }}</span>
  </div>
</template>

<style>
.verdict-row {
  display: grid;
  grid-template-columns: 7rem 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding: 0.875rem 1.25rem;
  background: var(--prefix-white);
  border: 1px solid var(--prefix-border);
  border-radius: var(--prefix-radius-md);

  .verdict-kind {
    color: var(--prefix-muted);
    font-size: var(--prefix-text-2xs);
    font-weight: 600;
    letter-spacing: var(--prefix-tracking-wide);
    text-transform: uppercase;
  }

  .slidev-layout & {
    strong {
      font-size: var(--prefix-text-md);
    }

    .verdict-sub {
      margin: 0.125rem 0 0;
      color: var(--prefix-muted);
      font-size: var(--prefix-text-xs);
    }
  }

  .verdict-badge {
    /* One width for every badge, so they line up down the slide */
    min-width: 6rem;
    padding: 0.25rem 0.75rem;
    border-radius: var(--prefix-radius-pill);
    font-size: var(--prefix-text-2xs);
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;

    &.verdict-badge-open,
    &.verdict-badge-free {
      background: var(--prefix-shipped);
      color: var(--prefix-shipped-ink);
    }

    &.verdict-badge-commercial,
    &.verdict-badge-soon {
      background: var(--prefix-preview);
      color: var(--prefix-preview-ink);
    }
  }
}
</style>
