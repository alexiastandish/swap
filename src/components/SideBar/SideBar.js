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
        <div className="sidebar-container">
          {this.state.userError && <ErrorMessage message={this.state.userError} />}
          <div className="desktop-sidebar">
            <img src="http://i66.tinypic.com/2cnw4lw.png" alt="swap-logo" />

            <nav id="main-nav">
              <Link to="/dash">Dash</Link>
              <Link to="/offers">Offers</Link>
              <Link to="/likes">Likes</Link>
              <Link to="/friends">Following</Link>
              <Link to={`/myProfile/${this.props.user.user_id}`}>Profile</Link>
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

          <div className="Navbar__Link Navbar__Link-toggle">
            <Toggle>
              {({ on, toggle }) => (
                <div>
                  {on && (
                    <div className="Navbar_Items">
                      <div className="Sidebar--links">
                        <button
                          onClick={this.sideBarLinkClick}
                          style={{ background: 'none', boxShadow: 'none' }}
                        >
                          <Link to="/dash">
                            <div className="Navbar_Link">Dash</div>
                          </Link>
                        </button>
                        <button
                          onClick={this.sideBarLinkClick}
                          style={{ background: 'none', boxShadow: 'none' }}
                        >
                          <Link to="/offers">
                            <div className="Navbar_Link">Offers</div>
                          </Link>
                        </button>
                        <button
                          onClick={this.sideBarLinkClick}
                          style={{ background: 'none', boxShadow: 'none' }}
                        >
                          <Link to="/likes">
                            <div className="Navbar_Link">Likes</div>
                          </Link>
                        </button>
                        <button
                          onClick={this.sideBarLinkClick}
                          style={{ background: 'none', boxShadow: 'none' }}
                        >
                          <Link to="/friends">
                            <div className="Navbar_Link">Following</div>
                          </Link>
                        </button>
                        <button
                          onClick={this.sideBarLinkClick}
                          style={{ background: 'none', boxShadow: 'none' }}
                        >
                          <Link to={`/myProfile/${this.props.user.user_id}`}>
                            <div className="Navbar_Link">Profile</div>
                          </Link>
                        </button>

                        <div className="modal-buttons-mobile">
                          {/* ADD ITEM MOBILE MODAL SECTION */}
                          <section id="modal-mobile">
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
                          <section id="modal-mobile">
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
                              />
                            )}
                          </section>
                        </div>

                        <div className="mobile-navigation-items">
                          <Link to="/notifications">Notifications</Link>
                          <a href="http://localhost:3001/logout">Logout</a>
                        </div>
                      </div>
                      {/* <i
                        className="fa fa-2x fa-circle toggle-button-mobile"
                        style={{
                          // position: 'absolute',
                          // zIndex: '500',
                          // color: 'white',
                          // margin: '10px',
                          // marginTop: '10px',
                          // top: '0',
                          // left: '0',
                          fontSize: '24px',
                        }}
                        onClick={toggle}
                      /> */}
                    </div>
                  )}

                  <i
                    className="fa fa-2x fa-circle toggle-button-mobile"
                    style={{
                      // position: 'fixed',
                      // zIndex: '-200',
                      // color: 'white',
                      // margin: '10px',
                      fontSize: '24px',
                      zIndex: '999999',
                      // color:
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
