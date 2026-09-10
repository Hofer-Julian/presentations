<script setup lang="ts">
defineProps<{
  state: 'shipped' | 'preview' | 'prototype'
}>()
</script>

<template>
  <div class="status-row">
    <span class="status-badge" :class="`status-badge-${state}`">{{ state }}</span>
    <strong><slot /></strong>
  </div>
</template>

<style>
/* Readiness row */
.status-row {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 1.5rem;
  align-items: center;
  min-height: 4rem;
  padding: 1rem;
  background: var(--keynote-white);
  border: 1px solid var(--keynote-border);
  border-radius: var(--keynote-radius-md);
}

.slidev-layout .status-row strong {
  font-size: var(--keynote-text-md);
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: var(--keynote-radius-pill);
  font-size: var(--keynote-text-2xs);
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
}

.status-badge-shipped {
  background: var(--keynote-shipped);
  color: var(--keynote-shipped-ink);
}

.status-badge-preview {
  background: var(--keynote-preview);
  color: var(--keynote-preview-ink);
}

.status-badge-prototype {
  background: var(--keynote-prototype);
  color: var(--keynote-prototype-ink);
}
</style>
