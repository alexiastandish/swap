import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './SideBar.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserItems } from '../../ducks/profileReducer'
import Modal from 'react-modal'
import AddItem from './AddItem/AddItem'
import AddOffer from './AddOffer/AddOffer'
import axios from 'axios'

class SideBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAddItemModalOpen: false,
      isOfferModalOpen: false,
      isItemToggleOn: true,
      isOfferToggleOn: true,
    }

    this.toggleAddItemModal = this.toggleAddItemModal.bind(this)
    this.toggleOfferModal = this.toggleOfferModal.bind(this)
    this.addToItems = this.addToItems.bind(this)
    this.handleOfferClick = this.handleOfferClick.bind(this)
    this.handleAddItemClick = this.handleAddItemClick.bind(this)
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  toggleAddItemModal() {
    this.setState({ isAddItemModalOpen: !this.state.isAddItemModalOpen })
  }

  toggleOfferModal() {
    this.setState({ isOfferModalOpen: !this.state.isOfferModalOpen })
  }

  addToItems(itemDetails) {
    axios
      .post('/api/addItem', {
        ...itemDetails,
        userId: this.props.user.user_id,
      })
      .then(() => {
        this.toggleAddItemModal()
        this.props.history.push(`/myProfile/${this.props.user.user_id}`)
      })
  }

  handleAddItemClick() {
    this.setState(prevState => ({
      isItemToggleOn: !prevState.isItemToggleOn,
    }))
  }

  handleOfferClick() {
    this.setState(prevState => ({
      isOfferToggleOn: !prevState.isOfferToggleOn,
    }))
  }

  render() {
    console.log('this.props', this.props)
    return (
      window.location.pathname !== '/' && (
        <div className="sidebar-container">
          <div className="desktop-sidebar">
            <img src="http://i66.tinypic.com/2cnw4lw.png" alt="swap-logo" />

            <nav id="main-nav">
              <Link to="/dash">Dash</Link>
              <Link to="/offers">Offers</Link>
              <Link to="/likes">Likes</Link>
              <Link to="/friends">Friends</Link>
              <Link to={`/myProfile/${this.props.user.user_id}`}>Profile</Link>
            </nav>
          </div>
          <div className="Navbar__Link Navbar__Link-toggle">
            <button className="mobile-button" onClick={this.handleAddItemClick}>
              {this.state.isItemToggleOn ? (
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
                    onClick={() => this.setState({ isItemToggleOn: false })}
                  >
                    Close Menu
                  </button>
                </div>
              )}
            </button>
          </div>
          {/* ADD ITEM MODAL SECTION */}
          <section className="modal-container">
            <button onClick={this.toggleAddItemModal} className="add-item-button">
              Add Item
            </button>
            {this.state.isAddItemModalOpen && (
              <AddItem
                isOpen={this.state.isAddItemModalOpen}
                onRequestClose={this.toggleAddItemModal}
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
              <AddOffer user={this.props.user} onRequestClose={this.toggleOfferModal} />
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
  return bindActionCreators({ getUserItems }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SideBar))
