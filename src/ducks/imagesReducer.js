import axios from 'axios'

const GET_IMAGES = 'GET_IMAGES'

export function getImages(id) {
  return {
    type: GET_IMAGES,
    payload: axios
      .get(`/api/images/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.log('err', err)
        return []
      }),
  }
}

const initialState = []

export default function imagesReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_IMAGES}_FULFILLED`:
      return [...action.payload]
    default:
      return state
  }
}
