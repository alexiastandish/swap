require('dotenv').config()
const express = require('express')
const massive = require('massive')
const { json } = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const port = 3001
// const path = require("path")

const { strategy, getUser } = require('./controllers/authCtrl')
const { getAllUsers, getUserById, getUserInfo } = require('./controllers/getUsersCtrl')

const {
  getItem,
  getItems,
  getItemImages,
  addItem,
  deleteItem,
  editItem,
  changeItemImage,
  itemFeedForDash,
} = require(`${__dirname}/controllers/itemsCtrl`)

const {
  getOffers,
  getItemFromOffer,
  getRequestedItem,
  offerUserInfo,
  // getFromUserEmail,
} = require('./controllers/offersCtrl')

const {
  getFollowingUsers,
  followUser,
  getAllFollowingUsers,
  removeFollow,
  getFollowingItems,
} = require('./controllers/followingCtrl')

const {
  saveItem,
  getUserLikes,
  removeLike,
  getUserLikesForHearts,
} = require('./controllers/likesCtrl')

const app = express()

// KEEP COMMENTED UNTIL READY TO HOST
// app.use(express.static(__dirname, '../build'));

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db)
  })
  .catch(console.log)

app.use(json())

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())
passport.use(strategy)

passport.serializeUser((user, done) => {
  const db = app.get('db')
  db.getUserByAuthid([user.id])
    .then(response => {
      // console.log(response)
      if (!response[0]) {
        // console.log(response)
        db.addUserByAuthid([user.displayName, user.id, user.email])
          .then(res => done(null, res[0]))
          .catch(console.log)
      } else return done(null, response[0])
    })
    .catch(console.log)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

app.get(
  '/login',
  passport.authenticate('auth0', {
    // successRedirect: process.env.REACT_APP_LOGIN,
    successRedirect: `http://localhost:3000/dash`,
    failureRedirect: '/login',
  })
)

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('http://localhost:3000/')
  })
})

app.get('/api/me', getUser)

app.get('/api/user/:id', getUserById)

app.get('/api/userInfo/:id', getUserInfo)
app.get('/api/item/:id', getItem)
app.get('/api/items/:id', getItems)
app.post('/api/addItem', addItem)
app.get('/api/images/:id', getItemImages)
app.delete('/api/item/:id', deleteItem)
app.put('/api/item/:id', editItem)
app.put('/api/images/:id', changeItemImage)
app.get('/api/dash/:id', itemFeedForDash)
// ADD user+LIKES TO ITEM??

// offers
app.get('/api/offers/:id', getOffers)
app.get('/api/offer/:id', getItemFromOffer)
app.get('/api/request/:id', getRequestedItem)
app.get('/api/offerUser/:id', offerUserInfo)

// // follows
app.get('/api/users', getAllUsers)
app.get('/api/follows', getAllFollowingUsers)
app.post('/api/follow', followUser)
app.get('/api/follows/:id', getFollowingUsers)
app.get('/api/following/:id', getFollowingItems)
app.delete('/api/follow/:id', removeFollow)

// //likes
app.post('/api/like', saveItem)
app.get('/api/like/:id', getUserLikes)
app.delete('/api/like/:id', removeLike)
app.get('/api/likes/:id', getUserLikesForHearts)

app.listen(port, () => {
  console.log(`MARCO.... POLO ${port}`)
})
