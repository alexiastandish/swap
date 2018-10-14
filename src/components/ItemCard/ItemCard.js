import React, { Component } from 'react'
import './ItemCard.scss'
import { Link } from 'react-router-dom'

class ItemCard extends Component {
  constructor() {
    super()
  }

  render() {
    // console.log('props.item', this.props.item)
    // console.log('this.props', this.props)
    // console.log('this.props.images', this.props.images)
    // console.log('this.props.user.user_name', this.props.user.user_name)

    return (
      <Link to={`/item/${this.props.items_id}`}>
        <div className="item-card-container">
          <div className="item-image">
            {
              this.props.images.map(image => {
                if (image.imageurl_itemid === this.props.item.items_id) {
                  return (
                    <div key={image.image_id}>
                      <img
                        className="item-card-image-container"
                        src={image.imageurl}
                        alt="default"
                      />
                    </div>
                  )
                }
              })[0]
            }
          </div>
          <div className="item-description">
            <h1>
              <span>Item: </span>
              <br />
              {this.props.item.item_name}
            </h1>

            <p>
              <span>Description: </span> {this.props.item.item_description}
            </p>
            <p>
              <span className="timestamp-text">{this.props.item.post_time}</span>
            </p>
          </div>
        </div>
      </Link>
    )
  }
}

export default ItemCard
