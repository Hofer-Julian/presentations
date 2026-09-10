<template>
  <div class="requirements">
    <slot />
  </div>
</template>

<style>
/* Two <Requirement> cards, split by a hairline */
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
