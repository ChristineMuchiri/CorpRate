// src/pages/LandingPage.jsx
import {React, useState} from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './LandingPage.css';
import { Link, useNavigate } from 'react-router-dom';

function LandingPage(){
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const cleaned = searchTerm.trim().toLowerCase();
    if (cleaned !== '') {

      navigate(`/companies/${cleaned}/reviews`);
    } else {
      navigate('/landing-page');
    }
  }
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="page-header">
        <div className="header-container">
        <div className="logo-container">
          <span className="logo-text">CorpRate</span>
          </div>
          
            <Link to="/companies" className="nav-link">Companies</Link>
            <Link to="/reviews" className="nav-link">Reviews</Link>
            <Link to="/write-review" className="nav-link">Write Review</Link>
          
        </div>
      </header> 

      {/* Hero Section */} 
      <section className="hero-section">
        <h1>Discover Your Next Dream Job</h1>
        <p className="hero-text">
          Get honest, anonymous insights about company culture, management, and work-life balance from real employees. 
          Make informed career decisions.
        </p>
        
        <div className="search-container">
          <div className="search-area">
          <input 
            type="text" 
            placeholder="Search companies (e.g. Google, Microsoft, Safaricom...)" 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>
          <button className="search-button" onClick={handleSearch}>Explore Companies</button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2>Explore Companies</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>10K+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-item">
            <h3>2.5K+</h3>
            <p>Reviews Posted</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Companies Listed</p>
          </div>
          <div className="stat-item">
            <h3>85%</h3>
            <p>Verified Reviews</p>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}

      <section className="featured-companies">
        <h2>Featured Companies</h2>
        <div className="companies-grid">
          <div className="company-card">
            <h3>TschCorp</h3>
            <div className="company-rating">42</div>
            <p className="review-count">156 reviews</p>
          </div>
          <div className="company-card">
            <h3>StartupXYZ</h3>
            <div className="company-rating">38</div>
            <p className="review-count">89 reviews</p>
          </div>
          <div className="company-card">
            <h3>Meg4Corp</h3>
            <div className="company-rating">35</div>
            <p className="review-count">234 reviews</p>
          </div>
          <div className="company-card">
            <h3>InnovateLab</h3>
            <div className="company-rating">45</div>
            <p className="review-count">67 reviews</p>
          </div>
        </div>
      </section>

      {/* Middle Section - Share Experience */}
      <section className="share-experience">
        <div className="share-content">
          <h2>Share Your Experience</h2>
          <p className="share-description">
            Help others make better career choices by sharing your honest review about your workplace. 
            Your identity remains anonymous, but your insights are invaluable.
          </p>
          <button className="review-button"
                  onClick={() => navigate('/write-review')}>Write a Review</button>
        </div>
      </section>

      
      {/* Footer */}
      <footer className="page-footer">
        <div className='reviews-footer'>
          <span className="footer-text">CorpRate</span>
        </div>
          <p className="footer-description">
            Empowering job seekers with honest, anonymous workplace insights. Building transparency in the job market, one review at a time.</p>  
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} WorkReviews. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
