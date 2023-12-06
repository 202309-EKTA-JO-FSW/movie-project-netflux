import React from "react"
import { Input, Button } from "reactstrap"

const SearchBox = ({ handleSearch }) => {
  return (
    <div className="navbar-search ml-auto d-flex">
      <Input type="text" id="searchInput" placeholder="Search..." />
      <Button
        color="secondary"
        onClick={() =>
          handleSearch(document.getElementById("searchInput").value)
        }
      >
        Search
      </Button>
    </div>
  )
}

export default SearchBox
