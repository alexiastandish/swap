import React from 'react'
import './OfferCard.scss'
import { Link } from 'react-router-dom'

function OfferCard(props) {
  return (
    <Link to={`/item/${props.offer.items_id}`}>
      <div className="like-card-container">
        <div className="like-image-container">
          {props.offerImage && (
            <div key={props.offerImage.image_id}>
              <img src={props.offerImage.imageurl} alt="default" />
            </div>
          )}
        </div>
        <div className="like-description">
          <h1 className="like-item-link-text">{props.offer.item_name}</h1>
        </div>
        <div className="request-item" />
        <h1>
          {true && (
            <div>
              <h1>{props.requestedItemName}</h1>
            </div>
          )}
        </h1>
        <div className="offer-buttons">
          <button>Accept Offer</button>
          <button>Decline Offer</button>
        </div>
      </div>
    </Link>
  )
}

export default OfferCard
