// src/pages/SubmitReview.jsx
import React, { useState } from 'react';
import './WriteReviewPage.css';
import { Link } from 'react-router-dom';

function WriteReviewPage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [company, setCompany] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      setMessage(null)
        const reviewData = {
            company,
            review,
            rating,
            date: new Date().toISOString().slice(0, 10),
        };
    
        try {
            const response = await fetch(`${API_URL}/review`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData)
            });
            if (!response.ok) {
                throw new Error('Failed to submit review');
          }
          setMessage({ text: 'Review submitted successfully!', type: 'success' });
          setTimeout(() => { setMessage(null); }, 5000);
            setCompany('');
            setReview('');
            setRating(0);
    }       catch (error) {
            console.error('Error submitting review:', error);
            alert('There was an error submitting the review.');
    }
        }
        


  return (
    <div className="review-container fade-in">
      <Link to="/" className="back-button">← Back to Home</Link>
      {message && (
        <div className={`submission-message ${message.type}`}>
          <p>{message.text}</p>
          {message.type === 'success'}
          </div>
      )}
          

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
