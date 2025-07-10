import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage'
import WriteReviewPage from './pages/WriteReviewPage';
import CompanyReviewsPage from './pages/CompanyReviewsPage';
import Reviews from './pages/Reviews';
import AllCompaniesPage from './pages/AllCompaniesPage';
import AuthGuard from './components/AuthGuard.jsx';
import { awsConfig } from './aws-exports';
import { Amplify } from 'aws-amplify';



Amplify.configure(awsConfig);


function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/write-review" element={<AuthGuard><WriteReviewPage /></AuthGuard>} />
            <Route path="/reviews" element={<AuthGuard><Reviews /></AuthGuard>} />
            <Route path="/companies/:companyName/reviews" element={<AuthGuard><CompanyReviewsPage /></AuthGuard>} />
            <Route path="/companies" element={<AuthGuard><AllCompaniesPage /></AuthGuard>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
