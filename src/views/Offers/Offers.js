import React, { Component } from 'react'
import './Offers.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getItemFromOffer } from '../../ducks/offerItemReducer'
import { getImages } from '../../ducks/imagesReducer'
import { getRequestedItem } from '../../ducks/requestItemReducer'
import { getOffers } from '../../ducks/offersReducer'
import { getOfferUser } from '../../ducks/offerItemUserInfoReducer'
import OfferCard from '../../components/OfferCard/OfferCard'
import axios from 'axios'

class Offers extends Component {
  constructor() {
    super()

    this.updateStatus = this.updateStatus.bind(this)
  }
  componentDidMount() {
    this.props.getItemFromOffer(this.props.user.user_id).then(response => {
      Object.values(response.value).forEach(item => {
        this.props.getImages(item.items_id)
      })
    })
    this.props.getRequestedItem(this.props.user.user_id).then(response => {
      // console.log('response.value', response.value)
      return response.value[this.props.item.items_id]
    })
    this.props.getOffers(this.props.user.user_id).then(response => {
      console.log('response.value.OFFER', response.value)
      return response.value
    })
    this.props.getOfferUser(this.props.user.user_id).then(response => {
      return response.value[this.props.item.items_id]
    })
  }
  //TODO: UPDATE STATUS FUNCTION
  updateStatus(status) {
    console.log('handleUpdateStatus')
    axios
      .put(`/api/updateOffer/${this.props.offerItems.items_id}`, {
        status,
        offerId: this.props.offer.offer_id,
      })
      .then(() => this.props.getOffers)
  }

  render() {
    console.log('this.props.offersList', this.props.offersList)
    console.log('this.props', this.props)
    return (
      <div className="offers-container">
        {this.props.offersList &&
          this.props.offersList.map(offer => {
            return (
              <div className="offer-item" key={offer.offer_id}>
                <OfferCard
                  updateStatus={this.updateStatus}
                  offerImage={
                    this.props.images[offer.fromuser_itemid] &&
                    this.props.images[offer.fromuser_itemid][0]
                  }
                  offer={this.props.offerItems && this.props.offerItems[offer.fromuser_itemid]}
                  requestedItemName={
                    (this.props.requestItems &&
                      this.props.requestItems[offer.requesteditemid] &&
                      this.props.requestItems[offer.requesteditemid].item_name) ||
                    'I donut have a name'
                    // get(this.props, ['requestItems', offer.requesteditemid, 'item_name'], 'I donut have a name')
                  }
                  offerItemUserName={
                    (this.props.offerUserInfo &&
                      this.props.offerUserInfo[offer.fromuserid] &&
                      this.props.offerUserInfo[offer.fromuserid].username) ||
                    'I donut have a name'
                  }
                  offerItemUserEmail={
                    (this.props.offerUserInfo &&
                      this.props.offerUserInfo[offer.fromuserid] &&
                      this.props.offerUserInfo[offer.fromuserid].email) ||
                    'I donut have an email'
                  }
                  offerId={offer.offer_id}
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
    offerUserInfo: state.offerUserInfo,
    offerItems: state.offerItems,
    item: state.item,
    images: state.images,
    offersList: state.offersList,
    requestItems: state.requestItems,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getItemFromOffer, getImages, getRequestedItem, getOffers, getOfferUser },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offers)
