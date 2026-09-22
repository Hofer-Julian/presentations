<script setup lang="ts">
import { computed } from 'vue'
import { assetUrl } from '../utils/asset'

const props = withDefaults(defineProps<{
  alt?: string
  backgroundSize?: 'contain' | 'cover'
  blend?: boolean
  frame?: boolean
  /** Runs the image down the full height of the slide, beside the heading */
  fullHeight?: boolean
  /** Path to the picture; leave it out when the `media` slot fills the panel */
  image?: string
  source?: string
  sourceHref?: string
  split?: string
  scale?: number
}>(), {
  alt: '',
  backgroundSize: 'contain',
  blend: false,
  frame: true,
  fullHeight: false,
  scale: 1,
})

const imageSrc = computed(() => (props.image ? assetUrl(props.image) : undefined))

const imageStyle = computed(() => ({
  objectFit: props.backgroundSize,
  transform: props.scale === 1 ? undefined : `scale(${props.scale})`,
}))
</script>

<template>
  <div
    class="keynote-image-layout"
    :class="{ 'keynote-image-layout-tall': props.fullHeight }"
    :style="props.split ? { gridTemplateColumns: props.split } : undefined"
  >
    <div class="slidev-layout keynote-image-title">
      <slot name="title" />
    </div>
    <div class="slidev-layout keynote-image-copy">
      <slot />
    </div>
    <div class="keynote-image-column">
      <figure class="keynote-image-panel" :class="{ 'keynote-image-panel-plain': !props.frame }">
        <slot v-if="$slots.media" name="media" />
        <img
          v-else
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
  grid-template-rows: auto 1fr;
  height: 100%;
  background: var(--prefix-paper);
  color: var(--prefix-ink);
}

/* The heading spans both columns, so its length never eats into the picture */
.keynote-image-layout > .keynote-image-title {
  grid-column: 1 / -1;
  padding: var(--prefix-slide-padding-top) var(--prefix-slide-padding-inline) 0;
}

.keynote-image-layout > .keynote-image-copy {
  padding: 0 2rem var(--prefix-slide-padding-bottom) var(--prefix-slide-padding-inline);
}

.keynote-image-column {
  display: flex;
  flex-direction: column;
  min-height: 0;
  margin: 0 2.25rem var(--prefix-slide-padding-bottom) 0;
}

.keynote-image-panel {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: var(--prefix-white);
  border: 0.875rem solid var(--prefix-white);
  border-radius: var(--prefix-radius-lg);
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
  background: var(--prefix-scrim);
  border-radius: var(--prefix-radius-xs);
  color: var(--prefix-muted);
  font-size: var(--prefix-text-2xs);
}

.keynote-image-panel figcaption a {
  color: inherit;
  border-bottom: 1px solid var(--prefix-yellow);
}

/* A full-height image takes the second column from the heading, so every cell
   of the first column has to be placed by hand */
.keynote-image-layout-tall > .keynote-image-title {
  grid-row: 1;
  grid-column: 1;
}

.keynote-image-layout-tall > .keynote-image-copy {
  display: flex;
  flex-direction: column;
  grid-row: 2;
  grid-column: 1;
}

/* The picture runs beside the heading, so it takes the slide's top padding itself */
.keynote-image-layout-tall > .keynote-image-column {
  grid-row: 1 / -1;
  grid-column: 2;
  margin-top: var(--prefix-slide-padding-top);
}

/* Who or what the picture shows, set below it */
.keynote-image-caption {
  margin-top: 1rem;
  color: var(--prefix-muted);
  font-size: 0.9375rem;
  line-height: 1.4;
}

.keynote-image-caption p {
  margin: 0;
}

.keynote-image-caption strong {
  color: var(--prefix-ink);
}
</style>
