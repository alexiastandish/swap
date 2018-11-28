import axios from 'axios'

const GET_USER = 'GET_USER'
// const GET_USER_BY_ID = 'GET_USER_BY_ID'

export function getUser() {
  return {
    type: GET_USER,
    payload: axios
      .get(`/api/me`)
      .then(res => {
        console.log('res.data', res.data)
        return res.data
      })
      .catch(err => {
        console.log('err', err)
      }),
  }
}

const initialState = {
  isAuthenticated: false,
  userById: {},
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      // Comment back in later
      return {
        ...state,
        ...action.payload,
        isAuthenticated: !action.payload,
      }

    // delete when you comment in the above
    // return {
    //   user_id: 59,
    //   authid: 'github|40964861',
    //   username: '',
    //   email: null,
    //   user_photo: null,
    //   isAuthenticated: true,
    // }
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        isAuthenticated: false,
      }
    // case `${GET_USER_BY_ID}_FULFILLED`:
    //   return {
    //     ...action.payload,
    //   }
    default:
      return state
  }
}
