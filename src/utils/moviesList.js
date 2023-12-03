import { useState, useEffect } from "react"

const API_KEY = "1e3ba2c2144bfdc63d5615205918151c"

export const useMovieList = (genres) => {
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${genres}?api_key=${API_KEY}`,
      )
      const data = await response.json()
      setMovies(data.results)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [genres])

  return movies
}
