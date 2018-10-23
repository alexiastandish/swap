import React, { Component } from 'react'
import './OfferCard.scss'
// import { Link } from 'react-router-dom'

class OfferCard extends Component {
  constructor(props) {
    super(props)

    this.handleAcceptStatus = this.handleAcceptStatus.bind(this)
    this.handleDeclineStatus = this.handleDeclineStatus.bind(this)
  }
  handleAcceptStatus() {
    this.props.updateStatus(2)
  }
  handleDeclineStatus() {
    this.props.updateStatus(3)
  }

  render(props) {
    console.log('this.props', this.props)
    return (
      <div className="offer-card-container">
        <div className="text-and-image">
          {/* <Link to={this.props.offer && `/item/${this.props.offer.items_id}`}> */}
          <div className="offer-image-container">
            {this.props.offerImage && (
              <div key={this.props.offerImage.image_id}>
                <img src={this.props.offerImage.imageurl} alt="default" />
              </div>
            )}
          </div>
          {/* </Link> */}
          <div className="offer-text">
            <div className="offer-description">
              <p>
                <span className="username">{this.props.offerItemUserName}</span>
                <br /> would like to swap
              </p>
              <h1>{this.props.offer && this.props.offer.item_name}</h1>
            </div>
            <div className="request-item" />
            <div>
              <div>
                <p>
                  in exchange for <span>{this.props.requestedItemName}.</span>
                </p>
                <p>{this.props.offerItemUserEmail}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="offer-buttons">
          <button onClick={this.handleAcceptStatus}>Accept Offer</button>
          <button onClick={this.handleDeclineStatus}>Decline Offer</button>
        </div>
      </div>
    )
  }
}

export default OfferCard
