import React, { Component } from 'react'
import './Nav.scss'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import SearchBar from './SearchBar/SearchBar'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      window.location.pathname !== '/' && (
        <div className="nav-container">
          <div className="search-containter">
            <SearchBar />
          </div>
          <div className="menu-nav">
            <Link to="/notifications">Notifications</Link>
            <a href={`${process.env.REACT_APP_URL}/logout`}>Logout</a>
          </div>
        </div>
      )
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(withRouter(Nav))
