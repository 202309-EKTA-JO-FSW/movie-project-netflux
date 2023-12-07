import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import {
  getMoviesByGenre,
  getMoviesByType,
  getGenreById,
} from "@/utils/moviesByGenres"
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
import Link from "next/link"

const MoviesByGenre = () => {
  const router = useRouter()
  const { id, type } = router.query
  const [movies, setMovies] = useState([])
  const [genre, setGenreName] = useState([])

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (id) {
        // Ensure id is a number
        const genreId = parseInt(id, 10)
        if (isNaN(genreId)) {
          console.error("Invalid genre ID:", id)
          return
        }
        const moviesByGenre = await getMoviesByGenre(genreId)
        setMovies(moviesByGenre)

        const genreName = await getGenreById(genreId)
        setGenreName(genreName)
      } else if (type) {
        const moviesByGenre = await getMoviesByType(type)
        setMovies(moviesByGenre)
      }
    }

    fetchMoviesByGenre()
  }, [type, id])

  const formatType = (type) => {
    if (!type) return ""
    const formattedType = type.replace(/_/g, " ")
    return formattedType.charAt(0).toUpperCase() + formattedType.slice(1)
  }

  return (
    <Container>
      <Row style={{ marginBottom: "20px" }}>
        <h1 style={{ color: "#e6b31e" }}>{formatType(type) || genre.name} </h1>
      </Row>
      {movies.length > 0 ? (
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} md={3} style={{ marginBottom: "16px" }}>
              <Link
                href={`/movies/${movie.id}`}
                passHref
                style={{ textDecoration: "none" }}
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
                    <CardText>{movie.release_date}</CardText>
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

export default MoviesByGenre
