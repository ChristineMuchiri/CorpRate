// src/pages/CompanyReviews.jsx
import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, MapPin, Calendar } from "lucide-react";
import { Link, useParams} from 'react-router-dom'; 
import './CompanyReviewsPage.css';
import { titleCase } from '../utils.js'; 

function CompanyReviewsPage() { 
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const { companyName } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setAverageRating] = useState(0); // Default average rating
  const [recommendPercentage, setRecommendPercentage] = useState(0); // Default recommend percentage

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/companies/${companyName}/reviews`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        setReviews(data);
        
        // Calculate average rating
      const totalRating = data.reduce((sum, r) => sum + (r.ratings?.overall || 0), 0);
      const avgRating = data.length ? totalRating / data.length : 0;
      setAverageRating(avgRating);

      // Calculate % recommend
      const recommendYes = data.filter(r => r.recommendation === 'yes').length;
      const recommendPercent = data.length ? Math.round((recommendYes / data.length) * 100) : 0;
      setRecommendPercentage(recommendPercent);

      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [companyName]);
    if (loading) return <p>Loading reviews</p>;


    return (
     
      <div className="company-reviews-page-container">
        <div className='review-header-bar'>
        <Link to="/" className="back-button">← Back to Home</Link>
          <Link to="/write-review" className="review-button">Write Review</Link>
          </div>
    <h2>Reviews for {titleCase(companyName)}</h2>
      
      <div className="company-summary-card">
  <div className="company-info">
    <div className="company-name-section">
      <span className="company-icon">🏢</span>
      <h2 className="company-name">{titleCase(companyName)}</h2>
      {/* Optional: You can add industry or location */}
    </div>

    <div className="rating-section">
      
      
      <span className="review-count">{reviews.length} reviews</span>
    </div>
  </div>

  <div className="recommend-box">
    <span className="recommend-text">{recommendPercentage}% Recommend</span>
    <span className="recommend-subtext">to a friend</span>
  </div>
</div>
    {reviews.length > 0 ? (
      reviews.map((review, idx) => (
        <div key={idx} className="review-card">
          <div className="review-header">
            <div className="reviewer-info">
              <h3 className='job-title'>{titleCase(review.jobTitle)}</h3>
              <div className='review-meta'>
              <span>{titleCase(review.department)}</span>
              <span className="dot">  •  </span>
              <span>{review.jobDuration}</span>
              <span className="dot"> • </span>
              <span className={`status-badge ${review.employmentStatus === 'Current Employee' ? 'current' : 'former'}`}>
              {titleCase(review.employmentStatus)}
                </span>
              </div>
              <span className='location'><MapPin size={15}/> {titleCase(review.location )}</span>
            </div>
            
            <span className="review-date">
              <span className="stars">★★★★☆</span>
              <span>
                <Calendar size={15}/>
                {review.date ? new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
                   ) : 'No Date'}
                </span>
            </span>
          </div>

          

          <div className="review-section review-pros">
            <p className="section-label green"><ThumbsUp size={20} color="green" /> Pros</p>
            <p>{review.pros}</p>
          </div>

          <div className="review-section review-cons">
            <p className="section-label red"><ThumbsDown size={20} color="red" /> Cons</p>
            <p>{review.cons}</p>
          </div>
          <div className="review-section review-advice">
            <p className="section-label blue"><MessageSquare size={20} color="#007bff" /> Advice to Management</p>
            <p>{review.advice}</p>
          </div>

          
        </div>
      ))
    ) : (
      <p>No reviews found for this company.</p>
    )}
  </div>
    );
}

export default CompanyReviewsPage;
