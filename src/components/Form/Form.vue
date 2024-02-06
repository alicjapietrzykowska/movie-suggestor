<template>
  <form @submit="findMovie" class="is-flex is-flex-direction-column">
    <label class="label mb-4">Genre</label>
    <input class="input mb-4" type="text" v-model="genre" />
    <label class="label mb-4">Details</label>
    <textarea class="textarea mb-4" type="text" v-model="details" />
    <div class="mb-4">
      <input id="spoilers" type="checkbox" class="checkbox mr-3" v-model="showSpoilers" />
      <label for="spoilers">Tell spoilers?</label>
    </div>
    <button class="button is-primary">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const genre = ref<string>('')
const details = ref<string>('')
const showSpoilers = ref<boolean>(false)

const findMovie = (event: Event) => {
  event.preventDefault()
  console.log({ genre: genre.value, details: details.value, showSpoilers: showSpoilers.value })
}
</script>

<style scoped></style>
