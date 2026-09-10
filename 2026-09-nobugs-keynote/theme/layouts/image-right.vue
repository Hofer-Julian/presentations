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
    <div class="slidev-layout keynote-image-title">
      <slot name="title" />
    </div>
    <div class="slidev-layout keynote-image-copy">
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

<style>
.keynote-image-layout {
  display: grid;
  grid-template-columns: 58% 42%;
  grid-template-rows: auto auto 1fr;
  height: 100%;
  background: var(--keynote-paper);
  color: var(--keynote-ink);
}

/* The meta row spans both columns so the reference pill reaches the slide edge */
.keynote-image-layout > .slide-meta {
  grid-column: 1 / -1;
  /* The row's own padding sits inside min-height, so it carries the slide's top padding too */
  min-height: 4.5rem;
  padding:
    var(--keynote-slide-padding-top)
    var(--keynote-slide-padding-inline)
    0;
}

/* The heading spans both columns, so its length never eats into the picture */
.keynote-image-layout > .keynote-image-title {
  grid-column: 1 / -1;
  padding: 0 var(--keynote-slide-padding-inline);
}

.keynote-image-layout > .keynote-image-copy {
  padding: 0 2rem var(--keynote-slide-padding-bottom) var(--keynote-slide-padding-inline);
}

.keynote-image-column {
  display: flex;
  flex-direction: column;
  min-height: 0;
  margin: 0 2.25rem var(--keynote-slide-padding-bottom) 0;
}

.keynote-image-panel {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: var(--keynote-white);
  border: 0.875rem solid var(--keynote-white);
  border-radius: var(--keynote-radius-lg);
}

/* An image that carries its own edges needs no frame around it */
.keynote-image-panel-plain {
  background: transparent;
  border: 0;
}

.keynote-image-panel img {
  display: block;
  width: 100%;
  height: 100%;
}

/* Merges a screenshot's white background into the paper */
.keynote-image-blend {
  mix-blend-mode: multiply;
}

.keynote-image-panel figcaption {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: var(--keynote-scrim);
  border-radius: var(--keynote-radius-xs);
  color: var(--keynote-muted);
  font-size: var(--keynote-text-2xs);
}

.keynote-image-panel figcaption a {
  color: inherit;
  border-bottom: 1px solid var(--keynote-yellow);
}

/* Who or what the picture shows, set below it */
.keynote-image-caption {
  margin-top: 1rem;
  color: var(--keynote-muted);
  font-size: 0.9375rem;
  line-height: 1.4;
}

.keynote-image-caption p {
  margin: 0;
}

.keynote-image-caption strong {
  color: var(--keynote-ink);
}
</style>
