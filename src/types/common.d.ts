export type OpenAiMessage = {
  role: string
  content: string
}

export type FormDataType = {
  genre: string
  details: string
  showSpoilers: boolean
  alreadySuggested: boolean
}

export type MovieDetails = {
  title: string
  year: string
  director: string
  plot: string
  streamingPlatforms: Array<{ platform: string; url: string }>
}
