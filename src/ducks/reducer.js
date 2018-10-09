import getItem from '../api/getItem'
// import axios from 'axios'

// const GET_USERS = 'GET_USERS'
// const GET_ITEMS = 'GET_ITEMS'
// const GET_FRIENDS = 'GET_FRIENDS'
// // const GET_USER_ITEMS = 'GET_USER_ITEMS'
// const DELETE_ITEM = 'DELETE_ITEM'
// // const FOLLOW_USER = 'FOLLOW_USER'
// // const UNFOLLOW_USER = 'UNFOLLOW_USER'
// // const REMOVE_SAVED_ITEM = 'REMOVE_SAVED_ITEM'
// // const POST_ITEM = 'POST_ITEM'
// // const EDIT_ITEM = 'EDIT_ITEM'
// // const GET_USER_OFFERS = 'GET_USER_OFFERS'
// // const DELETE_OFFER = 'DELETE_OFFER'
const GET_ITEM = 'GET_ITEM'
// // const ACCEPT_OFFER = 'ACCEPT_OFFER'

// export function getUsers() {
//   return {
//     type: GET_USERS,
//     payload: axios.get('/api/users'),
//   }
// }

export function getItemReducer(id) {
  return {
    type: GET_ITEM,
    payload: getItem(id),
  }
}

// export function getItems() {
//   return {
//     type: GET_ITEMS,
//     payload: axios.get('/api/items'),
//   }
// }

// export function getFriends() {
//   return {
//     type: GET_FRIENDS,
//     payload: axios.get('/api/following'),
//   }
// }

// export function deleteItem(id) {
//   return {
//     type: DELETE_ITEM,
//     payload: axios.delete(`/api/items/${id}`),
//   }
// }

// export default function reducer(initialState, action) {}
