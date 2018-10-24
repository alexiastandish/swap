import React, { Component } from 'react'
import './Item.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getItem } from '../../ducks/itemReducer'
import { getImages } from '../../ducks/imagesReducer'
import Modal from 'react-modal'
import axios from 'axios'
import EditItemModal from './ItemModal/EditItemModal'
import EditImagesModal from './ItemModal/EditImagesModal'
import LikeButton from '../../components/LikeButton/LikeButton'

class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedImage: null,
      isItemModalActive: false,
      isImageModalActive: false,
    }

    this.toggleItemModal = this.toggleItemModal.bind(this)
    this.editItem = this.editItem.bind(this)
    this.toggleImagesModal = this.toggleImagesModal.bind(this)
    this.editImages = this.editImages.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  componentDidMount() {
    Modal.setAppElement('body')
    this.getItemPage()
  }

  getItemPage() {
    this.props.getItem(this.props.match.params.id).then(response => {
      response.value.forEach(item => {
        this.props.getImages(item.items_id)
      })
    })
  }

  toggleItemModal() {
    this.setState({ isItemModalActive: !this.state.isItemModalActive })
  }

  toggleImagesModal() {
    this.setState({ isImageModalActive: !this.state.isImageModalActive })
  }

  editItem(editedItemDetails) {
    axios
      .put(`/api/item/${this.props.item[0].items_id}`, {
        ...editedItemDetails,
        itemId: this.props.item[0].items_id,
      })
      .then(() => {
        this.toggleItemModal()
        this.getItemPage()
        // this.props.history.push(`/item/${this.props.item[0].items_id}`)
      })
  }

  editImages({ imageUrls }) {
    axios
      .put(`/api/images/${this.props.item[0].items_id}`, {
        imageUrls,
        imagesId: this.props.item[0].items_id,
      })
      .then(() => {
        this.toggleItemModal()
        // this.props.history.push(`/item/${this.props.item[0].items_id}`)
      })
  }

  handleItemClick() {
    this.setState(prevState => ({
      isItemModalActive: !prevState.isItemModalActive,
    }))
  }

  handleImagesClick() {
    this.setState(prevState => ({
      isImageModalActive: !prevState.isImageModalActive,
    }))
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    const hasImages =
      this.props.images[this.props.match.params.id] &&
      this.props.images[this.props.match.params.id].length > 0

    const isUsersItem =
      this.props.user &&
      this.props.item[0] &&
      this.props.user.user_id === this.props.item[0].item_userid

    return (
      <div className="item-container">
        <div className="item-section">
          <div className="left-section">
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
          </div>
          <div className="right-section">
            <div className="description-section">
              <h1>{this.props.item[0] && this.props.item[0].item_name}</h1>
              <p>{this.props.item[0] && this.props.item[0].item_description}</p>
            </div>
            <LikeButton item={this.props.item[0]} />
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
                  <section className="edit-item-modal-container">
                    <button onClick={this.toggleImagesModal} className="edit-modal-button">
                      Edit Images
                    </button>
                    {this.state.isImageModalActive && (
                      <EditImagesModal
                        item={this.props.item[0]}
                        images={this.props.images}
                        onRequestCloseImages={this.toggleImagesModal}
                        editImages={this.editImages}
                      />
                    )}
                  </section>

                  <button id="edit-item-button" value="Delete" onClick={() => this.deleteItem}>
                    Remove Item
                  </button>
                </div>
              )}
            </div>
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
