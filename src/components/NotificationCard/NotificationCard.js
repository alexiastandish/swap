import React from 'react'

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
        <div className="offer-description">
          <p>
            <span className="username">{props.otherUserName}</span>
            <br /> {props.offerStatus === 2 ? 'accepted' : 'declined'} your offer of{' '}
            {props.yourItem}
            <br />
            in exchange for <span>{props.theirItem}.</span>
          </p>
        </div>
        <div className="offer-buttons">{/* // TODO: DELETE BUTTON */}</div>
      </div>
    </div>
  )
}

export default NotificationCard
