import axios from 'axios'

const GET_USER_BY_ID = 'GET_USER_BY_ID'
const GET_USERS = 'GET_USERS'

export function getUserId(id) {
  return {
    type: GET_USER_BY_ID,
    payload: axios.get(`/api/user/${id}`),
  }
}

export function getUsers() {
  return {
    type: GET_USERS,
    payload: axios.get('/api/users'),
  }
}

const initialState = {
  users: [],
  user: {},
  isLoading: false,
  userErrorMessage: '',
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        userErrorMessage: 'Failed To Use Middlewares',
      }
    case `${GET_USERS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }
    case `${GET_USERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        users: action.payload.data,
      }
    case `${GET_USERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        userErrorMessage: 'Failed To Fetch Products',
      }
    case `${GET_USER_BY_ID}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }

    case `${GET_USER_BY_ID}_FULLFILLED`:
      return {
        ...state,
        isLoading: false,
        user: action.payload.data,
      }

    default:
      return state
  }
}
