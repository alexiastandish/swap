const saveItem = async (req, res) => {
  const { postid, postedbyid, likinguser } = req.body
  const db = req.app.get('db')
  const like = await db.likes.addLike([postid, postedbyid, likinguser])
  return res.status(200).send(like)
}

const getUserLikes = (req, res) => {
  const db = req.app.get('db')
  db.likes.getLikes([req.params.id]).then(response => {
    // console.log('response', response)
    res.status(200).json(response)
  })
}

const removeLike = (req, res) => {
  const db = req.app.get('db')
  db.likes
    .unlike([req.params.id])
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => console.log(err))
}

const getUserLikesForHearts = (req, res) => {
  const db = req.app.get('db')
  db.likes.getUserLikes([req.params.id]).then(response => {
    // console.log('response', response)
    res.status(200).json(response)
  })
}

module.exports = {
  saveItem,
  getUserLikes,
  removeLike,
  getUserLikesForHearts,
}
