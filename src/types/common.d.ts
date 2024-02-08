export type FormDataType = {
  genre: string
  details: string
  showSpoilers: boolean
}

export type MovieDetails = {
  title: string
  year: string
  director: string
  plot: string
  streamingPlatforms: Array<{ platform: string; url: string }>
}
