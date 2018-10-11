import React, { Component } from 'react'
import Nav from '../../components/Nav/Nav'
import './Item.scss'

class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      item: {},
    }
  }
  render() {
    return (
      <div className="item-container">
        <Nav />
        <div className="image-container">
          <img src="http://i65.tinypic.com/wcoh10.jpg" alt="black-leather-backpack" />
        </div>
        <div className="item-section">
          <div className="multi-image-container">
            <img src="http://i65.tinypic.com/wcoh10.jpg" alt="black-leather-backpack" />
            <img
              src="http://www.bagswish.com/2049/leather-backpack-for-women-black-school-backpack.jpg"
              alt="black-leather-backpack"
            />
          </div>
          <div className="description-section">
            <h1>Item Name</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Item
