<template>
  <div class="status-list">
    <slot />
  </div>
</template>

<style>
/* Stack of <StatusRow>s */
.status-list {
  display: grid;
  gap: 0.875rem;
  margin-top: 2rem;
}
</style>
