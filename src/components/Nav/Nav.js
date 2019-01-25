import React, { Component } from 'react'
import './Nav.scss'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import SearchBar from './SearchBar/SearchBar'
import NavLinks from './NavLinks'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      window.location.pathname !== '/' && (
        <div className="nav-container">
          <div className="nav-container__searchbar">
            <SearchBar />
          </div>
          <NavLinks />
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
