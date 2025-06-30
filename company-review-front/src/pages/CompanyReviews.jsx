// src/pages/CompanyReviews.jsx
import React, { useState} from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import './CompanyReviews.css';

function CompanyReviews() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [searchCompany, setSearchCompany] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submittedCompany, setSubmittedCompany] = useState('');



  const handleSearch = async (e) => {
    e.preventDefault();

    
    const trimmed = searchCompany.trim();
    if (!trimmed) {
      setError("Please enter a company name to search");
      setHasSearched(true);
      return;
    }


    setLoading(true);
    setError(null);
    setFilteredReviews([]);
    setHasSearched(true);
    setSubmittedCompany(trimmed)

    try {
      // encode URI component by escaping characters not allowed in URLs
      const response = await fetch(`${API_URL}/${encodeURIComponent(trimmed)}`);


      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.errorMessage ||
          `Server error: ${response.status}`
        );
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format from server");
      }

      setFilteredReviews(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
      <Link to="/" className="back-button">← Back to Home</Link>

      <h2 className="review-title">Company Reviews</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchCompany}
          onChange={(e) => setSearchCompany(e.target.value)}
          placeholder="Enter company name to search..."
        />
        <button type="submit" disabled={loading || searchCompany.trim() === ''}>
          {loading ? 'Searching...' : 'Search Reviews'}
        </button>
      </form>

      {loading && <p className="message">Loading reviews...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {!loading && !error && hasSearched && filteredReviews.length === 0 && submittedCompany !== '' && (
        <p className="message">No reviews found for "{submittedCompany}".</p>
      )}

      {!loading && !error && hasSearched && submittedCompany === '' && (
        <p className="message">Please enter a company name to search for reviews.</p>
      )}

      {!loading && !error && !hasSearched && (
        <p className="message">Enter a company name above to view reviews.</p>
      )}

      {!loading && !error && filteredReviews.length > 0 && (
        <div className="review-grid">
          {filteredReviews.map((review, index) => {
            return (
              <div key={review.PK + index} className="review-card">
                <h3>{review.company || submittedCompany}</h3>
                {review.rating && renderStars(review.rating)}
                <p className="review-text">
                  "{review.review}"
                </p>
                <p className="review-date">
                  Reviewed on: {review.created_at}
                </p>
              </div>
            );
          })}
        </div>
      )}
      
    </div>
  );


  
}

export default CompanyReviews;
