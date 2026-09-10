<script setup lang="ts">
defineProps<{
  /** Picks out the second card of a pair with the yellow edge */
  accent?: boolean
  heading: string
  label: string
}>()
</script>

<template>
  <div class="requirement" :class="{ 'requirement-accent': accent }">
    <span class="label">{{ label }}</span>
    <h2>{{ heading }}</h2>
    <p><slot /></p>
  </div>
</template>

<style>
/* Card carrying one demand the software has to meet */
.requirement {
  padding: 1.5rem;
  background: var(--keynote-white);
  border-top: 0.5rem solid var(--keynote-ink);
  border-radius: 0 0 var(--keynote-radius-md) var(--keynote-radius-md);
}

.requirement-accent {
  border-top-color: var(--keynote-yellow);
}

/* Reserving two lines keeps the paragraphs of a pair on the same baseline */
.slidev-layout .requirement h2 {
  min-height: 2lh;
  margin-top: 0.875rem;
}

.slidev-layout .requirement p {
  margin-bottom: 0;
  color: var(--keynote-muted);
  font-size: var(--keynote-text-base);
}
</style>
