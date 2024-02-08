<template>
  <main class="notification">
    <Answer :movie-suggestion="suggestion" />
    <Form @suggest-movie="manageUserRequest" :is-loading="isLoading" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Form from '@/components/Form/Form.vue'
import Answer from '@/components/Answer/Answer.vue'
import { FormDataType, MovieDetails, OpenAiMessage } from '@/types/common'
import {
  getUserMoviePreferencesPrompt,
  makeRequest,
  getSuggestSomethingElsePrompt
} from '@/services/openAIService'
import { toast } from 'bulma-toast'

const prompt = ref<OpenAiMessage>()
const suggestion = ref<MovieDetails>()
const isLoading = ref<boolean>(false)

const manageUserRequest = (data: FormDataType) => {
  isLoading.value = true
  if (data.alreadySuggested) {
    prompt.value = getSuggestSomethingElsePrompt()
  } else {
    prompt.value = getUserMoviePreferencesPrompt(data)
  }
  getMovieSuggestion()
}

const showToast = () => {
  toast({
    message: 'Whoops! Something went wrong! Refresh the app or try again after a moment.',
    type: 'is-danger',
    dismissible: true,
    animate: { in: 'fadeIn', out: 'fadeOut' }
  })
}

const getMovieSuggestion = async () => {
  const response = await makeRequest(prompt.value as OpenAiMessage)
  isLoading.value = false
  if (!response) {
    showToast()
    return
  }
  suggestion.value = response
}
</script>
