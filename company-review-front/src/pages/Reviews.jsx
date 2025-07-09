import React, { useState, useEffect } from 'react';
import './Reviews.css'
import { Link } from 'react-router-dom';
import { titleCase, formatDate } from '../utils.js';
import {Calendar, ThumbsDown, ThumbsUp, Building2, MapPin} from 'lucide-react';
import { motion} from 'framer-motion';


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

  const handleLikeReview = async (PK, SK, index) => {
  try {
    const response = await fetch(`${API_URL}/like-review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ PK, SK })
    });

    if (!response.ok) {
      throw new Error(`Failed to like review: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Review liked:', result);
    const updated = [...reviews];
    updated[index].likes = parseInt(result.likes);
    setReviews(updated);
  } catch (error) {
    console.error('Error liking review:', error.message);
  }
};


  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data)
        

        setReviews(data.map(review => ({ ...review, likes: review.likes || 0 })));

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
        <motion.div
        key={index}
        className="review-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{
    scale: 1.02,
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    transition: { type: 'spring', stiffness: 300 },
  }}
>
          
          {/* Header with Company Name and Date */}
          <div className="review-header">
            <h3 className="company-name"><Building2 size={20}/> {titleCase(review.companyName)}</h3>
            
            <span className="review-date">
              <Calendar size={20} />
              {formatDate(review.date)}
            </span>
          </div>

          {/* Metadata Section */}
          <div className="review-info">
            <span><MapPin size={15}/>{titleCase(review.location)}</span>
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
          
          {/* Feedback Section */}
          <div className='feedback-section'>
            <button className="feedback-button" onClick={() => handleLikeReview(review.PK, review.SK, index)}><ThumbsUp size={15}/> Helpful {review.likes > 0 ? `(${review.likes})` : ''}</button>
            <button className="feedback-button flag" onClick={() => console.log('Flag clicked')}>🚩 Flag Review</button>

          <button className='view-company-reviews'>
        <Link to={`/companies/${review.companyName}/reviews`} className="view-company-link">View Company</Link>
         </button> 
          </div>
        </motion.div>
      ))}
    </div>
  </>
);

}