<template>
  <div class="bubbles">
    <slot />
  </div>
</template>

<style>
/* Row of <Bubble>s, each as wide as the next */
.bubbles {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: 1.5rem;
  align-items: stretch;
}
</style>
