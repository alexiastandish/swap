const getAllUsers = (req, res) => {
  const db = req.app.get('db')
  db.getUsers()
    .then(response => {
      // console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => res.status(500).send(err))
}

const getUserById = (req, res) => {
  const db = req.app.get('db')
  db.getUserByItemId([req.params.id])
    .then(response => {
      const user = res.status(200).json(response)
      // console.log('users', user)
      return user
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
    // console.log('response', response)
    return res.status(200).json(response)
  })
}

const updateProfileImage = (req, res) => {
  // console.log('req.body', req.body)
  // console.log('req.params', req.params)
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
  getUserById,
  getUserInfo,
  getUserProfileImage,
  updateProfileImage,
}
