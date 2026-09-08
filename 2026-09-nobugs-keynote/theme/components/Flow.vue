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
