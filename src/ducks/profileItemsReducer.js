import axios from 'axios'

const GET_PROFILE_ITEMS = 'GET_PROFILE_ITEMS '

export function getProfileItems(userId) {
  return {
    type: GET_PROFILE_ITEMS,
    payload: axios
      .get(`/api/profileItems/${userId}`)
      .then(res => {
        return res.data
      })
      .catch(err => {
        // console.log('err', err)
        return []
      }),
  }
}

const initialState = []

export default function profileItemsReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_PROFILE_ITEMS}_FULFILLED`:
      // console.log('action.payload', action.payload)
      return [...action.payload]
    default:
      return state
  }
}
