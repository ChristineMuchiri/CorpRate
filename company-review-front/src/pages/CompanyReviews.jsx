// src/pages/CompanyReviews.jsx
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ✅ Add this
import './CompanyReviews.css';

function CompanyReviews() {
  const [searchCompany, setSearchCompany] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);

    if (searchCompany.trim() === '') {
      setFilteredReviews([]);
      return;
    }

    // Placeholder for future fetch logic
    setFilteredReviews([]);
  };

  const renderStars = (rating) => (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < rating ? 'star filled' : 'star'} />
      ))}
    </div>
  );

  return (
    <div className="review-container">
      <Link to="/" className="back-button">← Back to Home</Link> {/* ✅ Back button */}

      <h2 className="review-title">Company Reviews</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchCompany}
          onChange={(e) => setSearchCompany(e.target.value)}
          placeholder="Enter company name to search..."
        />
        <button type="submit">Search Reviews</button>
      </form>

      {hasSearched && filteredReviews.length === 0 && searchCompany.trim() !== '' && (
        <p className="message">No reviews found for "{searchCompany}".</p>
      )}

      {hasSearched && searchCompany.trim() === '' && (
        <p className="message">Please enter a company name to search for reviews.</p>
      )}

      {!hasSearched && (
        <p className="message">Enter a company name above to view reviews.</p>
      )}

      {filteredReviews.length > 0 && (
        <div className="review-grid">
          {filteredReviews.map((review) => (
            <div key={review.id} className="review-card">
              <h3>{review.company}</h3>
              {renderStars(review.rating)}
              <p className="review-text">"{review.reviewText}"</p>
              <p className="review-date">Reviewed on: {review.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompanyReviews;
