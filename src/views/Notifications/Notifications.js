import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getItemFromNotification } from '../../ducks/notificationItemReducer'
import { getRequestedItem } from '../../ducks/requestItemReducer'
import { getOffers } from '../../ducks/offersReducer'
import { getImages } from '../../ducks/imagesReducer'
import { getOfferUser } from '../../ducks/offerItemUserInfoReducer'
import { getNotificationList } from '../../ducks/notificationsReducer'
import { getItem } from '../../ducks/itemReducer'
import NotificationCard from '../../components/NotificationCard/NotificationCard'

class Notifications extends Component {
  componentDidMount() {
    this.props.getItemFromNotification(this.props.user.user_id).then(response => {
      return response.value
    })
    this.props.getRequestedItem(this.props.user.user_id).then(response => {
      return response.value[this.props.item.items_id]
    })
    this.props.getNotificationList(this.props.user.user_id).then(response => {
      // console.log('response.value.OFFER', response.value)
      return response.value
    })
    this.props.getOfferUser(this.props.user.user_id).then(response => {
      return response.value[this.props.notificationItems.items_id]
    })
  }

  render() {
    console.log('notificationItems', this.props.notificationItems)
    console.log('this.props', this.props)
    return (
      <div className="offers-container">
        {this.props.notificationList &&
          this.props.notificationList.map(notification => {
            return (
              <div className="notification-item" key={notification.offer_id}>
                <NotificationCard
                  requestItem={
                    (this.props.notificationItems[notification.requesteditemid] &&
                      this.props.notificationItems[notification.requesteditemid].item_name) ||
                    'requestItem'
                  }
                  oppositeUser={
                    (this.props.offerUserInfo &&
                      this.props.offerUserInfo[notification.touserid] &&
                      this.props.offerUserInfo[notification.touserid].username) ||
                    'oppositeUser'
                  }
                  offerItem={
                    (this.props.requestItems[notification.fromuser_itemid] &&
                      this.props.requestItems[notification.fromuser_itemid].item_name) ||
                    'offerItem'
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
      getItem,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
