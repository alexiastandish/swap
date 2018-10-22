import React, { Component } from 'react'
import './Nav.scss'
import { withRouter } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
    }
    this.goBack = this.goBack.bind(this)
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      window.location.pathname !== '/' && (
        <div className="nav-container">
          <div className="search-containter">
            <SearchBar />
          </div>
          <ul className="menu">
            <button onClick={this.goBack}>back</button>

            <a href="http://localhost:3001/logout">Logout</a>
          </ul>
        </div>
      )
    )
  }
}

export default withRouter(Nav)
