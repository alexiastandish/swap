const getOffers = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .getOffers([req.params.id])
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

module.exports = {
  getOffers,
}
