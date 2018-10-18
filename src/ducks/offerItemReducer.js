import axios from 'axios'

const GET_ITEM_FROM_OFFER = 'GET_ITEM_FROM_OFFER'

export function getItemFromOffer(id) {
  return {
    type: GET_ITEM_FROM_OFFER,
    payload: axios
      .get(`/api/offer/${id}`)
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

export default function offerItemReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ITEM_FROM_OFFER}_FULFILLED`:
      return [...action.payload]
    default:
      return state
  }
}
