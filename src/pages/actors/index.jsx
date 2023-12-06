import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"

const Actors = () => {
  const [actors, setActors] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const API_KEY = "1e3ba2c2144bfdc63d5615205918151c"
        const actorsEndpoint = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`
        const response = await fetch(actorsEndpoint)
        const data = await response.json()
        setActors(data.results)
      } catch (error) {
        console.error("Error fetching actors:", error)
      }
    }

    fetchActors()
  }, [])

  const filteredActors = actors.filter((actor) =>
    actor.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleActorClick = (actorId) => {
    router.push(`/actors/${actorId}`)
  }

  return (
    <div className="container">
      <h1>Popular Actors</h1>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search actors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
        />
        <button
          onClick={() => console.log("Search button clicked")}
          className="searchButton"
        >
          Search
        </button>
      </div>
      <div className="actorCardsContainer">
        {filteredActors.map((actor) => (
          <div
            key={actor.id}
            className="actorCard"
            onClick={() => handleActorClick(actor.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
              alt={`Image of ${actor.name}`}
              className="actorImage"
            />
            <div style={{ color: "white" }} className="actorName">
              {actor.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Actors
