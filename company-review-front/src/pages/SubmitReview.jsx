// src/pages/SubmitReview.jsx
import React, { useState } from 'react';
import './SubmitReview.css';
import { Link } from 'react-router-dom';

function SubmitReview() {
  const [company, setCompany] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      company,
      review,
      rating,
      date: new Date().toISOString().slice(0, 10),
    };
    console.log('Review submitted:', reviewData);
    alert('Review submitted! Check the console.');
    setCompany('');
    setReview('');
    setRating(0);
  };

  return (
    <div className="review-container fade-in">
      <Link to="/" className="back-button">← Back to Home</Link>

      <h2 className="review-title">Submit a Review</h2>
      <form onSubmit={handleSubmit} className="review-form slide-in">
        <label>
          Company Name:
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            placeholder="e.g. Safaricom, Google"
          />
        </label>

        <label>
          Your Review:
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            rows="5"
            placeholder="Write your experience..."
          />
        </label>

        <label>
          Rating:
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'filled' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </label>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
export default SubmitReview;
