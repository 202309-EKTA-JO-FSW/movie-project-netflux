import React from "react"
import Link from "next/link"
import { useMovieList } from "@/utils/moviesList"

const MovieList = ({ genres }) => {
  const movies = useMovieList(genres)

  return (
    <div className="section-title">
      <h1>{genres} </h1>
      {movies.length > 0 ? (
        <div className="moviesGrid">
          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                width: "250px",
                margin: "16px",
                border: "1px solid #ddd",
                padding: "16px",
              }}
            >
              <Link
                href={`/movies/${movie.id}`}
                style={{ textDecoration: "none", color: "wheat" }}
              >
                <h2>{movie.title}</h2>

                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                    style={{ height: "240px" }}
                    className="movie--image"
                  />
                ) : (
                  <p>No poster available</p>
                )}
                <p>{movie.release_date}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default MovieList
