import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { getUser } from './ducks/userReducer'
import { connect } from 'react-redux'

class User extends Component {
  componentDidMount() {
    this.props.getUser()
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUser }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
