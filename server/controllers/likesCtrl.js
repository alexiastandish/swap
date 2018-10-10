const saveItem = async (req, res) => {
  const { postid, postedbyid, likinguser } = req.body
  const db = app.get.db('db')
  const like = await db.likes.addLike([postid, postedbyid, likinguser])
  return res.status(200).send(like)
}

const getUserLikes = (req, res) => {
  const db = req.app.get('db')
  db.likes.getLikes([req.params.id]).then(response => {
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

module.exports = {
  saveItem,
  getUserLikes,
  removeLike,
}
