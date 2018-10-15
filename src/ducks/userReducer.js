import axios from 'axios'

const GET_USER = 'GET_USER'
// const GET_USER_BY_ID = 'GET_USER_BY_ID'

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

// export function getUserById(id) {
//   return {
//     type: GET_USER_BY_ID,
//     payload: axios
//       .get(`/api/user/${id}`)
//       .then(res => res.data)
//       .catch(err => {
//         console.log('err', err)
//       }),
//   }
// }

const initialState = {
  isAuthenticated: false,
  userById: {},
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: !!action.payload,
      }
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        isAuthenticated: false,
      }
    // case `${GET_USER_BY_ID}_FULFILLED`:
    //   return {
    //     ...action.payload,
    //   }
    default:
      return state
  }
}
