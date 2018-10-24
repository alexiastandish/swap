import React, { Component } from 'react'
import Modal from 'react-modal'

class AddOffer extends Component {
  constructor() {
    super()

    this.state = {
      theirItemId: null,
      userSelected: null,
      selectedUserItems: [],
      yourItemId: null,
      offerStatus: 1,
    }
    this.getUserItems = this.getUserItems.bind(this)
  }

  getUserItems(event) {
    this.props.items &&
      this.props.items.map(item => {
        if (item.item_userid === Number(this.state.userSelected)) {
          this.setState({ selectedUserItems: event.target.value })
        }
      })
  }

  handleSubmit() {
    const { itemName, itemDescription, imageUrls } = this.state
    this.props.addToItems({ itemName, itemDescription, imageUrls })
  }

  render() {
    const followingUsers = this.props.following
    const optionItems = followingUsers.map(user => (
      <option key={user.user_id} value={user.user_id}>
        {user.username}
      </option>
    ))

    console.log('this.state.selectedUserItems', this.state.selectedUserItems)

    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(253, 253, 253, 0.8)',
            zIndex: 10,
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
        <button onClick={this.props.onRequestClose}>Close</button>
        <div className="add-item-container">
          <h1>Add Offer</h1>
          {/* ADD CURRENT USER, USERNAME, USER ID */}
          <label>Friend you would like to swap with: </label>
          <input
            value={this.state.itemName}
            onChange={event => this.setState({ itemName: event.target.value })}
          />
          <label>Item Description: </label>
          <input
            value={this.state.itemDescription}
            onChange={event => this.setState({ itemDescription: event.target.value })}
          />

          <button onClick={this.handleSubmit}>Submit</button>

          <select
            value={this.state.userSelected}
            onChange={event => this.setState({ userSelected: event.target.value })}
          >
            {optionItems}
          </select>
          <button value={this.state.selectedUserItems} onClick={this.getUserItems} />

          <select />
        </div>
      </Modal>
    )
  }
}

export default AddOffer
