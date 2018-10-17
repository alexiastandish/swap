import React, { Component } from 'react'
import './Offers.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getOffers } from '../../ducks/offersReducer'
import { getItemFromOffer } from '../../ducks/offerItemReducer'
import { getImages } from '../../ducks/imagesReducer'
import { getItem } from '../../ducks/itemReducer'
import OfferCard from '../../components/OfferCard/OfferCard'

class Offers extends Component {
  componentDidMount() {
    this.props.getOffers(this.props.user.user_id).then(response => {
      response.value.forEach(offer => {
        this.props.getItem(offer.fromuser_itemid).then(response => {
          return response.value
        })
        // .then(response => {
        //   response.value.forEach(item => {
        //     this.props.getImages(item.items_id)
        //   })
        // })
      })
    })
  }

  render() {
    console.log('this.props.item', this.props.item)
    return (
      <div className="offers-container">
        {this.props.offers &&
          this.props.offers.map((offer, index) => {
            return (
              <div className="offer-card" key={offer.items_id}>
                <OfferCard
                  offer={offer}
                  item={this.props.item[index]}
                  // images={this.props.images && this.props.images[index]}
                />
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
    offerItem: state.offerItem,
    images: state.images,
    offers: state.offers,
    item: state.item,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getOffers, getItemFromOffer, getImages, getItem }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offers)
