import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './SideBar.scss'

class SideBar extends Component {
  render() {
    return (
      window.location.pathname !== '/' && (
        <div className="sidebar-container">
          <div className="sb-section">
            <img src="http://i66.tinypic.com/2cnw4lw.png" alt="swap-logo" />
            <nav>
              <Link to="/dash">Dash</Link>
              <Link to="/offers/:id">Offers</Link>
              <Link to="/likes/:id">Likes</Link>
              <Link to="/friends/:id">Friends</Link>
              <Link to="/profile/:id">Profile</Link>
            </nav>
          </div>
        </div>
      )
    )
  }
}

export default SideBar
