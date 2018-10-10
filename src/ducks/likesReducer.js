import axios from 'axios'

const GET_LIKES = 'GET_LIKES'
const ADD_LIKE = 'ADD_LIKE'
// const UNLIKE_ITEM = 'UNLIKE_ITEM'

export function getUserLikes() {
  return {
    type: GET_LIKES,
    payload: axios.get('/api/like/:id'),
  }
}

export function saveItem(postid, postedbyid, likinguser) {
  return {
    type: ADD_LIKE,
    payload: axios.post('/api/like', { postid, postedbyid, likinguser }),
  }
}

const initialState = {
  likes: [],
  isLoading: false,
}

export default function likesReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_LIKES}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }
    case `${GET_LIKES}_FULLFILLED`:
      return {
        ...state,
        isLoading: false,
        likes: action.payload.data,
      }
    case `${ADD_LIKE}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }
    case `${ADD_LIKE}_FULLFILLED`:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
