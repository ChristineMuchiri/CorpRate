// src/pages/Home.jsx
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-icon">⭐</div>
        <h1>CorpRate</h1>
        <p>Share your workplace experiences and discover what others say about companies</p>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-icon green">💬</div>
          <h2>Submit Review</h2>
          <p>Share your experience and help others make informed decisions about their career choices</p>
          <Link to="/submit-review" className="card-link green-link">Write a Review →</Link>
        </div>

        <div className="card">
          <div className="card-icon blue">🔍</div>
          <h2>Browse Reviews</h2>
          <p>Discover what employees are saying about companies and find your perfect workplace</p>
          <Link to="/company-reviews" className="card-link blue-link">Search Companies →</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
