import axios from 'axios'

const GET_REQUEST_ITEM = 'GET_REQUEST_ITEM'

export function getRequestedItem(id) {
  return {
    type: GET_REQUEST_ITEM,
    payload: axios
      .get(`/api/request/${id}`)
      .then(response => {
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

export default function requestedItemReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_REQUEST_ITEM}_FULFILLED`:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
