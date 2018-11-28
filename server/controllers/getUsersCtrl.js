const getAllUsers = (req, res) => {
  const db = req.app.get('db')
  db.getUsers()
    .then(response => {
      // console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => res.status(500).send(err))
}

const getUserInfo = (req, res) => {
  const db = req.app.get('db')
  db.users
    .userInfoProfile([req.params.id])
    .then(response => {
      return res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

const getUserProfileImage = (req, res) => {
  const db = req.app.get('db')
  db.users.getUserPhoto([req.params.userId]).then(response => {
    return res.status(200).json(response)
  })
}

const updateProfileImage = (req, res) => {
  const db = req.app.get('db')
  db.users
    .addProfileImage([req.params.userId, req.body.profilePicture])
    .then(response => {
      return res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

module.exports = {
  getAllUsers,
  getUserInfo,
  getUserProfileImage,
  updateProfileImage,
}
