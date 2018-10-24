import React from 'react'
// import './OfferCard.scss'
import axios from 'axios'

function NotificationCard(props) {
  //TODO: UPDATE STATUS FUNCTION
  // function updateStatus(status) {
  //   // status 1 = pending
  //   // status 2 = accepted
  //   // status 3 = declined
  //   axios.put(`/api/notification/${props.offerId}`, status).then()()
  //   // get offers again
  // }

  console.log('props', props)

  return (
    <div className="offer-card-container">
      <div className="text-and-image">
        <div className="offer-text">
          <div className="offer-description">
            <p>
              <span className="username">{props.oppositeUser}</span>
              <br /> accepted your offer of {props.requestItem}
            </p>
            <h1>{props.offer && props.offer.item_name}</h1>
          </div>
          <div className="request-item" />
          <div>
            <div>
              <p>
                in exchange for <span>{props.offerItem}.</span>
              </p>
              <p>{props.offerItemUserEmail}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="offer-buttons">
        {/* <button
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
        </button> */}
      </div>
    </div>
  )
}

export default NotificationCard
