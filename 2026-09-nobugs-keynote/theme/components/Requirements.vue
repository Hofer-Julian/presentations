<!-- Two `Requirement` cards side by side, split by a hairline. -->

<template>
  <div class="requirements">
    <slot />
  </div>
</template>

<style>
.requirements {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
  margin-top: 5rem;
}

.requirements::before {
  content: "";
  position: absolute;
  top: -0.875rem;
  bottom: -0.875rem;
  left: 50%;
  width: 1px;
  background: var(--prefix-border);
}
</style>
