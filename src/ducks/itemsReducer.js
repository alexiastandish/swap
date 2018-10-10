import axios from 'axios'

// Action
const GET_PROFILE_ITEMS = 'GET_PROFILE_ITEMS'
const GET_ITEM = 'GET_ITEM'
const GET_ITEM_IMAGES = 'GET_ITEM_IMAGES'

const initialState = {
  userItems: [],
  item: {},
  isLoading: false,
}

// Action creators
export function getItems(id) {
  // gets items from user id
  return {
    type: GET_PROFILE_ITEMS,
    payload: axios.get(`/api/items/${id}`),
  }
}

export function getItem(id) {
  // gets single item from item id
  return {
    type: GET_ITEM,
    payload: axios.get(`/api/allitem/${id}`),
  }
}

export function getItemImages(id) {
  return {
    type: GET_ITEM_IMAGES,
    payload: axios.get(`/api/images/${id}`),
  }
}

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_PROFILE_ITEMS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }
    case `${GET_PROFILE_ITEMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        userItems: action.payload.data,
      }
    case `${GET_ITEM}_PENDING`:
      return {
        ...state,
        isloading: true,
      }
    case `${GET_ITEM}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        item: action.payload.data,
      }
    case `${GET_ITEM_IMAGES}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }
    case `${GET_ITEM_IMAGES}_FULLFILLED`:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
