import { applyMiddleware, createStore, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import itemReducer from './itemReducer'
import userReducer from './userReducer'
import imagesReducer from './imagesReducer'
import profileReducer from './profileReducer'
import followingReducer from './followingReducer'
import likesReducer from './likesReducer'
// import itemImagesReducer from './itemImagesReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducers = combineReducers({
  user: userReducer,
  item: itemReducer,
  images: imagesReducer,
  // itemImages: itemImagesReducer,
  items: profileReducer,
  following: followingReducer,
  likes: likesReducer,
})

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
)

export default store
