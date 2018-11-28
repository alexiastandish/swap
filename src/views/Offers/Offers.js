import React, { Component } from 'react'
import './Offers.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getImages } from '../../ducks/imagesReducer'
import { getOffers } from '../../ducks/offersReducer'
import OfferCard from '../../components/OfferCard/OfferCard'
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

class Offers extends Component {
  constructor() {
    super()

    this.state = {
      userError: '',
    }

    this.updateStatus = this.updateStatus.bind(this)
    this.getOffers = this.getOffers.bind(this)
  }

  componentDidMount() {
    this.getOffers()
  }

  updateStatus({ status, offerId }) {
    if (this.props.user.user_id === 79) {
      return this.handleAnonymousUser()
    } else {
      axios.put(`/api/updateOffer/${offerId}`, { status }).then(this.getOffers)
    }
  }

  getOffers() {
    this.props.getOffers(this.props.user.user_id).then(response => {
      Object.values(response.value).forEach(offer => {
        this.props.getImages(offer.fromuser_itemid)
      })
    })
  }

  handleAnonymousUser = () => {
    this.setState({
      userError: 'Must have a swap profile to access this functionality',
    })
    setTimeout(
      function() {
        this.setState({
          userError: '',
        })
      }.bind(this),
      3000
    )
  }

  render() {
    return (
      <div className="offers-container">
        {this.state.userError && <ErrorMessage message={this.state.userError} />}

        {this.props.offers &&
          this.props.offers.map(offer => {
            return (
              <div className="offer-item" key={offer.offer_id}>
                <OfferCard
                  updateStatus={this.updateStatus}
                  offerImage={
                    this.props.images[offer.fromuser_itemid] &&
                    this.props.images[offer.fromuser_itemid][0]
                  }
                  theirItemName={offer.their_item}
                  theirUsername={offer.username}
                  yourItemName={offer.your_item}
                  offerId={offer.offer_id}
                  theirItemId={offer.fromuser_itemid}
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
    images: state.images,
    offers: state.offers,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getImages, getOffers }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offers)
