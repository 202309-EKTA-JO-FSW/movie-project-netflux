// utils/tmdb.js
const API_KEY = "1e3ba2c2144bfdc63d5615205918151c"

export const getMovieGenres = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch movie genres")
    }

    const data = await response.json()
    return data.genres
  } catch (error) {
    console.error("Error fetching movie genres:", error.message)
    throw error
  }
}

export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch movies by genre")
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("Error fetching movies by genre:", error.message)
    return []
  }
}
export const getTopRatedMovies = async () => {
  return fetchMoviesByType("top_rated")
}

export const getPopularMovies = async () => {
  return fetchMoviesByType("popular")
}

export const getLatestMovies = async () => {
  return fetchMoviesByType("latest")
}

export const getNowPlayingMovies = async () => {
  return fetchMoviesByType("now_playing")
}

export const getUpcomingMovies = async () => {
  return fetchMoviesByType("upcoming")
}

const fetchMoviesByType = async (type) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} movies`)
    }

    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error(`Error fetching ${type} movies:`, error.message)
    return []
  }
}

export const getMoviesByType = async (movieType) => {
  switch (movieType) {
    case "top_rated":
      return getTopRatedMovies()
    case "popular":
      return getPopularMovies()
    case "latest":
      return getLatestMovies()
    case "now_playing":
      return getNowPlayingMovies()
    case "upcoming":
      return getUpcomingMovies()
    default:
      return []
  }
}
