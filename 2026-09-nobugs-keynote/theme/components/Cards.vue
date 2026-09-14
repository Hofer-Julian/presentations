<!-- Two `Card`s side by side. -->

<template>
  <div class="cards">
    <slot />
  </div>
</template>

<style>
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
  margin-top: 2.5rem;
}
</style>
