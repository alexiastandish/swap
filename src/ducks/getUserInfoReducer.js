import axios from 'axios'

const GET_USER_INFO = 'GET_USER_INFO'

export function getUserInfo(id) {
  return {
    type: GET_USER_INFO,
    payload: axios
      .get(`/api/userInfo/${id}`)
      .then(res => {
        return res.data[0]
      })
      .catch(err => {
        return {}
      }),
  }
}

const initialState = {}

export default function getUserInfoReducer(state = initialState, action) {
  // console.log('action.payload', action.payload)
  switch (action.type) {
    case `${GET_USER_INFO}_FULFILLED`:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
