import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Card, CardTitle, CardImg, Container, Row, Col } from "reactstrap"

const Search = ({ searchResults }) => {
  const router = useRouter()
  const { q } = router.query

  const movies = searchResults.filter((result) => result.media_type === "movie")
  const actors = searchResults.filter(
    (result) => result.media_type === "person",
  )
  const tvs = searchResults.filter((result) => result.media_type === "tv")

  return (
    <Container>
      <div style={{ color: "white" }}>
        <h1>Search Results</h1>
        <p>
          Showing results for: <span style={{ color: "#e6b31e" }}>{q}</span>
        </p>
      </div>

      <hr style={{ color: "wheat" }}></hr>

      <div>
        <h2 style={{ color: "#e6b31e" }}>Movies</h2>
        <Row>
          {movies.map(
            (movie) =>
              movie.poster_path && (
                <Col md={3} key={movie.id} style={{ marginBottom: "15px" }}>
                  <Link
                    href={`/movies/${movie.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card style={{ height: "100%" }}>
                      {movie.poster_path && (
                        <CardImg
                          top
                          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                          alt={`${movie.title} Poster`}
                        />
                      )}
                      <CardTitle style={{ height: "100%" }}>
                        {movie.title}
                      </CardTitle>
                    </Card>
                  </Link>
                </Col>
              ),
          )}
        </Row>
      </div>

      <hr style={{ color: "wheat" }}></hr>

      <div>
        <h2 style={{ color: "#e6b31e" }}>Actors</h2>
        <Row>
          {actors.map(
            (actor) =>
              actor.profile_path && (
                <Col md={3} key={actor.id} style={{ marginBottom: "15px" }}>
                  <Link
                    href={`/actors/${actor.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card style={{ height: "100%" }}>
                      <CardImg
                        top
                        src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                        alt={`${actor.name} Poster`}
                      />
                      <CardTitle style={{ height: "100%" }}>
                        {actor.name}
                      </CardTitle>
                    </Card>
                  </Link>
                </Col>
              ),
          )}
        </Row>
      </div>

      <div>
        <h2 style={{ color: "#e6b31e" }}>TV Shows</h2>
        <Row>
          {tvs.map(
            (tv) =>
              tv.backdrop_path && (
                <Col md={3} key={tv.id} style={{ marginBottom: "15px" }}>
                  <Link
                    href={`/tv/${tv.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card style={{ height: "100%" }}>
                      <CardImg
                        top
                        src={`https://image.tmdb.org/t/p/w300${tv.backdrop_path}`}
                        alt={`${tv.name} Poster`}
                      />
                      <CardTitle style={{ height: "100%" }}>
                        {tv.name}
                      </CardTitle>
                    </Card>
                  </Link>
                </Col>
              ),
          )}
        </Row>
      </div>
    </Container>
  )
}

export async function getServerSideProps(context) {
  const { q } = context.query
  const apiKey = "1e3ba2c2144bfdc63d5615205918151c"
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
