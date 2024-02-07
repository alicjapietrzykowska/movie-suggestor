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
import { FormDataType } from '@/types/common'
import { getUserMovieSuggestionPrompt, makeRequest } from '@/services/openAIService'

const userData = ref<FormDataType>({
  genre: '',
  details: '',
  showSpoilers: false
})

const prompt = ref<string>('')
const suggestion = ref<string>('')
const isLoading = ref<boolean>(false)

const getUserPreferences = (data: FormDataType) => {
  isLoading.value = true
  userData.value = data
  prompt.value = getUserMovieSuggestionPrompt(data)
  getMovieSuggestion()
}

const getMovieSuggestion = async () => {
  suggestion.value = await makeRequest(prompt.value)
  isLoading.value = false
}
</script>
