// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from './Context';
import './NavbarStyles.css';

const Navbar = () => {
  const { query, setQuery } = useGlobalContext();
  const [expanded, setExpanded] = useState(false);

  const handleSearchClick = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">Movie</span>
          <span className="logo-accent">Dekho</span>
        </Link>

        <div className={`search-container ${expanded ? 'expanded' : ''}`}>
          <button 
            className="search-toggle" 
            onClick={handleSearchClick}
            aria-label="Toggle search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;