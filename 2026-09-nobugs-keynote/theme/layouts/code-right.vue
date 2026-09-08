<script setup lang="ts">
defineProps<{
  eyebrow?: string
  gridClass?: string
  codeClass?: string
}>()
</script>

<template>
  <div class="slidev-layout code-right-layout">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <slot name="title" />
    <div class="code-right-grid" :class="gridClass">
      <div class="code-right-copy">
        <slot />
        <slot name="left" />
      </div>
      <div class="code-right-code" :class="codeClass"><slot name="right" /></div>
    </div>
    <slot name="after" />
  </div>
</template>
