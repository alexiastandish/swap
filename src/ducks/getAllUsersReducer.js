import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

export function getAllUsers() {
  return {
    type: GET_ALL_USERS,
    payload: axios
<<<<<<< HEAD
      .get('/api/users')
=======
      .get(`/api/users`)
>>>>>>> e4ad06f32ff62b0862585a72deeb4eaa7b476b12
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
