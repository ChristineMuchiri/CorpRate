// src/pages/CompanyReviews.jsx
import React, { useState, useEffect} from 'react';
import { FaStar } from 'react-icons/fa';
import { Link, useParams} from 'react-router-dom'; 
import './CompanyReviewsPage.css';
import { titleCase } from '../utils.js'; // Assuming you have a utility function for title casing

function CompanyReviewsPage() { 
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const { companyName } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/companies/${companyName}/reviews`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [companyName]);
    if (loading) return <p>Loading reviews</p>;
    return (
    <div>
      <Link to="/" className="back-button">← Back to Home</Link>
      <h2>Reviews for {titleCase(companyName)}</h2>
      {reviews.length > 0 ? (
        reviews.map((review, idx) => (
          <div key={idx} className="review-card">
            <h3>{titleCase(review.jobTitle)}  {titleCase(review.employmentStatus)}</h3>
            <p><strong>Pros:</strong> {review.pros}</p>
            <p><strong>Cons:</strong> {review.cons}</p>
            <p><strong>Advice:</strong> {review.advice}</p>
          </div>
        ))
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );




  

  
}

export default CompanyReviewsPage;
