import React, { Component } from 'react'
import Modal from 'react-modal'
import Select from 'react-select'

class AddOffer extends Component {
  constructor() {
    super()

    this.state = {
      theirItemId: null,
      theirId: null,
      yourItemId: null,
      offerStatus: 1,
      selectedOption: null,
    }
  }

  handleSubmit() {
    const { itemName, itemDescription, imageUrls } = this.state
    this.props.addToItems({ itemName, itemDescription, imageUrls })
  }

  handleSelectedUser(selectedOption) {}

  render() {
    const selectFollwingUser = [
      this.props.following.map(followingUser => {
        console.log('followingUser', followingUser)
        return {
          value: followingUser.user_id,
          label: followingUser.username,
        }
      }),
    ]

    const selectedUsersItems = this.props.following.filter(user => {
      if (user.user_id === this.props.items.item_userid) {
        return selectedUsersItems
      }
    })
    console.log('this.props', this.props)
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

          <Select
            name="form-field-name"
            value={this.selectedOption}
            options={selectFollwingUser}
            onChange={this.handleSelectChange}
          />
        </div>
      </Modal>
    )
  }
}

export default AddOffer
