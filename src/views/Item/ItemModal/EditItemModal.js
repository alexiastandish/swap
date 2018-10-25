import React, { Component } from 'react'
import Modal from 'react-modal'
import axios from 'axios'

export default class EditItemModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemName: props.item.item_name,
      itemDescription: props.item.item_description,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const { itemName, itemDescription } = this.state
    this.editItem({ itemName, itemDescription }).then(this.props.onSubmit)
  }

  editItem(itemDetails) {
    return axios.put(`/api/editItem/${this.props.item.items_id}`, {
      ...itemDetails,
      userId: this.props.userId,
    })
  }

  render() {
    return (
      <Modal
        isOpen
        onRequestClose={this.props.closeModal}
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
        <button onClick={this.props.closeModal}>Close</button>
        <div className="add-item-container">
          <h1>Edit Item</h1>
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
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </Modal>
    )
  }
}
