import { applyMiddleware, createStore, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import itemReducer from './itemReducer'
import userReducer from './userReducer'
import imagesReducer from './imagesReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducers = combineReducers({
  user: userReducer,
  item: itemReducer,
  images: imagesReducer,
})

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
)

export default store
