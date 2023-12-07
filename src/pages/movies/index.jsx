import React from "react"
import Link from "next/link"
import { useMovieList } from "@/utils/moviesList"
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap"

const formatGenre = (genre) => {
  if (!genre) return ""
  const formattedGenre = genre.replace(/_/g, " ")
  return formattedGenre.charAt(0).toUpperCase() + formattedGenre.slice(1)
}

const MovieList = ({ genres }) => {
  const movies = useMovieList(genres)

  const formattedGenres = formatGenre(genres)

  return (
    <Container>
      <Row style={{ marginBottom: "20px" }}>
        <h1 style={{ color: "#e6b31e" }}>{formattedGenres}</h1>
      </Row>
      {movies.length > 0 ? (
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} md={4} style={{ marginBottom: "16px" }}>
              <Link
                href={`/movies/${movie.id}`}
                style={{ textDecoration: "none" }}
                passHref
              >
                <Card>
                  {movie.poster_path ? (
                    <CardImg
                      top
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={`${movie.title} Poster`}
                      className="movie--image"
                    />
                  ) : (
                    <p>No poster available</p>
                  )}
                  <CardBody className="text-center">
                    <CardTitle tag="h5">{movie.title}</CardTitle>
                    <CardText style={{ color: "#e6b31e" }}>
                      {movie.release_date}
                    </CardText>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  )
}

export default MovieList
