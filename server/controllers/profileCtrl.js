const getUserProfile = (req, res) => {
  console.log('req.params', req.params)
  console.log('req.body', req.body)
  const db = req.app.get('db')
  db.profile
    .getProfileItems([req.params.userId])
    .then(response => {
      console.log('response', response)
      return res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

module.exports = {
  getUserProfile,
}
