const getNotifications = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .getNotifications([req.params.userId])
    .then(response => {
      console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

module.exports = {
  getNotifications,
}
