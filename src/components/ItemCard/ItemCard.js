import React, { Component } from 'react'
import './ItemCard.scss'
import { Link } from 'react-router-dom'

export default function ItemCard(props) {
  console.log('props', props)
  return (
    <Link to={`/item/${props.item.items_id}`}>
      <div className="item-card-container">
        <div className="item-image">
          {props.images &&
            props.images
              .filter(image => image.imageurl_itemid === props.item.items_id)
              .map(image => (
                <div key={image.image_id}>
                  <img className="item-card-image-container" src={image.imageurl} alt="default" />
                </div>
              ))[0]}
        </div>
        <div className="item-description">
          <h1>
            <span>Item: </span>
            <br />
            {props.item.item_name}
          </h1>

          <p>
            <span>Description: </span> {props.item.item_description}
          </p>
          <p>
            <span className="timestamp-text">{props.item.post_time}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
