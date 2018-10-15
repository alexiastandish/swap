const getAllUsers = (req, res) => {
  const db = req.app.get('db')
  db.getUsers()
    .then(response => {
      const users = res.status(200).json(response)
      console.log('users', users)
      return users
    })
    .catch(err => res.status(500).send(err))
}

const getUserById = (req, res) => {
  const db = req.app.get('db')
  db.getUserById([req.params.id])
    .then(response => {
      const user = res.status(200).json(response)
      console.log('users', user)
      return user
    })
    .catch(err => res.status(500).send(err))
}

module.exports = {
  getAllUsers,
  getUserById,
}
