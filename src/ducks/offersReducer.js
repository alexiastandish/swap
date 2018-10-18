import axios from 'axios'

const GET_OFFERS = 'GET_OFFERS'

export function getOffers(id) {
  return {
    type: GET_OFFERS,
    payload: axios
      .get(`/api/offers/${id}`)
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

export default function offersReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_OFFERS}_FULFILLED`:
      return [...action.payload]
    default:
      return state
  }
}
