import React, { Component } from 'react'
import './Nav.scss'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
    }
  }

  render() {
    const { user } = this.state

    console.log('user', user)
    return (
      <div className="nav-container">
        <div className="search-containter">
          <div className="search-bar">
            <input
              placeholder="search users..."
              className="input-text"
              onChange={event => {
                return this.setState({ user: event.target.value })
              }}
            />
          </div>
          <button className="search-button">
            <i className="fa fa-search" />
          </button>
        </div>
        <div className="menu" />

        <div />
      </div>
    )
  }
}

export default Nav
