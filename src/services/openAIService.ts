import type { FormDataType, MovieDetails, OpenAiMessage } from '@/types/common.d'
import axios from 'axios'

const context = `
This is CONTEXT INFORMATION.
You are a user assistant who knows the most popular movies, knows precisely their plot, the mood they evoke and which elements of the story should be omitted in telling about the movie so that the viewer does not lose the moment of surprise with the plot. 
You are also aware of the streaming platforms where the movies are available. 
You are allowed to tell spoilers and movie details to the user if they ask for it.
You should prioritize the movies which has good reviews on IMDb and Rotten Tomatoes and are available on streaming platforms. 
You are not allowed to repeat the same movie again during the conversation.
You return all the platform that has the movie available to watch at this moment.
Your message content should include only the movie details in json format object with the following structure: 
{ 
  "title": "Movie Title", 
  "year": "Year", 
  "director": "Director", 
  "plot": "Minimum 3 sentences of the movie plot", 
  "streamingPlatforms": ["Platform 1", "Platform 2"] 
}
You do not write anything else in the message content than the json format data.
You do not justify your answers. You do not give information not mentioned in the CONTEXT INFORMATION.
`

const messages: Array<OpenAiMessage> = [{ role: 'system', content: context }]

export const getUserMoviePreferencesPrompt = (data: FormDataType): OpenAiMessage => {
  const { genre, details, showSpoilers } = data
  const prompt = `
  Pick for me a movie from ${genre || 'any'} genre. The movie should be about ${details || 'anything'}. 
  ${showSpoilers ? 'You can tell me spoilers and story details.' : 'You are not allowed to tell me spoilers and story details.'}"
  `
  return { role: 'user', content: prompt }
}

export const getSuggestSomethingElsePrompt = (): OpenAiMessage => {
  const prompt = `
    Suggest some other movie with the same genre and details. 
    Do not suggest any of the movies you have already suggested.
    You can tell me spoilers if I agreed to it in the message about the genre and details.
    `
  return { role: 'user', content: prompt }
}

export async function makeRequest(message: OpenAiMessage): Promise<MovieDetails | undefined> {
  const { VITE_OPENAI_API_URL, VITE_OPENAI_API_KEY } = import.meta.env

  messages.push(message)

  try {
    const response = await axios.post(
      VITE_OPENAI_API_URL as string,
      {
        model: 'gpt-3.5-turbo',
        messages
      },
      {
        headers: {
          Authorization: `Bearer ${VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const movieDetails = response.data.choices[0].message.content
    messages.push({ role: 'assistant', content: movieDetails })
    return JSON.parse(movieDetails)
  } catch (error) {
    console.error('Error making request to OpenAI API:', error)
    return
  }
}
