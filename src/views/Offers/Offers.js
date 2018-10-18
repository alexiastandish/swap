import React, { Component } from 'react'
import './Offers.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getItemFromOffer } from '../../ducks/offerItemReducer'
import { getImages } from '../../ducks/imagesReducer'
// import { getItem } from '../../ducks/itemReducer'
import OfferCard from '../../components/OfferCard/OfferCard'

class Offers extends Component {
  // componentDidMount() {
  //   this.props.getItemFromOffer(this.props.user.user_id).then(response => {
  //     console.log('response.value', response.value)
  //     return response.value
  //   })
  // }

  componentDidMount() {
    this.props.getItemFromOffer(this.props.user.user_id).then(response => {
      console.log('response.value', response.value)
      response.value.forEach(item => {
        this.props.getImages(item.items_id)
      })
    })
  }

  render() {
    console.log('this.props.item', this.props.item)
    return (
      <div className="offers-container">
        {this.props.offers &&
          this.props.offers.map(item => {
            return (
              <div className="offer-item" key={item.items_id}>
                <OfferCard item={item} images={this.props.images[item.items_id]} />
              </div>
            )
          })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    offers: state.offers,
    item: state.item,
    images: state.images,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getItemFromOffer, getImages }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offers)
