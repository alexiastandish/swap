import React, { Component } from 'react'
import './Nav.scss'
import { withRouter } from 'react-router-dom'

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
            <button onClick={this.goBack}>back</button>

            <a href="http://localhost:3001/logout">Logout</a>
          </ul>
        </div>
      )
    )
  }
}

export default withRouter(Nav)
