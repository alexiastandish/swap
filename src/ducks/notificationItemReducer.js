import axios from 'axios'

const GET_ITEM_FROM_NOTIFICATION = 'GET_ITEM_FROM_NOTIFICATION'

export function getItemFromNotification(id) {
  return {
    type: GET_ITEM_FROM_NOTIFICATION,
    payload: axios
      .get(`/api/itemNotification/${id}`)
      .then(response => {
        console.log('response', response)
        return response.data.reduce((prev, curr) => {
          // console.log('prev', prev)
          // console.log('curr', curr)
          prev[curr.items_id] = curr
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

export default function notificationItemReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ITEM_FROM_NOTIFICATION}_FULFILLED`:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
