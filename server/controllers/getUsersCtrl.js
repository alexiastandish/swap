// const getList = (req, res) => {
//   const listOutput = res.status(200).json(items)
//   return listOutput
// }

const getAllUsers = (req, res) => {
  let db = req.app.get('db')
  db.get_users()
    .then(response => {
      const users = res.status(200).json(response)
      console.log('users', users)
      return users
    })
    .catch(err => res.status(500).send(err))
}

module.exports = {
  getAllUsers,
}

// const getProducts = (req, res) => {
//   req.app
//     .get('db')
//     .get_products()
//     .then(response => res.status(200).send(response))
//     .catch(err => res.status(500).send(err));
// };

// module.exports = {
//   getProducts
// };
