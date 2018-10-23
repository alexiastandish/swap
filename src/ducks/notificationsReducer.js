import axios from 'axios'

const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS'

export function getNotificationList(id) {
  return {
    type: GET_NOTIFICATIONS,
    payload: axios
      .get(`/api/notification/${id}`)
      .then(res => {
        return res.data
      })
      .catch(err => {
        console.log('err', err)
        return []
      }),
  }
}

const initialState = []

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_NOTIFICATIONS}_FULFILLED`:
      return [...action.payload]
    default:
      return state
  }
}
