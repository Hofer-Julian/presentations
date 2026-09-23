<!-- Paxton, the Pixi mascot, animated. Falls back to the still artwork when the
     viewer asks for less motion, when the deck is exported, or when the runtime
     fails to load. -->

<script setup lang="ts">
import { Rive, RuntimeLoader } from '@rive-app/canvas-lite'
import riveWasm from '@rive-app/canvas-lite/rive.wasm?url'
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { assetUrl } from '../utils/asset'

// The runtime pulls its wasm off a CDN unless pointed elsewhere, and a
// conference network is no place to find out whether that works.
RuntimeLoader.setWasmUrl(riveWasm)

const label = 'Paxton, the Pixi mascot'

const canvas = ref<HTMLCanvasElement>()
const rive = shallowRef<Rive>()
const failed = ref(false)

const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
const stillOnly = ref(motion.matches)
const readMotionPreference = () => {
  stillOnly.value = motion.matches
}
motion.addEventListener('change', readMotionPreference)

const fitToCanvas = () => rive.value?.resizeDrawingSurfaceToCanvas()

// The canvas is gone whenever the still artwork stands in for it, so following
// the ref covers every reason for the swap
watch(canvas, (element) => {
  rive.value?.cleanup()
  rive.value = undefined
  if (!element)
    return

  rive.value = new Rive({
    canvas: element,
    src: assetUrl('/paxton-animation.riv'),
    stateMachine: 'State Machine 1',
    autoplay: true,
    onLoad: fitToCanvas,
    onLoadError: () => {
      failed.value = true
    },
  })
})

// Slidev scales the slide to the window, which leaves the drawing surface
// coarser or finer than the pixels it now covers
window.addEventListener('resize', fitToCanvas)

onBeforeUnmount(() => {
  motion.removeEventListener('change', readMotionPreference)
  window.removeEventListener('resize', fitToCanvas)
  rive.value?.cleanup()
})
</script>

<template>
  <img
    class="paxton-animation paxton-animation--still"
    :class="{ 'paxton-animation--still-visible': stillOnly || failed || $nav.isPrintMode }"
    src="/paxton-vector-art.svg"
    :alt="label"
  />
  <canvas
    v-if="!stillOnly && !failed && !$nav.isPrintMode"
    ref="canvas"
    class="paxton-animation paxton-animation--canvas"
    role="img"
    :aria-label="label"
  />
</template>

<style>
.paxton-animation {
  display: block;
  width: 100%;
  height: 100%;

  &.paxton-animation--still {
    display: none;

    &.paxton-animation--still-visible {
      display: block;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &.paxton-animation--still {
      display: block;
    }

    &.paxton-animation--canvas {
      display: none;
    }
  }
}
</style>
