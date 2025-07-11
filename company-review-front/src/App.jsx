import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage'
import WriteReviewPage from './pages/WriteReviewPage';
import CompanyReviewsPage from './pages/CompanyReviewsPage';
import Reviews from './pages/Reviews';
import AllCompaniesPage from './pages/AllCompaniesPage';
import OAuthCallbackHandler from './OAuthCallbackHandler';
import RequireAuth from './RequireAuth';



function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<OAuthCallbackHandler />} />
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/write-review" element={<RequireAuth><WriteReviewPage /></RequireAuth>} />
            <Route path="/reviews" element={<RequireAuth><Reviews /></RequireAuth>} />
            <Route path="/companies/:companyName/reviews" element={<RequireAuth><CompanyReviewsPage /></RequireAuth>}/>
            <Route path="/companies" element={<RequireAuth><AllCompaniesPage /></RequireAuth>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
