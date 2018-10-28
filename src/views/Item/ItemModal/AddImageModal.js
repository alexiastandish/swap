import React, { Component } from 'react'
import Modal from 'react-modal'
import FileInput from 'react-simple-file-input'
import { storage } from '../../../firebase'
import axios from 'axios'
import './ItemModal.scss'

export default class AddImageModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    const { imageUrls } = this.state
    this.addImage({ imageUrls }).then(this.props.onSubmit)
  }

  addImage(itemDetails) {
    return axios.put(`/api/addImage/${this.props.item.items_id}`, {
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
            width: '30vw',
            height: '50vh',
            margin: '0 auto',
            top: '22vh',
            backgroundColor: '#ffffff',
          },
        }}
      >
        <div className="modal-style">
          <button style={{ background: 'none', color: '#2acbdc' }} onClick={this.props.closeModal}>
            <i className="fa fa-2x  fa-times" />
          </button>
          <div className="add-item-container">
            <h1>Add Image</h1>
            <FileInput onChange={this.handleImageSelect} />
            {this.state.imageUrls.map((url, index) => {
              return (
                <div key={index} className="image-input-container">
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
            <button
              onClick={e => {
                this.addImageUrl(e.target.value)
              }}
            >
              Add Image
            </button>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>
      </Modal>
    )
  }
}
