import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getItemFromNotification } from '../../ducks/notificationItemReducer'
import { getRequestedItem } from '../../ducks/requestItemReducer'
import { getOffers } from '../../ducks/offersReducer'
import { getImages } from '../../ducks/imagesReducer'
import { getOfferUser } from '../../ducks/offerItemUserInfoReducer'
import { getNotificationList } from '../../ducks/notificationsReducer'
import NotificationCard from '../../components/NotificationCard/NotificationCard'

class Notifications extends Component {
  componentDidMount() {
    this.props.getItemFromNotification(this.props.user.user_id).then(response => {
      Object.values(response.value).forEach(item => {
        this.props.getImages(item.items_id)
      })
    })
    this.props.getRequestedItem(this.props.user.user_id).then(response => {
      return response.value[this.props.item.items_id]
    })
    this.props.getNotificationList(this.props.user.user_id).then(response => {
      // console.log('response.value.OFFER', response.value)
      return response.value
    })
    this.props.getOfferUser(this.props.user.user_id).then(response => {
      return response.value[this.props.item.items_id]
    })
  }

  render() {
    console.log('this.props.notificationList', this.props.notificationList)
    console.log('this.props', this.props)
    return (
      <div className="offers-container">
        {this.props.notificationList &&
          this.props.notificationList.map(notification => {
            console.log('notification', notification)
            console.log('notificationItems', this.props.notificationItems)
            console.log('notification.requesteditemid', notification.requesteditemid)
            return (
              <div className="notification-item" key={notification.offer_id}>
                <NotificationCard
                  requestedItemName={
                    this.props.notificationItems &&
                    this.props.notificationItems[notification.requesteditemid].item_name
                  }
                  requestedItemName={
                    (this.props.requestItems &&
                      this.props.requestItems[notification.requesteditemid] &&
                      this.props.requestItems[notification.requesteditemid].item_name &&
                      this.props.requestItems[notification.requesteditemid].item_name) ||
                    'I donut have a name'
                    // get(this.props, ['requestItems', offer.requesteditemid, 'item_name'], 'I donut have a name')
                  }
                  offerItemUserName={
                    (this.props.offerUserInfo &&
                      this.props.offerUserInfo[notification.fromuserid] &&
                      this.props.offerUserInfo[notification.fromuserid].username) ||
                    'I donut have a name'
                  }
                  offerItemUserEmail={
                    (this.props.offerUserInfo &&
                      this.props.offerUserInfo[notification.fromuserid] &&
                      this.props.offerUserInfo[notification.fromuserid].email) ||
                    'I donut have an email'
                  }
                  offerId={notification.offer_id}
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
    offerUserInfo: state.offerUserInfo,
    notificationItems: state.notificationItems,
    item: state.item,
    images: state.images,
    notificationList: state.notificationList,
    notification: state.notification,
    requestItems: state.requestItems,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getItemFromNotification,
      getRequestedItem,
      getOffers,
      getNotificationList,
      getOfferUser,
      getImages,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
