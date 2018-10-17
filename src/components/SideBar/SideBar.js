import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './SideBar.scss'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import axios from 'axios'

class SideBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isActive: false,
      itemName: '',
      itemDescription: '',
      imageUrls: [''],
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.addToItems = this.addToItems.bind(this)
    this.clearInput = this.clearInput.bind(this)
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  toggleModal() {
    this.setState({ isActive: !this.state.isActive })
  }

  addToItems() {
    axios.post('/api/addItem', {
      itemName: this.state.itemName,
      itemDescription: this.state.itemDescription,
      imageUrls: this.state.imageUrls,
      userId: this.props.user.user_id,
    })
  }

  clearInput() {
    this.setState({
      itemName: '',
      itemDescription: '',
      imageUrls: [''],
    })
  }
  render() {
    console.log('this.state.itemName', this.state.itemName)
    console.log('this.state', this.state)
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
                <label>Item Name: </label>
                <input
                  value={this.state.itemName}
                  onChange={event => this.setState({ itemName: event.target.value })}
                />
                <label>Item Description: </label>
                <input
                  value={this.state.itemDescription}
                  onChange={event => this.setState({ itemDescription: event.target.value })}
                />
                {this.state.imageUrls.map((url, index) => {
                  return (
                    <div className="image-input-container">
                      <label>Image: {index + 1} </label>
                      <input
                        placeholder="Insert Image URL"
                        value={url}
                        onChange={event => {
                          const nextImageUrls = [...this.state.imageUrls]
                          nextImageUrls[index] = event.target.value
                          this.setState({ imageUrls: nextImageUrls })
                        }}
                      />
                    </div>
                  )
                })}
                <button
                  onClick={() => {
                    this.setState({ imageUrls: [...this.state.imageUrls, ''] })
                  }}
                >
                  Add Image
                </button>
                <button onClick={this.addToItems}>Sumbit</button>
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
