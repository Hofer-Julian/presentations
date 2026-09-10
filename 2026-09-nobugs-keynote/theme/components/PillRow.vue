<script setup lang="ts">
defineProps<{
  items: string[]
  label: string
}>()
</script>

<template>
  <div class="pill-row" role="list" :aria-label="label">
    <span v-for="item in items" :key="item" role="listitem">{{ item }}</span>
  </div>
</template>

<style>
/* Row of outlined chips */
.pill-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin: 0 0 1rem;
}

.pill-row > span {
  padding: 0.25rem 0.75rem;
  background: var(--keynote-white);
  border: 1px solid var(--keynote-border);
  border-radius: var(--keynote-radius-pill);
  font-size: var(--keynote-text-xs);
  font-weight: 500;
  white-space: nowrap;
}
</style>
