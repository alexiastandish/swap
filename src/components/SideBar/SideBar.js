import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './SideBar.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFollowingUsers } from '../../ducks/followingReducer'
import { getUserItems } from '../../ducks/profileReducer'
import Modal from 'react-modal'
import axios from 'axios'
import AddItem from './AddItem/AddItem'
import AddOffer from './AddOffer/AddOffer'
import ProfileImage from './ProfileImage'

class SideBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAddItemModalOpen: false,
      isOfferModalOpen: false,
      isUpdateProfileImageModalOpen: false,
      isToggleOn: true,
      isOfferToggleOn: true,
      isUpdateProfileImageToggleOn: true,
      selectedImage: null,
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.toggleOfferModal = this.toggleOfferModal.bind(this)
    this.toggleProfilePicModal = this.toggleProfilePicModal.bind(this)
    this.addToItems = this.addToItems.bind(this)
    this.handleOfferClick = this.handleOfferClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleOfferClick = this.handleOfferClick.bind(this)
    this.goBack = this.goBack.bind(this)
    this.onSubmit = this.onSubmit.bind
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  componentDidMount() {
    this.props.getFollowingUsers(this.props.user.user_id).then(response => {
      response.value.forEach(user => {
        this.props.getUserItems(user.user_id)
      })
    })
    // this.props.getUser
  }

  toggleModal() {
    this.setState({ isAddItemModalOpen: !this.state.isAddItemModalOpen })
  }

  toggleOfferModal() {
    this.setState({ isOfferModalOpen: !this.state.isOfferModalOpen })
  }

  toggleProfilePicModal() {
    this.setState({ isUpdateProfileImageModalOpen: !this.state.isUpdateProfileImageModalOpen })
  }

  addToItems(itemDetails) {
    axios
      .post('/api/addItem', {
        ...itemDetails,
        userId: this.props.user.user_id,
      })
      .then(() => {
        this.toggleModal()
        this.props.history.push(`/myProfile/${this.props.user.user_id}`)
      })
  }

  handleClick() {
    console.log('handleClick')
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }))
  }

  handleOfferClick() {
    console.log('handleOfferClick')
    this.setState(prevState => ({
      isUpdateProfileImageToggleOn: !prevState.isUpdateProfileImageToggleOn,
    }))
  }

  handleProfilePicClick() {
    console.log('handleOfferClick')
    this.setState(prevState => ({
      isOfferToggleOn: !prevState.isOfferToggleOn,
    }))
  }

  onSubmit() {
    this.setState({
      isAddImageModalOpen: false,
      isEditItemModalOpen: false,
      isUpdateProfileImageModalOpen: false,
    })
    this.getItemPage()
  }

  goBack() {
    this.props.history.goBack()
  }

  // profilePhoto(profilePhoto) {
  //   this.props.user.user_photo(profilePhoto)
  // }

  render() {
    console.log('this.props.user.user_photo', this.props.user.user_photo)
    return (
      window.location.pathname !== '/' && (
        <div className="sidebar-container">
          <div className="desktop-sidebar">
            <img src="http://i66.tinypic.com/2cnw4lw.png" alt="swap-logo" />

            <div className="profile-image">
              <img
                src={this.props.user.user_photo}
                style={{
                  width: '40%',
                  marginTop: '10px',
                  justifyContent: 'center',
                  marginBottom: '0px',
                  borderRadius: '50% ',
                }}
              />
              <section className="edit-item-modal-container">
                <button
                  onClick={() => {
                    this.setState({ isUpdateProfileImageModalOpen: true })
                  }}
                  className="edit-modal-button edit"
                >
                  {this.state.isUpdateProfileImageModalOpen && (
                    <ProfileImage
                      closeModal={() => {
                        this.setState({ isUpdateProfileImageModalOpen: false })
                      }}
                      profilePicture={this.props.user.user_photo}
                      onSubmit={this.onSubmit}
                      // profilePhoto={this.profilePhoto}
                      userId={this.props.user.user_id}
                    />
                  )}
                </button>
              </section>
            </div>

            <nav id="main-nav">
              <Link to="/dash">Dash</Link>
              <Link to="/offers">Offers</Link>
              <Link to="/likes">Likes</Link>
              <Link to="/friends">Friends</Link>
              <Link to={`/myProfile/${this.props.user.user_id}`}>Profile</Link>
            </nav>
          </div>
          {/* <div className="mobile-menu"> */}
          <div className="Navbar__Link Navbar__Link-toggle">
            <button className="mobile-button" onClick={this.handleClick}>
              {this.state.isToggleOn ? (
                'on'
              ) : (
                <div className="Navbar_Items">
                  <div className="mobile-nav-section">
                    <Link to="/dash">
                      <div className="Navbar_Link">Dash</div>
                    </Link>
                    <Link to="/offers">
                      <div className="Navbar_Link">Offers</div>
                    </Link>
                    <Link to="/likes">
                      <div className="Navbar_Link">Likes</div>
                    </Link>
                    <Link to="/friends">
                      <div className="Navbar_Link">Friends</div>
                    </Link>
                    <Link to={`/myProfile/${this.props.user.user_id}`}>
                      <div className="Navbar_Link">Profile</div>
                    </Link>
                  </div>

                  <a href="http://localhost:3001/logout">Logout</a>

                  <button
                    className="close-mobile-button"
                    onClick={() => this.setState({ isToggleOn: false })}
                  >
                    Close Menu
                  </button>
                </div>
              )}
            </button>
          </div>
          {/* ADD ITEM MODAL SECTION */}
          <section className="modal-container">
            <button onClick={this.toggleModal} className="add-item-button">
              Add Item
            </button>
            {this.state.isAddItemModalOpen && (
              <AddItem
                isOpen={this.state.isAddItemModalOpen}
                onRequestClose={this.toggleModal}
                addToItems={this.addToItems}
              />
            )}
          </section>

          {/* ADD OFFER MODAL SECTION */}
          <section className="modal-container">
            <button onClick={this.toggleOfferModal} className="add-offer-button">
              Add Offer
            </button>
            {this.state.isOfferModalOpen && (
              <AddOffer
                following={this.props.following}
                items={this.props.items}
                user={this.props.user}
                onRequestClose={this.toggleOfferModal}
                addToItems={this.addToOffers}
              />
            )}
          </section>
        </div>
      )
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    items: state.items,
    following: state.following,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getFollowingUsers, getUserItems }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideBar))
