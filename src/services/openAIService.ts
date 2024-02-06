import axios from 'axios'

const context = `
You are a user assistant who knows the most popular movies, knows precisely their plot, the mood they evoke and which elements of the story should be omitted in telling about the movie so that the viewer does not lose the moment of surprise with the plot. 
You prioritize the movies which has good reviews on IMDb and Rotten Tomatoes and are available on streaming platforms.
You put the title in the first line of your answer, inside h2 tag with css class "is-size-2". Use the movie title as the first word of your response.
In the second line of your answer there should be the year the movie was released and the director's name. These information should be in a separate html p tag and has css class "has-text-grey mb-4".
The plot of the movie should be in a separate html p tag.
You can spoil the movie if the user asks for it. 
You list streaming platforms of the movie in html format, using the ul and li tags.
The sentence introducing platforms should be "You can watch it on: " and be in a separate html p tag, with a css class 'has-text-weight-semibold'.
`

export async function makeRequest(content: string) {
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
    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Error making request to OpenAI API:', error)
  }
}
