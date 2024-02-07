<template>
  <div class="mb-5">
    <h2 v-if="!movieSuggestion" class="subtitle">Type something to get a movie suggestion...</h2>
    <div v-else class="content" v-html="movieSuggestion" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  movieSuggestion: {
    type: String,
    default: ''
  }
})
</script>
