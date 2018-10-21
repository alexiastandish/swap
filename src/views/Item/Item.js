import React, { Component } from 'react'
import './Item.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getItem } from '../../ducks/itemReducer'
import { getImages } from '../../ducks/imagesReducer'
import Modal from 'react-modal'
import axios from 'axios'
import EditItemModal from './ItemModal/EditItemModal'
// import EditImagesModal from './ItemModal/EditImagesModal'

class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedImage: null,
      isItemModalActive: false,
      // isItemModalToggleOn: true,
      // isImageModalActive: false,
      // isImageModalToggleOn: true,
    }

    this.toggleItemModal = this.toggleItemModal.bind(this)
    this.editItem = this.editItem.bind(this)
    // this.toggleImagesModal = this.toggleImagesModal.bind(this)
    // this.editImages = this.editImages.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  componentDidMount() {
    Modal.setAppElement('body')
    this.props.getItem(this.props.match.params.id).then(response => {
      response.value.forEach(item => {
        this.props.getImages(item.items_id)
      })
    })
  }

  toggleItemModal() {
    this.setState({ isItemModalActive: !this.state.isItemModalActive })
  }

  // toggleImagesModal() {
  //   this.setState({ isImageModalActive: !this.state.isImageModalActive })
  // }

  editItem(editedItemDetails) {
    axios
      .put(`/api/item/${this.props.item[0].items_id}`, {
        ...editedItemDetails,
        itemId: this.props.item[0].items_id,
      })
      .then(() => {
        this.toggleItemModal()
        this.props.history.push(`/item/${this.props.item[0].items_id}`)
      })
  }

  // editImages() {
  //   axios
  //     .put(`/api/images/${this.props.images && this.props.images[0].items_id}`)
  //     .then(response => {
  //       console.log('response', response)
  //     })
  // }

  handleItemClick() {
    this.setState(prevState => ({
      isItemModalActive: !prevState.isItemModalActive,
    }))
  }

  // handleImagesClick() {
  //   this.setState(prevState => ({
  //     isImageModalToggleOn: !prevState.isImageModalToggleOn,
  //   }))
  // }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    console.log('this.state', this.state)

    const hasImages =
      this.props.images[this.props.match.params.id] &&
      this.props.images[this.props.match.params.id].length > 0

    const isUsersItem =
      this.props.user &&
      this.props.item[0] &&
      this.props.user.user_id === this.props.item[0].item_userid

    // console.log('this.props.user.user_id', this.props.user.user_id)
    // console.log('this.props.item.item_userid', this.props.item[0] && this.props.item[0].item_userid)
    // console.log('isUsersItem', isUsersItem)

    return (
      <div className="item-container">
        <div className="edit-container">
          {isUsersItem && (
            <div>
              {/* EDIT ITEM MODAL */}
              <section className="edit-item-modal-container">
                <button onClick={this.toggleItemModal} className="edit-modal-button">
                  Edit Item
                </button>
                <EditItemModal
                  item={this.props.item}
                  isItemOpen={this.state.isItemModalActive}
                  onRequestCloseItem={this.toggleItemModal}
                  editItem={this.editItem}
                />
              </section>
              {/* EDIT IMAGES MODAL */}
              {/* <section className="edit-images-modal-container">
                <button onClick={this.toggleImagesModal} className="modal-button">
                  Edit Images
                </button>
                <EditImagesModal
                  isImagesOpen={this.state.isImageModalActive}
                  onRequestCloseImages={this.toggleImagesModal}
                  editImages={this.editImages}
                />
              </section> */}

              <button id="edit-item-button" value="Delete" onClick={() => this.deleteItem}>
                Delete Item
              </button>
            </div>
          )}
        </div>
        <div className="item-section">
          <div className="selected-image">
            <img
              className="selectedImage"
              alt="selector-item"
              src={
                hasImages
                  ? this.state.selectedImage
                    ? this.state.selectedImage.imageurl
                    : this.props.images[this.props.match.params.id][0].imageurl
                  : ''
              }
            />
          </div>

          <ul className="multi-image-container">
            {hasImages &&
              this.props.images[this.props.match.params.id].map(image => {
                return (
                  <div key={image.image_id}>
                    <img
                      className="thumbnail"
                      alt="thumbnail-item"
                      src={image.imageurl}
                      onClick={() => this.setState({ selectedImage: image })}
                    />
                  </div>
                )
              })}
          </ul>
          <div className="description-section">
            <h1>{this.props.item[0] && this.props.item[0].item_name}</h1>
            <p>{this.props.item[0] && this.props.item[0].item_description}</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    item: state.item,
    images: state.images,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getImages, getItem }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)
