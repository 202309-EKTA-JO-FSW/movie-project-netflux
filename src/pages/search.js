import { defaultImage } from "@/utils/defaultImage"
import { useRouter } from "next/router"
import React from "react"

const Search = ({ searchResults }) => {
  const router = useRouter()
  const { q } = router.query

  // Separate movies and actors from the search results
  const movies = searchResults.filter((result) => result.media_type === "movie")
  const actors = searchResults.filter(
    (result) => result.media_type === "person",
  )

  return (
    <div>
      <h1>Search Results</h1>
      <p>Showing results for: {q}</p>

      {/* Display movie results */}
      <div>
        <h2 style={{ color: "blue", fontSize: "100px" }}>Movies</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} style={{ fontSize: "50px", color: "white" }}>
              {movie.title}
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt=""
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Display actor results */}
      <div>
        <h2 style={{ color: "blue", fontSize: "100px" }}>Actors</h2>
        <ul>
          {actors.map((actor) => (
            <li key={actor.id} style={{ fontSize: "50px", color: "white" }}>
              {actor.name}
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                  alt=""
                />
              ) : (
                <img src={defaultImage} alt="" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { q } = context.query

  // Use your TMDb API key here
  const apiKey = "1e3ba2c2144bfdc63d5615205918151c"

  // Fetch search results from TMDb
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${q}&api_key=${apiKey}`,
  )

  const data = await response.json()

  return {
    props: {
      searchResults: data.results || [],
    },
  }
}

export default Search
