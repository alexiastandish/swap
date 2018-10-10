import React, { Component } from 'react'
import { getItem } from '../../ducks/itemsReducer'

class ItemCard extends Component {
  openItem(id) {
    this.props.getItem(id)
  }

  render(props) {
    console.log('this.props', this.props)
    return (
      <div className="item-card-container">
        <div className="card-section" onClick={() => this.openItem(this.props.id)}>
          <div style={{ backgroundImage: `url(${this.props.image})` }} className="default-image" />

          <div className="item-card-text">
            <div className="item-title">{this.props.item_name}</div>
            <div className-="item-description">{this.props.item_description}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemCard
