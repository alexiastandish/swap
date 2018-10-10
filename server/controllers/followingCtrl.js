const getAllFollowingUsers = (req, res) => {
  const db = req.app.get('db')
  db.following
    .getFollows()
    .then(response => {
      const users = res.status(200).json(response)
      console.log('users', users)
      return users
    })
    .catch(err => res.status(500).send(err))
}

const getFollowingUsers = (req, res) => {
  const db = req.app.get('db')
  db.following.getFollowing([req.params.id]).then(response => {
    res.status(200).json(response)
  })
}

const followUser = (req, res) => {
  const { follower_id, user_followingid } = req.body
  const db = req.app.get('db')
  db.following.addFollow([follower_id, user_followingid]).then(follow => {
    res.status(200).send(follow)
  })
}

module.exports = {
  getAllFollowingUsers,
  getFollowingUsers,
  followUser,
  getFollowingItems,
}
