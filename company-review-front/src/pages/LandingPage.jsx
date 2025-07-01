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
          <a href="#submit">Submit Review</a>
          <a href="#browse">Browse Companies</a>
        </nav>
      </header>

      <section className="hero">
        <h2>Where Work Speaks</h2>
        <p>Honest reviews about workplace culture, from real employees.</p>
        <div className="hero-buttons">
          <button>Submit a Review</button>
          <button>Explore Companies</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
