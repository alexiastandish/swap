import axios from 'axios'

// Action
const GET_PROFILE_ITEMS = 'GET_PROFILE_ITEMS'
const GET_ITEM = 'GET_ITEM'

// Action creators
export function getProfileItems() {
  // gets items from user id
  return {
    type: GET_PROFILE_ITEMS,
    payload: axios.get('/api/items/:id'),
  }
}

export function getItem() {
  // gets single item from item id
  return {
    type: GET_ITEM,
    payload: axios.get('/api/allitem/:id'),
  }
}

const initialState = {
  userItems: [],
  dashBoardItems: [],
  isLoading: false,
  userErrorMessage: '',
}

export default function propertyReducer(state = initialState, action) {
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
        properties: action.payload.data,
      }
    default:
      return state
  }
}
