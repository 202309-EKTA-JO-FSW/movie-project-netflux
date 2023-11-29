import React, { useState, useEffect } from 'react';

const MovieList = ({ genres }) => {
    const [movies, setMovies] = useState([]);

    const API_KEY = '1e3ba2c2144bfdc63d5615205918151c';

    const fetchPopularMovies = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${genres}?api_key=${API_KEY}`);
            const data = await response.json();

            setMovies(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    return (
        <div>
            <h1>{genres.toUpperCase()} Movies</h1>
            {movies.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {movies.map((movie) => (
                        <div key={movie.id} style={{ width: '250px', margin: '16px', border: '1px solid #ddd', padding: '16px' }}>
                            <h2>{movie.title}</h2>
                            {movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={`${movie.title} Poster`}
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            ) : (
                                <p>No poster available</p>
                            )}
                            <p>{movie.release_date}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MovieList;
