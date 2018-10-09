import React from 'react'
import './App.scss'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="logo">
          <img src="http://i66.tinypic.com/nb6452.png" alt="swap-logo" />
          <Link to="/dash" className="button">
            <span>SIGN IN</span>
          </Link>
          <Link to="/login" className="button">
            <span>SIGN UP</span>
          </Link>
          <Link to="/about" className="button">
            <span>ABOUT</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
