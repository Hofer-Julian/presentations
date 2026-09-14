<!-- Sentence that closes a slide. -->

<script setup lang="ts">
defineProps<{
  centered?: boolean
}>()
</script>

<template>
  <p class="statement" :class="{ 'statement-centered': centered }"><slot /></p>
</template>

<style>
.slidev-layout .statement {
  margin: 1.5rem 0 0;
  font-size: var(--prefix-text-xl);
  line-height: 1.25;
}

.slidev-layout .statement-centered {
  text-align: center;
}
</style>
