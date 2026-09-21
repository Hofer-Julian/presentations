<!-- Stack of `VerdictRow`s. -->

<template>
  <div class="verdict-list">
    <slot />
  </div>
</template>

<style>
.verdict-list {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.75rem;
}
</style>
