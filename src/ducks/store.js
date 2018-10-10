import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import itemsReducer from './itemsReducer'
import userReducer from './userReducer'

const store = createStore(userReducer, itemsReducer, applyMiddleware(promiseMiddleware()))

export default store
