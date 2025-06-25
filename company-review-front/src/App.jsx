import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import SubmitReview from './pages/SubmitReview';
import CompanyReviews from './pages/CompanyReviews';


function App() {

  return (
    <Router>
      <div className='app-container'>
        <Navbar />
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<SubmitReview />} />
            <Route path="/submit-review" element={<SubmitReview />} />
            <Route path="/company-reviews" element={<CompanyReviews />} />
          </Routes>
        </main>
        {/*Footer can go here*/}
      </div>
    </Router>
  )
}

export default App
