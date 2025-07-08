import React, { useEffect, useState } from 'react';
import './AllCompaniesPage.css'

export default function AllCompaniesPage() {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(`${API_URL}/companies`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
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
      <h1>Company Reviews</h1>

      <div className="companies-grid">
        {companies.map((company, index) => (
          <div key={index} className="company-card">
            <h2>{company.companyName.toUpperCase()}</h2>
            
            <div className="company-rating">
              <span className="overall-rating">
                {company.averageRatings['Overall Rating'].toFixed(1)}
              </span>
              <span className="review-count">
                {company.reviewCount} reviews
              </span>
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