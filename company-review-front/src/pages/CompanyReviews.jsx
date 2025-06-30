// src/pages/CompanyReviews.jsx
import React, { useState } from 'react';
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


  const handleSearch = async (e) => {
    e.preventDefault();

    setHasSearched(true);
    setError(null);
    setFilteredReviews([]);

    if (searchCompany.trim() === '') {
      setError("Please enter a company name to search");
      //setFilteredReviews([]);
      return;
    }

    setLoading(true);

    try {
      const encodedCompanyName = encodeURIComponent(searchCompany.trim());
      const apiUrl = `${API_URL}/${encodedCompanyName}`;
      console.log('Making request to:', apiUrl);

      const response = await fetch(apiUrl);

      // --- Start of Debugging Logs ---
    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', response.headers);
    // --- End of Debugging Logs ---

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorMessage || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Api response Data:', data);

      // --- Crucial Debugging Logs ---
    console.log('Parsed API Data (before map):', data);
    console.log('Type of Parsed API Data:', typeof data);
    console.log('Is Parsed API Data an Array?', Array.isArray(data));
      // --- End of Debugging Logs ---
      // Add a robust check here before mapping
    if (!Array.isArray(data)) {
        console.error("Expected 'data' to be an array but received:", data);
        setError("Unexpected response format from server. Please try again or contact support.");
        return; // Stop execution here if data is not an array
    }

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
      <Link to="/" className="back-button">← Back to Home</Link>

      <h2 className="review-title">Company Reviews</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchCompany}
          onChange={(e) => setSearchCompany(e.target.value)}
          placeholder="Enter company name to search..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Reviews'}
        </button>
      </form>

      {loading && <p className="message">Loading reviews...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {!loading && !error && hasSearched && filteredReviews.length === 0 && searchCompany.trim() !== '' && (
        <p className="message">No reviews found for "{searchCompany}".</p>
      )}

      {!loading && !error && hasSearched && searchCompany.trim() === '' && (
        <p className="message">Please enter a company name to search for reviews.</p>
      )}

      {!loading && !error && !hasSearched && (
        <p className="message">Enter a company name above to view reviews.</p>
      )}

      {!loading && !error && filteredReviews.length > 0 && (
        <div className="review-grid">
          {filteredReviews.map((review, index) => {
            const isReview = review.SK && review.SK.startsWith('REVIEW#');
            // const isCompanyMetadata = review.SK && review.SK.startsWith('METADATA#'); // Not strictly needed if filtering

            if (!isReview) {
              return null;
            }

            return (
              <div key={review.SK || review.PK + index} className="review-card">
                <h3>{review.companyName || searchCompany}</h3>
                {review.rating && renderStars(review.rating)}
                <p className="review-text">
                  "{review.reviewText || review.review || 'No review text provided.'}"
                </p>
                <p className="review-date">
                  Reviewed on: {review.Date || review.created_at || 'N/A'}
                </p>
                {review.user_id && <p className="reviewer">By: {review.user_id}</p>}
              </div>
            );
          })}
        </div>
      )}
      
    </div>
  );
}

export default CompanyReviews;
