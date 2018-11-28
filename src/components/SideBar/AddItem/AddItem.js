import React, { Component } from 'react'
import Modal from 'react-modal'
import FileInput from 'react-simple-file-input'
import { storage } from '../../../firebase'
import './AddItem.scss'

class AddItem extends Component {
  constructor() {
    super()

    this.state = {
      itemName: '',
      itemDescription: '',
      imageUrls: [],
    }

    this.storageRef = storage.ref('/user-images').child('test')

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageSelect = this.handleImageSelect.bind(this)
    this.addImageUrl = this.addImageUrl.bind(this)
    this.removeImageUrl = this.removeImageUrl.bind(this)
  }

  handleImageSelect(file) {
    this.storageRef
      .child(file.name)
      .put(file, { contentType: file.type })
      .then(snapshot => {
        console.log('snapshot', snapshot)
        this.storageRef
          .child(snapshot.metadata.name)
          .getDownloadURL()
          .then(this.addImageUrl)
      })
  }

  addImageUrl(url = '') {
    const { imageUrls } = this.state
    if (imageUrls[imageUrls.length - 1] === '') {
      const nextImageUrls = [...this.state.imageUrls]
      nextImageUrls[nextImageUrls.length - 1] = url
      this.setState({ imageUrls: nextImageUrls })
    } else {
      this.setState({ imageUrls: [...this.state.imageUrls, url] })
    }
  }

  removeImageUrl(index) {
    const nextImageUrls = [...this.state.imageUrls]
    nextImageUrls.splice(index, 1)
    this.setState({ imageUrls: nextImageUrls })
  }

  handleSubmit() {
    if (this.props.user.user_id === 79) {
      return this.props.handleAnonymousUser()
    } else {
      const { itemName, itemDescription, imageUrls } = this.state
      this.props.addToItems({ itemName, itemDescription, imageUrls })
    }
  }

  render() {
    return (
      <div className="modal-style">
        <Modal
          isOpen
          onRequestClose={this.props.onRequestClose}
          style={{
            overlay: {
              backgroundColor: 'rgba(253, 253, 253, 0.8)',
              zIndex: 80000,
            },
            content: {
              width: '65vw',
              height: '40vh',
              margin: '0 auto',
              top: '22vh',
              backgroundColor: '#ffffff',
              disply: 'flex',
            },
          }}
        >
          <i
            style={{ background: 'none', color: '#2acbdc' }}
            onClick={this.props.onRequestClose}
            className="fa fa-2x  fa-times"
          />
          <div className="add-item-container">
            <h1>Add Item</h1>
            <label>Item Name: </label>
            <input
              className="input-modal"
              value={this.state.itemName}
              onChange={event => this.setState({ itemName: event.target.value })}
            />
            {'  '}
            <label>Item Description: </label>
            <input
              className="input-modal"
              value={this.state.itemDescription}
              onChange={event => this.setState({ itemDescription: event.target.value })}
            />
            {'   '}
            <FileInput
              className="firebase-input"
              onChange={this.handleImageSelect}
              // style={{
              //   input: {
              //     color: 'red',
              //   },
              // }}
            />
            {'   '}
            {this.state.imageUrls.map((url, index) => {
              return (
                <div key={index} className="image-input-container">
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
                  <button
                    onClick={() => {
                      this.removeImageUrl(index)
                    }}
                  >
                    X
                  </button>
                </div>
              )
            })}
            <br />

            <br />
            <button
              onClick={e => {
                this.addImageUrl(e.target.value)
              }}
            >
              Add Image
            </button>
            {'   '}
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default AddItem
