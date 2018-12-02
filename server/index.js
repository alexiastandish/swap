require('dotenv').config()
const express = require('express')
const massive = require('massive')
const { json } = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const port = 3001
const path = require('path')

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.use(express.static(`${__dirname}/../build`))

const { strategy, getUser } = require('./controllers/authCtrl')
const {
  getAllUsers,
  // getUserById,
  getUserInfo,
  getUserProfileImage,
  updateProfileImage,
} = require('./controllers/getUsersCtrl')

const {
  getItem,
  getItems,
  getItemImages,
  addItem,
  addImage,
  deleteItem,
  editItem,
  itemFeedForDash,
  getItemUser,
} = require(`${__dirname}/controllers/itemsCtrl`)

const { getOffers, createNewOffer, updateOffer } = require('./controllers/offersCtrl')

const { getNotifications } = require('./controllers/notificationsCtrl')

const {
  getFollowingUsers,
  followUser,
  removeFollow,
  getFollowingItems,
} = require('./controllers/followingCtrl')

const {
  saveItem,
  getUserLikes,
  removeLike,
  getUserLikesForHearts,
  getItemLikes,
} = require('./controllers/likesCtrl')

const { getUserProfile } = require('./controllers/profileCtrl')

const app = express()

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
    successRedirect: `${process.env.REACT_APP_URL}/dash`,
    // successRedirect: `http://localhost:3000/dash`,
    failureRedirect: '/login',
  })
)

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect(`${process.env.REACT_APP_URL}`)
  })
})

app.get('/api/me', getUser)

// app.get('/api/user/:id', getUserById)
app.get('/api/userPhoto/:userId', getUserProfileImage)
app.put('/api/updateProfileImage/:userId', updateProfileImage)

app.get('/api/userInfo/:id', getUserInfo)
app.get('/api/item/:id', getItem)
app.get('/api/items/:id', getItems)
app.post('/api/addItem', addItem)
app.get('/api/images/:id', getItemImages)
app.put('/api/editItem/:itemId', editItem)
app.put('/api/addImage/:itemId', addImage)
app.get('/api/dash/:id', itemFeedForDash)
app.put('/api/deleteItem/:itemId', deleteItem)
app.delete('/api/deleteImage/:imageId', deleteImage)
app.get('/api/getItemUser/:itemId', getItemUser)

// profile
app.get('/api/profileItems/:userId', getUserProfile)

// offers
app.get('/api/offers/:userId', getOffers)
app.post('/api/newOffer', createNewOffer)
app.put('/api/updateOffer/:offerId', updateOffer)

// notifications
app.get('/api/notification/:userId', getNotifications)

// // follows
app.get('/api/users', getAllUsers)
// app.get('/api/follows', getAllFollowingUsers)
app.post('/api/follow', followUser)
app.get('/api/follows/:userId', getFollowingUsers)
app.get('/api/following/:id', getFollowingItems)
app.delete('/api/follow/:id', removeFollow)

// //likes
app.post('/api/like', saveItem)
app.get('/api/like/:id', getUserLikes)
app.delete('/api/like/:id', removeLike)
app.get('/api/likes/:id', getUserLikesForHearts)
app.get('/api/itemLikes/:itemId', getItemLikes)

app.listen(port, () => {
  console.log(`MARCO.... POLO ${port}`)
})
