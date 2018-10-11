import React, { Component } from 'react'
import Nav from '../../components/Nav/Nav'
import './Item.scss'
import { connect } from 'react-redux'
import { getItem, getItemImages } from '../../ducks/itemsReducer'

class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      item: {},
      selectedImage: '',
      imageUrls: [],
      // imageUrls: [
      //   'http://i65.tinypic.com/wcoh10.jpg',
      //   'http://www.bagswish.com/2049/leather-backpack-for-women-black-school-backpack.jpg',
      // ],
    }
  }

  componentDidMount() {
    // this.setState({ selectedImage: 'http://i65.tinypic.com/wcoh10.jpg' })
    this.setState({ selectedImage: 'http://i65.tinypic.com/wcoh10.jpg' })
  }

  render() {
    console.log('selectedImage', this.state.selectedImage)
    console.log('this.state', this.state)
    return (
      <div className="item-container">
        <Nav />
        <div className="item-section">
          <div className="selected-image">
            <img className="selectedImage" src={this.state.selectedImage} />
          </div>

          <ul className="multi-image-container">
            {this.state.imageUrls.map((e, i) => {
              return (
                <div key={this.state.imageUrls[i]}>
                  <img
                    className="thumbnail"
                    src={this.state.imageUrls[i]}
                    onClick={event => this.setState({ selectedImage: event.target.src })}
                  />
                </div>
              )
            })}
          </ul>

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

const mapStateToProps = state => ({ ...state.item, ...state.images })

export default connect(
  mapStateToProps,
  { getItem, getItemImages }
)(Item)
