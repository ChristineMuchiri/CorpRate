import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './AllCompaniesPage.css'
import { titleCase } from '../utils.js';
import { Star, StarHalf, StarOff, Users } from 'lucide-react';

export default function AllCompaniesPage() {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
    };

    const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

    
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(`${API_URL}/companies`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        // Handle both direct array response and potential stringified body
        let companiesData = Array.isArray(data) ? data : [];
        
        if (data.body) {
          try {
            companiesData = JSON.parse(data.body);
          } catch (e) {
            console.error('Error parsing response body:', e);
          }
        }
        
        if (!Array.isArray(companiesData)) {
          throw new Error('Expected array of companies but got:', companiesData);
        }

        setCompanies(companiesData);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [API_URL]);

  if (loading) {
    return <div className="loading">Loading company data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
      <div className="companies-overview">
          <div className='review-header-bar'>
        <Link to="/" className="back-button">← Back to Home</Link>
          <Link to="/write-review" className="review-button">Write Review</Link>
          </div>
      <h1>Company Reviews</h1>

      <div className="companies-grid">
        {companies.map((company, index) => (
          <div key={index} className="company-card">
                <h2>
                    <span className='company-initials'>{getInitials(company.companyName)}</span>
                    <span className='company-name'>{titleCase(company.companyName)}</span>

                    </h2>
            
            <div className="company-rating">
              <span className="overall-rating" style={{ color: '#f5c518', fontSize: '1.2rem' }}>
                {renderStars(company.averageRatings['Overall Rating'])}
                <span style={{ marginLeft: '6px', color: '#333' }}>
                {company.averageRatings['Overall Rating'].toFixed(1)}
                </span>
                    </span>
                    <span className='review-count'><Users size={15}/> {company.reviewCount} reviews</span>
            </div>
            
            <div className="rating-details">
              <div className="rating-item">
                <span className="rating-category">Management</span>
                <span className="rating-value">
                  {company.averageRatings['Management Quality'].toFixed(1)}
                </span>
              </div>
              <div className="rating-item">
                <span className="rating-category">Work-Life</span>
                <span className="rating-value">
                  {company.averageRatings['Work-Life Balance'].toFixed(1)}
                </span>
              </div>
              <div className="rating-item">
                <span className="rating-category">Career Growth</span>
                <span className="rating-value">
                  {company.averageRatings['Career Growth Opportunities'].toFixed(1)}
                </span>
              </div>
              <div className="rating-item">
                <span className="rating-category">Compensation</span>
                <span className="rating-value">
                  {company.averageRatings['Compensation & Benefits'].toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}