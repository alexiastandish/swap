import React, { Component } from 'react'
import './Item.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getItem } from '../../ducks/itemReducer'
import { getImages } from '../../ducks/imagesReducer'

class Item extends Component {
  constructor() {
    super()

    this.state = {
      selectedImage: null,
    }
  }

  componentDidMount() {
    this.props.getItem(this.props.match.params.id).then(response => {
      response.value.forEach(item => {
        this.props.getImages(item.items_id)
      })
    })
  }

  render() {
    console.log('this.props', this.props)
    const hasImages =
      this.props.images[this.props.match.params.id] &&
      this.props.images[this.props.match.params.id].length > 0

    const isUsersItem =
      this.props.user &&
      this.props.item[0] &&
      this.props.user.user_id === this.props.item[0].item_userid

    console.log('this.props.user.user_id', this.props.user.user_id)
    console.log('this.props.item.item_userid', this.props.item[0] && this.props.item[0].item_userid)
    console.log('isUsersItem', isUsersItem)

    return (
      <div className="item-container">
        <div className="edit-container">
          {isUsersItem && console.log('this is current user item')}
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
