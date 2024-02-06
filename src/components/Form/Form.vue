<template>
  <div>
    <form @submit="findMovie" class="is-flex is-flex-direction-column">
      <label class="label mb-4">Genre</label>
      <input class="input mb-4" type="text" v-model="genre" />
      <label class="label mb-4">Details</label>
      <textarea class="textarea mb-4" type="text" v-model="details" />
      <div class="mb-4">
        <input id="spoilers" type="checkbox" class="checkbox mr-3" v-model="showSpoilers" />
        <label for="spoilers">Show spoilers?</label>
      </div>
      <button class="button is-primary" :class="{ 'is-loading': isLoading }">Submit</button>
    </form>

    <p class="mt-6 content" v-html="movieSuggestion" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { makeRequest } from '../../services/openaiService'

const genre = ref<string>('')
const details = ref<string>('')
const movieSuggestion = ref<string>('')
const showSpoilers = ref<boolean>(false)

const isLoading = ref<boolean>(false)

const getPrompt = (): string => {
  const prompt = `Suggest a move from ${genre.value} genre. The movie should be about ${details.value}.`
  return showSpoilers.value ? prompt : `${prompt} You are not going to tell any spoilers.`
}

const findMovie = async (event: Event): Promise<void> => {
  isLoading.value = true
  event.preventDefault()

  const response = await makeRequest(getPrompt())
  isLoading.value = false
  console.log(response)
  movieSuggestion.value = response.trim()
}
</script>

<style scoped></style>
