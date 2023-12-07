import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { getMoviesByGenre, getMoviesByType } from "@/utils/moviesByGenres"
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

  return (
    // <div>
    //   {/* let id be the genre rather than a number */}
    //   <h1>{type || id} </h1>
    //   <ul>
    //     {movies.map((movie) => (
    //       <li key={movie.id}>
    //         {movie.title}
    //         <img
    //           src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
    //           alt={`${movie.title} Poster`}
    //           style={{ maxWidth: "100%", height: "auto" }}
    //         />
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    <Container>
      <Row style={{ marginBottom: "20px" }}>
        <h1 style={{ color: "#e6b31e" }}>{type || id} </h1>
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
                      maxHeight={"420px"}
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
