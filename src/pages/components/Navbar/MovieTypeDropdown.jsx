import React, { useState } from "react"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

const MovieTypeDropdown = ({ selectedMovieType, handleMovieTypeChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle nav caret style={{ color: "#e6b31e" }}>
        {selectedMovieType === "" ? "Movies" : selectedMovieType}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem disabled onClick={() => handleMovieTypeChange("")}>
          Select Movies Type
        </DropdownItem>
        <DropdownItem onClick={() => handleMovieTypeChange("top_rated")}>
          Top Rated
        </DropdownItem>
        <DropdownItem onClick={() => handleMovieTypeChange("popular")}>
          Popular
        </DropdownItem>
        {/* <DropdownItem onClick={() => handleMovieTypeChange('latest')}>Latest</DropdownItem> */}
        <DropdownItem onClick={() => handleMovieTypeChange("now_playing")}>
          Now Playing
        </DropdownItem>
        <DropdownItem onClick={() => handleMovieTypeChange("upcoming")}>
          Upcoming
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default MovieTypeDropdown
