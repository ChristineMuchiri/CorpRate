import React, { useState } from 'react';
import axios from 'axios';

function SubmitReview() {
    const [company, setCompany] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('5');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        const reviewData = {
            company,
            review,
            rating: parseInt(rating, 10),
        };
        console.log('Review Submitted:', reviewData);

        try {
            const localApiUrl = 'http://localhost:3000/review';

            const response = await axios.post(localApiUrl, reviewData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('API Response:', response.data)
            setSuccess(true);
            setCompany('');
            setReview('');
            setRating('5');
        } catch (err) {
            console.error('Error submitting review:', err);
            setError(err.response?.data?.message || 'Failed to submit review')
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="submit-container">
            <h2 className="submit-title">Submit a Review</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">Review submitted successfully!</div>}
            
            <form onSubmit={handleSubmit} className="submit-form">
                <div className="form-group">
                    <label htmlFor="company">Company Name:</label>
                    <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g., Tech Solutions Inc."
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="review">Your Review:</label>
                    <textarea
                        id="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        rows="6"
                        placeholder="Write your detailed review here..."
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    >
                        <option value="5">5 Stars - Excellent</option>
                        <option value="4">4 Stars - Very Good</option>
                        <option value="3">3 Stars - Good</option>
                        <option value="2">2 Stars - Fair</option>
                        <option value="1">1 Star - Poor</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}
export default SubmitReview;