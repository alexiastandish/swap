require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const passport = require('passport')

const { strategy, getUser, logout } = require('./controllers/authCtrl')

const port = process.env.PORT || 3001

const app = express()

// KEEP COMMENTED UNTIL READY TO HOST
// app.use(express.static(__dirname, '../build'));

massive(process.env.CONNECTION_STRING)
  .then(db => {
    // console.log('db', db)
    app.set('db', db)
  })
  .catch(console.log('error'))

app.use(json())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())
passport.use(strategy)

passport.serializeUser((user, done) => {
  const db = app.get('db')
  db.get_user_by_authid([user.id])
    .then(response => {
      if (!response[0]) {
        db.add_user_by_authid([user.displayName, user.id])
          .then(res => done(null, res[0]))
          .catch(console.log)
      } else return done(null, response[0])
    })
    .catch(console.log)
})

passport.deserializeUser((user, done) => done(null, user))

app.get(
  '/login',
  passport.authenticate('auth0', {
    successRedirect: '/api/me',
    failureRedirect: '/login',
  })
)

app.get('/api/me', getUser)
app.post('/api/logout', logout)

app.listen(port, () => {
  console.log(`MARCO.... POLO ${port}`)
})
