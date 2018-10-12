import axios from 'axios'

const GET_ITEM = 'GET_ITEM'

export function getItem(id) {
  return {
    type: GET_ITEM,
    payload: axios
      .get(`/api/item/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.log('err', err)
        return {}
      }),
  }
}

// export function getItems() {}

const initialState = {
  item: {},
}

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
