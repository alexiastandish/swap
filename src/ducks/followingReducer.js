import axios from 'axios'

const GET_FOLLOWING = 'GET_FOLLOWING'

export function getFollowingUsers() {
  return {
    type: GET_USERS,
    payload: axios.get('/api/users'),
  }
}

const initialState = {
  users: [],
  isLoading: false,
  userErrorMessage: '',
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        userErrorMessage: 'Failed To Use Middlewares',
      }
    case `${GET_USERS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }
    case `${GET_USERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        products: action.payload.data,
      }
    case `${GET_USERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        userErrorMessage: 'Failed To Fetch Products',
      }
    default:
      return state
  }
}
