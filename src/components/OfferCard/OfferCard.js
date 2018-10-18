import React from 'react'
import './OfferCard.scss'
import { Link } from 'react-router-dom'

function OfferCard(props) {
  console.log('props', props)
  console.log('props.tradeItems', props.tradeItems)
  return (
    <Link to={`/item/${props.item.items_id}`}>
      <div className="like-card-container">
        <div className="like-image-container">
          {props.images &&
            props.images
              .filter(image => image.imageurl_itemid === props.item.items_id)
              .map(image => (
                <div key={image.image_id}>
                  <img src={image.imageurl} alt="default" />
                </div>
              ))[0]}
        </div>

        <div className="like-description">
          <h1 className="like-item-link-text">{props.item.item_name}</h1>
        </div>

        <div className="user-items">
          {props.offersInfo &&
            props.offersInfo
              .filter(offerItem => offerItem.requesteditemid === props.tradeItems.items_id)
              .map(offerItem => {
                return (
                  <div>
                    <h1>{offerItem.item_name && offerItem.item_name}</h1>
                  </div>
                )
              })}
        </div>

        {/* <div className="user-items">
          <h1>
            {props.tradeItems.map(tradeItem => {
              return (
                <div>
                  <h1>{tradeItem.item_name[props.offersInfo.requesteditemid]}</h1>
                </div>
              )
            })}
          </h1>
        </div> */}
        {/* {props.tradeItems &&
            // props.tradeItems
              // .filter(tradeItem => tradeItem.items_id === props.offersInfo.requesteditemid)
              // .map(tradeItem => {
              //   return (
                  // <div key={tradeItem.items_id}>
                    // <h1>{props.tradeItem.item_name}</h1>
                  // </div>
                // )
              // })} */}
      </div>
    </Link>
  )
}

export default OfferCard
