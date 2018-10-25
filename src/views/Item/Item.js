import React, { Component } from 'react'
import './Item.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getItem } from '../../ducks/itemReducer'
import { getImages } from '../../ducks/imagesReducer'
import Modal from 'react-modal'
import EditImagesModal from './ItemModal/EditImagesModal'
import LikeButton from '../../components/LikeButton/LikeButton'
import AddImageModal from './ItemModal/AddImageModal'

class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedImage: null,
      isEditImagesModalOpen: false,
      isAddImageModalOpen: false,
    }

    this.openEditItemModal = this.openEditItemModal.bind(this)
    this.closeEditItemModal = this.closeEditItemModal.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    Modal.setAppElement('body')
    this.getItemPage()
  }

  closeEditItemModal() {
    this.setState({ isEditImagesModalOpen: false })
  }

  openEditItemModal() {
    this.setState({ isEditImagesModalOpen: true })
  }

  onSubmit() {
    this.setState({ isAddImageModalOpen: false })
    this.getItemPage()
  }

  getItemPage() {
    this.props.getItem &&
      this.props.getItem(this.props.match.params.id).then(response => {
        console.log('response', response)

        response.value.forEach(item => {
          this.props.getImages(item.items_id)
        })
      })
  }

  render() {
    const hasImages =
      this.props.images[this.props.match.params.id] &&
      this.props.images[this.props.match.params.id].length > 0

    const isUsersItem =
      this.props.user &&
      this.props.item[0] &&
      this.props.user.user_id === this.props.item[0].item_userid

    console.log('this.props', this.props)
    console.log('this.state', this.state)
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

            {isUsersItem && (
              <div className="edit-container">
                <section className="edit-item-modal-container">
                  <button onClick={this.openEditItemModal} className="edit-modal-button edit">
                    Edit Item
                  </button>
                  {this.state.isEditImagesModalOpen && (
                    <EditImagesModal
                      item={this.props.item[0]}
                      images={this.props.images[this.props.item[0].items_id]}
                      onRequestClose={this.closeEditItemModal}
                      onSubmit={this.onSubmit}
                      userId={this.props.user.user_id}
                    />
                  )}
                </section>
                <section className="edit-item-modal-container">
                  <button
                    onClick={() => {
                      this.setState({ isAddImageModalOpen: true })
                    }}
                    className="edit-modal-button edit"
                  >
                    AddImage
                  </button>
                  {this.state.isAddImageModalOpen && (
                    <AddImageModal
                      item={this.props.item[0]}
                      images={this.props.images[this.props.item[0].items_id]}
                      closeModal={() => {
                        this.setState({ isAddImageModalOpen: false })
                      }}
                      onSubmit={this.onSubmit}
                      userId={this.props.user.user_id}
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
