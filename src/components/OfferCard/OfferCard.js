import React from 'react'
import './OfferCard.scss'
import { Link } from 'react-router-dom'

function OfferCard(props) {
  console.log('props', props)

  function sendEmail() {
    const mail = `mailto:${props.offerItemUserEmail}`
    // var a = document.createElement('a')
    // a.href = `${mail}`
    // a.click()
  }
  return (
    <Link to={props.offer && `/item/${props.offer.items_id}`}>
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
              <p>{props.requestedItemName}</p>
              <p>{props.offerItemUserName}</p>
              <p>{props.offerItemUserEmail}</p>
            </div>
          )}
        </h1>
        <div className="offer-buttons">
          <button onClick={sendEmail}>
            <a>Accept Offer</a>
          </button>
          <button>Decline Offer</button>
        </div>
      </div>
    </Link>
  )
}

export default OfferCard
