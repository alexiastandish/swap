import React, { Component } from 'react'
import './ItemCard.scss'

class ItemCard extends Component {
  constructor() {
    super()
  }

  render() {
    console.log('props.item', this.props.item)
    console.log('this.props', this.props)
    console.log('this.props.images', this.props.images)
    // console.log('this.props.user.user_name', this.props.user.user_name)

    return (
      <div className="item-card-container">
        <p>{this.props.item.item_userid} </p>
        <h1>{this.props.item.item_name}</h1>
        <div className="item-image">
          {
            this.props.images.map(image => {
              if (image.imageurl_itemid === this.props.item.items_id) {
                return (
                  <div key={image.image_id}>
                    <img className="item-card-image-container" src={image.imageurl} />
                  </div>
                )
              }
            })[0]
          }
        </div>
        <p>{this.props.item.item_description}</p>
        <p>{this.props.item.post_time}</p>
        <p>{this.props.item.post_date}</p>
      </div>
    )
  }
}

export default ItemCard
