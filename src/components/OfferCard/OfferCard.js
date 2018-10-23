import React from 'react'
import './OfferCard.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'

function OfferCard(props) {
  //TODO: UPDATE STATUS FUNCTION
  function updateStatus(status) {
    // status 1 = pending
    // status 2 = accepted
    // status 3 = declined
    axios
      .post(`/api/notification/${props.offerId}`, status)
      .then
      // get offers again
      ()
  }

  console.log('props', props)

  return (
    <div className="offer-card-container">
      <div className="text-and-image">
        <Link to={props.offer && `/item/${props.offer.items_id}`}>
          <div className="offer-image-container">
            {props.offerImage && (
              <div key={props.offerImage.image_id}>
                <img src={props.offerImage.imageurl} alt="default" />
              </div>
            )}
          </div>
        </Link>
        <div className="offer-text">
          <div className="offer-description">
            <p>
              <span className="username">{props.offerItemUserName}</span>
              <br /> would like to swap
            </p>
            <h1>{props.offer && props.offer.item_name}</h1>
          </div>
          <div className="request-item" />
          <div>
            <div>
              <p>
                in exchange for <span>{props.requestedItemName}.</span>
              </p>
              <p>{props.offerItemUserEmail}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="offer-buttons">
        <button
          onClick={() => {
            updateStatus(2)
          }}
        >
          Accept Offer
        </button>
        <button
          onClick={() => {
            updateStatus(3)
          }}
        >
          Decline Offer
        </button>
      </div>
    </div>
  )
}

export default OfferCard
