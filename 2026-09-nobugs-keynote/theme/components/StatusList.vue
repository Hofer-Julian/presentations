<!-- Stack of `StatusRow`s. -->

<template>
  <div class="status-list">
    <slot />
  </div>
</template>

<style>
.status-list {
  display: grid;
  gap: 0.875rem;
  margin-top: 2rem;
}
</style>
