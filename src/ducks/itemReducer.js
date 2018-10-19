import axios from 'axios'

const GET_ITEM = 'GET_ITEM'

export function getItem(id) {
  return {
    type: GET_ITEM,
    payload: axios
      .get(`/api/item/${id}`)
      .then(res => {
        // console.log('res.data', res.data)
        return res.data
      })
      .catch(err => {
        console.log('err', err)
        return {}
      }),
  }
}

const initialState = {}

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ITEM}_FULFILLED`:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
