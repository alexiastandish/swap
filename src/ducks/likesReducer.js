import axios from 'axios'

const GET_LIKES = 'GET_LIKES'

export function getLikes(id) {
  return {
    type: GET_LIKES,
    payload: axios
      .get(`/api/like/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.log('err', err)
        return []
      }),
  }
}

const initialState = []

export default function likesReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_LIKES}_FULFILLED`:
      // console.log('action.payload', action.payload)
      return [...action.payload]
    default:
      return state
  }
}
