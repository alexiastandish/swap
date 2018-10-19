import axios from 'axios'

const GET_USER_INFO = 'GET_USER_INFO'

export function getUserInfo(id) {
  return {
    type: GET_USER_INFO,
    payload: axios
      .get(`/api/offerUser/${id}`)
      .then(res => {
        console.log('res', res)
        return res.data
      })
      .catch(err => {
        console.log('err', err)
        return []
      }),
  }
}

const initialState = []

export default function getUserInfoReducer(state = initialState, action) {
  // console.log('action.payload', action.payload)
  switch (action.type) {
    case `${GET_USER_INFO}_FULFILLED`:
      console.log('action.payload', action.payload)
      return [...action.payload]
    default:
      return state
  }
}
