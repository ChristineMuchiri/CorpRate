import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage'
import WriteReviewPage from './pages/WriteReviewPage';
import CompanyReviews from './pages/CompanyReviews';
import Reviews from './pages/Reviews';


function App() {

  return (
    <Router>
      <div className='app-container'>
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/write-review" element={<WriteReviewPage />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/companies" element={<CompanyReviews/>} />
          </Routes>
        </main>
        {/*Footer can go here*/}
      </div>
    </Router>
  )
}

export default App
