import React, { Component } from 'react'

class AddItem extends Component {
  constructor() {
    super(
      (this.state = {
        isActive: false,
        itemName: '',
        itemDescription: '',
        imageUrls: [''],
      })
    )

    this.toggleModal = this.toggleModal.bind(this)
    this.addToItems = this.addToItems.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div>
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

          <button onClick={this.addToItems}>Submit</button>
        </div>
      </div>
    )
  }
}

export default AddItem
