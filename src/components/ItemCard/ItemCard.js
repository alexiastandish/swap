import React, { Component } from 'react'

class ItemCard extends Component {
  constructor() {
    super()
  }

  render() {
    console.log('props.item', this.props.item)
    console.log('this.props.image', this.props.image)
    return (
      <div className="item-card-container">
        <p>{this.props.item.item_userid} </p>
        <h1>{this.props.item.item_name}</h1>
        <p>{this.props.item.item_description}</p>
        <p>{this.props.item.post_time}</p>
        <p>{this.props.item.post_date}</p>
      </div>
    )
  }
}

export default ItemCard
