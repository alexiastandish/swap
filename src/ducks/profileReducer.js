import axios from 'axios'

const GET_ITEMS_BY_USER = 'GET_ITEMS_BY_USER'

export function getUserItems(id) {
  return {
    type: GET_ITEMS_BY_USER,
    payload: axios
      .get(`/api/items/${id}`)
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

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ITEMS_BY_USER}_FULFILLED`:
      return [...action.payload]
    default:
      return state
  }
}
