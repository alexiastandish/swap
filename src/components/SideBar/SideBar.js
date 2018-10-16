import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './SideBar.scss'
import { connect } from 'react-redux'
import Modal from 'react-modal'

class SideBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isActive: false,
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  toggleModal() {
    this.setState({ isActive: !this.state.isActive })
  }

  render(props) {
    return (
      window.location.pathname !== '/' && (
        <div className="sidebar-container">
          <div className="sb-section">
            <img src="http://i66.tinypic.com/2cnw4lw.png" alt="swap-logo" />
            <nav>
              {/* <button id="mobile-nav-button">
                <Link to={}
              </button> */}
              <Link to="/dash">Dash</Link>
              <Link to="/offers">Offers</Link>
              <Link to="/likes">Likes</Link>
              <Link to="/friends">Friends</Link>
              <Link to={`/myProfile/${this.props.user.user_id}`}>Profile</Link>
            </nav>
          </div>
          <section>
            <button onClick={this.toggleModal}>Add Item</button>
            <Modal
              isOpen={this.state.isActive}
              onRequestClose={this.toggleModal}
              style={{
                overlay: {
                  backgroundColor: 'rgba(253, 253, 253, 0.8)',
                },
                content: {
                  width: '40vw',
                  height: '50vh',
                  margin: '0 auto',
                  top: '22vh',
                  backgroundColor: '#ffffff',
                },
              }}
            >
              <button onClick={this.toggleModal}>Close</button>
              <div className="add-item-container">
                <h1>Add Item</h1>
                <input placeholder="Item Name..." />
                <input placeholder="Item Description..." />
                <input placeholder="Image URL" />
                <input placeholder="Image URL" />
                <input placeholder="Image URL" />
                <input placeholder="Image URL" />
                <button>Submit</button>
              </div>
            </Modal>
          </section>
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

export default connect(mapStateToProps)(SideBar)
