import React from 'react'
import './App.scss'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <img src="http://i66.tinypic.com/nb6452.png" alt="swap-logo" />
        <a href={process.env.REACT_APP_LOGIN} className="home-page-link-signin">
          SIGN IN!!!!
        </a>

        <Link to="/about" className="home-page-link" style={{ marginTop: '10px' }}>
          ABOUT
        </Link>
      </div>
    </div>
  )
}
