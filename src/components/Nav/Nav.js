import React, { Component } from 'react'
import './Nav.scss'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import SearchBar from './SearchBar/SearchBar'
import NavLinks from './NavLinks'
import Media from 'react-media'
class Nav extends Component {
  render() {
    return (
      window.location.pathname !== '/' && (
        <div className="nav-container">
          <div className="nav-container__searchbar">
            <SearchBar />
          </div>
          <Media query={{ minWidth: 487 }}>
            <NavLinks />
          </Media>
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
