const Auth0Strategy = require('passport-auth0')

const { CLIENT_ID, CLIENT_SECRET, DOMAIN } = process.env

const strategy = new Auth0Strategy(
  {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    domain: DOMAIN,
    callbackURL: '/login',
    scope: 'openid email profile',
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    // console.log('profile', profile)
    done(null, profile)
  }
)

const getUser = (req, res) => {
  if (req.user) res.status(200).json(req.user)
  else res.status(403).json({ message: 'Not Logged In' })
}

module.exports = {
  strategy,
  getUser,
}
