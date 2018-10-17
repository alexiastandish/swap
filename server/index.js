require('dotenv').config()
const express = require('express')
const massive = require('massive')
const { json } = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const port = 3001
// const path = require("path")

const { strategy, getUser, logout } = require('./controllers/authCtrl')
const { getAllUsers, getUserById } = require('./controllers/getUsersCtrl')

const {
  getItem,
  getItems,
  getItemImages,
  addItem,
  deleteItem,
  editItem,
  changeItemImage,
} = require(`${__dirname}/controllers/itemsCtrl`)

// const { getAllUsers } = require(`${__dirname}/controllers/getUsersCtrl`)

const {
  getFollowingUsers,
  followUser,
  getAllFollowingUsers,
  removeFollow,
  getFollowingItems,
} = require('./controllers/followingCtrl')

const { saveItem, getUserLikes, removeLike } = require('./controllers/likesCtrl')

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

app.get('/api/me', getUser)
app.post('/logout', logout)

app.get('/api/user/:id', getUserById)

app.get('/api/item/:id', getItem)
app.get('/api/items/:id', getItems)
app.post('/api/addItem', addItem)
app.get('/api/images/:id', getItemImages)
app.delete('/api/item/:id', deleteItem)
app.put('/api/item/:id', editItem)
app.put('/api/item/:id', changeItemImage)
// ADD user+LIKES TO ITEM??

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

app.listen(port, () => {
  console.log(`MARCO.... POLO ${port}`)
})
