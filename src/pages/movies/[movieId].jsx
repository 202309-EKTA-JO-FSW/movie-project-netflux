import { useRouter } from "next/router"
import { getMovieDetails } from "../../utils/movieData"
import Link from "next/link"
import React from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap"

const MovieDetailsPage = ({ movie }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const cast = movie.creditsData.cast

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            {movie.poster_path && (
              <CardImg
                top
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={`${movie.title} Poster`}
              />
            )}
            <CardBody>
              <CardTitle tag="h5">{movie.title}</CardTitle>
            </CardBody>
          </Card>

          <Row className="mt-4">
            <h1 style={{ color: "#e6b31e", marginBottom: "20px" }}>
              Main Actors
            </h1>
            <Row md={2}>
              {cast
                .filter((item) => item.profile_path)
                .slice(0, 5)
                .map((item) => (
                  <Col key={item.id} style={{ marginBottom: "10px" }}>
                    <Link
                      href={`/actors/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card style={{ height: "100%" }}>
                        <CardImg
                          top
                          src={`https://image.tmdb.org/t/p/w200/${item.profile_path}`}
                          alt={`Actor ${item.id}`}
                        />
                        <CardTitle style={{ overflow: "auto" }}>
                          {item.original_name}
                        </CardTitle>
                      </Card>
                    </Link>
                  </Col>
                ))}
            </Row>
          </Row>
        </Col>
        <Col md={8}>
          <h1 style={{ color: "#e6b31e" }}>{movie.title}</h1>
          <ListGroup>
            <ListGroupItem>Release Date: {movie.release_date}</ListGroupItem>
            <ListGroupItem>Runtime: {movie.runtime} Minutes</ListGroupItem>
            <ListGroupItem>
              Spoken Languages: {movie.original_language}
            </ListGroupItem>
            <ListGroupItem>Vote Count: {movie.vote_count}</ListGroupItem>
            <ListGroupItem>Director: {movie.director[0].name}</ListGroupItem>
            <ListGroupItem>Overview: {movie.overview}</ListGroupItem>
            <ListGroupItem>
              <h2>Production Companies</h2>
              {movie.production_companies.length > 0 ? (
                <ul
                  className="list-unstyled"
                  style={{
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <li>
                    <strong>{movie.production_companies[0].name}</strong>
                  </li>
                  <li>
                    {movie.production_companies[0].logo_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${movie.production_companies[0].logo_path}`}
                        alt={movie.production_companies[0].name}
                        className="img-fluid"
                      />
                    )}
                  </li>
                </ul>
              ) : (
                <p>No Production Companies available</p>
              )}
            </ListGroupItem>
          </ListGroup>

          <Row className="mt-4">
            <Col>
              <Card>
                <CardBody>
                  {movie.trailers.length > 0 ? (
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${movie.trailers[0].key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <p>No trailer available</p>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <h1 style={{ color: "#e6b31e" }}>Related Movies</h1>
              <Row>
                {movie.relatedMovies.map((relatedMovie) => (
                  <Col
                    md={4}
                    key={relatedMovie.id}
                    style={{ marginBottom: "10px" }}
                  >
                    <Link
                      href={`/movies/${relatedMovie.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card style={{ height: "100%" }}>
                        <CardImg
                          top
                          src={`https://image.tmdb.org/t/p/w200/${relatedMovie.posterPath}`}
                          alt={`Movie ${relatedMovie.title}`}
                        />
                        <CardBody>
                          <CardTitle style={{ overflow: "auto" }}>
                            {relatedMovie.title}
                          </CardTitle>
                        </CardBody>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
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

export async function getStaticProps({ params }) {
  try {
    const movieId = params.movieId
    const movie = await getMovieDetails(movieId)

    return {
      props: {
        movie,
      },
      revalidate: 60 * 60,
    }
  } catch (error) {
    console.error("Error fetching movie details:", error.message)

    return {
      notFound: true,
    }
  }
}

export default MovieDetailsPage
