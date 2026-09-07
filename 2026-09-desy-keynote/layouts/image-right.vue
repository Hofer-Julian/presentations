<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '@slidev/client/layoutHelper.ts'

const props = defineProps({
  image: String,
  class: String,
  backgroundSize: { type: String, default: 'contain' },
})

const style = computed(() =>
  handleBackground(props.image, false, props.backgroundSize),
)
</script>

<template>
  <div class="keynote-image-layout">
    <div class="slidev-layout default" :class="props.class">
      <slot />
    </div>
    <div class="keynote-image-panel" :style="style" />
  </div>
</template>
