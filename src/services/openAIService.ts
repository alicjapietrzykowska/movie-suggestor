import type { FormDataType, MovieDetails } from '@/types/common.d'
import axios from 'axios'

const alreadySuggestedMovies: Array<string> = []

const context = `
This is CONTEXT INFORMATION.
You are a user assistant who knows the most popular movies, knows precisely their plot, the mood they evoke and which elements of the story should be omitted in telling about the movie so that the viewer does not lose the moment of surprise with the plot. 
You are also aware of the streaming platforms where the movies are available. 
You are allowed to tell spoilers and movie details to the user if they ask for it.
You should prioritize the movies which has good reviews on IMDb and Rotten Tomatoes and are available on streaming platforms. 
If the user sends the same or very similar request, you should not suggest the same movie again.
`

export const getUserMovieSuggestionPrompt = (data: FormDataType): string => {
  const forbiddenMovies = alreadySuggestedMovies.join(', ')
  console.log(forbiddenMovies)
  const { genre, details, showSpoilers } = data
  const prompt = `
  You randomly pick a movie from ${genre || 'any'} genre. The movie is about ${details || 'anything'}. 
  You do not return movies with these titles: ${forbiddenMovies}. If the movie title is on the provided list you will pick randomly another movie matching the genre and details which title also isn't on the list.
  You return all the platform that has the movie available to watch at this moment.
  Your message content include only the movie details in json format object with the following structure: 
  { 
    "title": "Movie Title", 
    "year": "Year", 
    "director": "Director", 
    "plot": "Minimum 3 sentences of the movie plot ${showSpoilers ? 'with spoilers' : 'without spoilers'}", 
    "streamingPlatforms": ["Platform 1", "Platform 2"] 
  }. 
  You do not write anything else in the message content.
  You do not justify your answers. You do not give information not mentioned in the CONTEXT INFORMATION.
  `
  return prompt
}

export async function makeRequest(content: string): Promise<MovieDetails | undefined> {
  const { VITE_OPENAI_API_URL, VITE_OPENAI_API_KEY } = import.meta.env
  try {
    const response = await axios.post(
      VITE_OPENAI_API_URL as string,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: context },
          { role: 'user', content }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const movieDetails = JSON.parse(response.data.choices[0].message.content)
    alreadySuggestedMovies.push(`'${movieDetails.title}'`)
    return movieDetails
  } catch (error) {
    console.error('Error making request to OpenAI API:', error)
    return
  }
}
