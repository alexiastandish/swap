import axios from 'axios'

const GET_ITEM_IMAGES = 'GET_ITEM_IMAGES'

export function getItemImages(id) {
  return {
    type: GET_ITEM_IMAGES,
    payload: axios
      .get(`/api/images/${id}`)
      .then(res => {
        console.log('res.data', res.data)
        return res.data
      })
      .catch(err => {
        console.log('err', err)
        return {}
      }),
  }
}

const initialState = { images: {} }

export default function itemImagesReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ITEM_IMAGES}_FULFILLED`:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
