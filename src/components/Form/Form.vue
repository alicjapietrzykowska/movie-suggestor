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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { makeRequest } from '@/services/openaiService'
import { FormDataType } from '@/types/common.d'

const genre = ref<string>('')
const details = ref<string>('')
const showSpoilers = ref<boolean>(false)

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['suggestMovie'])

const findMovie = async (event: Event): Promise<void> => {
  event.preventDefault()

  const data: FormDataType = {
    genre: genre.value,
    details: details.value,
    showSpoilers: showSpoilers.value
  }

  emit('suggestMovie', data)
}
</script>
