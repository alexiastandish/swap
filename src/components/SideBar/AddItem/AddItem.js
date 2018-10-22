import React, { Component } from 'react'
import Modal from 'react-modal'

class AddItem extends Component {
  constructor() {
    super()

    this.state = {
      itemName: '',
      itemDescription: '',
      imageUrls: [''],
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
  }

  handleSubmit() {
    const { itemName, itemDescription, imageUrls } = this.state
    this.props.addToItems({ itemName, itemDescription, imageUrls })
  }

  fileSelectedHandler(event) {
    console.log('event', event)
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
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
        <button onClick={this.props.onRequestClose}>Close</button>
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
              <div key={url} className="image-input-container">
                <label>Image: {index + 1} </label>
                {/* <input type="file" onChange={}/> */}
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

          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </Modal>
    )
  }
}

export default AddItem
