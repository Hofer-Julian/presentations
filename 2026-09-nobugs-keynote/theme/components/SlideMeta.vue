<script setup lang="ts">
import Ref from './Ref.vue'

defineProps<{
  eyebrow?: string
  link?: string
}>()
</script>

<template>
  <header v-if="eyebrow || link" class="slide-meta">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <Ref v-if="link" :to="link" />
  </header>
</template>
