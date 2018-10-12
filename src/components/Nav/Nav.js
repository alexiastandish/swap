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
    const { user } = this.state

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
        <ul className="menu">
          <li>back</li>
          <li>signout</li>
        </ul>
      </div>
    )
  }
}

export default Nav

{
  /* <li>
{!this.props.isAuthed ? (
  <div>Not Logged In</div>
) : (
  <div>{JSON.stringify(this.props.user)}</div>
)}
</li> */
}
