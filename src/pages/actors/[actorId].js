import { useRouter } from "next/router"
import { getActorDetails } from "../../utils/actorData"
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

const ActorDetailsPage = ({ actor }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            <CardImg
              top
              src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
              alt={`${actor.name} Poster`}
            />
            <CardBody>
              <CardTitle tag="h5">{actor.name}</CardTitle>
            </CardBody>
          </Card>
        </Col>
        <Col md={8}>
          <h1 style={{ color: "#e6b31e" }}>{actor.name}</h1>
          <ListGroup>
            <ListGroupItem>Birthdate: {actor.birthday}</ListGroupItem>
            <ListGroupItem>
              Place of Birth: {actor.place_of_birth}
            </ListGroupItem>
            <ListGroupItem>
              Gender:{" "}
              {actor.gender === 1
                ? "Female"
                : actor.gender === 2
                  ? "Male"
                  : "Not specified"}
            </ListGroupItem>
            <ListGroupItem>Biography: {actor.biography}</ListGroupItem>
          </ListGroup>
          <h2>Filmography</h2>
          <Row>
            {actor.movies.map(
              (movie) =>
                movie.poster_path && (
                  <Col md={3} key={movie.id} style={{ marginBottom: "10px" }}>
                    <Link
                      href={`/movies/${movie.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card style={{ height: "100%" }}>
                        <CardImg
                          top
                          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                          alt={`Movie ${movie.title}`}
                        />
                        <CardTitle style={{ overflow: "auto" }}>
                          {movie.title}
                        </CardTitle>
                      </Card>
                    </Link>
                  </Col>
                ),
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export async function getStaticPaths() {
  const paths = [
    { params: { actorId: "1" } },
    { params: { actorId: "2" } },
    { params: { actorId: "3" } },
  ]

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  try {
    const actorId = params.actorId
    const actor = await getActorDetails(actorId)

    return {
      props: {
        actor,
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

export default ActorDetailsPage
