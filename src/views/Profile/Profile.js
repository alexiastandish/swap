import React, { Component } from 'react'
import './Profile.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserItems } from '../../ducks/profileReducer'
import { getImages } from '../../ducks/imagesReducer'
import { getUserInfo } from '../../ducks/getUserInfoReducer'
import ItemCard from '../../components/ItemCard/ItemCard'
import { getFollowingUsers } from '../../ducks/followingReducer'
import ProfileImage from '../../components/SideBar/ProfileImage'
import axios from 'axios'

class Profile extends Component {
  constructor() {
    super()

    this.state = {
      isUpdateProfileImageModalOpen: false,
      isUpdateProfileImageToggleOn: true,
      profilePhoto: null,
    }

    this.followUser = this.followUser.bind(this)
    this.unfollowUser = this.unfollowUser.bind(this)
    this.toggleProfilePicModal = this.toggleProfilePicModal.bind(this)
    this.handleProfilePicClick = this.handleProfilePicClick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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

  onSubmit() {
    this.setState({
      isUpdateProfileImageModalOpen: false,
    })
    this.getItemPage()
  }

  toggleProfilePicModal() {
    this.setState({ isUpdateProfileImageModalOpen: !this.state.isUpdateProfileImageModalOpen })
  }

  handleProfilePicClick() {
    console.log('handleOfferClick')
    this.setState(prevState => ({
      isOfferToggleOn: !prevState.isOfferToggleOn,
    }))
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

    console.log('this.props', this.props)

    const isUser = this.props.user.user_id === Number(this.props.match.params.id)

    return (
      <div className="profile-container">
        <div className="profile-header">
          <div className="left">
            <div className="profile-photo">
              <img src={this.props.userInfoById.user_photo} />
            </div>
            <h1>{this.props.userInfoById && this.props.userInfoById.username}</h1>
          </div>
          <div className="right">
            {follows ? (
              <button
                id="follow-button"
                value="Unfollow"
                onClick={() => this.unfollowUser(this.props.userInfoById.user_id)}
              >
                <div className="fa fa-3x fa-times-circle" style={{ color: '#2acbdc' }} />
              </button>
            ) : (
              <button
                id="follow-button"
                className="Follow"
                onClick={() =>
                  this.followUser({
                    user_followingid: this.props.userInfoById.user_id,
                    follower_id: this.props.user && this.props.user.user_id,
                  })
                }
              >
                <div className="fa fa-3x fa-plus-circle" style={{ color: '#2acbdc' }} />
              </button>
            )}
          </div>

          <div className="editProfilePicButton">
            {isUser && (
              <div className="profile-image" style={{ display: 'flex', justifyContent: 'center' }}>
                <section className="edit-item-modal-container">
                  <button
                    style={{
                      color: 'white',
                      background: '#2acbdc',
                      width: '100px',
                      borderRadius: '25px',
                      height: '25px',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: '400',
                    }}
                    className="profile-pic-button"
                    onClick={() => {
                      this.setState({ isUpdateProfileImageModalOpen: true })
                    }}
                    className="edit-modal-button edit"
                  >
                    Edit Profile Pic
                  </button>
                  {this.state.isUpdateProfileImageModalOpen && (
                    <ProfileImage
                      closeModal={() => {
                        this.setState({ isUpdateProfileImageModalOpen: false })
                      }}
                      profilePicture={this.props.user.user_photo}
                      onSubmit={this.onSubmit}
                      userId={this.props.user.user_id}
                    />
                  )}
                </section>
              </div>
            )}
          </div>
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
