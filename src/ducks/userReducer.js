import axios from 'axios'

const GET_USER = 'GET_USER'

export function getUser() {
  return {
    type: GET_USER,
    payload: axios
      .get(`/api/me`)
      .then(res => res.data)
      .catch(err => {
        console.log('err', err)
      }),
  }
}

const initialState = {
  user: {},
  isAuthenticated: false,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      }
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        isAuthenticated: false,
      }
    default:
      return state
  }
}
