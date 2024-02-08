<template>
  <main class="notification">
    <Answer :movie-suggestion="suggestion" />
    <Form @suggest-movie="getUserPreferences" :is-loading="isLoading" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Form from '@/components/Form/Form.vue'
import Answer from '@/components/Answer/Answer.vue'
import { FormDataType, MovieDetails } from '@/types/common'
import { getUserMovieSuggestionPrompt, makeRequest } from '@/services/openAIService'
import { toast } from 'bulma-toast'

const userData = ref<FormDataType>({
  genre: '',
  details: '',
  showSpoilers: false
})

const prompt = ref<string>('')
const suggestion = ref<MovieDetails>({})
const isLoading = ref<boolean>(false)

const getUserPreferences = (data: FormDataType) => {
  isLoading.value = true
  userData.value = data
  prompt.value = getUserMovieSuggestionPrompt(data)
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
  const response = await makeRequest(prompt.value)
  isLoading.value = false
  if (!response) {
    showToast()
    return
  }
  suggestion.value = response
}
</script>
