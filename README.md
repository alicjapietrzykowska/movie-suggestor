# Cooking Notes
A simple app using Open AI which helps you find a movie to watch based on your preferences

## Demo
https://movie-suggestor-production.up.railway.app/

## Features
- Get a movie based on a genre and/or description you provided
- Or don't provide anything and watch the generator to suggest its favorite movies
- Decide if you want to see spoilers about the movie
- Learn when the movie was released and who is the director
- Learn on which streaming platforms you can find the movie
- Get other movies that meet the same criteria

## Technologies Used
- Vue 3
- OpenAI API
- Vite
- Railway + Caddy
- Bulma (SCSS)
- Typescript

## How To Use With NPM

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. You will also need your own API  

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/alicjapietrzykowska/movie-suggestor.git
# Go into the repository
$ cd movie-suggestor
# Install dependencies
$ npm install
# Run the app
$ npm run dev
```
You will then be able to access the app at localhost:5173

The application won't work without environmental variables `VITE_OPENAI_API_KEY` and `VITE_OPENAI_API_URL`. Add them to `.env` file locally or to your server environmental variables.

## Room for Improvement
- Possibility to ask for details of movies
- Saving favorite movie suggestion
- Dark mode

## License
MIT
