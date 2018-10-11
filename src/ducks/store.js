import { applyMiddleware, createStore, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import itemsReducer from './itemsReducer'
import userReducer from './userReducer'

const combinedReducers = combineReducers({
  user: userReducer,
  items: itemsReducer,
})

const store = createStore(combinedReducers, applyMiddleware(promiseMiddleware()))

export default store
