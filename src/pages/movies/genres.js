import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { getMoviesByGenre, getMoviesByType } from "@/utils/moviesByGenres"

const MoviesByGenre = () => {
  const router = useRouter()
  const { id, type } = router.query
  const [movies, setMovies] = useState([])
  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (id) {
        const moviesByGenre = await getMoviesByGenre(id)
        setMovies(moviesByGenre)
      } else if (type) {
        const moviesByGenre = await getMoviesByType(type)
        setMovies(moviesByGenre)
      }
    }

    fetchMoviesByGenre()
  }, [type, id])

  console.log(movies)

  return (
    <div>
      {/* let id be the genre rather than a number */}
      <h1>{type || id} </h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title}
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MoviesByGenre
