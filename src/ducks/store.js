import { applyMiddleware, createStore, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import itemReducer from './itemReducer'
import userReducer from './userReducer'
import imagesReducer from './imagesReducer'
import profileReducer from './profileReducer'
import followingReducer from './followingReducer'
import likesReducer from './likesReducer'
import offersReducer from './offersReducer'
import offerItemReducer from './offerItemReducer'
import requestedItemReducer from './requestItemReducer'
import getUserInfoReducer from './getUserInfoReducer'
import offerItemUserInfoReducer from './offerItemUserInfoReducer'
import dashReducer from './dashReducer'
import getAllUsersReducer from './getAllUsersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducers = combineReducers({
  user: userReducer,
  item: itemReducer,
  images: imagesReducer,
  items: profileReducer,
  following: followingReducer,
  likes: likesReducer,
  offersList: offersReducer,
  offerItems: offerItemReducer,
  requestItems: requestedItemReducer,
  userInfoById: getUserInfoReducer,
  offerUserInfo: offerItemUserInfoReducer,
  userHearts: likesReducer,
  dashItems: dashReducer,
  allUsers: getAllUsersReducer,
})

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
)

export default store
