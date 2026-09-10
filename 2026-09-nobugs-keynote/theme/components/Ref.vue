<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** Either `repo#number` for an issue or pull request, or a URL without its scheme */
  to: string
}>()

/** Owners of the repositories that do not live under prefix-dev */
const owners: Record<string, string> = {
  rattler: 'conda',
  'pixi-pack': 'Quantco',
}

const href = computed(() => {
  const issue = props.to.match(/^([\w.-]+)#(\d+)$/)
  if (!issue)
    return `https://${props.to}`

  const [, repository, number] = issue
  // GitHub sends /issues/<number> on to the pull request when the number is one
  return `https://github.com/${owners[repository] ?? 'prefix-dev'}/${repository}/issues/${number}`
})
</script>

<template>
  <a class="ref" :href="href" target="_blank" rel="noopener noreferrer">{{ to }}</a>
</template>
