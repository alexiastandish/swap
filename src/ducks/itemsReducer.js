import axios from 'axios'

// Action
const GET_ITEM = 'GET_ITEM'
const GET_ITEMS = 'GET_ITEMS'
const GET_IMAGES = 'GET_IMAGES'

const initialState = {
  items: [],
  item: {},
  imageUrls: [],
}

// Action creators

export function getItem(id) {
  // gets single item from item id
  return {
    type: GET_ITEM,
    payload: axios.get(`/api/items/${id}`),
  }
}

export function getItems(id) {
  // gets items by item user_id
  return {
    type: GET_ITEMS,
    payload: axios.get(`/api/items/${id}`),
  }
}

export function getItemImages(id) {
  return {
    type: GET_IMAGES,
    payload: axios.get(`/api/images/${id}`),
  }
}

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ITEM}_FULFILLED`:
      return {
        ...state,
        item: action.payload.data,
      }
    case `${GET_ITEMS}_FULFILLED`:
      return {
        ...state,
        items: action.payload.data,
      }
    case `${GET_IMAGES}_FULFILLED`:
      return {
        ...state,
        images: action.payload.data,
      }
    default:
      return state
  }
}
