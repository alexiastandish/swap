import React from 'react'
import './NotificationCard.scss'

function NotificationCard(props) {
  console.log('props', props)

  return (
    <div className="notification-card-container">
      <p>
        <span className="username">{props.otherUserName}</span>
        <br /> {props.offerStatus === 2 ? 'accepted' : 'declined'} your offer of {props.yourItem}
        <br />
        in exchange for <span>{props.theirItem}.</span>
      </p>
      <button
        onClick={() => {
          props.updateNotificationStatus({ status: 4, offerId: props.offerId })
        }}
      >
        <div
          className="offer-buttons"
          className="fa fa-1x fa-times remove"
          style={{ color: '#2acbdc' }}
        />
      </button>
    </div>
  )
}

export default NotificationCard
