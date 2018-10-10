import axios from 'axios'

const GET_FOLLOWING = 'GET_FOLLOWING'
const FOLLOW_USER = 'FOLLOW_USER'

export function getFollowingUsers() {
  return {
    type: GET_FOLLOWING,
    payload: axios.get('/api/follows/:id'),
  }
}

export function followUser(user_followingid) {
  return {
    type: FOLLOW_USER,
    payload: axios.post('/api/follow', { user_followingid }),
  }
}

const initialState = {
  followingUsers: [],
  isLoading: false,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_FOLLOWING}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }
    case `${GET_FOLLOWING}_FULLFILLED`:
      return {
        ...state,
        isLoading: false,
      }
    case `${FOLLOW_USER}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }
    case `${FOLLOW_USER}_FULLFILLED`:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
