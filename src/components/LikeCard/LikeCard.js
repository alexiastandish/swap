import React from 'react'
import './LikeCard.scss'
import { Link } from 'react-router-dom'

function LikeCard(props) {
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
      </div>
    </Link>
  )
}

export default LikeCard
