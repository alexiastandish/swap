import axios from 'axios'

const GET_NOTIF_USER = 'GET_NOTIF_USER'

export function getNotificationUser(id) {
  return {
    type: GET_NOTIF_USER,
    payload: axios
      .get(`/api/notifUser/${id}`)
      .then(response => {
        // console.log('response', response)
        return response.data.reduce((prev, curr) => {
          // console.log('prev', prev)
          // console.log('curr', curr)
          prev[curr.user_id] = curr
          return prev
        }, {})
      })
      .catch(err => {
        console.log('err', err)
        return {}
      }),
  }
}

const initialState = {}

export default function notifItemUserInfoReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_NOTIF_USER}_FULFILLED`:
      // console.log('action.payload', action.payload)
      return { ...state, ...action.payload }
    default:
      return state
  }
}
