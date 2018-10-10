import { applyMiddleware, createStore, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import itemsReducer from './itemsReducer'
import userReducer from './userReducer'

const combinedReducers = combineReducers({
  item: itemsReducer,
  user: userReducer,
})

const store = createStore(combinedReducers, applyMiddleware(promiseMiddleware()))

export default store
