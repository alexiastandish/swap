const getFollowingUsers = (req, res) => {
  const db = req.app.get('db')
  db.getFollowing([req.params.id]).then(response => {
    console.log('calling getFollowing')
    res.status(200).json(response)
  })
}

module.exports = {
  getFollowingUsers,
}
