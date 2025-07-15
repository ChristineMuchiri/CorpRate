// src/pages/LandingPage.jsx
import {React, useState} from 'react';
import { FiSearch, FiBookOpen, FiEdit } from 'react-icons/fi';
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
           <img src="/logo-app-removebg-preview.png" alt="CorpRate logo" className="logo-image" />
          <span className="logo-text">CorpRate</span>
          </div>
          <div className="nav-links-container">

            <Link to="/companies" className="nav-link">Companies</Link>
            <Link to="/reviews" className="nav-link">Reviews</Link>
            <Link to="/write-review" className="nav-link">Write Review</Link>
          </div>
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
        {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="how-title">How CorpRate Works</h2>
        <div className="steps-container">
          <div className="step">
            <FiSearch className="step-icon" />
            <h4>1. Search</h4>
            <p>Look up companies you're curious about and see what employees are saying.</p>
          </div>
        <div className="step">
          <FiBookOpen className="step-icon" />
          <h4>2. Read</h4>
          <p>Explore anonymous reviews about culture, management, and work-life balance.</p>
        </div>
      <div className="step">
        <FiEdit className="step-icon" />
        <h4>3. Share</h4>
        <p>Write your own honest, anonymous review and help others make informed choices.</p>
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
          <button className="button-review"
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
        
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} CorpRate. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
