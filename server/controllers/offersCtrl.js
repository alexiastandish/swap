const getOffers = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .getOffers([req.params.userId])
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.log('err', err)
    })
}

const updateOffer = (req, res) => {
  const db = req.app.get('db')
  db.offers
    .postOffer([req.params.offerId, req.body.status])
    .then(response => {
      return res.status(200).send('cool')
    })
    .catch(err => {
      console.log('err', err)
    })
}

module.exports = {
  getOffers,
  updateOffer,
}
