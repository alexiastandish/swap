import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNotifications } from '../../ducks/notificationsReducer'
import { getImages } from '../../ducks/imagesReducer'
import NotificationCard from '../../components/NotificationCard/NotificationCard'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

class Notifications extends Component {
  constructor() {
    super()

    this.state = {
      userError: '',
    }

    this.updateNotificationStatus = this.updateNotificationStatus.bind(this)
  }
  componentDidMount() {
    this.props.getNotifications(this.props.user.user_id)
  }

  updateNotificationStatus({ status, offerId }) {
    if (this.props.user.user_id === 79) {
      return this.handleAnonymousUser()
    } else {
      axios
        .put(`/api/updateOffer/${offerId}`, { status })
        .then(this.props.getNotifications(this.props.user.user_id))
    }
  }

  handleAnonymousUser = () => {
    this.setState({
      userError: 'Must have a swap profile to access this functionality',
    })
    setTimeout(
      function() {
        this.setState({
          userError: '',
        })
      }.bind(this),
      3000
    )
  }

  render() {
    // console.log('notificationItems', this.props.notificationItems)
    // console.log('this.props', this.props)
    return (
      <div className="offers-container">
        {this.state.userError && <ErrorMessage message={this.state.userError} />}

        {this.props.notifications &&
          this.props.notifications.map(notification => {
            // console.log('notification', notification)
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
