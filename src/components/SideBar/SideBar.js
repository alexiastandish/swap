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
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

class SideBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAddItemModalOpen: false,
      isOfferModalOpen: false,
      isItemToggleOn: true,
      isOfferToggleOn: true,
      userError: '',
    }

    this.toggleAddItemModal = this.toggleAddItemModal.bind(this)
    this.toggleOfferModal = this.toggleOfferModal.bind(this)
    this.addToItems = this.addToItems.bind(this)
    this.handleOfferClick = this.handleOfferClick.bind(this)
    this.handleAddItemClick = this.handleAddItemClick.bind(this)
    this.sideBarLinkClick = this.sideBarLinkClick.bind(this)
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

  sideBarLinkClick(selectedPage) {
    window.location.reload(selectedPage)
  }

  handleAnonymousUser = () => {
    this.setState({
      userError: 'Must have a swap profile to access this functionality',
    })
    setTimeout(
      function() {
        this.setState({
          userError: '',
        })
      }.bind(this),
      3000
    )
  }

  render() {
    return (
      window.location.pathname !== '/' && (
        <div className="sidebar column" id="left">
          {this.state.userError && <ErrorMessage message={this.state.userError} />}

          <img
            src="http://i66.tinypic.com/2cnw4lw.png"
            alt="sidebar__logo"
            className="sidebar__logo"
          />

          <nav id="main-nav" className="sidebar__nav">
            <Link to="/dash" className="heading-secondary">
              Dash
            </Link>
            <Link to="/offers" className="heading-secondary">
              Offers
            </Link>
            <Link to="/likes" className="heading-secondary">
              Likes
            </Link>
            <Link to="/friends" className="heading-secondary">
              Following
            </Link>
            <Link to={`/myProfile/${this.props.user.user_id}`} className="heading-secondary">
              Profile
            </Link>
          </nav>

          <div className="modal-buttons">
            {/* ADD ITEM MODAL SECTION */}

            <button onClick={this.toggleAddItemModal} className="add-item-button">
              Add Item
            </button>
            {this.state.isAddItemModalOpen && (
              <AddItem
                handleAnonymousUser={this.handleAnonymousUser}
                isOpen={this.state.isAddItemModalOpen}
                onRequestClose={this.toggleAddItemModal}
                addToItems={this.addToItems}
                user={this.props.user}
              />
            )}

            {/* ADD OFFER MODAL SECTION */}

            <button
              onClick={this.toggleOfferModal}
              className="add-offer-button"
              style={{ margin: '0 auto' }}
            >
              Add Offer
            </button>
            {this.state.isOfferModalOpen && (
              <AddOffer
                user={this.props.user}
                onRequestClose={this.toggleOfferModal}
                handleAnonymousUser={this.handleAnonymousUser}
              />
            )}
          </div>
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
