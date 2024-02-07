<template>
  <main class="notification">
    <Form @suggest-movie="getUserPreferences" :is-loading="isLoading" />
    <Answer :movie-suggestion="suggestion" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Form from '@/components/Form/Form.vue'
import Answer from '@/components/Answer/Answer.vue'
import { FormDataType } from '@/types/common'
import { getUserMovieSuggestionPrompt, makeRequest } from '@/services/openAIService'

const userData = ref<FormDataType>({
  genre: '',
  details: '',
  showSpoilers: false
})

const suggestion = ref<string>('')
const isLoading = ref<boolean>(false)

const getUserPreferences = (data: FormDataType) => {
  isLoading.value = true
  userData.value = data
  const prompt = getUserMovieSuggestionPrompt(data)
  getMovieSuggestion(prompt)
}

const getMovieSuggestion = async (prompt: string) => {
  suggestion.value = await makeRequest(prompt)
  isLoading.value = false
}
</script>
