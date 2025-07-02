// src/pages/SubmitReview.jsx
import React, { useState } from 'react';
import './WriteReviewPage.css';
import { Link } from 'react-router-dom';


const categories = [
        "Overall Rating",
        "Management Quality",
        "Work-Life Balance",
        "Career Growth Opportunities",
        "Compensation & Benefits",
        "Diversity & Inclusion"
];
const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

function WriteReviewPage() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [jobDuration, setJobDuration] = useState('');
    const [pros, setPros] = useState('');
    const [cons, setCons] = useState('');
    const [advice, setAdvice] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [employmentStatus, setEmploymentStatus] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);



    

    const [ratings, setRatings] = useState(
          Object.fromEntries(categories.map((cat) => [cat, 3]))
);
    const handleRatingChange = (category, value) => {
      setRatings((prev) => ({ ...prev, [category]: parseInt(value) }));
};
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      
      setMessage(null);
      setLoading(true);

        const reviewData = {
            companyName,
            jobTitle,
            department,
            jobDuration,
            pros,
            cons,
            advice,
            recommendation,
            employmentStatus,
            ratings,
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
          // Reset form fields
          setCompanyName('');
          setJobTitle('');
          setJobTitle('');
          setDepartment('');
          setJobDuration('');
          setPros('');
          setCons('');
          setAdvice('');
          setRecommendation('');
          setEmploymentStatus('');
          setRatings(Object.fromEntries(categories.map((cat) => [cat, 3])));
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
          </div>
      )}
          

      <h2 className="review-title">Share Your Experience</h2>
      <p className="review-intro">Help others make informed career decisions. Your review will be posted anonymously.</p> 
      <form onSubmit={handleSubmit} className="review-form slide-in">

        {        /* Company Information Section */}
        <section className="company-information">
          <h3>Company Information</h3>
          <label>
            Company Name *
            <input
              type="text"
              value={companyName}
              onChange={(e) => setcompanyName(e.target.value)}
              required
              placeholder="e.g. Safaricom, Google"
            />
          </label>
          <label>
            Job Title
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Technician, Teacher"
            />
          </label>
          <label>
            Department
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. Marketing, Hr"
            />
          </label>
          <label>
            How long did you work there?
            <input
              type="text"
              value={jobDuration}
              onChange={(e) => setJobDuration(e.target.value)}
              placeholder="e.g. 2 years, 6 months"
            />
          </label>
        </section>


        {/* Rating Section */}
      <section className="form-section">
  <h3>⭐ Rate Your Experience</h3>
  <p>Click the stars to rate each category from 1 to 5</p>

  {categories.map((cat) => (
    <div key={cat} className="star-rating-row">
      <label className="category-label">{cat}</label>
      <div className="star-group" title={`${ratings[cat]} – ${ratingLabels[ratings[cat] - 1]}`}>
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            className={`star ${ratings[cat] >= num ? 'filled' : ''}`}
            onClick={() => handleRatingChange(cat, num)}
            title={ratingLabels[num - 1]} // Tooltip per star
          >
            ★
          </span>
        ))}
        <span className="star-label">{ratings[cat]} {ratingLabels[ratings[cat] - 1]}</span>
      </div>
    </div>
  ))}
</section>


      {        /* Your Review Section */}
        <section className="your-review">
          <h3>Your Review</h3>
          <label>
            What are the pros of working here? *
            <input
              type="text"
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              required
              placeholder="Share the positive aspects of working at this company"
            />
          </label>
          <label>
            What are the cons of working here? *
            <input
              type="text"
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              required
              placeholder="Share the challenges or areas of improvement"
            />
          </label>
          <label>
            Any advice for management?            <input
              type="text"
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              placeholder="What suggestions do you have for leadership?"
            />
          </label>
        </section>

       
      <section className="final-questions">
  <h3>Final Questions</h3>

  {/* Recommend to a Friend */}
  <div className="inline-question">
    <label className="question-label">
      Would you recommend this company to a friend?
    </label>
    <div className="inline-options">
      <label>
        <input
          type="radio"
          name="recommendation"
          value="yes"
          onChange={(e) => setRecommendation(e.target.value)}
          required
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="recommendation"
          value="no"
          onChange={(e) => setRecommendation(e.target.value)}
        />
        No
      </label>
    </div>
  </div>

  {/* Employment Status */}
  <div className="inline-question">
    <label className="question-label">
      Employment Status:
    </label>
    <div className="inline-options">
      <label>
        <input
          type="radio"
          name="employmentStatus"
          value="current"
          onChange={(e) => setEmploymentStatus(e.target.value)}
          required
        />
        Current
      </label>
      <label>
        <input
          type="radio"
          name="employmentStatus"
          value="former"
          onChange={(e) => setEmploymentStatus(e.target.value)}
        />
        Former
      </label>
    </div>
  </div>
</section>
        <div className="submit-button-container">
  <button type="submit" disabled={loading}>
    {loading ? <span className="spinner"></span> : 'Submit Review'}
  </button>
</div>
      </form>
    </div>
  );
}
export default WriteReviewPage;
