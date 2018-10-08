const Auth0Strategy = require('passport-auth0')

const { CLIENT_ID, CLIENT_SECRET, DOMAIN } = process.env

const strategy = new Auth0Strategy(
  {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    domain: DOMAIN,
    callbackURL: '/login',
    scope: 'openid profile',
  },
  () => {
    console.log('hello')
  }
  // (accessToken, refreshToken, extraParams, profile, done) => {
  //   console.log('profile', profile)
  //   done(null, profile)
  // }
)

const getUser = (req, res) => {
  console.log('user', user)
  if (req.user) res.status(200).json(req.user)
  else res.status(403).json({ message: 'not logged in' })
}

// const logout = (req, res) => {
//   req.session.destroy(() => {
//     res.redirect('http://localhost:3001/login')
//     // domain will be added in place of local host
//   })
// }

module.exports = {
  strategy,
  getUser,
  // logout,
}
