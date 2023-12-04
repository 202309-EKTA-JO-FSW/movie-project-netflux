import { defaultImage } from "./defaultImage"


const TMDB_API_KEY = "1e3ba2c2144bfdc63d5615205918151c"

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

export async function getActorDetails(actorId) {
    const actorResponse = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}?api_key=${TMDB_API_KEY}&language=en-US`,
    )

    if (!actorResponse.ok) {
        throw new Error("Failed to fetch movie details")
    }

    const movieData = await actorResponse.json()

    const actorDetails = {
        ...movieData,

    }

    return actorDetails
}

