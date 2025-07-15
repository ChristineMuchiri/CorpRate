import React, { useState, useEffect } from 'react';
import './Reviews.css';
import { Link } from 'react-router-dom';
import { titleCase, formatDate } from '../utils.js';
import { Calendar, ThumbsDown, ThumbsUp, Building2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../auth/useAuth';

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

export default function Reviews({ review: initialReview }) {
  const { idToken } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedIndexes, setLikedIndexes] = useState({});
  const [likesMap, setLikesMap] = useState({});
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLikeReview = async (pk, sk, index) => {
    if (likedIndexes[index] || !idToken) return;

    try {
      const response = await fetch(`${API_URL}/like-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ PK: pk, SK: sk }),
      });

      const data = await response.json();

      if (response.ok) {
        setLikedIndexes(prev => ({ ...prev, [index]: true }));
        setLikesMap(prev => ({ ...prev, [index]: data.likes }));
      } else if (data.message === 'Already liked this review') {
        setLikedIndexes(prev => ({ ...prev, [index]: true }));
      } else {
        console.error(data.message || 'Failed to like review');
      }
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews`);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        setReviews(data.map(review => ({ ...review, likes: review.likes || 0 })));
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentReviews();
  }, [API_URL]);

  if (loading) return <div className="loading-dots"><span>.</span><span>.</span><span>.</span></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="nav-bar">
        <Link to="/landing-page" className="nav-logo">CorpRate</Link>
        <div className="nav-links">
          <Link to="/companies">Companies</Link>
          <Link to="/write-review">Write Review</Link>
        </div>
      </div>

      <div className="reviews-container">
        <h1 className="reviews-title">Latest Reviews</h1>
        <p className="reviews-intro">Read honest employee experiences from companies across different industries</p>
      </div>

      <div className="reviews-list">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="review-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", transition: { type: 'spring', stiffness: 300 } }}
          >
            <div className="review-header">
              <h3 className="company-name"><Building2 size={20}/> {titleCase(review.companyName)}</h3>
              <span className="review-date"><Calendar size={20} />{formatDate(review.date)}</span>
            </div>

            <div className="review-info">
              <span><MapPin size={15}/>{titleCase(review.location)}</span>
              <p className="star-rating">
                <span className='stars'>{renderStars(review.ratings?.['Overall Rating'] || 0)}</span>
                <span className="rating-value">{review.ratings?.['Overall Rating'] || 0}/5</span>
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

            <div className="review-section review-pros">
              <p className="section-label green"><ThumbsUp size={20} color="green" /> Pros</p>
              <p>{review.pros}</p>
            </div>

            <div className="review-section review-cons">
              <p className="section-label red"><ThumbsDown size={20} color="red" /> Cons</p>
              <p>{review.cons}</p>
            </div>

            <div className='feedback-section'>
              <button
                className={`feedback-button ${likedIndexes[index] ? 'liked' : ''}`}
                onClick={() => handleLikeReview(review.PK, review.SK,index)}
                disabled={likedIndexes[index]}
                style={{
                    opacity: likedIndexes[index] ? 0.6 : 1,
                    cursor: likedIndexes[index] ? 'not-allowed' : 'pointer',
                }}
>
              {likedIndexes[index] ? (
            <>
            <ThumbsUp size={15} />
                Liked
              </>
      ) : (
              <>
              <ThumbsUp size={15} />
                  Helpful {review.likes > 0 ? `(${review.likes})` : ''}
              </>
          )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
