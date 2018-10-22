import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

export function getAllUsers() {
  return {
    type: GET_ALL_USERS,
    payload: axios
      .get('/api/users')
      .then(res => res.data)
      .catch(err => {
        console.log('err', err)
      }),
  }
}

const initialState = []

export default function getAllUsersReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ALL_USERS}_FULFILLED`:
      return [...action.payload]
    default:
      return state
  }
}
