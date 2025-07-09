import React, { useState } from 'react';
import './Reviews.css'
import { Link } from 'react-router-dom';


export default function Reviews() {
  return (
    <>
      <div className='nav-bar'>
      <Link to="/" className='nav-logo'>CorpRate</Link>
      <div className='nav-links'>
        <Link to="/companies">Companies</Link>
        <Link to="/write-review">Write Review</Link>
      </div>
        </div>
   
    <div className="reviews-container">
      <h1 className="reviews-title">Latest Reviews</h1>
      <p className="reviews-intro">
        Read honest employee experiences from companies across different industries
      </p>

      
      </div>
      </>
  );
}