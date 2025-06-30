// src/pages/CompanyReviews.jsx
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link, useNavigate} from 'react-router-dom'; 
import './CompanyReviews.css';

function CompanyReviews() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [searchCompany, setSearchCompany] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [, setLoading] = useState(false);
  const [, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    setError(null);
    setFilteredReviews([]);

    if (searchCompany.trim() === '') {
      setFilteredReviews([]);
      return;
    }

    setLoading(true);

    try {
      const apiUrl = `${API_URL}/${searchCompany.trim()}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const parsedReviews = data.map(item => {
        const parsedItem = {};
        for (const key in item) {
          if (item[key].S) {
            parsedItem[key] = item[key].S;
          } else if (item[key].N) {
            parsedItem[key] = parseFloat(item[key].N);
          }
        }
        return parsedItem;
      });
      setFilteredReviews(parsedReviews);
      navigate(`/${searchCompany.trim()}`);

    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError(error.message); // Set the error message to display
      setFilteredReviews([]); // Ensure no old reviews are shown on error
    } finally {
      setLoading(false); // Set loading to false after fetch
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
