import axios from 'axios'

const GET_ITEM_FROM_OFFER = 'GET_ITEM_FROM_OFFER'

export function getItemFromOffer(id) {
  return {
    type: GET_ITEM_FROM_OFFER,
    payload: axios
      .get(`/api/offer/${id}`)
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

export default function offerItemReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ITEM_FROM_OFFER}_FULFILLED`:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
