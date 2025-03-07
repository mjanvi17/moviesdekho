// Movie.js
import React from 'react';
import { useGlobalContext } from './Context';
import { NavLink } from 'react-router-dom';
import './MovieStyles.css'; // We'll create this CSS file

const Movie = () => {
  const { movie, isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing movies for you...</p>
      </div>
    );
  }

  return (
    <section className="movie-page">
      <div className="container">
        <div className="grid grid-4-col">
          {movie.map((curMovie, index) => {
            const { imdbID, Title, Poster, Year } = curMovie;
            const movieName = Title.length > 15 ? `${Title.substring(0, 15)}...` : Title;
            
            return (
              <NavLink to={`/movie/${imdbID}`} key={index} className="movie-link">
                <div 
                  className="movie-card" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-image-container">
                    <img 
                      src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400x600?text=No+Image+Available"} 
                      alt={Title} 
                    />
                    <div className="overlay">
                      <div className="details">
                        <span className="year">{Year}</span>
                        <span className="view-details">View Details</span>
                      </div>
                    </div>
                  </div>
                  <h2>{movieName}</h2>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Movie;