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
import Media from 'react-media'

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
    console.log('this.props', this.props)
    const homePageComponent = !this.props.user.isAuthenticated
    return (
      <div className="Navbar__Link Navbar__Link-toggle">
        {!homePageComponent && (
          <Media query={{ maxWidth: 487 }}>
            <Toggle>
              {({ on, toggle }) => (
                <div>
                  {on && (
                    <div className="Navbar_Items">
                      <div className="Sidebar--links">
                        <Link
                          to="/dash"
                          onClick={this.sideBarLinkClick}
                          className="heading-secondary sb-mobile-link"
                        >
                          Dash
                        </Link>
                        <Link
                          to="/offers"
                          onClick={this.sideBarLinkClick}
                          className="heading-secondary sb-mobile-link"
                        >
                          Offers
                        </Link>

                        <Link
                          to="/likes"
                          onClick={this.sideBarLinkClick}
                          className="heading-secondary sb-mobile-link"
                        >
                          Likes
                        </Link>

                        <Link
                          to="/friends"
                          onClick={this.sideBarLinkClick}
                          className="heading-secondary sb-mobile-link"
                        >
                          Following
                        </Link>

                        <Link
                          to={`/myProfile/${this.props.user.user_id}`}
                          onClick={this.sideBarLinkClick}
                          className="heading-secondary sb-mobile-link"
                        >
                          Profile
                        </Link>

                        {/* ADD ITEM MOBILE MODAL SECTION */}
                        <div className="sb-modal-btns-section">
                          <button onClick={this.toggleAddItemModal} className="sb-modal-btn">
                            Add Item
                          </button>
                          {this.state.isAddItemModalOpen && (
                            <AddItem
                              isOpen={this.state.isAddItemModalOpen}
                              onRequestClose={this.toggleAddItemModal}
                              addToItems={this.addToItems}
                            />
                          )}

                          {/* ADD OFFER MOBILE MODAL SECTION */}

                          <button
                            onClick={this.toggleOfferModal}
                            className="sb-modal-btn"
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
                        </div>

                        <NavLinks />
                      </div>
                    </div>
                  )}

                  <i className="fa fa-2x fa-circle toggle-button-mobile" onClick={toggle} />
                </div>
              )}
            </Toggle>
          </Media>
        )}
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
