import React, { Component } from 'react'
import { getFollowingUsers } from '../../ducks/followingReducer'
import './Friends.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

class Friends extends Component {
  componentDidMount() {
    this.props.getFollowingUsers(this.props.user.user_id).then(res => {
      // console.log('res.value', res.value)
      return res.value
    })
  }

  render() {
    // console.log('this.props.FRIENDS', this.props)
    return (
      <div className="following-container">
        {this.props.following &&
          this.props.following.map(friend => {
            return (
              <Link key={friend.user_id} to={`/profile/${friend.user_id}`}>
                <div className="follow-container" key={friend.user_id}>
                  <img
                    alt="friend"
                    src={friend.user_photo}
                    className="follow-photo"
                    style={{ width: '60px', height: '60px', borderRadius: '60%' }}
                  />

                  <span className="follow-name">{friend.username}</span>
                </div>
              </Link>
            )
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
