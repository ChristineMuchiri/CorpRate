import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import SubmitReview from './pages/SubmitReview';


function App() {

  return (
    <Router>
      <div className='app-container'>
        <Navbar />
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<SubmitReview />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  )
}

export default App
