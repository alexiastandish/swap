import React, { Component } from 'react'
import Modal from 'react-modal'

class EditItemModal extends Component {
  constructor() {
    super()

    this.state = {
      itemName: '',
      itemDescription: '',
    }

    this.handleSubmitItem = this.handleSubmitItem.bind(this)
  }
  handleSubmitItem() {
    const { itemName, itemDescription } = this.state
    this.props.editItem({ itemName, itemDescription })
  }

  render() {
    console.log('this.state', this.state)
    return (
      <Modal
        isOpen={this.props.isItemOpen}
        onRequestClose={this.props.onRequestCloseItem}
        style={{
          overlay: {
            backgroundColor: 'rgba(253, 253, 253, 0.8)',
            width: '100%',
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
        <button onClick={this.props.onRequestCloseItem}>Close</button>
        <div className="add-item-container">
          <h1>Edit Item</h1>
          <label>Item Name: </label>
          <input
            value={this.state.itemName}
            placeholder={this.props.item[0] && this.props.item[0].item_name}
            onChange={event => this.setState({ itemName: event.target.value })}
          />
          <label>Item Description: </label>
          <input
            value={this.state.itemDescription}
            placeholder={this.props.item[0] && this.props.item[0].item_description}
            onChange={event => this.setState({ itemDescription: event.target.value })}
          />

          <button onClick={this.handleSubmitItem}>Submit</button>
        </div>
      </Modal>
    )
  }
}

export default EditItemModal
