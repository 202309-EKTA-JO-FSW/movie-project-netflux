import { defaultImage } from "./defaultImage"

const TMDB_API_KEY = "1e3ba2c2144bfdc63d5615205918151c"

export async function getMovieDetails(movieId) {
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`,
  )

  if (!movieResponse.ok) {
    throw new Error("Failed to fetch movie details")
  }

  const movieData = await movieResponse.json()

  // Fetch credits to get information about the cast
  const creditsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`,
  )

  if (!creditsResponse.ok) {
    throw new Error("Failed to fetch credits")
  }

  const creditsData = await creditsResponse.json()

  // Extract information about the main 5 actors
  const castName = creditsData.cast.slice(0, 5).map((actor) => actor.name)

  const castPicsAndIds = creditsData.cast.slice(0, 5).map((actor) => ({
    profilePath: actor.profile_path
      ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
      : `${defaultImage}`,
    actorId: actor.id,
  }))

  // Fetch related movies
  const relatedResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  )

  if (!relatedResponse.ok) {
    throw new Error("Failed to fetch related movies")
  }

  const relatedData = await relatedResponse.json()

  // Extract information about related movies
  const relatedMovies = relatedData.results.slice(0, 5).map((relatedMovie) => ({
    id: relatedMovie.id,
    title: relatedMovie.title,
    posterPath: relatedMovie.poster_path,
  }))

  // Fetch movie videos (trailers)
  const videosResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`,
  )

  if (!videosResponse.ok) {
    throw new Error("Failed to fetch movie videos")
  }

  const videosData = await videosResponse.json()

  const movieDetails = {
    ...movieData,
    creditsData,
    castName,
    castPicsAndIds,
    relatedMovies,
    trailers: videosData.results.filter((video) => video.type === "Trailer"),
  }

  return movieDetails
}
