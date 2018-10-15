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
    console.log('this.props.item', this.props.item)
    const hasImages = this.props.images[this.props.match.params.id].length > 0

    return (
      <div className="item-container">
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
            <h1>{this.props.item && this.props.item.item_name}</h1>
            <p>{this.props.item && this.props.item.item_description}</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    item: state.item,
    images: state.images,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getItem, getImages }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)
