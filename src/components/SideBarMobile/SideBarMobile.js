import React, { Component, Fragment } from 'react'
import Toggle from '../Toggle/Toggle'
import { Link, withRouter } from 'react-router-dom'
import AddOffer from '../SideBar/AddOffer/AddOffer'
import AddItem from '../SideBar/AddItem/AddItem'
import axios from 'axios'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserItems } from '../../ducks/profileReducer'
import NavLinks from '../Nav/NavLinks'

class SideBarMobile extends Component {
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
      <div className="Navbar__Link Navbar__Link-toggle">
        <Toggle>
          {({ on, toggle }) => (
            <div>
              {on && (
                <div className="Navbar_Items">
                  <div className="Sidebar--links">
                    <button
                      onClick={this.sideBarLinkClick}
                      style={{
                        background: 'none',
                        boxShadow: 'none',
                        margin: '0 auto',
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Link to="/dash">
                        <div className="Navbar_Link">Dash</div>
                      </Link>
                    </button>
                    <button
                      onClick={this.sideBarLinkClick}
                      style={{
                        background: 'none',
                        boxShadow: 'none',
                        margin: '0 auto',
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Link to="/offers">
                        <div className="Navbar_Link">Offers</div>
                      </Link>
                    </button>
                    <button
                      onClick={this.sideBarLinkClick}
                      style={{
                        background: 'none',
                        boxShadow: 'none',
                        margin: '0 auto',
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Link to="/likes">
                        <div className="Navbar_Link">Likes</div>
                      </Link>
                    </button>
                    <button
                      onClick={this.sideBarLinkClick}
                      style={{
                        background: 'none',
                        boxShadow: 'none',
                        margin: '0 auto',
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Link to="/friends">
                        <div className="Navbar_Link">Following</div>
                      </Link>
                    </button>
                    <button
                      onClick={this.sideBarLinkClick}
                      style={{
                        background: 'none',
                        boxShadow: 'none',
                        margin: '0 auto',
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
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
                          <AddOffer user={this.props.user} onRequestClose={this.toggleOfferModal} />
                        )}
                      </section>
                    </div>

                    <NavLinks />
                  </div>
                </div>
              )}

              <i
                className="fa fa-2x fa-circle toggle-button-mobile"
                style={{
                  position: 'fixed',
                  zIndex: '-200',
                  color: 'white',
                  margin: '10px',
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
)(withRouter(SideBarMobile))
