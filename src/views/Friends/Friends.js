import React, { Component } from 'react'
import { getFollowingUsers } from '../../ducks/followingReducer'
import './Friends.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Friends extends Component {
  componentDidMount() {
    this.props.getFollowingUsers(this.props.user.user_id).then(res => {
      console.log('res.value', res.value)
      return res.value
    })
  }

  render() {
    console.log('this.props.following', this.props.following)
    return (
      <div className="following-container">
        {this.props.following &&
          this.props.following.map(friend => {
            return <div className="follow-container" key={friend.user_id} />
          })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    following: state.following,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFollowingUsers }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends)
