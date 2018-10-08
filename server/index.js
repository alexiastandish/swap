require('dotenv').config()
const express = require('express')
const massive = require('massive')
const { json } = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const port = 3001
// const path = require("path")

// const { strategy, getUser } = require(`${__dirname}/controllers/authCtrl`)

// const {
//   getItem,
//   postItem,
//   deleteItem,
//   editItem,
//   // addImage,
//   // uploadImage,
//   // changeItemImage,
// } = require(`${__dirname}/controllers/itemsCtrl`)

// const { getAllUsers } = require(`${__dirname}/controllers/getUsersCtrl`)

// const {
//   addFollow,
//   getFollowing,
//   removeFollow,
//   getFollowingItems,
// } = require(`${__dirname}/controllers/followingCtrl`)

// const { addLike, getLikes, removeLike } = require(`${__dirname}/controllers/likesCtrl`)

const app = express()

// KEEP COMMENTED UNTIL READY TO HOST
// app.use(express.static(__dirname, '../build'));

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db)
  })
  .catch(console.log)

app.use(json())

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000000,
//     },
//   })
// )

// app.use(passport.initialize())
// app.use(passport.session())
// passport.use(strategy)

// passport.serializeUser((user, done) => {
//   console.log('hello')
//   // console.log(user);
//   const db = app.get('db')
//   db.getUserByAuthid([user.id])
//     .then(response => {
//       console.log(response)
//       if (!response[0]) {
//         console.log(response)
//         db.addUserByAuthid([user.displayName, user.id, user.emails[0].value])
//           .then(res => done(null, res[0]))
//           .catch(console.log)
//       } else return done(null, response[0])
//     })
//     .catch(console.log)
// })
// passport.deserializeUser((user, done) => {})

// app.get(
//   '/login',
//   passport.authenticate('auth0', {
//     successRedirect: '/api/me',
//     failureRedirect: '/login',
//   })
// )

// app.get('/api/me', getUser)

// items
app.get('/api/item/:id', getItem)
app.post('/api/item', postItem)
app.delete('/api/item/:id', deleteItem)
app.put('/api/item/:id', editItem)

// follows
app.get('/api/users', getAllUsers)
app.post('/api/follows', addFollow)
app.get('/api/follows/:id', getFollowing)
app.get('/api/follows/:id', getFollowingItems)
app.delete('/api/follows/:id', removeFollow)

//likes
app.post('api/like', addLike)
app.get('/api/likes/:id', getLikes)
app.delete('/api/like/:id', removeLike)

app.listen(port, () => {
  console.log(`MARCO.... POLO ${port}`)
})
