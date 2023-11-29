import Link from 'next/link';
import React, { useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const API_KEY = '1e3ba2c2144bfdc63d5615205918151c';

            const searchEndpoint = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchTerm}`

            const response = await fetch(searchEndpoint);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSelectionChange = (event) => {
        // You can add logic here for handling the selected option
        console.log('Selected option:', event.target.value);

    };
    return (

        <div className='container'>
            <button className="navbar-burger">
                <span className="navicon"></span>
            </button>
            <Link className="navbar-item navbar-logo" href="/">
                <Image
                    src="/logo.png"
                    alt="Netflux Logo"
                    width={80}
                    height={20}
                    priority
                />
            </Link>
            <ul className="navbar-menu">
                <li><Link href="/actors" className="navbar-item">Actors</Link></li>
                <li>
                    <select id="dropdown" onChange={handleSelectionChange} className="navbar-item">
                        {/* <option value="" disabled selected>
                            Genres
                        </option> */}
                        {/* The Genres should be fetched from the API  */}
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </li>
                <li>
                    <select id="dropdown" onChange={handleSelectionChange} className="navbar-item">
                        {/* <option value="" disabled selected>
                            Movies
                        </option> */}
                        <option value="Top Rate">Top Rate</option>
                        <option value="Popular">Popular</option>
                        <option value="Latest">Latest</option>
                        <option value="Now playing">Now playing</option>
                        <option value="Upcoming">Upcoming</option>
                    </select>
                </li>
            </ul>

            <div className='navbar-search'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <div>
                    {/* <h2>Search Results:</h2>
                        <ul>
                            {searchResults.map((result) => (
                                <li key={result.id}>
                                    {result.title || result.name} ({result.media_type})
                                </li>
                            ))}
                        </ul> */}
                </div>
            </div>
        </div>

    )
}
