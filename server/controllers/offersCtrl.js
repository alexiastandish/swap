const getOffers = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .getOffers([req.params.id])
    .then(response => {
      console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

const getItemFromOffer = (req, res) => {
  const db = req.app.get('db')
  db.offers.getItemFromOffer([req.params.id]).then(response => {
    res.status(200).json(response)
  })
}

module.exports = {
  getOffers,
  getItemFromOffer,
}
