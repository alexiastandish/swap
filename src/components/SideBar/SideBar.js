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
import Toggle from '../Toggle/Toggle'

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
              <Link to="/friends">Following</Link>
              <Link to={`/myProfile/${this.props.user.user_id}`}>Profile</Link>
            </nav>
          </div>
          <div className="Navbar__Link Navbar__Link-toggle">
            <Toggle>
              {({ on, toggle }) => (
                <div>
                  {on && (
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
                          <div className="Navbar_Link">Following</div>
                        </Link>
                        <Link to={`/myProfile/${this.props.user.user_id}`}>
                          <div className="Navbar_Link">Profile</div>
                        </Link>
                      </div>
                      {/* ADD ITEM MOBILE MODAL SECTION */}
                      <section className="mobile-modal-container" id="modal-mobile">
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
                      {/* ADD OFFER MOBILE MODAL SECTION */}
                      <section className="mobile-modal-container" id="modal-mobile">
                        <button
                          onClick={this.toggleOfferModal}
                          className="add-offer-button"
                          style={{ margin: '0 auto' }}
                        >
                          Add Offer
                        </button>
                        {this.state.isOfferModalOpen && (
                          <AddOffer user={this.props.user} onRequestClose={this.toggleOfferModal} />
                        )}
                      </section>
                      <i
                        className="fa fa-2x fa-circle"
                        style={{
                          position: 'absolute',
                          zIndex: '500',
                          color: 'white',
                          width: '50px',
                          margin: '10px',
                          marginTop: '10px',
                          height: '50px',
                          top: '0',
                          left: '0',
                        }}
                        onClick={toggle}
                      />
                    </div>
                  )}

                  <i
                    className="fa fa-2x fa-circle"
                    style={{
                      position: 'fixed',
                      zIndex: '-200',
                      color: '#2acbdc',
                      width: '50px',
                      margin: '10px',
                      // marginTop: '60px',
                      height: '50px',
                    }}
                    onClick={toggle}
                  />
                </div>
              )}
            </Toggle>
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
