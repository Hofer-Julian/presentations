<template>
  <footer v-if="$nav.currentLayout !== 'cover'">
    <div class="absolute bottom-0 left-4 p-4 flex items-center">
      <img src="./logo_light_no_text.svg" alt="Logo" class="h-8 w-8" />
      <span class="ml-2 text-sm">Prefix.dev</span>
    </div>
    <div class="absolute bottom-0 right-4 p-4">
      {{ $nav.currentPage }}
    </div>
  </footer>
</template>
