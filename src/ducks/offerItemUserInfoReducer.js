import axios from 'axios'

const GET_OFFER_USER = 'GET_OFFER_USER'

export function getOfferUser(id) {
  return {
    type: GET_OFFER_USER,
    payload: axios
      .get(`/api/offerUser/${id}`)
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

export default function offerItemUserInfoReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_OFFER_USER}_FULFILLED`:
      // console.log('action.payload', action.payload)
      return { ...state, ...action.payload }
    default:
      return state
  }
}
