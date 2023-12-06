import React, { useState, useEffect } from "react"
import { getMovieGenres } from "@/utils/moviesByGenres"
import { useRouter } from "next/router"
import MovieTypeDropdown from "./MovieTypeDropdown"
import GenreDropdown from "./GenreDropdown"
import SearchBox from "./SearchBox"

import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap"

export default function MyNavbar() {
  const router = useRouter()
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedMovieType, setSelectedMovieType] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

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

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() !== "") {
      router.push(`/search?q=${searchQuery}`)
      setSearchQuery("")
    }
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
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">
        <img src="/images/logo.png" alt="Netflux Logo - Movies Website" />
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="m-auto" navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/actors">Actors</NavLink>
          </NavItem>
          <GenreDropdown
            genres={genres}
            selectedGenre={selectedGenre}
            handleGenreChange={handleGenreChange}
          />
          <MovieTypeDropdown
            selectedMovieType={selectedMovieType}
            handleMovieTypeChange={handleMovieTypeChange}
          />
        </Nav>
        <SearchBox handleSearch={handleSearch} />
      </Collapse>
    </Navbar>
  )
}
