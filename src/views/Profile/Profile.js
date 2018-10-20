import React, { Component } from 'react'
import './Profile.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserItems } from '../../ducks/profileReducer'
import { getImages } from '../../ducks/imagesReducer'
import { getUserInfo } from '../../ducks/getUserInfoReducer'
import ItemCard from '../../components/ItemCard/ItemCard'
import { getFollowingUsers } from '../../ducks/followingReducer'
import axios from 'axios'

class Profile extends Component {
  constructor() {
    super()

    this.followUser = this.followUser.bind(this)
    this.unfollowUser = this.unfollowUser.bind(this)
  }
  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.id).then(response => {
      console.log('response.value', response.value)
      return Object.keys(response.value)
    })
    this.props.getUserItems(this.props.match.params.id).then(response => {
      response.value.forEach(item => {
        this.props.getImages(item.items_id)
      })
    })

    this.props.getFollowingUsers(this.props.user.user_id).then(res => {
      return res.value
    })
  }

  followUser(followDetails) {
    axios
      .post('/api/follow', followDetails)
      .then(() => this.props.getFollowingUsers(this.props.user.user_id))
  }

  unfollowUser() {
    axios
      .delete(`/api/follow/${this.props.userInfoById.user_id}`)
      .then(() => this.props.getFollowingUsers(this.props.user.user_id))
  }

  render() {
    const follows =
      Object.values(this.props.following).findIndex(follow => {
        return follow.user_id === this.props.userInfoById.user_id
      }) !== -1

    return (
      <div className="profile-container">
        <div className="profile-header">
          {follows ? (
            <button
              id="follow-button"
              value="Unfollow"
              onClick={() => this.unfollowUser(this.props.userInfoById.user_id)}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="Follow"
              onClick={() =>
                this.followUser({
                  user_followingid: this.props.userInfoById.user_id,
                  follower_id: this.props.user && this.props.user.user_id,
                })
              }
            >
              Follow
            </button>
          )}
          <h1>{this.props.userInfoById && this.props.userInfoById.username}</h1>
        </div>
        {this.props.items.map(item => {
          return (
            <div className="item-card" key={item.items_id}>
              <ItemCard
                item={item}
                images={this.props.images[item.items_id]}
                user={this.props.user}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    items: state.items,
    images: state.images,
    userInfoById: state.userInfoById,
    following: state.following,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserItems, getImages, getUserInfo, getFollowingUsers }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
