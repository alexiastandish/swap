import axios from 'axios'

const GET_ITEM_FEED = 'GET_ITEM_FEED'

export function getItemFeed(id) {
  return {
    type: GET_ITEM_FEED,
    payload: axios
      .get(`/api/dash/${id}`)
      .then(res => {
        // console.log('res.data', res.data)
        return res.data
      })
      .catch(err => {
        console.log('err', err)
        return []
      }),
  }
}

const initialState = []

export default function dashReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ITEM_FEED}_FULFILLED`:
      return [...action.payload]
    default:
      return state
  }
}
