<script setup lang="ts">
import './style.css'
</script>

<template>
  <footer v-if="$nav.currentLayout !== 'cover'" class="keynote-footer">
    <img src="/prefix-logo.svg" alt="Prefix.dev" />
    <div class="keynote-footer-meta">
      <span>DESY · September 2026</span>
      <span class="keynote-page">{{ $nav.currentPage }}</span>
    </div>
  </footer>
</template>
