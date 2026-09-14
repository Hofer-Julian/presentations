<!-- Card making one point, with an optional label above its heading. -->

<script setup lang="ts">
import Label from './Label.vue'

defineProps<{
  /** Picks out the second card of a pair with the yellow edge */
  accent?: boolean
  heading: string
  label?: string
}>()
</script>

<template>
  <div class="card" :class="{ 'card-accent': accent }">
    <Label v-if="label">{{ label }}</Label>
    <h2>{{ heading }}</h2>
    <slot />
  </div>
</template>

<style>
.card {
  padding: 1.5rem;
  background: var(--prefix-white);
  border-top: 0.5rem solid var(--prefix-ink);
  border-radius: 0 0 var(--prefix-radius-md) var(--prefix-radius-md);
}

.card-accent {
  border-top-color: var(--prefix-yellow);
}

.slidev-layout .card h2 {
  margin-top: 0.875rem;
  margin-bottom: 0.75rem;
}

.slidev-layout .card h2:first-child {
  margin-top: 0;
}

.slidev-layout .card p {
  color: var(--prefix-muted);
  font-size: var(--prefix-text-base);
}

.slidev-layout .card p:last-child {
  margin-bottom: 0;
}

.slidev-layout .card code {
  font-size: var(--prefix-text-xs);
}
</style>
