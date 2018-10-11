import React, { Component } from 'react'
import './App.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserById } from './ducks/userReducer'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(id) {
    this.props.getUserById(id)
  }
  render() {
    console.log('props', this.props.user)
    return (
      <div className="landing-page">
        <div className="landing-container">
          <img src="http://i66.tinypic.com/nb6452.png" alt="swap-logo" />
          <a href={process.env.REACT_APP_LOGIN}>
            <button>SIGN IN</button>
          </a>
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

const mapStateToProps = state => ({ ...state.user })

export default connect(
  mapStateToProps,
  { getUserById }
)(Home)
