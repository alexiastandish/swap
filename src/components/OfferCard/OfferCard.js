import React from 'react'
import './OfferCard.scss'

export default function OfferCard(props) {
  console.log('props', props)
  return (
    <div className="offer-card-container">
      {/* <div className="offer-image">
        {props.images &&
          props.images.map(image => (
            <div key={image.image_id}>
              <img className="object-image-container" src={image.imageurl} alt="default" />
            </div>
          ))[0]}
      </div> */}
      <div className="item-description">
        <h1>{props.item && props.item.item_name}</h1>
      </div>
    </div>
  )
}
