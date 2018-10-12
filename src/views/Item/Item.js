import React, { Component } from 'react'
import Nav from '../../components/Nav/Nav'
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
    // this.props.items_id itemId
    this.props.getItem(2)
    this.props.getImages(2)
  }

  render() {
    console.log('this.props', this.props)
    console.log('this.props.images', this.props.images)
    console.log('this.state', this.state)
    const hasImages = this.props.images.length > 0
    return (
      <div className="item-container">
        <Nav />
        <div className="item-section">
          <div className="selected-image">
            <img
              className="selectedImage"
              src={
                hasImages
                  ? this.state.selectedImage
                    ? this.state.selectedImage.imageurl
                    : this.props.images[0].imageurl
                  : ''
              }
            />
          </div>

          <ul className="multi-image-container">
            {this.props.images.map(image => {
              return (
                <div key={image.image_id}>
                  <img
                    className="thumbnail"
                    src={image.imageurl}
                    onClick={() => this.setState({ selectedImage: image })}
                  />
                </div>
              )
            })}
          </ul>
          <div className="description-section">
            <h1>{this.props.item.item_name}</h1>
            <p>{this.props.item.item_description}</p>
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
