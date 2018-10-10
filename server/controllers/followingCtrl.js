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

const getFollowingItems = (req, res) => {
  const db = req.app.get('db')
  db.following.getFollowingItems([req.params.id]).then(response => {
    res.status(200).json(response)
  })
}

const removeFollow = (req, res) => {
  const db = req.app.get('db')
  db.following
    .removeFollow([req.params.id])
    .then(() => {
      return res.sendStatus(200)
    })
    .catch(err => console.log(err))
}

module.exports = {
  getAllFollowingUsers,
  getFollowingUsers,
  followUser,
  getFollowingItems,
  removeFollow,
}
