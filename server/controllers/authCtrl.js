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
  (accessToken, refreshToken, extraParams, profile, done) => {
    done(null, profile)
  }
)

const getUser = (req, res) => {
  if (req.use) res.status(200).json(req.use)
  else res.status(403).json({ message: 'Not logged in' })
}

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('http://localhost:3001/login')
    // domain will be added in place of local host
  })
}

module.exports = {
  strategy,
  getUser,
  logout,
}
