import React from 'react'
import './OfferCard.scss'
import { Link } from 'react-router-dom'

function OfferCard(props) {
  return (
    <div className="offer-card-container">
      <div className="text-and-image">
        <Link to={props.theirItemId && `/item/${props.theirItemId}`}>
          <div className="offer-image-container">
            {props.offerImage && (
              <div key={props.offerImage.image_id}>
                <img
                  src={props.offerImage.imageurl}
                  alt="default"
                  style={{ borderRadius: '25px' }}
                />
              </div>
            )}
          </div>
        </Link>
        <div className="offer-text" style={{ marginLeft: '30px' }}>
          <div className="offer-description">
            <p>
              <span className="username">{props.theirUsername}</span>
              <br /> would like to swap
            </p>
            <h1 style={{ color: '#2acbdc' }}>{props.theirItemName}</h1>
          </div>
          <div className="request-item" />
          <div>
            <div>
              <p>
                in exchange for <span>{props.yourItemName}.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="offer-buttons">
        <button
          onClick={() => {
            props.updateStatus({ status: 2, offerId: props.offerId })
          }}
        >
          Accept Offer
        </button>
        <button
          onClick={() => {
            props.updateStatus({ status: 3, offerId: props.offerId })
          }}
        >
          Decline Offer
        </button>
      </div>
    </div>
  )
}

export default OfferCard
