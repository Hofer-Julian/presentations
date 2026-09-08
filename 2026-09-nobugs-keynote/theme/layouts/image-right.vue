<script setup lang="ts">
const props = withDefaults(defineProps<{
  alt?: string
  backgroundSize?: 'contain' | 'cover'
  eyebrow?: string
  frame?: boolean
  image: string
  imageClass?: string
  source?: string
  sourceHref?: string
  split?: string
}>(), {
  alt: '',
  backgroundSize: 'contain',
  frame: true,
})
</script>

<template>
  <div class="keynote-image-layout" :style="props.split ? { gridTemplateColumns: props.split } : undefined">
    <div class="slidev-layout default">
      <p v-if="props.eyebrow" class="eyebrow">{{ props.eyebrow }}</p>
      <slot />
    </div>
    <figure class="keynote-image-panel" :class="{ 'keynote-image-panel-plain': !props.frame }">
      <img
        :src="props.image"
        :alt="props.alt"
        :class="props.imageClass"
        :style="{ objectFit: props.backgroundSize }"
      />
      <figcaption v-if="props.source">
        <a v-if="props.sourceHref" :href="props.sourceHref">{{ props.source }}</a>
        <span v-else>{{ props.source }}</span>
      </figcaption>
    </figure>
  </div>
</template>
