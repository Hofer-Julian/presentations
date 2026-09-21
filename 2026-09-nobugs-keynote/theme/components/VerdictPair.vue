<!-- Two `VerdictRow`s side by side, for things worth comparing directly. -->

<template>
  <div class="verdict-pair">
    <slot />
  </div>
</template>

<style>
.verdict-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.verdict-pair .verdict-row {
  grid-template-columns: 1fr auto;
  gap: 0.5rem 1rem;
}

.verdict-pair .verdict-kind {
  grid-column: 1 / -1;
}
</style>
