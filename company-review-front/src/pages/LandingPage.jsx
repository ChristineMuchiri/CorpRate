// src/pages/LandingPage.jsx
import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="logo">CorpRate</h1>
        <nav>
          <Link to="/reviews">Reviews</Link>
          <Link to="/write-review">Write Review</Link>
          <Link to="/companies">CompanyReviews</Link>
        </nav>
      </header>

      <section className="hero">
        <h2>Discover Your Next Dream Job</h2>
        <p>Get honest, anonymous insights about company culture, management, and work-life balance from real employess. Make informed career decisions.</p>
        <div className="hero-buttons">
          <button>Submit a Review</button>
          <button>Explore Companies</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
