import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNotifications } from '../../ducks/notificationsReducer'
import { getImages } from '../../ducks/imagesReducer'
import NotificationCard from '../../components/NotificationCard/NotificationCard'

class Notifications extends Component {
  constructor() {
    super()

    this.updateNotificationStatus = this.updateNotificationStatus.bind(this)
  }
  componentDidMount() {
    this.props.getNotifications(this.props.user.user_id)
  }

  updateNotificationStatus({ status, offerId }) {
    axios.put(`/api/updateOffer/${offerId}`, { status }).then(this.props.getNotifications)
  }

  render() {
    console.log('notificationItems', this.props.notificationItems)
    console.log('this.props', this.props)
    return (
      <div className="offers-container">
        {this.props.notifications &&
          this.props.notifications.map(notification => {
            console.log('notification', notification)
            return (
              <div className="notification-item" key={notification.offer_id}>
                <NotificationCard
                  updateNotificationStatus={this.updateNotificationStatus}
                  otherUserName={notification.username}
                  theirItem={notification.their_item}
                  offerId={notification.offer_id}
                  yourItem={notification.your_item}
                  offerStatus={notification.offer_status}
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
    notifications: state.notifications,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getNotifications,
      getImages,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
