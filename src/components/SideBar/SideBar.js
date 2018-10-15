import React from 'react'
import { Link } from 'react-router-dom'
import './SideBar.scss'
import { connect } from 'react-redux'

function SideBar(props) {
  return (
    window.location.pathname !== '/' && (
      <div className="sidebar-container">
        <div className="sb-section">
          <img src="http://i66.tinypic.com/2cnw4lw.png" alt="swap-logo" />
          <nav>
            <Link to="/dash">Dash</Link>
            <Link to="/offers">Offers</Link>
            <Link to="/likes">Likes</Link>
            <Link to="/friends">Friends</Link>
            <Link to={`/profile/${props.user.user_id}`}>Profile</Link>
          </nav>
        </div>
      </div>
    )
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(SideBar)
