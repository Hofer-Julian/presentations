<!-- Small uppercase caption above a value. -->

<template>
  <span class="label"><slot /></span>
</template>

<style>
.label {
  display: block;
  color: var(--prefix-muted);
  font-size: var(--prefix-text-2xs);
  font-weight: 600;
  letter-spacing: var(--prefix-tracking-wide);
  text-transform: uppercase;
}
</style>
