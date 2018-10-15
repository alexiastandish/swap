import React, { Component } from 'react'
import './LikeCard.scss'
import { Link } from 'react-router-dom'

class LikeCard extends Component {
  constructor() {
    super()
  }

  render() {
    // console.log('this.props.images', this.props.images)
    console.log('this.props.item', this.props)
    return (
      <Link to={`/item/${this.props.items_id}`}>
        <div className="like-card-container">
          <div className="like-image-container">
            {this.props.images &&
              this.props.images.map(image => {
                if (image.imageurl_itemid === this.props.item.items_id) {
                  return (
                    <div key={image.image_id}>
                      <img src={image.imageurl} alt="default" />
                    </div>
                  )
                }
              })[0]}
          </div>

          <div className="like-description">
            <h1 className="like-item-link-text">{this.props.item.item_name}</h1>
          </div>
        </div>
      </Link>
    )
  }
}

export default LikeCard
