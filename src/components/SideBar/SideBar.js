import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './SideBar.scss'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import axios from 'axios'
import AddItem from './AddItem/AddItem'

class SideBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isActive: false,
      isToggleOn: true,
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.addToItems = this.addToItems.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  toggleModal() {
    this.setState({ isActive: !this.state.isActive })
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
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }))
  }

  render() {
    return (
      window.location.pathname !== '/' && (
        <div className="sidebar-container">
          <div className="sb-section">
            <img src="http://i66.tinypic.com/2cnw4lw.png" alt="swap-logo" />
            <nav id="main-nav">
              <Link to="/dash">Dash</Link>
              <Link to="/offers">Offers</Link>
              <Link to="/likes">Likes</Link>
              <Link to="/friends">Friends</Link>
              <Link to={`/myProfile/${this.props.user.user_id}`}>Profile</Link>
            </nav>

            <div className="mobile-menu">
              <div className="Navbar__Link Navbar__Link-toggle">
                <button onClick={this.handleClick}>
                  {this.state.isToggleOn ? (
                    'on'
                  ) : (
                    <div className="Navbar_Items">
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
                  )}
                </button>
              </div>
            </div>

            <section className="modal-container">
              <button onClick={this.toggleModal} className="modal-button">
                Add Item
              </button>
              <AddItem
                isOpen={this.state.isActive}
                onRequestClose={this.toggleModal}
                addToItems={this.addToItems}
              />
            </section>
          </div>
        </div>
      )
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(withRouter(SideBar))
