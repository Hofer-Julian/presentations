<!-- Columns of names, each column under its own label. -->

<script setup lang="ts">
defineProps<{
  /** Each column, as a label and the names listed under it */
  groups: { label: string; packages: string[] }[]
}>()
</script>

<template>
  <div class="package-columns">
    <div v-for="group in groups" :key="group.label">
      <span class="label">{{ group.label }}</span>
      <ul>
        <li v-for="name in group.packages" :key="name">{{ name }}</li>
      </ul>
    </div>
  </div>
</template>

<style>
.package-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.875rem;
  margin: 0.5rem 0 0;
}

.package-columns > div {
  padding: 1.25rem 1.375rem 1.5rem;
  background: var(--prefix-white);
  border: 1px solid var(--prefix-border);
  border-radius: var(--prefix-radius-md);
}

.package-columns .label {
  margin-bottom: 0.875rem;
}

/* Package names carry no bullet: the column heading already groups them */
.slidev-layout .package-columns ul {
  display: grid;
  gap: 0.875rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.slidev-layout .package-columns ul > li {
  margin: 0;
  padding: 0;
  font-family: var(--prefix-font-mono);
  font-size: 1.0625rem;
  font-weight: 500;
  line-height: 1.2;
}

.slidev-layout .package-columns ul > li::before {
  content: none;
}
</style>
