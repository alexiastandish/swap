import React, { Component } from 'react'
import Modal from 'react-modal'
import FileInput from 'react-simple-file-input'
import { storage } from '../../firebase'
import axios from 'axios'
import './ProfileImage.scss'

export default class UpdateProfileImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profilePicture: '',
    }
    this.storageRef = storage.ref('/user-images').child('test')

    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageSelect = this.handleImageSelect.bind(this)
    this.updateProfilePicState = this.updateProfilePicState.bind(this)
    this.updateProfilePicture = this.updateProfilePicture.bind(this)
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
          .then(this.updateProfilePicState)
      })
  }

  updateProfilePicState(profPic = '') {
    console.log('hi')
    this.setState({ profilePicture: profPic })
  }

  updateProfilePicture() {
    return axios
      .put(`/api/updateProfileImage/${this.props.userId}`, {
        userId: this.props.userId,
        profilePicture: this.state.profilePicture,
      })
      .then(this.props.closeModal)
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
          <button
            style={{ background: 'none', color: '#2acbdc', fontFamily: 'Montserrat, sans-serif' }}
            onClick={this.props.closeModal}
          >
            <i className="fa fa-2x  fa-times" />
          </button>
          <div className="add-item-container">
            <h1>Edit Profile Picture</h1>
            <FileInput onChange={this.handleImageSelect} style={{ color: '#707070' }} />
            <div className="image-input-container">
              <label>Image:</label>
              <input
                placeholder="Insert Image URL"
                value={this.state.profilePicture}
                onChange={event => this.setState({ profilePicture: event.target.value })}
              />
            </div>
            <br />
            <button onClick={this.updateProfilePicture}>Submit</button>
          </div>
        </div>
      </Modal>
    )
  }
}
