<template>
  <div class="mb-5">
    <h2 v-if="!movieSuggestion?.title" class="subtitle">
      Type something to get a movie suggestion...
    </h2>
    <div v-else class="content">
      <h2 class="is-size-2">{{ title }}</h2>
      <p class="has-text-grey mb-4">{{ year }} | {{ director }}</p>
      <p>{{ plot }}</p>
      <p class="has-text-weight-semibold">Available on:</p>
      <ul>
        <li v-for="platform in streamingPlatforms" :key="platform">
          {{ platform }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'

const props = defineProps({
  movieSuggestion: {
    type: Object,
    default: () => {}
  }
})
const title = ref<string>('')
const year = ref<string>('')
const director = ref<string>('')
const plot = ref<string>('')
const streamingPlatforms = ref<string[]>([])

watch(
  () => props.movieSuggestion,
  (movie) => {
    title.value = movie.title
    year.value = movie.year
    director.value = movie.director
    plot.value = movie.plot
    streamingPlatforms.value = movie.streamingPlatforms
  }
)
</script>
