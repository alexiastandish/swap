import React, { Component } from 'react'
import './App.scss'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="landing-page">
        <div className="landing-container">
          <img src="http://i66.tinypic.com/nb6452.png" alt="swap-logo" />
          <a href={process.env.REACT_APP_LOGIN}>SIGN IN</a>
          <Link to="/login" className="button">
            <span>SIGN UP</span>
          </Link>
          <Link to="/about" className="button">
            <span>ABOUT</span>
          </Link>
          <a href={process.env.REACT_APP_LOGOUT}>signout</a>
        </div>
      </div>
    )
  }
}
