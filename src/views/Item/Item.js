import React, { Component } from 'react'
import './Item.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getItem } from '../../ducks/itemReducer'
import { getImages } from '../../ducks/imagesReducer'
import Modal from 'react-modal'
import EditItemModal from './ItemModal/EditItemModal'
import LikeButton from '../../components/LikeButton/LikeButton'
import AddImageModal from './ItemModal/AddImageModal'
import axios from 'axios'

class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAddImageModalOpen: false,
      isEditItemModalOpen: false,
      selectedImage: null,
    }
    this.deleteItem = this.deleteItem.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
    // this.imageArrayToObj = this.imageArrayToObj.bind(this)
  }

  componentDidMount() {
    this.getItemPage()
    Modal.setAppElement('body')
  }

  onSubmit() {
    this.setState({ isAddImageModalOpen: false, isEditItemModalOpen: false })
    this.getItemPage()
  }

  getItemPage() {
    this.props.getItem &&
      this.props.getItem(this.props.match.params.id).then(async response => {
        await response.value.forEach(item => {
          this.props.getImages(item.items_id)
        })
      })
  }

  deleteItem() {
    axios.put(`/api/deleteItem/${this.props.item[0].items_id}`, {}).then(() => {
      this.props.history.push(`/myProfile/${this.props.user.user_id}`)
    })
  }

  deleteImage(id) {
    axios.delete(`/api/deleteImage/${id}`).then(() => {
      this.getItemPage()
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
                  console.log('image', image)
                  return (
                    <div key={image.image_id}>
                      <i
                        className="fa fa-2x fa-times-circle"
                        style={{
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          position: 'absolute',
                          marginLeft: '4px',
                          marginTop: '4px',
                          color: '#2acbdc',
                        }}
                        onClick={() => this.deleteImage(image.image_id)}
                      />
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
                  <button
                    onClick={() => {
                      this.setState({ isEditItemModalOpen: true })
                    }}
                    className="edit-modal-button edit"
                  >
                    Edit Item
                  </button>
                  {this.state.isEditItemModalOpen && (
                    <EditItemModal
                      item={this.props.item[0]}
                      images={this.props.images[this.props.item[0].items_id]}
                      closeModal={() => {
                        this.setState({ isEditItemModalOpen: true })
                      }}
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

                <button id="edit-item-button" value="Delete" onClick={this.deleteItem}>
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
