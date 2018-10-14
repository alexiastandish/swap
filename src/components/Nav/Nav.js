import React, { Component } from 'react'
import './Nav.scss'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
    }
  }

  render() {
    return (
      window.location.pathname !== '/' && (
        <div className="nav-container">
          <div className="search-containter">
            <div className="search-bar">
              <input
                type="text"
                name="textarea"
                id="textarea"
                placeholder="search users..."
                className="input-text"
                onChange={event => {
                  return this.setState({ user: event.target.value })
                }}
              />
            </div>
          </div>
          <ul className="menu">
            <li>back</li>
            <li>signout</li>
          </ul>
        </div>
      )
    )
  }
}

export default Nav
