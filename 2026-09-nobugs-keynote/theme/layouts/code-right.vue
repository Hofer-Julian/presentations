<script setup lang="ts">
const props = defineProps<{
  eyebrow?: string
}>()
</script>

<template>
  <div class="slidev-layout code-right-layout">
    <p v-if="props.eyebrow" class="eyebrow">{{ props.eyebrow }}</p>
    <slot name="title" />
    <div class="code-right-grid">
      <div class="code-right-copy">
        <slot />
        <slot name="left" />
      </div>
      <div class="code-right-code"><slot name="right" /></div>
    </div>
    <slot name="after" />
  </div>
</template>
