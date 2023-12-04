import Link from "next/link"
import React, { useState, useEffect } from "react"
import { getMovieGenres } from "@/utils/moviesByGenres"
import { useRouter } from "next/router"

export default function Navbar() {
  const router = useRouter()
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedMovieType, setSelectedMovieType] = useState("")

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await getMovieGenres()
        setGenres(genresData)
      } catch (error) {
        console.error("Error fetching genres:", error.message)
      }
    }
    fetchGenres()
  }, [])

  const handleSearch = (query) => {
    router.push(`/search?q=${query}`)
  }

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId)
    router.push(`/movies/genres?id=${genreId}`)
  }

  const handleMovieTypeChange = async (movieType) => {
    setSelectedMovieType(movieType)
    router.push(`/movies/genres?type=${movieType}`)
  }

  return (
    <div className="container">
      <button className="navbar-burger">
        <span className="navicon"></span>
      </button>
      <Link href="/">
        <div className="navbar-item navbar-logo">
          <img
            src="/images/logo.png"
            alt="Netflux Logo"
            width={80}
            height={20}
          />
        </div>
      </Link>
      <ul className="navbar-menu">
        <li>
          <Link href="/actors">Actors</Link>
        </li>
        <li>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="navbar-item"
          >
            <option value="" disabled>
              Select Movie Genres
            </option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </li>
        <li>
          <select
            id="movieDropdown"
            value={selectedMovieType}
            onChange={(e) => handleMovieTypeChange(e.target.value)}
            className="navbar-item"
          >
            <option value="" disabled>
              Select Movie Type
            </option>
            <option value="top_rated">Top Rated</option>
            <option value="popular">Popular</option>
            <option value="latest">Latest</option>
            <option value="now_playing">Now Playing</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </li>
      </ul>

      <div className="navbar-search">
        <input type="text" id="searchInput" placeholder="Search..." />
        <button
          onClick={() =>
            handleSearch(document.getElementById("searchInput").value)
          }
        >
          Search
        </button>
      </div>
    </div>
  )
}
