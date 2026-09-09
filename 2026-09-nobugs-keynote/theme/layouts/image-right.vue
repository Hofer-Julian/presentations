<script setup lang="ts">
import { computed } from 'vue'
import { assetUrl } from '../utils/asset'

const props = withDefaults(defineProps<{
  alt?: string
  backgroundSize?: 'contain' | 'cover'
  blend?: boolean
  eyebrow?: string
  frame?: boolean
  image: string
  source?: string
  sourceHref?: string
  split?: string
  scale?: number
}>(), {
  alt: '',
  backgroundSize: 'contain',
  blend: false,
  frame: true,
  scale: 1,
})

const imageSrc = computed(() => assetUrl(props.image))

const imageStyle = computed(() => ({
  objectFit: props.backgroundSize,
  transform: props.scale === 1 ? undefined : `scale(${props.scale})`,
}))
</script>

<template>
  <div class="keynote-image-layout" :style="props.split ? { gridTemplateColumns: props.split } : undefined">
    <div class="slidev-layout default">
      <p v-if="props.eyebrow" class="eyebrow">{{ props.eyebrow }}</p>
      <slot />
    </div>
    <figure class="keynote-image-panel" :class="{ 'keynote-image-panel-plain': !props.frame }">
      <img
        :src="imageSrc"
        :alt="props.alt"
        :class="{ 'keynote-image-blend': props.blend }"
        :style="imageStyle"
      />
      <figcaption v-if="props.source">
        <a v-if="props.sourceHref" :href="props.sourceHref">{{ props.source }}</a>
        <span v-else>{{ props.source }}</span>
      </figcaption>
    </figure>
  </div>
</template>
