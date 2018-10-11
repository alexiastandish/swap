import React, { Component } from 'react'
import { getUserById } from '../../ducks/userReducer'
import { connect } from 'react-redux'
import Nav from '../../components/Nav/Nav'

class Dash extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUserById()
  }
  render() {
    console.log('this.props.user', this.props.user)
    console.log('this.props.username', this.props.username)
    return (
      <div className="dash-container">
        <h1>Hello, {this.props.username}</h1>
        <Nav />
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state.user })

export default connect(
  mapStateToProps,
  { getUserById }
)(Dash)
