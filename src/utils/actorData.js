import { defaultImage } from "./defaultImage"

const TMDB_API_KEY = "1e3ba2c2144bfdc63d5615205918151c"
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3"

export async function getActorDetails(actorId) {
  try {
    // Fetch actor details
    const actorResponse = await fetch(
      `${TMDB_API_BASE_URL}/person/${actorId}?api_key=${TMDB_API_KEY}&language=en-US`,
    )

    if (!actorResponse.ok) {
      throw new Error("Failed to fetch actor details")
    }

    const actorData = await actorResponse.json()

    // Fetch movies for the actor
    const moviesResponse = await fetch(
      `${TMDB_API_BASE_URL}/person/${actorId}/movie_credits?api_key=${TMDB_API_KEY}&language=en-US`,
    )

    if (!moviesResponse.ok) {
      throw new Error("Failed to fetch actor movies")
    }

    const moviesData = await moviesResponse.json()

    // Combine actor details with the list of movies
    const actorDetails = {
      ...actorData,
      movies: moviesData.cast, // Assuming the cast property contains the list of movies
    }

    return actorDetails
  } catch (error) {
    console.error("Error fetching actor details:", error.message)
    throw new Error("Failed to fetch actor details")
  }
}
