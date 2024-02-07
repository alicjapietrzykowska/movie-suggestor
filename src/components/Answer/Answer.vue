<template>
  <div class="mt-6 content" v-html="movieSuggestion" />
</template>

<script setup lang="ts">
defineProps({
  movieSuggestion: {
    type: String,
    default: ''
  }
})
</script>
