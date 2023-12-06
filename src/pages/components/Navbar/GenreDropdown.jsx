import React, { useState } from "react"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap"

const GenreDropdown = ({ genres, selectedGenre, handleGenreChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  // Check if genres is defined and is an array
  if (!genres || !Array.isArray(genres) || genres.length === 0) {
    return (
      <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle nav caret>
          Loading Genres...
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem disabled>Loading...</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }

  const itemsPerColumn = Math.ceil(genres.length / 2)
  const firstColumnGenres = genres.slice(0, itemsPerColumn)
  const secondColumnGenres = genres.slice(itemsPerColumn)

  return (
    <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle nav caret>
        {selectedGenre === ""
          ? "Genres"
          : genres.find((g) => g.id === selectedGenre)?.name}
      </DropdownToggle>
      <DropdownMenu
        style={{ maxHeight: "350px", overflowY: "auto", width: "300px" }}
      >
        <Row>
          <Col style={{ width: "50%" }}>
            {firstColumnGenres.map((genre) => (
              <DropdownItem
                key={genre.id}
                onClick={() => handleGenreChange(genre.id)}
              >
                {genre.name}
              </DropdownItem>
            ))}
          </Col>
          <Col style={{ width: "50%" }}>
            {secondColumnGenres.map((genre) => (
              <DropdownItem
                key={genre.id}
                onClick={() => handleGenreChange(genre.id)}
              >
                {genre.name}
              </DropdownItem>
            ))}
          </Col>
        </Row>
      </DropdownMenu>
    </Dropdown>
  )
}

export default GenreDropdown
