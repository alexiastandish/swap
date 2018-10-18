import axios from 'axios'

const GET_REQUEST_ITEM = 'GET_REQUEST_ITEM'

export function getRequestedItem(id) {
  return {
    type: GET_REQUEST_ITEM,
    payload: axios
      .get(`/api/request/${id}`)
      .then(response => {
        console.log('response', response)
        return response.data
      })
      .catch(err => {
        console.log('err', err)
        return []
      }),
  }
}

const initialState = []

export default function requestedItemReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_REQUEST_ITEM}_FULFILLED`:
      return [...action.payload]
    default:
      return state
  }
}
