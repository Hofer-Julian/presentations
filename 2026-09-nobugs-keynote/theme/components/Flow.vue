<script setup lang="ts">
import type { VNode } from 'vue'
import { Comment, Fragment, Text, computed, useSlots } from 'vue'

const slots = useSlots()

function flatten(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => {
    if (node.type === Fragment)
      return flatten((node.children ?? []) as VNode[])
    if (node.type === Comment)
      return []
    if (node.type === Text && !String(node.children).trim())
      return []
    return [node]
  })
}

const steps = computed(() => flatten(slots.default?.() ?? []))
const columns = computed(() => steps.value.map(() => '1fr').join(' auto '))
</script>

<template>
  <div class="flow" :style="{ gridTemplateColumns: columns }">
    <template v-for="(step, index) in steps" :key="index">
      <b v-if="index" aria-hidden="true">→</b>
      <component :is="step" />
    </template>
  </div>
</template>

<style>
/* Row of boxes joined by arrows */
.flow {
  display: grid;
  gap: 0.625rem;
  align-items: stretch;
  margin: 0 0 1rem;
}

.flow > div {
  display: flex;
  min-height: 6rem;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--keynote-white);
  border: 1px solid var(--keynote-border);
  border-radius: var(--keynote-radius-md);
  text-align: center;
}

.flow > .flow-highlight {
  background: var(--keynote-yellow);
  border-color: var(--keynote-yellow);
}

/* The arrow between two boxes */
.flow > b {
  align-self: center;
  color: var(--keynote-muted);
  font-size: var(--keynote-text-xl);
  font-weight: 400;
}

.slidev-layout .flow strong {
  max-width: 9rem;
  font-size: var(--keynote-text-base);
  line-height: 1.25;
  text-wrap: balance;
}

.slidev-layout .flow strong code {
  padding: 0;
  background: transparent;
  font-size: inherit;
}
</style>
