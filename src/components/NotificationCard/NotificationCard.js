import React from 'react'
import './NotificationCard.scss'

function NotificationCard(props) {
  console.log('props', props)

  return (
    <div className="notification-card-container" style={{ borderBottom: '1px solid' }}>
      <p>
        <span className="username">{props.otherUserName}</span>
        <br />
        <span style={{ fontWeight: 'bold' }}>
          {props.offerStatus === 2 ? 'accepted' : 'declined'}
        </span>{' '}
        your offer of {props.yourItem}
        <br />
        in exchange for{' '}
        <span style={{ color: '#2acbdc', fontWeight: 'bold' }}>{props.theirItem}.</span>
      </p>
      <button
        onClick={() => {
          props.updateNotificationStatus({ status: 4, offerId: props.offerId })
        }}
      >
        <div
          // className="offer-buttons"
          className="fa fa-1x fa-times remove"
          style={{ fontSize: '22px' }}
        />
      </button>
    </div>
  )
}

export default NotificationCard
