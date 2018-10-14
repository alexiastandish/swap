import axios from 'axios'

const GET_FOLLOWING = 'GET_FOLLOWING'

export function getFollowingUsers(id) {
  return {
    type: GET_FOLLOWING,
    payload: axios
      .get(`/api/follows/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.log('err', err)
        return []
      }),
  }
}

const initialState = []

export default function followingReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_FOLLOWING}_FULFILLED`:
      console.log('action.payload', action.payload)
      return [...action.payload]
    default:
      return state
  }
}
