<script setup lang="ts">
import { computed } from 'vue'
import SlideMeta from '../components/SlideMeta.vue'
import { assetUrl } from '../utils/asset'

const props = withDefaults(defineProps<{
  alt?: string
  backgroundSize?: 'contain' | 'cover'
  blend?: boolean
  eyebrow?: string
  frame?: boolean
  image: string
  link?: string
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
    <SlideMeta :eyebrow="props.eyebrow" :link="props.link" />
    <div class="slidev-layout default">
      <slot />
    </div>
    <div class="keynote-image-column">
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
      <div v-if="$slots.caption" class="keynote-image-caption">
        <slot name="caption" />
      </div>
    </div>
  </div>
</template>
