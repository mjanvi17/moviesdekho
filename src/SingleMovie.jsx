import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SingleMovieStyles.css';

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=56ce1264&plot=full`);
        const data = await response.json();
        
        if (data.Response === "True") {
          setMovie(data);
          setError(false);
          // Small delay to trigger animations after content loads
          setTimeout(() => {
            setAnimateContent(true);
          }, 100);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
    
    // Reset animation state when component unmounts or id changes
    return () => {
      setAnimateContent(false);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2>Movie Not Found</h2>
        <p>We couldn't find the movie you're looking for.</p>
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
    );
  }

  // Extract ratings for display
  const imdbRating = movie.imdbRating !== "N/A" ? movie.imdbRating : "-";
  const ratings = movie.Ratings || [];
  
  return (
    <div className="single-movie-container">
      <div className={`movie-backdrop ${animateContent ? 'animate' : ''}`} 
        style={{ backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : ""})` }}>
        <div className="backdrop-overlay"></div>
      </div>

      <div className="single-movie-content">
        <Link to="/" className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Movies
        </Link>

        <div className="movie-details-card">
          <div className={`poster-container ${animateContent ? 'animate' : ''}`}>
            <img 
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image+Available"} 
              alt={movie.Title} 
              className="movie-poster"
            />
            <div className="rating-badge">
              <span className="rating-value">{imdbRating}</span>
              <span className="rating-label">IMDb</span>
            </div>
          </div>
          
          <div className="movie-info">
            <div className={`movie-header ${animateContent ? 'animate' : ''}`}>
              <h1 className="movie-title">{movie.Title}</h1>
              <div className="movie-meta">
                <span className="movie-year">{movie.Year}</span>
                <span className="movie-rated">{movie.Rated}</span>
                <span className="movie-runtime">{movie.Runtime}</span>
              </div>
            </div>

            <div className={`movie-genre-tags ${animateContent ? 'animate' : ''}`}>
              {movie.Genre.split(', ').map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))}
            </div>

            <div className={`movie-plot ${animateContent ? 'animate' : ''}`}>
              <h3>Plot</h3>
              <p>{movie.Plot}</p>
            </div>

            <div className="movie-details-grid">
              <div className={`detail-item ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>
                <h3>Director</h3>
                <p>{movie.Director}</p>
              </div>

              <div className={`detail-item ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
                <h3>Writers</h3>
                <p>{movie.Writer}</p>
              </div>

              <div className={`detail-item ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.4s' }}>
                <h3>Actors</h3>
                <p>{movie.Actors}</p>
              </div>

              <div className={`detail-item ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.5s' }}>
                <h3>Language</h3>
                <p>{movie.Language}</p>
              </div>

              <div className={`detail-item ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.6s' }}>
                <h3>Country</h3>
                <p>{movie.Country}</p>
              </div>

              <div className={`detail-item ${animateContent ? 'animate' : ''}`} style={{ animationDelay: '0.7s' }}>
                <h3>Awards</h3>
                <p>{movie.Awards}</p>
              </div>
            </div>

            {ratings.length > 0 && (
              <div className={`movie-ratings ${animateContent ? 'animate' : ''}`}>
                <h3>Ratings</h3>
                <div className="ratings-container">
                  {ratings.map((rating, index) => (
                    <div key={index} className="rating-item">
                      <span className="rating-source">{rating.Source}</span>
                      <span className="rating-value">{rating.Value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;