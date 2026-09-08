<script setup lang="ts">
const props = withDefaults(defineProps<{
  alt?: string
  backgroundSize?: 'contain' | 'cover'
  class?: string
  eyebrow?: string
  image: string
  source?: string
  sourceHref?: string
}>(), {
  alt: '',
  backgroundSize: 'contain',
})
</script>

<template>
  <div class="keynote-image-layout">
    <div class="slidev-layout default" :class="props.class">
      <p v-if="props.eyebrow" class="eyebrow">{{ props.eyebrow }}</p>
      <slot />
    </div>
    <figure class="keynote-image-panel">
      <img :src="props.image" :alt="props.alt" :style="{ objectFit: props.backgroundSize }" />
      <figcaption v-if="props.source">
        <a v-if="props.sourceHref" :href="props.sourceHref">{{ props.source }}</a>
        <span v-else>{{ props.source }}</span>
      </figcaption>
    </figure>
  </div>
</template>
