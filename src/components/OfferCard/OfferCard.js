import React from 'react'
import './OfferCard.scss'
import { Link } from 'react-router-dom'
// if (props.requestItems.items_id===props.offersInfo.requesteditemid)
function OfferCard(props) {
  console.log('props.offersInfo', props.offersInfo)
  console.log('requestItemSection', requestItemSection)
  const requestItemSection = props.requestItems.filter(requestItem => {
    console.log('requestItem', requestItem)
    if (requestItem.items_id === props.offersInfo.requesteditemid) {
      return (
        <div>
          <h1>{requestItem.item_name}</h1>
        </div>
      )
    }
  })

  // const filteredRequest = props.requestItems.filter(requestItem => {
  //   const requestItemName = requestItem.item_name === props.item.item_name
  //   return <div>{requestItemName}</div>
  // })

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

        <div className="request-item" />
        <h1>{requestItemSection && requestItemSection}</h1>
      </div>
    </Link>
  )
}

export default OfferCard
