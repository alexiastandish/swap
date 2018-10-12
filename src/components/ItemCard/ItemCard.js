import React, { Component } from 'react'

class ItemCard extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render(props) {
    console.log('this.props', this.props.item, this.props.images)
    return <div className="item-card-container" />
  }
}

export default ItemCard
