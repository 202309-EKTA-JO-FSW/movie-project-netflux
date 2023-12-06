import React, { useState } from "react"
import { Input, Button } from "reactstrap"

const SearchBox = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="navbar-search ml-auto d-flex">
      <Input
        type="text"
        id="searchInput"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        color="secondary"
        className="transparent-button"
        onClick={() => {
          handleSearch(searchQuery)
          // Clear the search box after clicking the button
          setSearchQuery("")
        }}
      >
        Search
      </Button>
    </div>
  )
}

export default SearchBox
