import React, { useState, useEffect } from 'react';
import './Reviews.css'
import { Link } from 'react-router-dom';


export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data)
        setReviews(data)
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false)
      }
    };
    fetchRecentReviews();
  }, [API_URL]);

  if (loading) return <div>Loading recent reviews...</div>
  if (error) return <div>Error: { error}</div>
  return (
    <>
      <div className='nav-bar'>
      <Link to="/" className='nav-logo'>CorpRate</Link>
      <div className='nav-links'>
        <Link to="/companies">Companies</Link>
        <Link to="/write-review">Write Review</Link>
      </div>
        </div>
   
    <div className="reviews-container">
      <h1 className="reviews-title">Latest Reviews</h1>
      <p className="reviews-intro">
        Read honest employee experiences from companies across different industries
      </p>
      </div>
      <div className="recent-reviews">
      <h2>Recent Reviews (Last 3 Days)</h2>
      <div className="reviews-list">
  {reviews.map((review, index) => (
    <div key={index} className="review-card">
      <div className="review-header">
        <h3>{review.companyName}</h3>
        <span className="review-date">{review.date}</span>
      </div>
      <p><strong>Pros:</strong> {review.pros}</p>
      <p><strong>Cons:</strong> {review.cons}</p>
      <p><strong>Advice:</strong> {review.advice}</p>
      <p><strong>Department:</strong> {review.department} — <strong>Title:</strong> {review.jobTitle}</p>
    </div>
  ))}
</div>

    </div>
      </>
  );
}