<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** Either `repo#number` for an issue or pull request, or a URL without its scheme */
  to: string
}>()

/** Owners of the repositories that do not live under prefix-dev */
const owners: Record<string, string> = {
  ceps: 'conda',
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

<style>
/* Where the work behind a slide lives */
.slidev-layout .ref,
.keynote-image-layout .ref {
  margin-left: auto;
  padding: 0.1875rem 0.5rem;
  background: var(--keynote-white);
  border: 1px solid var(--keynote-border);
  border-radius: var(--keynote-radius-pill);
  color: var(--keynote-muted);
  font-family: var(--keynote-font-mono);
  font-size: 0.6875rem;
  white-space: nowrap;
}

.slidev-layout a.ref:hover,
.keynote-image-layout a.ref:hover {
  border-color: var(--keynote-yellow);
  color: var(--keynote-ink);
}
</style>
