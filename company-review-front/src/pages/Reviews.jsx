import React, { useState, useEffect } from 'react';
import './Reviews.css'
import { Link } from 'react-router-dom';
import { titleCase, formatDate } from '../utils.js';
import {Calendar, ThumbsDown, ThumbsUp} from 'lucide-react';


function renderStars(rating) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={i}>★</span>);
  }

  if (hasHalfStar) {
    stars.push(<span key="half">☆</span>);
  }

  while (stars.length < 5) {
    stars.push(<span key={stars.length}>☆</span>);
  }

  return stars;
}

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
    {/* Navigation Bar */}
    <div className="nav-bar">
      <Link to="/" className="nav-logo">CorpRate</Link>
      <div className="nav-links">
        <Link to="/companies">Companies</Link>
        <Link to="/write-review">Write Review</Link>
      </div>
    </div>

    {/* Reviews Intro */}
    <div className="reviews-container">
      <h1 className="reviews-title">Latest Reviews</h1>
      <p className="reviews-intro">
        Read honest employee experiences from companies across different industries
      </p>
    </div>

    {/* Review List */}
    <div className="reviews-list">
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          
          {/* Header with Company Name and Date */}
          <div className="review-header">
            <h3 className="company-name">{titleCase(review.companyName)}</h3>
            <span className="review-date">
              <Calendar size={20} />
              {formatDate(review.date)}
            </span>
          </div>

          {/* Metadata Section */}
          <div className="review-info">
            <p className="star-rating">
              <span className='stars'>{renderStars(review.ratings?.['Overall Rating'] || 0 )}</span>
              <span className="rating-value">{review.ratings?.['Overall Rating']|| 0}/5</span>
              </p>
            <div className="review-meta">
              <span>{titleCase(review.jobTitle)}</span>
              <span className="dot"> • </span>
              <span>{titleCase(review.department)}</span>
              <span className="dot"> • </span>
              <span>{review.jobDuration}</span>
              <span className="dot"> • </span>
              <span className={`status-badge ${review.employmentStatus === 'Current Employee' ? 'current' : 'former'}`}>
                {titleCase(review.employmentStatus)}
              </span>
            </div>
          </div>

          {/* Pros Section */}
          <div className="review-section review-pros">
            <p className="section-label green">
              <ThumbsUp size={20} color="green" /> Pros
            </p>
            <p>{review.pros}</p>
          </div>

          {/* Cons Section */}
          <div className="review-section review-cons">
            <p className="section-label red">
              <ThumbsDown size={20} color="red" /> Cons
            </p>
            <p>{review.cons}</p>
          </div>

        </div>
      ))}
    </div>
  </>
);

}