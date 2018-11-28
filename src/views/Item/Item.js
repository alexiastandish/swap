import React, { Component } from 'react'
import './Item.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getItem } from '../../ducks/itemReducer'
import { getImages } from '../../ducks/imagesReducer'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import EditItemModal from './ItemModal/EditItemModal'
import LikeButton from '../../components/LikeButton/LikeButton'
import AddImageModal from './ItemModal/AddImageModal'
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAddImageModalOpen: false,
      isEditItemModalOpen: false,
      selectedImage: null,
      itemUserName: '',
      itemLikes: [],
      userError: '',
    }
    this.deleteItem = this.deleteItem.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
    // this.getItemLikes = this.getItemLikes.bind(this)
    // this.imageArrayToObj = this.imageArrayToObj.bind(this)
  }

  componentDidMount() {
    this.getItemPage()
    Modal.setAppElement('body')
    axios.get(`/api/getItemUser/${this.props.match.params.id}`).then(response => {
      this.setState({ itemUserName: response.data[0].username })
    })
    axios.get(`/api/itemLikes/${this.props.match.params.id}`).then(response => {
      this.setState({ itemLikes: response.data })
    })
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
    if (this.props.item[0].item_userid === 79) {
      return this.handleAnonymousUser()
    } else {
      axios.put(`/api/deleteItem/${this.props.item[0].items_id}`, {}).then(() => {
        this.props.history.push(`/myProfile/${this.props.user.user_id}`)
      })
    }
  }

  deleteImage(id) {
    if (this.props.item[0].item_userid === 79) {
      return this.handleAnonymousUser()
    } else {
      axios.delete(`/api/deleteImage/${id}`).then(() => {
        this.getItemPage()
      })
    }
  }

  getItemUserName() {
    axios.get(`/api/getItemUser/${this.props.item[0].items_id}`).then(response => {
      // console.log('response', response)
      this.setState({ itemUserName: response.data })
    })
  }

  handleAnonymousUser = () => {
    this.setState({
      userError: 'Must have a swap profile to access this functionality',
    })
    setTimeout(
      function() {
        this.setState({
          userError: '',
        })
      }.bind(this),
      3000
    )
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
        {this.state.userError && <ErrorMessage message={this.state.userError} />}
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
                  // console.log('image', image)
                  return (
                    <div key={image.image_id}>
                      {isUsersItem && (
                        <i
                          className="fa fa-2x  fa-times"
                          style={{
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            position: 'absolute',
                            marginLeft: '4px',
                            marginTop: '4px',
                            color: '#2acbdc',
                            fontSize: '20px',
                            fontWeight: 'light',
                            border: 'none',
                          }}
                          onClick={() => this.deleteImage(image.image_id)}
                        />
                      )}

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
            <LikeButton item={this.props.item[0]} />
            <div className="description-section">
              <p style={{ color: '#858585' }}>user: {this.state.itemUserName}</p>
              <h1>{this.props.item[0] && this.props.item[0].item_name}</h1>
              <p>{this.props.item[0] && this.props.item[0].item_description}</p>
            </div>

            <div
              className="likes-section"
              style={{
                color: '#858585',
                fontSize: '12px',
                lineHeight: '16px',
                marginBottom: '20px',
              }}
            >
              <p>users who like this item:</p>
              {this.state.itemLikes.map((userLike, index) => {
                return (
                  <Link
                    key={index}
                    to={`/profile/${userLike.user_id}`}
                    style={{ color: '#424c58', display: 'block', margin: '4px' }}
                  >
                    {' - '}
                    {userLike.username}
                  </Link>
                )
              })}
            </div>

            {isUsersItem && (
              <div className="edit-container">
                <section className="edit-item-modal-container">
                  <button
                    style={{ width: '200px' }}
                    onClick={() => {
                      this.setState({ isEditItemModalOpen: true })
                    }}
                    className="edit-modal-button edit"
                  >
                    Edit Item
                  </button>
                  {this.state.isEditItemModalOpen && (
                    <EditItemModal
                      handleAnonymousUser={this.handleAnonymousUser}
                      item={this.props.item[0]}
                      images={this.props.images[this.props.item[0].items_id]}
                      closeModal={() => {
                        this.setState({ isEditItemModalOpen: false })
                      }}
                      onSubmit={this.onSubmit}
                      userId={this.props.user.user_id}
                    />
                  )}
                </section>
                <section className="edit-item-modal-container">
                  <button
                    style={{ width: '200px' }}
                    onClick={() => {
                      this.setState({ isAddImageModalOpen: true })
                    }}
                    className="edit-modal-button edit"
                  >
                    Add Image
                  </button>
                  {this.state.isAddImageModalOpen && (
                    <AddImageModal
                      handleAnonymousUser={this.handleAnonymousUser}
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

                <button
                  style={{ width: '200px' }}
                  id="edit-item-button"
                  value="Delete"
                  onClick={this.deleteItem}
                >
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
