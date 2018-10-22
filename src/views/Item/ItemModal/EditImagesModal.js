import React, { Component } from 'react'
import Modal from 'react-modal'

class EditImagesModal extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      imageUrls: [...props.images[props.item.items_id].map(image => image.imageurl)],
    }

    this.handleSubmitImages = this.handleSubmitImages.bind(this)
  }

  handleSubmitImages() {
    const { imageUrls } = this.state
    this.props.editImages({ imageUrls })
  }

  render() {
    console.log('this.props', this.props)
    console.log('this.state', this.state)
    console.log(' Object.keys(this.props.images)', Object.keys(this.props.images))
    return (
      <Modal
        isOpen
        onRequestClose={this.props.onRequestCloseImages}
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
        <div className="add-item-container">
          <button onClick={this.props.onRequestCloseImages}>Close</button>
          {this.state.imageUrls.map((url, index) => {
            console.log('url', url)
            return (
              <div key={index} className="image-input-container">
                <label>Image: {index + 1} </label>
                <input
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

          <button onClick={this.handleSubmitImages}>Submit</button>
        </div>
      </Modal>
    )
  }
}

export default EditImagesModal
