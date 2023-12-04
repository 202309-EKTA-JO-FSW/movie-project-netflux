import { useRouter } from "next/router"
import { getMovieDetails } from "../../utils/movieData"
import Link from "next/link"
import React from "react"

const MovieDetailsPage = ({ movie }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="section-title" style={{ color: "black" }}>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      ) : (
        <p>No poster available</p>
      )}
      <h1>title: {movie.title}</h1>
      <h3>release_date: {movie.release_date}</h3>
      <h3>runtime: {movie.runtime} | Minutes</h3>
      <h1>Spoken Languages: {movie.original_language}</h1>
      <h2>vote_count: {movie.vote_count}</h2>
      <h2>Director's name: {movie.director}</h2>
      <p>overview: {movie.overview}</p>
      <h2>Main Actors: {movie.castName.join(", ")}</h2>
      <ul>
        {movie.castPicsAndIds.map((item) => {
          return (
            <Link href={`/actors/${item.actorId}`} key={item.actorId}>
              <li>
                <img src={item.profilePath} alt={`Actor ${item.actorId}`} />
                <p>Actor ID: {item.actorId}</p>
              </li>
            </Link>
          )
        })}
      </ul>

      <h1>Related Movies</h1>
      <ul>
        {movie.relatedMovies.map((movie) => {
          return (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <li>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.posterPath}`}
                  alt={`Movie ${movie.title}`}
                />
                <p>{movie.title}</p>
              </li>
            </Link>
          )
        })}
      </ul>

      {/* Add more details as needed */}
      <ul>
        {movie.genres.map((x) => (
          <li key={x.id}>{x.name}</li>
        ))}
      </ul>
      <div>
        <h2>Trailer</h2>
        {movie.trailers.length > 0 ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${movie.trailers[0].key}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No trailer available</p>
        )}
      </div>

      <div>
        <h2>Production Companies</h2>
        {movie.production_companies.length > 0 ? (
          <ul key={movie.production_companies[0].name}>
            <li>{movie.production_companies[0].name}</li>
            <li>
              {movie.production_companies[0].logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.production_companies[0].logo_path}`}
                  alt=""
                />
              )}
            </li>
          </ul>
        ) : (
          <p>No Production Companies available</p>
        )}
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = [
    { params: { movieId: "1" } },
    { params: { movieId: "2" } },
    { params: { movieId: "3" } },
  ]

  return { paths, fallback: true }
}

// export async function getStaticProps({ params }) {
//   const movieId = params.movieId
//   const movie = await getMovieDetails(movieId)

//   return {
//     props: {
//       movie,
//     },
//     revalidate: 60 * 60, // Revalidate the page every hour
//   }
// }

export async function getStaticProps({ params }) {
  try {
    const movieId = params.movieId;
    const movie = await getMovieDetails(movieId);

    return {
      props: {
        movie,
      },
      revalidate: 60 * 60, // Revalidate the page every hour
    };
  } catch (error) {
    console.error('Error fetching movie details:', error.message);

    return {
      notFound: true,
    };
  }
}

export default MovieDetailsPage
